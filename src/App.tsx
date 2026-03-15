import './App.css'
import Header from './components/Header/Header'
import HomeSection from './components/HomeSection/HomeSection'
import InterestsSection from './components/InterestsSection/InterestsSection'
import ProjectsSection from './components/ProjectsSection/ProjectsSection'
import ContactSection from './components/ContactSection/ContactSection'

function App() {
  return (
    <>
      <div className='content-box'>
        <Header />
        <HomeSection />
      </div>
      <InterestsSection />
      <ProjectsSection />
      <ContactSection />
      <footer className='footer'>
        <span>© {new Date().getFullYear()} Gustavo Andrade. Todos os direitos reservados.</span>
      </footer>
    </>
  )
}

export default App
