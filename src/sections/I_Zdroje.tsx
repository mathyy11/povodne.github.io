import { useState } from 'react'
import { Check, Copy, ExternalLink } from 'lucide-react'
import { Reveal, Section, SectionHeader } from '../components/ui'
import { ACCESSED, sourceIndex, sources, type SourceCategory } from '../data/sources'
import { useContent } from '../data/content'
import { useT } from '../lib/i18n'

const notesEn: Record<string, string> = {
  v66: 'In force from 1 May 2025.',
  'shmu-ms': 'Operational data, not fully reviewed (per the report’s imprint).',
  'cems-monit02': 'Polygons simplified for the web (tolerance ~25–50 m); areas are taken from the product, not recalculated.',
  'cz-mzp': 'Comparative source from a neighbouring country; does not cover Slovak territory.',
  'hruba-borsa': 'Municipal notice with attachments on the level III declaration and the order declaring an emergency situation in the Bratislava Region, 15 Sep 2024.',
  'dn-poucenia': 'Paywalled content.',
}
import { styles, type CitationStyle } from '../data/citation'

const catOrder: SourceCategory[] = ['pravo', 'oficialne', 'hydro', 'odborne', 'samosprava', 'media', 'foto']

export function Zdroje() {
  const t = useT()
  const { categoryLabels } = useContent()
  const [style, setStyle] = useState<CitationStyle>('iso690')
  const [copied, setCopied] = useState(false)
  const fn = styles[style].fn

  const copyAll = async () => {
    const txt = catOrder
      .map((c) => `${categoryLabels[c]}\n` + sources.filter((s) => s.cat === c).map((s) => `[${sourceIndex[s.id]}] ${fn(s)}`).join('\n'))
      .join('\n\n')
    try {
      await navigator.clipboard.writeText(txt)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* schránka nemusí byť dostupná */
    }
  }

  return (
    <Section id="zdroje">
      <SectionHeader
        letter="K"
        index="11"
        kicker={t('Zdroje a literatúra', 'Sources and literature')}
        title={t(<>Odkiaľ<br /><span className="text-fog-400">to vieme</span></>, <>How<br /><span className="text-fog-400">we know</span></>)}
        lead={t(`Všetky zdroje boli overené ${ACCESSED.split('-').reverse().join('. ').replace(/^0/, '')}. Prednosť majú primárne dokumenty: povodňové správy SHMÚ, právne predpisy a dokumenty štátu. Spravodajské zdroje sa používajú iba na udalosti, ktoré oficiálne dokumenty neopisujú, a sú tak aj označené.`, `All sources were checked on ${ACCESSED}. Primary documents take precedence: SHMÚ flood reports, legislation and state documents. News sources are used only for events that official documents do not describe, and are marked as such. Titles are given in their original language.`)}
      />

      <Reveal>
        <div className="flex flex-wrap items-center gap-3 mb-10">
          <span className="eyebrow">{t('Citačný štýl', 'Citation style')}</span>
          <div className="inline-flex rounded-full border border-line-strong p-0.5" role="group" aria-label={t('Citačný štýl', 'Citation style')}>
            {(Object.keys(styles) as CitationStyle[]).map((k) => (
              <button key={k} onClick={() => setStyle(k)} aria-pressed={style === k} className={`rounded-full px-4 py-1.5 text-xs ${style === k ? 'bg-fog-50 text-ink-950 font-semibold' : 'text-fog-300'}`}>
                {styles[k].label}
              </button>
            ))}
          </div>
          <button onClick={copyAll} className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-1.5 text-xs text-fog-100 hover:border-volt">
            {copied ? <Check size={14} className="text-tide" /> : <Copy size={14} />} {copied ? t('Skopírované', 'Copied') : t('Kopírovať zoznam', 'Copy list')}
          </button>
        </div>
      </Reveal>

      <div className="grid lg:grid-cols-2 gap-x-12 gap-y-12">
        {catOrder.map((c) => (
          <Reveal key={c}>
            <h3 className="font-display text-2xl font-bold text-fog-50 pb-3 border-b border-line-strong" style={{ fontStretch: '82%' }}>{categoryLabels[c]}</h3>
            <ol className="mt-2">
              {sources.filter((s) => s.cat === c).map((s) => (
                <li key={s.id} id={`src-${s.id}`} className="group grid grid-cols-[2.5rem_1fr_auto] gap-3 py-3 border-b border-line/70 target:bg-volt/10 target:rounded-lg scroll-mt-28">
                  <span className="font-mono text-xs text-volt-soft pt-0.5">[{sourceIndex[s.id]}]</span>
                  <div className="min-w-0">
                    <p className="text-sm text-fog-100 leading-relaxed break-words">{fn(s)}</p>
                    {s.note && <p className="mt-1 text-xs text-fog-500">{t(s.note, notesEn[s.id] ?? s.note)}</p>}
                  </div>
                  <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-fog-500 hover:text-volt-soft pt-0.5" aria-label={`${t('Otvoriť zdroj', 'Open source')} ${sourceIndex[s.id]} v novom okne`}>
                    <ExternalLink size={15} />
                  </a>
                </li>
              ))}
            </ol>
          </Reveal>
        ))}
      </div>

      <Reveal>
        <div className="mt-16 rounded-xl border border-line p-6 text-sm text-fog-400 leading-relaxed grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-fog-100 font-semibold mb-2">{t('Metodická poznámka', 'Methodological note')}</p>
            <p>{t('Hydrologické údaje sú operatívne údaje SHMÚ, ktoré podľa tiráže správ neprešli úplnou revíziou a nemožno ich použiť ako úradný doklad. Časy sú v SEČ. Predstih výstrah (kap. G) a počty vyhlásení SPA vypočítali autori z tabuliek SHMÚ. Polohy na mape sú geokódované stredy obcí (OSM Nominatim).', 'Hydrological data are SHMÚ operational data which, according to the reports’ imprint, have not been fully reviewed and cannot be used as an official record. Times are in CET. Warning lead times (chapter G) and counts of flood level declarations were calculated by the authors from SHMÚ tables. Map positions are geocoded village centres (OSM Nominatim).')}</p>
          </div>
          <div>
            <p className="text-fog-100 font-semibold mb-2">{t('Čo sme vedome vynechali', 'What we deliberately left out')}</p>
            <p>{t('Počty evakuovaných osôb, zaplavených domov a obetí za Slovensko, hranice zaplaveného územia mimo satelitného mapovania Copernicus a konkrétne evakuácie, ktoré nie sú doložené. Tieto údaje sa v overených zdrojoch nepodarilo nájsť alebo by si vyžadovali odhad.', 'Numbers of evacuated people, flooded homes and deaths in Slovakia, flood boundaries outside the Copernicus satellite mapping, and specific evacuations that are not documented. These figures could not be found in verified sources or would require estimates.')}</p>
          </div>
        </div>
      </Reveal>
    </Section>
  )
}
