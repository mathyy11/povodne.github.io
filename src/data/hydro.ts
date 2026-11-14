// Číselné údaje pre grafy a mapu. Všetky hodnoty sú prevzaté zo zdrojov uvedených pri každom bloku.
// Časy sú v SEČ (stredoeurópsky čas), tak ako ich uvádza SHMÚ. Letný čas SELČ = SEČ + 1 h.

/* ---------- Mesačné úhrny zrážok na Slovensku v roku 2024 ----------
   Zdroj: SHMÚ, Povodňová správa SR 2024, tab. 2.1 (normál 1901–2000) [shmu-rok] */
export const monthlyRainSK = [
  { m: 'I', mm: 70, pct: 152 },
  { m: 'II', mm: 67, pct: 160 },
  { m: 'III', mm: 50, pct: 106 },
  { m: 'IV', mm: 66, pct: 120 },
  { m: 'V', mm: 79, pct: 104 },
  { m: 'VI', mm: 133, pct: 155 },
  { m: 'VII', mm: 50, pct: 56 },
  { m: 'VIII', mm: 46, pct: 57 },
  { m: 'IX', mm: 136, pct: 216 },
  { m: 'X', mm: 51, pct: 84 },
  { m: 'XI', mm: 30, pct: 48 },
  { m: 'XII', mm: 20, pct: 38 },
]

/* ---------- 24-hodinové úhrny zrážok (mm), 12.–16. 9. 2024 ----------
   Zdroj: SHMÚ, mimoriadna povodňová správa (Morava, Dunaj, dolný Váh, Nitra), tab. 3.2 a 3.7 [shmu-ms]
   Pozn.: úhrny sú k 6:00 daného dňa (za predchádzajúcich 24 h). */
export type DailyRain = { station: string; basin: 'Morava' | 'dolný Váh'; elev: number; d12: number; d13: number; d14: number; d15: number; d16: number; total: number; lat: number; lon: number }
export const dailyRain: DailyRain[] = [
  { station: 'Pernek', basin: 'Morava', elev: 269, d12: 41.4, d13: 122.8, d14: 137.7, d15: 57.7, d16: 25, total: 386.0, lat: 48.3678, lon: 17.1439 },
  { station: 'Sološnica', basin: 'Morava', elev: 212, d12: 38.5, d13: 103.9, d14: 71.3, d15: 29.5, d16: 15.5, total: 259.1, lat: 48.4652, lon: 17.231 },
  { station: 'Skalica', basin: 'Morava', elev: 174, d12: 50.0, d13: 77.8, d14: 63.6, d15: 32.0, d16: 9.2, total: 232.6, lat: 48.8461, lon: 17.2288 },
  { station: 'Šaštín-Stráže', basin: 'Morava', elev: 168, d12: 39.2, d13: 65.2, d14: 78.2, d15: 28.4, d16: 15.2, total: 226.3, lat: 48.638, lon: 17.1439 },
  { station: 'Vrbovce', basin: 'Morava', elev: 384, d12: 41.6, d13: 50.4, d14: 76.3, d15: 20.2, d16: 10.2, total: 198.8, lat: 48.7994, lon: 17.4689 },
  { station: 'Jablonica', basin: 'Morava', elev: 204, d12: 45.9, d13: 70.5, d14: 37.5, d15: 29, d16: 13.0, total: 195.9, lat: 48.606, lon: 17.4208 },
  { station: 'Smrdáky', basin: 'Morava', elev: 239, d12: 36.7, d13: 60.2, d14: 66.8, d15: 21.2, d16: 7.8, total: 192.7, lat: 48.722, lon: 17.3027 },
  { station: 'Senica', basin: 'Morava', elev: 228, d12: 36.5, d13: 73.5, d14: 52.8, d15: 16.1, d16: 11.1, total: 190.0, lat: 48.6788, lon: 17.3662 },
  { station: 'Myjava', basin: 'Morava', elev: 348, d12: 46.1, d13: 63.2, d14: 54.0, d15: 13.0, d16: 8.7, total: 185.0, lat: 48.754, lon: 17.565 },
  { station: 'Brezová p. Bradlom', basin: 'Morava', elev: 257, d12: 44.2, d13: 55.2, d14: 34.9, d15: 22.8, d16: 11.8, total: 168.9, lat: 48.6616, lon: 17.537 },
  { station: 'Malý Javorník', basin: 'dolný Váh', elev: 575, d12: 29.2, d13: 64.8, d14: 87.2, d15: 32.8, d16: 19.9, total: 233.9, lat: 48.2557, lon: 17.1522 },
  { station: 'Dobrá Voda', basin: 'dolný Váh', elev: 260, d12: 42.8, d13: 51.9, d14: 35.8, d15: 19.6, d16: 14.9, total: 165.0, lat: 48.5995, lon: 17.5375 },
  { station: 'Smolenice', basin: 'dolný Váh', elev: 228, d12: 30.1, d13: 50.7, d14: 48.4, d15: 17.2, d16: 12.5, total: 158.9, lat: 48.5064, lon: 17.432 },
  { station: 'Modra-Piesok', basin: 'dolný Váh', elev: 530, d12: 22.1, d13: 49.4, d14: 46.3, d15: 15.9, d16: 12.9, total: 146.6, lat: 48.3834, lon: 17.2704 },
  { station: 'Piešťany', basin: 'dolný Váh', elev: 163, d12: 29.4, d13: 39.3, d14: 27.0, d15: 13.9, d16: 11.5, total: 121.1, lat: 48.5895, lon: 17.8214 },
  { station: 'Častá', basin: 'dolný Váh', elev: 271, d12: 18.3, d13: 37.3, d14: 34.3, d15: 19.0, d16: 6.1, total: 115.0, lat: 48.3999, lon: 17.3607 },
  { station: 'Sládkovičovo', basin: 'dolný Váh', elev: 118, d12: 19.5, d13: 40.4, d14: 22.4, d15: 14.7, d16: 11.6, total: 108.6, lat: 48.2053, lon: 17.644 },
  { station: 'Hlohovec', basin: 'dolný Váh', elev: 135, d12: 22.5, d13: 43.0, d14: 20.2, d15: 10.0, d16: 11.3, total: 107.0, lat: 48.4279, lon: 17.7988 },
  { station: 'Slovenský Grob', basin: 'dolný Váh', elev: 138, d12: 9.3, d13: 22.2, d14: 13.2, d15: 5.1, d16: 10.9, total: 60.7, lat: 48.255, lon: 17.2843 },
]

