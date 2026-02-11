import skillsJson from '../../data/skills.json'

export interface Skill {
  name: string
  color: string
  txtcolor?: string
}

export interface SkillCategory {
  title: string
  skills: Skill[]
  img: string
}

export const skills = skillsJson as SkillCategory[]
