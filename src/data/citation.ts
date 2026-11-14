import { ACCESSED, type Source } from './sources'
import { isEn } from '../lib/format'

// Formátovanie bibliografických záznamov.
// Predvolený štýl: STN ISO 690 (bežný na slovenských univerzitách). Alternatíva: APA 7.
// Ak vyučujúci vyžaduje iný štýl, stačí doplniť ďalšiu funkciu a zaradiť ju do `styles`.

export type CitationStyle = 'iso690' | 'apa7'

const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const skDate = (d?: string) => {
  if (!d) return ''
  const [y, m, day] = d.split('-')
  if (day) return isEn() ? `${Number(day)} ${monthsEn[Number(m) - 1]} ${y}` : `${Number(day)}. ${Number(m)}. ${y}`
  if (m) return `${Number(m)}/${y}`
  return y
}

const year = (d?: string) => (d ? d.slice(0, 4) : isEn() ? 'n.d.' : 'b. r.')

const isoAuthor = (raw: string) => {
  const a = isEn() && raw === 'Prispievatelia OpenStreetMap' ? 'OpenStreetMap contributors' : raw
  // Osobné mená sú už vo forme PRIEZVISKO, Meno; inštitúcie sa píšu veľkými písmenami
  return a.includes(',') ? a : a.toUpperCase()
}

// v anglickej verzii preložiť slovenské slová v popise vydavateľa (licencia, voľné dielo, tlačové správy)
const enContainer = (c: string) => c.replace('licencia', 'licence').replace('voľné dielo (public domain)', 'public domain').replace('tlačové správy', 'press releases').replace(', odbor Hydrologické predpovede a výstrahy', ', Hydrological Forecasts and Warnings Dept.')

export function iso690(s: Source): string {
  const en = isEn()
  const medium = s.medium === 'PDF' ? '[online, PDF]' : s.medium === 'obrázok' ? (en ? '[online, photograph]' : '[online, fotografia]') : s.medium === 'mapa' ? (en ? '[online, map]' : '[online, mapa]') : '[online]'
  const parts = [
    `${isoAuthor(s.author)}.`,
    `${(en && s.titleEn) || s.title} ${medium}.`,
    s.container ? `${en ? enContainer(s.container) : s.container},` : '',
    `${skDate(s.date) || (en ? 'n.d.' : 'b. r.')}.`,
    en ? `[cited ${skDate(ACCESSED)}].` : `[cit. ${skDate(ACCESSED)}].`,
    `${en ? 'Available at' : 'Dostupné na'}: ${s.url}`,
  ]
  return parts.filter(Boolean).join(' ')
}

export function apa7(s: Source): string {
  const d = s.date && s.date.length > 4 ? `${year(s.date)}, ${skDate(s.date)}` : year(s.date)
  const c = s.container ? (isEn() ? enContainer(s.container) : s.container) : ''
  return `${s.author}. (${d}). ${(isEn() && s.titleEn) || s.title}. ${c ? c + '. ' : ''}${s.url}`
}

export const styles: Record<CitationStyle, { label: string; fn: (s: Source) => string }> = {
  iso690: { label: 'STN ISO 690', fn: iso690 },
  apa7: { label: 'APA 7', fn: apa7 },
}
