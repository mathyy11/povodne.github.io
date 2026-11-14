import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react'
import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Cite, Reveal, Section, SectionHeader, Stat } from '../components/ui'
import { BeforeAfter } from '../components/BeforeAfter'
import { useT } from '../lib/i18n'

const areas = [
  {
    name: ['Záhorie a Myjavská pahorkatina', 'Záhorie and the Myjava Hills'],
    rivers: 'Morava, Myjava, Chvojnica, Teplica, Malina, Stupávka',
    text: [
      'Zrážky 169–260 mm, v Perneku až 386 mm. Malé toky kulminovali 15.–16. 9. Malina v Jakubove dosiahla 100-ročnú vodu, ovplyvnenú pretrhnutím hrádze. Chvojnica v Lopašove mala 50-ročnú vodu.',
      'Rainfall of 169–260 mm, up to 386 mm in Pernek. Small streams peaked on 15–16 Sep. The Malina at Jakubov reached a 100-year flow, influenced by a dike breach. The Chvojnica at Lopašov had a 50-year flow.',
    ],
    src: ['shmu-ms'],
  },
  {
    name: ['Slovenský úsek Dunaja', 'Slovak section of the Danube'],
    rivers: 'Devín → Bratislava → Medveďov → Komárno → Štúrovo',
    text: [
      'Povodňová vlna z Rakúska sa pri Devíne spojila s Moravou. Vo všetkých profiloch bol prekročený 3. SPA a prietoky zodpovedali 20-ročnej vode, v Medveďove 20- až 50-ročnej.',
      'The flood wave from Austria merged with the Morava at Devín. Flood activity level 3 was exceeded at all gauges and flows matched a 20-year flood, 20 to 50 years at Medveďov.',
    ],
    src: ['shmu-ms'],
  },
  {
    name: ['Malé Karpaty – dolný Váh', 'Little Carpathians – lower Váh'],
    rivers: ['Blatina, Parná, Gidra; vzdutie Váhu a Malého Dunaja', 'Blatina, Parná, Gidra; backwater on the Váh and Little Danube'],
    text: [
      'Za 12.–15. 9. spadlo 109–150 mm. Blatina v Pezinku dosiahla 10- až 20-ročnú vodu. Neskôr vysoký Dunaj vzdul dolný Váh: v Kolárove bol 20. 9. prekročený 2. SPA.',
      'Between 12 and 15 Sep, 109–150 mm of rain fell. The Blatina at Pezinok reached a 10- to 20-year flow. Later the high Danube backed up the lower Váh: level 2 was exceeded at Kolárovo on 20 Sep.',
    ],
    src: ['shmu-ms'],
  },
  {
    name: ['Kysuce a Rajčanka', 'Kysuce and the Rajčanka'],
    rivers: 'Kysuca, Čierňanka, Rajčanka',
    text: [
      'Najrozsiahlejšia situácia bola v noci zo 14. na 15. 9. Kysuca v Turzovke a Čadci dosiahla 50-ročnú vodu, v Kysuckom Novom Meste 20-ročnú.',
      'The most widespread situation was on the night of 14–15 Sep. The Kysuca at Turzovka and Čadca reached a 50-year flow, at Kysucké Nové Mesto a 20-year flow.',
    ],
    src: ['shmu-vah'],
  },
]

