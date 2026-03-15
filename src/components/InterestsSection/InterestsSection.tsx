import { useState } from 'react'
import './InterestsSection.css'
import { interests } from '../../api/api'

type Tab = 'tecnologias' | 'formacao' | 'instituicoes'

const data = interests

const tabs: { key: Tab; label: string }[] = [
  { key: 'tecnologias', label: 'Tecnologias' },
  { key: 'instituicoes', label: 'Experiência' },
  { key: 'formacao', label: 'Formação' },
]

const INITIAL_COUNT = 8

function InterestsSection() {
  const [active, setActive] = useState<Tab>('tecnologias')
  const [animKey, setAnimKey] = useState(0)
  const [expanded, setExpanded] = useState(false)
  const isSmall = window.matchMedia('(max-width: 768px)').matches

  function handleTab(tab: Tab) {
    if (tab === active) return
    setActive(tab)
    setAnimKey(k => k + 1)
    setExpanded(false)
  }

  const items = data[active]
  const visible = (isSmall && !expanded) ? items.slice(0, INITIAL_COUNT) : items
  const hasMore = isSmall && items.length > INITIAL_COUNT

  return (
    <section className="interests-section" id="interesses">
      <span className="int-dot int-dot-1" />
      <span className="int-dot int-dot-2" />
      <span className="int-dot int-dot-3" />
      <span className="int-dot int-dot-4" />
      <span className="int-dot int-dot-5" />
      <span className="int-dot int-dot-6" />
      <span className="int-dot int-dot-7" />
      <span className="int-dot int-dot-8" />
      <span className="int-dot int-dot-9" />
      <span className="int-dot int-dot-10" />
      <span className="int-dot int-dot-11" />
      <span className="int-dot int-dot-12" />

      <div className="interests-inner">
        <p className="interests-eyebrow">Gustavo Andrade</p>
        <h2 className="interests-title">Interesses & Trajetória</h2>

        <div className="interests-switch">
          {tabs.map(t => (
            <button
              key={t.key}
              className={`switch-btn${active === t.key ? ' switch-btn--active' : ''}`}
              onClick={() => handleTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className={`interests-grid interests-grid--${active}`} key={animKey}>
          {visible.map((item, i) => (
            <div
              className="interest-card"
              key={item.label}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {item.logo.startsWith('http') || item.logo.startsWith('https')
                ? <img src={item.logo} alt={item.label} className="interest-logo" />
                : <span className="interest-icon">{item.logo}</span>
              }
              <span className="interest-label">{item.label}</span>
              {'sub' in item && <span className="interest-sub">{(item as { sub: string }).sub}</span>}
            </div>
          ))}
        </div>

        {hasMore && (
          <button className="see-more-btn" onClick={() => setExpanded(e => !e)}>
            {expanded ? 'Ver menos ↑' : `Ver mais (${items.length - INITIAL_COUNT}) ↓`}
          </button>
        )}
      </div>
    </section>
  )
}

export default InterestsSection
