import { useEffect, useState } from 'react'
import './Header.css'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { contact } from '../../api/api'
import { useLanguage } from '../../i18n/context'

const SECTIONS = [
  { id: 'sobre', key: 'nav.about' },
  { id: 'projetos', key: 'nav.projects' },
  { id: 'solucoes', key: 'nav.solutions' },
  { id: 'interesses', key: 'nav.journey' },
  { id: 'contato', key: 'nav.contact' },
] as const

function LangSwitch() {
  const { lang, setLang, t } = useLanguage()
  return (
    <div className='lang-switch' role='group' aria-label={t('lang.switch')}>
      {(['pt', 'en'] as const).map(l => (
        <button
          key={l}
          className={`lang-btn${lang === l ? ' lang-btn--active' : ''}`}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}

function Header() {
  const { t } = useLanguage()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function scrollTo(id: string) {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header className={`site-header${scrolled ? ' site-header--scrolled' : ''}`}>
      <div className='header-inner'>
        <button className='name' onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Gustavo Andrade
        </button>

        <nav className={`menu${open ? ' open' : ''}`}>
          <ul>
            {SECTIONS.map(s => (
              <li key={s.id}>
                <button onClick={() => scrollTo(s.id)}>{t(s.key)}</button>
              </li>
            ))}
          </ul>
          <div className='contact mobile-contact'>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={22} /></a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={22} /></a>
            <a href={`mailto:${contact.email}`} aria-label="E-mail"><FaEnvelope size={22} /></a>
          </div>
        </nav>

        <div className='header-actions'>
          <div className='contact desktop-contact'>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub size={20} /></a>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href={`mailto:${contact.email}`} aria-label="E-mail"><FaEnvelope size={20} /></a>
          </div>

          <LangSwitch />

          <button className='hamburger' onClick={() => setOpen(!open)} aria-label={t('nav.menu')} aria-expanded={open}>
            <span className={open ? 'bar rotate-top' : 'bar'}></span>
            <span className={open ? 'bar hide' : 'bar'}></span>
            <span className={open ? 'bar rotate-bottom' : 'bar'}></span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
