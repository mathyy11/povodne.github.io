// Porovnania a vývoj po povodni. Každá položka má zdroj; vlastné hodnotenia sú označené.

/* ---------- 2013 vs. 2024: Dunaj v Bratislave ---------- */
export const compare2013 = {
  y2013: { h: 1034, q: 10641, qProfile: 'Bratislava', src: 'svp-2013' },
  y2024: { h: 985, q: 9441, qProfile: 'Devín', when: '18. 9. 2024 13:30', src: 'shmu-ms' },
  protection: {
    text: 'Protipovodňová ochrana Bratislavy (2007–2010) za takmer 33 mil. €: 14,5 km podzemných tesniacich stien, 5,5 km protipovodňových múrov, viac ako 2,3 km zemných hrádzí, takmer 3 km mobilného hradenia a nová čerpacia stanica v Devínskej Novej Vsi.',
    src: 'svp-2013',
  },
}

/* ---------- Česko vs. Slovensko (september 2024) ----------
   ČR: predbežná správa MŽP ČR (2025). SR: zdroje uvedené pri riadkoch. */
export const czVsSk: { topic: string; cz: string; czSrc: string; sk: string; skSrc: string[] }[] = [
  {
    topic: 'Prvá výstraha pred extrémnymi zrážkami',
    cz: 'ČHMÚ vydal výstrahu pred extrémnymi zrážkami 11. 9. dopoludnia na celé štvordňové obdobie 12.–15. 9. Podľa správy umožnila včasnú aktiváciu povodňových orgánov.',
    czSrc: 'cz-mzp',
    sk: 'Prvé hydrologické výstrahy 3. stupňa vydal SHMÚ 13. 9. (Myjava od 12:00). Krízový štáb MV SR zasadal už 12. 9.',
    skSrc: ['shmu-ms', 'minv-1209'],
  },
  {
    topic: 'Vodné nádrže',
    cz: 'Pred povodňou uvoľnili v nádržiach bezprecedentný priestor. Transformácia povodňovej vlny dosiahla v niektorých prípadoch až 80 %.',
    czSrc: 'cz-mzp',
    sk: 'Podľa SHMÚ zadržanie vody v českých nádržiach Vranov, Znojmo a Nové Mlýny znížilo a predĺžilo povodňovú vlnu Dyje. Dyja sa vlieva do Moravy nad slovenským úsekom.',
    skSrc: ['shmu-ms'],
  },
  {
    topic: 'Krízový režim',
    cz: 'V Moravskosliezskom, Olomouckom a krátkodobo aj Libereckom kraji bol vyhlásený stav nebezpečenstva.',
    czSrc: 'cz-mzp',
    sk: 'Mimoriadna situácia platila v celom Bratislavskom kraji (od 15. 9.) a v jednotlivých obciach, napríklad v Chľabe.',
    skSrc: ['hruba-borsa', 'tasr-1709'],
  },
  {
    topic: 'Krízová komunikácia',
    cz: 'Štát komunikoval pod jednotným heslom #SpolecneToZvladneme. Správa však zároveň odporúča zjednotiť výstrahy do jedného kanála cez ČHMÚ.',
    czSrc: 'cz-mzp',
    sk: 'Denník N kritizoval rozdiely medzi verejnými vyjadreniami ministra a prognózami SHMÚ a označil koordináciu za miestami škrípajúcu.',
    skSrc: ['dn-poucenia'],
  },
  {
    topic: 'Varovanie do mobilov',
    cz: 'Správa odporúča zaviesť Cell Broadcast na včasné varovanie obyvateľov v ohrozenom území.',
    czSrc: 'cz-mzp',
    sk: 'SK-Alert (Cell Broadcast) nebol v roku 2024 spustený. Ostrá prevádzka sa podľa správ z 2026 stále len pripravuje.',
    skSrc: ['tasr-skalert', 'techbyte-skalert'],
  },
  {
    topic: 'Evakuácia',
    cz: 'Problémom bolo vykonanie a vymáhanie nariadenej evakuácie. Viacerí ľudia situáciu podcenili, čo zvýšilo riziko pre záchranárov.',
    czSrc: 'cz-mzp',
    sk: 'V použitých zdrojoch nie je doložená rozsiahla nariadená evakuácia. Doložená je výzva na prípravu (Stupava) a kyvadlová preprava armádou (Devínska Nová Ves).',
    skSrc: ['stvr-1509', 'tasr-droba'],
  },
  {
    topic: 'Fond solidarity EÚ',
    cz: '113 979 781 €',
    czSrc: 'rada-fseu',
    sk: '2 108 187 €',
    skSrc: ['rada-fseu'],
  },
]

