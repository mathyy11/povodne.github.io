// Zoznam zdrojov. Každý zdroj bol pri tvorbe webu otvorený a overený (znovu overené 14. 11. 2026).
// Citačný formát sa generuje z týchto polí — štýl sa dá zmeniť v src/data/citation.ts.

export type SourceCategory =
  | 'pravo'
  | 'oficialne'
  | 'hydro'
  | 'odborne'
  | 'samosprava'
  | 'media'
  | 'foto'

export interface Source {
  id: string
  cat: SourceCategory
  author: string // inštitúcia alebo autor (pre ISO 690 sa píše veľkými písmenami)
  title: string
  container?: string // vydavateľ / periodikum / portál
  date?: string // ISO dátum alebo rok
  url: string
  medium?: 'online' | 'PDF' | 'obrázok' | 'mapa'
  titleEn?: string // len pre popisy vytvorené autormi (pôvodné názvy dokumentov sa neprekladajú)
  note?: string
}

export const ACCESSED = '2026-11-14'

export const categoryLabels: Record<SourceCategory, string> = {
  pravo: 'Právne predpisy',
  oficialne: 'Oficiálne správy a dokumenty štátu',
  hydro: 'Hydrologické a meteorologické údaje',
  odborne: 'Odborné a porovnávacie zdroje',
  samosprava: 'Dokumenty samospráv',
  media: 'Spravodajské zdroje (sekundárne)',
  foto: 'Fotografie a mapové podklady',
}

