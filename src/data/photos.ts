// Fotografie z miest povodne — iba diela s voľnou licenciou (Wikimedia Commons), s overeným dátumom a miestom.
// Mapa ku každému bodu hľadá najbližšie miesto s fotkami v okruhu PHOTO_RADIUS_KM.

export interface Photo {
  src: string
  alt: string
  date: string
  author: string
  license: string
  url: string
}

export interface PhotoPlace {
  id: string
  name: string
  lat: number
  lon: number
  note?: string
  photos: Photo[]
}

export const PHOTO_RADIUS_KM = 7

const kunec = (n: string, alt: string, date = '18. 9. 2024'): Photo => ({
  src: `./photos/ba-kunec-${n}.webp`, alt, date, author: 'Patrik Kunec', license: 'CC BY-SA 4.0',
  url: `https://commons.wikimedia.org/wiki/File:Bratislava_-_Rozvodnen%C3%BD_Dunaj_-_18._9._2024_${n}.jpg`,
})
const bsk = (n: string, alt: string): Photo => ({
  src: `./photos/bsk-${n}.webp`, alt, date: '16.–17. 9. 2024', author: 'Bratislavský samosprávny kraj', license: 'CC BY 2.0',
  url: `https://commons.wikimedia.org/wiki/File:Stav_rieky_Dunaj_v_centre_Bratislavy_16%E2%80%9317.9.2024_${n}.jpg`,
})
const angern = (n: string, alt: string): Photo => ({
  src: `./photos/angern-${n}.webp`, alt, date: '19. 9. 2024', author: 'Doronenko', license: 'CC0',
  url: `https://commons.wikimedia.org/wiki/File:Hochwasser_in_Angern_an_der_March_im_September_2024_${n}.jpg`,
})
const hodonin = (n: string, alt: string): Photo => ({
  src: `./photos/morava-hodonin-${n}.webp`, alt, date: '16. 9. 2024', author: 'Doronenko', license: 'CC0',
  url: `https://commons.wikimedia.org/wiki/File:Povode%C5%88_na_%C5%99ece_Morav%C4%9B_v_z%C3%A1%C5%99%C3%AD_2024_${n}.jpg`,
})

export const photoPlaces: PhotoPlace[] = [
  {
    id: 'bratislava',
    name: 'Bratislava – Dunaj v centre mesta',
    lat: 48.1395,
    lon: 17.11,
    photos: [
      { src: './photos/hero-stary-most.webp', alt: 'Zaplavené Tyršovo nábrežie, v pozadí Most SNP a Bratislavský hrad', date: '17. 9. 2024', author: 'Akkbula', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Flood_on_the_Danube_in_Bratislava_17.09.2024.jpg' },
      { src: './photos/tyrsovo.webp', alt: 'Zaplavené Tyršovo nábrežie zo Starého mosta', date: '17. 9. 2024', author: 'Akkbula', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Flooded_Tyr%C5%A1ovo_n%C3%A1bre%C5%BEie_in_Bratislava_17.09.2024.jpg' },
      bsk('04', 'Zaplavené nábrežie Dunaja v Bratislave, letecký pohľad'),
      bsk('02', 'Zaplavené nábrežie Dunaja v centre Bratislavy'),
      bsk('05', 'Panoráma rozvodneného Dunaja so Starým mostom'),
      kunec('03', 'Zaplavené nábrežie pri budove Filozofickej fakulty UK, pohľad zo Starého mosta'),
      kunec('02', 'Rozvodnený Dunaj zo Starého mosta smerom k Filozofickej fakulte UK'),
      kunec('05', 'Rozvodnený Dunaj zo Starého mosta smerom k Eurovei'),
      kunec('07', 'Zaplavené nábrežie pri Filozofickej fakulte UK, pohľad k Starému mostu'),
      { src: './photos/dunaj-18-06.webp', alt: 'Rozvodnený Dunaj zo Starého mosta smerom k Eurovei', date: '18. 9. 2024', author: 'Patrik Kunec', license: 'CC BY-SA 4.0', url: 'https://commons.wikimedia.org/wiki/File:Bratislava_-_Rozvodnen%C3%BD_Dunaj_-_18._9._2024_06.jpg' },
    ],
  },
  {
    id: 'zahorska-ves',
    name: 'Morava pri Záhorskej Vsi (rakúsky breh, Angern an der March)',
    lat: 48.3816,
    lon: 16.8291,
    note: 'Fotky sú z rakúskeho brehu Moravy, priamo oproti Záhorskej Vsi. Prievoz Angern – Záhorská Ves bol mimo prevádzky.',
    photos: [
      angern('01', 'Zatvorená cesta k prievozu Angern – Záhorská Ves s tabuľou „Kein Fährbetrieb“'),
      angern('02', 'Zaplavená cesta za tabuľou obce Angern an der March'),
      angern('04', 'Rozliata Morava v nive medzi Angernom a Záhorskou Vsou'),
      angern('05', 'Vodočet v zaplavenom teréne pri Morave'),
      angern('07', 'Zaplavená vegetácia v nive Moravy'),
      angern('09', 'Cesta končiaca vo vode rozliatej Moravy'),
    ],
  },
  {
    id: 'holic',
    name: 'Morava pri Holíči a Hodoníne',
    lat: 48.8381,
    lon: 17.1301,
    note: 'Fotky sú z českého brehu Moravy pri Hodoníne, na hranici s Holíčom.',
    photos: [
      hodonin('04', 'Mobilné protipovodňové zábrany pri rozvodnenej Morave'),
      hodonin('01', 'Uzavretá cesta pozdĺž rozvodnenej Moravy, v pozadí most'),
      hodonin('02', 'Rozvodnená Morava pri hraničnom moste'),
      hodonin('03', 'Rozliata Morava z mosta'),
    ],
  },
  {
    id: 'sutok',
    name: 'Sútok Moravy a Dunaja – satelitný pohľad',
    lat: 48.19,
    lon: 16.975,
    photos: [
      { src: './photos/nasa-landsat.webp', alt: 'Satelitná snímka Landsat v nepravých farbách: zaplavená niva Moravy nad sútokom s Dunajom', date: '21. 9. 2024', author: 'NASA Earth Observatory (M. Garrison), dáta Landsat/USGS', license: 'voľné dielo', url: 'https://commons.wikimedia.org/wiki/File:Rivers_in_Europe_Burst_Their_Banks_(153358_-_bratislavaflooding_oli2_20240921_lrg).jpg' },
    ],
  },
]

const R = 6371
export function distanceKm(aLat: number, aLon: number, bLat: number, bLon: number) {
  const dLat = ((bLat - aLat) * Math.PI) / 180
  const dLon = ((bLon - aLon) * Math.PI) / 180
  const x = Math.sin(dLat / 2) ** 2 + Math.cos((aLat * Math.PI) / 180) * Math.cos((bLat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}

export function nearestPhotoPlace(lat: number, lon: number): PhotoPlace | null {
  let best: PhotoPlace | null = null
  let bd = Infinity
  for (const p of photoPlaces) {
    const d = distanceKm(lat, lon, p.lat, p.lon)
    if (d < bd) {
      bd = d
      best = p
    }
  }
  return bd <= PHOTO_RADIUS_KM ? best : null
}