/* ---------- Kulminácie na slovenských tokoch, september 2024 ----------
   Zdroj: SHMÚ [shmu-ms] tab. 3.3, 3.6, 3.8; [shmu-vah] tab. 3.2.
   N = doba opakovania kulminačného prietoku (roky); null = neurčená. Q v m³/s, H v cm. */
export interface Peak {
  station: string
  river: string
  basin: 'Morava' | 'Dunaj' | 'dolný Váh' | 'Kysuca / Váh' | 'Nitra'
  date: string // DD.MM.
  time: string // SEČ
  h: number | null
  q: number | null
  nMin: number | null
  nMax: number | null
  spa: 1 | 2 | 3
  lat: number
  lon: number
  note?: string
}
export const peaks: Peak[] = [
  // Dunaj — slovenský úsek
  { station: 'Devín', river: 'Dunaj', basin: 'Dunaj', date: '18.9.', time: '6:00', h: 913, q: 9441, nMin: 20, nMax: 20, spa: 3, lat: 48.1746, lon: 16.9826, note: '1. kulminácia 17. 9. o 3:00 (905 cm, 9 305 m³/s), 2. kulminácia 18. 9. o 6:00.' },
  { station: 'Bratislava', river: 'Dunaj', basin: 'Dunaj', date: '18.9.', time: '13:30', h: 985, q: null, nMin: null, nMax: null, spa: 3, lat: 48.1394, lon: 17.1077, note: '1. kulminácia 17. 9. o 10:45 (970 cm), 2. kulminácia 18. 9. o 13:30 (985 cm).' },
  { station: 'Gabčíkovo', river: 'Dunaj (staré koryto)', basin: 'Dunaj', date: '19.9.', time: '4:00', h: 773, q: null, nMin: null, nMax: null, spa: 3, lat: 47.8951, lon: 17.5781 },
  { station: 'Medveďov', river: 'Dunaj', basin: 'Dunaj', date: '19.9.', time: '11:45', h: 932, q: 9272, nMin: 20, nMax: 50, spa: 3, lat: 47.8, lon: 17.6608 },
  { station: 'Komárno', river: 'Dunaj', basin: 'Dunaj', date: '20.9.', time: '4:15', h: 833, q: 8357, nMin: 20, nMax: 20, spa: 3, lat: 47.7574, lon: 18.1298 },
  { station: 'Štúrovo', river: 'Dunaj', basin: 'Dunaj', date: '20.9.', time: '11:15', h: 749, q: 8493, nMin: 20, nMax: 20, spa: 3, lat: 47.7978, lon: 18.7159 },
  // Morava a prítoky
  { station: 'Kopčany', river: 'Morava', basin: 'Morava', date: '17.9.', time: '2:00', h: 620, q: 555.2, nMin: 5, nMax: 5, spa: 3, lat: 48.7878, lon: 17.117 },
  { station: 'Moravský Svätý Ján', river: 'Morava', basin: 'Morava', date: '17.9.', time: '15:30', h: 585, q: 1059, nMin: 10, nMax: 10, spa: 3, lat: 48.5903, lon: 17.0014 },
  { station: 'Záhorská Ves', river: 'Morava', basin: 'Morava', date: '18.9.', time: '5:45', h: 650, q: 1030, nMin: 10, nMax: 10, spa: 3, lat: 48.3808, lon: 16.847 },
  { station: 'Vysoká pri Morave', river: 'Morava', basin: 'Morava', date: '18.9.', time: '14:30', h: 634, q: null, nMin: null, nMax: null, spa: 3, lat: 48.3295, lon: 16.913 },
  { station: 'Devínska Nová Ves', river: 'Morava', basin: 'Morava', date: '18.9.', time: '9:15', h: 839, q: null, nMin: null, nMax: null, spa: 3, lat: 48.2092, lon: 16.9739, note: 'Hladinu výrazne ovplyvnilo spätné vzdutie Dunaja.' },
  { station: 'Jakubov', river: 'Malina', basin: 'Morava', date: '16.9.', time: '4:45', h: 266, q: 24.96, nMin: 100, nMax: 100, spa: 3, lat: 48.4141, lon: 16.926, note: 'Situáciu podľa SHMÚ ovplyvnilo pretrhnutie hrádze toku.' },
  { station: 'Lopašov', river: 'Chvojnica', basin: 'Morava', date: '15.9.', time: '7:15', h: 251, q: 22.41, nMin: 50, nMax: 50, spa: 3, lat: 48.7508, lon: 17.3293 },
  { station: 'Borinka', river: 'Stupávka', basin: 'Morava', date: '15.9.', time: '10:30', h: 131, q: 9.493, nMin: 20, nMax: 50, spa: 3, lat: 48.2626, lon: 17.086 },
  { station: 'Sobotište', river: 'Teplica', basin: 'Morava', date: '15.9.', time: '10:00', h: 335, q: 37.58, nMin: 20, nMax: 20, spa: 3, lat: 48.7353, lon: 17.4082 },
  { station: 'Šaštín-Stráže', river: 'Myjava', basin: 'Morava', date: '15.9.', time: '13:30', h: 350, q: 60.25, nMin: 5, nMax: 5, spa: 3, lat: 48.638, lon: 17.1439 },
  { station: 'Myjava', river: 'Myjava', basin: 'Morava', date: '15.9.', time: '7:45', h: 109, q: 5.56, nMin: 2, nMax: 2, spa: 2, lat: 48.754, lon: 17.565 },
  // Dolný Váh (malokarpatské toky)
  { station: 'Pezinok', river: 'Blatina', basin: 'dolný Váh', date: '15.9.', time: '6:00', h: 151, q: 9.922, nMin: 10, nMax: 20, spa: 3, lat: 48.2855, lon: 17.2702 },
  { station: 'Horné Orešany', river: 'Parná', basin: 'dolný Váh', date: '15.9.', time: '8:15', h: 125, q: 9.353, nMin: 10, nMax: 10, spa: 3, lat: 48.4641, lon: 17.4213 },
  { station: 'Kolárovo', river: 'Váh', basin: 'dolný Váh', date: '20.9.', time: '7:15', h: 685, q: null, nMin: null, nMax: null, spa: 2, lat: 47.9182, lon: 17.9967, note: 'Vzostup spôsobilo vzdutie z vysokej hladiny Dunaja.' },
  // Kysuce, Rajčanka
  { station: 'Turzovka', river: 'Kysuca', basin: 'Kysuca / Váh', date: '15.9.', time: '6:00', h: 321, q: 231.0, nMin: 50, nMax: 50, spa: 3, lat: 49.4051, lon: 18.6263 },
  { station: 'Čadca', river: 'Kysuca', basin: 'Kysuca / Váh', date: '15.9.', time: '7:00', h: 396, q: 445.0, nMin: 50, nMax: 50, spa: 3, lat: 49.4375, lon: 18.7896 },
  { station: 'Kysucké Nové Mesto', river: 'Kysuca', basin: 'Kysuca / Váh', date: '15.9.', time: '9:15', h: 347, q: 560.0, nMin: 20, nMax: 20, spa: 3, lat: 49.2999, lon: 18.7865 },
  { station: 'Poluvsie', river: 'Rajčanka', basin: 'Kysuca / Váh', date: '15.9.', time: '5:15', h: 215, q: 85.94, nMin: 10, nMax: 10, spa: 3, lat: 49.1313, lon: 18.7136 },
  // Nitra
  { station: 'Nováky', river: 'Lehotský potok', basin: 'Nitra', date: '15.9.', time: '5:30', h: 132, q: 8.288, nMin: 2, nMax: 5, spa: 2, lat: 48.7164, lon: 18.5408 },
]

