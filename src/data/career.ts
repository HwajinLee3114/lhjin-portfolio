import { projects } from './projects';

export const career = [
  /*
    회사명
  * 근무 기간(1년 2개월)
  * 간단 설명
  * 사용 기슬 스택
  * 담당 프로젝트명 / 기간 / 한줄 설명 : projects.ts랑 조인해서
  */
  {
    id: '1',
    company: '회사이름',
    period: 'yyyy.mm ~ yyyy.mm(n년 n개월)',
    companyInfo: '',
    tag: [
      '111',
      '2222'
    ],
    projects: [
      '1', '2'
    ]
  },
  {
    id: '2',
    company: '회사이름2',
    period: 'yyyy.mm ~ yyyy.mm(n년 n개월)',
    companyInfo: '',
    tag: [
      '111',
      '2222'
    ],
    projects: [
      '2'
    ]
  },
  {
    id: '3',
    company: '회사이름3',
    period: 'yyyy.mm ~ yyyy.mm(n년 n개월)',
    companyInfo: '',
    tag: [
      '111',
      '2222'
    ],
    projects: [
    ]
  }
];

// const careerWithProjects = career.map(c => ({
//   ...c,
//   projectDetails: c.projects
//     .map(projectId => projects.find(p => p.id === projectId))
//     .filter(Boolean)
//     .reverse()
// }));