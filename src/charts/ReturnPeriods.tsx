import { useState } from 'react'
import { peaks } from '../data/hydro'
import { useT } from '../lib/i18n'
import { sepDay } from '../lib/format'

// Bodový graf doby opakovania na logaritmickej osi (1–100 rokov). Rozpätie = interval podľa SHMÚ.
const rows = peaks.filter((p) => p.nMax != null).sort((a, b) => (b.nMax! - a.nMax!) || (b.nMin! - a.nMin!))
const ticks = [1, 2, 5, 10, 20, 50, 100]

export function ReturnPeriods() {
  const t = useT()
  const [hover, setHover] = useState<number | null>(null)
  const W = 640
  const left = 200
  const right = 24
  const rowH = 24
  const top = 22
  const Hh = top + rows.length * rowH + 8
  const lx = (n: number) => left + (Math.log10(n) / 2) * (W - left - right)

  return (
    <svg viewBox={`0 0 ${W} ${Hh}`} className="w-full" role="img" aria-label={t('Doba opakovania kulminačných prietokov na vybraných staniciach, logaritmická os 1 až 100 rokov. Hodnoty sú v tabuľke.', 'Return periods of peak flows at selected stations, log scale 1 to 100 years. Values are in the table.')}>
      {ticks.map((tk) => (
        <g key={tk}>
          <line x1={lx(tk)} x2={lx(tk)} y1={top - 4} y2={Hh - 6} stroke="rgba(150,185,215,.09)" />
          <text x={lx(tk)} y={top - 9} textAnchor="middle" fill="var(--color-fog-500)" fontSize="10.5" fontFamily="var(--font-mono)">{tk}</text>
        </g>
      ))}
      {rows.map((p, i) => {
        const y = top + i * rowH + rowH / 2
        const big = p.nMax! >= 50
        const col = big ? '#ff6a3d' : p.nMax! >= 20 ? '#ff9a4a' : '#8cc8ff'
        const on = hover === i
        return (
          <g key={p.station + p.river} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(null)}>
            <rect x={0} y={y - rowH / 2} width={W} height={rowH} fill={on ? 'rgba(150,185,215,.06)' : 'transparent'} />
            <text x={left - 10} y={y + 4} textAnchor="end" fontSize="12" fill={on ? 'var(--color-fog-50)' : 'var(--color-fog-300)'}>
              {p.station} <tspan fill="var(--color-fog-500)">· {p.river}</tspan>
            </text>
            <line x1={lx(1)} x2={lx(p.nMin!)} y1={y} y2={y} stroke="rgba(150,185,215,.15)" strokeDasharray="2 3" />
            {p.nMin !== p.nMax && <line x1={lx(p.nMin!)} x2={lx(p.nMax!)} y1={y} y2={y} stroke={col} strokeWidth={6} strokeLinecap="round" opacity={0.55} />}
            <circle cx={lx(p.nMax!)} cy={y} r={on ? 6 : 5} fill={col} stroke="var(--color-ink-800)" strokeWidth={2} />
            {on && (
              <text x={lx(p.nMax!) + (lx(p.nMax!) > W * 0.6 ? -10 : 10)} y={y + 4} textAnchor={lx(p.nMax!) > W * 0.6 ? 'end' : 'start'} fontSize="10.5" fontFamily="var(--font-mono)" fill="var(--color-fog-50)">
                {p.nMin === p.nMax ? `${p.nMax} ${t('r.', 'yr')}` : `${p.nMin}–${p.nMax} ${t('r.', 'yr')}`} · {sepDay(parseInt(p.date))} {p.time}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

export const returnRows = rows
