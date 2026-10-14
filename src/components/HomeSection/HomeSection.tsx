import { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import './HomeSection.css'
import { photoProfile } from '../../api/api'
import { useLanguage } from '../../i18n/context'

function HomeSection() {
  const { t } = useLanguage()
  const tagText = t('home.tag')
  const [displayedTag, setDisplayedTag] = useState('')
  const [tagDone, setTagDone] = useState(false)

  useEffect(() => {
    let i = 0
    setTagDone(false)
    const interval = setInterval(() => {
      setDisplayedTag(tagText.slice(0, i + 1))
      i++
      if (i >= tagText.length) {
        clearInterval(interval)
        setTagDone(true)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [tagText])

  return (
    <section className="home-section" id="sobre">
      <div className="home-content">
        <div className="home-photo-wrapper">
          <div className="home-photo-glow" />
          {Array.from({ length: 15 }, (_, i) => (
            <span key={i} className={`dot dot-${i + 1}`} />
          ))}
          <img
            src={photoProfile}
            alt="Gustavo Andrade"
            className="home-photo"
          />
        </div>

        <div className="home-text">
          <span className="home-tag">
            {displayedTag}
            <span className={`typewriter-cursor${tagDone ? ' typewriter-cursor--blink' : ''}`}>_</span>
          </span>

          <h1>{t('home.title')}</h1>

          <p className="home-description">
            {t('home.hello')} <span className="home-highlight">Gustavo Andrade</span>{t('home.bio1')}{' '}
            <span className="home-highlight">{t('home.bio.highlight')}</span>{t('home.bio2')}
          </p>

          <span className="home-available">
            <span className="home-available-dot" aria-hidden />
            {t('home.available')}
          </span>

          <div className="home-actions">
            <button
              className="home-btn"
              onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {t('home.cta.projects')} <FaArrowRight aria-hidden />
            </button>
            <button
              className="home-btn home-btn--ghost"
              onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
            >
              {t('home.cta.contact')}
            </button>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>{t('home.scroll')}</span>
      </div>
    </section>
  )
}

export default HomeSection
