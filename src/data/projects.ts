export interface Image {
  id: string;
  url: string;
  name: string;
}

export interface SkillItem {
  id: string;
  name: string;
  url: string;
}

export interface Contribution {
  id: string;
  title: string;
  desc: string[];
}

export interface Project {
  id: string;
  title: string;
  period: string;
  git: string;
  site: string;
  filter: { name: string; color: string }[];
  description: string;
  feature: string[];
  contribution: Contribution[];
  skillItem: SkillItem[];
  thumb: string;
  images: Image[];
}

export const projects: Project[] = [
  {
    id: '1',
    title: "KT GiGA Live CMS",
    period: "2024.10 ~ 2024.11",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "풀스택", color: "tomato" },
    ],
    description: "VR 계열사 및 관리자들이 콘텐츠와 서비스를 관리하는 CMS입니다.",
    feature: [
      'VR의 카테고리와 카테고리별 콘텐츠를 관리',
      'VR 제공 계열사 관리',
    ],
    contribution: [
      {
        id: '1',
        title: 'VR 계열사 및 관리자 콘텐츠 관리 사이트 유지보수 및 신규 페이지 개발',
        desc: [
          '콘텐츠 관리 페이지 유지 보수 및 신규 기능 추가',
          '검색 키워드 관리, 앱 버전 관리 신규 개발'
        ]
      },
    ],
    skillItem: [
      { id: "0", name: "전자정부프레임워크", url: "" },
      { id: "1", name: "Java", url: "java-100.png" },
      { id: "2", name: "Spring", url: "spring-100.png" },
      { id: "3", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "4", name: "PostgreSQL", url: "postgreesql-100.png" },
    ],
    thumb: 'pj1.png',
    images: [],
  },
  {
    id: '2',
    title: "분양이부장",
    period: "2021.05 ~ 2022.05",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "풀스택", color: "tomato" },
    ],
    description: "전국 아파트 분양 정보를 알고 싶은 사용자, 지역별 분양 정보를 등록하고 홍보 및 구인 활동을 원하는 관계자,\n관련 분야에서 구직 중인 사용자들이 이용할 수 있는 서비스입니다.",
    feature: [
      '사용자 위치 정보를 기반으로 인근의 아파트 분양 정보를 조회하는 기능 제공',
      '아파트 분양 시 견적서를 생성하고, 직급에 따른 수수료를 계산할 수 있는 서비스 제공',
      '구인 게시판을 통해 사용자가 즉시 서류를 제출할 수 있어, 효율적인 구직 활동을 지원',
      '지역별 아파트 분양 정보를 등록하고, 사용자가 설정한 지역에 대한 알림을 발송하며, 엑셀 파일을 통한 정보 업로드 기능을 지원',
      '관계자가 등록한 분양 정보와 공공 API에서 제공하는 정보를 지도에 마커로 표시',
      '전단지 및 브로슈어를 등록하여 홍보할 수 있으며, 사용자에게 첨부 파일 다운로드 기능을 제공',
    ],
    contribution: [
      {
        id: '1',
        title: '전체적인 페이지 프론트엔드 화면 및 기능 구현과 백엔드 오류 유지보수를 맡았습니다.',
        desc: [
          'Access Token을 함께 전송하여 보안 강화',
          '문자 발송 시스템을 연동해 인증번호 기능 구현',
          '카카오맵, 청약 분양 정보 조회 공공 API를 연동해 분양 정보 지도 표시 및 상세 정보 조회 구현',
          '파일 업로드, 다운로드 기능 구현',
          '견적서, 수수료 계산 시 항목별 계산 함수 구현 및 적용',
        ]
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: 'pj2.png',
    images: [
      { id: "1", url: "2_1.png", name: "daily" },
      { id: "2", url: "2_2.png", name: "daily" },
      { id: "3", url: "2_3.png", name: "daily" },
      { id: "4", url: "2_4.png", name: "daily" },
      { id: "5", url: "2_5.png", name: "daily" },
      { id: "6", url: "2_6.png", name: "daily" },
      { id: "7", url: "2_7.png", name: "daily" },
      { id: "8", url: "2_8.png", name: "daily" },
      { id: "9", url: "2_9.png", name: "daily" },
      { id: "10", url: "2_10.png", name: "daily" },
      { id: "11", url: "2_11.png", name: "daily" },
      { id: "12", url: "2_12.png", name: "daily" },
      { id: "13", url: "2_13.png", name: "daily" },
      { id: "14", url: "2_14.png", name: "daily" },

    ],
  },
  {
    id: '3',
    title: "Pleisure",
    period: "2021.05 ~ 2022.02",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "FE", color: "lightgreen" },
    ],
    description: "운동 매칭 시스템 코치 웹앱",
    feature: [
    ],
    contribution: [
      {
        id: '1',
        title: '',
        desc: [
          '레슨 결제 시스템 연동 처리',
          '카카오톡 링크 공유 기능 구현',
          '개인 코치 및 팀 별 레슨 스케줄 캘린더 작업',
          '팀, 코치, 코치별 레슨 및 팀원 관리 페이지 개발',
        ]
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: 'pj3.png',
    images: [
      { id: "1", url: "3_1.png", name: "daily" },
      { id: "2", url: "3_2.png", name: "daily" },
      { id: "3", url: "3_3.png", name: "daily" },
      { id: "4", url: "3_4.png", name: "daily" },
      { id: "5", url: "3_5.png", name: "daily" },
      { id: "6", url: "3_6.png", name: "daily" },
      { id: "7", url: "3_7.png", name: "daily" },
      { id: "8", url: "3_8.png", name: "daily" },
      { id: "9", url: "3_9.png", name: "daily" },
      { id: "10", url: "3_10.png", name: "daily" },
      { id: "11", url: "3_11.png", name: "daily" },

    ],
  },
  {
    id: '4',
    title: "Digital Real Trip(DRT)",
    period: "2021.10 ~ 2021.12, 2022.04 ~ 2022.09",
    git: "",
    site: "https://www.djes.co.kr",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "FE", color: "lightgreen" },
      { name: "BE", color: "coral" },
    ],
    description: "체험형 게임 사용자 웹앱, 관리자 페이지",
    feature: [
    ],
    contribution: [
      {
        id: '1',
        title: '',
        desc: [
          'SMS 및 LMS 이미지 발송 처리',
          '카카오, 네이버 SNS 로그인 처리',
          '게임별 BGM 제어 및 플레이 시간 기록',
          '관리자 페이지 유지 보수 및 오류, 진행 사항 관리',
        ]
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: 'pj4.png',
    images: [
      { id: "1", url: "4_1.png", name: "daily" },
      { id: "2", url: "4_2.png", name: "daily" },
      { id: "3", url: "4_3.png", name: "daily" },
      { id: "4", url: "4_4.png", name: "daily" },
      { id: "5", url: "4_5.png", name: "daily" },
      { id: "6", url: "4_6.png", name: "daily" },
      { id: "7", url: "4_7.png", name: "daily" },
      { id: "8", url: "4_8.png", name: "daily" },
    ],
  },
  {
    id: '5',
    title: "너의 운동은",
    period: "2022.02 ~ 2022.04",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "FE", color: "lightgreen" },
      { name: "BE", color: "coral" },
    ],
    description: "운동 기록 플랫폼",
    feature: [
    ],
    contribution: [
      {
        id: '1',
        title: '',
        desc: [
          '카카오 및 네이버 SNS 로그인 처리',
          '신체 정보 요약 출력 (BMI, 체지방률)',
          '운동별 커뮤니티 글쓰기 및 댓글 기능 처리',
          '운동 관련 설문조사 및 체력 측정 데이터 차트 캘린더 출력',
        ]
      },
    ],
    skillItem: [
      { id: "1", name: "React", url: "react-100.png" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: 'pj5.png',
    images: [
      { id: "1", url: "5_1.png", name: "daily" },
      { id: "2", url: "5_2.png", name: "daily" },
      { id: "3", url: "5_3.png", name: "daily" },
      { id: "4", url: "5_4.png", name: "daily" },
      { id: "5", url: "5_5.png", name: "daily" },
      { id: "6", url: "5_6.png", name: "daily" },
      { id: "7", url: "5_7.png", name: "daily" },
      { id: "8", url: "5_8.png", name: "daily" },
      { id: "9", url: "5_9.png", name: "daily" },
    ],
  },
  {
    id: '6',
    title: "포켓데이터",
    period: "2022.02 ~ 2022.04",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "FE", color: "lightgreen" },
    ],
    description: "입찰 정보, 지원 사업, 스타트업 정보 조회 사이트",
    feature: [
    ],
    contribution: [
      {
        id: '1',
        title: '',
        desc: [
          '소셜 링크 공유 기능 처리',
          '카카오톡 및 네이버 SNS 로그인 처리',
          '로그인 여부에 따른 페이지 출력 정보 분기 처리',
          '회원 정보, 문의하기, 공지사항 페이지 작업 및 공공 데이터 연동',
        ]
      },
    ],
    skillItem: [
      { id: "1", name: "React", url: "react-100.png" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: 'pj6.png',
    images: [
      { id: "1", url: "6_1.png", name: "daily" },
      { id: "2", url: "6_2.png", name: "daily" },
      { id: "3", url: "6_3.png", name: "daily" },
      { id: "4", url: "6_4.png", name: "daily" },
      { id: "5", url: "6_5.png", name: "daily" },
    ],
  },
  {
    id: '7',
    title: "면세점 사이트",
    period: "2022.09 ~ 2023.07",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "풀스택", color: "tomato" },
    ],
    description: "면세 상품 및 점포 관리자, 사용자 페이지",
    feature: [
    ],
    contribution: [
      {
        id: '1',
        title: '',
        desc: [
          '입금, 결제 수단 관리 및 프로모션 이력 페이지 신규 작업',
          '사용자 장바구니 및 이벤트 페이지 유지보수 및 신규 기능 작업',
          '면세 카테고리, 브랜드, 상품 정보 제공 고시 관리 페이지 유지보수 및 신규 작업',
        ]
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "React", url: "react-100.png" },
      { id: "3", name: "Java", url: "java-100.png" },
      { id: "4", name: "Spring", url: "spring-100.png" },
      { id: "5", name: "Oracle", url: "oracle-100.png" },
    ],
    thumb: 'pj7.png',
    images: [
      // { id: "1", url: "", name: "" },
    ],
  },
  {
    id: '8',
    title: "링크오더",
    period: "2023.08 ~ 2024.03",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "FE", color: "lightgreen" },
    ],
    description: "지역 소상공인을 위한 상품 판매 및 배송 관리 플랫폼",
    feature: [
    ],
    contribution: [
      {
        id: '1',
        title: '',
        desc: [
          '사용자 및 점포 관리자 웹앱 프론트엔드 구현',
          '결제 시스템 및 카카오톡 링크 공유, 문자 발송 기능 연동',
          '점포 등록 시 사업자 등록 번호 유효성 체크 및 점포 직원 권함별 분기 처리',
          '점포 승인 및 직원 입사 관리, 판매 링크 관리, 배달 준비 및 배송 페이지 구현',
        ]
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MariaDB", url: "maria-100.png" },
    ],
    thumb: 'pj8.png',
    images: [
      { id: "1", url: "8_1.png", name: "daily" },
      { id: "2", url: "8_2.png", name: "daily" },
      { id: "3", url: "8_3.png", name: "daily" },
      { id: "4", url: "8_4.png", name: "daily" },
      { id: "5", url: "8_5.png", name: "daily" },
      { id: "6", url: "8_6.png", name: "daily" },
      { id: "7", url: "8_7.png", name: "daily" },
      { id: "8", url: "8_8.png", name: "daily" },
      { id: "9", url: "8_9.png", name: "daily" },
      { id: "10", url: "8_10.png", name: "daily" },
      { id: "11", url: "8_11.png", name: "daily" },
      { id: "12", url: "8_12.png", name: "daily" },
      { id: "13", url: "8_13.png", name: "daily" },
      { id: "14", url: "8_14.png", name: "daily" },
      { id: "15", url: "8_15.png", name: "daily" },
    ],
  },
  {
    id: '9',
    title: "WE 돌봄이",
    period: "2023.08 ~ 2024.03",
    git: "",
    site: "http://we.cookplay.net",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "FE", color: "lightgreen" },
    ],
    description: "암센터 환자 습관 관리 플랫폼",
    feature: [
    ],
    contribution: [
      {
        id: '1',
        title: '',
        desc: [
          '로그인, 회원가입, 건강 정보 입력 기능 구현',
          '카카오 및 네이버 SNS 로그인, 문자 발송 처리',
          '식사 및 운동 관리 페이지, 기록 차트 및 영상 제어 기능 구현',
          '제공된 데이터베이스 함수 및 프로시저를 이용한 프론트엔드 및 백엔드 기능 구현',
        ]
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MariaDB", url: "maria-100.png" },
    ],
    thumb: 'pj9.png',
    images: [
      { id: "1", url: "9_1.png", name: "daily" },
      { id: "2", url: "9_2.png", name: "daily" },
      { id: "3", url: "9_3.png", name: "daily" },
      { id: "4", url: "9_4.png", name: "daily" },
      { id: "5", url: "9_5.png", name: "daily" },
      { id: "6", url: "9_6.png", name: "daily" },
      { id: "7", url: "9_7.png", name: "daily" },
      { id: "8", url: "9_8.png", name: "daily" },
      { id: "9", url: "9_9.png", name: "daily" },
      { id: "10", url: "9_10.png", name: "daily" },
      { id: "11", url: "9_11.png", name: "daily" },
      { id: "12", url: "9_12.png", name: "daily" },
      { id: "13", url: "9_13.png", name: "daily" },
    ],
  },
  {
    id: '10',
    title: "LMEDRP",
    period: "2024.06 ~ 2024.08",
    git: "",
    site: "https://lmedrp.com",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "FE", color: "lightgreen" },
    ],
    description: "스튜디오 스케줄 및 촬영 관리 EDRP",
    feature: [
    ],
    contribution: [
      {
        id: '1',
        title: '',
        desc: [
          'API 통신 : Context 및 Ajax 활용',
          '스케줄별 표시 분기 및 등록 처리 기능 구현',
          '다운로드, 미리보기, 프로그래스 바 기능 구현',
          '계약 상세 상품 관리, 결제 내역 페이지 신규 개발',
          '이미지 및 파일 다중 업로드 기능 구현(Chunk 방식)으로 업로드 속도 향상',
          '다중 필터 및 출력 기능을 포함한 일/월 스케줄 페이지 유지보수 및 신규 개발',
        ]
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Django", url: "django-100.png" },
      { id: "3", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: 'pj10.png',
    images: [
      { id: "1", url: "10_1.png", name: "daily" },
      { id: "2", url: "10_2.png", name: "monthly" },
      { id: "3", url: "10_3.png", name: "product" },
      { id: "4", url: "10_4.png", name: "upload" },
      { id: "5", url: "10_5.png", name: "preview" },
    ],
  },
  {
    id: '11',
    title: "Portfolio",
    period: "2024.10 ~",
    git: "",
    site: "https://lhjin-portfolio.vercel.app/",
    filter: [
      { name: "personal", color: "hotpink" },
      { name: "FE", color: "lightgreen" },
    ],
    
    description: "Next.js, TypeScript로 지금까지 진행했던 프로젝트, 사용 기술 스택 등을 한눈에 볼 수 있는 포트폴리오 사이트를 구현하였습니다.\n앞으로도 계속해서 발전해나가는 모습을 반영해 나갈 예정입니다.",
    feature: [
      'TailwindCSS를 사용하여 간결하고 일관된 스타일링 코드 구현 및 반응형 적용',
      '메인 화면에 타이핑 효과를 적용하여 시각적인 효과 제공',
      'Framer Motion을 사용하여 스크롤 시 노출 효과 구현',
      'Vercel 배포를 통한 CI/CD 자동화',
    ],
    contribution: [
      // {
      //   id: '1',
      //   title: '',
      //   desc: [
      //     '',
      //   ]
      // },
    ],
    skillItem: [
      { id: "1", name: "Next.js", url: "next-100.png" },
      { id: "2", name: "TypeScript", url: "typescript-100.png" },
      { id: "3", name: "TailwindCSS", url: "tailwind-100.png" },
      { id: "4", name: "Vercel", url: "vercel-100.png" },
    ],
    thumb: 'pj11.png',
    images: [
      { id: "1", url: "11_1.png", name: "main" },
      { id: "2", url: "11_2.png", name: "about" },
      { id: "3", url: "11_3.png", name: "skills" },
      { id: "4", url: "11_4.png", name: "projects" },
      { id: "5", url: "11_5.png", name: "career" },
    ],
  },
];

// 프로젝트 상세
export const getProjectById = (id: string) => {
  return projects.find(project => project.id === id);
};