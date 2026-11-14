import { useEffect, useMemo, useRef, useState } from 'react'
import L from 'leaflet'
import { Camera, Info, Layers, Loader2, Pause, Play, WifiOff } from 'lucide-react'
import { Cite, Reveal, Section, SectionHeader } from '../components/ui'
import { dailyRain, type Peak } from '../data/hydro'
import spaRaw from '../data/spa.json'
import { sourceById, sourceIndex } from '../data/sources'
import { nf, sepDay } from '../lib/format'
import { Lightbox } from '../components/Lightbox'
import { distanceKm, nearestPhotoPlace, photoPlaces as photoPlacesSk, type PhotoPlace } from '../data/photos'
import { mapLabels } from '../data/mapLabels'
import { useLang, useT } from '../lib/i18n'
import { useContent } from '../data/content'
import { enWho } from '../data/en'

type Spa = { day: number; kind: string; name: string; okres?: string; time?: string; who: string; level: number; basin: string; lat: number; lon: number; note?: string }
const spa = spaRaw as Spa[]

// Rozsah všetkých bodov — mapa sa naň prispôsobí pri načítaní
const dataBounds = L.latLngBounds(spa.map((p) => [p.lat, p.lon] as [number, number]).concat([[49.44, 18.79], [47.75, 18.72]]))

const DAY_MIN = 12
const DAY_MAX = 21

// Doložené udalosti (body = stred obce/mestskej časti). day = deň, ku ktorému je udalosť doložená.
const events = [
  { id: 'jakubov', day: 16, lat: 48.4141, lon: 16.926, src: ['shmu-ms'],
    sk: { name: 'Jakubov – pretrhnutie hrádze Maliny', text: 'Kulminačný prietok na úrovni 100-ročnej vody (16. 9. 4:45). Situáciu ovplyvnilo pretrhnutie hrádze toku.', status: '' },
    en: { name: 'Jakubov – Malina dike breach', text: 'Peak flow at the level of a 100-year flood (16 Sep 04:45). The situation was influenced by a breach of the stream’s dike.', status: '' } },
  { id: 'devin', day: 18, lat: 48.1746, lon: 16.9826, src: ['tasr-droba'],
    sk: { name: 'Devín – odrezaný od sveta', text: 'Podľa predsedu BSK (18. 9.) bol Devín odrezaný a mobilné hrádze presakovali. Prioritou bolo zásobovanie.', status: '' },
    en: { name: 'Devín – cut off', text: 'According to the regional president (18 Sep), Devín was cut off and mobile barriers were leaking. Supplies were the priority.', status: '' } },
  { id: 'dnv', day: 17, lat: 48.2092, lon: 16.9739, src: ['tasr-droba', 'tasr-1709', 'dn-poucenia'],
    sk: { name: 'Devínska Nová Ves – kyvadlová doprava armády', text: 'Obyvatelia sa mohli dostať von len kyvadlovou dopravou armády. Pri čerpacej stanici ide o sporné tvrdenie (Denník N, minister ho spochybnil).', status: 'čiastočne sporné' },
    en: { name: 'Devínska Nová Ves – army shuttle', text: 'Residents could leave only by army shuttle. The pumping station failure is a contested claim (Denník N; disputed by the minister).', status: 'partly contested' } },
  { id: 'chlaba', day: 17, lat: 47.8298, lon: 18.8277, src: ['tasr-1709'],
    sk: { name: 'Chľaba – mimoriadna situácia, izolácia', text: 'Obec bola asi štyri dni odrezaná od cestného spojenia. Armáda pomáhala so zásobovaním, v obci a v Kováčove boli sociálne zariadenia s približne 270 klientmi.', status: '' },
    en: { name: 'Chľaba – emergency situation, isolation', text: 'The village was cut off by road for about four days. The army helped with supplies; social care homes in the village and in Kováčov had about 270 clients.', status: '' } },
  { id: 'stupava', day: 15, lat: 48.273, lon: 17.033, src: ['stvr-1509'],
    sk: { name: 'Stupava – výzva na evakuačnú batožinu', text: '3. SPA od polnoci 15. 9. Mesto vyzvalo obyvateľov, aby si pripravili evakuačnú batožinu. Uskutočnenie evakuácie nie je v zdroji doložené.', status: '' },
    en: { name: 'Stupava – call to pack emergency bags', text: 'Flood level 3 from midnight on 15 Sep. The town asked residents to pack emergency bags. The source does not document an actual evacuation.', status: '' } },
  { id: 'cadca', day: 15, lat: 49.4375, lon: 18.7896, src: ['stvr-1509'],
    sk: { name: 'Čadca – príprava evakuácie', text: 'Mesto vyhlásilo najvyšší SPA, pripravilo športovú halu na prípadnú evakuáciu Ohrozené boli aj mosty v meste.', status: '' },
    en: { name: 'Čadca – evacuation prepared', text: 'The town declared the highest flood level, prepared a sports hall for possible evacuation Bridges in the town were also at risk.', status: '' } },
  { id: 'bratislava', day: 15, lat: 48.1435, lon: 17.1093, src: ['stvr-1509'],
    sk: { name: 'Bratislava – zastavené električky', text: 'Pre poškodené trolejové vedenie nepremávali električky (15. 9.).', status: '' },
    en: { name: 'Bratislava – trams stopped', text: 'Trams stopped because of damaged overhead lines (15 Sep).', status: '' } },
]

