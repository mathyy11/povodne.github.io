// Formátovanie čísel a dátumov podľa zvoleného jazyka (nastavuje LangProvider)
let lang: 'sk' | 'en' = 'sk'
export const setFormatLang = (l: 'sk' | 'en') => {
  lang = l
}
const locale = () => (lang === 'en' ? 'en-GB' : 'sk-SK')

export const nf = (n: number, digits = 0) =>
  new Intl.NumberFormat(locale(), { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n)

export const eur = (n: number) =>
  n >= 1_000_000 ? `${nf(n / 1_000_000, 2)} ${lang === 'en' ? 'm' : 'mil.'} €` : `${nf(n)} €`

const daysSk = ['ne', 'po', 'ut', 'st', 'št', 'pi', 'so']
const daysEn = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const monthsEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export const skDay = (iso: string) => {
  const d = new Date(iso + 'T12:00:00')
  return lang === 'en' ? `${d.getDate()} ${monthsEn[d.getMonth()]}` : `${d.getDate()}. ${d.getMonth() + 1}.`
}
export const skDayLong = (iso: string) => {
  const d = new Date(iso + 'T12:00:00')
  return lang === 'en'
    ? `${daysEn[d.getDay()]} ${d.getDate()} ${monthsEn[d.getMonth()]} ${d.getFullYear()}`
    : `${daysSk[d.getDay()]} ${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`
}
// „17. 9.“ → v angličtine „17 Sep“ (pre krátke dátumy v septembri 2024)
export const sepDay = (day: number | string) => (lang === 'en' ? `${day} Sep` : `${day}. 9.`)
export const isEn = () => lang === 'en'
