// Kritická analýza. Blok `findings` obsahuje iba zdrojmi doložené zistenia.
// Blok `assessment` je vlastné hodnotenie autorov práce, nie oficiálny záver vyšetrovania.

export type Verdict = 'silne' | 'zmiesane' | 'slabe'

export interface AnalysisItem {
  id: string
  code: string
  title: string
  verdict: Verdict
  findings: { text: string; src: string[] }[]
  assessment: string
}

export const verdicts: Record<Verdict, { label: string; color: string }> = {
  silne: { label: 'Fungovalo', color: 'var(--color-tide)' },
  zmiesane: { label: 'Zmiešané', color: 'var(--color-warn-1)' },
  slabe: { label: 'Slabé miesto', color: 'var(--color-warn-2)' },
}

export const analysis: AnalysisItem[] = [
  {
    id: 'g1', code: 'H1', title: 'Pripravenosť verejnej správy', verdict: 'silne',
    findings: [
      { text: 'Krízový štáb MV SR zasadal 12. 9. Ústredná povodňová komisia 13. 9. pripravila 650 t piesku, mobilné hrádze a pohotovosť približne 320 až 800 vojakov. Bolo to 5 až 6 dní pred kulmináciou Dunaja v Bratislave.', src: ['minv-1209', 'tasr-upk'] },
      { text: 'MV SR aktivovalo satelitné mapovanie Copernicus EMS 13. 9., ešte pred kulmináciou malých tokov.', src: ['cems-757'] },
      { text: 'Protipovodňová ochrana Bratislavy na Dunaji podľa Denníka N fungovala, ako bola navrhnutá.', src: ['dn-poucenia'] },
    ],
    assessment: 'Na úrovni štátu sa začala príprava včas a v správnom poradí: prognóza, štáb, materiál a sily v pohotovosti. Pri veľkom toku s niekoľkodenným predstihom systém fungoval. Slabšia bola príprava pri malých tokoch v podhorí, kde je predstih rádovo v hodinách (pozri H4).',
  },
  {
    id: 'g2', code: 'H2', title: 'Dostupnosť a zrozumiteľnosť informácií', verdict: 'zmiesane',
    findings: [
      { text: 'SHMÚ zverejňoval vodné stavy a výstrahy online a vydával mimoriadne hydrologické spravodajstvá pre orgány ochrany pred povodňami.', src: ['shmu-ms'] },
      { text: 'Dňa 13. 9. hovoril minister životného prostredia po ÚPK pri Morave o „100-ročnej vode“ a pri Dunaji najviac s 2. SPA. Skutočnosť: Morava v Moravskom Svätom Jáne dosiahla 10-ročný prietok a Dunaj prekročil 3. SPA vo všetkých slovenských profiloch.', src: ['tasr-upk', 'shmu-ms'] },
      { text: 'Denník N uviedol, že verejné vyjadrenia ministra sa líšili od prognóz SHMÚ a že mimoriadne hydrologické spravodajstvá vytvárali veľké množstvo neprehľadných e-mailov.', src: ['dn-poucenia'] },
      { text: 'Už 12. 9. minister životného prostredia odhadoval, že Morava môže o pár dní dosiahnuť 1 400 m³/s a pri 1 500 m³/s sa vyleje. Skutočný kulminačný prietok v Moravskom Svätom Jáne bol 1 059 m³/s.', src: ['minv-1209', 'shmu-ms'] },
    ],
    assessment: 'Rozdiel medzi prognózou z 13. 9. a skutočným priebehom nie je chybou predpovede. Je to bežná neistota v čase niekoľkých dní pred kulmináciou. Problém vzniká vtedy, keď sa verejnosti podáva jediné číslo bez rozpätia a bez jasného autora. Odporúčame jeden autoritatívny hlas pre hydrologické údaje (SHMÚ) a komunikáciu prognózy ako rozpätia so scenármi.',
  },
  {
    id: 'g3', code: 'H3', title: 'Koordinácia organizácií', verdict: 'zmiesane',
    findings: [
      { text: 'Povodňové správy SHMÚ uvádzajú za deväť dní (13.–21. 9.) viac ako 70 vyhlásení SPA pre obce, mestá, okresy a kraj. Vyhlasovali ich starostovia, primátori aj prednostovia okresných úradov.', src: ['shmu-ms', 'shmu-vah'] },
      { text: 'Pri čerpacej stanici v Devínskej Novej Vsi sa podľa Denníka N starosta o poruche dozvedel od hasičov a minister zlyhanie spochybnil. Ide o sporné tvrdenie.', src: ['dn-poucenia'] },
      { text: 'Ozbrojené sily podľa TASR prevážali obyvateľov, zásobovali odrezané obce a pomáhali s protipovodňovými zábranami.', src: ['tasr-1709', 'tasr-droba'] },
    ],
    assessment: 'Decentralizovaný model, v ktorom SPA vyhlasuje starosta pre obec a prednosta pre okres, zodpovedá zákonu a umožňuje rýchlu reakciu. Pri povodni na rieke, ktorá preteká mnohými obcami, však vzniká veľa paralelných rozhodnutí. Chýbal spoločný verejný prehľad o tom, kde čo platí. Informácie o stave kritickej infraštruktúry, napríklad čerpacích staníc, majú prúdiť priamo k starostom, nie oklikou cez zásahové zložky.',
  },
  {
    id: 'g4', code: 'H4', title: 'Varovanie a ochrana obyvateľstva', verdict: 'slabe',
    findings: [
      { text: 'Na veľkých tokoch platila výstraha 3. stupňa niekoľko dní pred kulmináciou: Bratislava približne 89 h, Malacky (Záhorská Ves) približne 92 h.', src: ['shmu-ms'] },
      { text: 'Na malých malokarpatských tokoch bola výstraha 3. stupňa vydaná krátko pred kulmináciou alebo po nej. V Pezinku platila od 7:01, ale Blatina kulminovala o 6:00. V Trnave platila od 5:55 a Parná kulminovala o 8:15. Výstraha 2. stupňa platila v oboch okresoch od 14. 9. 6:00.', src: ['shmu-ms'] },
      { text: 'Celoštátny systém varovných správ do mobilov (SK-Alert) v septembri 2024 neexistoval. Jeho spustenie sa oneskorilo o približne dva roky.', src: ['tasr-skalert'] },
      { text: 'Obce využívali vlastné kanály. Čadca varovala cez Facebook už vo štvrtok 12. 9., no niektorí obyvatelia Stupavy podľa Denníka N nedostali vrecia s pieskom.', src: ['dn-poucenia'] },
    ],
    assessment: 'Toto je najvýraznejšie slabé miesto. Výstrahy SHMÚ na veľkých riekach dávali dostatočný predstih, no pri bleskových povodniach malých tokov už najvyšší stupeň výstrahy neprináša čas na reakciu. Rozhodujúci je 2. stupeň a to, ako ho obce prevedú na konkrétne kroky. Bez plošného mobilného varovania závisel dosah informácií od sirén, médií a sociálnych sietí jednotlivých obcí. (Výpočet predstihu: autori podľa tab. 4.5–4.7 a 3.3–3.8 povodňovej správy SHMÚ.)',
  },
  {
    id: 'g5', code: 'H5', title: 'Núdzové zabezpečenie', verdict: 'zmiesane',
    findings: [
      { text: 'Devín bol odrezaný a obyvatelia Devínskej Novej Vsi sa podľa predsedu BSK mohli dostať von len kyvadlovou dopravou armády.', src: ['tasr-droba'] },
      { text: 'Chľaba bola asi štyri dni bez cestného spojenia a armáda pomáhala so zásobovaním. V Chľabe a neďalekom Kováčove boli zariadenia sociálnych služieb s približne 270 klientmi.', src: ['tasr-1709'] },
      { text: 'Čadca pripravila športovú halu na prípadnú evakuáciu.', src: ['stvr-1509'] },
    ],
    assessment: 'Núdzové zabezpečenie sa podarilo zaistiť improvizovane, s výraznou pomocou armády. Opakuje sa však vzorec, že obce a mestské časti s jedinou prístupovou cestou zostanú pri povodni izolované. Do plánov ochrany obyvateľstva preto treba zahrnúť alternatívny prístup a zoznam zraniteľných osôb, napríklad klientov sociálnych zariadení.',
  },
  {
    id: 'g6', code: 'H6', title: 'Obnova a financovanie', verdict: 'slabe',
    findings: [
      { text: 'Vláda schválila správu o povodniach a refundáciu viac ako 10,82 mil. € až 21. 5. 2025, približne osem mesiacov po povodni.', src: ['tasr-vlada25'] },
      { text: 'Škody za 2. polrok 2024 presiahli 7,66 mil. €. Väčšinu tvoril majetok štátu (viac ako 4,32 mil. €) a obcí (viac ako 3,09 mil. €).', src: ['tasr-vlada25'] },
      { text: 'Premiér 20. 9. 2024 avizoval približne 1 mld. € z kohéznych fondov EÚ. Išlo o predbežné vyjadrenie.', src: ['vlada-2009'] },
    ],
    assessment: 'Dlhá doba medzi výdavkami obcí na záchranné práce a ich refundáciou zaťažuje najmä malé obce. Veľký rozdiel medzi avizovanými eurofondmi a vyčíslenými škodami ukazuje, že prostriedky treba prednostne viazať na prevenciu, napríklad na retenciu v povodí malých tokov, a nie iba na obnovu.',
  },
]

