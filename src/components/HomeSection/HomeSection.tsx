import { useEffect, useState } from 'react'
import './HomeSection.css'

const tagText = 'Desenvolvedor Full Stack'

function HomeSection() {
  const [displayedTag, setDisplayedTag] = useState('')
  const [tagDone, setTagDone] = useState(false)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setDisplayedTag(tagText.slice(0, i + 1))
      i++
      if (i >= tagText.length) {
        clearInterval(interval)
        setTagDone(true)
      }
    }, 40)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="home-section" id="sobre">
      <div className="home-content">
        <div className="home-photo-wrapper">
          <div className="home-photo-glow" />
          <span className="dot dot-1" />
          <span className="dot dot-2" />
          <span className="dot dot-3" />
          <span className="dot dot-4" />
          <span className="dot dot-5" />
          <span className="dot dot-6" />
          <span className="dot dot-7" />
          <span className="dot dot-8" />
          <span className="dot dot-9" />
          <span className="dot dot-10" />
          <span className="dot dot-11" />
          <span className="dot dot-12" />
          <span className="dot dot-13" />
          <span className="dot dot-14" />
          <span className="dot dot-15" />
          <img
            src="/gustavo-andrade.jpg"
            alt="Gustavo Andrade"
            className="home-photo"
          />
        </div>

        <div className="home-text">
          <span className="home-tag">
            {displayedTag}
            <span className={`typewriter-cursor${tagDone ? ' typewriter-cursor--blink' : ''}`}>_</span>
          </span>

          <h1>
            Software com Impacto
          </h1>

          <p className="home-description">
            Olá😀! Sou <span className="home-highlight">Gustavo Andrade</span>, graduando em Ciência da Computação e desenvolvedor full stack. Participo da criação de soluções digitais voltadas para resolver problemas reais, buscando sempre construir <span className="home-highlight"> sistemas organizados, eficientes e com impacto mensurável</span>.
          </p>

          <button
            className="home-btn"
            onClick={() => document.getElementById('projetos')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            Ver projetos
          </button>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>scroll</span>
      </div>
    </section>
  )
}

export default HomeSection
