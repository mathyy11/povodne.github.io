import { useMemo, useState } from 'react'
import { districtPeaks, warnings } from '../data/hydro'
import { nf, sepDay } from '../lib/format'
import { useT } from '../lib/i18n'

// Časová os hydrologických výstrah SHMÚ podľa okresov + kulminácia na reprezentatívnej stanici.
// Predstih = kulminácia − začiatok výstrahy 3. stupňa (hodiny). Výpočet autorov z údajov SHMÚ.

const T0 = new Date('2024-09-13T00:00').getTime()
const T1 = new Date('2024-09-25T06:00').getTime()
const H = 3600_000
const levelColor = { 1: '#f2c14e', 2: '#ff8a3d', 3: '#ff4d4f' } as const

const order = ['Myjava', 'Senica', 'Skalica', 'Malacky', 'Pezinok', 'Trnava', 'Bratislava', 'Dunajská Streda', 'Komárno', 'Nové Zámky – juh']
const groupEn: Record<string, string> = { Morava: 'Morava', 'Malé Karpaty': 'Little Carpathians', Dunaj: 'Danube' }
const groupOf: Record<string, string> = {
  Myjava: 'Morava', Senica: 'Morava', Skalica: 'Morava', Malacky: 'Morava',
  Pezinok: 'Malé Karpaty', Trnava: 'Malé Karpaty',
  Bratislava: 'Dunaj', 'Dunajská Streda': 'Dunaj', Komárno: 'Dunaj', 'Nové Zámky – juh': 'Dunaj',
}

export function leadTimes() {
  return order.map((d) => {
    const w3 = warnings.filter((w) => w.district === d && w.level === 3).sort((a, b) => a.from.localeCompare(b.from))[0]
    const w2 = warnings.filter((w) => w.district === d && w.level >= 2).sort((a, b) => a.from.localeCompare(b.from))[0]
    const peak = districtPeaks[d]
    const p = new Date(peak.at).getTime()
    return {
      district: d,
      station: peak.station,
      peak: peak.at,
      lead3: (p - new Date(w3.from).getTime()) / H,
      lead2: (p - new Date(w2.from).getTime()) / H,
      w3from: w3.from,
    }
  })
}

const fmt = (iso: string) => {
  const d = new Date(iso)
  return `${sepDay(d.getDate())} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

export function WarningsGantt() {
  const t = useT()
  const [hover, setHover] = useState<string | null>(null)
  const leads = useMemo(leadTimes, [])
  const W = 1000
  const rowH = 34
  const left = 150
  const right = 92
  const top = 30
  const plotW = W - left - right
  const x = (iso: string) => left + ((new Date(iso).getTime() - T0) / (T1 - T0)) * plotW
  const days = Array.from({ length: 13 }, (_, i) => i)
  const Hh = top + order.length * rowH + 10

  return (
    <div className="overflow-x-auto -mx-2 px-2">
      <p className="md:hidden mb-2 font-mono text-[10px] text-fog-500">{t('← graf posuňte do strany →', '← scroll the chart sideways →')}</p>
      <svg viewBox={`0 0 ${W} ${Hh}`} className="w-full min-w-[720px]" role="img" aria-label={t('Časová os hydrologických výstrah SHMÚ 13.–25. 9. 2024 podľa okresov so značkou kulminácie. Podrobné hodnoty sú v tabuľke.', 'Timeline of SHMÚ hydrological warnings 13–25 Sep 2024 by district with peak markers. Detailed values are in the table.')}>
        {/* dni */}
        {days.map((i) => {
          const xx = left + ((i * 24 * H) / (T1 - T0)) * plotW
          return (
            <g key={i}>
              <line x1={xx} x2={xx} y1={top - 6} y2={Hh - 10} stroke="rgba(150,185,215,.08)" />
              {i < 12 && <text x={xx + 3} y={top - 12} fill="var(--color-fog-500)" fontSize="10.5" fontFamily="var(--font-mono)">{sepDay(13 + i)}</text>}
            </g>
          )
        })}
        {order.map((d, r) => {
          const y = top + r * rowH
          const ws = warnings.filter((w) => w.district === d)
          const lt = leads[r]
          const peakX = x(lt.peak)
          const prevGroup = r > 0 ? groupOf[order[r - 1]] : null
          const dim = hover && hover !== d
          return (
            <g key={d} onMouseEnter={() => setHover(d)} onMouseLeave={() => setHover(null)} opacity={dim ? 0.35 : 1} style={{ transition: 'opacity .2s' }}>
              {prevGroup !== groupOf[d] && (
                <text x={0} y={y + 4} fill="var(--color-volt-soft)" fontSize="9.5" fontFamily="var(--font-mono)" letterSpacing="1.2">{t(groupOf[d], groupEn[groupOf[d]]).toUpperCase()}</text>
              )}
              <text x={left - 10} y={y + rowH / 2 + 8} textAnchor="end" fill="var(--color-fog-100)" fontSize="12.5">{d === 'Nové Zámky – juh' ? t(d, 'Nové Zámky – south') : d}</text>
              <rect x={left} y={y + 9} width={plotW} height={rowH - 14} fill="rgba(150,185,215,.03)" rx={3} />
              {ws.map((w, i) => (
                <rect key={i} x={x(w.from) + 1} y={y + 9} width={Math.max(2, x(w.to) - x(w.from) - 2)} height={rowH - 14} rx={3} fill={levelColor[w.level]} opacity={w.level === 3 ? 0.95 : w.level === 2 ? 0.75 : 0.55}>
                  <title>{`${d}: ${t(`výstraha ${w.level}. stupňa`, `level-${w.level} warning`)}, ${fmt(w.from)} – ${fmt(w.to)} ${t('SEČ', 'CET')}`}</title>
                </rect>
              ))}
              {/* kulminácia */}
              <g>
                <line x1={peakX} x2={peakX} y1={y + 4} y2={y + rowH - 1} stroke="#eef3f7" strokeWidth={2} />
                <circle cx={peakX} cy={y + 4} r={3.5} fill="#eef3f7" />
                <title>{`${t('Kulminácia', 'Peak')}: ${lt.station}, ${fmt(lt.peak)} ${t('SEČ', 'CET')}`}</title>
              </g>
              <text x={W - right + 10} y={y + rowH / 2 + 8} fill={lt.lead3 < 3 ? 'var(--color-warn-2)' : 'var(--color-fog-100)'} fontSize="12" fontFamily="var(--font-mono)">
                {lt.lead3 >= 0 ? '' : '−'}{nf(Math.abs(lt.lead3), 0)} h
              </text>
            </g>
          )
        })}
        <text x={W - right + 10} y={top - 12} fill="var(--color-fog-500)" fontSize="10" fontFamily="var(--font-mono)">{t('PREDSTIH 3°', 'LEAD 3°')}</text>
      </svg>
      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs text-fog-300">
        {([1, 2, 3] as const).map((l) => (
          <span key={l} className="inline-flex items-center gap-2"><span className="w-5 h-3 rounded-sm" style={{ background: levelColor[l] }} /> {t(`výstraha ${l}. stupňa`, `level-${l} warning`)}</span>
        ))}
        <span className="inline-flex items-center gap-2"><span className="w-0.5 h-4 bg-fog-50" /> {t('kulminácia na stanici v okrese', 'peak at a station in the district')}</span>
        <span className="text-fog-500">{t('Predstih = čas od začiatku výstrahy 3. stupňa po kulmináciu (záporný = výstraha až po kulminácii)', 'Lead time = time from the start of the level-3 warning to the peak (negative = warning only after the peak)')}</span>
      </div>
    </div>
  )
}
