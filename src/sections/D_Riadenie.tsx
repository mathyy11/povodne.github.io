import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Scale, FileCheck2, CircleSlash } from 'lucide-react'
import { Cite, Reveal, Section, SectionHeader } from '../components/ui'
import { type Actor, type Tier } from '../data/actors'
import { useContent } from '../data/content'
import { useT } from '../lib/i18n'

const tierOrder: Tier[] = ['strategic', 'expert', 'regional', 'local', 'response']

function ActorDetail({ a }: { a: Actor }) {
  const tr = useT()
  const { tiers } = useContent()
  return (
    <motion.div key={a.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="panel p-6 md:p-7" aria-live="polite">
      <span className="eyebrow">{tiers[a.tier].label}</span>
      <h3 className="mt-2 font-display text-3xl font-extrabold text-fog-50 leading-tight" style={{ fontStretch: '80%' }}>{a.name}</h3>
      <p className="mt-3 text-fog-300">{a.role}</p>

      <div className="mt-6 rounded-xl border border-volt/25 bg-volt/[0.05] p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-volt-soft"><Scale size={15} /> {tr('Zákonná kompetencia', 'Legal competence')} <span className="font-normal text-fog-400">{tr('(platí všeobecne)', '(applies in general)')}</span></p>
        <ul className="mt-3 space-y-3">
          {a.legal.map((l, i) => (
            <li key={i} className="text-sm text-fog-100 leading-relaxed">
              {l.text}
              <span className="block mt-1 font-mono text-[11px] text-fog-400">{l.ref} <Cite ids={[l.src]} /></span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-4 rounded-xl border border-tide/25 bg-tide/[0.05] p-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-tide"><FileCheck2 size={15} /> {tr('Doložené počas povodní 2024', 'Documented during the 2024 floods')}</p>
        {a.documented.length ? (
          <ul className="mt-3 space-y-3">
            {a.documented.map((d, i) => (
              <li key={i} className="text-sm text-fog-100 leading-relaxed">
                {d.text}
                <Cite ids={d.src} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-fog-400 flex items-start gap-2"><CircleSlash size={15} className="mt-0.5 shrink-0" /> {tr('Konkrétna činnosť nie je v použitých zdrojoch doložená. Neuvádzame ju, aby sme ju nevymýšľali.', 'No specific activity is documented in the sources used. We leave it out rather than make it up.')}</p>
        )}
      </div>
    </motion.div>
  )
}

export function Riadenie() {
  const tr = useT()
  const { actors, tiers } = useContent()
  const [sel, setSel] = useState('ou-kraj')
  const wrap = useRef<HTMLDivElement>(null)
  const nodes = useRef<Record<string, HTMLButtonElement | null>>({})
  const [lines, setLines] = useState<{ x1: number; y1: number; x2: number; y2: number; id: string }[]>([])
  const current = actors.find((a) => a.id === sel)!
  // prepojenia oboma smermi
  const linked = new Set([...current.links, ...actors.filter((a) => a.links.includes(sel)).map((a) => a.id)])

  const measure = useCallback(() => {
    const w = wrap.current
    const from = nodes.current[sel]
    if (!w || !from) return
    const wr = w.getBoundingClientRect()
    const fr = from.getBoundingClientRect()
    const fx = fr.left + fr.width / 2 - wr.left
    const fy = fr.top + fr.height / 2 - wr.top
    const out: typeof lines = []
    linked.forEach((id) => {
      const t = nodes.current[id]
      if (!t) return
      const tr = t.getBoundingClientRect()
      out.push({ id, x1: fx, y1: fy, x2: tr.left + tr.width / 2 - wr.left, y2: tr.top + tr.height / 2 - wr.top })
    })
    setLines(out)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sel])

  useLayoutEffect(() => measure(), [measure])
  useEffect(() => {
    const ro = new ResizeObserver(measure)
    if (wrap.current) ro.observe(wrap.current)
    return () => ro.disconnect()
  }, [measure])

  return (
    <Section id="riadenie" className="bg-ink-850/60">
      <SectionHeader
        letter="D"
        index="04"
        kicker={tr('Ako funguje krízové riadenie', 'How crisis management works')}
        title={tr(<>Kto rozhoduje,<br /><span className="text-fog-400">kto koná</span></>, <>Who decides,<br /><span className="text-fog-400">who acts</span></>)}
        lead={tr('Ochrana pred povodňami a civilná ochrana sú na Slovensku rozdelené medzi viac orgánov podľa zákonov č. 7/2010 Z. z. a č. 42/1994 Z. z. Kliknite na aktéra. Modrý blok uvádza, čo mu ukladá zákon. Tyrkysový blok uvádza, čo skutočne urobil v septembri 2024, ak je to doložené.', 'In Slovakia, flood protection and civil protection are split among several bodies under Act No. 7/2010 and Act No. 42/1994. Click an actor. The blue block shows what the law requires of it. The teal block shows what it actually did in September 2024, where documented.')}
      />

      <div className="grid xl:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] gap-8 xl:gap-12 items-start">
        <Reveal>
          <div ref={wrap} className="relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" aria-hidden>
              <AnimatePresence>
                {lines.map((l) => (
                  <motion.path
                    key={sel + l.id}
                    d={`M${l.x1},${l.y1} C${l.x1},${(l.y1 + l.y2) / 2} ${l.x2},${(l.y1 + l.y2) / 2} ${l.x2},${l.y2}`}
                    fill="none"
                    stroke="var(--color-tide)"
                    strokeWidth={1.4}
                    strokeDasharray="4 5"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 0.7 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6 }}
                  />
                ))}
              </AnimatePresence>
            </svg>
            <div className="relative z-10 space-y-3">
              {tierOrder.map((t) => (
                <div key={t} className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-4 items-center">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-fog-400">{tiers[t].label}</p>
                    <p className="text-[11px] text-fog-500 hidden md:block">{tiers[t].hint}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {actors.filter((a) => a.tier === t).map((a) => {
                      const isSel = a.id === sel
                      const isLinked = linked.has(a.id)
                      return (
                        <button
                          key={a.id}
                          ref={(n) => { nodes.current[a.id] = n }}
                          onClick={() => setSel(a.id)}
                          aria-pressed={isSel}
                          className={`relative rounded-xl border px-4 py-3 text-left transition-all min-w-[120px] ${
                            isSel
                              ? 'bg-volt text-ink-950 border-volt shadow-[0_10px_40px_-10px_rgba(58,160,255,.6)]'
                              : isLinked
                                ? 'bg-ink-700 border-tide/60 text-fog-50'
                                : 'bg-ink-800/90 border-line text-fog-300 hover:border-line-strong hover:text-fog-50'
                          }`}
                        >
                          <span className="block text-sm font-semibold leading-tight">{a.short}</span>
                          <span className={`block font-mono text-[10px] mt-1 ${isSel ? 'text-ink-900/70' : 'text-fog-500'}`}>
                            {a.documented.length ? `${a.documented.length}× ${tr('doložené', 'documented')}` : tr('bez dokladu', 'not documented')}
                          </span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-4 text-xs text-fog-400">
            <span className="inline-flex items-center gap-2"><span className="w-4 h-4 rounded bg-volt" /> {tr('vybraný aktér', 'selected actor')}</span>
            <span className="inline-flex items-center gap-2"><span className="w-4 h-4 rounded border border-tide/70 bg-ink-700" /> {tr('priama väzba (vyrozumenie, nadriadenosť, spolupráca)', 'direct link (notification, hierarchy, cooperation)')}</span>
          </div>
          <p className="mt-6 text-sm text-fog-400 max-w-2xl leading-relaxed">
            {tr(
              <>Na Slovensku existujú dve prepojené línie riadenia. <strong className="text-fog-100">Ochranu pred povodňami</strong> riadia orgány podľa zákona č. 7/2010 Z. z.: povodňové komisie, stupne povodňovej aktivity a SVP. <strong className="text-fog-100">Civilnú ochranu obyvateľstva</strong> zabezpečujú orgány podľa zákona č. 42/1994 Z. z.: mimoriadna situácia, varovanie a evakuácia. V oboch líniách vystupujú tie isté osoby, teda starosta a prednosta okresného úradu.</>,
              <>Slovakia has two linked lines of command. <strong className="text-fog-100">Flood protection</strong> is run by bodies under Act No. 7/2010: flood commissions, flood activity levels and SVP. <strong className="text-fog-100">Civil protection</strong> is run by bodies under Act No. 42/1994: emergency situation, warning and evacuation. The same people act in both lines: the mayor and the head of the district office.</>,
            )}<Cite ids={['z7', 'z42']} />
          </p>
        </Reveal>

        <div className="xl:sticky xl:top-[calc(var(--nav-h)+24px)]">
          <AnimatePresence mode="wait">
            <ActorDetail a={current} />
          </AnimatePresence>
        </div>
      </div>
    </Section>
  )
}
