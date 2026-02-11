import careerJson from '../../data/career.json'

export interface Career {
  id: string
  company: string
  companyInfo: string
  tag: string[]
  projects: string[]
  roles: {
    role: string
    periodStart: string
    periodEnd?: string
  }[]
}

export const career = careerJson as Career[]
