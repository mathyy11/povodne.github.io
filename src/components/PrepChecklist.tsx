import { useEffect, useState } from 'react'
import { Check, RotateCcw, TriangleAlert } from 'lucide-react'
import { Cite } from './ui'
import { useT } from '../lib/i18n'

// Odporúčania sekcie krízového riadenia MV SR pre prípad povodne (tlačová správa z 12. 9. 2024) [minv-1209].
// Zaškrtnutie si pamätá iba prehliadač návštevníka (localStorage); web nič neodosiela.
const items: { sk: string; en: string }[] = [
  { sk: 'Vypnite alebo uzatvorte hlavné rozvody elektriny, vody a plynu.', en: 'Switch off or close the main electricity, water and gas supply.' },
  { sk: 'Dôležité vybavenie domácnosti presuňte do vyšších poschodí.', en: 'Move important household items to upper floors.' },
  { sk: 'Zatvorte všetky okná.', en: 'Close all windows.' },
  { sk: 'Pripravte si vozidlo pre prípad evakuácie.', en: 'Get a vehicle ready in case of evacuation.' },
  { sk: 'Lieky, doklady, vhodné oblečenie, trvanlivé potraviny a pitnú vodu na 2 až 3 dni.', en: 'Medicines, documents, suitable clothing, long-life food and drinking water for 2 to 3 days.' },
  { sk: 'Nepremokavú obuv a oblečenie.', en: 'Waterproof shoes and clothing.' },
  { sk: 'Odstráňte látky, ktoré môžu s vodou reagovať (jedy, žieraviny, kyseliny).', en: 'Remove substances that may react with water (poisons, corrosives, acids).' },
  { sk: 'Informujte susedov.', en: 'Tell your neighbours.' },
  { sk: 'Nejazdite cez zaplavené cesty a mosty, ak neviete odhadnúť hĺbku vody.', en: 'Do not drive through flooded roads or bridges if you cannot judge the depth.' },
  { sk: 'Pripravte evakuáciu zvierat.', en: 'Prepare to evacuate animals.' },
  { sk: 'Zbaľte si evakuačnú batožinu.', en: 'Pack an evacuation bag.' },
  { sk: 'Riaďte sa pokynmi záchranných zložiek a úradov a sledujte správy v médiách.', en: 'Follow instructions from rescue services and authorities and watch the news.' },
]

const KEY = 'povodne24-checklist'

export function PrepChecklist() {
  const t = useT()
  const [done, setDone] = useState<boolean[]>(() => {
    try {
      const v = JSON.parse(localStorage.getItem(KEY) || '[]')
      return Array.isArray(v) && v.length === items.length ? v : items.map(() => false)
    } catch {
      return items.map(() => false)
    }
  })
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(done))
    } catch {
      /* úložisko nemusí byť dostupné */
    }
  }, [done])

  const count = done.filter(Boolean).length
  const pct = Math.round((count / items.length) * 100)
  const r = 26
  const c = 2 * Math.PI * r

  return (
    <div className="panel p-5 md:p-7">
      <div className="flex flex-wrap items-start justify-between gap-5">
        <div className="max-w-xl">
          <p className="eyebrow">{t('Pre obyvateľov', 'For residents')}</p>
          <h3 className="mt-2 font-display text-3xl md:text-4xl font-extrabold uppercase text-fog-50" style={{ fontStretch: '75%' }}>{t('Čo robiť pri povodni', 'What to do in a flood')}</h3>
          <p className="mt-3 text-sm text-fog-300 leading-relaxed">
            {t('Odporúčania, ktoré sekcia krízového riadenia MV SR zverejnila 12. 9. 2024, tri dni pred kulmináciou malokarpatských a záhorských tokov. Zaškrtnite, čo by ste zvládli doma. Výsledok si pamätá iba váš prehliadač.', 'Recommendations published by the Interior Ministry’s crisis management section on 12 Sep 2024, three days before streams in the Little Carpathians and Záhorie peaked. Tick what you could manage at home. Only your browser remembers the result.')}
            <Cite ids={['minv-1209']} />
          </p>
        </div>
        <div className="flex items-center gap-4">
          <svg width="64" height="64" viewBox="0 0 64 64" aria-hidden>
            <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(150,185,215,.15)" strokeWidth="6" />
            <circle cx="32" cy="32" r={r} fill="none" stroke="var(--color-tide)" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - count / items.length)} transform="rotate(-90 32 32)" style={{ transition: 'stroke-dashoffset .4s' }} />
            <text x="32" y="36" textAnchor="middle" fontSize="13" fontFamily="var(--font-mono)" fill="var(--color-fog-50)">{pct}%</text>
          </svg>
          <div>
            <p className="font-mono text-sm text-fog-100" aria-live="polite">{count} / {items.length}</p>
            <button onClick={() => setDone(items.map(() => false))} className="mt-1 inline-flex items-center gap-1.5 text-xs text-fog-400 hover:text-fog-50 transition-colors">
              <RotateCcw size={12} /> {t('Začať odznova', 'Start over')}
            </button>
          </div>
        </div>
      </div>

      <p className="mt-6 flex items-start gap-2 rounded-xl border border-warn-2/40 bg-warn-2/[0.06] p-4 text-sm text-fog-100">
        <TriangleAlert size={16} className="mt-0.5 shrink-0 text-warn-2" />
        {t('Ak nemáte čas, nechajte všetko tak a choďte na vyššie položené alebo vopred určené bezpečné miesto.', 'If you are short of time, leave everything and go to higher ground or a pre-arranged safe place.')}
      </p>

      <ul className="mt-5 grid md:grid-cols-2 gap-2">
        {items.map((it, i) => (
          <li key={i}>
            <button
              onClick={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
              aria-pressed={done[i]}
              className={`w-full flex items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${done[i] ? 'border-tide/50 bg-tide/[0.07] text-fog-50' : 'border-line bg-ink-800/60 text-fog-300 hover:border-line-strong hover:text-fog-50'}`}
            >
              <span className={`mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border ${done[i] ? 'border-tide bg-tide text-ink-950' : 'border-line-strong'}`}>
                {done[i] && <Check size={13} strokeWidth={3} />}
              </span>
              {t(it.sk, it.en)}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
