import { project } from '../config'
import { useT } from '../lib/i18n'

export function Footer() {
  const t = useT()
  return (
    <footer className="relative border-t border-line px-4 sm:px-6 md:px-10 lg:px-16 pt-20 pb-12 overflow-hidden">
      <div className="mx-auto max-w-[1320px]">
        <p className="font-display font-black uppercase text-[clamp(3rem,13vw,12rem)] leading-[0.82] text-ink-600 select-none" style={{ fontStretch: '64%' }} aria-hidden>
          {t('Povodne 2024', 'Floods 2024')}
        </p>
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <p className="eyebrow mb-3">{t('Semestrálna práca', 'Semester project')}</p>
            <p className="text-fog-100">{t(project.faculty, 'Faculty of Security Engineering, University of Žilina')}</p>
            <p className="text-fog-400">{t(`Študijný program ${project.program} · predmet ${project.course} · ${project.year}`, `Study programme Crisis Management · course Civil Protection · ${project.year}`)}</p>
          </div>
          <div>
            <p className="eyebrow mb-3">{t('Autori', 'Authors')}</p>
            <p className="text-fog-100">{project.authors.join(', ')}</p>
          </div>
          <div>
            <p className="eyebrow mb-3">{t('Licencie', 'Licences')}</p>
            <p className="text-fog-400">
              {t('Fotografie: Wikimedia Commons (CC BY-SA 4.0, CC BY 2.0, CC0, NASA voľné dielo). Mapové podklady © Esri, HERE, Garmin a prispievatelia OpenStreetMap (ODbL). Údaje: SHMÚ, Copernicus EMS a ďalšie zdroje uvedené v kapitole K.', 'Photos: Wikimedia Commons (CC BY-SA 4.0, CC BY 2.0, CC0, NASA public domain). Base maps © Esri, HERE, Garmin and OpenStreetMap contributors (ODbL). Data: SHMÚ, Copernicus EMS and other sources listed in chapter K.')}
            </p>
          </div>
        </div>
        <p className="mt-12 text-xs text-fog-500">{t('Odporúčania a hodnotenia sú analytické návrhy autorov práce a nepredstavujú oficiálne stanovisko žiadnej inštitúcie.', 'Recommendations and assessments are analytical proposals by the authors and do not represent the official position of any institution.')}</p>
      </div>
    </footer>
  )
}
