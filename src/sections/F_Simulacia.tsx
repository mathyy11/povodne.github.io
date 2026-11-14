import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { CheckCircle2, CircleAlert, RotateCcw, XCircle, Gamepad2 } from 'lucide-react'
import { Cite, Section, SectionHeader } from '../components/ui'
import { useLang, useT } from '../lib/i18n'

// Didaktická simulácia: hráč je starosta obce pod Malými Karpatmi.
// Situácie a „čo sa naozaj stalo“ sú doložené zdrojmi; hodnotenie možností je analytický model autorov.

type Option = { text: string; score: 0 | 1 | 2; feedback: string }
type Scene = { id: string; time: string; situation: string; options: Option[]; reality: string; src: string[] }

const scenesSk: Scene[] = [
  {
    id: 's1',
    time: 'Sobota 14. 9. 2024, 6:00',
    situation: 'SHMÚ vydal pre váš okres hydrologickú výstrahu 2. stupňa. Prší od štvrtka a potok cez obec stúpa. Výstraha 3. stupňa zatiaľ nie je.',
    options: [
      { text: 'Počkám, kým SHMÚ vydá výstrahu 3. stupňa.', score: 0, feedback: 'Pri malom horskom toku môže výstraha 3. stupňa prísť príliš neskoro.' },
      { text: 'Zvolám povodňovú komisiu, rozdám vrecia s pieskom a upozorním domácnosti pri potoku.', score: 2, feedback: 'Správne. Výstraha 2. stupňa je pri bleskových povodniach posledná chvíľa na prípravu.' },
      { text: 'Okamžite nariadim evakuáciu celej obce.', score: 1, feedback: 'Bezpečné, ale neprimerané. Plošná evakuácia bez bezprostrednej hrozby oslabuje dôveru ľudí pri ďalšom varovaní.' },
    ],
    reality: 'V okrese Pezinok platila výstraha 2. stupňa od 14. 9. 6:00. Blatina v Pezinku kulminovala 15. 9. o 6:00 (10- až 20-ročná voda). Výstraha 3. stupňa prišla až o 7:01, teda hodinu po kulminácii.',
    src: ['shmu-ms'],
  },
  {
    id: 's2',
    time: 'Nedeľa 15. 9. 2024, 4:00',
    situation: 'Za posledných 24 hodín spadlo v okolí vyše 50 mm. Hliadka hlási, že potok sa vylieva a voda sa blíži k prvým domom.',
    options: [
      { text: 'Vyhlásim 3. stupeň povodňovej aktivity a varujem obyvateľov sirénou „OHROZENIE VODOU“, rozhlasom aj na sociálnych sieťach.', score: 2, feedback: 'Správne. Starosta vyhlasuje 3. SPA pre územie obce a varovanie sa vždy dopĺňa hovorenou informáciou.' },
      { text: 'Počkám do rána, kým sa situácia vyjasní.', score: 0, feedback: 'Bleskové povodne kulminujú v noci a nad ránom. Čakanie môže znamenať, že varovanie príde neskoro.' },
      { text: 'Zavolám hasičov, ale obyvateľov zatiaľ nebudem znepokojovať.', score: 1, feedback: 'Zásah je dôležitý, no bez varovania nemôžu obyvatelia chrániť seba a svoj majetok.' },
    ],
    reality: 'V nedeľu 15. 9. ráno vyhlásili 3. SPA desiatky starostov na Záhorí a pod Malými Karpatmi, väčšinou medzi 6:00 a 11:30. Stupava ho vyhlásila už o polnoci a vyzvala ľudí pripraviť si evakuačnú batožinu. V Perneku spadlo za 24 hodín 159 mm.',
    src: ['shmu-ms', 'stvr-1509', 'shmu-1509'],
  },
  {
    id: 's3',
    time: 'Pondelok 16. 9. 2024',
    situation: 'Jediná cesta do obce je pod vodou. V obci je zariadenie sociálnych služieb s desiatkami klientov a zásoby sa míňajú.',
    options: [
      { text: 'Vyhlásim mimoriadnu situáciu a cez okresný úrad požiadam o zásobovanie a pomoc ozbrojených síl.', score: 2, feedback: 'Správne. Mimoriadna situácia umožňuje využiť sily z celého územia a núdzové zásobovanie.' },
      { text: 'Klientov odvezieme sami autobusom cez zaplavenú cestu.', score: 0, feedback: 'Prejazd zaplavenou cestou patrí medzi najrizikovejšie činnosti pri povodni a zraniteľných ľudí by ste vystavili zbytočnému nebezpečenstvu.' },
      { text: 'Počkáme, voda do pár dní opadne.', score: 0, feedback: 'Izolácia môže trvať dni a núdzové zásobovanie je povinnosťou obce.' },
    ],
    reality: 'Chľaba (okres Nové Zámky) mala vyhlásenú mimoriadnu situáciu a bola asi štyri dni odrezaná od cestného spojenia. V obci a v neďalekom Kováčove boli zariadenia sociálnych služieb s približne 270 klientmi a armáda pomáhala so zásobovaním. Obyvatelia Devínskej Novej Vsi mohli odísť len kyvadlovou dopravou armády.',
    src: ['tasr-1709', 'tasr-droba', 'z42'],
  },
  {
    id: 's4',
    time: 'Po povodni, október 2024',
    situation: 'Voda opadla. Obec minula peniaze na vrecia, pohonné hmoty, techniku a nadčasy.',
    options: [
      { text: 'Dôsledne zdokumentujem náklady a škody, požiadam o refundáciu a aktualizujem povodňový plán.', score: 2, feedback: 'Správne. Bez dokladov obec refundáciu nedostane a bez aktualizácie plánu zopakuje tie isté chyby.' },
      { text: 'Náklady zaplatíme z rozpočtu a ďalej to neriešime.', score: 0, feedback: 'Obec prichádza o peniaze, na ktoré má nárok, a nič sa nenaučí.' },
      { text: 'Požiadam o refundáciu, ale povodňový plán nechám tak, ako je.', score: 1, feedback: 'Peniaze možno prídu, no ponaučenie sa stratí.' },
    ],
    reality: 'Vláda schválila refundáciu viac ako 10,82 mil. € až 21. 5. 2025, približne osem mesiacov po povodni. Obce dovtedy niesli náklady samy.',
    src: ['tasr-vlada25'],
  },
]