// Farebná škála doby opakovania (sekvenčná, teplá — označuje riziko)
const nColor = (p: Peak) => {
  const n = p.nMax
  if (n == null) return '#8a9bab'
  if (n >= 100) return '#ff3b3f'
  if (n >= 50) return '#ff6a3d'
  if (n >= 20) return '#ff9a4a'
  if (n >= 10) return '#f2c14e'
  return '#e8dca0'
}
const peakDay = (p: Peak) => parseInt(p.date)
const rainUpTo = (r: (typeof dailyRain)[number], day: number) =>
  (['d12', 'd13', 'd14', 'd15', 'd16'] as const).filter((_, i) => 12 + i <= day).reduce((a, k) => a + r[k], 0)

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]!)

type LayerKey = 'peaks' | 'rain' | 'spa' | 'events' | 'photos'
type FloodKey = 'observed' | 'max'
const floodFile: Record<FloodKey, string> = { observed: './data/flood-observed-2024-09-18.geojson', max: './data/flood-maxextent-2024-09-18.geojson' }
const floodStyle: Record<FloodKey, L.PathOptions> = {
  observed: { color: '#3aa0ff', weight: 0.6, fillColor: '#3aa0ff', fillOpacity: 0.55 },
  max: { color: '#8ff0e5', weight: 0.6, fillColor: '#2dd4c4', fillOpacity: 0.28 },
}

