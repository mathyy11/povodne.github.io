import { useEffect, useMemo, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'motion/react'
import {
  Bar, BarChart, CartesianGrid, Cell, LabelList, Legend, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis,
} from 'recharts'
import { Cite, Figure, Reveal, Section, SectionHeader } from '../components/ui'
import { WarningsGantt, leadTimes } from '../charts/WarningsGantt'
import { ReturnPeriods, returnRows } from '../charts/ReturnPeriods'
import { WaveTravel, waveRows } from '../charts/WaveTravel'
import { danubeProfile, dailyRain, monthlyRainSK, spending, warningCounts } from '../data/hydro'
import { useContent } from '../data/content'
import { useT } from '../lib/i18n'
import spaRaw from '../data/spa.json'
import { eur, nf, sepDay } from '../lib/format'

// „15. 9. 19:00“ → „15 Sep 19:00“ v angličtine
const fmtWhen = (s: string) => s.replace(/(\d+)\. 9\./, (_m, d) => sepDay(d))


const tooltipStyle = {
  contentStyle: { background: '#0d141d', border: '1px solid rgba(150,185,215,.22)', borderRadius: 12, fontSize: 12, color: '#eef3f7', boxShadow: '0 20px 40px -10px rgba(0,0,0,.6)' },
  labelStyle: { color: '#a9b8c6', fontFamily: 'var(--font-mono)', fontSize: 11, marginBottom: 4 },
  itemStyle: { color: '#eef3f7', padding: 0 },
  cursor: { fill: 'rgba(150,185,215,.06)' },
}

// Sekvenčná modrá škála pre dni 12.–16. 9. (od svetlej po tmavú)
const dayColors = ['#cfe6ff', '#8cc8ff', '#3aa0ff', '#1f6fd1', '#1b4f93']
const dayKeys = ['d12', 'd13', 'd14', 'd15', 'd16'] as const

function CountUp({ to, decimals = 0, suffix = '' }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduce = useReducedMotion()
  const [v, setV] = useState(reduce ? to : 0)
  useEffect(() => {
    if (!inView || reduce) return
    const c = animate(0, to, { duration: 1.6, ease: [0.16, 1, 0.3, 1], onUpdate: setV })
    return () => c.stop()
  }, [inView, to, reduce])
  return <span ref={ref} className="tabular-nums">{nf(v, decimals)}{suffix}</span>
}

export function Data() {
  const t = useT()
  const { damages, compare2013 } = useContent()
  const [basin, setBasin] = useState<'Morava' | 'dolný Váh'>('Morava')
  const rain = useMemo(() => dailyRain.filter((r) => r.basin === basin).sort((a, b) => b.total - a.total), [basin])
  const spaByDay = useMemo(() => {
    const spa = spaRaw as { day: number; level: number }[]
    return Array.from({ length: 9 }, (_, i) => 13 + i).map((d) => ({
      day: sepDay(d),
      l3: spa.filter((s) => s.day === d && s.level === 3).length,
      l2: spa.filter((s) => s.day === d && s.level === 2).length,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t])
  const leads = useMemo(leadTimes, [])
  const totalWarnings = warningCounts.reduce((a, b) => a + b.l1 + b.l2 + b.l3, 0)

  return (
    <Section id="data" className="bg-ink-850/60">
      <SectionHeader
        letter="G"
        index="07"
        kicker={t('Dáta a následky', 'Data and impacts')}
        title={t(<>Čísla,<br /><span className="text-fog-400">ktoré sa dajú doložiť</span></>, <>Numbers<br /><span className="text-fog-400">that can be verified</span></>)}
        lead={t('Všetky grafy používajú iba hodnoty z oficiálnych zdrojov. Pri každom je uvedená jednotka, obdobie a zdroj. Údaje SHMÚ sú operatívne a podľa SHMÚ ešte neprešli úplnou revíziou. Každý graf sa dá prepnúť na tabuľku.', 'All charts use only values from official sources. Each shows its unit, period and source. SHMÚ data are operational and, according to SHMÚ, not yet fully reviewed. Every chart can be switched to a table.')}
      />

      {/* Animované kľúčové čísla */}
      <Reveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mb-16">
          {[
            { v: totalWarnings, l: t('hydrologických výstrah SHMÚ v septembri', 'SHMÚ hydrological warnings in September'), s: t('povodia Moravy, Dunaja, Váhu a Nitry', 'Morava, Danube, Váh and Nitra basins'), src: ['shmu-ms', 'shmu-vah'] },
            { v: 153, l: t('zásahov hasičov za 16.–17. 9. (ráno)', 'fire service call-outs, 16–17 Sep (morning)'), s: t('141 príslušníkov HaZZ, 316 členov DHZ', '141 professional and 316 volunteer firefighters'), src: ['tasr-1709'] },
            { v: spending.spa3, l: t('vyhlásení III. SPA v 2. polroku 2024', 'level III declarations in H2 2024'), s: t('a 144 vyhlásení II. SPA a 14 mimoriadnych situácií', 'plus 144 level II declarations and 14 emergency situations'), src: ['tasr-vlada25'] },
            { v: 7.66, d: 2, suf: t(' mil. €', ' m €'), l: t('vyčíslené povodňové škody', 'quantified flood damage'), s: t('júl–december 2024, všetkých 8 krajov', 'July–December 2024, all 8 regions'), src: ['tasr-vlada25'] },
          ].map((k) => (
            <div key={k.l} className="border-t border-line-strong pt-5">
              <p className="font-display text-[clamp(2.4rem,5vw,3.8rem)] font-extrabold text-volt-soft leading-none" style={{ fontStretch: '78%' }}>
                <CountUp to={k.v} decimals={k.d ?? 0} suffix={k.suf ?? ''} />
              </p>
              <p className="mt-3 text-fog-100 font-medium leading-snug">{k.l}</p>
              <p className="mt-1 text-sm text-fog-400">{k.s} <Cite ids={k.src} /></p>
            </div>
          ))}
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* 1 Mesačné zrážky */}
        <Reveal>
          <Figure
            id="f-monthly"
            title={t('September bol najvlhším mesiacom roka', 'September was the wettest month of the year')}
            subtitle={t('Mesačný úhrn zrážok, priemer za územie Slovenska. Popisky udávajú % dlhodobého normálu.', 'Monthly rainfall, average over Slovakia. Labels show % of the long-term normal.')}
            unit="mm (1 mm = 1 l/m²)"
            period={t('január–december 2024 · normál 1901–2000', 'January–December 2024 · normal 1901–2000')}
            src={['shmu-rok']}
            table={{ head: [t('Mesiac', 'Month'), t('Úhrn (mm)', 'Total (mm)'), t('% normálu', '% of normal')], rows: monthlyRainSK.map((m) => [m.m, m.mm, m.pct]) }}
          >
            <div className="h-[300px]">
              <ResponsiveContainer>
                <BarChart data={monthlyRainSK} margin={{ top: 24, right: 8, left: -12, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="m" tickLine={false} axisLine={{ stroke: 'rgba(150,185,215,.2)' }} />
                  <YAxis tickLine={false} axisLine={false} width={44} />
                  <Tooltip {...tooltipStyle} formatter={(v, _n, p) => [`${v} mm (${(p.payload as { pct: number }).pct} % ${t('normálu', 'of normal')})`, t('Úhrn', 'Total')]} labelFormatter={(l) => `${t('Mesiac', 'Month')} ${l}`} />
                  <Bar dataKey="mm" radius={[4, 4, 0, 0]} maxBarSize={34} stroke="#0d141d" strokeWidth={1}>
                    {monthlyRainSK.map((m) => <Cell key={m.m} fill={m.m === 'IX' ? '#3aa0ff' : '#3a4a5c'} />)}
                    <LabelList dataKey="pct" position="top" formatter={(v: unknown) => `${v}%`} style={{ fill: '#8a9bab', fontSize: 9.5, fontFamily: 'var(--font-mono)' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Figure>
        </Reveal>

        {/* 2 Denné zrážky */}
        <Reveal delay={0.05}>
          <Figure
            id="f-daily"
            title={t('Kde a kedy pršalo', 'Where and when it rained')}
            subtitle={t('Denné úhrny zrážok na staniciach SHMÚ, zoradené podľa súčtu', 'Daily rainfall at SHMÚ stations, sorted by total')}
            unit={t('mm za 24 h (k 6:00)', 'mm per 24 h (to 06:00)')}
            period={t('12.–16. 9. 2024', '12–16 Sep 2024')}
            src={['shmu-ms']}
            table={{ head: [t('Stanica', 'Station'), sepDay(12), sepDay(13), sepDay(14), sepDay(15), sepDay(16), 'Σ mm'], rows: rain.map((r) => [r.station, r.d12, r.d13, r.d14, r.d15, r.d16, r.total]) }}
          >
            <div className="flex gap-1.5 mb-3" role="group" aria-label={t('Povodie', 'Basin')}>
              {(['Morava', 'dolný Váh'] as const).map((b) => (
                <button key={b} onClick={() => setBasin(b)} aria-pressed={basin === b} className={`rounded-full px-3 py-1 text-xs border ${basin === b ? 'bg-ink-600 border-line-strong text-fog-50' : 'border-line text-fog-400'}`}>
                  {t('Povodie', 'Basin')}: {b === 'dolný Váh' ? t('dolný Váh', 'lower Váh') : b}
                </button>
              ))}
            </div>
            <div className="h-[300px]">
              <ResponsiveContainer>
                <BarChart data={rain} layout="vertical" margin={{ top: 0, right: 30, left: 8, bottom: 0 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} />
                  <YAxis type="category" dataKey="station" width={112} tickLine={false} axisLine={false} interval={0} tick={{ fontSize: 11 }} />
                  <Tooltip {...tooltipStyle} formatter={(v, n) => [`${nf(Number(v), 1)} mm`, sepDay(String(n).replace('d', ''))]} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11, color: '#a9b8c6' }} formatter={(v: unknown) => sepDay(String(v).replace('d', ''))} />
                  {dayKeys.map((k, i) => (
                    <Bar key={k} dataKey={k} stackId="a" fill={dayColors[i]} stroke="#0d141d" strokeWidth={1} radius={i === 4 ? [0, 4, 4, 0] : 0}>
                      {i === 4 && <LabelList dataKey="total" position="right" formatter={(v: unknown) => nf(Number(v), 0)} style={{ fill: '#a9b8c6', fontSize: 10, fontFamily: 'var(--font-mono)' }} />}
                    </Bar>
                  ))}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Figure>
        </Reveal>

        {/* 3 Dunaj — pozdĺžny profil */}
        <Reveal>
          <Figure
            id="f-danube"
            title={t('Povodňová vlna Dunaja od Rakúska po Štúrovo', 'The Danube flood wave from Austria to Štúrovo')}
            subtitle={t('Kulminačný prietok v profiloch v smere toku (vyššia z dvoch vĺn)', 'Peak discharge at gauges downstream (the higher of the two waves)')}
            unit="m³/s"
            period={t('15.–20. 9. 2024', '15–20 Sep 2024')}
            src={['shmu-ms']}
            note={t('AT = rakúske profily (sivé), SK = slovenské profily (modré). Doba opakovania je v tooltipe.', 'AT = Austrian gauges (grey), SK = Slovak gauges (blue). The return period is in the tooltip.')}
            table={{ head: [t('Profil', 'Gauge'), t('Štát', 'Country'), 'Qmax (m³/s)', t('N (roky)', 'N (years)'), t('Kulminácia (SEČ)', 'Peak (CET)')], rows: danubeProfile.map((d) => [d.station, d.country, nf(d.q), d.n, fmtWhen(d.when)]) }}
          >
            <div className="h-[320px]">
              <ResponsiveContainer>
                <BarChart data={danubeProfile} margin={{ top: 24, right: 8, left: 0, bottom: 4 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="station" tickLine={false} interval={0} tick={{ fontSize: 9.5 }} angle={-30} textAnchor="end" height={78} axisLine={{ stroke: 'rgba(150,185,215,.2)' }} />
                  <YAxis tickLine={false} axisLine={false} domain={[0, 11000]} width={52} tickFormatter={(v) => nf(v)} />
                  <Tooltip {...tooltipStyle} formatter={(v, _n, p) => { const d = p.payload as (typeof danubeProfile)[number]; return [`${nf(Number(v))} m³/s · ${d.n}${t('-ročná voda', '-year flood')} · ${fmtWhen(d.when)}`, d.country === 'SK' ? t('Slovensko', 'Slovakia') : t('Rakúsko', 'Austria')] }} />
                  <Bar dataKey="q" radius={[4, 4, 0, 0]} maxBarSize={40} stroke="#0d141d" strokeWidth={1}>
                    {danubeProfile.map((d) => <Cell key={d.station} fill={d.country === 'SK' ? '#3aa0ff' : '#4b5a6b'} />)}
                    <LabelList dataKey="q" position="top" formatter={(v: unknown) => nf(Number(v))} style={{ fill: '#a9b8c6', fontSize: 9.5, fontFamily: 'var(--font-mono)' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Figure>
        </Reveal>

        {/* 4 Doby opakovania */}
        <Reveal delay={0.05}>
          <Figure
            id="f-return"
            title={t('Ako výnimočné boli prietoky', 'How exceptional the flows were')}
            subtitle={t('Doba opakovania kulminačného prietoku (logaritmická os). Pás znázorňuje interval, ak ho SHMÚ uvádza.', 'Return period of the peak flow (log scale). The band shows a range where SHMÚ gives one.')}
            unit={t('roky (N-ročnosť)', 'years (return period)')}
            period={t('13.–20. 9. 2024', '13–20 Sep 2024')}
            src={['shmu-ms', 'shmu-vah']}
            note={t('Malina v Jakubove: situáciu ovplyvnilo pretrhnutie hrádze toku. Doby opakovania sú predbežné.', 'Malina at Jakubov: influenced by a breach of the stream’s dike. Return periods are preliminary.')}
            table={{ head: [t('Stanica', 'Station'), t('Tok', 'River'), t('N (roky)', 'N (years)'), t('Kulminácia', 'Peak')], rows: returnRows.map((p) => [p.station, p.river, p.nMin === p.nMax ? String(p.nMax) : `${p.nMin}–${p.nMax}`, `${sepDay(parseInt(p.date))} ${p.time}`]) }}
          >
            <ReturnPeriods />
          </Figure>
        </Reveal>
      </div>

      {/* 5 Výstrahy — široký graf */}
      <Reveal className="mt-6 block">
        <Figure
          id="f-warn"
          title={t('Predstih výstrah: veľké rieky áno, malé toky nie', 'Warning lead time: yes for big rivers, no for small streams')}
          subtitle={t('Platnosť hydrologických výstrah SHMÚ podľa okresov a kulminácia na stanici v okrese. Prejdite myšou na riadok.', 'Validity of SHMÚ hydrological warnings by district and the peak at a station in the district. Hover over a row.')}
          unit={t('čas SEČ; predstih v hodinách', 'time CET; lead time in hours')}
          period={t('13.–25. 9. 2024', '13–25 Sep 2024')}
          src={['shmu-ms']}
          note={t('Predstih je vypočítaný autormi z tabuliek 3.3–3.8 a 4.5–4.7 povodňovej správy SHMÚ. Ide o analytický ukazovateľ, nie o oficiálny údaj SHMÚ.', 'Lead time calculated by the authors from tables 3.3–3.8 and 4.5–4.7 of the SHMÚ flood report. It is an analytical indicator, not an official SHMÚ figure.')}
          table={{
            head: [t('Okres', 'District'), t('Stanica (kulminácia)', 'Station (peak)'), t('Kulminácia', 'Peak'), t('Výstraha 3° od', 'Level-3 warning from'), t('Predstih 3° (h)', 'Lead 3° (h)'), t('Predstih ≥2° (h)', 'Lead ≥2° (h)')],
            rows: leads.map((l) => [l.district, l.station, `${sepDay(parseInt(l.peak.slice(8, 10)))} ${l.peak.slice(11)}`, `${sepDay(parseInt(l.w3from.slice(8, 10)))} ${l.w3from.slice(11)}`, nf(l.lead3, 1), nf(l.lead2, 1)]),
          }}
        >
          <WarningsGantt />
        </Figure>
      </Reveal>

      {/* 6 Postup kulminácie + 2013 */}
      <div className="mt-6 grid grid-cols-[minmax(0,1fr)] lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-6">
        <Reveal>
          <Figure
            id="f-wave"
            title={t('Ako putovala povodňová vlna', 'How the flood wave travelled')}
            subtitle={t('Čas kulminácie na staniciach Moravy a Dunaja v smere toku. Prejdite myšou na stanicu.', 'Time of peak at Morava and Danube stations, downstream. Hover over a station.')}
            unit={t('čas SEČ; vodný stav cm; prietok m³/s', 'time CET; water level cm; discharge m³/s')}
            period={t('16.–20. 9. 2024', '16–20 Sep 2024')}
            src={['shmu-ms']}
            note={t('Hodinový priebeh hladín (hydrogram) SHMÚ verejne nearchivuje, preto graf ukazuje iba doložené časy kulminácií. Vodné stavy rôznych staníc nie sú navzájom porovnateľné.', 'SHMÚ does not publicly archive hourly water levels (hydrographs), so the chart shows only documented peak times. Water levels at different stations are not comparable.')}
            table={{ head: [t('Stanica', 'Station'), t('Tok', 'River'), t('Kulminácia (SEČ)', 'Peak (CET)'), 'H (cm)', 'Q (m³/s)'], rows: waveRows.map((r) => [r.station, r.river === 'Dunaj' ? t('Dunaj', 'Danube') : r.river, `${sepDay(parseInt(r.at.slice(8, 10)))} ${r.at.slice(11)}`, r.h ?? '–', r.q ? nf(r.q) : '–']) }}
          >
            <WaveTravel />
          </Figure>
        </Reveal>
        <Reveal delay={0.05}>
          <Figure
            id="f-2013"
            title={t('2024 vs. rekord z roku 2013', '2024 vs. the 2013 record')}
            subtitle={t('Dunaj v Bratislave: najvyšší vodný stav', 'Danube in Bratislava: highest water level')}
            unit="cm; m³/s"
            period={t('jún 2013 a september 2024', 'June 2013 and September 2024')}
            src={['svp-2013', 'shmu-ms']}
            note={t('Prietok 2013 uvádza SVP pre Bratislavu, prietok 2024 je zo stanice Devín (pre Bratislavu ho SHMÚ neuvádza). Porovnanie prietokov je preto iba orientačné.', 'The 2013 discharge is given by SVP for Bratislava; the 2024 discharge is from the Devín station (SHMÚ gives none for Bratislava). The discharge comparison is only indicative.')}
            table={{ head: [t('Rok', 'Year'), 'Hmax Bratislava (cm)', 'Qmax (m³/s)'], rows: [['2013', compare2013.y2013.h, `${nf(compare2013.y2013.q)} (Bratislava)`], ['2024', compare2013.y2024.h, `${nf(compare2013.y2024.q)} (Devín)`]] }}
          >
            <div className="space-y-6 pt-2">
              {[
                { y: '2013', h: compare2013.y2013.h, q: compare2013.y2013.q, qp: 'Bratislava', col: '#4b5a6b' },
                { y: '2024', h: compare2013.y2024.h, q: compare2013.y2024.q, qp: 'Devín', col: '#3aa0ff' },
              ].map((r) => (
                <div key={r.y}>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-3xl font-extrabold text-fog-50" style={{ fontStretch: '78%' }}>{r.y}</span>
                    <span className="font-mono text-sm text-fog-100 tabular-nums">{nf(r.h)} cm</span>
                  </div>
                  <div className="mt-2 h-3 rounded-full bg-ink-600 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(r.h / 1100) * 100}%`, background: r.col }} />
                  </div>
                  <p className="mt-1.5 font-mono text-[11px] text-fog-400">Q<sub>max</sub> {nf(r.q)} m³/s ({r.qp})</p>
                </div>
              ))}
              <div className="rounded-xl border border-line p-4 text-sm text-fog-300 leading-relaxed">
                <p className="text-fog-50 font-semibold mb-1">{t('−49 cm oproti roku 2013', '−49 cm compared with 2013')}</p>
                {compare2013.protection.text}<Cite ids={[compare2013.protection.src]} />
              </div>
            </div>
          </Figure>
        </Reveal>
      </div>

      <div className="mt-6 grid lg:grid-cols-2 gap-6">
        {/* 7 SPA podľa dní */}
        <Reveal>
          <Figure
            id="f-spa"
            title={t('Vlna rozhodnutí postupovala s vodou', 'The wave of decisions followed the water')}
            subtitle={t('Počet vyhlásení stupňa povodňovej aktivity podľa dňa', 'Number of flood activity level declarations per day')}
            unit={t('počet vyhlásení', 'declarations')}
            period={t('13.–21. 9. 2024', '13–21 Sep 2024')}
            src={['shmu-ms', 'shmu-vah']}
            note={t('Iba vyhlásenia uvedené v povodňových správach SHMÚ (prevažne toky bez monitorovacej siete). Nejde o úplný zoznam za Slovensko.', 'Only declarations listed in SHMÚ flood reports (mostly unmonitored streams). Not a complete list for Slovakia.')}
            table={{ head: [t('Deň', 'Day'), t('3. SPA', 'Level 3'), t('2. SPA', 'Level 2')], rows: spaByDay.map((d) => [d.day, d.l3, d.l2]) }}
          >
            <div className="h-[260px]">
              <ResponsiveContainer>
                <BarChart data={spaByDay} margin={{ top: 20, right: 8, left: -18, bottom: 0 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={{ stroke: 'rgba(150,185,215,.2)' }} />
                  <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
                  <Tooltip {...tooltipStyle} formatter={(v, n) => [v, n === 'l3' ? t('3. SPA', 'Level 3') : t('2. SPA', 'Level 2')]} />
                  <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: 11 }} formatter={(v: unknown) => (v === 'l3' ? t('3. SPA', 'Level 3') : t('2. SPA', 'Level 2'))} />
                  <Bar dataKey="l3" stackId="s" fill="#ff4d4f" stroke="#0d141d" strokeWidth={1} maxBarSize={36} />
                  <Bar dataKey="l2" stackId="s" fill="#ff8a3d" stroke="#0d141d" strokeWidth={1} radius={[4, 4, 0, 0]} maxBarSize={36} />
                  <ReferenceLine x={sepDay(15)} stroke="rgba(238,243,247,.4)" strokeDasharray="3 3" label={{ value: t('vrchol zrážok', 'rainfall peak'), fill: '#8a9bab', fontSize: 10, position: 'insideTopRight' }} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Figure>
        </Reveal>

        {/* 7 Škody */}
        <Reveal delay={0.05}>
          <Figure
            id="f-dmg"
            title={t('Kto niesol škody', 'Who bore the damage')}
            subtitle={t('Povodňové škody podľa vlastníka majetku', 'Flood damage by property owner')}
            unit="€"
            period={t('povodne júl–december 2024 (nie iba september)', 'floods July–December 2024 (not only September)')}
            src={['tasr-vlada25']}
            note={t('Hodnoty štátu a obcí sú uvedené ako „viac ako“, teda zaokrúhlené nadol. Refundácia výdavkov: viac ako 10,82 mil. € (zabezpečovacie práce 4,42 mil. €, záchranné práce 6,35 mil. €).', 'State and municipal values are given as “more than”, i.e. rounded down. Cost reimbursement: more than €10.82 m (protection works €4.42 m, rescue works €6.35 m).')}
            table={{ head: [t('Vlastník', 'Owner'), t('Škoda (€)', 'Damage (€)')], rows: damages.map((d) => [d.who, (d.approx ? '> ' : '') + nf(d.eur)]) }}
          >
            <div className="h-[260px]">
              <ResponsiveContainer>
                <BarChart data={damages} layout="vertical" margin={{ top: 0, right: 104, left: 8, bottom: 0 }}>
                  <CartesianGrid horizontal={false} />
                  <XAxis type="number" tickLine={false} axisLine={false} tickFormatter={(v) => `${nf(v / 1e6, 0)} ${t('mil.', 'm')}`} />
                  <YAxis type="category" dataKey="who" width={150} tickLine={false} axisLine={false} tick={{ fontSize: 11 }} />
                  <Tooltip {...tooltipStyle} formatter={(v, _n, p) => [`${(p.payload as { approx: boolean }).approx ? t('viac ako ', 'more than ') : ''}${eur(Number(v))}`, t('Škoda', 'Damage')]} />
                  <Bar dataKey="eur" fill="#3aa0ff" radius={[0, 4, 4, 0]} maxBarSize={30}>
                    <LabelList dataKey="eur" position="right" formatter={(v: unknown) => eur(Number(v))} style={{ fill: '#a9b8c6', fontSize: 10.5, fontFamily: 'var(--font-mono)' }} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Figure>
        </Reveal>
      </div>

      <p className="mt-8 text-sm text-fog-500 max-w-3xl">
        {t('Údaje o počte evakuovaných osôb, počte zaplavených domov a obetiach na životoch za Slovensko sa v overených oficiálnych zdrojoch nepodarilo nájsť. Preto ich neuvádzame ani neodhadujeme.', 'Figures for evacuated people, flooded homes and deaths in Slovakia could not be found in verified official sources. We therefore neither show nor estimate them.')}
      </p>
    </Section>
  )
}