export const sources: Source[] = [
  // --- Právne predpisy (Slov-Lex) ---
  { id: 'z42', cat: 'pravo', author: 'Slovenská republika', title: 'Zákon Národnej rady Slovenskej republiky č. 42/1994 Z. z. o civilnej ochrane obyvateľstva v znení neskorších predpisov', container: 'Slov-Lex', date: '1994', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/1994/42/' },
  { id: 'z7', cat: 'pravo', author: 'Slovenská republika', title: 'Zákon č. 7/2010 Z. z. o ochrane pred povodňami v znení neskorších predpisov', container: 'Slov-Lex', date: '2010', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2010/7/' },
  { id: 'z387', cat: 'pravo', author: 'Slovenská republika', title: 'Zákon č. 387/2002 Z. z. o riadení štátu v krízových situáciách mimo času vojny a vojnového stavu v znení neskorších predpisov', container: 'Slov-Lex', date: '2002', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2002/387/' },
  { id: 'z129', cat: 'pravo', author: 'Slovenská republika', title: 'Zákon č. 129/2002 Z. z. o integrovanom záchrannom systéme v znení neskorších predpisov', container: 'Slov-Lex', date: '2002', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2002/129/' },
  { id: 'z201', cat: 'pravo', author: 'Slovenská republika', title: 'Zákon č. 201/2009 Z. z. o štátnej hydrologickej službe a štátnej meteorologickej službe v znení neskorších predpisov', container: 'Slov-Lex', date: '2009', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2009/201/' },
  { id: 'z180', cat: 'pravo', author: 'Slovenská republika', title: 'Zákon č. 180/2013 Z. z. o organizácii miestnej štátnej správy a o zmene a doplnení niektorých zákonov', container: 'Slov-Lex', date: '2013', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2013/180/' },
  { id: 'z315', cat: 'pravo', author: 'Slovenská republika', title: 'Zákon č. 315/2001 Z. z. o Hasičskom a záchrannom zbore v znení neskorších predpisov', container: 'Slov-Lex', date: '2001', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2001/315/' },
  { id: 'v328', cat: 'pravo', author: 'Ministerstvo vnútra SR', title: 'Vyhláška MV SR č. 328/2012 Z. z., ktorou sa ustanovujú podrobnosti o evakuácii', container: 'Slov-Lex', date: '2012', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2012/328/' },
  { id: 'v388', cat: 'pravo', author: 'Ministerstvo vnútra SR', title: 'Vyhláška MV SR č. 388/2006 Z. z. o podrobnostiach na zabezpečovanie technických a prevádzkových podmienok informačného systému civilnej ochrany', container: 'Slov-Lex', date: '2006', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2006/388/' },
  { id: 'v261', cat: 'pravo', author: 'Ministerstvo životného prostredia SR', title: 'Vyhláška MŽP SR č. 261/2010 Z. z., ktorou sa ustanovujú podrobnosti o obsahu povodňových plánov a postup ich schvaľovania', container: 'Slov-Lex', date: '2010', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2010/261/' },

  { id: 'v66', cat: 'pravo', author: 'Ministerstvo životného prostredia SR', title: 'Vyhláška MŽP SR č. 66/2025 Z. z., ktorou sa mení a dopĺňa vyhláška č. 204/2010 Z. z., ktorou sa ustanovujú podrobnosti o vykonávaní predpovednej povodňovej služby', container: 'Slov-Lex', date: '2025-04-04', url: 'https://www.slov-lex.sk/pravne-predpisy/SK/ZZ/2025/66/', note: 'Účinnosť od 1. 5. 2025.' },

  // --- Hydrologické a meteorologické údaje (SHMÚ) ---
  { id: 'shmu-ms', cat: 'hydro', author: 'Slovenský hydrometeorologický ústav', title: 'Povodňová správa: Toky v povodí Moravy, Dunaja, dolného Váhu a Nitry v septembri 2024', container: 'SHMÚ, odbor Hydrologické predpovede a výstrahy', date: '2024', medium: 'PDF', url: 'https://www.shmu.sk/File/ExtraFiles/povodnove_spravy/1738760143_2024-09_Toky_v_povodi_Moravy_Dunaja_dolneho_Vahu_a_Nitry_v_septembri_2024.pdf', note: 'Operatívne údaje, neprešli úplnou revíziou (podľa tiráže správy).' },
  { id: 'shmu-vah', cat: 'hydro', author: 'Slovenský hydrometeorologický ústav', title: 'Povodňová správa: Toky v povodí horného a stredného Váhu v septembri 2024', container: 'SHMÚ, OHMPaV Žilina', date: '2024', medium: 'PDF', url: 'https://www.shmu.sk/File/ExtraFiles/povodnove_spravy/1733483432_2024-08_Toky_v_povodi_horneho_a_stredneho_Vahu_v_septembri_2024.pdf' },
  { id: 'shmu-rok', cat: 'hydro', author: 'Slovenský hydrometeorologický ústav', title: 'Povodňová správa Slovenská republika 2024', container: 'SHMÚ', date: '2025', medium: 'PDF', url: 'https://www.shmu.sk/File/ExtraFiles/povodnove_spravy/1741611510_2025-1_Povodnova_sprava_2024.pdf' },
  { id: 'shmu-1509', cat: 'hydro', author: 'Slovenský hydrometeorologický ústav', title: 'Hydrologická situácia 15.9.2024 a predpokladaný vývoj', container: 'Aktuality SHMÚ', date: '2024-09-15', url: 'https://www.shmu.sk/sk/?page=2049&id=1531' },
  { id: 'shmu-1709', cat: 'hydro', author: 'Slovenský hydrometeorologický ústav', title: 'Hydrologická situácia 17.9.2024 a predpokladaný vývoj', container: 'Aktuality SHMÚ', date: '2024-09-17', url: 'https://www.shmu.sk/sk/?page=2049&id=1533' },
  { id: 'shmu-sep', cat: 'hydro', author: 'Slovenský hydrometeorologický ústav', title: 'Hodnotenie hydrologickej situácie v mesiaci september 2024', container: 'Aktuality SHMÚ', date: '2024-10', url: 'https://www.shmu.sk/sk/?page=2049&id=1546' },

  { id: 'cems-monit02', cat: 'hydro', author: 'Copernicus Emergency Management Service', title: 'EMSR757 AOI01 Morava – Delineation Monit02 (COSMO-SkyMed, 18. 9. 2024 16:30 UTC), vektorové vrstvy observedEvent a maximumFloodExtent', titleEn: 'EMSR757 AOI01 Morava – Delineation Monit02 (COSMO-SkyMed, 18 Sep 2024 16:30 UTC), vector layers observedEvent and maximumFloodExtent', container: 'Copernicus EMS Rapid Mapping', date: '2024-09-19', medium: 'mapa', url: 'https://rapidmapping.emergency.copernicus.eu/EMSR757/', note: 'Polygóny boli pre web zjednodušené (tolerancia ~25–50 m); rozlohy sú prevzaté z produktu, nie prepočítané.' },
  { id: 'svp-2013', cat: 'hydro', author: 'Slovenský vodohospodársky podnik, š. p.', title: 'Spomienka na povodeň z roku 2013 (tlačová správa)', container: 'svp.sk', date: '2018-06-06', medium: 'PDF', url: 'https://www.svp.sk/wp-content/uploads/2013/04/TS_2018_06_06_Spomienka-na-povode%C5%88_2013.pdf' },

  // --- Oficiálne dokumenty ---
  { id: 'minv-1209', cat: 'oficialne', author: 'Ministerstvo vnútra SR', title: 'Z dôvodu očakávaných výdatných dažďov zasadal krízový štáb za účasti ministrov vnútra a životného prostredia', container: 'minv.sk – tlačové správy', date: '2024-09-12', url: 'https://www.minv.sk/?tlacove-spravy&sprava=z-dovodu-ocakavanych-vydatnych-dazdov-zasadal-krizovy-stab-za-ucasti-ministrov-vnutra-a-zivotneho-prostredia' },
  { id: 'vlada-2009', cat: 'oficialne', author: 'Úrad vlády SR', title: 'Premiér: Z 10 mld. eur fondov EÚ na povodne pre SR pripadne jedna miliarda eur', container: 'vlada.gov.sk – tlačové správy', date: '2024-09-20', url: 'https://www.vlada.gov.sk/tlacove-spravy/premier-z-10-mld-eur-fondov-eu-na-povodne-pre-sr-pripadne-jedna-miliarda-eur/' },
  { id: 'ek-fseu', cat: 'oficialne', author: 'Zastúpenie Európskej komisie na Slovensku', title: '280 miliónov eur z Fondu solidarity EÚ na popovodňovú pomoc Rakúsku, Česku, Poľsku, Slovensku, Bosne a Hercegovine', container: 'Európska komisia', date: '2025-05-27', url: 'https://slovakia.representation.ec.europa.eu/news/280-milionov-eur-z-fondu-solidarity-eu-na-popovodnovu-pomoc-rakusku-cesku-polsku-slovensku-bosne-2025-05-27_sk' },
  { id: 'cems-757', cat: 'oficialne', author: 'Copernicus Emergency Management Service', title: 'Information Bulletin 173 – The Copernicus Emergency Management Service monitors floods in Central and Eastern Europe', container: 'European Commission, JRC', date: '2024-09-25', url: 'https://mapping.emergency.copernicus.eu/news/information-bulletin-173-the-copernicus-emergency-management-service-monitors-floods-in-central-and-eastern-europe/' },
  { id: 'cems-act', cat: 'oficialne', author: 'Copernicus Emergency Management Service', title: 'EMSR757 – Flood in March, Morava Basins, Slovakia (Rapid Mapping)', container: 'Copernicus EMS', date: '2024-09-13', medium: 'mapa', url: 'https://mapping.emergency.copernicus.eu/activations/EMSR757' },

  { id: 'ek-preparedness', cat: 'oficialne', author: 'Európska komisia', title: 'EU Preparedness Union Strategy to prevent and react to emerging threats and crises (tlačová správa IP/25/856)', titleEn: 'EU Preparedness Union Strategy to prevent and react to emerging threats and crises (press release IP/25/856)', container: 'Press corner', date: '2025-03-26', url: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_25_856' },
  { id: 'rada-fseu', cat: 'oficialne', author: 'Rada Európskej únie', title: 'Rozhodnutie Európskeho parlamentu a Rady o mobilizácii Fondu solidarity EÚ … v súvislosti s povodňami v septembri 2024 (dok. 9604/25)', container: 'data.consilium.europa.eu', date: '2025-06-04', medium: 'PDF', url: 'https://data.consilium.europa.eu/doc/document/ST-9604-2025-INIT/sk/pdf' },

  // --- Odborné / porovnávacie ---
  { id: 'cz-mzp', cat: 'odborne', author: 'Ministerstvo životního prostředí ČR', title: 'Vyhodnocení povodně v září 2024 – Předběžná zpráva', container: 'MŽP ČR', date: '2025', medium: 'PDF', url: 'https://mzp.gov.cz/system/files/2025-04/P%C5%99edb%C4%9B%C5%BEn%C3%A1%20zpr%C3%A1va%20Vyhodnocen%C3%AD%20povodn%C4%9B%20v%20z%C3%A1%C5%99%C3%AD%202024_0.pdf', note: 'Porovnávací zdroj zo susednej krajiny; netýka sa priamo územia SR.' },

  { id: 'ttsk-morava', cat: 'samosprava', author: 'Trnavský samosprávny kraj', title: 'Práca namiesto dávok pokračuje na Záhorí revitalizáciou povodia Moravy', container: 'ttkraj.sk', date: '2025-04-16', url: 'https://ttkraj.sk/praca-namiesto-davok-pokracuje-na-zahori-revitalizaciou-povodia-moravy/' },

  // --- Dokumenty samospráv ---
  { id: 'hruba-borsa', cat: 'samosprava', author: 'Obec Hrubá Borša', title: 'Vyhlásenie mimoriadnej situácie v celom Bratislavskom kraji', container: 'hrubaborsa.eu', date: '2024-09-15', url: 'https://www.hrubaborsa.eu/novinka/93381/vyhlasenie-mimoriadnej-situacie-v-celom-bratislavskom-kraji', note: 'Oznam obce s prílohami „Vyhlásenie III. SPA BA kraj“ a „Príkaz na vyhlásenie MS BA kraj 15.09.2024“.' },
  { id: 'senec', cat: 'samosprava', author: 'Mesto Senec', title: 'Okresný úrad Bratislava vyhlásil III. stupeň povodňovej aktivity', container: 'senec.sk', date: '2024-09-16', url: 'https://www.senec.sk/aktuality/2024/okresny-urad-bratislava-vyhlasil-iii-stupen-povodnovej-aktivity/' },

  // --- Spravodajské zdroje ---
  { id: 'tasr-upk', cat: 'media', author: 'TASR', title: 'VIDEO: V prípade zhoršenej situácie zvážia vypustenie rieky Morava', container: 'TERAZ.sk', date: '2024-09-13', url: 'https://www.teraz.sk/slovensko/briefv-pripade-zhorsenej-situacie-na/822051-clanok.html' },
  { id: 'tasr-1709', cat: 'media', author: 'TASR', title: 'SLEDUJEME: SR sa zotavuje z povodní, na západe naďalej platia výstrahy', container: 'TERAZ.sk', date: '2024-09-17', url: 'https://www.teraz.sk/slovensko/na-zapade-slovenska-nadalej-platia-vy/822771-clanok.html' },
  { id: 'tasr-droba', cat: 'media', author: 'TASR', title: 'J. Droba: Situácia v Devíne a Devínskej N. Vsi sa zatiaľ nezlepšuje', container: 'TERAZ.sk', date: '2024-09-18', url: 'https://www.teraz.sk/bratislavsky-kraj/j-droba-situacia-v-devine-a-devinsk/823193-clanok.html' },
  { id: 'tasr-skalert', cat: 'media', author: 'TASR', title: 'Obstarávanie varovného systému chce rezort spustiť do konca septembra', container: 'TERAZ.sk', date: '2024-09-10', url: 'https://www.teraz.sk/slovensko/mv-planuje-spustit-verejne-obstarava/821284-clanok.html' },
  { id: 'tasr-vlada25', cat: 'media', author: 'TASR', title: 'Vláda rieši následky povodní: Rozdelí 10 miliónov eur na náhrady', container: 'noviny.sk', date: '2025-05-21', url: 'https://www.noviny.sk/slovensko/1063049-vlada-riesi-nasledky-povodni-rozdeli-10-milionov-eur-na-nahrady' },
  { id: 'dn-poucenia', cat: 'media', author: 'GREČKO, Tomáš – ČOREJ, Tomáš – ZDÚT, Matúš', title: 'Desať poučení z povodní: vieme si pomáhať, ohrozené sú obce pod kopcami, koordinácia miestami škrípe', container: 'Denník N / Denník E', date: '2024-09-16', url: 'https://e.dennikn.sk/4198003/desat-pouceni-z-povodni-vieme-si-pomahat-ohrozene-su-obce-pod-kopcami-koordinacia-miestami-skripe/', note: 'Obsah za plateným prístupom.' },
  { id: 'stvr-1509', cat: 'media', author: 'STVR', title: 'Obyvatelia Stupavy sa majú pripraviť na evakuáciu. V Čadci sú ohrozené mosty', container: 'Správy STVR', date: '2024-09-15', url: 'https://spravy.stvr.sk/2024/09/spravy-po-minute-obyvatelia-stupavy-sa-maju-pripravit-na-evakuaciu-v-cadci-su-ohrozene-mosty/' },

  { id: 'tasr-vyhlaska', cat: 'media', author: 'TASR', title: 'Predpovedanie povodní, ktoré vykonáva SHMÚ, sa má upraviť', container: 'TERAZ.sk', date: '2024-09-25', url: 'https://www.teraz.sk/slovensko/predpovedanie-povodni-ktore-vykonava/824969-clanok.html' },
  { id: 'tasr-sdeu', cat: 'media', author: 'TASR', title: 'Envi Ministry: EU Court of Justice Confirms Failure of Previous Managements', container: 'TASR NewsNow', date: '2025-02-06', url: 'https://newsnow.tasr.sk/envi-ministry-eu-court-of-justice-confirms-failure-of-previous-managements/' },
  { id: 'techbyte-skalert', cat: 'media', author: 'ZACHAR, Lukáš', title: 'Štát chcel ľuďom posielať správy už v roku 2024. Takéto SMS-ky chce testovať koncom roka', container: 'TECHBYTE.sk', date: '2026-09-25', url: 'https://www.techbyte.sk/2026/09/stat-spravy-2024-taketo-sms-ky-koncom-roka/' },

  // --- Fotografie a mapové podklady ---
  { id: 'foto-akkbula-1', cat: 'foto', author: 'Akkbula', title: 'Flood on the Danube in Bratislava 17.09.2024', container: 'Wikimedia Commons, licencia CC BY-SA 4.0', date: '2024-09-17', medium: 'obrázok', url: 'https://commons.wikimedia.org/wiki/File:Flood_on_the_Danube_in_Bratislava_17.09.2024.jpg' },
  { id: 'foto-akkbula-2', cat: 'foto', author: 'Akkbula', title: 'Flooded Tyršovo nábrežie in Bratislava 17.09.2024', container: 'Wikimedia Commons, licencia CC BY-SA 4.0', date: '2024-09-17', medium: 'obrázok', url: 'https://commons.wikimedia.org/wiki/File:Flooded_Tyr%C5%A1ovo_n%C3%A1bre%C5%BEie_in_Bratislava_17.09.2024.jpg' },
  { id: 'foto-akkbula-2026', cat: 'foto', author: 'Akkbula', title: 'Tyršovo nábrežie in Bratislava 07.07.2026', container: 'Wikimedia Commons, licencia CC BY-SA 4.0', date: '2026-07-07', medium: 'obrázok', url: 'https://commons.wikimedia.org/wiki/File:Tyr%C5%A1ovo_n%C3%A1bre%C5%BEie_in_Bratislava_07.07.2026.jpg' },
  { id: 'foto-kunec-1', cat: 'foto', author: 'KUNEC, Patrik', title: 'Bratislava – Rozvodnený Dunaj – 18. 9. 2024 01', container: 'Wikimedia Commons, licencia CC BY-SA 4.0', date: '2024-09-18', medium: 'obrázok', url: 'https://commons.wikimedia.org/wiki/File:Bratislava_-_Rozvodnen%C3%BD_Dunaj_-_18._9._2024_01.jpg' },
  { id: 'foto-kunec-6', cat: 'foto', author: 'KUNEC, Patrik', title: 'Bratislava – Rozvodnený Dunaj – 18. 9. 2024 06', container: 'Wikimedia Commons, licencia CC BY-SA 4.0', date: '2024-09-18', medium: 'obrázok', url: 'https://commons.wikimedia.org/wiki/File:Bratislava_-_Rozvodnen%C3%BD_Dunaj_-_18._9._2024_06.jpg' },
  { id: 'foto-bsk', cat: 'foto', author: 'Bratislavský samosprávny kraj (BSK)', title: 'Stav rieky Dunaj v centre Bratislavy 16–17.9.2024 (séria 01–06)', titleEn: 'Stav rieky Dunaj v centre Bratislavy 16–17.9.2024 (series 01–06)', container: 'Wikimedia Commons, licencia CC BY 2.0', date: '2024-09-17', medium: 'obrázok', url: 'https://commons.wikimedia.org/wiki/Category:September_2024_floods_in_Slovakia' },
  { id: 'foto-doronenko-angern', cat: 'foto', author: 'Doronenko', title: 'Hochwasser in Angern an der March im September 2024 (séria 01–10)', titleEn: 'Hochwasser in Angern an der March im September 2024 (series 01–10)', container: 'Wikimedia Commons, licencia CC0', date: '2024-09-19', medium: 'obrázok', url: 'https://commons.wikimedia.org/wiki/File:Hochwasser_in_Angern_an_der_March_im_September_2024_01.jpg' },
  { id: 'foto-doronenko-morava', cat: 'foto', author: 'Doronenko', title: 'Povodeň na řece Moravě v září 2024 (séria 01–05)', titleEn: 'Povodeň na řece Moravě v září 2024 (series 01–05)', container: 'Wikimedia Commons, licencia CC0', date: '2024-09-16', medium: 'obrázok', url: 'https://commons.wikimedia.org/wiki/File:Povode%C5%88_na_%C5%99ece_Morav%C4%9B_v_z%C3%A1%C5%99%C3%AD_2024_01.jpg' },
  { id: 'foto-nasa', cat: 'foto', author: 'NASA Earth Observatory (M. Garrison; Landsat, USGS)', title: 'Rivers in Europe Burst Their Banks – Bratislava, 21. 9. 2024', container: 'Wikimedia Commons, voľné dielo (public domain)', date: '2024-09-21', medium: 'obrázok', url: 'https://commons.wikimedia.org/wiki/File:Rivers_in_Europe_Burst_Their_Banks_(153358_-_bratislavaflooding_oli2_20240921_lrg).jpg' },
  { id: 'esri', cat: 'foto', author: 'Esri', title: 'Dark Gray Canvas – podkladová mapa (Esri, HERE, Garmin, © prispievatelia OpenStreetMap)', titleEn: 'Dark Gray Canvas – base map (Esri, HERE, Garmin, © OpenStreetMap contributors)', container: 'ArcGIS Online', date: '2026', medium: 'mapa', url: 'https://www.arcgis.com/home/item.html?id=c11ce4f7801740b2905eb03ddc963ac8' },
  { id: 'osm', cat: 'foto', author: 'Prispievatelia OpenStreetMap', title: 'OpenStreetMap – mapové dáta (ODbL) a geokódovanie Nominatim', titleEn: 'OpenStreetMap – map data (ODbL) and Nominatim geocoding', container: 'OpenStreetMap Foundation', date: '2026', medium: 'mapa', url: 'https://www.openstreetmap.org/copyright' },
]

export const sourceIndex: Record<string, number> = Object.fromEntries(sources.map((s, i) => [s.id, i + 1]))
export const sourceById: Record<string, Source> = Object.fromEntries(sources.map((s) => [s.id, s]))
