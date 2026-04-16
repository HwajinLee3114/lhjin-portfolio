import { z } from 'zod'
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

const careerData = [
  {
    id: 'a2tec',
    company: 'A2TEC',
    companyInfo:
      'VR/AR 교육센터와 온라인 VR 콘텐츠 서비스 분야에 제공하는 멀티미디어 및 임베디드 솔루션',
    tag: ['풀스택 개발', '전자정부프레임워크', 'Java', 'Spring', 'JavaScript', 'JSP', 'PostgreSQL'],
    roles: [{ role: 'SW 개발자, 정직원', periodStart: '2018-11', periodEnd: '2020-01' }],
  },
  {
    id: 'arkdata',
    company: 'ArkData',
    companyInfo:
      '이기종 DBMS 간 실시간 데이터 복제를 통해 기업의 데이터 통합과 관리의 자유를 제공하는 솔루션',
    tag: ['Oracle', 'C', 'C#'],
    roles: [{ role: 'SW 개발자, 인턴', periodStart: '2021-02', periodEnd: '2021-04' }],
  },
  {
    id: 'futuresolution',
    company: '퓨쳐솔루션',
    companyInfo: '웹앱 개발 전문 SI',
    tag: [
      '풀스택 개발',
      'JavaScript',
      'JSP',
      'React',
      'Java',
      'Spring',
      'MySQL',
      'Oracle',
      'MariaDB',
    ],
    roles: [{ role: 'SW 개발자, 정직원', periodStart: '2021-05', periodEnd: '2024-05' }],
  },
  {
    id: 'luvmom',
    company: 'LUVMOM (럽맘)',
    companyInfo: '임신, 출산, 육아 플랫폼',
    tag: ['프론트엔드 개발', 'JavaScript', 'JSP', 'MySQL'],
    roles: [{ role: '프론트엔드 개발자, 프리랜서', periodStart: '2024-06', periodEnd: '2024-08' }],
  },
  {
    id: 'udemy',
    company: '유데미 러닝크루 리더 1기',
    companyInfo:
      '유데미 러닝크루 리더 1기 활동을 하며 TypeScript, NextJS 스터디 리더를 맡아 활동하고 있습니다.',
    tag: ['Udemy', '유데미', '러닝크루', 'TypeScript', 'Next'],
    roles: [{ role: '스터디 리더', periodStart: '2024-11', periodEnd: '2025-01' }],
  },
  {
    id: 'carsayo',
    company: '카사요',
    companyInfo:
      '신차 장기렌트·리스, 내 차 팔기, 자동차 보험, 사고수리 서비스를 하나의 구조로 연결한 자동차 통합 플랫폼',
    tag: ['Next', 'React', 'TypeScript', 'TailwindCSS', 'Vite'],
    roles: [
      { role: '프론트엔드 개발자, 정직원(대리)', periodStart: '2025-03' },
      {
        role: '프론트엔드 개발자, 계약직(주임)',
        periodStart: '2024-12',
        periodEnd: '2025-02',
      },
    ],
  },
] as const satisfies readonly z.input<typeof CareerSchema>[]

export const career = z.array(CareerSchema).parse(careerData)

export const careerWithProjects: CareerWithProjects[] = career.map((c) => ({
  ...c,
  projectDetails: getProjectsByCompany(c.id).reverse(),
}))

export const sortedCareer = [...careerWithProjects].sort((a, b) => {
  const aStart = a.roles[0]?.periodStart || ''
  const bStart = b.roles[0]?.periodStart || ''
  return bStart.localeCompare(aStart)
})
