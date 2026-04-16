import { z } from 'zod'
import { tag } from './filters'

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
  ios: z.string().optional(),
  android: z.string().optional(),
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

const S = {
  js: { name: 'JavaScript', url: 'js-100.png' },
  ts: { name: 'TypeScript', url: 'typescript-100.png' },
  react: { name: 'React', url: 'react-100.png' },
  next: { name: 'Next.js', url: 'next-100.png' },
  java: { name: 'Java', url: 'java-100.png' },
  spring: { name: 'Spring', url: 'spring-100.png' },
  mysql: { name: 'MySQL', url: 'mysql-100.png' },
  oracle: { name: 'Oracle', url: 'oracle-100.png' },
  mariadb: { name: 'MariaDB', url: 'maria-100.png' },
  postgresql: { name: 'PostgreSQL', url: 'postgreesql-100.png' },
  django: { name: 'Django', url: 'django-100.png' },
  tailwind: { name: 'TailwindCSS', url: 'tailwind-100.png' },
  vercel: { name: 'Vercel', url: 'vercel-100.png' },
  zustand: { name: 'zustand', url: 'zustand.svg' },
  styledComponents: { name: 'Styled-Components', url: 'styled-components.png' },
  vite: { name: 'Vite' },
  mui: { name: 'MUI' },
  socketio: { name: 'Socket.io' },
  tosspayments: { name: 'Toss Payments' },
  reactHookForm: { name: 'React Hook Form' },
  recharts: { name: 'Recharts' },
  zod: { name: 'Zod' },
  framerMotion: { name: 'Framer Motion' },
  reactQuery: { name: 'React Query' },
  jsp: { name: 'JSP' },
  egov: { name: '전자정부프레임워크' },
  supabase: { name: 'Supabase' },
} as const