/* ---------- Pozdĺžny profil Dunaja: kulminačné prietoky ----------
   Zdroj: SHMÚ [shmu-ms] tab. 3.6 — vyššia z dvoch vĺn pre každý profil. */
export const danubeProfile = [
  { station: 'Kienstock', country: 'AT', q: 9450, n: '20', when: '15. 9. 19:00' },
  { station: 'Korneuburg', country: 'AT', q: 9800, n: '50', when: '15. 9. 23:00' },
  { station: 'Wildungsmauer', country: 'AT', q: 9700, n: '50', when: '16. 9. 8:00' },
  { station: 'Thebnerstrassl', country: 'AT', q: 9600, n: '30', when: '18. 9. 5:00' },
  { station: 'Devín', country: 'SK', q: 9441, n: '20', when: '18. 9. 6:00' },
  { station: 'Medveďov', country: 'SK', q: 9272, n: '20–50', when: '19. 9. 11:45' },
  { station: 'Komárno', country: 'SK', q: 8357, n: '20', when: '20. 9. 4:15' },
  { station: 'Štúrovo', country: 'SK', q: 8493, n: '20', when: '20. 9. 11:15' },
]

/* ---------- Hydrologické výstrahy SHMÚ podľa okresov ----------
   Zdroj: SHMÚ [shmu-ms] tab. 4.5–4.7. Časy začiatku a konca platnosti (SEČ). */
