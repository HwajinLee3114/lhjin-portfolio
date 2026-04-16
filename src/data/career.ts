import careerJson from '../../data/career.json'
import { getProjectsByCompany, type Project } from './projects'

export interface Career {
  id: string
  company: string
  companyInfo: string
  tag: string[]
  roles: {
    role: string
    periodStart: string
    periodEnd?: string
  }[]
}

export interface CareerWithProjects extends Career {
  projectDetails: Project[]
}

export const career = careerJson as Career[]

export const careerWithProjects: CareerWithProjects[] = career.map((c) => ({
  ...c,
  projectDetails: getProjectsByCompany(c.id).reverse(),
}))

export const sortedCareer = [...careerWithProjects].sort((a, b) => {
  const aStart = a.roles[0]?.periodStart || ''
  const bStart = b.roles[0]?.periodStart || ''
  return bStart.localeCompare(aStart)
})