/* ---------- Čo je nové do roku 2026 ---------- */
export type NewStatus = 'hotovo' | 'prebieha' | 'meska' | 'eu'
export const statusMeta: Record<NewStatus, { label: string; color: string }> = {
  hotovo: { label: 'Uskutočnené', color: 'var(--color-tide)' },
  prebieha: { label: 'Prebieha', color: 'var(--color-volt-soft)' },
  meska: { label: 'Mešká', color: 'var(--color-warn-2)' },
  eu: { label: 'Úroveň EÚ', color: '#c4a7ff' },
}

export const whatsNew: { date: string; title: string; text: string; status: NewStatus; src: string[]; link?: string }[] = [
  {
    date: '6. 2. 2025',
    title: 'Súdny dvor EÚ: Slovensko porušilo smernicu o povodniach',
    text: 'Súd konštatoval, že Slovensko včas (do 22. 12. 2021) neprehodnotilo a neaktualizovalo plány manažmentu povodňového rizika ani mapy rizika. Rozsudok je bez finančnej sankcie. Podľa ministra Slovensko povinnosti dohnalo začiatkom januára 2025.',
    status: 'hotovo',
    src: ['tasr-sdeu'],
  },
  {
    date: '26. 3. 2025',
    title: 'Stratégia EÚ pre pripravenosť: 72 hodín sebestačnosti',
    text: 'Európska komisia prijala stratégiu Únie pripravenosti. Okrem iného vyzýva obyvateľov, aby mali základné zásoby aspoň na 72 hodín, a navrhuje Deň pripravenosti EÚ a výučbu pripravenosti v školách.',
    status: 'eu',
    src: ['ek-preparedness'],
  },
  {
    date: '1. 5. 2025',
    title: 'Nová vyhláška o predpovednej povodňovej službe',
    text: 'Vyhláška č. 66/2025 Z. z. mení pravidlá mimoriadneho hydrologického spravodajstva SHMÚ (vyhláška č. 204/2010 Z. z.). Spravodajstvo sa začína hneď po prekročení I. SPA a vydáva sa v pevných časoch podľa stupňa: pri I. SPA o 6:00 a 18:00, pri II. SPA štyrikrát denne a pri III. SPA a mimoriadnej situácii každé tri hodiny. Ministerstvo zmenu navrhlo v septembri 2024 na základe praktických skúseností.',
    status: 'hotovo',
    src: ['v66', 'tasr-vyhlaska'],
  },
  {
    date: '21. 5. 2025',
    title: 'Refundácia nákladov za povodne 2024',
    text: 'Vláda schválila správu o povodniach v 2. polroku 2024 a viac ako 10,82 mil. € na refundáciu výdavkov obcí a štátu.',
    status: 'hotovo',
    src: ['tasr-vlada25'],
  },
  {
    date: '4. 6. 2025',
    title: 'Fond solidarity EÚ: 2,1 mil. € pre Slovensko',
    text: 'Európsky parlament a Rada rozhodli o mobilizácii Fondu solidarity. Slovensku pripadlo 2 108 187 € za septembrovú povodeň (žiadosť z 7. 12. 2024).',
    status: 'hotovo',
    src: ['rada-fseu'],
  },
  {
    date: 'jún 2026 (plán)',
    title: 'Revitalizácia povodia Moravy',
    text: 'Projekt SVP z Plánu obnovy na približne 17 km povodia Moravy (Sekule, Moravský Svätý Ján, Malé a Veľké Leváre, Gajary). Cieľom je obnova ramien a nivy a lepšia retencia vody. Ukončenie bolo plánované na jún 2026, jeho dokončenie sme v zdrojoch neoverili.',
    status: 'prebieha',
    src: ['ttsk-morava'],
  },
  {
    date: 'stav 9/2026',
    title: 'SK-Alert: varovanie do mobilov stále nie je v prevádzke',
    text: 'Systém na technológii Cell Broadcast (správa do všetkých telefónov v zasiahnutej oblasti bez potreby čísla či aplikácie) mal pôvodne fungovať od leta 2022. V septembri 2026 bol projekt v realizácii s 3,18 mil. € z Programu Slovensko (z toho asi 2,97 mil. € na samotný SK-Alert). Termín verejného testu ani ostrej prevádzky ešte nebol zverejnený.',
    status: 'meska',
    src: ['tasr-skalert', 'techbyte-skalert'],
  },
]
