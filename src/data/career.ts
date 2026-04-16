import { z } from 'zod'
import careerJson from '../../data/career.json'
import { getProjectsByCompany, type Project } from './projects'

const RoleSchema = z.object({
  role: z.string(),
  periodStart: z.string(),
  periodEnd: z.string().optional(),
})

const CareerSchema = z.object({
  id: z.string(),
  company: z.string(),
  companyInfo: z.string(),
  tag: z.array(z.string()),
  roles: z.array(RoleSchema),
})

export type Career = z.infer<typeof CareerSchema>

export interface CareerWithProjects extends Career {
  projectDetails: Project[]
}

export const career = z.array(CareerSchema).parse(careerJson)

export const careerWithProjects: CareerWithProjects[] = career.map((c) => ({
  ...c,
  projectDetails: getProjectsByCompany(c.id).reverse(),
}))

export const sortedCareer = [...careerWithProjects].sort((a, b) => {
  const aStart = a.roles[0]?.periodStart || ''
  const bStart = b.roles[0]?.periodStart || ''
  return bStart.localeCompare(aStart)
})
