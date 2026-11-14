import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring, AnimatePresence } from 'motion/react'
import { Menu, X, ArrowUp } from 'lucide-react'
import { useLang, useT, type Lang } from '../lib/i18n'

export const navItems = [
  { id: 'udalost', label: 'Udalosť', en: 'Event', letter: 'A' },
  { id: 'cas', label: 'Časová os', en: 'Timeline', letter: 'B' },
  { id: 'mapa', label: 'Mapa', en: 'Map', letter: 'C' },
  { id: 'riadenie', label: 'Riadenie', en: 'Management', letter: 'D' },
  { id: 'varovanie', label: 'Varovanie', en: 'Warning', letter: 'E' },
  { id: 'simulacia', label: 'Simulácia', en: 'Simulation', letter: 'F' },
  { id: 'data', label: 'Dáta', en: 'Data', letter: 'G' },
  { id: 'analyza', label: 'Analýza', en: 'Analysis', letter: 'H' },
  { id: 'odporucania', label: 'Odporúčania', en: 'Proposals', letter: 'I' },
  { id: 'rok2026', label: '2026', en: '2026', letter: 'J' },
  { id: 'zdroje', label: 'Zdroje', en: 'Sources', letter: 'K' },
]

// Prepínač jazyka SK / EN
function LangToggle() {
  const { lang, setLang } = useLang()
  return (
    <div role="group" aria-label="Jazyk / Language" className="inline-flex rounded-full border border-line-strong p-0.5 bg-ink-850/80 font-mono text-[11px]">
      {(['sk', 'en'] as Lang[]).map((l) => (
        <button key={l} onClick={() => setLang(l)} aria-pressed={lang === l} lang={l} className={`rounded-full px-2.5 py-1.5 uppercase transition-colors ${lang === l ? 'bg-fog-50 text-ink-950 font-semibold' : 'text-fog-300 hover:text-fog-50'}`}>
          {l}
        </button>
      ))}
    </div>
  )
}

export function Nav() {
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 })
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = useT()
  const { lang } = useLang()
  const lbl = (n: (typeof navItems)[number]) => (lang === 'en' ? n.en : n.label)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.6)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Zvýraznenie aktuálnej kapitoly
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    const observeAll = () => {
      obs.disconnect()
      navItems.forEach((n) => {
        const el = document.getElementById(n.id)
        if (el) obs.observe(el)
      })
    }
    observeAll()
    // odložene načítané kapitoly (mapa, dáta) nahradia svoj zástupný element
    window.addEventListener('sections-changed', observeAll)
    return () => {
      obs.disconnect()
      window.removeEventListener('sections-changed', observeAll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const current = navItems.find((n) => n.id === active)

  return (
    <>
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-volt to-tide origin-left z-[70]" style={{ scaleX: progress }} aria-hidden />
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-[background,border-color] duration-500 border-b ${scrolled ? 'bg-ink-900/80 backdrop-blur-xl border-line' : 'bg-transparent border-transparent'}`}
        style={{ height: 'var(--nav-h)' }}
      >
        <nav className="h-full mx-auto max-w-[1440px] px-4 sm:px-6 md:px-10 flex items-center justify-between gap-4" aria-label={t('Hlavná navigácia', 'Main navigation')}>
          <a href="#top" className="flex items-center gap-3 shrink-0 group" aria-label={t('Na začiatok', 'Back to top')}>
            <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden>
              <path d="M3 17c4.3-4 8.7 4 13 0s8.7 4 13 0M3 23c4.3-4 8.7 4 13 0s8.7 4 13 0" stroke="var(--color-volt)" strokeWidth="2.6" fill="none" strokeLinecap="round" />
              <path d="M3 11c4.3-4 8.7 4 13 0s8.7 4 13 0" stroke="var(--color-fog-500)" strokeWidth="2" fill="none" strokeLinecap="round" />
            </svg>
            <span className="font-mono text-[12px] tracking-[0.18em] text-fog-100">
              POVODNE<span className="text-volt">/</span>24
            </span>
            {current && scrolled && (
              <span className="hidden sm:inline font-mono text-[11px] text-fog-500 tracking-wider">
                · {current.letter} {lbl(current)}
              </span>
            )}
          </a>

          <ul className="hidden min-[1380px]:flex items-center gap-0.5">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  aria-current={active === n.id ? 'true' : undefined}
                  className={`relative px-2 2xl:px-2.5 py-2 text-[12.5px] 2xl:text-[13px] rounded-full transition-colors ${active === n.id ? 'text-fog-50' : 'text-fog-400 hover:text-fog-100'}`}
                >
                  {active === n.id && <motion.span layoutId="navpill" className="absolute inset-0 rounded-full bg-ink-600/80 -z-10" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                  {lbl(n)}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <LangToggle />
            <button
              className="min-[1380px]:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-line-strong text-fog-100"
              onClick={() => setOpen(true)}
              aria-label={t('Otvoriť menu', 'Open menu')}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] bg-ink-950/96 backdrop-blur-xl px-6 pt-5 pb-10 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-between">
              <span className="font-mono text-[12px] tracking-[0.18em] text-fog-100">POVODNE<span className="text-volt">/</span>24</span>
              <button onClick={() => setOpen(false)} className="w-10 h-10 rounded-full border border-line-strong inline-flex items-center justify-center" aria-label={t('Zavrieť menu', 'Close menu')} autoFocus>
                <X size={18} />
              </button>
            </div>
            <ul className="mt-10 flex-1 overflow-y-auto">
              {navItems.map((n, i) => (
                <motion.li key={n.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.03 * i }}>
                  <a href={`#${n.id}`} onClick={() => setOpen(false)} className="flex items-baseline gap-4 py-3 border-b border-line">
                    <span className="font-mono text-xs text-volt w-4">{n.letter}</span>
                    <span className="font-display text-3xl font-bold uppercase text-fog-50" style={{ fontStretch: '75%' }}>{lbl(n)}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {scrolled && (
          <motion.a
            href="#top"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-5 right-5 z-40 w-11 h-11 rounded-full bg-ink-700/90 backdrop-blur border border-line-strong inline-flex items-center justify-center text-fog-100 hover:bg-volt hover:text-ink-950 transition-colors"
            aria-label={t('Návrat na začiatok', 'Back to top')}
          >
            <ArrowUp size={18} />
          </motion.a>
        )}
      </AnimatePresence>
    </>
  )
}