// Anglická verzia scén (rovnaké poradie možností a body)
const scenesEn: Record<string, { time: string; situation: string; options: { text: string; feedback: string }[]; reality: string }> = {
  s1: {
    time: 'Saturday 14 Sep 2024, 06:00',
    situation: 'SHMÚ has issued a level-2 hydrological warning for your district. It has been raining since Thursday and the stream through the village is rising. There is no level-3 warning yet.',
    options: [
      { text: 'I will wait until SHMÚ issues a level-3 warning.', feedback: 'On a small mountain stream the level-3 warning may come too late.' },
      { text: 'I convene the flood commission, hand out sandbags and warn households along the stream.', feedback: 'Correct. In flash floods the level-2 warning is the last moment to prepare.' },
      { text: 'I order the whole village to evacuate immediately.', feedback: 'Safe but disproportionate. A blanket evacuation without an immediate threat weakens trust in the next warning.' },
    ],
    reality: 'Pezinok district had a level-2 warning from 14 Sep 06:00. The Blatina at Pezinok peaked on 15 Sep at 06:00 (10- to 20-year flow). The level-3 warning came only at 07:01, an hour after the peak.',
  },
  s2: {
    time: 'Sunday 15 Sep 2024, 04:00',
    situation: 'More than 50 mm of rain has fallen in the area in the last 24 hours. The patrol reports the stream is overflowing and water is approaching the first houses.',
    options: [
      { text: 'I declare flood activity level 3 and warn residents with the “OHROZENIE VODOU” siren, the village loudspeakers and social media.', feedback: 'Correct. The mayor declares level 3 for the municipality, and a warning is always followed by spoken information.' },
      { text: 'I will wait until morning for the situation to become clearer.', feedback: 'Flash floods peak at night and towards morning. Waiting can mean the warning comes too late.' },
      { text: 'I call the firefighters but will not alarm the residents yet.', feedback: 'The response matters, but without a warning residents cannot protect themselves and their property.' },
    ],
    reality: 'On Sunday morning, 15 Sep, dozens of mayors in Záhorie and below the Little Carpathians declared level 3, mostly between 06:00 and 11:30. Stupava declared it at midnight and asked people to pack emergency bags. Pernek received 159 mm in 24 hours.',
  },
  s3: {
    time: 'Monday 16 Sep 2024',
    situation: 'The only road into the village is under water. The village has a social care home with dozens of clients, and supplies are running low.',
    options: [
      { text: 'I declare an emergency situation and ask, through the district office, for supplies and help from the armed forces.', feedback: 'Correct. An emergency situation allows forces from the whole area to be used and emergency supplies to be provided.' },
      { text: 'We will drive the clients out ourselves by bus across the flooded road.', feedback: 'Driving through a flooded road is one of the riskiest things to do in a flood, and you would put vulnerable people in needless danger.' },
      { text: 'We will wait; the water will go down in a few days.', feedback: 'Isolation can last days, and emergency supply is the municipality’s duty.' },
    ],
    reality: 'Chľaba (Nové Zámky district) had an emergency situation declared and was cut off by road for about four days. Social care homes in the village and nearby Kováčov had about 270 clients and the army helped with supplies. Residents of Devínska Nová Ves could leave only by army shuttle.',
  },
  s4: {
    time: 'After the flood, October 2024',
    situation: 'The water has gone down. The municipality has spent money on sandbags, fuel, equipment and overtime.',
    options: [
      { text: 'I document costs and damage thoroughly, apply for reimbursement and update the flood plan.', feedback: 'Correct. Without documents there is no reimbursement, and without updating the plan the same mistakes will repeat.' },
      { text: 'We pay the costs from our budget and leave it there.', feedback: 'The municipality loses money it is entitled to and learns nothing.' },
      { text: 'I apply for reimbursement but leave the flood plan as it is.', feedback: 'The money may come, but the lesson is lost.' },
    ],
    reality: 'The government approved reimbursement of more than €10.82 million only on 21 May 2025, about eight months after the flood. Until then, municipalities bore the costs themselves.',
  },
}

