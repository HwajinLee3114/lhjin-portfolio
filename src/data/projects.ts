import projectsJson from '../../data/projects.json'

export interface Image {
  id: string
  url: string
  name: string
}

export interface SkillItem {
  id: string
  name: string
  url?: string
}

export interface Contribution {
  id: string
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
  periodStart?: string
  periodEnd?: string
  git?: string
  site?: string
  role?: string
  impact?: string[]
  featured?: boolean
  caseStudy?: {
    problem: string
    solution: string[]
    result: string[]
  }
  filter: FilterTag[]
  description: string
  feature: string[]
  contribution: Contribution[]
  skillItem: SkillItem[]
  thumb: string
  images: Image[]
}

export const projects = projectsJson as Project[]

// 프로젝트 상세
export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id)
}