export type Warning = { district: string; level: 1 | 2 | 3; from: string; to: string }
export const warnings: Warning[] = [
  // Morava
  { district: 'Myjava', level: 3, from: '2024-09-13T12:00', to: '2024-09-15T17:51' },
  { district: 'Myjava', level: 2, from: '2024-09-15T17:51', to: '2024-09-15T19:19' },
  { district: 'Myjava', level: 1, from: '2024-09-15T19:19', to: '2024-09-16T11:10' },
  { district: 'Myjava', level: 2, from: '2024-09-16T11:10', to: '2024-09-17T10:30' },
  { district: 'Senica', level: 3, from: '2024-09-13T18:00', to: '2024-09-20T10:41' },
  { district: 'Senica', level: 2, from: '2024-09-20T10:41', to: '2024-09-21T21:27' },
  { district: 'Senica', level: 1, from: '2024-09-21T21:27', to: '2024-09-22T07:12' },
  { district: 'Skalica', level: 3, from: '2024-09-13T20:00', to: '2024-09-19T15:29' },
  { district: 'Skalica', level: 2, from: '2024-09-19T15:29', to: '2024-09-20T06:43' },
  { district: 'Malacky', level: 3, from: '2024-09-14T10:00', to: '2024-09-21T12:48' },
  { district: 'Malacky', level: 2, from: '2024-09-21T12:48', to: '2024-09-23T09:25' },
  { district: 'Malacky', level: 1, from: '2024-09-23T09:25', to: '2024-09-25T03:10' },
  // Malé Karpaty / dolný Váh
  { district: 'Pezinok', level: 2, from: '2024-09-14T06:00', to: '2024-09-15T07:01' },
  { district: 'Pezinok', level: 3, from: '2024-09-15T07:01', to: '2024-09-15T17:47' },
  { district: 'Pezinok', level: 2, from: '2024-09-15T17:47', to: '2024-09-17T06:12' },
  { district: 'Pezinok', level: 1, from: '2024-09-17T06:12', to: '2024-09-19T00:00' },
  { district: 'Trnava', level: 2, from: '2024-09-14T06:00', to: '2024-09-15T05:55' },
  { district: 'Trnava', level: 3, from: '2024-09-15T05:55', to: '2024-09-15T17:47' },
  { district: 'Trnava', level: 2, from: '2024-09-15T17:47', to: '2024-09-15T19:19' },
  { district: 'Trnava', level: 1, from: '2024-09-15T19:19', to: '2024-09-17T11:15' },
  // Dunaj
  { district: 'Bratislava', level: 3, from: '2024-09-14T20:00', to: '2024-09-21T10:23' },
  { district: 'Bratislava', level: 2, from: '2024-09-21T10:23', to: '2024-09-22T08:44' },
  { district: 'Bratislava', level: 1, from: '2024-09-22T08:44', to: '2024-09-24T18:16' },
  { district: 'Dunajská Streda', level: 3, from: '2024-09-15T12:00', to: '2024-09-21T10:31' },
  { district: 'Dunajská Streda', level: 2, from: '2024-09-21T10:31', to: '2024-09-22T03:31' },
  { district: 'Dunajská Streda', level: 1, from: '2024-09-22T03:31', to: '2024-09-22T12:26' },
  { district: 'Komárno', level: 3, from: '2024-09-16T05:00', to: '2024-09-22T08:50' },
  { district: 'Komárno', level: 2, from: '2024-09-22T08:50', to: '2024-09-23T03:22' },
  { district: 'Komárno', level: 1, from: '2024-09-23T03:22', to: '2024-09-23T09:29' },
  { district: 'Nové Zámky – juh', level: 3, from: '2024-09-16T06:00', to: '2024-09-23T03:25' },
  { district: 'Nové Zámky – juh', level: 2, from: '2024-09-23T03:25', to: '2024-09-23T19:46' },
  { district: 'Nové Zámky – juh', level: 1, from: '2024-09-23T19:46', to: '2024-09-24T06:05' },
]

