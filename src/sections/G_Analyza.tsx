import { motion } from 'motion/react'
import { useState } from 'react'
import { ChevronDown, Lightbulb, FileSearch } from 'lucide-react'
import { Cite, Reveal, Section, SectionHeader } from '../components/ui'
import { useContent } from '../data/content'
import { useT } from '../lib/i18n'

export function Analyza() {
  const t = useT()
  const { analysis, verdicts, czVsSk } = useContent()
  const [open, setOpen] = useState<string | null>('g4')

  return (
    <Section id="analyza">
      <SectionHeader
        letter="H"
        index="08"
        kicker={t('Kritická analýza', 'Critical analysis')}
        title={t(<>Čo fungovalo<br /><span className="text-fog-400">a čo nie</span></>, <>What worked<br /><span className="text-fog-400">and what did not</span></>)}
        lead={t('Každé zistenie o probléme alebo nedostatku je podložené zdrojom. Hodnotenie v tyrkysovom rámčeku je vlastný analytický názor autorov práce, nie oficiálny záver vyšetrovania. Oficiálne verejné vyhodnotenie reakcie krízového riadenia sa pre Slovensko nepodarilo nájsť.', 'Every finding about a problem or shortcoming is backed by a source. The assessment in the teal box is the authors’ own analytical view, not the conclusion of an official investigation. We could not find an official public evaluation of the crisis management response in Slovakia.')}
      />

      {/* Prehľad */}
      <Reveal>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2 mb-10">
          {analysis.map((a) => (
            <a key={a.id} href={`#${a.id}`} onClick={() => setOpen(a.id)} className="group rounded-xl border border-line bg-ink-800/60 p-4 hover:border-line-strong transition-colors">
              <span className="font-mono text-xs text-fog-500">{a.code}</span>
              <span className="block mt-1 text-sm text-fog-100 leading-snug min-h-[2.6em]">{a.title}</span>
              <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono" style={{ color: verdicts[a.verdict].color }}>
                <span className="w-2 h-2 rounded-full" style={{ background: verdicts[a.verdict].color }} />
                {verdicts[a.verdict].label}
              </span>
            </a>
          ))}
        </div>
      </Reveal>

      <ul className="space-y-3">
        {analysis.map((a, i) => {
          const isOpen = open === a.id
          return (
            <li key={a.id} id={a.id} className={`rounded-[18px] border transition-colors ${isOpen ? 'border-line-strong bg-ink-800/80' : 'border-line bg-ink-850/40'}`}>
              <Reveal delay={i * 0.03}>
                <button className="w-full flex items-center gap-4 md:gap-6 p-5 md:p-7 text-left" onClick={() => setOpen(isOpen ? null : a.id)} aria-expanded={isOpen} aria-controls={`${a.id}-body`}>
                  <span className="font-display text-3xl md:text-5xl font-black text-fog-500/60 w-14 md:w-20" style={{ fontStretch: '70%' }}>{a.code}</span>
                  <span className="flex-1">
                    <span className="block font-display text-xl md:text-3xl font-bold text-fog-50 leading-tight" style={{ fontStretch: '82%' }}>{a.title}</span>
                    <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-mono" style={{ color: verdicts[a.verdict].color }}>
                      <span className="w-2 h-2 rounded-full" style={{ background: verdicts[a.verdict].color }} /> {verdicts[a.verdict].label}
                    </span>
                  </span>
                  <ChevronDown className={`text-fog-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                <motion.div id={`${a.id}-body`} initial={false} animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }} transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
                  <div className="px-5 md:px-7 pb-7 grid lg:grid-cols-12 gap-6 md:pl-[7.5rem]">
                    <div className="lg:col-span-7">
                      <p className="flex items-center gap-2 eyebrow mb-3"><FileSearch size={13} /> {t('Zistenia zo zdrojov', 'Findings from sources')}</p>
                      <ul className="space-y-3">
                        {a.findings.map((f, j) => (
                          <li key={j} className="flex gap-3 text-fog-100 leading-relaxed">
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-fog-400 shrink-0" />
                            <span>{f.text}<Cite ids={f.src} /></span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="lg:col-span-5 rounded-xl border border-tide/30 bg-tide/[0.05] p-5">
                      <p className="flex items-center gap-2 text-sm font-semibold text-tide"><Lightbulb size={15} /> {t('Hodnotenie autorov', 'Authors’ assessment')}</p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-fog-500">{t('Analytický návrh · nie oficiálny záver', 'Analytical proposal · not an official conclusion')}</p>
                      <p className="mt-3 text-fog-100 leading-relaxed">{a.assessment}</p>
                    </div>
                  </div>
                </motion.div>
              </Reveal>
            </li>
          )
        })}
      </ul>

      {/* Porovnanie s Českom */}
      <div className="mt-24">
        <Reveal>
          <p className="eyebrow">{t('Porovnanie', 'Comparison')}</p>
          <h3 className="mt-2 font-display text-3xl md:text-5xl font-extrabold uppercase text-fog-50 leading-[0.95]" style={{ fontStretch: '72%' }}>
            {t(<>Rovnaká búrka, <span className="text-fog-400">iný štát</span></>, <>Same storm, <span className="text-fog-400">different state</span></>)}
          </h3>
          <p className="mt-4 max-w-3xl text-fog-300">
            {t('Česko zasiahla tá istá tlaková níž Boris, ale s oveľa väčšou silou. V Jeseníkoch spadlo až 704 mm. Porovnanie vychádza z predbežnej oficiálnej správy MŽP ČR. Porovnateľné verejné vyhodnotenie reakcie krízového riadenia sa nám pre Slovensko nepodarilo nájsť. Vládou schválená správa o povodniach podľa TASR uvádza najmä škody a náklady. Slovenský stĺpec preto skladáme z rôznych zdrojov.', 'Czechia was hit by the same low, Boris, but much harder: up to 704 mm fell in the Jeseníky mountains. The comparison is based on the Czech environment ministry’s preliminary official report. We could not find a comparable public evaluation of the crisis management response for Slovakia. According to TASR, the government-approved flood report mainly covers damage and costs. The Slovak column is therefore compiled from several sources.')}<Cite ids={['cz-mzp', 'shmu-ms', 'tasr-vlada25']} />
          </p>
        </Reveal>
        <div className="mt-8 rounded-[18px] border border-line overflow-hidden">
          <div className="hidden md:grid grid-cols-[200px_1fr_1fr] bg-ink-800/80 border-b border-line">
            <span className="p-4 eyebrow">{t('Oblasť', 'Area')}</span>
            <span className="p-4 eyebrow">{t('Česko', 'Czechia')} 🇨🇿</span>
            <span className="p-4 eyebrow">{t('Slovensko', 'Slovakia')} 🇸🇰</span>
          </div>
          {czVsSk.map((r, i) => (
            <Reveal key={r.topic} delay={i * 0.03}>
              <div className="grid md:grid-cols-[200px_1fr_1fr] border-b border-line/70 last:border-b-0">
                <p className="p-4 pb-1 md:pb-4 font-medium text-fog-50">{r.topic}</p>
                <p className="px-4 py-2 md:p-4 text-sm text-fog-300 leading-relaxed"><span className="md:hidden font-mono text-[10px] text-fog-500 block">{t('ČESKO', 'CZECHIA')}</span>{r.cz}<Cite ids={[r.czSrc]} /></p>
                <p className="px-4 pt-2 pb-4 md:p-4 text-sm text-fog-100 leading-relaxed md:bg-volt/[0.03]"><span className="md:hidden font-mono text-[10px] text-fog-500 block">{t('SLOVENSKO', 'SLOVAKIA')}</span>{r.sk}<Cite ids={r.skSrc} /></p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-6 rounded-xl border border-tide/30 bg-tide/[0.05] p-5 max-w-4xl">
          <p className="flex items-center gap-2 text-sm font-semibold text-tide"><Lightbulb size={15} /> {t('Hodnotenie autorov', 'Authors’ assessment')}</p>
          <p className="mt-2 text-fog-100 leading-relaxed">
            {t('Najväčší rozdiel nie je v technike, ale v práci s informáciami. Česko vydalo výstrahu pred extrémnymi zrážkami už 11. 9. na celé obdobie 12.–15. 9., komunikovalo pod jednotným heslom a v roku 2025 zverejnilo oficiálne vyhodnotenie s konkrétnymi odporúčaniami, napríklad Cell Broadcast a jeden kanál výstrah. Pre Slovensko sme našli hydrologické správy SHMÚ a správu o škodách schválenú vládou, no verejné vyhodnotenie samotného krízového riadenia sme nenašli. Pritom by bolo pri ďalšej povodni najlacnejším poučením.', 'The biggest difference is not in technology but in handling information. Czechia warned of extreme rainfall on 11 Sep for the whole period of 12–15 Sep, communicated under one slogan and in 2025 published an official evaluation with concrete recommendations, such as Cell Broadcast and a single warning channel. For Slovakia we found SHMÚ hydrological reports and a damage report approved by the government, but no public evaluation of the crisis management itself, although it would be the cheapest lesson for the next flood.')}
          </p>
        </div>
      </div>
    </Section>
  )
}
