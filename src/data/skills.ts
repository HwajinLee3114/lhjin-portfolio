import { z } from 'zod'
import skillsJson from '../../data/skills.json'

const SkillSchema = z.object({
  name: z.string(),
  color: z.string(),
  txtcolor: z.string().optional(),
})

const SkillCategorySchema = z.object({
  title: z.string(),
  skills: z.array(SkillSchema),
  img: z.string(),
})

export type Skill = z.infer<typeof SkillSchema>
export type SkillCategory = z.infer<typeof SkillCategorySchema>

export const skills = z.array(SkillCategorySchema).parse(skillsJson)
