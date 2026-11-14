// Časová os udalosti. Uvádzajú sa iba dátumy a časy doložené v citovaných zdrojoch.
// Ak zdroj neuvádza presný čas, pole `time` chýba (nevymýšľa sa).

export type TLCat = 'hydro' | 'vystraha' | 'riadenie' | 'zasah' | 'obnova'

export const tlCats: Record<TLCat, { label: string; color: string }> = {
  hydro: { label: 'Hydrológia', color: 'var(--color-volt)' },
  vystraha: { label: 'Výstrahy a SPA', color: 'var(--color-warn-2)' },
  riadenie: { label: 'Krízové riadenie', color: 'var(--color-tide)' },
  zasah: { label: 'Zásahy a ochrana', color: '#c4a7ff' },
  obnova: { label: 'Obnova a financie', color: 'var(--color-fog-300)' },
}

export interface TLEvent {
  id: string
  date: string // ISO dátum
  time?: string // SEČ, ak je doložený
  cat: TLCat
  title: string
  text: string
  src: string[]
  photo?: { src: string; alt: string; credit: string }
  status?: 'nepotvrdene' | 'sporne'
}

export const timeline: TLEvent[] = [
  {
    id: 'e0909', date: '2024-09-09', time: '5:00', cat: 'hydro',
    title: 'Dunaj v Devíne na minime',
    text: 'Hladina Dunaja v Devíne klesla na 145 cm, čo zodpovedá 330-dňovej vode. Od tohto dňa začala stúpať. Východisková situácia bola teda suchá, nie povodňová.',
    src: ['shmu-ms'],
  },
  {
    id: 'e1009', date: '2024-09-10', cat: 'riadenie',
    title: 'Varovný systém SK-Alert ešte nefunguje',
    text: 'Ministerstvo vnútra oznámilo, že verejné obstarávanie varovného systému (pôvodne „Reverse 112“) chce spustiť do konca septembra 2024. Pôvodne mal fungovať od leta 2022. Počas povodne preto varovné SMS ani cell broadcast neboli k dispozícii.',
    src: ['tasr-skalert'],
  },
  {
    id: 'e1209a', date: '2024-09-12', cat: 'riadenie',
    title: 'Krízový štáb MV SR',
    text: 'Pre očakávané výdatné dažde zasadal krízový štáb za účasti ministrov vnútra a životného prostredia, prezidentov HaZZ a PZ a generálneho riaditeľa sekcie krízového riadenia MV SR. Techniku sústreďovali najmä v Záchrannej brigáde HaZZ v Malackách. Ozbrojené sily SR boli pripravené pomôcť. Štáb rozhodol, že sa ešte v ten deň vyhlási II. stupeň povodňovej aktivity a začne sa s osadzovaním hrádzí najmä v obciach pri Morave. O ďalších preventívnych opatreniach mal rozhodnúť ústredný povodňový štáb.',
    src: ['minv-1209'],
  },
  {
    id: 'e1209b', date: '2024-09-12', cat: 'hydro',
    title: 'Začiatok vzostupu na Morave a Dunaji',
    text: 'Na slovenskom úseku Moravy začal 12. 9. výrazný vzostup hladiny. Na Dunaji v Devíne stúpala hladina výrazne od popoludnia a o 24 hodín neskôr aj v Štúrove. Tlaková níž „Boris“ sa od 13. do 15. 9. presúvala z Jadranu do Karpatskej oblasti.',
    src: ['shmu-ms'],
  },
  {
    id: 'e1309a', date: '2024-09-13', cat: 'riadenie',
    title: 'Ústredná povodňová komisia',
    text: 'Komisia zasadala v Bratislave. Vodohospodári a hasiči dostali úlohu nájsť miesta na prípadné kontrolované vypustenie Moravy mimo obývaných území. K dispozícii bolo 650 t piesku a mobilné hrádze. Približne 320 vojakov bolo v pohotovosti do 1 hodiny a viac ako 800 do 3 hodín. Prognóza vtedy počítala s kulmináciou Moravy v pondelok na 639 cm a s Dunajom najviac na 2. SPA.',
    src: ['tasr-upk'],
  },
  {
    id: 'e1309b', date: '2024-09-13', cat: 'riadenie',
    title: 'Aktivácia Copernicus EMS (EMSR757)',
    text: 'Sekcia krízového riadenia MV SR požiadala o satelitné mapovanie záplav v rámci služby Copernicus EMS. Mapovali sa dve oblasti, Morava (AoI01) a Myjava (AoI02). Zaplavená plocha zistená v oboch oblastiach spolu bola 10 330 ha.',
    src: ['cems-757', 'cems-act'],
  },
  {
    id: 'e1309c', date: '2024-09-13', time: '12:00', cat: 'vystraha',
    title: 'Prvé hydrologické výstrahy 3. stupňa',
    text: 'SHMÚ vydal výstrahu 3. stupňa pre okres Myjava (od 12:00), Senica (od 18:00) a Skalica (od 20:00). Primátor Myjavy vyhlásil 3. SPA o 13:30, primátor Senice o 14:00.',
    src: ['shmu-ms'],
  },
  {
    id: 'e1409', date: '2024-09-14', time: '20:00', cat: 'vystraha',
    title: 'Výstraha 3. stupňa pre Bratislavu',
    text: 'Výstraha 3. stupňa platila pre okres Malacky od 10:00 a pre Bratislavu od 20:00, teda približne 3,5 dňa pred kulmináciou Dunaja v Bratislave. Pre okresy Pezinok, Trnava, Hlohovec a Piešťany platila od 6:00 výstraha 2. stupňa.',
    src: ['shmu-ms'],
  },
  {
    id: 'e1509a', date: '2024-09-15', cat: 'hydro',
    title: 'Vrchol zrážok: Pernek 159 mm za 24 h',
    text: 'Najvyšší denný úhrn zrážok namerali v Perneku (159 mm, úhrn k 10:00). Za obdobie 12.–16. 9. tam napršalo 386 mm. V ten deň kulminovali malokarpatské a záhorské toky (Chvojnica, Teplica, Stupávka, Blatina, Parná) a na Kysuciach Kysuca v Turzovke a Čadci, kde išlo o 50-ročnú vodu.',
    src: ['shmu-1509', 'shmu-ms', 'shmu-vah'],
  },
  {
    id: 'e1509b', date: '2024-09-15', time: '10:00', cat: 'riadenie',
    title: 'III. SPA a mimoriadna situácia v Bratislavskom kraji',
    text: 'Prednosta Okresného úradu Bratislava vyhlásil o 10:00 III. stupeň povodňovej aktivity pre všetky okresy Bratislavského kraja. Od 10:00 platila podľa oznamov obcí aj mimoriadna situácia v celom kraji. Prednostovia OÚ Skalica (4:00), Malacky (6:00) a Senica (6:00) vyhlásili 3. SPA pre svoje okresy.',
    src: ['shmu-ms', 'hruba-borsa', 'senec'],
  },
  {
    id: 'e1509c', date: '2024-09-15', cat: 'zasah',
    title: 'Stupava a Čadca: príprava na evakuáciu',
    text: 'Stupava vyhlásila 3. SPA o polnoci a vyzvala obyvateľov, aby si pripravili evakuačnú batožinu. Čadca vyhlásila najvyšší stupeň povodňovej aktivity a na prípadnú evakuáciu pripravila ubytovanie v športovej hale. Ohrozené boli aj mosty v meste. V Bratislave pre poškodené trolejové vedenie nepremávali električky.',
    src: ['stvr-1509'],
  },
  {
    id: 'e1609a', date: '2024-09-16', time: '4:45', cat: 'hydro',
    title: 'Malina v Jakubove: 100-ročný prietok',
    text: 'Na Maline v Jakubove dosiahol kulminačný prietok 24,96 m³/s, čo zodpovedá 100-ročnej vode. Podľa SHMÚ situáciu ovplyvnilo pretrhnutie hrádze toku.',
    src: ['shmu-ms'],
  },
  {
    id: 'e1609b', date: '2024-09-16', cat: 'riadenie',
    title: 'Mimoriadne rokovanie vlády',
    text: 'Vláda sa povodňami zaoberala na rokovaní v pondelok 16. 9. Rezort práce podľa Denníka N avizoval pomoc najviac 1 500 € na domácnosť a 15 000 € pre obec. Denník N zároveň kritizoval, že premiér bol cez víkend verejne takmer neviditeľný.',
    src: ['dn-poucenia'],
  },
  {
    id: 'e1609c', date: '2024-09-16', cat: 'zasah',
    title: 'Devínska Nová Ves: spor o čerpaciu stanicu',
    text: 'Denník N informoval o probléme s čerpacou stanicou a o oneskorenej inštalácii mobilných hrádzí v Devínskej Novej Vsi. Starosta sa vraj o poruche dozvedel od hasičov. Minister zlyhanie spochybnil. Tvrdenie je doložené jedným mediálnym zdrojom.',
    src: ['dn-poucenia'],
    status: 'sporne',
  },
  {
    id: 'e1709a', date: '2024-09-17', time: '10:45', cat: 'hydro',
    title: 'Prvá kulminácia Dunaja v Bratislave: 970 cm',
    text: 'Dunaj v Devíne kulminoval o 3:00 na 905 cm (9 305 m³/s, 20-ročná voda) a v Bratislave o 10:45 na 970 cm. Morava v Moravskom Svätom Jáne kulminovala o 15:30 (1 059 m³/s, 10-ročná voda). Podľa SHMÚ platili výstrahy 3. stupňa pre všetky okresy v povodí Moravy a Dunaja.',
    src: ['shmu-ms', 'shmu-1709'],
    photo: { src: './photos/hero-stary-most.webp', alt: 'Rozvodnený Dunaj pri Starom moste v Bratislave, v pozadí hrad a Most SNP, 17. 9. 2024', credit: 'Foto: Akkbula, CC BY-SA 4.0' },
  },
  {
    id: 'e1709b', date: '2024-09-17', cat: 'zasah',
    title: 'Armáda a hasiči v teréne',
    text: 'Za čas od pondelka do utorka ráno mali hasiči na Slovensku 153 výjazdov, z toho 75 v Bratislavskom a 43 v Trnavskom kraji. Nasadených bolo 141 príslušníkov HaZZ a 316 členov DHZ. Vojaci prevážali obyvateľov Devína a Devínskej Novej Vsi a zásobovali Chľabu a Kováčov. V Chľabe, ktorá bola asi štyri dni odrezaná od cestného spojenia, platila mimoriadna situácia.',
    src: ['tasr-1709'],
  },
  {
    id: 'e1809a', date: '2024-09-18', time: '13:30', cat: 'hydro',
    title: 'Maximum: Dunaj v Bratislave 985 cm',
    text: 'Druhá povodňová vlna z Rakúska sa spojila s vodou z Moravy. Devín kulminoval o 6:00 (913 cm, 9 441 m³/s), Bratislava o 13:30 na 985 cm, čo bolo maximum tejto povodne. Spätné vzdutie Dunaja zdvihlo hladinu Moravy v Devínskej Novej Vsi na 839 cm.',
    src: ['shmu-ms'],
    photo: { src: './photos/dunaj-18-06.webp', alt: 'Rozvodnený Dunaj pri Eurovei v Bratislave, 18. 9. 2024', credit: 'Foto: Patrik Kunec, CC BY-SA 4.0' },
  },
  {
    id: 'e1809b', date: '2024-09-18', cat: 'zasah',
    title: 'Devín odrezaný od sveta',
    text: 'Predseda BSK po zasadnutí krízového štábu uviedol, že Devín je stále odrezaný a obyvatelia Devínskej Novej Vsi sa môžu dostať von len kyvadlovou dopravou armády. Vyrážali spodné vody a zábrany presakovali. Prioritou bolo zabezpečiť plynulé zásobovanie.',
    src: ['tasr-droba'],
  },
  {
    id: 'e1909', date: '2024-09-19', time: '11:45', cat: 'hydro',
    title: 'Vlna postupuje: Medveďov',
    text: 'Pod vodným dielom Gabčíkovo kulminoval Dunaj v Medveďove na 932 cm s prietokom 9 272 m³/s. Išlo o 20- až 50-ročnú vodu, najvýznamnejšiu na slovenskom Dunaji.',
    src: ['shmu-ms'],
  },
  {
    id: 'e2009', date: '2024-09-20', cat: 'hydro',
    title: 'Kulminácia v Komárne a Štúrove, vzdutie Váhu',
    text: 'Dunaj kulminoval v Komárne o 4:15 (8 357 m³/s) a v Štúrove o 11:15 (8 493 m³/s). Vzdutá hladina Váhu prekročila v Kolárove 2. SPA. Primátor Komárna vyhlásil o 8:00 3. SPA.',
    src: ['shmu-ms'],
  },
  {
    id: 'e2009b', date: '2024-09-20', cat: 'obnova',
    title: 'Avizované eurofondy',
    text: 'Premiér po rokovaní vo Vroclave uviedol, že z 10 mld. € kohéznych fondov EÚ na povodne by Slovensku mohla pripadnúť približne 1 mld. €. Išlo o predbežné vyjadrenie, nie o rozhodnutie o alokácii.',
    src: ['vlada-2009'],
  },
  {
    id: 'e2509', date: '2024-09-25', time: '3:10', cat: 'vystraha',
    title: 'Koniec výstrah',
    text: 'Posledná hydrologická výstraha v povodí Moravy, 1. stupňa pre okres Malacky, skončila 25. 9. o 3:10. Celkovo SHMÚ v septembri vydal v povodí Dunaja, Moravy, Nitry a dolného Váhu 54 hydrologických výstrah a v povodí horného a stredného Váhu ďalších 21.',
    src: ['shmu-ms', 'shmu-vah'],
  },
  {
    id: 'e2105', date: '2025-05-21', cat: 'obnova',
    title: 'Vláda schválila správu o povodniach',
    text: 'Vláda schválila správu MŽP SR o priebehu a následkoch povodní za júl až december 2024. Škody presiahli 7,66 mil. € a na refundáciu výdavkov sa schválilo viac ako 10,82 mil. €. Od povodne uplynulo zhruba osem mesiacov.',
    src: ['tasr-vlada25'],
  },
  {
    id: 'e2705', date: '2025-05-27', cat: 'obnova',
    title: 'Návrh pomoci z Fondu solidarity EÚ',
    text: 'Európska komisia navrhla 280 mil. € z Fondu solidarity EÚ pre krajiny postihnuté povodňami v roku 2024 vrátane Slovenska.',
    src: ['ek-fseu'],
  },
]