export interface RecGroup {
  id: string
  target: string
  items: { text: string; links: string[] }[]
}

export const recommendations: RecGroup[] = [
  {
    id: 'stat', target: 'Štátna správa',
    items: [
      { text: 'Bezodkladne dokončiť a pravidelne testovať SK-Alert (cell broadcast). Povodňové varovania doň zapojiť na úrovni okresov podľa výstrah SHMÚ.', links: ['g4'] },
      { text: 'Zaviesť jednotný verejný prehľad vyhlásených SPA a mimoriadnych situácií v reálnom čase, napríklad mapu na webe MV SR.', links: ['g3'] },
      { text: 'Skrátiť lehotu refundácie výdavkov obcí, napríklad zálohovou platbou do 60 dní po odvolaní SPA.', links: ['g6'] },
    ],
  },
  {
    id: 'samosprava', target: 'Samosprávy',
    items: [
      { text: 'Pri malých tokoch v podhorí naviazať konkrétne kroky obce (vrecia, uzávery, vyrozumenie zraniteľných osôb) už na výstrahu 2. stupňa.', links: ['g4'] },
      { text: 'Aktualizovať povodňové plány a plány ochrany obyvateľstva o alternatívne prístupové trasy a zoznam zraniteľných osôb a zariadení.', links: ['g5'] },
      { text: 'Vopred zverejniť miesta výdaja vriec s pieskom a evakuačné miesta a pravidelne ich pripomínať.', links: ['g4', 'g5'] },
    ],
  },
  {
    id: 'izs', target: 'Záchranné zložky',
    items: [
      { text: 'Vytvoriť priamy komunikačný kanál medzi správcom protipovodňovej infraštruktúry a starostom ohrozenej obce.', links: ['g3'] },
      { text: 'Vopred dohodnúť a precvičiť nasadenie OS SR na kyvadlovú dopravu a zásobovanie izolovaných lokalít.', links: ['g5'] },
    ],
  },
  {
    id: 'info', target: 'Informovanie obyvateľstva',
    items: [
      { text: 'Hydrologické prognózy komunikovať ako rozpätie so scenármi a s jasným autorom (SHMÚ), nie ako jedno číslo z politického brífingu.', links: ['g2'] },
      { text: 'Využívať obecné sociálne siete a rozhlas podľa jednotnej šablóny správy: čo sa deje, kde, čo robiť a kde získať pomoc.', links: ['g4'] },
    ],
  },
  {
    id: 'prevencia', target: 'Preventívne plánovanie',
    items: [
      { text: 'Prioritne financovať retenčné a vodozádržné opatrenia v povodiach malokarpatských a záhorských tokov, kde vznikli 20- až 100-ročné prietoky.', links: ['g4', 'g6'] },
      { text: 'Po každej povodni vypracovať verejné vyhodnotenie reakcie krízového riadenia. Vzorom môže byť predbežná správa MŽP ČR o septembrovej povodni 2024.', links: ['g2', 'g3'] },
    ],
  },
]
