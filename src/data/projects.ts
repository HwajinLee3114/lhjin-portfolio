import projectsJson from '../../data/projects.json'

export interface ProjectImage {
  url: string
  name: string
}

export interface SkillItem {
  name: string
  url?: string
}

export interface Contribution {
  title: string
  desc: string[]
}

export interface FilterTag {
  name: string
  color: string
}

export interface Project {
  id: string
  title: string
  company?: string
  periodStart?: string
  periodEnd?: string
  git?: string
  site?: string
  filter: FilterTag[]
  description: string
  feature: string[]
  contribution: Contribution[]
  skillItem: SkillItem[]
  thumb: string
  images: ProjectImage[]
}

export const projects = projectsJson as Project[]

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id)
}

export const getProjectsByCompany = (companyId: string) => {
  return projects.filter((p) => p.company === companyId)
}
