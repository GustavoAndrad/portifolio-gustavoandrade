import { useRef, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { projects } from '../../api/api'
import type { Project } from '../../api/api'
import './ProjectsSection.css'

const VISIBLE = 4

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [])

  return createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-image">
          {project.image && <img src={`/${project.image}`} alt={project.name} />}
          <div className="modal-image-badges">
            <span className="project-card-type">{project.type === 'coop' ? 'colaborativo' : 'solo'}</span>
            {project.deploy && (
              <a className="modal-live-btn" href={project.deploy} target="_blank" rel="noopener noreferrer">
                ● ver projeto
              </a>
            )}
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-header">
            <div>
              <h2 className="modal-name">{project.name}</h2>
              <p className="modal-resume">{project.resume}</p>
            </div>
            {project.repo && (
              <a className="modal-link-btn" href={project.repo} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            )}
          </div>

          <p className="modal-description">{project.description}</p>

          <div className="modal-section">
            <span className="modal-label">Tecnologias</span>
            <div className="modal-tags">
              {project.technologies.map(t => (
                <span key={t} className="project-tag">{t}</span>
              ))}
            </div>
          </div>

          {project.documentation && (
            <div className="modal-section">
              <span className="modal-label">Documentação</span>
              <a className="modal-doc-link" href={project.documentation} target="_blank" rel="noopener noreferrer">
                {project.documentation} ↗
              </a>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  )
}

function ProjectsSection() {
  const [start, setStart] = useState(0)
  const [animDir, setAnimDir] = useState<'left' | 'right' | null>(null)
  const [animKey, setAnimKey] = useState(0)
  const [selected, setSelected] = useState<Project | null>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const total = projects.length
  const canPrev = start > 0
  const canNext = start + VISIBLE < total

  function navigate(dir: 'left' | 'right') {
    setAnimDir(dir)
    setAnimKey(k => k + 1)
    if (dir === 'right') setStart(s => Math.min(s + VISIBLE, total - VISIBLE))
    else setStart(s => Math.max(s - VISIBLE, 0))
  }

  useEffect(() => {
    if (animDir) {
      const t = setTimeout(() => setAnimDir(null), 350)
      return () => clearTimeout(t)
    }
  }, [animKey])

  const visible = projects.slice(start, start + VISIBLE)

  return (
    <section className="projects-section" id="projetos">
      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}

      <span className="proj-dot proj-dot-1" />
      <span className="proj-dot proj-dot-2" />
      <span className="proj-dot proj-dot-3" />
      <span className="proj-dot proj-dot-4" />
      <span className="proj-dot proj-dot-5" />
      <span className="proj-dot proj-dot-6" />
      <span className="proj-dot proj-dot-7" />
      <span className="proj-dot proj-dot-8" />
      <span className="proj-dot proj-dot-9" />
      <span className="proj-dot proj-dot-10" />
      <span className="proj-dot proj-dot-11" />
      <span className="proj-dot proj-dot-12" />

      <div className="projects-inner">
        <p className="projects-eyebrow">destaques</p>
        <h2 className="projects-title">Projetos</h2>

        <div className="projects-carousel">
          <button
            className={`carousel-arrow carousel-arrow--left${canPrev ? '' : ' carousel-arrow--hidden'}`}
            onClick={() => navigate('left')}
            aria-label="Anterior"
          >
            ‹
          </button>

          <div
            className={`projects-track projects-track--${animDir ?? 'idle'}`}
            key={animKey}
            ref={trackRef}
          >
            {visible.map((project) => (
              <div
                key={project.name}
                className="project-card"
                onClick={() => setSelected(project)}
              >
                <div className="project-card-image">
                  {project.image && <img src={`/${project.image}`} alt={project.name} />}
                  {project.deploy && <span className="project-card-live">● deployed</span>}
                </div>
                <div className="project-card-body">
                  <h3 className="project-card-name">{project.name}</h3>
                  <p className="project-card-resume">{project.resume}</p>
                  <div className="project-card-tags">
                    {project.technologies.slice(0, 3).map(t => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="project-tag project-tag--more">+{project.technologies.length - 3}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            className={`carousel-arrow carousel-arrow--right${canNext ? '' : ' carousel-arrow--hidden'}`}
            onClick={() => navigate('right')}
            aria-label="Próximo"
          >
            ›
          </button>
        </div>

        <div className="projects-dots">
          {Array.from({ length: Math.ceil(total / VISIBLE) }).map((_, i) => (
            <span
              key={i}
              className={`projects-dot${i === Math.floor(start / VISIBLE) ? ' projects-dot--active' : ''}`}
              onClick={() => { setAnimDir('right'); setAnimKey(k => k + 1); setStart(i * VISIBLE) }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