export function Simulacia() {
  const t = useT()
  const { lang } = useLang()
  const scenes: Scene[] = lang === 'en'
    ? scenesSk.map((s) => {
        const e = scenesEn[s.id]
        return { ...s, time: e.time, situation: e.situation, reality: e.reality, options: s.options.map((o, i) => ({ ...o, text: e.options[i].text, feedback: e.options[i].feedback })) }
      })
    : scenesSk
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<(number | null)[]>(scenesSk.map(() => null))
  const done = step >= scenes.length
  const score = answers.reduce<number>((a, v, i) => a + (v == null ? 0 : scenes[i].options[v].score), 0)
  const max = scenes.length * 2
  const scene = scenes[Math.min(step, scenes.length - 1)]
  const picked = answers[step]

  const choose = (i: number) => setAnswers((a) => a.map((v, k) => (k === step ? i : v)))
  const reset = () => {
    setAnswers(scenes.map(() => null))
    setStep(0)
  }

  return (
    <Section id="simulacia" className="bg-ink-850/60">
      <SectionHeader
        letter="F"
        index="06"
        kicker={t('Simulácia rozhodnutí', 'Decision simulation')}
        title={t(<>Ste starosta.<br /><span className="text-fog-400">Čo urobíte?</span></>, <>You are the mayor.<br /><span className="text-fog-400">What do you do?</span></>)}
        lead={t('Interaktívny model rozhodovania v obci pod Malými Karpatmi. Situácie aj „čo sa naozaj stalo“ sú doložené zdrojmi. Hodnotenie jednotlivých možností je didaktický model autorov práce, nie oficiálny postup.', 'An interactive model of decision-making in a village below the Little Carpathians. The situations and “what really happened” are documented in sources. The scoring of options is the authors’ teaching model, not an official procedure.')}
      />

      <div className="grid lg:grid-cols-[1fr_300px] gap-8 items-start">
        <div className="panel p-6 md:p-10 min-h-[420px]">
          <AnimatePresence mode="wait">
            {!done ? (
              <motion.div key={scene.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                <p className="eyebrow">{t('Situácia', 'Situation')} {step + 1} / {scenes.length} · {scene.time}</p>
                <p className="mt-4 text-xl md:text-2xl text-fog-50 leading-snug">{scene.situation}</p>
                <div className="mt-8 space-y-3" role="radiogroup" aria-label={t('Vaše rozhodnutie', 'Your decision')}>
                  {scene.options.map((o, i) => {
                    const sel = picked === i
                    const show = picked != null
                    const Icon = o.score === 2 ? CheckCircle2 : o.score === 1 ? CircleAlert : XCircle
                    const col = o.score === 2 ? 'var(--color-tide)' : o.score === 1 ? 'var(--color-warn-1)' : 'var(--color-warn-2)'
                    return (
                      <button
                        key={i}
                        role="radio"
                        aria-checked={sel}
                        disabled={show}
                        onClick={() => choose(i)}
                        className={`w-full text-left rounded-xl border p-4 transition-all ${sel ? 'bg-ink-700' : 'bg-ink-800/60 hover:border-volt/60 hover:bg-ink-700/60'} ${show && !sel ? 'opacity-55' : ''}`}
                        style={{ borderColor: show ? col : undefined }}
                      >
                        <span className="flex items-start gap-3">
                          <span className="font-mono text-xs text-fog-500 mt-1">{String.fromCharCode(65 + i)}</span>
                          <span className="flex-1">
                            <span className="text-fog-50">{o.text}</span>
                            {show && (
                              <span className="mt-2 flex items-start gap-2 text-sm" style={{ color: col }}>
                                <Icon size={16} className="mt-0.5 shrink-0" /> {o.feedback}
                              </span>
                            )}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
                {picked != null && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-xl border border-volt/30 bg-volt/[0.06] p-5">
                    <p className="text-sm font-semibold text-volt-soft">{t('Čo sa naozaj stalo v septembri 2024', 'What really happened in September 2024')}</p>
                    <p className="mt-2 text-fog-100 leading-relaxed">{scene.reality}<Cite ids={scene.src} /></p>
                    <button onClick={() => setStep((s) => s + 1)} className="mt-5 rounded-full bg-fog-50 text-ink-950 px-5 py-2.5 text-sm font-semibold hover:bg-volt-soft">
                      {step === scenes.length - 1 ? t('Zobraziť výsledok →', 'Show result →') : t('Ďalšia situácia →', 'Next situation →')}
                    </button>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-6">
                <Gamepad2 className="mx-auto text-volt-soft" size={36} />
                <p className="mt-4 eyebrow">{t('Výsledok', 'Result')}</p>
                <p className="mt-2 font-display text-7xl font-black text-fog-50 tabular-nums" style={{ fontStretch: '70%' }}>{score} / {max}</p>
                <p className="mt-4 text-lg text-fog-300 max-w-xl mx-auto">
                  {score === max
                    ? t('Výborne. Konali ste včas a v súlade s kompetenciami obce.', 'Excellent. You acted in time and within the municipality’s powers.')
                    : score >= max - 2
                      ? t('Dobre. V niektorých chvíľach by však ďalšie zaváhanie stálo ľudí čas.', 'Good. At some moments, though, more hesitation would have cost people time.')
                      : t('Pri bleskovej povodni rozhodujú hodiny. Pozrite si, ako to dopadlo v skutočnosti, a skúste to znova.', 'In a flash flood, hours matter. See how it turned out in reality and try again.')}
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <button onClick={reset} className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-2.5 text-sm text-fog-100 hover:border-volt"><RotateCcw size={15} /> {t('Skúsiť znova', 'Try again')}</button>
                  <a href="#analyza" className="rounded-full bg-fog-50 text-ink-950 px-5 py-2.5 text-sm font-semibold hover:bg-volt-soft">{t('Prejsť na kritickú analýzu →', 'Go to the critical analysis →')}</a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <aside className="panel p-5 lg:sticky lg:top-[calc(var(--nav-h)+24px)]" aria-label={t('Priebeh simulácie', 'Simulation progress')}>
          <p className="eyebrow mb-4">{t('Priebeh', 'Progress')}</p>
          <ol className="space-y-3">
            {scenes.map((sc, i) => {
              const a = answers[i]
              const sScore = a == null ? null : sc.options[a].score
              return (
                <li key={sc.id} className="flex items-center gap-3">
                  <span className={`w-7 h-7 rounded-full border flex items-center justify-center font-mono text-xs ${i === step && !done ? 'border-volt text-volt-soft' : 'border-line-strong text-fog-500'}`}
                    style={sScore != null ? { background: sScore === 2 ? 'var(--color-tide)' : sScore === 1 ? 'var(--color-warn-1)' : 'var(--color-warn-2)', color: '#070b10', borderColor: 'transparent' } : undefined}>
                    {i + 1}
                  </span>
                  <span className="text-sm text-fog-300 leading-tight">{sc.time}</span>
                </li>
              )
            })}
          </ol>
          <div className="mt-6 pt-4 border-t border-line">
            <div className="flex justify-between text-xs text-fog-400"><span>{t('Body', 'Points')}</span><span className="font-mono">{score} / {max}</span></div>
            <div className="mt-2 h-2 rounded-full bg-ink-600 overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-volt to-tide" animate={{ width: `${(score / max) * 100}%` }} /></div>
          </div>
          <p className="mt-4 text-[11px] text-fog-500 leading-relaxed">{t('Právny rámec: § 15 zákona č. 42/1994 Z. z. (obec), § 11 zákona č. 7/2010 Z. z. (SPA).', 'Legal framework: § 15 of Act No. 42/1994 (municipality), § 11 of Act No. 7/2010 (flood levels).')}<Cite ids={['z42', 'z7']} /></p>
        </aside>
      </div>
    </Section>
  )
}