export function Udalost() {
  const t = useT()
  const panoRef = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: panoRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-4%', '4%'])
  const [openArea, setOpenArea] = useState<number | null>(0)
  const pick = (v: string | string[]) => (Array.isArray(v) ? t(v[0], v[1]) : v)

  return (
    <Section id="udalost">
      <SectionHeader
        letter="A"
        index="01"
        kicker={t('Čo sa stalo?', 'What happened?')}
        title={t(<>Päť dní dažďa,<br /><span className="text-fog-400">dve povodňové vlny</span></>, <>Five days of rain,<br /><span className="text-fog-400">two flood waves</span></>)}
        lead={t(
          'Povodeň v septembri 2024 nevznikla na jednej rieke. Išlo o súbeh troch javov: extrémne zrážky na malých tokoch v podhorí, povodňová vlna Moravy z Česka a povodňová vlna Dunaja z Rakúska. Pri Devíne sa tieto vlny stretli.',
          'The September 2024 flood did not start on one river. Three things coincided: extreme rain on small foothill streams, a flood wave on the Morava from Czechia and a flood wave on the Danube from Austria. These waves met at Devín.',
        )}
      />

      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-7 prose-ed text-[17px]">
          <Reveal>
            <h3 className="font-display text-2xl font-bold text-fog-50 mb-4" style={{ fontStretch: '85%' }}>{t('Meteorologická príčina', 'Meteorological cause')}</h3>
            <p>
              {t(
                <>Dňa 12. 9. prešiel od severozápadu teplotne výrazný studený front. Nad severným Talianskom sa na ňom prehĺbila tlaková níž, ktorej stred sa <strong>od 13. do 15. 9. presúval z Jadranu do Karpatskej oblasti</strong>. Prízemná níž dostala meno <em className="font-serif text-[1.15em] text-fog-50">„Boris“</em>. Jej stred zodpovedal stredu níže vo vyšších hladinách, preto sa takmer nehýbala a dlho prinášala vlhký vzduch. Vysoké úhrny zrážok a rozsiahle povodne zasiahli západ Slovenska, Česko, Rakúsko, Poľsko a Rumunsko.</>,
                <>On 12 Sep a sharp cold front arrived from the north-west. A low-pressure system deepened on it over northern Italy, and its centre <strong>moved from the Adriatic to the Carpathians between 13 and 15 Sep</strong>. The surface low was named <em className="font-serif text-[1.15em] text-fog-50">“Boris”</em>. Its centre lined up with the low at higher altitudes, so it barely moved and kept bringing moist air. Heavy rain and widespread floods hit western Slovakia, Czechia, Austria, Poland and Romania.</>,
              )}
              <Cite ids={['shmu-ms']} />
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h3 className="font-display text-2xl font-bold text-fog-50 mb-4 mt-10" style={{ fontStretch: '85%' }}>{t('Hydrologický priebeh', 'How the rivers responded')}</h3>
            <p>
              {t('Situácia vznikla po suchom lete. Ešte 9. 9. bola hladina Dunaja v Devíne na úrovni 330-dňovej vody.', 'It followed a dry summer. On 9 Sep the Danube at Devín was still at a level exceeded on 330 days a year.')}
              <Cite ids={['shmu-ms']} />{' '}
              {t(
                <>V povodí rakúskej Traisen spadlo za september až 550 mm, teda šesťnásobok septembrového normálu. Rakúsky úsek Dunaja vytvoril <strong>dve kulminácie s odstupom necelých dvoch dní</strong>.</>,
                <>Up to 550 mm fell in September in the basin of the Austrian Traisen, six times the September normal. The Austrian Danube produced <strong>two peaks less than two days apart</strong>.</>,
              )}
              <Cite ids={['shmu-ms']} />
            </p>
            <p>
              {t(
                'Kulminácie Dunaja v Devíne a Bratislave výrazne ovplyvnil sútok s Moravou, a to výšku hladiny, tvar vlny aj dĺžku kulminácie. Vysoký Dunaj zároveň vzdul dolný úsek Moravy, Váhu a Ipľa. Preto Morava v Devínskej Novej Vsi kulminovala až 18. 9. na 839 cm, hoci jej prietok nebol mimoriadny.',
                'The Danube peaks at Devín and Bratislava were strongly shaped by the confluence with the Morava: the level, the shape of the wave and how long the peak lasted. The high Danube also backed up the lower Morava, Váh and Ipeľ. That is why the Morava at Devínska Nová Ves peaked only on 18 Sep at 839 cm, although its flow was not exceptional.',
              )}
              <Cite ids={['shmu-ms']} />{' '}
              {t('Pre krízové riadenie to znamenalo, že najhoršie miesta neboli tam, kde najviac pršalo, ale tam, kde sa vlny stretli.', 'For crisis management this meant that the worst places were not where most rain fell, but where the waves met.')}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-10 content-start">
          <Reveal><Stat value="386" unit="mm" label={t('zrážok v Perneku za 12.–16. 9.', 'of rain in Pernek, 12–16 Sep')} sub={t('najvyšší úhrn na slovenskom území', 'highest total in Slovakia')} src={['shmu-ms']} /></Reveal>
          <Reveal delay={0.05}><Stat value="216" unit="%" label={t('normálu zrážok za september na Slovensku', 'of normal September rainfall in Slovakia')} sub={t('136 mm; západné Slovensko 165 mm', '136 mm; western Slovakia 165 mm')} src={['shmu-rok']} tone="tide" /></Reveal>
          <Reveal delay={0.1}><Stat value="100" unit={t('-ročná', '-year')} label={t('voda na Maline v Jakubove', 'flow on the Malina at Jakubov')} sub={t('ovplyvnené pretrhnutím hrádze', 'influenced by a dike breach')} src={['shmu-ms']} tone="warn" /></Reveal>
          <Reveal delay={0.15}><Stat value={t('10 330', '10,330')} unit="ha" label={t('zaplavenej plochy podľa satelitu', 'flooded area seen by satellite')} sub={t('Copernicus EMS, oblasti Morava a Myjava', 'Copernicus EMS, Morava and Myjava areas')} src={['cems-757']} /></Reveal>
        </div>
      </div>

      {/* Panoráma */}
      <div ref={panoRef} className="relative mt-24 md:mt-32 -mx-4 sm:-mx-6 md:-mx-10 lg:-mx-16 overflow-hidden">
        <motion.img
          style={{ x, scale: 1.1 }}
          src="./photos/bsk-05.webp"
          alt={t('Panoráma rozvodneného Dunaja v centre Bratislavy so Starým mostom a zaplaveným nábrežím, 16.–17. 9. 2024', 'Panorama of the flooded Danube in central Bratislava with the Old Bridge and the flooded embankment, 16–17 Sep 2024')}
          className="w-full h-[42vh] md:h-[62vh] object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-ink-900/40" />
        <div className="absolute bottom-6 left-4 sm:left-6 md:left-10 lg:left-16 right-4">
          <p className="font-serif italic text-2xl md:text-4xl text-fog-50 max-w-3xl leading-tight">{t('„Vo všetkých slovenských profiloch na Dunaji boli prekročené 3. SPA.“', '“Flood activity level 3 was exceeded at all Slovak gauges on the Danube.”')}</p>
          <p className="mt-2 eyebrow">{t('SHMÚ, povodňová správa, september 2024', 'SHMÚ flood report, September 2024 (translated)')} <Cite ids={['shmu-ms']} /> · {t('Foto', 'Photo')}: BSK, CC BY 2.0</p>
        </div>
      </div>

      {/* Pred a po: rovnaké miesto, rovnaký autor */}
      <div className="mt-24 grid lg:grid-cols-12 gap-10 items-center">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">{t('Porovnanie', 'Comparison')}</p>
          <h3 className="mt-2 font-display text-3xl md:text-4xl font-extrabold uppercase text-fog-50 leading-[0.95]" style={{ fontStretch: '75%' }}>
            {t('Tyršovo nábrežie', 'Tyršovo embankment')}<br /><span className="text-fog-400">{t('počas povodne a dnes', 'during the flood and today')}</span>
          </h3>
          <p className="mt-4 text-fog-300 leading-relaxed">
            {t(
              'Ten istý pohľad zo Starého mosta na petržalskú stranu Dunaja: 17. 9. 2024 počas povodne a 7. 7. 2026 pri bežnej hladine. Ihriská, chodníky aj trávniky boli pod vodou, z vody trčali iba koruny stromov. Potiahnutím deliacej čiary porovnáte oba stavy.',
              'The same view from the Old Bridge to the Petržalka bank of the Danube: on 17 Sep 2024 during the flood and on 7 Jul 2026 at a normal level. The courts, paths and lawns were under water; only treetops stuck out. Drag the divider to compare.',
            )}
          </p>
          <p className="mt-4 text-xs text-fog-500">
            {t('Obe fotky', 'Both photos')}: Akkbula, Wikimedia Commons, CC BY-SA 4.0 <Cite ids={['foto-akkbula-2', 'foto-akkbula-2026']} />
          </p>
        </Reveal>
        <Reveal className="lg:col-span-8" delay={0.05}>
          <BeforeAfter
            before="./photos/compare-tyrsovo-2024.webp"
            after="./photos/compare-tyrsovo-2026.webp"
            beforeLabel={t('17. 9. 2024 · povodeň', '17 Sep 2024 · flood')}
            afterLabel={t('7. 7. 2026 · bežný stav', '7 Jul 2026 · normal')}
            alt={t('Tyršovo nábrežie v Bratislave počas povodne a pri bežnej hladine', 'Tyršovo embankment in Bratislava during the flood and at normal water level')}
          />
        </Reveal>
      </div>

      {/* Ohrozené oblasti + satelit */}
      <div className="mt-24 grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        <div className="lg:col-span-7">
          <Reveal>
            <h3 className="font-display text-3xl md:text-4xl font-extrabold uppercase text-fog-50" style={{ fontStretch: '75%' }}>{t('Zasiahnuté oblasti', 'Affected areas')}</h3>
            <p className="mt-3 text-fog-400 max-w-xl">{t('Kliknite na oblasť pre podrobnosti. Doby opakovania sú predbežné, podľa operatívnych údajov SHMÚ.', 'Click an area for details. Return periods are preliminary, based on SHMÚ operational data.')}</p>
          </Reveal>
          <ul className="mt-8 border-t border-line">
            {areas.map((a, i) => {
              const open = openArea === i
              return (
                <li key={a.name[0]} className="border-b border-line">
                  <button
                    className="w-full flex items-center gap-4 py-5 text-left group"
                    onClick={() => setOpenArea(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`area-${i}`}
                  >
                    <span className="font-mono text-xs text-volt w-6">0{i + 1}</span>
                    <span className="flex-1">
                      <span className="block text-lg md:text-xl text-fog-50 font-medium group-hover:text-volt-soft transition-colors">{pick(a.name)}</span>
                      <span className="block font-mono text-[11px] text-fog-500 mt-0.5">{pick(a.rivers)}</span>
                    </span>
                    <ChevronDown size={18} className={`text-fog-400 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  <motion.div
                    id={`area-${i}`}
                    initial={false}
                    animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pl-10 pr-4 text-fog-300 max-w-2xl">{pick(a.text)}<Cite ids={a.src} /></p>
                  </motion.div>
                </li>
              )
            })}
          </ul>
        </div>
        <Reveal className="lg:col-span-5" delay={0.1}>
          <figure className="panel overflow-hidden">
            <img src="./photos/nasa-landsat.webp" alt={t('Satelitná snímka Landsat z 21. 9. 2024 v nepravých farbách: zaplavená niva rieky Morava nad sútokom s Dunajom pri Bratislave zobrazená tmavomodrou', 'Landsat false-colour image of 21 Sep 2024: the flooded Morava floodplain above its confluence with the Danube near Bratislava, shown in dark blue')} className="w-full aspect-[720/750] object-cover" loading="lazy" />
            <figcaption className="p-5 text-sm text-fog-300">
              <span className="eyebrow block mb-2">{t('Satelit · 21. 9. 2024', 'Satellite · 21 Sep 2024')}</span>
              {t(
                'Snímka Landsat v nepravých farbách. Voda je tmavomodrá, vegetácia zelená. Široký tmavý pás vľavo je zaplavená niva Moravy nad sútokom s Dunajom, dole vpravo je Bratislava.',
                'Landsat false-colour image. Water is dark blue, vegetation green. The wide dark band on the left is the flooded Morava floodplain above its confluence with the Danube; Bratislava is at the bottom right.',
              )}
              <span className="block mt-2 text-xs text-fog-500">NASA Earth Observatory (M. Garrison), {t('dáta Landsat/USGS · voľné dielo', 'Landsat/USGS data · public domain')} <Cite ids={['foto-nasa']} /></span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}
