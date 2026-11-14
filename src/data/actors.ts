// Aktéri krízového riadenia a ochrany pred povodňami.
// `legal` = všeobecné zákonné kompetencie (platí vždy), `documented` = činnosti doložené počas septembra 2024.

export type Tier = 'strategic' | 'expert' | 'regional' | 'local' | 'response'

export const tiers: Record<Tier, { label: string; hint: string }> = {
  strategic: { label: 'Strategická úroveň', hint: 'vláda a ústredné orgány' },
  expert: { label: 'Odborné a informačné zložky', hint: 'predpoveď, monitoring, vodné toky' },
  regional: { label: 'Krajská úroveň', hint: 'okresný úrad v sídle kraja, VÚC' },
  local: { label: 'Okresná a miestna úroveň', hint: 'okresné úrady, obce a mestá' },
  response: { label: 'Zásahové zložky', hint: 'IZS a podporné sily' },
}

export interface Actor {
  id: string
  tier: Tier
  name: string
  short: string
  role: string
  legal: { text: string; ref: string; src: string }[]
  documented: { text: string; src: string[] }[]
  links: string[]
}

export const actors: Actor[] = [
  {
    id: 'vlada', tier: 'strategic', name: 'Vláda Slovenskej republiky', short: 'Vláda SR',
    role: 'Najvyšší orgán výkonnej moci. Pri rozsiahlej udalosti koordinuje riešenie a zabezpečuje financovanie.',
    legal: [
      { text: 'Vyhlasuje a odvoláva mimoriadnu situáciu, ak rozsah ohrozeného alebo postihnutého územia presiahne územný obvod kraja.', ref: '§ 8 zákona č. 42/1994 Z. z.', src: 'z42' },
      { text: 'Riadi štát v krízových situáciách mimo času vojny a vojnového stavu; jej poradným orgánom je Bezpečnostná rada SR a ústredný krízový štáb.', ref: 'zákon č. 387/2002 Z. z.', src: 'z387' },
    ],
    documented: [
      { text: 'Mimoriadne rokovanie vlády k povodniam v pondelok 16. 9. 2024; avizovaná pomoc domácnostiam a obciam.', src: ['dn-poucenia'] },
      { text: 'Celoštátna mimoriadna situácia vyhlásená nebola. Podľa CMRS MV SR bolo v roku 2024 pre povodne vyhlásených 34 mimoriadnych situácií (máj až september), a to v okresoch Snina, Nitra, Poprad, Malacky, Skalica a v Bratislavskom kraji.', src: ['shmu-rok', 'hruba-borsa'] },
      { text: 'Dňa 21. 5. 2025 schválila správu o povodniach za 2. polrok 2024 a refundáciu viac ako 10,82 mil. €.', src: ['tasr-vlada25'] },
    ],
    links: ['minv', 'mzp'],
  },
  {
    id: 'mzp', tier: 'strategic', name: 'Ministerstvo životného prostredia SR a Ústredná povodňová komisia', short: 'MŽP SR / ÚPK',
    role: 'Ústredný orgán ochrany pred povodňami. Minister vedie Ústrednú povodňovú komisiu.',
    legal: [
      { text: 'Vyhlasuje a odvoláva II. a III. SPA na hraničných úsekoch tokov alebo pre územie presahujúce kraj, zabezpečuje činnosť Ústrednej povodňovej komisie a predpovednú povodňovú službu prostredníctvom SHMÚ.', ref: '§ 11 ods. 11 písm. d), § 23 zákona č. 7/2010 Z. z.', src: 'z7' },
      { text: 'Ústredná povodňová komisia zriaďuje technický štáb; jeho vedúcim je zástupca ministerstva a zástupcom prezident HaZZ.', ref: '§ 27 zákona č. 7/2010 Z. z.', src: 'z7' },
    ],
    documented: [
      { text: 'ÚPK zasadala 13. 9. 2024. Zadala úlohu nájsť miesta na kontrolované vypustenie Moravy; k dispozícii bolo 650 t piesku a mobilné hrádze.', src: ['tasr-upk'] },
      { text: 'Predložila vláde správu o priebehu a následkoch povodní v 2. polroku 2024.', src: ['tasr-vlada25'] },
    ],
    links: ['shmu', 'svp', 'vlada', 'hazz'],
  },
  {
    id: 'minv', tier: 'strategic', name: 'Ministerstvo vnútra SR – sekcia krízového riadenia', short: 'MV SR',
    role: 'Ústredný orgán civilnej ochrany obyvateľstva a integrovaného záchranného systému.',
    legal: [
      { text: 'Hlásnu povodňovú službu zabezpečuje aj MV SR spolu s okresnými úradmi a obcami s využitím informačného systému civilnej ochrany.', ref: '§ 15 ods. 2 zákona č. 7/2010 Z. z.', src: 'z7' },
      { text: 'Koordinuje preskúšavanie systémov varovania obyvateľstva.', ref: '§ 3a ods. 4 zákona č. 42/1994 Z. z.', src: 'z42' },
    ],
    documented: [
      { text: 'Krízový štáb 12. 9. 2024 s ministrami vnútra a ŽP, prezidentmi HaZZ a PZ; komunikácia so starostami, ZMOS a VÚC.', src: ['minv-1209'] },
      { text: 'Sekcia krízového riadenia 13. 9. aktivovala satelitné mapovanie Copernicus EMS (EMSR757).', src: ['cems-757'] },
      { text: 'Varovný systém SK-Alert bol v septembri 2024 len vo fáze prípravy obstarávania.', src: ['tasr-skalert'] },
    ],
    links: ['hazz', 'pz', 'ou-kraj', 'vlada'],
  },
  {
    id: 'shmu', tier: 'expert', name: 'Slovenský hydrometeorologický ústav', short: 'SHMÚ',
    role: 'Štátna hydrologická a meteorologická služba. Zabezpečuje predpovednú povodňovú službu.',
    legal: [
      { text: 'Vykonáva predpovednú povodňovú službu, vydáva hydrologické výstrahy a informuje orgány ochrany pred povodňami.', ref: '§ 14 zákona č. 7/2010 Z. z.; zákon č. 201/2009 Z. z.', src: 'z7' },
    ],
    documented: [
      { text: 'V septembri 2024 vydal v povodiach Dunaja, Moravy, Nitry a dolného Váhu 54 hydrologických výstrah (12 tretieho stupňa) a v povodí horného a stredného Váhu ďalších 21.', src: ['shmu-ms', 'shmu-vah'] },
      { text: 'Priebežne vydával mimoriadne hydrologické spravodajstvá pre orgány ochrany pred povodňami a zverejňoval vodné stavy online.', src: ['shmu-ms'] },
      { text: 'Denník N upozornil na rozdiely medzi verejnými vyjadreniami ministra a prognózami SHMÚ.', src: ['dn-poucenia'] },
    ],
    links: ['mzp', 'ou-kraj', 'obec'],
  },
  {
    id: 'svp', tier: 'expert', name: 'Slovenský vodohospodársky podnik, š. p.', short: 'SVP',
    role: 'Správca vodohospodársky významných vodných tokov a protipovodňových stavieb (hrádze, mobilné steny, čerpacie stanice).',
    legal: [
      { text: 'Organizuje a počas povodňovej situácie vykonáva hlásnu povodňovú službu, vykonáva zabezpečovacie práce podľa povodňových plánov, a od vyhlásenia II. SPA vykonáva nepretržitú službu.', ref: '§ 36 zákona č. 7/2010 Z. z.', src: 'z7' },
    ],
    documented: [
      { text: 'Generálny riaditeľ sa po zasadnutí ÚPK 13. 9. vyjadril k hľadaniu miest na kontrolované vypustenie Moravy (miesto vtedy ešte nebolo určené).', src: ['tasr-upk'] },
      { text: 'Čerpacia stanica v Devínskej Novej Vsi: Denník N informoval o poruche, minister zlyhanie spochybnil. Ide o sporné tvrdenie.', src: ['dn-poucenia'] },
    ],
    links: ['mzp', 'obec'],
  },
  {
    id: 'ou-kraj', tier: 'regional', name: 'Okresný úrad v sídle kraja', short: 'OÚ v sídle kraja',
    role: 'Orgán miestnej štátnej správy pre civilnú ochranu a krízové riadenie na území kraja.',
    legal: [
      { text: 'Vyhlasuje a odvoláva mimoriadnu situáciu na území kraja, ak rozsah presahuje obvod okresného úradu; riadi záchranné práce a plánuje evakuáciu, ak presahujú okres.', ref: '§ 13 zákona č. 42/1994 Z. z.', src: 'z42' },
      { text: 'Prednosta vyhlasuje II. a III. SPA na tokoch pretekajúcich viacerými okresmi kraja.', ref: '§ 11 ods. 11 písm. c) zákona č. 7/2010 Z. z.', src: 'z7' },
    ],
    documented: [
      { text: 'Prednosta OÚ Bratislava vyhlásil 15. 9. 2024 o 10:00 III. SPA pre všetky okresy Bratislavského kraja. V ten deň bola vyhlásená aj mimoriadna situácia v celom kraji.', src: ['shmu-ms', 'hruba-borsa', 'senec'] },
    ],
    links: ['ou', 'minv', 'vuc'],
  },
  {
    id: 'vuc', tier: 'regional', name: 'Samosprávny kraj (VÚC)', short: 'Samosprávny kraj',
    role: 'Regionálna samospráva. Spolupracuje pri ochrane obyvateľstva a zodpovedá za svoje zariadenia, napríklad sociálne služby a cesty II. a III. triedy.',
    legal: [
      { text: 'Plní úlohy civilnej ochrany v rozsahu pôsobnosti samosprávneho kraja.', ref: '§ 14a zákona č. 42/1994 Z. z.', src: 'z42' },
      { text: 'Vyšší územný celok má úlohy pri ochrane pred povodňami (napr. pri správe ciest a zariadení).', ref: '§ 32 zákona č. 7/2010 Z. z.', src: 'z7' },
    ],
    documented: [
      { text: 'Predseda BSK informoval 18. 9. po krízovom štábe o odrezanom Devíne a o presakujúcich mobilných hrádzach.', src: ['tasr-droba'] },
    ],
    links: ['ou-kraj', 'obec'],
  },
  {
    id: 'ou', tier: 'local', name: 'Okresný úrad', short: 'Okresný úrad',
    role: 'Riadi civilnú ochranu a záchranné práce v okrese a vedie okresnú povodňovú komisiu.',
    legal: [
      { text: 'Vyhlasuje a odvoláva mimoriadnu situáciu v územnom obvode, riadi informačný systém CO a záchranné práce; o vyhlásení informuje obce, PZ, HaZZ a OS SR.', ref: '§ 14 zákona č. 42/1994 Z. z.', src: 'z42' },
      { text: 'Prednosta vyhlasuje II. a III. SPA pre územie viacerých obcí alebo celý obvod; počas III. SPA môže zriadiť operačnú skupinu.', ref: '§ 11 ods. 11 písm. b), § 22 zákona č. 7/2010 Z. z.', src: 'z7' },
    ],
    documented: [
      { text: 'Prednostovia OÚ Skalica (4:00), Malacky (6:00) a Senica (6:00) vyhlásili 15. 9. 3. SPA pre celé okresy.', src: ['shmu-ms'] },
      { text: 'Prednosta OÚ Dunajská Streda vyhlásil 16. 9. 2. SPA pre obec Okoč.', src: ['shmu-ms'] },
    ],
    links: ['obec', 'ou-kraj', 'hazz'],
  },
  {
    id: 'obec', tier: 'local', name: 'Obec / mesto', short: 'Obce a mestá',
    role: 'Najbližšie k obyvateľovi. Varuje, organizuje evakuáciu, núdzové ubytovanie a zásobovanie, vedie povodňovú komisiu obce.',
    legal: [
      { text: 'Plánuje, vyhlasuje, riadi a zabezpečuje evakuáciu, poskytuje núdzové ubytovanie a zásobovanie; vyhlasuje mimoriadnu situáciu a ustanovuje režim života obyvateľstva.', ref: '§ 15 ods. 1 písm. g), j) zákona č. 42/1994 Z. z.', src: 'z42' },
      { text: 'Starosta vyhlasuje a odvoláva II. a III. SPA pre územie obce.', ref: '§ 11 ods. 11 písm. a) zákona č. 7/2010 Z. z.', src: 'z7' },
    ],
    documented: [
      { text: 'Podľa povodňových správ SHMÚ vyhlasovali 3. SPA desiatky obcí, napríklad Myjava a Senica 13. 9., Stupava o polnoci 15. 9., Komárno 20. 9. a Patince 21. 9.', src: ['shmu-ms', 'shmu-vah', 'stvr-1509'] },
      { text: 'Čadca pripravila na prípadnú evakuáciu športovú halu a Stupava vyzvala obyvateľov na prípravu evakuačnej batožiny.', src: ['stvr-1509'] },
      { text: 'Chľaba, odrezaná asi štyri dni od cestného spojenia, mala vyhlásenú mimoriadnu situáciu.', src: ['tasr-1709'] },
    ],
    links: ['ou', 'hazz', 'dhz', 'svp'],
  },
  {
    id: 'hazz', tier: 'response', name: 'Hasičský a záchranný zbor', short: 'HaZZ',
    role: 'Základná zložka IZS. Vykonáva záchranné práce, čerpanie vody a stavbu protipovodňových zábran.',
    legal: [
      { text: 'Vykonáva záchranné práce pri živelných pohromách a iných mimoriadnych udalostiach.', ref: 'zákon č. 315/2001 Z. z.; zákon č. 129/2002 Z. z.', src: 'z315' },
    ],
    documented: [
      { text: 'Od 16. 9. do 17. 9. ráno 153 zásahov, z toho 75 v Bratislavskom a 43 v Trnavskom kraji. Nasadených bolo 141 príslušníkov HaZZ.', src: ['tasr-1709'] },
      { text: 'Technika sa sústreďovala v Záchrannej brigáde HaZZ v Malackách.', src: ['minv-1209'] },
    ],
    links: ['dhz', 'obec', 'minv'],
  },
  {
    id: 'dhz', tier: 'response', name: 'Dobrovoľné hasičské zbory obcí', short: 'DHZ',
    role: 'Obecné hasičské jednotky, ktoré sú pri lokálnych povodniach často na mieste ako prvé.',
    legal: [
      { text: 'Môžu byť zaradené medzi ostatné záchranné zložky IZS.', ref: 'zákon č. 129/2002 Z. z.', src: 'z129' },
    ],
    documented: [
      { text: 'V rovnakom období (16.–17. 9.) zasahovalo 316 členov DHZ.', src: ['tasr-1709'] },
      { text: 'Podľa Denníka N bolo v nedeľu 15. 9. len v Trnavskom kraji nasadených 879 členov DHZ.', src: ['dn-poucenia'] },
    ],
    links: ['hazz', 'obec'],
  },
  {
    id: 'pz', tier: 'response', name: 'Policajný zbor', short: 'PZ',
    role: 'Verejný poriadok, riadenie dopravy, uzávery a ochrana evakuovaného majetku.',
    legal: [
      { text: 'Spolupracuje v rámci integrovaného záchranného systému pri riešení mimoriadnych udalostí.', ref: 'zákon č. 129/2002 Z. z.', src: 'z129' },
    ],
    documented: [
      { text: 'Policajti v Bratislavskom a Trnavskom kraji boli pripravení riadiť dopravu na zaplavených cestách a monitorovať objekty pri nútenej evakuácii.', src: ['tasr-upk'] },
      { text: 'Prezident PZ sa zúčastnil na krízovom štábe 12. 9.', src: ['minv-1209'] },
    ],
    links: ['minv', 'obec'],
  },
  {
    id: 'zzs', tier: 'response', name: 'Záchranná zdravotná služba', short: 'ZZS',
    role: 'Základná zložka IZS. Poskytuje prednemocničnú neodkladnú starostlivosť.',
    legal: [
      { text: 'Je základnou zložkou IZS, ktorú aktivuje koordinačné stredisko IZS.', ref: 'zákon č. 129/2002 Z. z.', src: 'z129' },
    ],
    documented: [],
    links: ['hazz'],
  },
  {
    id: 'ossr', tier: 'response', name: 'Ozbrojené sily SR', short: 'OS SR',
    role: 'Podporné sily. Poskytujú prepravu, logistiku a ľudí na posilnenie hrádzí, keď civilné kapacity nestačia.',
    legal: [
      { text: 'Okresný úrad informuje o vyhlásení mimoriadnej situácie aj ozbrojené sily; tie môžu byť použité pri záchranných prácach.', ref: '§ 14 ods. 4 zákona č. 42/1994 Z. z.', src: 'z42' },
    ],
    documented: [
      { text: 'Dňa 13. 9. bolo v pohotovosti približne 320 vojakov do 1 hodiny a viac ako 800 do 3 hodín.', src: ['tasr-upk'] },
      { text: 'Vojaci prevážali obyvateľov Devína a Devínskej Novej Vsi a zásobovali Chľabu a Kováčov. V Holíči pomáhalo 20 vojakov odstraňovať protipovodňové zábrany.', src: ['tasr-1709', 'tasr-droba'] },
    ],
    links: ['minv', 'obec'],
  },
]
