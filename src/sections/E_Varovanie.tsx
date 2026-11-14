import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'
import { BookMarked, FileCheck2, Users } from 'lucide-react'
import { Cite, Reveal, Section, SectionHeader } from '../components/ui'
import { useContent } from '../data/content'
import { useT } from '../lib/i18n'
import { SirenPlayer } from '../components/SirenPlayer'
import { PrepChecklist } from '../components/PrepChecklist'

function SirenWave({ pattern, minutes }: { pattern: 'wave' | 'flat'; minutes: number }) {
  const reduce = useReducedMotion()
  const w = 300
  const len = (minutes / 6) * w
  const d =
    pattern === 'wave'
      ? Array.from({ length: 61 }, (_, i) => {
          const x = (i / 60) * len
          const y = 20 - Math.sin((i / 60) * Math.PI * 2 * 6) * 12
          return `${i ? 'L' : 'M'}${x.toFixed(1)},${y.toFixed(1)}`
        }).join(' ')
      : `M0,10 L${len},10`
  return (
    <svg viewBox={`0 0 ${w} 40`} preserveAspectRatio="none" className="w-full h-10" aria-hidden>
      <line x1="0" y1="36" x2={w} y2="36" stroke="var(--color-line-strong)" vectorEffect="non-scaling-stroke" />
      {[0, 1, 2, 3, 4, 5, 6].map((m) => (
        <g key={m}>
          <line x1={(m / 6) * w} y1="33" x2={(m / 6) * w} y2="39" stroke="var(--color-fog-500)" vectorEffect="non-scaling-stroke" />
        </g>
      ))}
      <motion.path d={d} fill="none" stroke="var(--color-warn-2)" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" initial={{ pathLength: reduce ? 1 : 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }} />
    </svg>
  )
}

