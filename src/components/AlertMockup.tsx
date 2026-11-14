import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { BellRing, Info } from 'lucide-react'
import { useT } from '../lib/i18n'
import { Cite } from './ui'

// Návrh autorov: ako by mohla vyzerať varovná správa SK-Alert (Cell Broadcast) v septembri 2024.
// Nejde o oficiálnu šablónu MV SR. Fakty v správach (stupne výstrah, časy) sú podľa SHMÚ.

type Scenario = {
  id: string
  tab: [string, string]
  time: string
  level: 'extreme' | 'severe'
  head: [string, string]
  body: [string, string]
  facts: [string, string]
  src: string[]
}

const scenarios: Scenario[] = [
  {
    id: 'pezinok',
    tab: ['Pezinok · 14. 9. 6:00', 'Pezinok · 14 Sep 06:00'],
    time: '14. 9. 2024 · 06:00',
    level: 'severe',
    head: ['VÝSTRAHA – POVODEŇ (2. stupeň)', 'WARNING – FLOOD (level 2)'],
    body: [
      'Okres Pezinok: hrozí rýchly vzostup potokov z Malých Karpát (Blatina, Gidra, Parná) do 24 hodín. Odneste cennosti z pivníc, pripravte vrecia s pieskom, nechoďte k vode. Ak bývate pri potoku, pripravte si evakuačnú batožinu. Viac: www.shmu.sk · tiesňová linka 112',
      'Pezinok district: fast-rising streams from the Little Carpathians (Blatina, Gidra, Parná) expected within 24 hours. Move valuables out of cellars, prepare sandbags, stay away from water. If you live near a stream, pack an emergency bag. More: www.shmu.sk · emergency line 112',
    ],
    facts: [
      'Reálne: výstraha 2. stupňa platila od 14. 9. 6:00, Blatina kulminovala 15. 9. o 6:00 a výstraha 3. stupňa prišla až o 7:01.',
      'In reality: the level-2 warning was valid from 14 Sep 06:00, the Blatina peaked on 15 Sep at 06:00 and the level-3 warning came only at 07:01.',
    ],
    src: ['shmu-ms'],
  },
  {
    id: 'bratislava',
    tab: ['Bratislava · 14. 9. 20:00', 'Bratislava · 14 Sep 20:00'],
    time: '14. 9. 2024 · 20:00',
    level: 'extreme',
    head: ['EXTRÉMNA VÝSTRAHA – POVODEŇ NA DUNAJI', 'EXTREME ALERT – DANUBE FLOOD'],
    body: [
      'Bratislava: Dunaj bude v najbližších dňoch prudko stúpať. Hrozí zaplavenie nábreží, Devína a Devínskej Novej Vsi. Nevstupujte za mobilné hradenie, presuňte autá z nábreží, sledujte pokyny mestskej časti. Pomoc: 112',
      'Bratislava: the Danube will rise sharply over the coming days. Embankments, Devín and Devínska Nová Ves may be flooded. Do not go beyond mobile flood barriers, move cars away from the riverside, follow your borough’s instructions. Help: 112',
    ],
    facts: [
      'Reálne: výstraha 3. stupňa pre okres Bratislava platila od 14. 9. 20:00, Dunaj kulminoval 18. 9. o 13:30 (985 cm), Devín bol odrezaný.',
      'In reality: the level-3 warning for Bratislava was valid from 14 Sep 20:00, the Danube peaked on 18 Sep at 13:30 (985 cm) and Devín was cut off.',
    ],
    src: ['shmu-ms', 'tasr-droba'],
  },
]

const principles: [string, string][] = [
  ['Kto varuje (štát, nie neznámy odosielateľ)', 'Who is warning (the state, not an unknown sender)'],
  ['Čo hrozí a kedy', 'What is coming and when'],
  ['Presne kde (okres, toky, mestské časti)', 'Exactly where (district, streams, boroughs)'],
  ['Čo má človek urobiť teraz (3 konkrétne kroky)', 'What to do now (3 concrete steps)'],
  ['Kde nájde viac informácií', 'Where to find more information'],
]

