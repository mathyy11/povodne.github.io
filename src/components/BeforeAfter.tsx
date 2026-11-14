import { useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { useT } from '../lib/i18n'

// Porovnanie dvoch fotiek z rovnakého miesta posuvnou deliacou čiarou.
// Ovládanie: ťahanie myšou/prstom alebo šípkami (skrytý range input pre klávesnicu a čítačky obrazovky).
export function BeforeAfter({
  before, after, beforeLabel, afterLabel, alt,
}: { before: string; after: string; beforeLabel: string; afterLabel: string; alt: string }) {
  const t = useT()
  const [pos, setPos] = useState(50)
  const box = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const setFromX = (clientX: number) => {
    const r = box.current?.getBoundingClientRect()
    if (!r) return
    setPos(Math.max(0, Math.min(100, ((clientX - r.left) / r.width) * 100)))
  }

  return (
    <div
      ref={box}
      className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl select-none touch-pan-y cursor-ew-resize bg-ink-800"
      onPointerDown={(e) => {
        dragging.current = true
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        setFromX(e.clientX)
      }}
      onPointerMove={(e) => dragging.current && setFromX(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerCancel={() => (dragging.current = false)}
    >
      <img src={after} alt="" className="absolute inset-0 w-full h-full object-cover" draggable={false} loading="lazy" />
      <img
        src={before}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        draggable={false}
        loading="lazy"
      />
      <span className="absolute top-3 left-3 rounded-full bg-ink-950/80 backdrop-blur px-3 py-1 font-mono text-[11px] text-warn-2">{beforeLabel}</span>
      <span className="absolute top-3 right-3 rounded-full bg-ink-950/80 backdrop-blur px-3 py-1 font-mono text-[11px] text-tide">{afterLabel}</span>

      <div className="absolute top-0 bottom-0 w-0.5 bg-fog-50 shadow-[0_0_12px_rgba(0,0,0,.6)] pointer-events-none" style={{ left: `${pos}%` }}>
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-fog-50 text-ink-950 inline-flex items-center justify-center shadow-lg">
          <MoveHorizontal size={20} />
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={Math.round(pos)}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-x-0 bottom-0 w-full opacity-0 h-8 cursor-ew-resize focus-visible:opacity-100"
        aria-label={t(`Porovnanie fotiek: ${alt}. Posunutím zmeníte pomer.`, `Photo comparison: ${alt}. Move to change the split.`)}
        aria-valuetext={t(`${Math.round(pos)} % fotky z povodne`, `${Math.round(pos)} % flood photo`)}
      />
    </div>
  )
}
