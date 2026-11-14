import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowRight, Map } from 'lucide-react'
import { useRef } from 'react'
import { Cite } from './ui'
import { useLang, useT } from '../lib/i18n'
import { sepDay } from '../lib/format'

const wordsSk = ['Keď', 'voda', 'preberie', 'kontrolu']
const wordsEn = ['When', 'water', 'takes', 'control']

// Postup kulminácie po slovenskom Dunaji — SHMÚ, tab. 3.6
const wave = [
  { s: 'Devín', d: 18, t: '06:00', h: 913 },
  { s: 'Bratislava', d: 18, t: '13:30', h: 985 },
  { s: 'Medveďov', d: 19, t: '11:45', h: 932 },
  { s: 'Komárno', d: 20, t: '04:15', h: 833 },
  { s: 'Štúrovo', d: 20, t: '11:15', h: 749 },
]

function Contours() {
  const reduce = useReducedMotion()
  // Vrstevnice / hladinové línie — jemný pohyb, pri reduced-motion statické
  const lines = Array.from({ length: 9 }, (_, i) => i)
  return (
    <svg className="absolute inset-x-0 bottom-0 w-full h-[46%] pointer-events-none" viewBox="0 0 1440 400" preserveAspectRatio="none" aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0" x2="1">
          <stop offset="0" stopColor="#3aa0ff" stopOpacity="0" />
          <stop offset="0.35" stopColor="#3aa0ff" stopOpacity="0.55" />
          <stop offset="0.7" stopColor="#2dd4c4" stopOpacity="0.45" />
          <stop offset="1" stopColor="#2dd4c4" stopOpacity="0" />
        </linearGradient>
      </defs>
      {lines.map((i) => {
        const y = 120 + i * 30
        const a = 10 + i * 2.2
        const d = `M-200 ${y} C 100 ${y - a}, 300 ${y + a}, 560 ${y} S 1000 ${y - a}, 1240 ${y} S 1600 ${y + a}, 1800 ${y}`
        return (
          <motion.path
            key={i}
            d={d}
            fill="none"
            stroke="url(#lg)"
            strokeWidth={i === 3 ? 1.6 : 0.8}
            opacity={0.25 + (i === 3 ? 0.5 : 0.05 * (9 - i))}
            initial={{ pathLength: 0 }}
            animate={reduce ? { pathLength: 1 } : { pathLength: 1, x: [0, i % 2 ? -60 : 60, 0] }}
            transition={reduce ? { duration: 0 } : { pathLength: { duration: 2.4, delay: 0.4 + i * 0.08, ease: 'easeOut' }, x: { duration: 14 + i * 2, repeat: Infinity, ease: 'easeInOut' } }}
          />
        )
      })}
    </svg>
  )
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', reduce ? '0%' : '18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const t = useT()
  const { lang } = useLang()
  const words = lang === 'en' ? wordsEn : wordsSk

  return (
    <section id="top" ref={ref} className="relative min-h-[100svh] overflow-hidden flex flex-col" aria-label="Úvod">
      {/* Fotografia */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src="./photos/hero-stary-most.webp"
          alt={t('Rozvodnený Dunaj v Bratislave 17. 9. 2024, pohľad zo Starého mosta na zaplavené nábrežie, Most SNP a Bratislavský hrad', 'Flooded Danube in Bratislava on 17 Sep 2024, view from the Old Bridge to the flooded embankment, SNP Bridge and Bratislava Castle')}
          className="w-full h-full object-cover object-[60%_center] animate-drift motion-reduce:animate-none"
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,11,16,0.55)_0%,rgba(7,11,16,0.35)_35%,rgba(7,11,16,0.85)_72%,#070b10_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(7,11,16,0.75),transparent_60%)]" />
      <div className="absolute inset-0 mix-blend-color bg-[#0b2a4a]/35" />
      <Contours />

      <motion.div style={{ opacity: fade }} className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-10 lg:px-16 pb-10 md:pb-14 pt-28">
        <div className="mx-auto w-full max-w-[1320px] grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-end">
          <div>
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }} className="flex flex-wrap items-center gap-3 mb-7">
              <span className="chip border-warn-3/50 text-warn-2"><span className="w-1.5 h-1.5 rounded-full bg-warn-3 animate-pulse motion-reduce:animate-none" />{t('III. stupeň povodňovej aktivity', 'Flood activity level III')}</span>
            </motion.div>

            <h1 className="font-display font-black uppercase text-fog-50 leading-[0.86] tracking-[-0.02em] text-[clamp(3.1rem,min(15vw,14.5vh),10.5rem)]" style={{ fontStretch: '68%' }}>
              {words.map((w, i) => (
                <span key={w + i} className="inline-block overflow-hidden align-bottom mr-[0.18em] pt-[0.14em] -mt-[0.14em] pb-[0.04em]">
                  <motion.span
                    className={`inline-block ${w === 'voda' || w === 'water' ? 'text-transparent bg-clip-text bg-gradient-to-r from-volt-soft via-volt to-tide' : ''}`}
                    initial={{ y: reduce ? 0 : '120%', opacity: reduce ? 0 : 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.09, duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {w}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9 }}
              className="mt-7 max-w-2xl text-lg md:text-[1.35rem] leading-relaxed text-fog-100"
            >
              {t('Povodne na Slovensku, september 2024. Analýza ochrany obyvateľstva, krízového riadenia a úloh verejnej správy.', 'Floods in Slovakia, September 2024. An analysis of civil protection, crisis management and the role of public administration.')}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.9 }}
              className="mt-4 max-w-2xl text-[15px] leading-relaxed text-fog-300"
            >
              {t(<>Tlaková níž <em className="font-serif text-lg not-italic text-fog-100">„Boris“</em> priniesla na západ Slovenska za päť dní až 386&nbsp;mm zrážok. Dunaj prekročil 3. stupeň povodňovej aktivity na celom slovenskom úseku a niektoré menšie toky dosiahli 50- až 100-ročné prietoky.</>, <>Low-pressure system <em className="font-serif text-lg not-italic text-fog-100">“Boris”</em> brought up to 386&nbsp;mm of rain to western Slovakia in five days. The Danube exceeded flood activity level 3 along the entire Slovak section and some smaller streams reached 50- to 100-year flows.</>)}<Cite ids={['shmu-ms']} /> {t('Táto stránka sleduje, ako na to reagoval systém ochrany obyvateľstva.', 'This site follows how the civil protection system responded.')}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }} className="mt-9 flex flex-wrap gap-3">
              <a href="#udalost" className="group inline-flex items-center gap-2 rounded-full bg-fog-50 text-ink-950 px-6 py-3.5 font-semibold hover:bg-volt-soft transition-colors">
                {t('Preskúmať udalosť', 'Explore the event')} <ArrowRight size={18} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a href="#mapa" className="inline-flex items-center gap-2 rounded-full border border-fog-300/40 text-fog-50 px-6 py-3.5 font-medium hover:border-volt hover:text-volt-soft backdrop-blur-sm bg-ink-900/30 transition-colors">
                <Map size={18} /> {t('Pozrieť mapu', 'View the map')}
              </a>
            </motion.div>
          </div>

          {/* Informačný panel */}
          <motion.aside
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="rounded-2xl border border-line-strong bg-ink-900/70 backdrop-blur-xl p-5 md:p-6"
            aria-label={t('Kľúčové údaje udalosti', 'Key event data')}
          >
            <div className="flex items-center justify-between">
              <span className="eyebrow">{t('Udalosť', 'Event')}</span>
              <span className="font-mono text-[11px] text-fog-400">{t('SEČ', 'CET')}</span>
            </div>
            <p className="mt-2 font-display text-3xl font-extrabold text-fog-50 tabular-nums" style={{ fontStretch: '80%' }}>{t('12.–25. 9. 2024', '12–25 Sep 2024')}</p>
            <p className="text-sm text-fog-400">{t('od vzostupu hladín po koniec výstrah', 'from rising rivers to the end of warnings')}</p>

            <div className="mt-5 pt-4 border-t border-line">
              <div className="flex items-baseline justify-between">
                <span className="eyebrow text-warn-2">{t('Maximum · Dunaj Bratislava', 'Maximum · Danube Bratislava')}</span>
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-display text-5xl font-black text-fog-50 tabular-nums" style={{ fontStretch: '75%' }}>985</span>
                <span className="font-mono text-fog-300">cm</span>
                <span className="ml-auto font-mono text-xs text-fog-400 text-right">{sepDay(18)}<br />13:30</span>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-line">
              <span className="eyebrow">{t('Postup kulminácie po Dunaji', 'Peak moving down the Danube')}</span>
              <ol className="mt-3 space-y-1.5">
                {wave.map((w, i) => (
                  <li key={w.s} className="grid grid-cols-[14px_1fr_auto_auto] items-center gap-2 font-mono text-[12px]">
                    <span className={`w-2 h-2 rounded-full ${w.s === 'Bratislava' ? 'bg-warn-3' : 'bg-volt'}`} style={{ opacity: 1 - i * 0.12 }} />
                    <span className="text-fog-100 font-sans text-[13px]">{w.s}</span>
                    <span className="text-fog-400">{sepDay(w.d)} {w.t}</span>
                    <span className="text-fog-50 tabular-nums w-14 text-right">{w.h} cm</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-[11px] text-fog-500 leading-snug">{t('Vodné stavy rôznych staníc nie sú navzájom porovnateľné (rôzna nula vodočtu). Zdroj: SHMÚ', 'Water levels at different stations are not comparable (different gauge zero). Source: SHMÚ')}<Cite ids={['shmu-ms']} /></p>
            </div>
          </motion.aside>
        </div>

        <div className="mx-auto w-full max-w-[1320px] mt-10 flex items-center justify-between">
          <a href="#udalost" className="group inline-flex items-center gap-3 text-fog-400 hover:text-fog-100 transition-colors">
            <span className="relative w-6 h-10 rounded-full border border-fog-400/50 flex justify-center pt-2">
              <motion.span className="w-1 h-2 rounded-full bg-fog-100" animate={reduce ? {} : { y: [0, 12, 0], opacity: [1, 0.2, 1] }} transition={{ duration: 2, repeat: Infinity }} />
            </span>
            <span className="eyebrow group-hover:text-fog-100">{t('Pokračovať', 'Continue')}</span>
            <ArrowDown size={14} className="sr-only" />
          </a>
          <p className="text-[11px] text-fog-500 text-right max-w-[50%]">{t('Foto', 'Photo')}: Akkbula, Wikimedia Commons, CC BY-SA 4.0 · {sepDay(17)} 2024</p>
        </div>
      </motion.div>
    </section>
  )
}
