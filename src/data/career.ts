export interface Career {
  id: string
  company: string
  period: string
  role: string
  companyInfo: string
  tag: string[]
  projects: string[]
}

export const career: Career[] = [
  /*
    회사명
  * 근무 기간(1년 2개월) 
  * 간단 설명
  * 사용 기슬 스택
  * 담당 프로젝트명 / 기간 / 한줄 설명 : projects.ts랑 조인해서
  */
  {
    id: '1',
    company: 'A2TEC',
    period: '2018.11 - 2020.01 (1년 2개월)',
    role: 'SW 개발자, 정직원',
    companyInfo:
      'VR/AR 교육센터와 온라인 VR 콘텐츠 서비스 분야에 제공하는 멀티미디어 및 임베디드 솔루션',
    tag: ['풀스택 개발', '전자정부프레임워크', 'Java', 'Spring', 'JavaScript', 'JSP', 'PostgreSQL'],
    projects: ['1'],
  },
  {
    id: '2',
    company: 'ArkData',
    period: '2021.02 - 2021.04 (3개월)',
    role: 'SW 개발자, 인턴',
    companyInfo:
      '이기종 DBMS 간 실시간 데이터 복제를 통해 기업의 데이터 통합과 관리의 자유를 제공하는 솔루션',
    tag: ['Oracle', 'C', 'C#'],
    projects: [],
  },
  {
    id: '3',
    company: '퓨쳐솔루션',
    period: '2021.05 - 2024.05 (3년 0개월)',
    role: 'SW 개발자, 정직원',
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
    projects: ['2', '3', '4', '5', '6', '7', '8', '9'],
  },
  {
    id: '4',
    company: 'LUVMOM (럽맘)',
    period: '2024.06 - 2024.08 (3개월)',
    role: '프론트엔드 개발자, 프리랜서',
    companyInfo: '임신, 출산, 육아 플랫폼',
    tag: ['프론트엔드 개발', 'JavaScript', 'JSP', 'MySQL'],
    projects: ['10'],
  },
  {
    id: '5',
    company: '유데미 러닝크루 리더 1기',
    period: '2024.11 - 진행중', // 2025.01 (3개월)
    role: '',
    companyInfo:
      '유데미 러닝크루 리더 1기 활동을 하며 TypeScript, NextJS 스터디 리더를 맡아 활동하고 있습니다.',
    tag: ['Udemy', '유데미', '러닝크루', 'TypeScript', 'Next'],
    projects: [],
  },
]
