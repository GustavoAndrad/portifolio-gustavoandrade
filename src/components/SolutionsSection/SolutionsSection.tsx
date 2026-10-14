import { FaLaptopCode, FaCubes, FaRobot, FaPlug, FaCheck, FaArrowRight } from 'react-icons/fa'
import './SolutionsSection.css'
import { solutions } from '../../api/api'
import type { Solution } from '../../api/api'
import { useLanguage } from '../../i18n/context'

const ICONS: Record<Solution['icon'], typeof FaLaptopCode> = {
  web: FaLaptopCode,
  systems: FaCubes,
  ai: FaRobot,
  support: FaPlug,
}

function SolutionsSection() {
  const { t, l } = useLanguage()

  return (
    <section className="solutions-section" id="solucoes">
      <div className="solutions-inner reveal">
        <p className="eyebrow">{t('solutions.eyebrow')}</p>
        <h2 className="section-title">{t('solutions.title')}</h2>
        <p className="solutions-subtitle">{t('solutions.subtitle')}</p>

        <div className="solutions-grid">
          {solutions.map(s => {
            const Icon = ICONS[s.icon]
            return (
              <article className="solution-card" key={s.icon}>
                <div className="solution-head">
                  <span className="solution-icon"><Icon aria-hidden /></span>
                  <span className="solution-tag">{l(s.tag)}</span>
                </div>
                <h3 className="solution-title">{l(s.title)}</h3>
                <p className="solution-pitch">{l(s.pitch)}</p>
                <ul className="solution-items">
                  {s.items.map(item => (
                    <li key={item.en}>
                      <FaCheck aria-hidden />
                      <span>{l(item)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="solutions-cta">
          <p>{t('solutions.cta.text')}</p>
          <button
            className="solutions-cta-btn"
            onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('solutions.cta.button')} <FaArrowRight aria-hidden />
          </button>
        </div>
      </div>
    </section>
  )
}

export default SolutionsSection
