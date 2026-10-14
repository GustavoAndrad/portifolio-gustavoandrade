import { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header'
import HomeSection from './components/HomeSection/HomeSection'
import SolutionsSection from './components/SolutionsSection/SolutionsSection'
import InterestsSection from './components/InterestsSection/InterestsSection'
import ProjectsSection from './components/ProjectsSection/ProjectsSection'
import ContactSection from './components/ContactSection/ContactSection'
import { useLanguage } from './i18n/context'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function App() {
  const { t } = useLanguage()
  useReveal()

  return (
    <>
      <Header />
      <div className='content-box'>
        <HomeSection />
      </div>
      <ProjectsSection />
      <SolutionsSection />
      <InterestsSection />
      <ContactSection />
      <footer className='footer'>
        <span>© {new Date().getFullYear()} Gustavo Andrade. {t('footer.rights')}</span>
      </footer>
    </>
  )
}

export default App
