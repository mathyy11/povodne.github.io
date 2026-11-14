// Všeobecný odborný model ochrany obyvateľstva pri povodni.
// Nejde o opis konkrétneho postupu v konkrétnej obci. Doložené príklady zo septembra 2024 sú uvedené osobitne.

export interface Step {
  id: string
  n: number
  title: string
  short: string
  what: string
  who: string
  legal: { ref: string; src: string }[]
  example?: { text: string; src: string[] }
}

export const steps: Step[] = [
  {
    id: 'monitoring', n: 1, title: 'Monitorovanie', short: 'zrážky, vodné stavy, prognózy',
    what: 'Nepretržité sledovanie zrážok, vodných stavov a prietokov a hydrologické predpovede. Zahŕňa aj údaje zo zahraničných úsekov povodia, napríklad z Rakúska a Česka, odkiaľ prichádza voda na Dunaji a Morave.',
    who: 'SHMÚ (predpovedná povodňová služba), správcovia tokov (SVP), hliadková služba obcí.',
    legal: [{ ref: '§ 14 a § 16 zákona č. 7/2010 Z. z.', src: 'z7' }, { ref: 'zákon č. 201/2009 Z. z.', src: 'z201' }],
    example: { text: 'Hladinu Dunaja v Devíne sledoval SHMÚ od minima 145 cm (9. 9.). Zrážkové údaje vyhodnocoval aj z bavorskej a rakúskej časti povodia.', src: ['shmu-ms'] },
  },
  {
    id: 'riziko', n: 2, title: 'Vyhodnotenie rizika', short: 'výstrahy a stupne povodňovej aktivity',
    what: 'Porovnanie predpovede s vodnými stavmi stanovenými pre stupne povodňovej aktivity (SPA) a vydanie hydrologických výstrah pre okresy. III. SPA znamená najväčšie ohrozenie povodňou.',
    who: 'SHMÚ (výstrahy), povodňové komisie, starostovia a prednostovia OÚ (vyhlasovanie SPA).',
    legal: [{ ref: '§ 11 zákona č. 7/2010 Z. z.', src: 'z7' }],
    example: { text: 'SHMÚ vydal výstrahu 3. stupňa pre okres Bratislava 14. 9. o 20:00. Dunaj tam kulminoval 18. 9. o 13:30.', src: ['shmu-ms'] },
  },
  {
    id: 'varovanie', n: 3, title: 'Varovanie obyvateľstva', short: 'sirény, médiá, obecné kanály',
    what: 'Varovanie sa vykonáva signálom „OHROZENIE VODOU“ (šesťminútový stály tón sirén) a dopĺňa sa hovorenou informáciou v hromadných informačných prostriedkoch. Hlásna povodňová služba zároveň vyrozumie orgány, HaZZ a obce.',
    who: 'Obce, okresné úrady, MV SR (informačný systém CO), hlásna povodňová služba.',
    legal: [{ ref: '§ 3a zákona č. 42/1994 Z. z.', src: 'z42' }, { ref: '§ 15 zákona č. 7/2010 Z. z.', src: 'z7' }, { ref: 'vyhláška č. 388/2006 Z. z.', src: 'v388' }],
    example: { text: 'Čadca podľa Denníka N varovala obyvateľov cez Facebook už vo štvrtok 12. 9. Celoštátny systém SK-Alert ešte nebol spustený.', src: ['dn-poucenia', 'tasr-skalert'] },
  },
  {
    id: 'rozhodnutie', n: 4, title: 'Rozhodnutie o opatreniach', short: 'SPA, mimoriadna situácia, krízový štáb',
    what: 'Vyhlásenie II. alebo III. SPA a v prípade potreby mimoriadnej situácie. Tá umožňuje použiť sily a prostriedky z celého územia, nariadiť evakuáciu a zabezpečiť núdzové zásobovanie a ubytovanie.',
    who: 'Starosta, prednosta OÚ, prednosta OÚ v sídle kraja, vláda (nad úrovňou kraja).',
    legal: [{ ref: '§ 3b, § 8, § 13–15 zákona č. 42/1994 Z. z.', src: 'z42' }, { ref: '§ 11 ods. 11 zákona č. 7/2010 Z. z.', src: 'z7' }],
    example: { text: 'Dňa 15. 9. o 10:00 bol vyhlásený III. SPA pre všetky okresy Bratislavského kraja a v ten deň aj mimoriadna situácia v celom kraji.', src: ['shmu-ms', 'hruba-borsa'] },
  },
  {
    id: 'evakuacia', n: 5, title: 'Evakuácia a iné ochranné opatrenia', short: 'odsun, zábrany, uzávery',
    what: 'Evakuácia je odsun ohrozených osôb, zvierat a vecí z určitého územia. Môže byť krátkodobá (návrat do 72 hodín) alebo dlhodobá. Vyhlasuje sa cez hromadné informačné prostriedky. Súbežne sa vykonávajú povodňové zabezpečovacie a záchranné práce, napríklad stavba zábran, čerpanie a uzávery ciest.',
    who: 'Obec (evakuácia na svojom území), OÚ a OÚ v sídle kraja (ak presahuje obec alebo okres), HaZZ, PZ, OS SR.',
    legal: [{ ref: '§ 3 ods. 10 a § 15 zákona č. 42/1994 Z. z.', src: 'z42' }, { ref: 'vyhláška č. 328/2012 Z. z.', src: 'v328' }, { ref: '§ 17–18 zákona č. 7/2010 Z. z.', src: 'z7' }],
    example: { text: 'Stupava vyzvala obyvateľov na prípravu evakuačnej batožiny a Čadca pripravila športovú halu. V použitých zdrojoch nie je doložené, či a v akom rozsahu sa v týchto mestách evakuácia uskutočnila.', src: ['stvr-1509'] },
  },
  {
    id: 'nudzove', n: 6, title: 'Núdzové zabezpečenie', short: 'ubytovanie, voda, strava, prístup',
    what: 'Núdzové ubytovanie znamená dočasné bývanie ohrozených osôb. Núdzové zásobovanie zahŕňa minimálne stravovanie, pitnú vodu a základné potreby vrátane elektriny, tepla a zdravotníckeho zabezpečenia.',
    who: 'Obec, okresný úrad, OS SR a humanitárne organizácie.',
    legal: [{ ref: '§ 3 ods. 7 a 8 zákona č. 42/1994 Z. z.', src: 'z42' }],
    example: { text: 'Armáda zásobovala Chľabu, ktorá bola asi štyri dni odrezaná. V Chľabe a neďalekom Kováčove boli zariadenia sociálnych služieb s približne 270 klientmi. Devín bol odrezaný a plynulé zásobovanie bolo podľa predsedu BSK prioritou.', src: ['tasr-1709', 'tasr-droba'] },
  },
  {
    id: 'obnova', n: 7, title: 'Návrat a obnova', short: 'odvolanie, škody, refundácie',
    what: 'Po odznení ohrozenia sa mimoriadna situácia bezodkladne odvolá. Nasleduje signál „KONIEC OHROZENIA“, súpis povodňových škôd, vyhodnotenie povodne a refundácia nákladov na zabezpečovacie a záchranné práce.',
    who: 'Orgány, ktoré situáciu vyhlásili, povodňové komisie, MŽP SR a vláda.',
    legal: [{ ref: '§ 3a ods. 2, § 3b ods. 3 zákona č. 42/1994 Z. z.', src: 'z42' }, { ref: '§ 19 zákona č. 7/2010 Z. z.', src: 'z7' }],
    example: { text: 'Vláda schválila správu o povodniach a refundáciu viac ako 10,82 mil. € dňa 21. 5. 2025, približne osem mesiacov po povodni.', src: ['tasr-vlada25'] },
  },
]

// Varovné signály podľa § 3a zákona č. 42/1994 Z. z.
export const sirenSignals = [
  { name: 'VŠEOBECNÉ OHROZENIE', pattern: 'wave', duration: '2 min', desc: 'kolísavý tón sirén pri ohrození alebo vzniku mimoriadnej udalosti' },
  { name: 'OHROZENIE VODOU', pattern: 'flat', duration: '6 min', desc: 'stály tón sirén pri ohrození ničivými účinkami vody' },
  { name: 'KONIEC OHROZENIA', pattern: 'flat', duration: '2 min', desc: 'stály tón sirén bez opakovania' },
] as const
