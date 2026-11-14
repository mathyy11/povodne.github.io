import { motion, useReducedMotion } from 'motion/react'
import { useState, type ReactNode } from 'react'
import { Table2, BarChart3 } from 'lucide-react'
import { sourceById, sourceIndex } from '../data/sources'
import { useT } from '../lib/i18n'

/* Odhalenie obsahu pri scrollovaní — pri prefers-reduced-motion bez pohybu */
export function Reveal({ children, delay = 0, y = 28, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12% 0px' }}
      transition={{ duration: reduce ? 0.2 : 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

/* Hlavička kapitoly */
export function SectionHeader({ letter, index, kicker, title, lead }: { letter: string; index: string; kicker: string; title: ReactNode; lead?: ReactNode }) {
  return (
    <header className="mb-12 md:mb-16">
      <Reveal>
        <div className="flex items-center gap-4 mb-6">
          <span className="font-display text-[0.8rem] font-extrabold tracking-[0.2em] text-volt">{letter}</span>
          <span className="h-px w-12 bg-line-strong" />
          <span className="eyebrow">{index} · {kicker}</span>
        </div>
        <h2 className="font-display font-extrabold uppercase text-fog-50 leading-[0.92] text-[clamp(2.4rem,6.5vw,5.6rem)] max-w-5xl">
          {title}
        </h2>
        {lead && <p className="lead-text mt-6 max-w-3xl text-lg md:text-xl text-fog-300 leading-relaxed">{lead}</p>}
      </Reveal>
    </header>
  )
}

/* Odkaz na zdroj v texte — číslo zodpovedá poradiu v sekcii Zdroje */
export function Cite({ ids }: { ids: string[] }) {
  const t = useT()
  return (
    <>
      {ids.map((id) => {
        const s = sourceById[id]
        if (!s) return null
        return (
          <a key={id} href={`#src-${id}`} className="cite" title={`${s.author}: ${s.title}`} aria-label={`${t('Zdroj', 'Source')} ${sourceIndex[id]}: ${s.title}`}>
            [{sourceIndex[id]}]
          </a>
        )
      })}
    </>
  )
}

/* Rámec pre graf: názov, jednotky, obdobie, zdroj a prepínač tabuľky */
export function Figure({
  id, title, subtitle, unit, period, src, note, table, children, className = '',
}: {
  id: string
  title: string
  subtitle?: string
  unit: string
  period: string
  src: string[]
  note?: string
  table: { head: string[]; rows: (string | number)[][] }
  children: ReactNode
  className?: string
}) {
  const [showTable, setShowTable] = useState(false)
  const t = useT()
  return (
    <figure className={`panel p-5 md:p-7 flex flex-col ${className}`} aria-labelledby={`${id}-t`}>
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h3 id={`${id}-t`} className="font-display text-xl md:text-2xl font-bold text-fog-50 leading-tight" style={{ fontStretch: '85%' }}>{title}</h3>
          {subtitle && <p className="text-sm text-fog-400 mt-1">{subtitle}</p>}
        </div>
        <button
          onClick={() => setShowTable((v) => !v)}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-line-strong px-3 py-1.5 text-xs text-fog-300 hover:text-fog-50 hover:border-volt/60 transition-colors"
          aria-pressed={showTable}
          aria-controls={`${id}-body`}
        >
          {showTable ? <BarChart3 size={14} /> : <Table2 size={14} />}
          {showTable ? t('Graf', 'Chart') : t('Tabuľka', 'Table')}
        </button>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-fog-500 mb-5">
        <span>{t('Jednotka', 'Unit')}: {unit}</span>
        <span>{t('Obdobie', 'Period')}: {period}</span>
      </div>
      <div id={`${id}-body`} className="flex-1">
        {showTable ? (
          <div className="overflow-x-auto max-h-[420px] overflow-y-auto">
            <table className="w-full text-sm">
              <caption className="sr-only">{title}</caption>
              <thead>
                <tr>
                  {table.head.map((h) => (
                    <th key={h} scope="col" className="text-left font-mono text-[11px] uppercase tracking-wider text-fog-400 font-normal py-2 pr-4 border-b border-line sticky top-0 bg-ink-800">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((r, i) => (
                  <tr key={i} className="border-b border-line/60">
                    {r.map((c, j) => (
                      <td key={j} className={`py-2 pr-4 ${j === 0 ? 'text-fog-100' : 'font-mono text-fog-300 tabular-nums'}`}>{c}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          children
        )}
      </div>
      <figcaption className="mt-5 pt-4 border-t border-line text-xs text-fog-400 leading-relaxed">
        {note && <span className="block mb-1">{note}</span>}
        {t('Zdroj', 'Source')}: <Cite ids={src} /> {src.map((s) => sourceById[s]?.author).filter((v, i, a) => a.indexOf(v) === i).join('; ')}
      </figcaption>
    </figure>
  )
}

/* Kľúčové číslo */
export function Stat({ value, unit, label, sub, src, tone = 'volt' }: { value: string; unit?: string; label: string; sub?: string; src?: string[]; tone?: 'volt' | 'tide' | 'warn' }) {
  const color = tone === 'warn' ? 'text-warn-2' : tone === 'tide' ? 'text-tide' : 'text-volt-soft'
  return (
    <div className="border-t border-line-strong pt-5">
      <div className="flex items-baseline gap-2">
        <span className={`font-display font-extrabold leading-none text-[clamp(2.6rem,5vw,4rem)] tabular-nums ${color}`}>{value}</span>
        {unit && <span className="font-mono text-sm text-fog-300">{unit}</span>}
      </div>
      <p className="mt-3 text-fog-100 font-medium leading-snug">{label}</p>
      {sub && (
        <p className="mt-1 text-sm text-fog-400 leading-snug">
          {sub} {src && <Cite ids={src} />}
        </p>
      )}
    </div>
  )
}

export function Section({ id, children, className = '' }: { id: string; children: ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative px-4 sm:px-6 md:px-10 lg:px-16 py-24 md:py-36 ${className}`}>
      <div className="mx-auto max-w-[1320px]">{children}</div>
    </section>
  )
}
