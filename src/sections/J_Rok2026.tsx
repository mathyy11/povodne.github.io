import { Lightbulb } from 'lucide-react'
import { Cite, Reveal, Section, SectionHeader } from '../components/ui'
import { useContent } from '../data/content'
import { useT } from '../lib/i18n'

export function Rok2026() {
  const t = useT()
  const { statusMeta, whatsNew } = useContent()
  const counts = (Object.keys(statusMeta) as (keyof typeof statusMeta)[]).map((k) => ({ k, n: whatsNew.filter((w) => w.status === k).length }))

  return (
    <Section id="rok2026">
      <SectionHeader
        letter="J"
        index="10"
        kicker={t('Čo sa zmenilo do roku 2026', 'What changed by 2026')}
        title={t(<>Dva roky po povodni:<br /><span className="text-fog-400">čo je nové</span></>, <>Two years after the flood:<br /><span className="text-fog-400">what is new</span></>)}
        lead={t('Prehľad zmien v systéme ochrany pred povodňami a varovania od septembra 2024 do októbra 2026. Uvádzame iba to, čo sa dá doložiť zdrojom. Pri plánoch, ktorých výsledok sme neoverili, to výslovne píšeme.', 'An overview of changes to flood protection and public warning from September 2024 to October 2026. We list only what can be backed by a source. Where we could not verify the outcome of a plan, we say so.')}
      />

      <Reveal>
        <div className="flex flex-wrap gap-3 mb-12">
          {counts.map(({ k, n }) => (
            <span key={k} className="chip" style={{ borderColor: statusMeta[k].color, color: statusMeta[k].color }}>
              <span className="w-2 h-2 rounded-full" style={{ background: statusMeta[k].color }} /> {statusMeta[k].label}: {n}
            </span>
          ))}
        </div>
      </Reveal>

      <ol className="relative border-l border-line-strong ml-2 md:ml-4">
        {whatsNew.map((w, i) => (
          <li key={w.title} className="relative pl-8 md:pl-12 pb-16 last:pb-0">
            <span className="absolute -left-[9px] top-1 w-[17px] h-[17px] rounded-full border-[3px] border-ink-900" style={{ background: statusMeta[w.status].color }} aria-hidden />
            <Reveal delay={i * 0.04}>
              <div className="grid md:grid-cols-[150px_1fr] gap-2 md:gap-8">
                <p className="font-mono text-sm text-fog-400 pt-0.5">{w.date}</p>
                <div>
                  <span className="chip mb-3" style={{ borderColor: statusMeta[w.status].color, color: statusMeta[w.status].color }}>{statusMeta[w.status].label}</span>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-fog-50 leading-tight" style={{ fontStretch: '80%' }}>{w.title}</h3>
                  <p className="mt-3 text-fog-300 leading-relaxed max-w-3xl">{w.text}<Cite ids={w.src} /></p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      <Reveal>
        <div className="mt-16 grid lg:grid-cols-2 gap-6">
          <div className="panel p-6">
            <p className="eyebrow mb-3">{t('Čo sme nenašli', 'What we did not find')}</p>
            <ul className="space-y-2 text-sm text-fog-300 leading-relaxed list-disc pl-5">
              <li>{t('Novelu zákona č. 42/1994 Z. z. alebo č. 7/2010 Z. z., ktorá by reagovala priamo na septembrovú povodeň.', 'An amendment to Act No. 42/1994 or Act No. 7/2010 responding directly to the September flood.')}</li>
              <li>{t('Verejné vyhodnotenie reakcie krízového riadenia, porovnateľné s českou predbežnou správou.', 'A public evaluation of the crisis management response comparable to the Czech preliminary report.')}</li>
              <li>{t('Konkrétne nové protipovodňové stavby v Stupave alebo Devínskej Novej Vsi.', 'Specific new flood defences in Stupava or Devínska Nová Ves.')}</li>
            </ul>
            <p className="mt-3 text-xs text-fog-500">{t('Neznamená to, že neexistujú. V overených verejných zdrojoch sme ich však nenašli.', 'This does not mean they do not exist, only that we did not find them in verified public sources.')}</p>
          </div>
          <div className="rounded-[18px] border border-tide/30 bg-tide/[0.05] p-6">
            <p className="flex items-center gap-2 text-sm font-semibold text-tide"><Lightbulb size={15} /> {t('Hodnotenie autorov', 'Authors’ assessment')}</p>
            <p className="mt-3 text-fog-100 leading-relaxed">
              {t('Najviac sa za dva roky pohlo financovanie (refundácie, Fond solidarity) a plánovanie podľa požiadaviek EÚ, čiastočne pod tlakom rozsudku Súdneho dvora. Najslabším miestom zostáva varovanie obyvateľstva. SK-Alert, ktorý by v septembri 2024 pomohol práve obciam pod Malými Karpatmi, podľa dostupných správ ani v septembri 2026 nebol v prevádzke. Prvé odporúčanie pre štátnu správu (kapitola I) preto zostáva aktuálne.', 'In two years, funding (reimbursements, the Solidarity Fund) and planning under EU requirements moved most, partly under pressure from the Court of Justice ruling. Public warning remains the weakest point. SK-Alert, which would have helped exactly the villages below the Little Carpathians in September 2024, was still not in operation in September 2026 according to available reports. The first recommendation for the state administration (chapter I) therefore still stands.')}
            </p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
