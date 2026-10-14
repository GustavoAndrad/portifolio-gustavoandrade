import { useState } from 'react'
import { FaMapMarkerAlt, FaChevronDown } from 'react-icons/fa'
import './InterestsSection.css'
import { skills, competencies, experience, education } from '../../api/api'
import type { Lang } from '../../api/api'
import { useLanguage } from '../../i18n/context'
import type { UIKey } from '../../i18n/ui'

type Tab = 'skills' | 'experience' | 'education'

const tabs: { key: Tab; label: UIKey }[] = [
  { key: 'skills', label: 'journey.tab.skills' },
  { key: 'experience', label: 'journey.tab.experience' },
  { key: 'education', label: 'journey.tab.education' },
]

function formatMonth(ym: string, lang: Lang) {
  const [y, m] = ym.split('-').map(Number)
  return new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en-US', { month: 'short', year: 'numeric' })
    .format(new Date(y, m - 1))
    .replace(' de ', ' ')
    .replace('.', '')
}

function monthsBetween(start: string, end: string | null) {
  const [y1, m1] = start.split('-').map(Number)
  const now = new Date()
  const [y2, m2] = end ? end.split('-').map(Number) : [now.getFullYear(), now.getMonth() + 1]
  return (y2 - y1) * 12 + (m2 - m1) + 1
}

function usePeriod() {
  const { lang, t } = useLanguage()

  function range(start: string, end: string | null) {
    return `${formatMonth(start, lang)} – ${end ? formatMonth(end, lang) : t('journey.present')}`
  }

  function duration(start: string, end: string | null) {
    const total = monthsBetween(start, end)
    const y = Math.floor(total / 12)
    const m = total % 12
    const parts = []
    if (y) parts.push(`${y} ${t(y === 1 ? 'journey.year' : 'journey.years')}`)
    if (m) parts.push(`${m} ${t(m === 1 ? 'journey.month' : 'journey.months')}`)
    return parts.join(' ')
  }

  return { range, duration }
}

function OrgLogo({ src, name }: { src: string; name: string }) {
  return (
    <span className="org-logo">
      <img src={src} alt={name} loading="lazy" />
    </span>
  )
}

function SkillsView() {
  const { l } = useLanguage()
  return (
    <div className="skills-list">
      {skills.map((group, gi) => (
        <div className="skill-row" key={group.category.en} style={{ animationDelay: `${gi * 50}ms` }}>
          <h3 className="group-title">{l(group.category)}</h3>
          <div className="skill-chips">
            {group.items.map(item => (
              <span className="skill-chip" key={l(item.label)}>
                {item.logo
                  ? <img src={item.logo} alt="" className="skill-logo" loading="lazy" />
                  : <span className="skill-logo skill-logo--text">{l(item.label).slice(0, 2)}</span>}
                {l(item.label)}
              </span>
            ))}
          </div>
        </div>
      ))}

      {competencies.map((group, gi) => (
        <div className="skill-row" key={group.category.en} style={{ animationDelay: `${(skills.length + gi) * 50}ms` }}>
          <h3 className="group-title">{l(group.category)}</h3>
          <div className="skill-chips">
            {group.items.map(item => (
              <span className="tag-chip" key={item.en}>{l(item)}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function ExperienceView() {
  const { l } = useLanguage()
  const { range, duration } = usePeriod()
  const [openOrg, setOpenOrg] = useState<string | null>(null)

  return (
    <ol className="timeline">
      {experience.map((exp, i) => {
        const multi = exp.roles.length > 1
        const open = openOrg === exp.org
        const start = exp.roles.map(r => r.start).sort()[0]
        const end = exp.roles.some(r => r.end === null) ? null : exp.roles.map(r => r.end as string).sort().at(-1)!

        return (
          <li className={`timeline-item${open ? ' timeline-item--open' : ''}`} key={exp.org} style={{ animationDelay: `${i * 60}ms` }}>
            <button
              className="org-head"
              onClick={() => setOpenOrg(open ? null : exp.org)}
              aria-expanded={open}
            >
              <OrgLogo src={exp.logo} name={exp.org} />
              <span className="org-text">
                <span className="org-name">{exp.org}</span>
                <span className="org-unit">{l(exp.unit)}</span>
              </span>
              <span className="period-pill">{duration(start, end)}</span>
              <FaChevronDown className="org-chevron" aria-hidden />
            </button>

            <ul className={`roles${multi ? ' roles--multi' : ''}`}>
              {exp.roles.map(role => (
                <li className="role" key={role.title.en}>
                  <div className="role-line">
                    <h3 className="role-title">{l(role.title)}</h3>
                    <p className="role-period">{range(role.start, role.end)}</p>
                  </div>
                  {open && <p className="role-desc">{l(role.description)}</p>}
                </li>
              ))}
            </ul>
          </li>
        )
      })}
    </ol>
  )
}

function EducationView() {
  const { l, t } = useLanguage()
  const { range } = usePeriod()

  return (
    <div className="education-grid">
      {education.map((edu, i) => (
        <a
          className="education-card"
          key={edu.org + edu.start}
          href={edu.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{ animationDelay: `${i * 80}ms` }}
        >
          <OrgLogo src={edu.logo} name={edu.org} />
          <div className="education-body">
            <h3 className="role-title">{l(edu.degree)}</h3>
            <p className="org-unit org-unit--strong">{edu.org}</p>
            <p className="role-period">
              {range(edu.start, edu.end)}
              {edu.expected && <span className="expected"> ({t('journey.expected')})</span>}
            </p>
            <p className="education-location"><FaMapMarkerAlt aria-hidden /> {l(edu.location)}</p>
          </div>
        </a>
      ))}
    </div>
  )
}

function InterestsSection() {
  const { t } = useLanguage()
  const [active, setActive] = useState<Tab>('skills')

  return (
    <section className="interests-section" id="interesses">
      {Array.from({ length: 12 }, (_, i) => (
        <span key={i} className={`int-dot int-dot-${i + 1}`} />
      ))}

      <div className="interests-inner reveal">
        <p className="eyebrow">{t('journey.eyebrow')}</p>
        <h2 className="section-title">{t('journey.title')}</h2>

        <div className="interests-switch" role="tablist">
          {tabs.map(tab => (
            <button
              key={tab.key}
              role="tab"
              aria-selected={active === tab.key}
              className={`switch-btn${active === tab.key ? ' switch-btn--active' : ''}`}
              onClick={() => setActive(tab.key)}
            >
              {t(tab.label)}
            </button>
          ))}
        </div>

        <div className="interests-panel" key={active} role="tabpanel">
          {active === 'skills' && <SkillsView />}
          {active === 'experience' && <ExperienceView />}
          {active === 'education' && <EducationView />}
        </div>
      </div>
    </section>
  )
}

export default InterestsSection
