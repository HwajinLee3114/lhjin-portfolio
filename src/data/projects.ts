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
    id: "1",
    title: "KT GiGA Live CMS",
    period: "2024.10 ~ 2024.11",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "풀스택", color: "tomato" },
    ],
    description:
      "VR 계열사 및 관리자가 콘텐츠와 서비스를 효율적으로 관리할 수 있는 CMS입니다.",
    feature: ["VR 카테고리 및 카테고리별 콘텐츠 관리", "VR 제공 계열사 관리"],
    contribution: [
      {
        id: "1",
        title:
          "VR 계열사 및 관리자 콘텐츠 관리 사이트 유지보수 및 신규 페이지 개발",
        desc: [
          "VR 계열사 및 관리자 콘텐츠 관리 사이트의 UI/UX를 리뉴얼하여 사용자 만족도를 크게 높였고, 웹사이트 접근성을 개선하였습니다.",
        ],
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
    thumb: "pj1.png",
    images: [],
  },
  {
    id: "2",
    title: "분양이부장",
    period: "2021.05 ~ 2022.05",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "풀스택", color: "tomato" },
    ],
    description:
      "전국 아파트 분양 정보를 제공하며, 지역별 분양 정보를 등록하고 홍보 및 구인 활동을 원하는 사용자와 관계자를 위한 반응형 플랫폼입니다.",
    feature: [
      "사용자 위치 기반 인근 아파트 분양 정보 조회",
      "아파트 분양 시 견적서 생성 및 직급에 따른 수수료 계산 서비스 제공",
      "구인 게시판을 통해 사용자 즉시 서류 제출 가능",
      "엑셀 파일을 통한 지역별 아파트 분양 정보 등록 및 설정한 지역에 대한 알림 발송",
      "관계자가 등록한 분양 정보와 공공 API 정보를 지도에 마커로 표시",
      "전단지 및 브로슈어 등록 기능 제공, 사용자 양식 첨부 파일 다운로드 기능 제공",
    ],
    contribution: [
      {
        id: "1",
        title:
          "전체 페이지 프론트엔드 화면 및 기능 구현과 백엔드 오류 유지보수",
        desc: [
          "Access Token 전송으로 보안 강화",
          "문자 발송 시스템 연동, 인증번호 기능 구현",
          "카카오맵 및 청약 분양 정보 조회 공공 API 연동하여 분양 정보 지도 표시 및 상세 정보 조회",
          "파일 업로드 및 다운로드 기능 구현",
          "견적서, 수수료 계산을 위한 항목별 계산 함수 구현",
          "사용자 페이지 메뉴얼 작성",
        ],
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: "pj2.png",
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
    id: "3",
    title: "Pleisure",
    period: "2021.05 ~ 2022.02",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "FE", color: "lightgreen" },
    ],
    description: "간편한 스포츠 레슨 예약 서비스를 제공하는 플랫폼입니다.",
    feature: [
      "원원하는 코치와의 레슨을 간편하게 실시간 예약 가능",
      "예약한 레슨 스케줄 관리 기능 제공",
      "개인 코치 및 팀 별 레슨 일정 관리",
    ],
    contribution: [
      {
        id: "1",
        title: "코치 페이지 프론트엔드 화면 및 기능 구현",
        desc: [
          "카카오톡 링크 공유 기능 구현",
          "개인 코치 및 팀별 레슨 스케줄 캘린더 작업",
          "팀, 코치 및 팀원, 레슨 관리 페이지 개발",
          "레슨 결제 시스템 연동 처리",
        ],
      },
      {
        id: "2",
        title: "사용자 페이지 프론트엔드 유지보수",
        desc: [
          "사용자 페이지 디자인 개선",
          "예약 시스템 데이터 실시간 연동 오류 처리",
        ],
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: "pj3.png",
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
    id: "4",
    title: "Digital Real Trip(DRT)",
    period: "2021.10 ~ 2022.09",
    git: "",
    site: "https://www.djes.co.kr",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "feature", color: "gold" },
      { name: "FE", color: "lightgreen" },
      { name: "BE", color: "coral" },
    ],
    description:
      "대전 체험형 게임 플랫폼으로, 다양한 체험형 프로그램을 제공합니다.",
    feature: [
      "등록된 프로그램을 체험할 수 있는 기능 제공",
      "실제 장소 방문 후 문제를 풀어 랭킹 남기기",
      "체험 게임별 카메라 인식, BGM, 이벤트 문자 기능 제공",
    ],
    contribution: [
      {
        id: "1",
        title: "사용자 페이지의 UI와 기능 개선",
        desc: [
          "사용자 페이지의 UI와 기능을 전체적으로 개선하면서 이전 버전에 비해 사용자 수가 20% 중가하였습니다.",
        ],
      },
      {
        id: "2",
        title: "스토리 기반 게임에 BGM 추가, LMS 발송",
        desc: [
          "스토리 기반 게임에 BGM을 추가하고 체험 관련 이미지를 LMS로 발송하여 스토리 진행 이탈률을 50% → 20%로 개선했습니다.",
        ],
      },
      {
        id: "3",
        title: "카카오, 네이버 SNS 로그인 추가",
        desc: [
          "카카오, 네이버 SNS 로그인을 추가하여 사용자 접근성 및 편의성을 크게 향상시켰습니다.",
        ],
      },
      {
        id: "4",
        title: "관리자 페이지에 스토리 템플릿 관리 기능을 구현",
        desc: [
          "관리자 페이지에 스토리 템플릿 관리 기능을 구현하여 클라이언트 코드에 하드코딩되어 있던 코드 중복을 줄여 코드 가독성을 높이고, 페이지 로딩 시간을 단축시켜 성능을 개선했습니다.",
        ],
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: "pj4.png",
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
    id: "5",
    title: "너의 운동은",
    period: "2022.02 ~ 2022.05",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "feature", color: "gold" },
      { name: "FE", color: "lightgreen" },
      { name: "BE", color: "coral" },
    ],
    description: "운동 관리 커뮤니티 반응형 플랫폼입니다.",
    feature: [
      "운동 기록 및 관리 기능 제공",
      "입력한 체력 정보를 차트로 시각화하여 변화 비교 가능",
      "위치 정보와 설문을 기반으로 운동하기 좋은 장소 추천",
      "운동별 커뮤니티를 통해 공통 관심사를 가진 사용자 간 소통 지원",
    ],
    contribution: [
      {
        id: "1",
        title: "Reduct 비동기 데이터 처리",
        desc: [
          "비동기 데이터 처리에 Redux를 적용하여 데이터 흐름 관리의 효율성을 높였습니다.",
        ],
      },
      {
        id: "2",
        title: "공통 컴포넌트 구현 및 폴더 구조를 개선",
        desc: [
          "공통 컴포넌트 구현 및 폴더 구조를 개선으로 유지보수성 및 확장성을 향상시켰고, 이후 추가 기능 구현 및 다른 작업자와의 업무 효율을 개선하였습니다.",
        ],
      },
    ],
    skillItem: [
      { id: "1", name: "React", url: "react-100.png" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: "pj5.png",
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
    id: "6",
    title: "포켓데이터",
    period: "2022.06 ~ 2022.10",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "feature", color: "gold" },
      { name: "FE", color: "lightgreen" },
    ],
    description:
      "입찰 정보, 지원 사업, 스타트업 정보를 조회할 수 있는 사이트입니다.",
    feature: [
      "자회사 및 제휴사에게 다양한 맞춤 정보 제공",
      "입찰 정보, 지원 사업, 스타트업 정보 등에 대한 맞춤 알림 설정 가능",
      "각종 공고의 상세 정보 및 입찰 마감일 확인 기능 제공",
    ],
    contribution: [
      {
        id: "1",
        title: "기존 jQuery 기반 프로젝트를 React로 리팩토링",
        desc: [
          "기존 jQuery 기반의 프로젝트를 서버와 클라이언트로 분리한 후 React로 리팩토링하여, 상태 관리 및 코드 가독성 및 재사용성을 크게 향상시켰습니다. 또한 불필요한 렌더링을 최소화하여 성능을 최적화하고, 사용자 편의성을 크게 향상시켰습니다.",
        ],
      },
    ],
    skillItem: [
      { id: "1", name: "React", url: "react-100.png" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: "pj6.png",
    images: [
      { id: "1", url: "6_1.png", name: "daily" },
      { id: "2", url: "6_2.png", name: "daily" },
      { id: "3", url: "6_3.png", name: "daily" },
      { id: "4", url: "6_4.png", name: "daily" },
      { id: "5", url: "6_5.png", name: "daily" },
    ],
  },
  {
    id: "7",
    title: "면세점 사이트",
    period: "2022.09 ~ 2023.07",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "풀스택", color: "tomato" },
    ],
    description: "면세 상품 및 점포 관리 사이트입니다.",
    feature: [
      "카테고리별 판매 상품과 점포를 관리할 수 있는 관리자 페이지 제공",
      "판매된 정보를 기반으로 차트로 표현하여 통계를 확인할 수 있는 기능 제공",
    ],
    contribution: [
      {
        id: "1",
        title: "관리자 사이트 유지보수 및 신규 개발",
        desc: [
          "입금 및 결제 수단 관리 기능과 프로모션 이력 페이지의 화면 및 기능 신규 구현",
          "면세 카테고리, 브랜드, 상품 정보 제공 고시 관리 페이지를 유지보수하고 신규 기능 추가",
          "카카오톡 및 문자 메시지 발송 테스트, 템플릿 수정 담당",
        ],
      },
      {
        id: "2",
        title: "사용자 사이트 프론트엔드 유지보수",
        desc: [
          "장바구니 화면 및 SessionStorage를 활용한 기능 구현",
          "이벤트 페이지 템플릿 유지보수 담당",
        ],
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
    thumb: "pj7.png",
    images: [
      // { id: "1", url: "", name: "" },
    ],
  },
  {
    id: "8",
    title: "링크오더",
    period: "2023.08 ~ 2024.03",
    git: "",
    site: "",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "feature", color: "gold" },
      { name: "FE", color: "lightgreen" },
    ],
    description:
      "지역 소상공인을 위한 상품 판매 및 배송 관리 반응형 플랫폼입니다.",
    feature: [
      "판매 상품과 판매, 배송, 직원 등을 관리할 수 있는 점포 관리자 사이트 및 사용자용 판매 링크 사이트 제공",
      "관리자가 상품 판매 링크를 생성한 후, 마감일 전까지 사용자가 링크를 통해 구매 가능",
      "각 판매 링크별 주문서 및 배달 관리 기능 제공",
      "점포 로그인 시 직업 등급에 따라 메뉴 및 기능 분기",
    ],
    contribution: [
      {
        id: "1",
        title:
          "공유 링크를 통한 구매 페이지 접속으로 구매자의 접근성을 높였습니다.",
        desc: [],
      },
      {
        id: "2",
        title: "장바구니 기능 추가",
        desc: [
          "기존 댓글 주문 방식에서 장바구니 기능으로 변경하여 UI를 개선하고, 구매 전환율을 15% 증가시켰으며, 사용자 편의성을 향상시켰습니다.",
          "세션 기반 장바구니 기능을 구현하여 페이지 로딩 시간을 50% 단축시키고, 실시간 상품 수량을 표시하여 장바구니 이탈률을 감소시켰습니다.",
        ],
      },
      {
        id: "3",
        title: "점포 등록 및 직원 관리 프로세스 개선",
        desc: [
          "점포 등록 및 직원 관리 프로세스를 개선하여 운영 효율성 및 배송 처리 속도를 20% 향상시켰습니다.",
        ],
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MariaDB", url: "maria-100.png" },
    ],
    thumb: "pj8.png",
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
    id: "9",
    title: "WE 돌봄이",
    period: "2024.03 ~ 2024.05",
    git: "",
    site: "http://we.cookplay.net",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "FE", color: "lightgreen" },
    ],
    description: "암센터 환자 습관 관리 플랫폼입니다.",
    feature: [
      "환자의 증상에 맞춘 식단 제공",
      "식사 시간을 측정하고 평가할 수 있는 기능 제공",
      "다양한 운동 영상을 시청하며 따라할 수 있는 기능 제공",
      "식사 및 운동 기록을 통해 평균 점수와 상태 확인 가능",
    ],
    contribution: [
      {
        id: "1",
        title: "전체 페이지 프론트엔드 화면 및 기능 구현",
        desc: [
          "제공받은 데이터베이스 함수와 프로시저를 활용해 기능 구현",
          "로그인, 회원가입, 건강 정보 입력 기능 구현",
          "카카오 및 네이버 SNS 로그인과 문자 발송 기능 처리",
          "식사 및 운동 관리 페이지, 기록 차트 및 영상 제어 기능 구현",
        ],
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Java", url: "java-100.png" },
      { id: "3", name: "Spring", url: "spring-100.png" },
      { id: "4", name: "MariaDB", url: "maria-100.png" },
    ],
    thumb: "pj9.png",
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
    id: "10",
    title: "LMEDRP",
    period: "2024.06 ~ 2024.08",
    git: "",
    site: "https://lmedrp.com",
    filter: [
      { name: "team", color: "cornflowerblue" },
      { name: "feature", color: "gold" },
      { name: "FE", color: "lightgreen" },
    ],
    description: "스튜디오 스케줄 및 촬영 관리 EDRP 시스템입니다.",
    feature: [
      "각 지점별 촬영 일정을 일/월별로 한눈에 볼 수 있는 캘린더 기능 제공",
      "사용자의 상세 정보와 촬영 일정, 계약 정보를 한 페이지에서 확인 가능",
      "다양한 촬영 상품 관리 기능 제공",
      "문자 발송 템플릿 관리 및 설정 기능 제공",
    ],
    contribution: [
      {
        id: "0",
        title: "",
        desc: ["API 통신 : Context 및 Ajax 활용"],
      },
      {
        id: "1",
        title: "일/월 스케줄 리뉴얼 및 신규 기능 구현",
        desc: [
          "기존 코드의 중복된 부분을 함수화하여 가독성 개선",
          "스케줄 상태 및 일정 항목별 색상 우선순위 규칙 적용",
          "세부 필터 기능 제공으로 필요한 일정 조회 가능",
          "마우스 hover 시 메모 확인 가능",
          "상단에서 스케줄에 포함된 촬영 상품 확인 가능",
        ],
      },
      {
        id: "2",
        title: "이미지, 파일 업로드 및 다운로드 기능 구현",
        desc: [
          "Chunk 방식을 이용해 다중 업로드 기능을 구현하여 업로드 속도 향상",
          "기능 동작 시 프로그래스 바를 구현해 진행도를 확인 할 수 있게 기능 개선",
          "이미지, 영상일 경우 미리보기가 가능하도록 구현",
        ],
      },
      {
        id: "3",
        title: "계약 상세 상품 관리, 결제 내역 페이지 신규 개발",
        desc: [
          "촬영 계약별 상세 상품 관리 페이지 구현",
          "실시간으로 적용될 금액을 확인할 수 있는 계산 기능 구현",
          "상품 중복 추가 기능 구현",
          "지점별 결제 내역 및 잔여 혜택 내역 조회 페이지 구현",
        ],
      },
    ],
    skillItem: [
      { id: "1", name: "JavaScript", url: "js-100.png" },
      { id: "00", name: "JSP", url: "" },
      { id: "2", name: "Django", url: "django-100.png" },
      { id: "3", name: "MySQL", url: "mysql-100.png" },
    ],
    thumb: "pj10.png",
    images: [
      { id: "1", url: "10_1.png", name: "daily" },
      { id: "2", url: "10_2.png", name: "monthly" },
      { id: "3", url: "10_3.png", name: "product" },
      { id: "4", url: "10_4.png", name: "upload" },
      { id: "5", url: "10_5.png", name: "preview" },
    ],
  },
  {
    id: "11",
    title: "Portfolio",
    period: "2024.10 ~",
    git: "https://github.com/HwajinLee3114/lhjin-portfolio",
    site: "https://lhjin-portfolio.vercel.app/",
    filter: [
      { name: "personal", color: "hotpink" },
      { name: "feature", color: "gold" },
      { name: "FE", color: "lightgreen" },
    ],

    description:
      "Next.js, TypeScript를 활용하여 지금까지 진행했던 프로젝트와 사용 기술 스택을 한눈에 볼 수 있는 포트폴리오 사이트를 구현하였습니다.\n앞으로도 지속적으로 발전하는 모습을 반영해 나갈 예정입니다.",
    feature: [
      "TailwindCSS를 사용하여 간결하고 일관된 스타일링 코드를 구현하고 반응형 적용",
      "메인 화면에 타이핑 효과를 적용하여 시각적 효과 제공",
      "Framer Motion을 활용하여 스크롤 시 노출 효과 구현",
      "Vercel 배포를 통한 CI/CD 자동화",
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
    thumb: "pj11.png",
    images: [
      { id: "1", url: "11_1.png", name: "main" },
      { id: "2", url: "11_2.png", name: "about" },
      { id: "3", url: "11_3.png", name: "skills" },
      { id: "4", url: "11_4.png", name: "projects" },
      { id: "5", url: "11_5.png", name: "career" },
    ],
  },
  {
    id: "12",
    title: "Blog",
    period: "2024.10 ~",
    git: "https://github.com/HwajinLee3114/lhjin-blog",
    site: "https://lhjin-blog.vercel.app/",
    filter: [
      { name: "personal", color: "hotpink" },
      { name: "FE", color: "lightgreen" },
    ],

    description:
      "Next.js, TypeScript를 활용하여 개인 블로그를 구현하고 있습니다.\n기술 학습 및 아카이빙 용도의 개인 블로그",
    feature: [
      "React v18, Next.js v14 적용",
      "Styled-Component의 ThemeProvider를 이용하여 다크/라이트/커스텀 모드 구현",
      "TailwindCSS를 사용하여 간결하고 일관된 스타일링 코드를 구현하고 반응형 적용",
      "Vercel 배포를 통한 CI/CD 자동화",
      "GitHub Actions를 통해 master merge 시 ESLint 확인",
      "zustand로 블로그에 필요한 정보  관리",
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
      { id: "5", name: "Styled-Components", url: "styled-components.png" },
      { id: "6", name: "zustand", url: "zustand.svg" },
    ],
    thumb: "pj12.png",
    images: [
      { id: "1", url: "12_1.png", name: "blog_light" },
      { id: "2", url: "12_2.png", name: "blog_custom" },
    ],
  },
  {
    id: "13",
    title: "MyPlanIt",
    period: "2024.11.24 ~",
    git: "https://github.com/HwajinLee3114/myit",
    site: "https://myit-lhjins-projects.vercel.app/",
    filter: [
      { name: "personal", color: "hotpink" },
      { name: "feature", color: "gold" },
      { name: "FE", color: "lightgreen" },
    ],

    description:
      "React.js, TypeScript를 활용하여 오늘 하루 일정을 정리하여 이미지로 내보낼 수 있습니다.",
    feature: [
      "html2canvas를 사용하여 간편한 이미지 내보내기 기능 구현",
      "TailwindCSS를 사용하여 간결하고 일관된 스타일링 코드를 구현하고 반응형 적용",
      "Vercel 배포를 통한 CI/CD 자동화",
    ],
    contribution: [],
    skillItem: [
      { id: "1", name: "React.js", url: "react-100.png" },
      { id: "2", name: "TypeScript", url: "typescript-100.png" },
      { id: "3", name: "TailwindCSS", url: "tailwind-100.png" },
      { id: "4", name: "Vercel", url: "vercel-100.png" },
    ],
    thumb: "pj13.png",
    images: [
      { id: "1", url: "13_1.png", name: "main" },
      { id: "2", url: "13_2.png", name: "creat_todo" },
      { id: "3", url: "13_3.png", name: "todo_list" },
      { id: "4", url: "13_4.png", name: "export_image" },
    ],
  },
];

// 프로젝트 상세
export const getProjectById = (id: string) => {
  return projects.find((project) => project.id === id);
};