export function AlertMockup() {
  const t = useT()
  const [sel, setSel] = useState(scenarios[0].id)
  const s = scenarios.find((x) => x.id === sel)!
  const color = s.level === 'extreme' ? '#ff4d4f' : '#ff8a3d'

  return (
    <div className="grid lg:grid-cols-[minmax(0,1fr)_360px] gap-10 items-center">
      <div>
        <p className="eyebrow">{t('Návrh autorov · nie oficiálna šablóna', 'Authors’ proposal · not an official template')}</p>
        <h3 className="mt-2 font-display text-3xl md:text-5xl font-extrabold uppercase text-fog-50 leading-[0.95]" style={{ fontStretch: '72%' }}>
          {t('Ako mohla vyzerať', 'What the warning')}<br /><span className="text-fog-400">{t('varovná správa', 'could have looked like')}</span>
        </h3>
        <p className="mt-4 text-fog-300 max-w-xl leading-relaxed">
          {t(
            'SK-Alert (Cell Broadcast) pošle správu naraz všetkým telefónom v zasiahnutej oblasti, bez telefónneho čísla a bez aplikácie. V septembri 2024 neexistoval. Takto by mohli vyzerať dve správy, ak by systém fungoval.',
            'SK-Alert (Cell Broadcast) sends one message to every phone in the affected area at once, without phone numbers or apps. It did not exist in September 2024. Here are two messages it could have sent.',
          )}
          <Cite ids={['tasr-skalert', 'techbyte-skalert']} />
        </p>

        <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label={t('Scenár', 'Scenario')}>
          {scenarios.map((x) => (
            <button key={x.id} role="tab" aria-selected={sel === x.id} onClick={() => setSel(x.id)} className={`rounded-full px-4 py-2 text-sm border ${sel === x.id ? 'bg-ink-600 border-line-strong text-fog-50' : 'border-line text-fog-400 hover:text-fog-100'}`}>
              {t(x.tab[0], x.tab[1])}
            </button>
          ))}
        </div>

        <ol className="mt-8 space-y-2">
          {principles.map((p, i) => (
            <li key={i} className="flex gap-3 text-sm text-fog-100">
              <span className="font-mono text-xs text-volt-soft mt-0.5 w-5">{i + 1}</span>
              {t(p[0], p[1])}
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-start gap-2 text-sm text-fog-400 max-w-xl">
          <Info size={15} className="mt-0.5 shrink-0 text-volt-soft" />
          <span>{t(s.facts[0], s.facts[1])}<Cite ids={s.src} /></span>
        </p>
      </div>

      {/* Telefón */}
      <div className="mx-auto w-[300px] max-w-full">
        <div className="relative rounded-[42px] border-[10px] border-ink-600 bg-gradient-to-b from-[#0e1b2b] to-[#060a10] h-[600px] shadow-[0_40px_80px_-20px_rgba(0,0,0,.8)] overflow-hidden">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-black" aria-hidden />
          <div className="pt-12 text-center">
            <p className="font-display text-6xl font-extralight text-fog-50 tabular-nums" style={{ fontStretch: '90%' }}>{s.time.split(' · ')[1]}</p>
            <p className="text-sm text-fog-300">{t('sobota 14. septembra', 'Saturday, 14 September')}</p>
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: -16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="mx-3 mt-8 rounded-2xl bg-[#1b232e]/95 border p-4 backdrop-blur"
              style={{ borderColor: color, boxShadow: `0 0 0 4px ${color}22` }}
              role="img"
              aria-label={`${t(s.head[0], s.head[1])}. ${t(s.body[0], s.body[1])}`}
            >
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg inline-flex items-center justify-center" style={{ background: color }}>
                  <BellRing size={15} className="text-ink-950" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-semibold text-fog-50">SK-Alert</p>
                  <p className="text-[10px] text-fog-400">{t('Ministerstvo vnútra SR · teraz', 'Ministry of Interior SK · now')}</p>
                </div>
              </div>
              <p className="mt-3 text-[13px] font-bold leading-snug" style={{ color }}>{t(s.head[0], s.head[1])}</p>
              <p className="mt-1.5 text-[12.5px] text-fog-100 leading-snug">{t(s.body[0], s.body[1])}</p>
            </motion.div>
          </AnimatePresence>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-28 h-1 rounded-full bg-fog-400/60" aria-hidden />
        </div>
      </div>
    </div>
  )
}
