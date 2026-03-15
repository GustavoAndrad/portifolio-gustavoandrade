import data from './serve.json'

export interface TechItem {
  label: string
  logo: string
}

export interface SubItem {
  label: string
  logo: string
  sub: string
}

export interface Interests {
  tecnologias: TechItem[]
  formacao: SubItem[]
  instituicoes: SubItem[]
}

export interface Contact {
  linkedin: string
  github: string
  email: string
}

export interface Project {
  name: string
  resume: string
  description: string
  technologies: string[]
  repo: string
  deploy: string
  type: string
  image: string
  media: { link: string; type: string; description: string }[]
  documentation: string
}

export const photoProfile: string = data.photo_profile
export const contact: Contact = data.contact as Contact
export const interests: Interests = data.interests as Interests
export const projects: Project[] = data.projects as Project[]
