import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'
import { setFormatLang } from './format'

// Dvojjazyčnosť SK / EN. Texty sú priamo v komponentoch ako t('slovensky', 'english'),
// dlhšie obsahové dáta majú anglické preklady v src/data/en.ts (podľa id položky).
export type Lang = 'sk' | 'en'

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: 'sk', setLang: () => {} })
const KEY = 'povodne24-lang'

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const saved = localStorage.getItem(KEY)
      if (saved === 'sk' || saved === 'en') return saved
    } catch {
      /* úložisko nemusí byť dostupné */
    }
    return 'sk'
  })
  setFormatLang(lang)
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = lang === 'en' ? 'When the water takes control — Floods 2024' : 'Keď voda preberie kontrolu — Povodne 2024'
    try {
      localStorage.setItem(KEY, lang)
    } catch {
      /* úložisko nemusí byť dostupné */
    }
  }, [lang])
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>
}

export const useLang = () => useContext(LangCtx)

export function useT() {
  const { lang } = useContext(LangCtx)
  return useCallback(<T,>(sk: T, en: T): T => (lang === 'en' ? en : sk), [lang])
}

// Zlúči anglické preklady (podľa id) do položiek dát
export function localize<T extends { id: string }>(items: T[], en: Record<string, Partial<T>>, lang: Lang): T[] {
  if (lang === 'sk') return items
  return items.map((it) => ({ ...it, ...(en[it.id] ?? {}) }))
}