export function Varovanie() {
  const t = useT()
  const { steps, sirens } = useContent()
  const [active, setActive] = useState(2)
  const s = steps[active]

  return (
    <Section id="varovanie">
      <SectionHeader
        letter="E"
        index="05"
        kicker={t('Varovanie a evakuácia obyvateľstva', 'Warning and evacuation of the public')}
        title={t(<>Od merania<br /><span className="text-fog-400">k návratu domov</span></>, <>From measurement<br /><span className="text-fog-400">to returning home</span></>)}
        lead={t('Procesný diagram ochrany obyvateľstva pri povodni. Ide o všeobecný odborný model odvodený z platnej legislatívy, nie o opis postupu v konkrétnej obci. Príklady zo septembra 2024 sú pri každom kroku uvedené osobitne a len vtedy, ak sú doložené.', 'A process diagram of protecting the public in a flood. It is a general expert model derived from current legislation, not a description of what any specific municipality did. Examples from September 2024 are shown separately for each step and only where documented.')}
      />

      <Reveal>
        <div className="inline-flex items-center gap-2 chip border-volt/40 text-volt-soft mb-8"><BookMarked size={13} /> {t('Odborný model · nie záznam konkrétnej udalosti', 'Expert model · not a record of a specific event')}</div>
      </Reveal>

      {/* Krokovač */}
      <Reveal>
        <ol className="relative grid grid-cols-7 gap-1 md:gap-2" role="tablist" aria-label={t('Kroky procesu', 'Process steps')}>
          <span className="absolute left-[7%] right-[7%] top-[22px] h-px bg-line-strong" aria-hidden />
          <motion.span
            className="absolute left-[7%] top-[22px] h-px bg-gradient-to-r from-volt to-tide origin-left"
            style={{ width: '86%' }}
            animate={{ scaleX: active / (steps.length - 1) }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            aria-hidden
          />
          {steps.map((st, i) => {
            const on = i === active
            const done = i < active
            return (
              <li key={st.id} className="relative flex flex-col items-center text-center" role="presentation">
                <button
                  role="tab"
                  aria-selected={on}
                  aria-controls="step-panel"
                  id={`step-${st.id}`}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight') setActive((a) => Math.min(a + 1, steps.length - 1))
                    if (e.key === 'ArrowLeft') setActive((a) => Math.max(a - 1, 0))
                  }}
                  className="group flex flex-col items-center gap-3 w-full"
                >
                  <span
                    className={`relative z-10 w-11 h-11 rounded-full border-2 flex items-center justify-center font-mono text-sm transition-all ${
                      on ? 'bg-volt border-volt text-ink-950 scale-110' : done ? 'bg-ink-700 border-tide/70 text-tide' : 'bg-ink-900 border-line-strong text-fog-400 group-hover:border-fog-400'
                    }`}
                  >
                    {st.n}
                  </span>
                  <span className={`hidden md:block text-[13px] leading-tight font-medium ${on ? 'text-fog-50' : 'text-fog-400 group-hover:text-fog-100'}`}>{st.title}</span>
                  <span className="hidden lg:block font-mono text-[10px] text-fog-500 leading-tight px-1">{st.short}</span>
                </button>
              </li>
            )
          })}
        </ol>
      </Reveal>

      <div id="step-panel" role="tabpanel" aria-labelledby={`step-${s.id}`} className="mt-10">
        <AnimatePresence mode="wait">
          <motion.div key={s.id} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }} className="grid lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 panel p-6 md:p-8">
              <p className="eyebrow">{t('Krok', 'Step')} {s.n} / 7</p>
              <h3 className="mt-2 font-display text-4xl md:text-5xl font-extrabold uppercase text-fog-50 leading-[0.95]" style={{ fontStretch: '72%' }}>{s.title}</h3>
              <p className="mt-5 text-fog-300 leading-relaxed text-[17px]">{s.what}</p>
              <div className="mt-6 grid sm:grid-cols-2 gap-4">
                <div className="rounded-xl border border-line p-4">
                  <p className="flex items-center gap-2 text-sm text-fog-100 font-semibold"><Users size={15} className="text-volt-soft" /> {t('Kompetencie', 'Responsibilities')}</p>
                  <p className="mt-2 text-sm text-fog-300">{s.who}</p>
                </div>
                <div className="rounded-xl border border-line p-4">
                  <p className="flex items-center gap-2 text-sm text-fog-100 font-semibold"><BookMarked size={15} className="text-volt-soft" /> {t('Právny základ', 'Legal basis')}</p>
                  <ul className="mt-2 space-y-1">
                    {s.legal.map((l) => (
                      <li key={l.ref} className="font-mono text-[12px] text-fog-300">{l.ref} <Cite ids={[l.src]} /></li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 rounded-[18px] border border-tide/25 bg-tide/[0.04] p-6 md:p-8">
              <p className="flex items-center gap-2 text-sm font-semibold text-tide"><FileCheck2 size={15} /> {t('Doložené v septembri 2024', 'Documented in September 2024')}</p>
              {s.example ? (
                <p className="mt-4 text-fog-100 leading-relaxed">{s.example.text}<Cite ids={s.example.src} /></p>
              ) : (
                <p className="mt-4 text-fog-400">{t('Bez dokladu v použitých zdrojoch.', 'Not documented in the sources used.')}</p>
              )}
              <div className="mt-8 flex gap-2">
                <button onClick={() => setActive((a) => Math.max(0, a - 1))} disabled={active === 0} className="rounded-full border border-line-strong px-4 py-2 text-sm text-fog-100 disabled:opacity-30">← {t('Predchádzajúci', 'Previous')}</button>
                <button onClick={() => setActive((a) => Math.min(steps.length - 1, a + 1))} disabled={active === steps.length - 1} className="rounded-full bg-fog-50 text-ink-950 px-4 py-2 text-sm font-semibold disabled:opacity-30">{t('Ďalší krok', 'Next step')} →</button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Varovné signály */}
      <div className="mt-24 grid lg:grid-cols-12 gap-10">
        <Reveal className="lg:col-span-4">
          <h3 className="font-display text-3xl md:text-4xl font-extrabold uppercase text-fog-50" style={{ fontStretch: '75%' }}>{t('Varovné signály', 'Warning signals')}</h3>
          <p className="mt-4 text-fog-300">
            {t(
              <>Zákon určuje tri signály sirén. Pri povodni je kľúčový signál <strong className="text-fog-50">„OHROZENIE VODOU“</strong>. Každý signál sa následne dopĺňa hovorenou informáciou v rozhlase, televízii alebo obecnom rozhlase. Tlačidlom ▶ si vypočujete skrátenú ukážku priebehu tónu.</>,
              <>The law sets three siren signals. In a flood the key one is <strong className="text-fog-50">“OHROZENIE VODOU” (water threat)</strong>. Each signal is followed by spoken information on radio, TV or municipal loudspeakers. Press ▶ to hear a shortened demo of the tone pattern.</>,
            )}<Cite ids={['z42']} />
          </p>
          <p className="mt-4 text-sm text-fog-400">
            {t('Prevádzkyschopnosť sirén sa preskúšava dvojminútovým stálym tónom, spravidla druhý piatok v mesiaci o 12:00. Ak počujete sirénu v inom čase, nejde o skúšku.', 'Sirens are tested with a two-minute steady tone, usually on the second Friday of the month at 12:00. A siren at any other time is not a test.')}<Cite ids={['z42', 'v388']} />
          </p>
          <p className="mt-4 text-sm text-fog-400">
            {t('Varovné SMS a cell broadcast (SK-Alert) neboli v septembri 2024 k dispozícii. Ministerstvo vnútra v tom čase iba pripravovalo obstarávanie.', 'Warning SMS and cell broadcast (SK-Alert) were not available in September 2024. The Interior Ministry was only preparing the procurement at the time.')}<Cite ids={['tasr-skalert']} />
          </p>
        </Reveal>
        <div className="lg:col-span-8 space-y-4">
          {sirens.map((sig, i) => (
            <Reveal key={sig.name} delay={i * 0.06}>
              <div className={`panel p-5 grid sm:grid-cols-[220px_1fr] gap-4 items-center ${sig.name === 'OHROZENIE VODOU' ? 'border-warn-2/40' : ''}`}>
                <div>
                  <p className={`font-mono text-sm tracking-wider ${sig.name === 'OHROZENIE VODOU' ? 'text-warn-2' : 'text-fog-100'}`}>{sig.name}</p>
                  {'en' in sig && <p className="font-mono text-[11px] text-fog-500">{String(sig.en)}</p>}
                  <p className="text-xs text-fog-400 mt-1">{sig.duration} · {sig.desc}</p>
                </div>
                <div className="space-y-3">
                  <div>
                    <SirenWave pattern={sig.pattern} minutes={parseInt(sig.duration)} />
                    <div className="flex justify-between font-mono text-[10px] text-fog-500"><span>0</span><span>3 min</span><span>6 min</span></div>
                  </div>
                  <SirenPlayer pattern={sig.pattern} label={sig.name} />
                </div>
              </div>
            </Reveal>
          ))}
          <p className="text-xs text-fog-500">{t('Schematické znázornenie a syntetizovaná ukážka priebehu tónu podľa § 3a zákona č. 42/1994 Z. z. Nejde o záznam skutočnej sirény; výška a farba tónu sú ilustračné.', 'Schematic diagram and synthesized demo of the tone pattern under § 3a of Act No. 42/1994. Not a recording of a real siren; pitch and timbre are illustrative.')}</p>
        </div>
      </div>

      <Reveal className="mt-16">
        <PrepChecklist />
      </Reveal>
    </Section>
  )
}
