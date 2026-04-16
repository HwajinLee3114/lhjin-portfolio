import { z } from 'zod'
import projectsJson from '../../data/projects.json'

const ProjectImageSchema = z.object({
  url: z.string(),
  name: z.string(),
})

const SkillItemSchema = z.object({
  name: z.string(),
  url: z.string().optional(),
})

const ContributionSchema = z.object({
  title: z.string(),
  desc: z.array(z.string()),
})

const FilterTagSchema = z.object({
  name: z.string(),
  color: z.string(),
})

const ProjectSchema = z.object({
  id: z.string(),
  title: z.string(),
  company: z.string().optional(),
  periodStart: z.string().optional(),
  periodEnd: z.string().optional(),
  git: z.string().optional(),
  site: z.string().optional(),
  filter: z.array(FilterTagSchema),
  description: z.string(),
  feature: z.array(z.string()),
  contribution: z.array(ContributionSchema),
  skillItem: z.array(SkillItemSchema),
  thumb: z.string(),
  images: z.array(ProjectImageSchema),
})

export type ProjectImage = z.infer<typeof ProjectImageSchema>
export type SkillItem = z.infer<typeof SkillItemSchema>
export type Contribution = z.infer<typeof ContributionSchema>
export type FilterTag = z.infer<typeof FilterTagSchema>
export type Project = z.infer<typeof ProjectSchema>

export const projects = z.array(ProjectSchema).parse(projectsJson)

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id)
}

export const getProjectsByCompany = (companyId: string) => {
  return projects.filter((p) => p.company === companyId)
}
