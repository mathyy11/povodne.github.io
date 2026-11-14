import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import type { PhotoPlace } from '../data/photos'
import { useT } from '../lib/i18n'

// Celoobrazovková galéria fotiek z miesta. Ovládanie: šípky, Esc, swipe na mobile.
export function Lightbox({ place, onClose }: { place: PhotoPlace | null; onClose: () => void }) {
  const [i, setI] = useState(0)
  const t = useT()
  const closeRef = useRef<HTMLButtonElement>(null)
  const touchX = useRef<number | null>(null)
  const n = place?.photos.length ?? 0

  useEffect(() => setI(0), [place])
  const go = useCallback((d: number) => setI((v) => (n ? (v + d + n) % n : 0)), [n])

  useEffect(() => {
    if (!place) return
    const prev = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus?.()
    }
  }, [place, onClose, go])

  const p = place?.photos[i]

  // Portál do <body> — galéria musí byť nad vrstvami mapy (Leaflet používa z-index 400–1000)
  return createPortal(
    <AnimatePresence>
      {place && p && (
        <motion.div
          className="fixed inset-0 z-[2000] bg-ink-950/95 backdrop-blur-md flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={`${t('Fotografie', 'Photos')}: ${place.name}`}
        >
          <div className="flex items-start justify-between gap-4 px-4 sm:px-8 pt-4 sm:pt-6">
            <div>
              <p className="eyebrow">{t('Fotografie z miesta', 'Photos from the site')} · {i + 1} / {n}</p>
              <h2 className="mt-1 font-display text-2xl sm:text-3xl font-extrabold text-fog-50" style={{ fontStretch: '80%' }}>{place.name}</h2>
              {place.note && <p className="mt-1 text-sm text-fog-400 max-w-2xl">{place.note}</p>}
            </div>
            <button ref={closeRef} onClick={onClose} className="shrink-0 w-11 h-11 rounded-full border border-line-strong inline-flex items-center justify-center text-fog-100 hover:bg-ink-700" aria-label={t('Zavrieť galériu', 'Close gallery')}>
              <X size={20} />
            </button>
          </div>

          <div
            className="relative flex-1 min-h-0 flex items-center justify-center px-2 sm:px-16 py-4"
            onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              if (touchX.current == null) return
              const dx = e.changedTouches[0].clientX - touchX.current
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
              touchX.current = null
            }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={p.src}
                src={p.src}
                alt={p.alt}
                className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </AnimatePresence>
            {n > 1 && (
              <>
                <button onClick={() => go(-1)} className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink-800/80 border border-line-strong inline-flex items-center justify-center text-fog-50 hover:bg-volt hover:text-ink-950" aria-label={t('Predchádzajúca fotka', 'Previous photo')}>
                  <ChevronLeft size={22} />
                </button>
                <button onClick={() => go(1)} className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-ink-800/80 border border-line-strong inline-flex items-center justify-center text-fog-50 hover:bg-volt hover:text-ink-950" aria-label={t('Ďalšia fotka', 'Next photo')}>
                  <ChevronRight size={22} />
                </button>
              </>
            )}
          </div>

          <div className="px-4 sm:px-8 pb-4 sm:pb-6">
            <p className="text-fog-100">{p.alt}</p>
            <p className="mt-1 text-xs text-fog-400">
              {p.date} · {t('Foto', 'Photo')}: {p.author} · {p.license} ·{' '}
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-volt-soft underline underline-offset-2">
                Wikimedia Commons <ExternalLink size={11} />
              </a>
            </p>
            {n > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar" role="tablist" aria-label={t('Náhľady', 'Thumbnails')}>
                {place.photos.map((ph, k) => (
                  <button key={ph.src} onClick={() => setI(k)} role="tab" aria-selected={k === i} aria-label={`${t('Fotka', 'Photo')} ${k + 1}`} className={`shrink-0 w-20 h-14 rounded-md overflow-hidden border-2 transition-all ${k === i ? 'border-volt' : 'border-transparent opacity-50 hover:opacity-100'}`}>
                    <img src={ph.src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  )
}
