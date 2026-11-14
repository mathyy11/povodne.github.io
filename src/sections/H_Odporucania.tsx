import { Landmark, Building2, Siren, Megaphone, ShieldCheck } from 'lucide-react'
import { Reveal, Section, SectionHeader } from '../components/ui'
import { useContent } from '../data/content'
import { useT } from '../lib/i18n'
import { AlertMockup } from '../components/AlertMockup'

const icons = { stat: Landmark, samosprava: Building2, izs: Siren, info: Megaphone, prevencia: ShieldCheck } as const

export function Odporucania() {
  const t = useT()
  const { analysis, recommendations } = useContent()
  return (
    <Section id="odporucania" className="bg-ink-850/60">
      <SectionHeader
        letter="I"
        index="09"
        kicker={t('Záver a odporúčania', 'Conclusion and recommendations')}
        title={t(<>Čo zmeniť<br /><span className="text-fog-400">pred ďalšou vodou</span></>, <>What to change<br /><span className="text-fog-400">before the next flood</span></>)}
        lead={t('Odporúčania sú analytické návrhy autorov práce. Každé nadväzuje na konkrétne zistenie z kritickej analýzy. Kliknutím na značku H1–H6 sa vrátite k príslušnému zisteniu.', 'The recommendations are the authors’ analytical proposals. Each one follows from a specific finding of the critical analysis. Click a tag H1–H6 to go back to that finding.')}
      />

      <Reveal>
        <div className="panel p-6 md:p-10 mb-10 grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start">
          <p className="font-display text-6xl md:text-8xl font-black text-volt leading-none" style={{ fontStretch: '68%' }}>{t('Záver', 'Conclusion')}</p>
          <div className="text-fog-100 text-lg leading-relaxed space-y-4">
            <p>
              {t(
                <>Septembrová povodeň 2024 ukázala <strong className="text-fog-50">dve tváre systému</strong>. Na veľkých riekach mal štát niekoľkodňový predstih a pripravil sa včas: štáby, materiál, armáda v pohotovosti aj satelitné mapovanie. Protipovodňová ochrana Bratislavy fungovala.</>,
                <>The September 2024 flood showed <strong className="text-fog-50">two faces of the system</strong>. On the large rivers the state had several days of lead time and prepared in time: crisis staffs, materials, the army on standby and satellite mapping. Bratislava’s flood defences worked.</>,
              )}
            </p>
            <p>
              {t(
                <>Pri <strong className="text-fog-50">bleskových povodniach malých tokov</strong> v podhorí Malých Karpát, na Záhorí a na Kysuciach sa však ukázali slabé miesta. Chýbalo plošné mobilné varovanie, výstrahy najvyššieho stupňa prichádzali tesne pred kulmináciou alebo po nej a rozhodnutia boli roztrieštené medzi desiatky orgánov. Ďalším problémom bola izolácia lokalít s jedinou prístupovou cestou.</>,
                <>But <strong className="text-fog-50">flash floods on small streams</strong> below the Little Carpathians, in Záhorie and in Kysuce exposed weak points. There was no area-wide mobile warning, top-level warnings came just before or after the peak, and decisions were spread across dozens of authorities. Places with a single access road becoming isolated was another problem.</>,
              )}
            </p>
          </div>
        </div>
      </Reveal>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {recommendations.map((g, i) => {
          const Icon = icons[g.id as keyof typeof icons]
          return (
            <Reveal key={g.id} delay={i * 0.05} className={i === 0 ? 'xl:row-span-2' : ''}>
              <article className="panel p-6 h-full">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-volt/10 border border-volt/30 flex items-center justify-center text-volt-soft"><Icon size={18} /></span>
                  <h3 className="font-display text-2xl font-bold text-fog-50" style={{ fontStretch: '82%' }}>{g.target}</h3>
                </div>
                <ol className="mt-5 space-y-4">
                  {g.items.map((it, j) => (
                    <li key={j} className="flex gap-3">
                      <span className="font-mono text-xs text-fog-500 mt-1 w-5">{String(j + 1).padStart(2, '0')}</span>
                      <div>
                        <p className="text-fog-100 leading-relaxed">{it.text}</p>
                        <div className="mt-2 flex gap-1.5">
                          {it.links.map((l) => (
                            <a key={l} href={`#${l}`} className="font-mono text-[10px] rounded-full border border-line-strong px-2 py-0.5 text-fog-400 hover:text-volt-soft hover:border-volt/50" title={analysis.find((a) => a.id === l)?.title}>
                              {analysis.find((a) => a.id === l)?.code}
                            </a>
                          ))}
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            </Reveal>
          )
        })}
      </div>

      {/* Návrh varovnej správy SK-Alert */}
      <div className="mt-24">
        <Reveal>
          <AlertMockup />
        </Reveal>
      </div>
    </Section>
  )
}
