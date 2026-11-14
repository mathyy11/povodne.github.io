import { useMemo } from 'react'
import { useLang } from '../lib/i18n'
import { timeline as tlSk, tlCats as tlCatsSk, type TLCat } from './timeline'
import { actors as actorsSk, tiers as tiersSk } from './actors'
import { steps as stepsSk, sirenSignals as sirensSk } from './process'
import { analysis as anSk, recommendations as recSk, verdicts as verdictsSk } from './analysis'
import { czVsSk as czSk, whatsNew as wnSk, statusMeta as statusSk, compare2013 as c13Sk } from './compare'
import { photoPlaces as ppSk } from './photos'
import { categoryLabels as catSk } from './sources'
import { peaks as peaksSk, damages as damagesSk } from './hydro'
import * as en from './en'

// „§ 13 zákona č. 42/1994 Z. z.“ → „§ 13 of Act No. 42/1994“
export const enRef = (r: string) =>
  r.replace(/ zákona č\. /g, ' of Act No. ').replace(/zákon č\. /g, 'Act No. ').replace(/vyhláška č\. /g, 'Decree No. ').replace(/ Z\. z\./g, '').replace(/ods\. /g, 'para. ').replace(/písm\. /g, 'letter ').replace(/ a § /g, ' and § ')

// Vráti obsahové dáta v zvolenom jazyku. Štruktúra je rovnaká, menia sa iba texty.
export function useContent() {
  const { lang } = useLang()
  return useMemo(() => {
    if (lang === 'sk') {
      return {
        timeline: tlSk, tlCats: tlCatsSk, actors: actorsSk, tiers: tiersSk, steps: stepsSk, sirens: sirensSk,
        analysis: anSk, recommendations: recSk, verdicts: verdictsSk, czVsSk: czSk, whatsNew: wnSk, statusMeta: statusSk,
        compare2013: c13Sk, photoPlaces: ppSk, categoryLabels: catSk, peaks: peaksSk, damages: damagesSk,
      }
    }
    const tlCats = Object.fromEntries(Object.entries(tlCatsSk).map(([k, v]) => [k, { ...v, label: en.enTlCats[k as TLCat] }])) as typeof tlCatsSk
    return {
      timeline: tlSk.map((e) => {
        const t = en.enTimeline[e.id]
        if (!t) return e
        return { ...e, title: t.title, text: t.text, photo: e.photo && { ...e.photo, alt: t.photoAlt ?? e.photo.alt, credit: t.photoCredit ?? e.photo.credit } }
      }),
      tlCats,
      actors: actorsSk.map((a) => {
        const t = en.enActors[a.id]
        if (!t) return a
        return {
          ...a, name: t.name, short: t.short, role: t.role,
          legal: a.legal.map((l, i) => ({ ...l, text: t.legal[i] ?? l.text, ref: enRef(l.ref) })),
          documented: a.documented.map((d, i) => ({ ...d, text: t.documented[i] ?? d.text })),
        }
      }),
      tiers: Object.fromEntries(Object.entries(tiersSk).map(([k, v]) => [k, { ...v, ...en.enTiers[k as keyof typeof en.enTiers] }])) as typeof tiersSk,
      steps: stepsSk.map((s) => {
        const t = en.enSteps[s.id]
        if (!t) return s
        return { ...s, title: t.title, short: t.short, what: t.what, who: t.who, legal: s.legal.map((l) => ({ ...l, ref: enRef(l.ref) })), example: s.example && { ...s.example, text: t.example ?? s.example.text } }
      }),
      sirens: sirensSk.map((s, i) => ({ ...s, desc: en.enSirens[i], en: en.enSirenNames[i] })),
      analysis: anSk.map((a) => {
        const t = en.enAnalysis[a.id]
        return { ...a, title: t.title, assessment: t.assessment, findings: a.findings.map((f, i) => ({ ...f, text: t.findings[i] ?? f.text })) }
      }),
      recommendations: recSk.map((r) => {
        const t = en.enRecs[r.id]
        return { ...r, target: t.target, items: r.items.map((it, i) => ({ ...it, text: t.items[i] ?? it.text })) }
      }),
      verdicts: Object.fromEntries(Object.entries(verdictsSk).map(([k, v]) => [k, { ...v, label: en.enVerdicts[k as keyof typeof en.enVerdicts] }])) as typeof verdictsSk,
      czVsSk: czSk.map((r, i) => ({ ...r, ...en.enCzVsSk[i] })),
      whatsNew: wnSk.map((w, i) => ({ ...w, ...en.enWhatsNew[i] })),
      statusMeta: Object.fromEntries(Object.entries(statusSk).map(([k, v]) => [k, { ...v, label: en.enStatus[k as keyof typeof en.enStatus] }])) as typeof statusSk,
      compare2013: { ...c13Sk, protection: { ...c13Sk.protection, text: en.enProtection } },
      photoPlaces: ppSk.map((p) => {
        const t = en.enPhotoPlaces[p.id]
        if (!t) return p
        return { ...p, name: t.name, note: t.note ?? p.note, photos: p.photos.map((ph, i) => ({ ...ph, alt: t.alts[i] ?? ph.alt, date: ph.date.replace(/(\d+)\.(?:–(\d+)\.)? 9\. 2024/, (_m, a, b) => (b ? `${a}–${b}` : a) + ' Sep 2024') })) }
      }),
      categoryLabels: en.enCategory as typeof catSk,
      peaks: peaksSk.map((p) => ({ ...p, note: p.note ? en.enPeakNotes[p.station] ?? p.note : p.note })),
      damages: damagesSk.map((d, i) => ({ ...d, who: en.enDamages[i] })),
    }
  }, [lang])
}
