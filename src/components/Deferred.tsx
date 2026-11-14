import { useEffect, useRef, useState, type ComponentType } from 'react'

// Odložené načítanie ťažkej kapitoly (mapa, grafy): kód sa stiahne, až keď sa používateľ priblíži.
// Zástupný blok má rovnaké id ako kapitola, takže odkazy z navigácie fungujú aj pred načítaním.
export function Deferred({ id, load, minHeight }: { id: string; load: () => Promise<ComponentType>; minHeight: number }) {
  const [C, setC] = useState<ComponentType | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    let done = false
    const start = () => {
      if (done) return
      done = true
      load().then((Comp) => {
        setC(() => Comp)
        // navigácia znovu sleduje kapitoly (nový DOM element)
        requestAnimationFrame(() => window.dispatchEvent(new Event('sections-changed')))
      })
    }
    const obs = new IntersectionObserver((e) => e[0].isIntersecting && start(), { rootMargin: '1500px 0px' })
    if (ref.current) obs.observe(ref.current)
    // ak sa na kapitolu skočí odkazom (#mapa), načítať hneď
    const onHash = () => location.hash === `#${id}` && start()
    onHash()
    window.addEventListener('hashchange', onHash)
    // po načítaní stránky dotiahnuť na pozadí
    const idle = setTimeout(start, 4000)
    return () => {
      obs.disconnect()
      window.removeEventListener('hashchange', onHash)
      clearTimeout(idle)
    }
  }, [id, load])

  if (C) return <C />
  return (
    <section id={id} ref={ref} style={{ minHeight }} className="flex items-center justify-center" aria-busy="true">
      <span className="eyebrow animate-pulse">{document.documentElement.lang === 'en' ? 'Loading…' : 'Načítava sa…'}</span>
    </section>
  )
}
