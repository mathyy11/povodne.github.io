import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'
import { AlertTriangle, ExternalLink } from 'lucide-react'
import { Cite, Reveal, Section, SectionHeader } from '../components/ui'
import { type TLCat, type TLEvent } from '../data/timeline'
import { useContent } from '../data/content'
import { useT } from '../lib/i18n'
import { sourceById, sourceIndex } from '../data/sources'
import { skDayLong } from '../lib/format'

function Detail({ e }: { e: TLEvent }) {
  const t = useT()
  const { tlCats } = useContent()
  return (
    <motion.article
      key={e.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="panel p-6 md:p-8"
      aria-live="polite"
    >
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="chip" style={{ borderColor: tlCats[e.cat].color, color: tlCats[e.cat].color }}>{tlCats[e.cat].label}</span>
        <span className="font-mono text-sm text-fog-300">{skDayLong(e.date)}{e.time && <> · {e.time} {t('SEČ', 'CET')}</>}</span>
        {!e.time && <span className="font-mono text-[11px] text-fog-500">{t('presný čas neuvedený', 'exact time not given')}</span>}
      </div>
      {e.status && (
        <p className="mb-4 inline-flex items-center gap-2 rounded-lg border border-warn-1/40 bg-warn-1/10 px-3 py-1.5 text-xs text-warn-1">
          <AlertTriangle size={14} /> {e.status === 'sporne' ? t('Sporné tvrdenie: doložené jedným mediálnym zdrojom, zúčastnené strany ho spochybňujú', 'Contested claim: documented by a single media source and disputed by those involved') : t('Nepotvrdené', 'Unconfirmed')}
        </p>
      )}
      <h3 className="font-display text-3xl md:text-4xl font-extrabold text-fog-50 leading-[1.02]" style={{ fontStretch: '78%' }}>{e.title}</h3>
      <p className="mt-4 text-fog-300 leading-relaxed">{e.text}</p>
      {e.photo && (
        <figure className="mt-6 overflow-hidden rounded-xl">
          <img src={e.photo.src} alt={e.photo.alt} className="w-full aspect-[16/9] object-cover" loading="lazy" />
          <figcaption className="mt-2 text-[11px] text-fog-500">{e.photo.credit}</figcaption>
        </figure>
      )}
      <div className="mt-6 pt-4 border-t border-line">
        <span className="eyebrow">{t('Zdroje', 'Sources')}</span>
        <ul className="mt-2 space-y-1.5">
          {e.src.map((id) => (
            <li key={id} className="text-sm">
              <a href={sourceById[id].url} target="_blank" rel="noopener noreferrer" className="group inline-flex items-start gap-2 text-fog-300 hover:text-volt-soft">
                <span className="font-mono text-volt-soft text-xs mt-0.5">[{sourceIndex[id]}]</span>
                <span>{sourceById[id].author}: {sourceById[id].title}</span>
                <ExternalLink size={12} className="mt-1 shrink-0 opacity-50 group-hover:opacity-100" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  )
}

export function Timeline() {
  const t = useT()
  const { timeline, tlCats } = useContent()
  const [filter, setFilter] = useState<Set<TLCat>>(new Set(Object.keys(tlCats) as TLCat[]))
  const [selected, setSelected] = useState<string>('e1809a')

  const items = useMemo(() => timeline.filter((e) => filter.has(e.cat)), [filter, timeline])
  const current = timeline.find((e) => e.id === selected) ?? items[0]

  const toggle = (c: TLCat) =>
    setFilter((f) => {
      const n = new Set(f)
      if (n.has(c) && n.size > 1) n.delete(c)
      else n.add(c)
      return n
    })

  // Zoskupenie podľa dňa
  const groups = useMemo(() => {
    const g: { date: string; events: TLEvent[] }[] = []
    items.forEach((e) => {
      const last = g[g.length - 1]
      if (last && last.date === e.date) last.events.push(e)
      else g.push({ date: e.date, events: [e] })
    })
    return g
  }, [items])

  return (
    <Section id="cas" className="bg-ink-850/60">
      <SectionHeader
        letter="B"
        index="02"
        kicker={t('Udalosť v čase', 'The event over time')}
        title={t(<>Dva týždne,<br /><span className="text-fog-400">ktoré preverili systém</span></>, <>Two weeks<br /><span className="text-fog-400">that tested the system</span></>)}
        lead={t('Interaktívna časová os od prvého vzostupu hladín po schválenie správy o škodách. Kliknite na udalosť pre podrobnosti a zdroje. Časy sú uvedené iba tam, kde ich zdroj dokladá.', 'An interactive timeline from the first rise in river levels to the approval of the damage report. Click an event for details and sources. Times are shown only where a source documents them.')}
      />

      <Reveal>
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label={t('Filtrovať kategórie', 'Filter categories')}>
          {(Object.keys(tlCats) as TLCat[]).map((c) => {
            const on = filter.has(c)
            return (
              <button
                key={c}
                onClick={() => toggle(c)}
                aria-pressed={on}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all ${on ? 'border-line-strong bg-ink-700 text-fog-50' : 'border-line text-fog-500 line-through decoration-fog-500/60'}`}
              >
                <span className="w-2 h-2 rounded-full" style={{ background: tlCats[c].color, opacity: on ? 1 : 0.35 }} />
                {tlCats[c].label}
              </button>
            )
          })}
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-14">
        <ol className="relative" aria-label={t('Udalosti', 'Events')}>
          <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-volt/60 via-line-strong to-transparent" aria-hidden />
          {groups.map((g) => (
            <li key={g.date} className="relative pl-8 pb-6">
              <span className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 border-ink-850 bg-fog-500" aria-hidden />
              <p className="font-mono text-xs tracking-wider text-fog-400 uppercase mb-2">{skDayLong(g.date)}</p>
              <ul className="space-y-1">
                {g.events.map((e) => {
                  const on = current?.id === e.id
                  return (
                    <li key={e.id}>
                      <button
                        onClick={() => setSelected(e.id)}
                        aria-pressed={on}
                        className={`w-full text-left rounded-xl px-4 py-3 border transition-all ${on ? 'bg-ink-700 border-line-strong' : 'border-transparent hover:bg-ink-800'}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-1.5 h-6 rounded-full shrink-0" style={{ background: tlCats[e.cat].color }} />
                          <span className="flex-1 min-w-0">
                            <span className={`block font-medium leading-snug ${on ? 'text-fog-50' : 'text-fog-100'}`}>{e.title}</span>
                            <span className="block font-mono text-[11px] text-fog-500 mt-0.5">
                              {e.time ? `${e.time} ${t('SEČ', 'CET')}` : t('čas neuvedený', 'time not given')} · {tlCats[e.cat].label}{e.status ? t(' · sporné', ' · contested') : ''}
                            </span>
                          </span>
                        </span>
                      </button>
                      {/* Mobil: detail priamo pod položkou */}
                      <AnimatePresence>
                        {on && (
                          <motion.div className="lg:hidden mt-2 mb-4" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
                            <Detail e={e} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  )
                })}
              </ul>
            </li>
          ))}
        </ol>

        <div className="hidden lg:block">
          <div className="sticky top-[calc(var(--nav-h)+24px)]">
            <AnimatePresence mode="wait">{current && <Detail e={current} />}</AnimatePresence>
            <p className="mt-4 text-xs text-fog-500">{t('Časy SEČ podľa SHMÚ. Ostatné časy pochádzajú z citovaných dokumentov a správ.', 'Times in CET per SHMÚ. Other times come from the cited documents and reports.')}<Cite ids={['shmu-ms']} /></p>
          </div>
        </div>
      </div>
    </Section>
  )
}
