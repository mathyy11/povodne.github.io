import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Footer } from './components/Footer'
import { Deferred } from './components/Deferred'
import { Udalost } from './sections/A_Udalost'
import { Timeline } from './sections/B_Timeline'
import { Riadenie } from './sections/D_Riadenie'
import { Varovanie } from './sections/E_Varovanie'
import { Simulacia } from './sections/F_Simulacia'
import { Analyza } from './sections/G_Analyza'
import { Odporucania } from './sections/H_Odporucania'
import { Rok2026 } from './sections/J_Rok2026'
import { Zdroje } from './sections/I_Zdroje'
import { LangProvider, useLang, useT } from './lib/i18n'

// Ťažké kapitoly v samostatných balíkoch (Leaflet, Recharts)
const loadMapa = () => import('./sections/C_Mapa').then((m) => m.Mapa)
const loadData = () => import('./sections/F_Data').then((m) => m.Data)

export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  )
}

function Page() {
  const t = useT()
  const { lang } = useLang()
  return (
      <div className="grain">
        <a href="#udalost" className="skip-link">{t('Preskočiť na obsah', 'Skip to content')}</a>
        <Nav />
        <main>
          <Hero />
          <Udalost />
          <Timeline />
          {/* key={lang}: mapa sa pri zmene jazyka znovu vytvorí (texty vo vyskakovacích oknách) */}
          <Deferred key={`mapa-${lang}`} id="mapa" load={loadMapa} minHeight={1300} />
          <Riadenie />
          <Varovanie />
          <Simulacia />
          <Deferred id="data" load={loadData} minHeight={3200} />
          <Analyza />
          <Odporucania />
          <Rok2026 />
          <Zdroje />
        </main>
        <Footer />
      </div>
  )
}
