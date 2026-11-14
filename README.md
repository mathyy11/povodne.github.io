# Keď voda preberie kontrolu — Povodne na Slovensku 2024

Interaktívny web k semestrálnej práci (FBI UNIZA, Krízový manažment, predmet Civilná ochrana):
povodne v septembri 2024 – hydrologický priebeh, krízové riadenie, varovanie a ochrana obyvateľstva.

## Spustenie

Požiadavky: [Node.js](https://nodejs.org/) 20 alebo novší.

```bash
npm install        # prvé spustenie – nainštaluje knižnice
npm run dev        # vývojový server na http://localhost:5173
```

Zostavenie hotového webu (napr. na odovzdanie alebo nahratie na hosting):

```bash
npm run build      # výstup v priečinku dist/
npm run preview    # lokálne zobrazenie zostaveného webu
```

Priečinok `dist/` je statický web – dá sa nahrať na GitHub Pages, Netlify, školský server a pod.
Súbor `dist/index.html` **nefunguje po dvojkliku** (prehliadače blokujú moduly cez `file://`); treba ho otvoriť cez `npm run preview` alebo webový server.

## Čo potrebuje internet

| Funkcia | Služba | Bez internetu |
|---|---|---|
| Mapové dlaždice | Esri Dark Gray Canvas (tmavá), OpenStreetMap (svetlá) | body s údajmi sa zobrazia, podklad nie (zobrazí sa upozornenie) |
| Fonty | Google Fonts | použijú sa systémové náhradné fonty |
| Odkazy na zdroje | externé weby | — |

Fotografie, dáta, grafy a všetky interakcie fungujú lokálne. Žiadne API kľúče nie sú potrebné.
Pri verejnom nasadení s vysokou návštevnosťou treba rešpektovať
[pravidlá používania dlaždíc OSM](https://operations.osmfoundation.org/policies/tiles/).

## Interaktívne prvky

- **Jazyk SK / EN:** prepínač v hlavičke prepne celý web vrátane mapy, grafov, simulácie a citácií. Anglické texty sú v `src/data/en.ts` a priamo v komponentoch (`t('slovensky', 'english')`).
- **Mapa:** posuvník dní 12.–21. 9. s prehrávaním (▶) mení naraz stanice, zrážky, vyhlásenia SPA aj udalosti. Klik na ľubovoľný bod zobrazí údaje, zdroje a **fotky z miesta** (galéria, ovládanie šípkami/swipe). Fotoaparáty na mape otvoria galériu priamo. Satelitná vrstva zaplavenia Copernicus EMS (18. 9. 2024) sa načíta až po zapnutí.
- **Porovnanie fotiek pred/po** (kap. A): Tyršovo nábrežie 17. 9. 2024 a 7. 7. 2026 s posuvnou deliacou čiarou.
- **Varovné signály** (kap. E): syntetizovaná 12-s ukážka priebehu tónu sirén (Web Audio API, nie nahrávka); informácia o pravidelnej skúške sirén.
- **Čo robiť pri povodni** (kap. E): interaktívny kontrolný zoznam podľa odporúčaní MV SR z 12. 9. 2024; stav si pamätá iba prehliadač.
- **Návrh správy SK-Alert** (kap. I): maketa telefónu s dvoma scenármi (Pezinok, Bratislava) – návrh autorov.
- **Simulácia rozhodnutí** (kap. F): 4 situácie starostu s vyhodnotením a „čo sa naozaj stalo“.
- Časová os s filtrami, schéma krízového riadenia, procesný diagram, 10 grafov s prepínaním na tabuľku.

## Úpravy

- **Autori, akademický rok:** `src/config.ts`
- **Fotky z miest na mape:** `src/data/photos.ts` (iba voľné licencie – Wikimedia Commons)
- **Porovnania (2013, Česko) a kapitola 2026:** `src/data/compare.ts`
- **Zdroje a citačný štýl:** `src/data/sources.ts`, formát v `src/data/citation.ts` (STN ISO 690 / APA 7)
- **Údaje grafov a mapy:** `src/data/hydro.ts`, `src/data/spa.json`
- **Časová os:** `src/data/timeline.ts`
- **Aktéri krízového riadenia:** `src/data/actors.ts`
- **Procesný model varovania a evakuácie:** `src/data/process.ts`
- **Kritická analýza a odporúčania:** `src/data/analysis.ts`

## Technológie

React 19, TypeScript, Vite, Tailwind CSS 4, Motion (animácie), Recharts (grafy), Leaflet + OpenStreetMap (mapa), Lucide (ikony).

## Zásady práce s údajmi

- Hydrologické údaje sú prevzaté z povodňových správ SHMÚ (operatívne údaje, časy v SEČ).
- Rozsah zaplavenia pochádza výhradne zo satelitného produktu Copernicus EMS (EMSR757, Monit02, 18. 9. 2024, povodie Moravy); polygóny sú zjednodušené pre web. Inde rozsah nezobrazujeme. Body sú stredy obcí (OSM Nominatim).
- Hodinový hydrogram SHMÚ verejne nearchivuje – graf „Ako putovala povodňová vlna“ preto používa iba doložené časy kulminácií.
- Predstih výstrah a počty vyhlásení SPA vypočítali autori z tabuliek SHMÚ – sú tak označené.
- Vlastné hodnotenia a odporúčania sú označené ako analytické návrhy autorov.
- Fotografie: Wikimedia Commons (CC BY-SA 4.0, CC BY 2.0, NASA public domain) – autori uvedení pri fotkách a v zdrojoch.

## Overenie faktov (14. 11. 2026)

Všetky tvrdenia boli znovu porovnané s pôvodnými zdrojmi (PDF správy SHMÚ, zákony na Slov-Lexe, tlačové správy, články). Opravené boli drobné nepresnosti v podaní, nie čísla z hydrologických tabuliek.