export function Mapa() {
  const t = useT()
  const { lang } = useLang()
  const en = lang === 'en'
  const { peaks, photoPlaces, timeline } = useContent()
  const el = useRef<HTMLDivElement>(null)
  const map = useRef<L.Map | null>(null)
  const groups = useRef<Record<LayerKey, L.LayerGroup> | null>(null)
  const peakMarkers = useRef<{ p: Peak; m: L.CircleMarker }[]>([])
  const rainMarkers = useRef<{ r: (typeof dailyRain)[number]; m: L.CircleMarker }[]>([])
  const eventMarkers = useRef<{ day: number; m: L.Marker }[]>([])
  const bases = useRef<Record<string, L.Layer>>({})
  const darkFallback = useRef(false)
  const [on, setOn] = useState<Record<LayerKey, boolean>>({ peaks: true, rain: false, spa: true, events: true, photos: true })
  const [flood, setFlood] = useState<Record<FloodKey, boolean>>({ observed: false, max: false })
  const [floodLoading, setFloodLoading] = useState<FloodKey | null>(null)
  const floodLayers = useRef<Partial<Record<FloodKey, L.GeoJSON>>>({})
  const labelLayer = useRef<L.LayerGroup | null>(null)
  const [gallery, setGallery] = useState<PhotoPlace | null>(null)
  const [day, setDay] = useState(DAY_MAX)
  const [playing, setPlaying] = useState(false)
  const [base, setBase] = useState<'dark' | 'osm'>('dark')
  const [tileError, setTileError] = useState(false)

  const placeById = (id: string) => photoPlaces.find((p) => p.id === id) ?? null
  const spaVisible = useMemo(() => spa.filter((s) => s.day <= day), [day])
  const dayEvents = useMemo(() => timeline.filter((e) => e.date === `2024-09-${String(day).padStart(2, '0')}`), [timeline, day])

  const layerMeta: Record<LayerKey, { label: string; desc: string; src: string[] }> = {
    peaks: { label: t('Kulminácie na vodomerných staniciach', 'Peaks at gauging stations'), desc: t('farba = doba opakovania prietoku', 'colour = return period of the flow'), src: ['shmu-ms', 'shmu-vah'] },
    rain: { label: t('Úhrn zrážok (12.–16. 9.)', 'Rainfall total (12–16 Sep)'), desc: t('veľkosť = mm, sčítané do zvoleného dňa', 'size = mm, summed up to the selected day'), src: ['shmu-ms'] },
    spa: { label: t('Vyhlásené stupne povodňovej aktivity', 'Declared flood activity levels'), desc: t('obce, mestá a okresy podľa SHMÚ', 'villages, towns and districts per SHMÚ'), src: ['shmu-ms', 'shmu-vah'] },
    events: { label: t('Doložené udalosti', 'Documented events'), desc: t('izolácia, evakuácia, škody (médiá, SHMÚ)', 'isolation, evacuation, damage (media, SHMÚ)'), src: ['tasr-1709', 'tasr-droba', 'stvr-1509'] },
    photos: { label: t('Fotografie z miest', 'Photos from the sites'), desc: t('kliknite na fotoaparát – otvorí sa galéria', 'click a camera to open the gallery'), src: ['foto-bsk', 'foto-doronenko-angern', 'foto-doronenko-morava'] },
  }
  const floodMeta: Record<FloodKey, { label: string; desc: string }> = {
    observed: { label: t('Zaplavená plocha 18. 9. 2024 (satelit)', 'Flooded area 18 Sep 2024 (satellite)'), desc: t('Copernicus EMS, povodie Moravy – 7 202,9 ha', 'Copernicus EMS, Morava basin – 7,202.9 ha') },
    max: { label: t('Maximálny rozsah zaplavenia do 18. 9.', 'Maximum flood extent up to 18 Sep'), desc: t('Copernicus EMS, povodie Moravy – 9 064,2 ha', 'Copernicus EMS, Morava basin – 9,064.2 ha') },
  }
  const nLegend = [
    { c: '#e8dca0', l: t('< 10 rokov', '< 10 years') },
    { c: '#f2c14e', l: t('10 rokov', '10 years') },
    { c: '#ff9a4a', l: t('20 rokov', '20 years') },
    { c: '#ff6a3d', l: t('50 rokov', '50 years') },
    { c: '#ff3b3f', l: t('100 rokov', '100 years') },
    { c: '#8a9bab', l: t('neurčená', 'not set') },
  ]

  // HTML pomocníci pre vyskakovacie okná (Leaflet pracuje s reťazcami)
  const srcLinks = (ids: string[]) =>
    `<div style="margin-top:8px;padding-top:6px;border-top:1px solid rgba(150,185,215,.15);font-size:11px">${en ? 'Source' : 'Zdroj'}: ${ids
      .map((id) => `<a href="${sourceById[id].url}" target="_blank" rel="noopener">[${sourceIndex[id]}] ${sourceById[id].author}</a>`)
      .join(', ')}</div>`
  const photoBlock = (lat: number, lon: number) => {
    const nearSk = nearestPhotoPlace(lat, lon)
    if (nearSk) {
      const near = placeById(nearSk.id)!
      const thumbs = near.photos.slice(0, 3).map((ph) => `<img src="${ph.src}" alt="" loading="lazy" style="width:54px;height:40px;object-fit:cover;border-radius:6px">`).join('')
      return `<button type="button" data-place="${near.id}" class="map-photo-btn"><span style="display:flex;gap:4px">${thumbs}</span><span>📷 ${en ? 'Photos from this site' : 'Fotky z miesta'} (${near.photos.length})</span></button>`
    }
    let best = photoPlacesSk[0]
    let bd = Infinity
    photoPlacesSk.forEach((p) => {
      const d = distanceKm(lat, lon, p.lat, p.lon)
      if (d < bd) { bd = d; best = p }
    })
    const name = placeById(best.id)!.name
    return `<div style="margin-top:10px;font-size:11px;color:#8a9bab">${en ? 'We found no freely licensed photos from this exact site.' : 'Fotky s voľnou licenciou priamo z tohto miesta sme nenašli.'}<br><button type="button" data-place="${best.id}" class="map-photo-link">${en ? 'Nearest photos' : 'Najbližšie fotky'}: ${esc(name)} (${nf(bd, 0)} km) →</button></div>`
  }
  const eyebrow = (txt: string, col = '#8a9bab') => `<div style="font-family:var(--font-mono);font-size:10px;letter-spacing:.12em;color:${col};text-transform:uppercase">${txt}</div>`

  // Inicializácia mapy (komponent sa pri zmene jazyka znovu pripojí, pozri App.tsx)
  useEffect(() => {
    if (!el.current || map.current) return
    // fadeAnimation: false — staré dlaždice (najmä priehľadné popisky) sa po zmene priblíženia hneď odstránia
    const m = L.map(el.current, { zoomControl: true, scrollWheelZoom: false, attributionControl: true, minZoom: 6, maxZoom: 15, zoomSnap: 0.25, fadeAnimation: false })
    map.current = m
    m.fitBounds(dataBounds, { padding: [24, 24] })

    ;(['flood', 'labels', 'rain', 'spa', 'events', 'peaks', 'photos'] as const).forEach((p, i) => {
      m.createPane(p).style.zIndex = String(400 + i * 10)
    })
    m.getPane('labels')!.style.pointerEvents = 'none'

    labelLayer.current = L.layerGroup(
      mapLabels.map((l) =>
        L.marker([l.lat, l.lon], {
          pane: 'labels', interactive: false, keyboard: false,
          icon: L.divIcon({ className: `map-label lbl-t${l.t}${l.r ? ' lbl-river' : ''}`, html: `<span>${en ? ({ 'Viedeň': 'Vienna', 'Budapešť': 'Budapest', 'Dunaj': 'Danube' } as Record<string, string>)[l.n] ?? l.n : l.n}</span>`, iconSize: [0, 0] }),
        }),
      ),
    )
    const setZoomClass = () => {
      const z = m.getZoom()
      const c = m.getContainer()
      c.classList.toggle('z-lt-85', z < 8.5)
      c.classList.toggle('z-lt-10', z < 10)
    }
    m.on('zoomend', setZoomClass)
    setZoomClass()

    // Podkladové mapy (bez API kľúča): tmavá = Esri Dark Gray Canvas, svetlá = OpenStreetMap
    let esriErrors = 0
    let osmErrors = 0
    const osmLayer = () =>
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">${en ? 'OpenStreetMap contributors' : 'prispievatelia OpenStreetMap'}</a>`,
        maxZoom: 19,
      }).on('tileerror', () => {
        osmErrors++
        if (osmErrors > 4) setTileError(true)
      })
    const onEsriErr = () => {
      esriErrors++
      // Ak Esri nie je dostupné, prepne sa na OSM s tmavým filtrom
      if (esriErrors > 3 && !darkFallback.current) {
        darkFallback.current = true
        const osmDark = osmLayer()
        m.removeLayer(bases.current.dark)
        bases.current.dark = osmDark
        osmDark.addTo(m)
        m.getContainer().classList.add('map-dark')
      }
    }
    const esriAttr = `${en ? 'Basemap' : 'Podklad'} &copy; <a href="https://www.esri.com/">Esri</a>, HERE, Garmin, &copy; <a href="https://www.openstreetmap.org/copyright">${en ? 'OpenStreetMap contributors' : 'prispievatelia OpenStreetMap'}</a> · ${en ? 'labels: authors' : 'popisky: autori'}`
    bases.current.dark = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}', { attribution: esriAttr, maxZoom: 16 }).on('tileerror', onEsriErr)
    bases.current.osm = osmLayer()

    // Koliesko myši až po kliknutí do mapy (neblokuje scrollovanie stránky)
    m.on('click focus', () => m.scrollWheelZoom.enable())
    m.on('mouseout blur', () => m.scrollWheelZoom.disable())
    // Po preletoch odstrániť dlaždice z iných úrovní priblíženia (inak zostanú zväčšené staré popisky)
    m.on('moveend zoomend', () => {
      m.eachLayer((l) => {
        if (l instanceof L.GridLayer) (l as unknown as { _pruneTiles: () => void })._pruneTiles()
      })
    })
    const ro = new ResizeObserver(() => m.invalidateSize())
    ro.observe(el.current)

    groups.current = { peaks: L.layerGroup(), rain: L.layerGroup(), spa: L.layerGroup(), events: L.layerGroup(), photos: L.layerGroup() }

    // Fotoaparáty — klik otvorí galériu priamo
    photoPlaces.forEach((pl) => {
      const icon = L.divIcon({
        className: '',
        html: `<div class="map-cam" title="${esc(pl.name)}"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg><b>${pl.photos.length}</b></div>`,
        iconSize: [44, 28],
        iconAnchor: [22, 34],
      })
      const label = `${en ? 'Photos' : 'Fotky'}: ${pl.name}`
      L.marker([pl.lat, pl.lon], { icon, pane: 'photos', keyboard: true, title: label, alt: label })
        .bindTooltip(`📷 ${pl.name}`, { direction: 'top', offset: [0, -34] })
        .on('click', () => setGallery(pl))
        .addTo(groups.current!.photos)
    })

    // Tlačidlá „Fotky z miesta“ vo vyskakovacích oknách
    m.on('popupopen', (e) => {
      e.popup.getElement()?.querySelectorAll<HTMLButtonElement>('[data-place]').forEach((b) => {
        b.onclick = () => {
          const pl = placeById(b.dataset.place ?? '')
          if (pl) setGallery(pl)
        }
      })
    })

    // Kulminácie
    peakMarkers.current = peaks.map((p) => {
      const c = L.circleMarker([p.lat, p.lon], { pane: 'peaks', radius: 7.5, color: '#eef3f7', weight: 1.6, fillColor: nColor(p), fillOpacity: 1 })
      c.bindTooltip(`${p.station} · ${p.river}`, { direction: 'top', offset: [0, -8] })
      const pd = peakDay(p)
      const rp = p.nMin == null ? (en ? 'not set' : 'neurčená') : p.nMin === p.nMax ? `${p.nMin} ${en ? 'yr' : 'r.'}` : `${p.nMin}–${p.nMax} ${en ? 'yr' : 'r.'}`
      c.bindPopup(
        `${eyebrow(`${en ? 'Gauging station' : 'Vodomerná stanica'} · ${p.basin}`)}
         <div style="font-size:16px;font-weight:600;margin:2px 0 6px">${esc(p.station)} – ${esc(p.river)}</div>
         <table style="font-size:12px;width:100%">
           <tr><td style="color:#8a9bab">${en ? 'Peak' : 'Kulminácia'}</td><td style="text-align:right">${sepDay(pd)} ${p.time} ${en ? 'CET' : 'SEČ'}</td></tr>
           ${p.h != null ? `<tr><td style="color:#8a9bab">${en ? 'Water level' : 'Vodný stav'} H<sub>max</sub></td><td style="text-align:right">${nf(p.h)} cm</td></tr>` : ''}
           ${p.q != null ? `<tr><td style="color:#8a9bab">${en ? 'Discharge' : 'Prietok'} Q<sub>max</sub></td><td style="text-align:right">${nf(p.q, p.q < 100 ? 2 : 0)} m³/s</td></tr>` : ''}
           <tr><td style="color:#8a9bab">${en ? 'Return period' : 'Doba opakovania'}</td><td style="text-align:right">${rp}</td></tr>
           <tr><td style="color:#8a9bab">${en ? 'Flood activity level' : 'Stupeň povod. aktivity'}</td><td style="text-align:right">${p.spa}${en ? '' : '. SPA'}</td></tr>
         </table>
         ${p.note ? `<p style="margin:8px 0 0;color:#a9b8c6">${esc(p.note)}</p>` : ''}
         <p style="margin:6px 0 0;font-size:11px;color:#6c7e90">${en ? 'The point marks the village centre, not the exact gauge location.' : 'Bod je v strede obce, nie na presnej polohe vodočtu.'}</p>
         ${photoBlock(p.lat, p.lon)}
         ${srcLinks(p.basin === 'Kysuca / Váh' ? ['shmu-vah'] : ['shmu-ms'])}`,
      )
      c.addTo(groups.current!.peaks)
      return { p, m: c }
    })

    // Zrážky (polomer a text sa menia podľa zvoleného dňa)
    rainMarkers.current = dailyRain.map((r) => {
      const c = L.circleMarker([r.lat, r.lon], { pane: 'rain', radius: 4, color: '#3aa0ff', weight: 1.2, fillColor: '#3aa0ff', fillOpacity: 0.18 })
      c.bindTooltip('', { direction: 'top' })
      c.bindPopup('')
      c.addTo(groups.current!.rain)
      return { r, m: c }
    })

    // Doložené udalosti
    eventMarkers.current = events.map((ev) => {
      const e = en ? ev.en : ev.sk
      const icon = L.divIcon({
        className: '',
        // väčší kosoštvorec pod stanicou — stanica v tej istej obci zostáva klikateľná v strede
        html: `<div style="width:22px;height:22px;border-radius:5px;transform:rotate(45deg);background:rgba(45,212,196,.22);border:2px solid #2dd4c4;box-shadow:0 0 0 3px rgba(7,11,16,.55)"></div>`,
        iconSize: [22, 22],
        iconAnchor: [11, 11],
      })
      const mk = L.marker([ev.lat, ev.lon], { icon, pane: 'events', keyboard: true, title: e.name, alt: e.name })
        .bindTooltip(e.name, { direction: 'top', offset: [0, -14] })
        .bindPopup(
          `${eyebrow(`${en ? 'Documented event' : 'Doložená udalosť'} · ${sepDay(ev.day)}${e.status ? ' · ' + e.status : ''}`, '#2dd4c4')}
           <div style="font-size:15px;font-weight:600;margin:2px 0 6px">${e.name}</div>
           <p style="margin:0;color:#a9b8c6">${e.text}</p>${photoBlock(ev.lat, ev.lon)}${srcLinks(ev.src)}`,
        )
      mk.addTo(groups.current!.events)
      return { day: ev.day, m: mk }
    })

    return () => {
      ro.disconnect()
      m.remove()
      map.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Časový posuvník: vyhlásenia SPA do zvoleného dňa
  useEffect(() => {
    const g = groups.current?.spa
    if (!g) return
    g.clearLayers()
    spaVisible.forEach((s) => {
      const col = s.level === 3 ? '#ff4d4f' : '#ff8a3d'
      const isArea = s.kind === 'okres' || s.kind === 'kraj'
      const fresh = s.day === day
      // Vyhlásenia SPA = duté krúžky (odlíšené od plných bodov vodomerných staníc); nové v daný deň výraznejšie
      const c = L.circleMarker([s.lat, s.lon], {
        pane: 'spa',
        radius: isArea ? 16 : fresh ? 6 : 4.5,
        color: col,
        weight: isArea ? 1.2 : fresh ? 2.6 : 1.8,
        opacity: isArea ? 0.7 : 0.95,
        dashArray: isArea ? '4 4' : undefined,
        fillColor: col,
        fillOpacity: isArea ? 0.04 : fresh ? 0.35 : 0.12,
      })
      const who = en ? enWho(s.who) : s.who
      const name = s.kind === 'kraj' ? (en ? 'Bratislava Region (all districts)' : s.name) : s.name
      c.bindTooltip(`${name}: ${en ? `level ${s.level}` : `${s.level}. SPA`} (${sepDay(s.day)})`, { direction: 'top' })
      c.bindPopup(
        `${eyebrow(en ? `Flood activity level ${s.level}` : `${s.level}. stupeň povodňovej aktivity`, col)}
         <div style="font-size:15px;font-weight:600;margin:2px 0 4px">${s.kind === 'okres' ? (en ? 'District ' : 'Okres ') : ''}${esc(name)}</div>
         <div style="font-size:12px;color:#a9b8c6">${s.okres && s.kind !== 'okres' ? (en ? `${esc(s.okres)} district · ` : 'okres ' + esc(s.okres) + ' · ') : ''}${en ? 'declared by' : 'vyhlásil'}: ${esc(who)}</div>
         <div style="font-size:12px;margin-top:4px">${sepDay(s.day)} 2024${s.time ? (en ? ' at ' : ' o ') + s.time : en ? ' (time not given)' : ' (čas neuvedený)'}</div>
         ${s.note ? `<div style="font-size:11px;color:#8a9bab;margin-top:4px">${esc(en ? 'level 2 at 10:00, level 3 at 10:15' : s.note)}</div>` : ''}
         ${isArea ? `<div style="font-size:11px;color:#6c7e90;margin-top:4px">${en ? 'The circle marks the administrative unit, not the flooded area.' : 'Kruh znázorňuje územnú jednotku, nie rozsah zaplavenia.'}</div>` : ''}
         ${isArea ? '' : photoBlock(s.lat, s.lon)}
         ${srcLinks(s.basin === 'horný a stredný Váh' ? ['shmu-vah'] : ['shmu-ms'])}`,
      )
      c.addTo(g)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [spaVisible, day])

  // Časový posuvník: stanice, zrážky a udalosti
  useEffect(() => {
    peakMarkers.current.forEach(({ p, m }) => {
      const done = peakDay(p) <= day
      m.setStyle(done ? { radius: 7.5, color: '#eef3f7', weight: 1.6, fillColor: nColor(p), fillOpacity: 1, opacity: 1 } : { radius: 4, color: '#6c7e90', weight: 1, fillColor: '#2a3542', fillOpacity: 0.9, opacity: 0.8 })
      m.setTooltipContent(`${p.station} · ${p.river}${done ? '' : en ? ` (peaks on ${sepDay(peakDay(p))})` : ` (kulminuje ${sepDay(peakDay(p))})`}`)
    })
    rainMarkers.current.forEach(({ r, m }) => {
      const sum = rainUpTo(r, day)
      const to = Math.min(day, 16)
      m.setRadius(sum > 0 ? 4 + Math.sqrt(sum) * 0.9 : 2)
      m.setTooltipContent(`${r.station}: ${nf(sum, 1)} mm`)
      m.setPopupContent(
        `${eyebrow(`${en ? 'Rain gauge · basin' : 'Zrážkomerná stanica · povodie'} ${r.basin}`)}
         <div style="font-size:16px;font-weight:600;margin:2px 0 6px">${r.station} <span style="color:#8a9bab;font-weight:400">(${r.elev} ${en ? 'm a.s.l.' : 'm n. m.'})</span></div>
         <div style="font-size:22px;font-weight:700;color:#8cc8ff">${nf(sum, 1)} mm</div>
         <div style="font-size:12px;color:#a9b8c6">${en ? `sum of 24-h totals to 06:00, 12–${to} Sep 2024` : `súčet 24-h úhrnov k 6:00, 12.–${to}. 9. 2024`} · ${en ? 'whole period' : 'celé obdobie'}: ${nf(r.total, 1)} mm</div>
         ${srcLinks(['shmu-ms'])}`,
      )
    })
    const g = groups.current?.events
    if (g) eventMarkers.current.forEach(({ day: d, m }) => (d <= day ? g.addLayer(m) : g.removeLayer(m)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [day])

  // Prehrávanie dní
  useEffect(() => {
    if (!playing) return
    const id = setInterval(() => {
      setDay((d) => {
        if (d >= DAY_MAX) {
          setPlaying(false)
          return d
        }
        return d + 1
      })
    }, 1400)
    return () => clearInterval(id)
  }, [playing])

  // Zapínanie vrstiev
  useEffect(() => {
    const m = map.current
    const g = groups.current
    if (!m || !g) return
    ;(Object.keys(g) as LayerKey[]).forEach((k) => {
      if (on[k]) g[k].addTo(m)
      else g[k].remove()
    })
  }, [on])

  // Vrstvy zaplavenia (Copernicus) — načítajú sa až pri prvom zapnutí
  useEffect(() => {
    const m = map.current
    if (!m) return
    ;(Object.keys(floodFile) as FloodKey[]).forEach(async (k) => {
      const existing = floodLayers.current[k]
      if (!flood[k]) {
        existing?.remove()
        return
      }
      if (existing) {
        existing.addTo(m)
        return
      }
      try {
        setFloodLoading(k)
        const res = await fetch(floodFile[k])
        const gj = await res.json()
        const layer = L.geoJSON(gj, { pane: 'flood', style: floodStyle[k], interactive: false })
        floodLayers.current[k] = layer
        layer.addTo(m)
      } catch {
        setTileError(true)
      } finally {
        setFloodLoading(null)
      }
    })
  }, [flood])

  useEffect(() => {
    const m = map.current
    if (!m) return
    Object.entries(bases.current).forEach(([k, l]) => (k === base ? l.addTo(m) : l.remove()))
    m.getContainer().classList.toggle('map-dark', base === 'dark' && darkFallback.current)
    if (labelLayer.current) {
      if (base === 'dark' && !darkFallback.current) labelLayer.current.addTo(m)
      else labelLayer.current.remove()
    }
    setTileError(false)
  }, [base])

  const fly = (lat: number, lon: number, z: number) =>
    z === 0 ? map.current?.flyToBounds(dataBounds, { padding: [24, 24], duration: 1.2 }) : map.current?.flyTo([lat, lon], z, { duration: 1.2 })

  const togglePlay = () => {
    if (playing) return setPlaying(false)
    if (day >= DAY_MAX) setDay(DAY_MIN)
    setPlaying(true)
  }

  return (
    <Section id="mapa">
      <SectionHeader
        letter="C"
        index="03"
        kicker={t('Interaktívna mapa', 'Interactive map')}
        title={t(<>Kde voda<br /><span className="text-fog-400">a kde rozhodnutia</span></>, <>Where the water went<br /><span className="text-fog-400">and where decisions were made</span></>)}
        lead={t(
          'Mapa zobrazuje doložené bodové údaje: kulminácie na vodomerných staniciach, úhrny zrážok, vyhlásené stupne povodňovej aktivity a udalosti doložené v zdrojoch. Rozsah zaplavenia ukazuje iba tam, kde ho zmapoval satelit Copernicus. Posuvníkom dní si prehráte, ako sa povodeň vyvíjala.',
          'The map shows documented point data: peaks at gauging stations, rainfall totals, declared flood activity levels and events documented in sources. Flood extent is shown only where the Copernicus satellite mapped it. Use the day slider to replay how the flood unfolded.',
        )}
      />

      <Reveal>
        <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-volt/40 bg-volt/10 px-4 py-2 text-sm text-volt-soft">
          <Camera size={15} /> {t('Kliknite na ľubovoľný bod. Zobrazia sa údaje, zdroje a fotky z miesta, ak existujú.', 'Click any point to see data, sources and photos from the site, if any exist.')}
        </p>
      </Reveal>
      <Lightbox place={gallery} onClose={() => setGallery(null)} />

      {/* Časový posuvník — spoločný pre všetky vrstvy */}
      <Reveal>
        <div className="panel p-4 md:p-5 mb-4 grid md:grid-cols-[auto_1fr_minmax(0,320px)] gap-4 md:gap-6 items-center">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay} className={`w-12 h-12 rounded-full inline-flex items-center justify-center transition-colors ${playing ? 'bg-warn-2 text-ink-950' : 'bg-volt text-ink-950 hover:bg-volt-soft'}`} aria-label={playing ? t('Zastaviť prehrávanie', 'Pause playback') : t('Prehrať priebeh povodne', 'Play the flood timeline')}>
              {playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
            </button>
            <div>
              <p className="eyebrow">{t('Stav k dňu', 'Status on')}</p>
              <p className="font-display text-3xl font-extrabold text-fog-50 tabular-nums leading-none" style={{ fontStretch: '80%' }}>{sepDay(day)}</p>
            </div>
          </div>
          <div>
            <input type="range" min={DAY_MIN} max={DAY_MAX} step={1} value={day} onChange={(e) => { setPlaying(false); setDay(Number(e.target.value)) }} className="w-full accent-[#3aa0ff]" aria-label={t('Deň septembra 2024', 'Day of September 2024')} aria-valuetext={sepDay(day)} />
            <div className="flex justify-between font-mono text-[10px] text-fog-500 mt-1">
              {Array.from({ length: DAY_MAX - DAY_MIN + 1 }, (_, i) => DAY_MIN + i).map((d) => (
                <button key={d} onClick={() => { setPlaying(false); setDay(d) }} className={d === day ? 'text-volt-soft' : 'hover:text-fog-100'}>{d}.</button>
              ))}
            </div>
            <p className="mt-2 font-mono text-[11px] text-fog-400">
              {spaVisible.length} {t('vyhlásení SPA', 'flood level declarations')} · {peaks.filter((p) => peakDay(p) <= day).length}/{peaks.length} {t('staníc po kulminácii', 'stations past peak')}
            </p>
          </div>
          <div className="text-sm min-h-[3rem]" aria-live="polite">
            {dayEvents.length ? (
              <ul className="space-y-1">
                {dayEvents.slice(0, 3).map((e) => (
                  <li key={e.id} className="text-fog-100 leading-snug before:content-['–_'] before:text-fog-500">{e.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-fog-500">{t('Bez kľúčovej udalosti na časovej osi.', 'No key timeline event this day.')}</p>
            )}
          </div>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-6">
        <Reveal className="order-1">
          <div className="relative panel overflow-hidden p-0">
            <div ref={el} className="h-[62vh] min-h-[420px] lg:h-[720px] w-full" role="application" aria-label={t('Interaktívna mapa západného a severozápadného Slovenska s bodmi povodňových údajov. Ovládanie: tlačidlá priblíženia, ťahanie; podrobnosti po kliknutí na bod. Rovnaké údaje sú dostupné aj v tabuľkách v kapitole Dáta.', 'Interactive map of western and north-western Slovakia with flood data points. Controls: zoom buttons, dragging; details on click. The same data are available as tables in the Data chapter.')} tabIndex={0} />
            {tileError && (
              <div className="absolute top-3 left-14 right-3 z-[500] flex items-center gap-2 rounded-lg bg-ink-900/90 border border-warn-1/40 px-3 py-2 text-xs text-warn-1">
                <WifiOff size={14} /> {t('Mapový podklad sa nenačítal (vyžaduje internet). Body s údajmi sa zobrazujú aj bez neho.', 'The base map did not load (internet required). Data points are shown anyway.')}
              </div>
            )}
            <div className="absolute bottom-3 left-3 z-[500] flex flex-wrap gap-1.5">
              {([
                [t('Celé územie', 'Whole area'), 0, 0, 0],
                ['Záhorie', 48.5, 17.1, 10],
                ['Bratislava', 48.16, 17.05, 12],
                [t('Dunaj – juh', 'Danube – south'), 47.85, 18.1, 9],
                ['Kysuce', 49.33, 18.72, 10],
              ] as [string, number, number, number][]).map(([l, la, lo, z]) => (
                <button key={l} onClick={() => fly(la, lo, z)} className="rounded-full bg-ink-900/85 backdrop-blur border border-line-strong px-3 py-1.5 text-[11px] text-fog-100 hover:border-volt">
                  {l}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <aside className="order-2 space-y-4" aria-label={t('Vrstvy a legenda mapy', 'Map layers and legend')}>
          <div className="panel p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="eyebrow inline-flex items-center gap-2"><Layers size={13} /> {t('Vrstvy', 'Layers')}</span>
              <div className="inline-flex rounded-full border border-line-strong p-0.5 text-[11px]" role="group" aria-label={t('Podkladová mapa', 'Base map')}>
                {(['dark', 'osm'] as const).map((b) => (
                  <button key={b} onClick={() => setBase(b)} aria-pressed={base === b} className={`px-2.5 py-1 rounded-full ${base === b ? 'bg-ink-600 text-fog-50' : 'text-fog-400'}`}>
                    {b === 'dark' ? t('Tmavá', 'Dark') : t('Svetlá', 'Light')}
                  </button>
                ))}
              </div>
            </div>
            <ul className="space-y-2">
              {(Object.keys(layerMeta) as LayerKey[]).map((k) => (
                <li key={k}>
                  <label className="flex items-start gap-3 cursor-pointer rounded-lg p-2 -m-2 hover:bg-ink-700/60">
                    <input type="checkbox" checked={on[k]} onChange={() => setOn((o) => ({ ...o, [k]: !o[k] }))} className="mt-1 accent-[#3aa0ff] w-4 h-4" />
                    <span>
                      <span className="block text-sm text-fog-50">{layerMeta[k].label}</span>
                      <span className="block text-xs text-fog-400">{layerMeta[k].desc} <Cite ids={layerMeta[k].src} /></span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="panel p-5">
            <span className="eyebrow">{t('Satelitné mapovanie zaplavenia', 'Satellite flood mapping')}</span>
            <ul className="mt-3 space-y-2">
              {(Object.keys(floodMeta) as FloodKey[]).map((k) => (
                <li key={k}>
                  <label className="flex items-start gap-3 cursor-pointer rounded-lg p-2 -m-2 hover:bg-ink-700/60">
                    <input type="checkbox" checked={flood[k]} onChange={() => setFlood((f) => ({ ...f, [k]: !f[k] }))} className="mt-1 accent-[#2dd4c4] w-4 h-4" />
                    <span>
                      <span className="flex items-center gap-2 text-sm text-fog-50">
                        <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: floodStyle[k].fillColor as string, opacity: 0.85 }} />
                        {floodMeta[k].label}
                        {floodLoading === k && <Loader2 size={13} className="animate-spin text-fog-400" />}
                      </span>
                      <span className="block text-xs text-fog-400">{floodMeta[k].desc} <Cite ids={['cems-monit02']} /></span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-fog-400 leading-relaxed">
              {t(
                'Radarová snímka COSMO-SkyMed z 18. 9. 2024 (16:30 UTC) pokrýva iba oblasť pozdĺž Moravy (Záhorie až po Devín). Mimo nej údaje o zaplavení nie sú. Polygóny sú pre web zjednodušené. Vrstva nezávisí od posuvníka dní.',
                'The COSMO-SkyMed radar image of 18 Sep 2024 (16:30 UTC) covers only the area along the Morava (Záhorie down to Devín). There is no flood data outside it. Polygons are simplified for the web. This layer does not follow the day slider.',
              )}
            </p>
          </div>

          <div className="panel p-5">
            <span className="eyebrow">{t('Legenda', 'Legend')}</span>
            <div className="mt-3 space-y-3 text-xs text-fog-300">
              <div>
                <p className="text-fog-100 mb-1.5">{t('Vodomerná stanica (plný bod) · doba opakovania prietoku', 'Gauging station (filled dot) · flow return period')}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {nLegend.map((n) => (
                    <span key={n.l} className="inline-flex items-center gap-2"><span className="w-3 h-3 rounded-full border-[1.5px] border-fog-50" style={{ background: n.c }} />{n.l}</span>
                  ))}
                  <span className="inline-flex items-center gap-2 col-span-2"><span className="w-2.5 h-2.5 rounded-full border border-fog-500 bg-ink-600" />{t('ešte nekulminovala (podľa posuvníka)', 'not yet peaked (per slider)')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2"><span className="w-4 h-4 rounded-full border border-volt bg-volt/20" /> {t('Zrážky: väčší kruh = vyšší úhrn do zvoleného dňa', 'Rainfall: larger circle = more rain up to the selected day')}</div>
              <div>
                <p className="text-fog-100 mb-1.5">{t('Vyhlásený stupeň povodňovej aktivity (dutý krúžok)', 'Declared flood activity level (hollow ring)')}</p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                  <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-2 border-warn-3" /> {t('3. SPA', 'level 3')}</span>
                  <span className="inline-flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full border-2 border-warn-2" /> {t('2. SPA', 'level 2')}</span>
                  <span className="inline-flex items-center gap-1.5"><span className="w-4 h-4 rounded-full border border-dashed border-warn-3" /> {t('celý okres / kraj', 'whole district / region')}</span>
                  <span className="inline-flex items-center gap-1.5"><span className="w-3 h-3 rounded-full border-[2.5px] border-warn-3 bg-warn-3/35" /> {t('vyhlásené v zvolený deň', 'declared on the selected day')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2"><span className="w-3 h-3 rotate-45 rounded-[3px] border-2 border-tide bg-tide/25" /> {t('Doložená udalosť (izolácia, evakuácia, škody)', 'Documented event (isolation, evacuation, damage)')}</div>
              <div className="flex items-center gap-2"><Camera size={14} className="text-fog-50" /> {t('Fotografie z miesta (číslo = počet fotiek)', 'Photos from the site (number = photo count)')}</div>
            </div>
          </div>

          <div className="rounded-xl border border-line p-4 text-xs text-fog-400 leading-relaxed flex gap-3">
            <Info size={16} className="shrink-0 text-volt-soft mt-0.5" />
            <p>
              {t('Polohy bodov sú stredy obcí podľa OpenStreetMap Nominatim, nie presné polohy vodočtov. Zoznam SPA zo správ SHMÚ uvádza najmä toky bez monitorovacej siete a neobsahuje všetky vyhlásenia (napr. Stupavu). Satelitné mapy zaplavenia (Copernicus EMS, aktivácia', 'Points are village centres from OpenStreetMap Nominatim, not exact gauge locations. The list of flood level declarations from SHMÚ reports covers mainly unmonitored streams and is not complete (e.g. Stupava is missing). Satellite flood maps (Copernicus EMS, activation')}{' '}
              <a href={sourceById['cems-act'].url} target="_blank" rel="noopener noreferrer" className="text-volt-soft underline underline-offset-2">EMSR757</a>) {t('sú dostupné u poskytovateľa.', 'are available from the provider.')}<Cite ids={['cems-act', 'osm', 'esri']} /> {t('Podkladové mapy: Esri Dark Gray Canvas (tmavá) a OpenStreetMap (svetlá).', 'Base maps: Esri Dark Gray Canvas (dark) and OpenStreetMap (light).')}
            </p>
          </div>
        </aside>
      </div>
    </Section>
  )
}
