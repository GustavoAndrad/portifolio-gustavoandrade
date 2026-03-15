import { useState } from 'react'
import './Header.css'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'
import { contact } from '../../api/api'

function scrollTo(id: string, setOpen: (v: boolean) => void) {
  setOpen(false)
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header>
      <div className='name'>Gustavo Andrade</div>

      <div className={`menu${open ? ' open' : ''}`}>
        <ul>
          <li onClick={() => scrollTo('sobre', setOpen)}>Sobre</li>
          <li onClick={() => scrollTo('interesses', setOpen)}>Interesses</li>
          <li onClick={() => scrollTo('projetos', setOpen)}>Projetos</li>
          <li onClick={() => scrollTo('contato', setOpen)}>Contato</li>
        </ul>
        <div className='contact mobile-contact'>
          <a href={contact.github} target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
          <a href={`mailto:${contact.email}`}><FaEnvelope size={24} /></a>
        </div>
      </div>

      <div className='contact desktop-contact'>
        <a href={contact.github} target="_blank" rel="noopener noreferrer"><FaGithub size={24} style={{marginRight: "7.5px"}} /></a>
        <a href={contact.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
        <a href={`mailto:${contact.email}`}><FaEnvelope size={24} style={{marginLeft: "8px"}} /></a>
      </div>

      <button className='hamburger' onClick={() => setOpen(!open)} aria-label="Menu">
        <span className={open ? 'bar rotate-top' : 'bar'}></span>
        <span className={open ? 'bar hide' : 'bar'}></span>
        <span className={open ? 'bar rotate-bottom' : 'bar'}></span>
      </button>
    </header>
  )
}

export default Header
