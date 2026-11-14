import { useState } from 'react'
import { useT } from '../lib/i18n'
import { nf, sepDay } from '../lib/format'

// Postup kulminácie v čase — namiesto hodinového hydrogramu (hodinové rady SHMÚ nie sú verejne archivované).
// Body = časy kulminácií podľa SHMÚ (tab. 3.3 a 3.6), SEČ.
type Row = { station: string; river: 'Dunaj' | 'Morava'; at: string; h?: number; q?: number; note?: string; noteEn?: string; country?: 'AT' }
export const waveRows: Row[] = [
  { station: 'Wildungsmauer (AT)', river: 'Dunaj', at: '2024-09-17T21:00', q: 8200, country: 'AT', note: '2. vlna (1. vlna 16. 9. 8:00, 9 700 m³/s)', noteEn: '2nd wave (1st wave 16 Sep 08:00, 9,700 m³/s)' },
  { station: 'Thebnerstrassl (AT)', river: 'Dunaj', at: '2024-09-18T05:00', q: 9600, country: 'AT', note: 'vlny sa spojili', noteEn: 'waves merged' },
  { station: 'Devín', river: 'Dunaj', at: '2024-09-18T06:00', h: 913, q: 9441, note: '2. kulminácia (1. 17. 9. 3:00)', noteEn: '2nd peak (1st: 17 Sep 03:00)' },
  { station: 'Bratislava', river: 'Dunaj', at: '2024-09-18T13:30', h: 985, note: '2. kulminácia (1. 17. 9. 10:45)', noteEn: '2nd peak (1st: 17 Sep 10:45)' },
  { station: 'Gabčíkovo', river: 'Dunaj', at: '2024-09-19T04:00', h: 773 },
  { station: 'Medveďov', river: 'Dunaj', at: '2024-09-19T11:45', h: 932, q: 9272 },
  { station: 'Komárno', river: 'Dunaj', at: '2024-09-20T04:15', h: 833, q: 8357 },
  { station: 'Štúrovo', river: 'Dunaj', at: '2024-09-20T11:15', h: 749, q: 8493 },
  { station: 'Kopčany', river: 'Morava', at: '2024-09-17T02:00', h: 620, q: 555.2 },
  { station: 'Moravský Sv. Ján', river: 'Morava', at: '2024-09-17T15:30', h: 585, q: 1059 },
  { station: 'Záhorská Ves', river: 'Morava', at: '2024-09-18T05:45', h: 650, q: 1030 },
  { station: 'Devínska Nová Ves', river: 'Morava', at: '2024-09-18T09:15', h: 839, note: 'vzdutie Dunajom', noteEn: 'Danube backwater' },
]
const firstPeaks = [
  { station: 'Devín', at: '2024-09-17T03:00' },
  { station: 'Bratislava', at: '2024-09-17T10:45' },
]

const T0 = new Date('2024-09-15T12:00').getTime()
const T1 = new Date('2024-09-20T18:00').getTime()