/* Kulminácia na reprezentatívnej stanici v danom okrese (SHMÚ [shmu-ms]).
   Slúži na výpočet predstihu výstrahy 3. stupňa pred kulmináciou. */
export const districtPeaks: Record<string, { station: string; at: string }> = {
  Myjava: { station: 'Myjava – Myjava', at: '2024-09-15T07:45' },
  Senica: { station: 'Moravský Sv. Ján – Morava', at: '2024-09-17T15:30' },
  Skalica: { station: 'Kopčany – Morava', at: '2024-09-17T02:00' },
  Malacky: { station: 'Záhorská Ves – Morava', at: '2024-09-18T05:45' },
  Pezinok: { station: 'Pezinok – Blatina', at: '2024-09-15T06:00' },
  Trnava: { station: 'Horné Orešany – Parná', at: '2024-09-15T08:15' },
  Bratislava: { station: 'Bratislava – Dunaj', at: '2024-09-18T13:30' },
  'Dunajská Streda': { station: 'Medveďov – Dunaj', at: '2024-09-19T11:45' },
  Komárno: { station: 'Komárno – Dunaj', at: '2024-09-20T04:15' },
  'Nové Zámky – juh': { station: 'Štúrovo – Dunaj', at: '2024-09-20T11:15' },
}

/* Počty hydrologických výstrah v septembri 2024 podľa povodí — SHMÚ [shmu-ms] kap. 4, [shmu-vah] tab. 4.1
   (text správy [shmu-vah] uvádza „31 výstrah“, ale súčet tabuľky 4.1 aj rozpis v texte dávajú 21) */
export const warningCounts = [
  { basin: 'Morava', l1: 3, l2: 5, l3: 4 },
  { basin: 'Dunaj', l1: 4, l2: 4, l3: 4 },
  { basin: 'Dolný Váh', l1: 8, l2: 8, l3: 4 },
  { basin: 'Nitra', l1: 6, l2: 4, l3: 0 },
  { basin: 'Horný a stredný Váh', l1: 7, l2: 11, l3: 3 },
]

/* ---------- Škody a výdavky (povodne júl–december 2024) ----------
   Zdroj: správa MŽP SR schválená vládou, podľa TASR/noviny.sk 21. 5. 2025 [tasr-vlada25].
   Pozn.: ide o súhrn za celý 2. polrok 2024, nie výlučne za septembrovú povodeň. */
export const damages = [
  { who: 'Majetok štátu', eur: 4_320_000, approx: true },
  { who: 'Majetok obcí', eur: 3_090_000, approx: true },
  { who: 'Fyzické osoby', eur: 161_518, approx: false },
  { who: 'Právnické osoby a podnikatelia', eur: 79_432, approx: false },
]
export const spending = {
  total: 10_820_000, // refundácia schválená vládou ("vyše 10,82 mil. €")
  securing: 4_420_000, // povodňové zabezpečovacie práce ("viac ako 4,42 mil. €")
  rescue: 6_350_000, // povodňové záchranné práce ("viac ako 6,35 mil. €")
  damageTotal: 7_660_000, // škody spolu ("viac ako 7,66 mil. €")
  spa3: 108,
  spa2: 144,
  ms: 14,
}