const projectsData: z.input<typeof ProjectSchema>[] = [
  {
    id: 'kt-giga-cms',
    title: 'KT GiGA Live CMS',
    periodStart: '2018-11',
    periodEnd: '2020-01',
    filter: [tag('team'), tag('풀스택')],
    description: 'VR 계열사 및 관리자가 콘텐츠와 서비스를 효율적으로 관리할 수 있는 CMS입니다.',
    feature: ['VR 카테고리 및 카테고리별 콘텐츠 관리', 'VR 제공 계열사 관리'],
    contribution: [
      {
        title: 'VR 계열사 및 관리자 콘텐츠 관리 사이트 유지보수 및 신규 페이지 개발',
        desc: [
          'VR 계열사 및 관리자 콘텐츠 관리 사이트의 UI/UX를 리뉴얼하여 사용자 만족도를 크게 높였고, 웹사이트 접근성을 개선하였습니다.',
        ],
      },
    ],
    skillItem: [S.egov, S.java, S.spring, S.js, S.jsp, S.postgresql],
    thumb: 'kt-giga-cms.png',
    images: [],
    company: 'a2tec',
  },
  {
    id: 'bunyang',
    title: '분양이부장',
    periodStart: '2021-05',
    periodEnd: '2022-05',
    filter: [tag('team'), tag('풀스택')],
    description:
      '전국 아파트 분양 정보를 제공하며, 지역별 분양 정보를 등록하고 홍보 및 구인 활동을 원하는 사용자와 관계자를 위한 반응형 플랫폼입니다.',
    feature: [
      '사용자 위치 기반 인근 아파트 분양 정보 조회',
      '아파트 분양 시 견적서 생성 및 직급에 따른 수수료 계산 서비스 제공',
      '구인 게시판을 통해 사용자 즉시 서류 제출 가능',
      '엑셀 파일을 통한 지역별 아파트 분양 정보 등록 및 설정한 지역에 대한 알림 발송',
      '관계자가 등록한 분양 정보와 공공 API 정보를 지도에 마커로 표시',
      '전단지 및 브로슈어 등록 기능 제공, 사용자 양식 첨부 파일 다운로드 기능 제공',
    ],
    contribution: [
      {
        title: '전체 페이지 프론트엔드 화면 및 기능 구현과 백엔드 오류 유지보수',
        desc: [
          'Access Token 전송으로 보안 강화',
          '문자 발송 시스템 연동, 인증번호 기능 구현',
          '카카오맵 및 청약 분양 정보 조회 공공 API 연동하여 분양 정보 지도 표시 및 상세 정보 조회',
          '파일 업로드 및 다운로드 기능 구현',
          '견적서, 수수료 계산을 위한 항목별 계산 함수 구현',
          '사용자 페이지 메뉴얼 작성',
        ],
      },
    ],
    skillItem: [S.js, S.jsp, S.java, S.spring, S.mysql],
    thumb: 'bunyang.png',
    images: [
      { url: 'bunyang_1.png', name: 'daily' },
      { url: 'bunyang_2.png', name: 'daily' },
      { url: 'bunyang_3.png', name: 'daily' },
      { url: 'bunyang_4.png', name: 'daily' },
      { url: 'bunyang_5.png', name: 'daily' },
      { url: 'bunyang_6.png', name: 'daily' },
      { url: 'bunyang_7.png', name: 'daily' },
      { url: 'bunyang_8.png', name: 'daily' },
      { url: 'bunyang_9.png', name: 'daily' },
      { url: 'bunyang_10.png', name: 'daily' },
      { url: 'bunyang_11.png', name: 'daily' },
      { url: 'bunyang_12.png', name: 'daily' },
      { url: 'bunyang_13.png', name: 'daily' },
      { url: 'bunyang_14.png', name: 'daily' },
    ],
    company: 'futuresolution',
  },
  {
    id: 'pleisure',
    title: 'Pleisure',
    periodStart: '2021-05',
    periodEnd: '2022-02',
    filter: [tag('team'), tag('FE')],
    description: '간편한 스포츠 레슨 예약 서비스를 제공하는 플랫폼입니다.',
    feature: [
      '원원하는 코치와의 레슨을 간편하게 실시간 예약 가능',
      '예약한 레슨 스케줄 관리 기능 제공',
      '개인 코치 및 팀 별 레슨 일정 관리',
    ],
    contribution: [
      {
        title: '코치 페이지 프론트엔드 화면 및 기능 구현',
        desc: [
          '카카오톡 링크 공유 기능 구현',
          '개인 코치 및 팀별 레슨 스케줄 캘린더 작업',
          '팀, 코치 및 팀원, 레슨 관리 페이지 개발',
          '레슨 결제 시스템 연동 처리',
        ],
      },
      {
        title: '사용자 페이지 프론트엔드 유지보수',
        desc: ['사용자 페이지 디자인 개선', '예약 시스템 데이터 실시간 연동 오류 처리'],
      },
    ],
    skillItem: [S.js, S.jsp, S.java, S.spring, S.mysql],
    thumb: 'pleisure.png',
    images: [
      { url: 'pleisure_1.png', name: 'daily' },
      { url: 'pleisure_2.png', name: 'daily' },
      { url: 'pleisure_3.png', name: 'daily' },
      { url: 'pleisure_4.png', name: 'daily' },
      { url: 'pleisure_5.png', name: 'daily' },
      { url: 'pleisure_6.png', name: 'daily' },
      { url: 'pleisure_7.png', name: 'daily' },
      { url: 'pleisure_8.png', name: 'daily' },
      { url: 'pleisure_9.png', name: 'daily' },
      { url: 'pleisure_10.png', name: 'daily' },
      { url: 'pleisure_11.png', name: 'daily' },
    ],
    company: 'futuresolution',
  },
  {
    id: 'drt',
    title: 'Digital Real Trip(DRT)',
    periodStart: '2021-10',
    periodEnd: '2022-09',
    site: 'https://www.djes.co.kr',
    filter: [tag('team'), tag('feature'), tag('FE'), tag('BE')],
    description: '대전 체험형 게임 플랫폼으로, 다양한 체험형 프로그램을 제공합니다.',
    feature: [
      '등록된 프로그램을 체험할 수 있는 기능 제공',
      '실제 장소 방문 후 문제를 풀어 랭킹 남기기',
      '체험 게임별 카메라 인식, BGM, 이벤트 문자 기능 제공',
    ],
    contribution: [
      {
        title: '사용자 페이지의 UI와 기능 개선',
        desc: [
          '사용자 페이지의 UI와 기능을 전체적으로 개선하면서 이전 버전에 비해 사용자 수가 20% 중가하였습니다.',
        ],
      },
      {
        title: '스토리 기반 게임에 BGM 추가, LMS 발송',
        desc: [
          '스토리 기반 게임에 BGM을 추가하고 체험 관련 이미지를 LMS로 발송하여 스토리 진행 이탈률을 50% → 20%로 개선했습니다.',
        ],
      },
      {
        title: '카카오, 네이버 SNS 로그인 추가',
        desc: [
          '카카오, 네이버 SNS 로그인을 추가하여 사용자 접근성 및 편의성을 크게 향상시켰습니다.',
        ],
      },
      {
        title: '관리자 페이지에 스토리 템플릿 관리 기능을 구현',
        desc: [
          '관리자 페이지에 스토리 템플릿 관리 기능을 구현하여 클라이언트 코드에 하드코딩되어 있던 코드 중복을 줄여 코드 가독성을 높이고, 페이지 로딩 시간을 단축시켜 성능을 개선했습니다.',
        ],
      },
    ],
    skillItem: [S.js, S.jsp, S.java, S.spring, S.mysql],
    thumb: 'drt.png',
    images: [
      { url: 'drt_1.png', name: 'daily' },
      { url: 'drt_2.png', name: 'daily' },
      { url: 'drt_3.png', name: 'daily' },
      { url: 'drt_4.png', name: 'daily' },
      { url: 'drt_5.png', name: 'daily' },
      { url: 'drt_6.png', name: 'daily' },
      { url: 'drt_7.png', name: 'daily' },
      { url: 'drt_8.png', name: 'daily' },
    ],
    company: 'futuresolution',
  },
  {
    id: 'your-exercise',
    title: '너의 운동은',
    periodStart: '2022-02',
    periodEnd: '2022-05',
    filter: [tag('team'), tag('feature'), tag('FE'), tag('BE')],
    description: '운동 관리 커뮤니티 반응형 플랫폼입니다.',
    feature: [
      '운동 기록 및 관리 기능 제공',
      '입력한 체력 정보를 차트로 시각화하여 변화 비교 가능',
      '위치 정보와 설문을 기반으로 운동하기 좋은 장소 추천',
      '운동별 커뮤니티를 통해 공통 관심사를 가진 사용자 간 소통 지원',
    ],
    contribution: [
      {
        title: 'Reduct 비동기 데이터 처리',
        desc: ['비동기 데이터 처리에 Redux를 적용하여 데이터 흐름 관리의 효율성을 높였습니다.'],
      },
      {
        title: '공통 컴포넌트 구현 및 폴더 구조를 개선',
        desc: [
          '공통 컴포넌트 구현 및 폴더 구조를 개선으로 유지보수성 및 확장성을 향상시켰고, 이후 추가 기능 구현 및 다른 작업자와의 업무 효율을 개선하였습니다.',
        ],
      },
    ],
    skillItem: [S.react, S.java, S.spring, S.mysql],
    thumb: 'your-exercise.png',
    images: [
      { url: 'your-exercise_1.png', name: 'daily' },
      { url: 'your-exercise_2.png', name: 'daily' },
      { url: 'your-exercise_3.png', name: 'daily' },
      { url: 'your-exercise_4.png', name: 'daily' },
      { url: 'your-exercise_5.png', name: 'daily' },
      { url: 'your-exercise_6.png', name: 'daily' },
      { url: 'your-exercise_7.png', name: 'daily' },
      { url: 'your-exercise_8.png', name: 'daily' },
      { url: 'your-exercise_9.png', name: 'daily' },
    ],
    company: 'futuresolution',
  },
  {
    id: 'pocketdata',
    title: '포켓데이터',
    periodStart: '2022-06',
    periodEnd: '2022-10',
    filter: [tag('team'), tag('feature'), tag('FE')],
    description: '입찰 정보, 지원 사업, 스타트업 정보를 조회할 수 있는 사이트입니다.',
    feature: [
      '자회사 및 제휴사에게 다양한 맞춤 정보 제공',
      '입찰 정보, 지원 사업, 스타트업 정보 등에 대한 맞춤 알림 설정 가능',
      '각종 공고의 상세 정보 및 입찰 마감일 확인 기능 제공',
    ],
    contribution: [
      {
        title: '기존 jQuery 기반 프로젝트를 React로 리팩토링',
        desc: [
          '기존 jQuery 기반의 프로젝트를 서버와 클라이언트로 분리한 후 React로 리팩토링하여, 상태 관리 및 코드 가독성 및 재사용성을 크게 향상시켰습니다. 또한 불필요한 렌더링을 최소화하여 성능을 최적화하고, 사용자 편의성을 크게 향상시켰습니다.',
        ],
      },
    ],
    skillItem: [S.react, S.java, S.spring, S.mysql],
    thumb: 'pocketdata.png',
    images: [
      { url: 'pocketdata_1.png', name: 'daily' },
      { url: 'pocketdata_2.png', name: 'daily' },
      { url: 'pocketdata_3.png', name: 'daily' },
      { url: 'pocketdata_4.png', name: 'daily' },
      { url: 'pocketdata_5.png', name: 'daily' },
    ],
    company: 'futuresolution',
  },
  {
    id: 'dutyfree',
    title: '면세점 사이트',
    periodStart: '2022-09',
    periodEnd: '2023-07',
    filter: [tag('team'), tag('풀스택')],
    description: '면세 상품 및 점포 관리 사이트입니다.',
    feature: [
      '카테고리별 판매 상품과 점포를 관리할 수 있는 관리자 페이지 제공',
      '판매된 정보를 기반으로 차트로 표현하여 통계를 확인할 수 있는 기능 제공',
    ],
    contribution: [
      {
        title: '관리자 사이트 유지보수 및 신규 개발',
        desc: [
          '입금 및 결제 수단 관리 기능과 프로모션 이력 페이지의 화면 및 기능 신규 구현',
          '면세 카테고리, 브랜드, 상품 정보 제공 고시 관리 페이지를 유지보수하고 신규 기능 추가',
          '카카오톡 및 문자 메시지 발송 테스트, 템플릿 수정 담당',
        ],
      },
      {
        title: '사용자 사이트 프론트엔드 유지보수',
        desc: [
          '장바구니 화면 및 SessionStorage를 활용한 기능 구현',
          '이벤트 페이지 템플릿 유지보수 담당',
        ],
      },
    ],
    skillItem: [S.js, S.jsp, S.react, S.java, S.spring, S.oracle],
    thumb: 'dutyfree.png',
    images: [],
    company: 'futuresolution',
  },
  {
    id: 'linkorder',
    title: '링크오더',
    periodStart: '2023-08',
    periodEnd: '2024-03',
    filter: [tag('team'), tag('feature'), tag('FE')],
    description: '지역 소상공인을 위한 상품 판매 및 배송 관리 반응형 플랫폼입니다.',
    feature: [
      '판매 상품과 판매, 배송, 직원 등을 관리할 수 있는 점포 관리자 사이트 및 사용자용 판매 링크 사이트 제공',
      '관리자가 상품 판매 링크를 생성한 후, 마감일 전까지 사용자가 링크를 통해 구매 가능',
      '각 판매 링크별 주문서 및 배달 관리 기능 제공',
      '점포 로그인 시 직업 등급에 따라 메뉴 및 기능 분기',
    ],
    contribution: [
      {
        title: '공유 링크를 통한 구매 페이지 접속으로 구매자의 접근성을 높였습니다.',
        desc: [],
      },
      {
        title: '장바구니 기능 추가',
        desc: [
          '기존 댓글 주문 방식에서 장바구니 기능으로 변경하여 UI를 개선하고, 구매 전환율을 15% 증가시켰으며, 사용자 편의성을 향상시켰습니다.',
          '세션 기반 장바구니 기능을 구현하여 페이지 로딩 시간을 50% 단축시키고, 실시간 상품 수량을 표시하여 장바구니 이탈률을 감소시켰습니다.',
        ],
      },
      {
        title: '점포 등록 및 직원 관리 프로세스 개선',
        desc: [
          '점포 등록 및 직원 관리 프로세스를 개선하여 운영 효율성 및 배송 처리 속도를 20% 향상시켰습니다.',
        ],
      },
    ],
    skillItem: [S.js, S.jsp, S.java, S.spring, S.mariadb],
    thumb: 'linkorder.png',
    images: [
      { url: 'linkorder_1.png', name: 'daily' },
      { url: 'linkorder_2.png', name: 'daily' },
      { url: 'linkorder_3.png', name: 'daily' },
      { url: 'linkorder_4.png', name: 'daily' },
      { url: 'linkorder_5.png', name: 'daily' },
      { url: 'linkorder_6.png', name: 'daily' },
      { url: 'linkorder_7.png', name: 'daily' },
      { url: 'linkorder_8.png', name: 'daily' },
      { url: 'linkorder_9.png', name: 'daily' },
      { url: 'linkorder_10.png', name: 'daily' },
      { url: 'linkorder_11.png', name: 'daily' },
      { url: 'linkorder_12.png', name: 'daily' },
      { url: 'linkorder_13.png', name: 'daily' },
      { url: 'linkorder_14.png', name: 'daily' },
      { url: 'linkorder_15.png', name: 'daily' },
    ],
    company: 'futuresolution',
  },
  {
    id: 'we-dolbomi',
    title: 'WE 돌봄이',
    periodStart: '2024-03',
    periodEnd: '2024-05',
    site: 'http://we.cookplay.net',
    filter: [tag('team'), tag('FE')],
    description: '암센터 환자 습관 관리 플랫폼입니다.',
    feature: [
      '환자의 증상에 맞춘 식단 제공',
      '식사 시간을 측정하고 평가할 수 있는 기능 제공',
      '다양한 운동 영상을 시청하며 따라할 수 있는 기능 제공',
      '식사 및 운동 기록을 통해 평균 점수와 상태 확인 가능',
    ],
    contribution: [
      {
        title: '전체 페이지 프론트엔드 화면 및 기능 구현',
        desc: [
          '제공받은 데이터베이스 함수와 프로시저를 활용해 기능 구현',
          '로그인, 회원가입, 건강 정보 입력 기능 구현',
          '카카오 및 네이버 SNS 로그인과 문자 발송 기능 처리',
          '식사 및 운동 관리 페이지, 기록 차트 및 영상 제어 기능 구현',
        ],
      },
    ],
    skillItem: [S.js, S.jsp, S.java, S.spring, S.mariadb],
    thumb: 'we-dolbomi.png',
    images: [
      { url: 'we-dolbomi_1.png', name: 'daily' },
      { url: 'we-dolbomi_2.png', name: 'daily' },
      { url: 'we-dolbomi_3.png', name: 'daily' },
      { url: 'we-dolbomi_4.png', name: 'daily' },
      { url: 'we-dolbomi_5.png', name: 'daily' },
      { url: 'we-dolbomi_6.png', name: 'daily' },
      { url: 'we-dolbomi_7.png', name: 'daily' },
      { url: 'we-dolbomi_8.png', name: 'daily' },
      { url: 'we-dolbomi_9.png', name: 'daily' },
      { url: 'we-dolbomi_10.png', name: 'daily' },
      { url: 'we-dolbomi_11.png', name: 'daily' },
      { url: 'we-dolbomi_12.png', name: 'daily' },
      { url: 'we-dolbomi_13.png', name: 'daily' },
    ],
    company: 'futuresolution',
  },
  {
    id: 'lmedrp',
    title: 'LMEDRP',
    periodStart: '2024-06',
    periodEnd: '2024-08',
    site: 'https://lmedrp.com',
    filter: [tag('team'), tag('feature'), tag('FE')],
    description: '스튜디오 스케줄 및 촬영 관리 EDRP 시스템입니다.',
    feature: [
      '각 지점별 촬영 일정을 일/월별로 한눈에 볼 수 있는 캘린더 기능 제공',
      '사용자의 상세 정보와 촬영 일정, 계약 정보를 한 페이지에서 확인 가능',
      '다양한 촬영 상품 관리 기능 제공',
      '문자 발송 템플릿 관리 및 설정 기능 제공',
    ],
    contribution: [
      {
        title: '',
        desc: ['API 통신 : Context 및 Ajax 활용'],
      },
      {
        title: '일/월 스케줄 리뉴얼 및 신규 기능 구현',
        desc: [
          '기존 코드의 중복된 부분을 함수화하여 가독성 개선',
          '스케줄 상태 및 일정 항목별 색상 우선순위 규칙 적용',
          '세부 필터 기능 제공으로 필요한 일정 조회 가능',
          '마우스 hover 시 메모 확인 가능',
          '상단에서 스케줄에 포함된 촬영 상품 확인 가능',
        ],
      },
      {
        title: '이미지, 파일 업로드 및 다운로드 기능 구현',
        desc: [
          'Chunk 방식을 이용해 다중 업로드 기능을 구현하여 업로드 속도 향상',
          '기능 동작 시 프로그래스 바를 구현해 진행도를 확인 할 수 있게 기능 개선',
          '이미지, 영상일 경우 미리보기가 가능하도록 구현',
        ],
      },
      {
        title: '계약 상세 상품 관리, 결제 내역 페이지 신규 개발',
        desc: [
          '촬영 계약별 상세 상품 관리 페이지 구현',
          '실시간으로 적용될 금액을 확인할 수 있는 계산 기능 구현',
          '상품 중복 추가 기능 구현',
          '지점별 결제 내역 및 잔여 혜택 내역 조회 페이지 구현',
        ],
      },
    ],
    skillItem: [S.js, S.jsp, S.django, S.mysql],
    thumb: 'lmedrp.png',
    images: [
      { url: 'lmedrp_1.png', name: 'daily' },
      { url: 'lmedrp_2.png', name: 'monthly' },
      { url: 'lmedrp_3.png', name: 'product' },
      { url: 'lmedrp_4.png', name: 'upload' },
      { url: 'lmedrp_5.png', name: 'preview' },
    ],
    company: 'luvmom',
  },
  {
    id: 'portfolio',
    title: 'Portfolio',
    periodStart: '2024-10',
    git: 'https://github.com/HwajinLee3114/lhjin-portfolio',
    site: 'https://lhjin-portfolio.vercel.app/',
    filter: [tag('personal'), tag('feature'), tag('FE')],
    description:
      'Next.js, TypeScript를 활용하여 지금까지 진행했던 프로젝트와 사용 기술 스택을 한눈에 볼 수 있는 포트폴리오 사이트를 구현하였습니다.\n앞으로도 지속적으로 발전하는 모습을 반영해 나갈 예정입니다.',
    feature: [
      'TailwindCSS를 사용하여 간결하고 일관된 스타일링 코드를 구현하고 반응형 적용',
      '메인 화면에 타이핑 효과를 적용하여 시각적 효과 제공',
      'Framer Motion을 활용하여 스크롤 시 노출 효과 구현',
      'Vercel 배포를 통한 CI/CD 자동화',
    ],
    contribution: [],
    skillItem: [S.next, S.ts, S.tailwind, S.vercel],
    thumb: 'portfolio.png',
    images: [
      { url: 'portfolio_1.png', name: 'main' },
      { url: 'portfolio_2.png', name: 'about' },
      { url: 'portfolio_3.png', name: 'skills' },
      { url: 'portfolio_4.png', name: 'projects' },
      { url: 'portfolio_5.png', name: 'career' },
    ],
  },
  {
    id: 'banya-log',
    title: '기록해',
    periodStart: '2026-01',
    filter: [tag('personal'), tag('feature'), tag('FE')],
    description:
      '독서, 영화, 시리즈, 메모, 북마크, 캐릭터, 스탬프 등 다양한 콘텐츠를 종합 관리하는 개인 일상 기록 PWA 앱입니다.',
    feature: [
      '캘린더 기반 일일 로깅 및 루틴/습관 트래커',
      '독서/영화/시리즈 콘텐츠 통합 관리 및 세션 기록',
      '마크다운 메모, 웹 북마크 OG 자동 스크랩',
      '캐릭터 프로필 관리 및 카드 이미지/PDF 내보내기',
      '스탬프북 수집 및 방문 기록 관리',
    ],
    contribution: [
      {
        title: 'Supabase Edge Functions 활용 서버리스 아키텍처 구축',
        desc: [
          'Kakao Book API, TMDB API 프록시를 Edge Function으로 구현하여 API 키 노출 없이 안전한 외부 API 연동',
          'OG 메타데이터 스크래핑 Edge Function 구현 (Twitter/X 미디어 추출, favicon 폴백 처리)',
          '서비스 롤 기반 계정 삭제 Edge Function으로 보안 요구사항 충족',
        ],
      },
      {
        title: '오프라인 대응 및 데이터 동기화',
        desc: [
          '오프라인 mutation 큐를 구현하여 네트워크 불안정 시에도 데이터 유실 없는 optimistic update 처리',
          'Supabase 실시간 구독과 로컬 상태를 연동한 라이브 싱크 구현',
        ],
      },
      {
        title: 'PWA 및 네이티브 앱 경험 구현',
        desc: [
          'Web Share Target API로 OS 공유 메뉴에서 바로 북마크 등록 가능',
          'Web Manifest 및 Splash Screen 구성으로 네이티브 앱에 준하는 사용 경험 제공',
        ],
      },
      {
        title: '성능 최적화 및 코드 품질',
        desc: [
          'React.lazy 기반 라우트별 코드 스플리팅으로 초기 로딩 최적화',
          'Zod 스키마로 DB 응답 런타임 검증 및 타입 안전성 확보',
          '60+ SQL 마이그레이션으로 체계적인 DB 스키마 버전 관리',
        ],
      },
    ],
    skillItem: [S.react, S.ts, S.vite, S.tailwind, S.supabase, S.zod, S.framerMotion],
    thumb: '',
    images: [],
  },
  // {
  //   id: 'carsayo-homepage',
  //   title: '카사요 홈페이지',
  //   periodStart: '2024-12',
  //   site: 'https://carsayo.net/',
  //   filter: [tag('team'), tag('FE')],
  //   description:
  //     '신차 장기렌트/리스, 내 차 팔기, 사고수리, 다이렉트 보험 등 자동차 통합 서비스를 소개하는 카사요 메인 홈페이지입니다.',
  //   feature: [
  //     '히어로 비디오 배너 및 빠른 상담 요청 모달',
  //     '즉시출고 차량 카드 캐러셀 (반응형 디바이스별 노출 수 조정)',
  //     '장기렌트/리스 브랜드별 차량 필터링 및 페이지네이션',
  //     '복지몰 전용 주문 페이지 (차종 선택, 견적 산출, 파일 업로드)',
  //     '뉴스/인증 섹션 듀얼 캐러셀 (자동재생 + 일시정지 토글)',
  //     'Google Tag Manager 연동 및 Schema.org 구조화 데이터',
  //   ],
  //   contribution: [
  //     {
  //       title: '반응형 디자인 시스템 구축',
  //       desc: [
  //         '5단계 커스텀 브레이크포인트(micro/mobile/tablet/wide-tablet/pc) 설계 및 Tailwind 확장',
  //         'useDisplayMode 훅으로 뷰포트 변화에 따른 동적 UI 제어',
  //       ],
  //     },
  //     {
  //       title: '빠른 상담 요청 모달 구현',
  //       desc: [
  //         'React Portal 기반 모달, 전화번호 포맷팅 및 실시간 폼 검증',
  //         'API 연동으로 즉시출고/장기렌트/리스 유형별 빠른 견적 요청',
  //       ],
  //     },
  //     {
  //       title: '차량 카드 컴포넌트 및 인터랙션',
  //       desc: [
  //         '계약 기간(12~84개월), 보증금 옵션 선택에 따른 동적 가격 표시',
  //         '호버 애니메이션, 지연 로딩 이미지, 반응형 레이아웃',
  //       ],
  //     },
  //     {
  //       title: '복지몰 전용 주문 페이지 개발',
  //       desc: [
  //         '렌트/리스 탭 전환, 차종 선택 모달, 지역 선택 드로어',
  //         'Zod 스키마 검증, 파일 업로드, 약관 아코디언, 견적 산출 폼',
  //       ],
  //     },
  //     {
  //       title: 'SEO 및 메타데이터 최적화',
  //       desc: [
  //         'OpenGraph, Twitter Card, Schema.org Organization JSON-LD 구조화 데이터',
  //         '미들웨어를 통한 UTM 리다이렉트 및 IP 포워딩 처리',
  //       ],
  //     },
  //   ],
  //   skillItem: [S.next, S.ts, S.tailwind, S.zustand, S.reactQuery, S.framerMotion, S.zod],
  //   thumb: '',
  //   images: [],
  //   company: 'carsayo',
  // },
  // {
  //   id: 'carsayo-app',
  //   title: '카사요 앱',
  //   periodStart: '2024-12',
  //   site: 'https://app.carsayo.net/main',
  //   android: 'https://play.google.com/store/apps/details?id=com.ksapp.carsayo&hl=ko',
  //   ios: 'https://apps.apple.com/kr/app/%EC%B9%B4%EC%82%AC%EC%9A%94-%EC%8B%A0%EC%B0%A8-%EC%9E%A5%EA%B8%B0%EB%A0%8C%ED%8A%B8-%EB%A6%AC%EC%8A%A4-%EB%82%B4%EC%B0%A8%ED%8C%94%EA%B8%B0-%EC%82%AC%EA%B3%A0%EC%88%98%EB%A6%AC/id1546852990',
  //   filter: [tag('team'), tag('feature'), tag('FE')],
  //   description:
  //     '신차 장기렌트/리스 주문, 내 차 팔기, 사고수리 접수 등 자동차 관련 서비스를 통합 제공하는 하이브리드 모바일 앱입니다.',
  //   feature: [
  //     '신차 장기렌트/리스 멀티스텝 주문 위저드 (브랜드→모델→트림→색상→옵션→결제)',
  //     '내 차 팔기 위저드 (번호판 조회→차량 정보→상태→사고이력→사진 업로드)',
  //     '사고수리 접수 및 정비소 검색 (카카오맵 연동, 거리 계산)',
  //     'Socket.io 기반 실시간 채팅 (파일 첨부, 차단, 알림 설정)',
  //     'Toss Payments 결제 연동 (카드, 가상계좌, 환불 처리)',
  //     'FCM 푸시 알림 (네이티브 브릿지 연동)',
  //     'PWA + Service Worker 오프라인 캐싱 지원',
  //   ],
  //   contribution: [
  //     {
  //       title: '멀티스텝 폼 위저드 구현',
  //       desc: [
  //         'React Hook Form + Zod로 각 단계별 스키마 검증',
  //         'Framer Motion 탭 전환 애니메이션, 진행 상태 인디케이터',
  //         '외부 차량 DB(Coocon API) 연동으로 번호판 기반 차량 정보 자동 조회',
  //       ],
  //     },
  //     {
  //       title: '실시간 채팅 시스템 구축',
  //       desc: [
  //         'Socket.io 클라이언트로 메시지 송수신, 파일 첨부(S3 Presigned URL)',
  //         '채팅방 관리(생성/퇴장/차단), 온라인 상태 추적, 알림 설정',
  //         'React Query 캐시와 소켓 이벤트 연동으로 실시간 UI 갱신',
  //       ],
  //     },
  //     {
  //       title: '하이브리드 네이티브 브릿지 개발',
  //       desc: [
  //         'Android WebView / iOS WKWebView 브릿지 인터페이스 구현',
  //         '네이티브 이미지 피커 연동 (Android: localhost URL, iOS: Base64 청크 전송)',
  //         '위치 서비스, FCM 토큰 등록, 백 버튼 핸들링, 딥링크 네비게이션',
  //       ],
  //     },
  //     {
  //       title: '결제 시스템 연동',
  //       desc: [
  //         'Toss Payments SDK 위젯 통합, 결제 요청/성공/실패 플로우',
  //         '주문 코드 생성, 환불 처리(가상계좌 포함), 결제 상태 관리',
  //       ],
  //     },
  //     {
  //       title: '이미지 처리 파이프라인',
  //       desc: [
  //         'CropperJS 기반 이미지 크롭, browser-image-compression으로 클라이언트 사이드 압축',
  //         'S3 Presigned URL 업로드, 파일 크기 검증(20MB), 진행 상태 토스트',
  //       ],
  //     },
  //     {
  //       title: 'iOS/Android 네이티브 기능 구현 및 앱 패키징',
  //       desc: [
  //         '소셜 로그인 4종(카카오/네이버/구글/애플) iOS 네이티브 OAuth 연동',
  //         'FCM 푸시 알림 (APNs 토큰 등록, 포그라운드 알림, 딥링크 네비게이션)',
  //         '다중 이미지 피커 (최대 5장, HEIC→JPEG 변환, 2MB 청크 Base64 전송)',
  //         'CLLocationManager 위치 서비스, Socket.IO 네이티브 실시간 연동',
  //         'Live Activities (iOS 16.1+ Dynamic Island) 지원',
  //         '결제 앱 스킴 등록 (토스, KB, NH, 롯데, 신한 등), Universal Links 딥링크',
  //         'PWA manifest 및 Workbox Service Worker 캐싱 전략 설정',
  //       ],
  //     },
  //   ],
  //   skillItem: [
  //     S.react,
  //     S.ts,
  //     S.vite,
  //     S.tailwind,
  //     S.mui,
  //     S.zustand,
  //     S.reactQuery,
  //     S.socketio,
  //     S.tosspayments,
  //     S.zod,
  //   ],
  //   thumb: '',
  //   images: [],
  //   company: 'carsayo',
  // },
  // {
  //   id: 'carsayo-auction',
  //   title: '카사요 중고차 딜러',
  //   periodStart: '2024-12',
  //   site: 'https://auction.carsayo.net/login',
  //   android:
  //     'https://apps.apple.com/vn/app/%EC%B9%B4%EC%82%AC%EC%9A%94-%EC%A4%91%EA%B3%A0%EC%B0%A8-%EB%94%9C%EB%9F%AC%EC%9A%A9-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EC%A4%91%EA%B3%A0%EC%B0%A8-%EB%A7%A4%EC%9E%85/id6749133052',
  //   ios: 'https://apps.apple.com/vn/app/%EC%B9%B4%EC%82%AC%EC%9A%94-%EC%A4%91%EA%B3%A0%EC%B0%A8-%EB%94%9C%EB%9F%AC%EC%9A%A9-%EC%98%A8%EB%9D%BC%EC%9D%B8-%EC%A4%91%EA%B3%A0%EC%B0%A8-%EB%A7%A4%EC%9E%85/id6749133052',
  //   filter: [tag('team'), tag('feature'), tag('FE')],
  //   description: '중고차 딜러가 매물에 입찰하고 거래를 관리하는 B2B 온라인 경매 플랫폼입니다.',
  //   feature: [
  //     '경매 매물 리스트 및 무한 스크롤 페이지네이션',
  //     '실시간 입찰 시스템 (잔여 시간 표시, 입찰가 입력, 허위입찰 페널티)',
  //     '거래 관리 플로우 (낙찰→검수→탁송→완료→정산)',
  //     'Socket.io 기반 실시간 채팅',
  //     'Toss Payments 페널티 결제 연동',
  //     '시세 조회 페이지 (브랜드별 매입가 참고 차트)',
  //   ],
  //   contribution: [
  //     {
  //       title: '경매/입찰 UI 구현',
  //       desc: [
  //         'useInfiniteQuery 기반 무한 스크롤 매물 리스트 (100건 단위 페이지네이션)',
  //         '매물 카드 컴포넌트 (북마크, 방식 태그, 차량 이미지 캐러셀)',
  //         '입찰가 입력 모달 (수수료 안내, 허위입찰 경고 정책, 페널티 결제 플로우)',
  //       ],
  //     },
  //     {
  //       title: '거래 상태 관리 시스템',
  //       desc: [
  //         '거래 단계별 카드 컴포넌트 (매입 승인, 검수, 탁송, 완료, 정산)',
  //         '단계별 문서 업로드 및 영수증 생성',
  //         'Zustand persist로 필터/탭 상태 세션 유지',
  //       ],
  //     },
  //     {
  //       title: '실시간 채팅 및 알림',
  //       desc: [
  //         'Socket.io 기반 딜러-플랫폼 간 실시간 메시지',
  //         '채팅방 관리, 온라인 사용자 추적, 알림 토글',
  //       ],
  //     },
  //     {
  //       title: '반응형 PC/모바일 분기',
  //       desc: [
  //         '미들웨어 기반 디바이스 감지로 /m 경로 자동 리다이렉트',
  //         'PC/모바일 별도 레이아웃 및 네비바/탭바 컴포넌트',
  //       ],
  //     },
  //   ],
  //   skillItem: [
  //     S.next,
  //     S.ts,
  //     S.tailwind,
  //     S.mui,
  //     S.zustand,
  //     S.reactQuery,
  //     S.socketio,
  //     S.tosspayments,
  //     S.recharts,
  //     S.zod,
  //   ],
  //   thumb: '',
  //   images: [],
  //   company: 'carsayo',
  // },
  // {
  //   id: 'carsayo-insurance-homepage',
  //   title: '카사요 인슈어런스 홈페이지',
  //   periodStart: '2024-12',
  //   site: 'https://carsayo.insure/',
  //   filter: [tag('team'), tag('feature'), tag('FE')],
  //   description:
  //     '자동차 다이렉트 보험 비교 및 가입 서비스와 기업 복지몰(현대이지웰, 이제너두, 비즈마켓) 연동 상담 플랫폼입니다.',
  //   feature: [
  //     '개인/법인 보험 상담 신청 폼 (전화번호/사업자번호 포맷팅, 약관 동의)',
  //     '보험료 비교 결과 페이지 (주민번호 앞자리 인증 후 보험사별 견적 비교)',
  //     'SMS 기반 추가 정보 수집 폼 (보안 키패드, 주민번호 RSA 암호화)',
  //     '복지몰 파트너별 OAuth2 토큰 플로우 및 상담 등록 서버 액션',
  //     'Notion CMS 연동 FAQ 및 약관 콘텐츠',
  //     'ISR(Incremental Static Regeneration) 적용 (300초 revalidation)',
  //   ],
  //   contribution: [
  //     {
  //       title: '보험 상담 폼 시스템 구현',
  //       desc: [
  //         '개인/법인 탭 전환, 전화번호·사업자번호 실시간 포맷팅',
  //         'React Hook Form + Zod 스키마 검증, 약관 동의 모달',
  //       ],
  //     },
  //     {
  //       title: '복지몰 OAuth2 연동 서버 액션 개발',
  //       desc: [
  //         '파트너별(현대이지웰/이제너두/비즈마켓) OAuth2 토큰 발급 및 인메모리 캐싱',
  //         '고객 조회/생성 API 연동, 상담 등록 자동화, 401 토큰 만료 시 재발급 리트라이',
  //       ],
  //     },
  //     {
  //       title: '보험 견적 비교 페이지 구현',
  //       desc: [
  //         '주민번호 앞자리 인증 후 보험사별 견적 비교 테이블',
  //         '보장 상세 드로어, 할인 분류, 가입 링크(웹/모바일 분기)',
  //       ],
  //     },
  //     {
  //       title: 'SMS 추가 정보 수집 폼',
  //       desc: [
  //         '랜덤 배열 보안 키패드로 주민번호 입력, RSA-OAEP 공개키 암호화 전송',
  //         '3단계 약관 동의(수집/제3자 제공/마케팅) 아코디언 with Notion 렌더링',
  //       ],
  //     },
  //     {
  //       title: 'PC/모바일 분리 레이아웃 및 ISR 최적화',
  //       desc: [
  //         '디바이스 감지 후 PC/모바일 경로 자동 분기',
  //         'FAQ, 롤링 이미지 등 ISR 적용으로 빌드 없이 콘텐츠 갱신',
  //       ],
  //     },
  //   ],
  //   skillItem: [S.next, S.ts, S.tailwind, S.mui, S.reactQuery, S.zustand, S.reactHookForm, S.zod],
  //   thumb: '',
  //   images: [],
  //   company: 'carsayo',
  // },
  // {
  //   id: 'carsayo-insurance-app',
  //   title: '카사요 인슈어런스 앱',
  //   periodStart: '2024-12',
  //   site: 'https://app.carsayo.insure',
  //   android: 'https://play.google.com/store/apps/details?id=com.carsayo.insurance&hl=ko',
  //   ios: 'https://apps.apple.com/kr/app/%EC%B9%B4%EC%82%AC%EC%9A%94-%EC%9D%B8%EC%8A%88%EC%96%B4%EB%9F%B0%EC%8A%A4-%EC%B9%B4%EB%A7%A4%EB%8B%88%EC%A0%80-%EB%B0%8F-%EC%84%A4%EA%B3%84%EC%82%AC-%EC%A0%84%EC%9A%A9/id6740797750',
  //   filter: [tag('team'), tag('feature'), tag('FE')],
  //   description:
  //     '보험 설계사 및 카매니저 전용 고객 관리, 계약 추적, 정산 관리 하이브리드 모바일 앱입니다.',
  //   feature: [
  //     '고객 관리 (등록/수정, 디바이스 연락처 일괄 가져오기, 메모)',
  //     '보험 계약 관리 (월별 캘린더 뷰, 상태 필터링, 정산 정보 추적)',
  //     '빠른 계약 등록 (정산 계좌 RSA 암호화 전송)',
  //     'FCM 푸시 알림 (네이티브 브릿지, 딥링크, 뱃지 카운트 실시간 갱신)',
  //     'NICE 본인인증 연동 회원가입/로그인',
  //     'Pull-to-Refresh 및 무한 스크롤 페이지네이션',
  //     '네이티브 카메라 연동 (카드/A4 문서 촬영 모드)',
  //   ],
  //   contribution: [
  //     {
  //       title: '고객 관리 시스템 구현',
  //       desc: [
  //         '고객 CRUD(개인/법인/영업) 및 검색/정렬 기능',
  //         '네이티브 브릿지를 통한 디바이스 연락처 일괄 가져오기 (Android/iOS)',
  //         'useInfiniteQuery 기반 무한 스크롤 고객 목록',
  //       ],
  //     },
  //     {
  //       title: '계약 관리 및 정산 페이지',
  //       desc: [
  //         '월별 캘린더 뷰(WheelMonthPicker), 상태별 필터링',
  //         '정산 예정 금액 표시, 계약 리스트 무한 스크롤 + Pull-to-Refresh',
  //       ],
  //     },
  //     {
  //       title: '보안 결제 정보 전송',
  //       desc: [
  //         'RSA-OAEP SHA-512 클라이언트 사이드 암호화(WebCrypto API)',
  //         'iOS WebView 호환 서버 사이드 암호화 폴백, 정산 계좌 입력 폼',
  //       ],
  //     },
  //     {
  //       title: '하이브리드 네이티브 브릿지 개발',
  //       desc: [
  //         'Android/iOS 네이티브 카메라 연동 (카드/A4 촬영 모드, Base64 변환)',
  //         'FCM 토큰 등록/관리, 푸시 알림 딥링크 파싱',
  //         '앱 라이프사이클(onResume) 콜백으로 데이터 갱신',
  //       ],
  //     },
  //     {
  //       title: '인증 및 세션 관리',
  //       desc: [
  //         'NICE 본인인증 연동 회원가입',
  //         'accessToken 쿠키 + Zustand persist 이중 저장, 401 글로벌 인터셉터 자동 로그아웃',
  //       ],
  //     },
  //     {
  //       title: 'iOS/Android 네이티브 기능 구현 및 앱 패키징',
  //       desc: [
  //         '커스텀 카메라 구현 (AVCaptureSession 기반 카드/A4 문서 촬영 모드, 오버레이 가이드, 자동 크롭)',
  //         'FCM 푸시 알림 (APNs, 포그라운드 알림, 딥링크 네비게이션)',
  //         '디바이스 연락처 가져오기 (CNContactStore, 권한 핸들링)',
  //         'Next.js standalone Docker 빌드 기반 배포',
  //       ],
  //     },
  //   ],
  //   skillItem: [S.next, S.ts, S.tailwind, S.mui, S.zustand, S.reactQuery, S.reactHookForm, S.zod],
  //   thumb: '',
  //   images: [],
  //   company: 'carsayo',
  // },

  // {
  //   id: 'blog',
  //   title: 'Blog',
  //   periodStart: '2024-10',
  //   git: 'https://github.com/HwajinLee3114/lhjin-blog',
  //   site: 'https://lhjin-blog.vercel.app/',
  //   filter: [tag('personal'), tag('FE')],
  //   description:
  //     'Next.js, TypeScript를 활용하여 개인 블로그를 구현하고 있습니다.\n기술 학습 및 아카이빙 용도의 개인 블로그',
  //   feature: [
  //     'React v18, Next.js v14 적용',
  //     'Styled-Component의 ThemeProvider를 이용하여 다크/라이트/커스텀 모드 구현',
  //     'TailwindCSS를 사용하여 간결하고 일관된 스타일링 코드를 구현하고 반응형 적용',
  //     'Vercel 배포를 통한 CI/CD 자동화',
  //     'GitHub Actions를 통해 master merge 시 ESLint 확인',
  //     'zustand로 블로그에 필요한 정보  관리',
  //   ],
  //   contribution: [],
  //   skillItem: [S.next, S.ts, S.tailwind, S.vercel, S.styledComponents, S.zustand],
  //   thumb: 'blog.png',
  //   images: [
  //     { url: 'blog_1.png', name: 'blog_light' },
  //     { url: 'blog_2.png', name: 'blog_custom' },
  //   ],
  // },
  // {
  //   id: 'myplanit',
  //   title: 'MyPlanIt',
  //   periodStart: '2024-11',
  //   git: 'https://github.com/HwajinLee3114/myit',
  //   site: 'https://myit-lhjins-projects.vercel.app/',
  //   filter: [tag('personal'), tag('feature'), tag('FE')],
  //   description:
  //     'React.js, TypeScript를 활용하여 오늘 하루 일정을 정리하여 이미지로 내보낼 수 있습니다.',
  //   feature: [
  //     'html2canvas를 사용하여 간편한 이미지 내보내기 기능 구현',
  //     'TailwindCSS를 사용하여 간결하고 일관된 스타일링 코드를 구현하고 반응형 적용',
  //     'Vercel 배포를 통한 CI/CD 자동화',
  //   ],
  //   contribution: [],
  //   skillItem: [S.react, S.ts, S.tailwind, S.vercel],
  //   thumb: 'myplanit.png',
  //   images: [
  //     { url: 'myplanit_1.png', name: 'main' },
  //     { url: 'myplanit_2.png', name: 'creat_todo' },
  //     { url: 'myplanit_3.png', name: 'todo_list' },
  //     { url: 'myplanit_4.png', name: 'export_image' },
  //   ],
  // },
]

export const projects = z.array(ProjectSchema).parse(projectsData)

export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id)
}

export const getProjectsByCompany = (companyId: string) => {
  return projects.filter((p) => p.company === companyId)
}