export function WaveTravel() {
  const t = useT()
  const [hover, setHover] = useState<string | null>(null)
  const W = 900
  const left = 160
  const right = 80
  const top = 28
  const rowH = 30
  const plotW = W - left - right
  const x = (iso: string) => left + ((new Date(iso).getTime() - T0) / (T1 - T0)) * plotW
  const ordered = [...waveRows.filter((r) => r.river === 'Morava'), ...waveRows.filter((r) => r.river === 'Dunaj')]
  const y = (st: string) => top + ordered.findIndex((r) => r.station === st) * rowH + rowH / 2
  const H = top + ordered.length * rowH + 10
  const danube = waveRows.filter((r) => r.river === 'Dunaj')
  const morava = waveRows.filter((r) => r.river === 'Morava')
  const line = (rows: Row[]) => rows.map((r, i) => `${i ? 'L' : 'M'}${x(r.at)},${y(r.station)}`).join(' ')
  const days = [16, 17, 18, 19, 20]

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <p className="md:hidden mb-2 font-mono text-[10px] text-fog-500">{t('← graf posuňte do strany →', '← scroll the chart sideways →')}</p>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full min-w-[640px]" role="img" aria-label={t('Časy kulminácií na Morave a Dunaji 16. až 20. septembra 2024. Hodnoty sú v tabuľke.', 'Peak times on the Morava and Danube, 16 to 20 September 2024. Values are in the table.')}>
        {days.map((d) => {
          const xx = x(`2024-09-${d}T00:00`)
          return (
            <g key={d}>
              <line x1={xx} x2={xx} y1={top - 6} y2={H - 8} stroke="rgba(150,185,215,.09)" />
              <text x={xx + 3} y={top - 12} fill="var(--color-fog-500)" fontSize="10.5" fontFamily="var(--font-mono)">{sepDay(d)}</text>
            </g>
          )
        })}
        <line x1={left} x2={W - right} y1={y('Devínska Nová Ves') + rowH / 2} y2={y('Devínska Nová Ves') + rowH / 2} stroke="rgba(150,185,215,.18)" strokeDasharray="3 4" />
        <text x={left + 6} y={top + 10} fill="var(--color-tide)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.2">MORAVA</text>
        <text x={left + 6} y={y('Devínska Nová Ves') + rowH / 2 + 12} fill="var(--color-volt-soft)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.2">{t('DUNAJ', 'DANUBE')}</text>
        <path d={line(morava)} fill="none" stroke="var(--color-tide)" strokeWidth={1.6} opacity={0.6} />
        <path d={line(danube)} fill="none" stroke="var(--color-volt)" strokeWidth={1.6} opacity={0.6} />
        {/* spojenie: Morava sa vlieva pri Devíne */}
        <path d={`M${x('2024-09-18T09:15')},${y('Devínska Nová Ves')} Q ${x('2024-09-18T07:30')},${(y('Devínska Nová Ves') + y('Devín')) / 2} ${x('2024-09-18T06:00')},${y('Devín')}`} fill="none" stroke="var(--color-fog-400)" strokeDasharray="2 3" />
        {firstPeaks.map((f) => (
          <circle key={f.station} cx={x(f.at)} cy={y(f.station)} r={4} fill="none" stroke="var(--color-volt-soft)" strokeWidth={1.4}>
            <title>{`${f.station}: ${t('1. kulminácia', '1st peak')} ${sepDay(f.at.slice(8, 10))} ${f.at.slice(11)} ${t('SEČ', 'CET')}`}</title>
          </circle>
        ))}
        {ordered.map((r) => {
          const on = hover === r.station
          const cx = x(r.at)
          const cy = y(r.station)
          const col = r.river === 'Morava' ? 'var(--color-tide)' : r.country ? '#8a9bab' : 'var(--color-volt)'
          return (
            <g key={r.station} onMouseEnter={() => setHover(r.station)} onMouseLeave={() => setHover(null)}>
              <rect x={0} y={cy - rowH / 2} width={W} height={rowH} fill={on ? 'rgba(150,185,215,.05)' : 'transparent'} />
              <text x={left - 10} y={cy + 4} textAnchor="end" fontSize="12" fill={on ? 'var(--color-fog-50)' : 'var(--color-fog-300)'}>{r.station}</text>
              <circle cx={cx} cy={cy} r={on ? 7 : 5.5} fill={col} stroke="var(--color-ink-800)" strokeWidth={2} />
              <text x={cx + 10} y={cy + 4} fontSize="10.5" fontFamily="var(--font-mono)" fill={on ? 'var(--color-fog-50)' : 'var(--color-fog-400)'}>
                {sepDay(r.at.slice(8, 10))} {r.at.slice(11)}
                {on && (r.h ? ` · ${r.h} cm` : '') + (on && r.q ? ` · ${nf(r.q)} m³/s` : '') + (on && r.note ? ` · ${t(r.note, r.noteEn ?? r.note)}` : '')}
              </text>
            </g>
          )
        })}
      </svg>
      <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-fog-300">
        <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-tide" /> Morava</span>
        <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-volt" /> {t('Dunaj (SK)', 'Danube (SK)')}</span>
        <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-fog-400" /> {t('Dunaj (Rakúsko)', 'Danube (Austria)')}</span>
        <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full border border-volt-soft" /> {t('1. kulminácia (Devín, Bratislava)', '1st peak (Devín, Bratislava)')}</span>
      </div>
    </div>
  )
}
