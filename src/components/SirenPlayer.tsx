import { useEffect, useRef, useState } from 'react'
import { Play, Square, Volume2 } from 'lucide-react'
import { useT } from '../lib/i18n'

// Ilustračná syntéza varovných signálov (Web Audio API) — nie záznam skutočnej sirény.
// Priebeh podľa § 3a zákona č. 42/1994 Z. z.: kolísavý tón (VŠEOBECNÉ OHROZENIE), stály tón (OHROZENIE VODOU, KONIEC OHROZENIA).
// Ukážka je skrátená na DEMO_S sekúnd; skutočné signály trvajú 2 alebo 6 minút.
export const DEMO_S = 12

type Pattern = 'wave' | 'flat'

let current: { stop: () => void } | null = null

export function SirenPlayer({ pattern, label }: { pattern: Pattern; label: string }) {
  const t = useT()
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const ctxRef = useRef<AudioContext | null>(null)
  const raf = useRef<number>(0)

  const stop = () => {
    cancelAnimationFrame(raf.current)
    const ctx = ctxRef.current
    if (ctx) {
      ctx.close().catch(() => {})
      ctxRef.current = null
    }
    setPlaying(false)
    setProgress(0)
  }

  useEffect(() => () => stop(), [])

  const play = () => {
    current?.stop()
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
    if (!AC) return
    const ctx = new AC()
    ctxRef.current = ctx
    const now = ctx.currentTime
    const end = now + DEMO_S

    // dva mierne rozladené oscilátory + filter = „sirénový“ zvuk
    const gain = ctx.createGain()
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(0.07, now + 0.6)
    gain.gain.setValueAtTime(0.07, end - 0.8)
    gain.gain.linearRampToValueAtTime(0, end)
    const filter = ctx.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = 1800
    filter.connect(gain).connect(ctx.destination)

    const oscs = [0, 4].map((detune) => {
      const o = ctx.createOscillator()
      o.type = 'sawtooth'
      o.detune.value = detune
      o.connect(filter)
      if (pattern === 'flat') {
        o.frequency.setValueAtTime(440, now)
      } else {
        // kolísavý tón: plynulé stúpanie a klesanie približne každé 4 s
        const period = 4
        o.frequency.setValueAtTime(300, now)
        for (let tt = 0; tt < DEMO_S; tt += period) {
          o.frequency.linearRampToValueAtTime(620, now + tt + period / 2)
          o.frequency.linearRampToValueAtTime(300, now + tt + period)
        }
      }
      o.start(now)
      o.stop(end)
      return o
    })
    oscs[0].onended = () => stop()

    const tick = () => {
      if (!ctxRef.current) return
      setProgress(Math.min(1, (ctx.currentTime - now) / DEMO_S))
      raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    setPlaying(true)
    current = { stop }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={playing ? stop : play}
        aria-pressed={playing}
        aria-label={playing ? t(`Zastaviť ukážku: ${label}`, `Stop demo: ${label}`) : t(`Prehrať ukážku: ${label}`, `Play demo: ${label}`)}
        className={`shrink-0 w-10 h-10 rounded-full inline-flex items-center justify-center border transition-colors ${playing ? 'bg-warn-2 border-warn-2 text-ink-950' : 'border-line-strong text-fog-100 hover:border-warn-2 hover:text-warn-2'}`}
      >
        {playing ? <Square size={14} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
      </button>
      <div className="flex-1 min-w-0">
        <div className="h-1 rounded-full bg-ink-600 overflow-hidden">
          <div className="h-full bg-warn-2" style={{ width: `${progress * 100}%` }} />
        </div>
        <p className="mt-1 flex items-center gap-1 font-mono text-[10px] text-fog-500">
          <Volume2 size={11} /> {t(`skrátená ukážka ${DEMO_S} s · syntéza, nie nahrávka`, `${DEMO_S}-s shortened demo · synthesized, not a recording`)}
        </p>
      </div>
    </div>
  )
}
