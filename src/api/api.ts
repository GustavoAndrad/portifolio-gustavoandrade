import data from './serve.json'

export type Lang = 'pt' | 'en'

export interface Localized {
  pt: string
  en: string
}

export interface Solution {
  icon: 'web' | 'systems' | 'ai' | 'support'
  tag: Localized
  title: Localized
  pitch: Localized
  items: Localized[]
}

export interface SkillItem {
  label: string | Localized
  logo: string
}

export interface SkillGroup {
  category: Localized
  items: SkillItem[]
}

export interface CompetencyGroup {
  category: Localized
  items: Localized[]
}

export interface Role {
  title: Localized
  start: string
  end: string | null
  description: Localized
}

export interface Experience {
  org: string
  unit: Localized
  logo: string
  url: string
  roles: Role[]
}

export interface Education {
  org: string
  logo: string
  url: string
  degree: Localized
  location: Localized
  start: string
  end: string | null
  expected: boolean
}

export interface Contact {
  linkedin: string
  github: string
  email: string
}

export interface Project {
  name: string
  resume: Localized
  description: Localized
  technologies: string[]
  repo: string
  deploy: string
  type: string
  image: string
  media: { link: string; type: string; description: Localized }[]
  documentation: string
}

export const photoProfile: string = data.photo_profile
export const contact: Contact = data.contact as Contact
export const solutions: Solution[] = data.solutions as Solution[]
export const skills: SkillGroup[] = data.skills as SkillGroup[]
export const competencies: CompetencyGroup[] = data.competencies as CompetencyGroup[]
export const experience: Experience[] = data.experience as Experience[]
export const education: Education[] = data.education as Education[]
export const projects: Project[] = data.projects as Project[]
