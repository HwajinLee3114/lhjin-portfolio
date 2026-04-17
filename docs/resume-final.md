# 이화진 (LEE HWAJIN) — Frontend Developer

---

## Contact.

**Email** hwajin3114@gmail.com

**Mobile** 010-5224-2677

**Blog** [https://lhjini.tistory.com](https://lhjini.tistory.com/)

**GitHub** [https://github.com/HwajinLee3114](https://github.com/HwajinLee3114)

**Portfolio** [https://lhjin-portfolio.vercel.app](https://lhjin-portfolio.vercel.app/)

---

## Introduction.

**빠르게 변화하는 기술에 적응하며 성장하는 프론트엔드 개발자 이화진입니다.**

React, Next.js, TypeScript를 기반으로 **사용자 경험을 최우선으로 고려한 개발**을 지향합니다.

현재 카사요에서 **7개 프로덕트의 프론트엔드를 동시 개발/운영**하며, 신규 서비스 구축부터 레거시
리뉴얼까지 폭넓은 실무 경험을 쌓고 있습니다. 인슈어런스 홈페이지/앱 등 **신규 프로젝트 2건을
프론트엔드 100% 단독으로 구축**했고, 내 차 팔기 프로세스 전면 리뉴얼과 B2B 중고차 딜러 플랫폼 신규
개발을 주도하는 등 **신규 서비스 3건을 구축**했습니다.

이전 경력에서는 **페이지 로딩 시간 50% 단축**, **구매 전환율 15% 증가**, **사용자 이탈률 50%→20%
개선** 등 정량적 성과를 달성했으며, 컴포넌트 기반 리팩토링과 상태 관리 개선을 통해 코드 품질과
사용자 편의성을 함께 높여왔습니다.

SI 풀스택 개발 경험을 바탕으로 **백엔드와의 원활한 협업**이 가능하며, 지속적으로 변화하는 기술
환경에 빠르게 적응하며 혁신적인 솔루션을 제공하는 개발자가 되겠습니다.

---

## Work Experience.

### 카사요 (Carsayo)

2024.12 ~ 현재

프론트엔드 개발자 | 계약직(주임) → 정직원(대리)

> 신차 장기렌트·리스, 내 차 팔기, 자동차 보험, 사고수리 서비스를 하나의 구조로 연결한 자동차 통합
> 플랫폼

**| 카사요 앱**

- React, TypeScript, Vite, TailwindCSS, MUI, Zustand, React Query, Toss Payments, Zod

- **내 차 팔기 전체 프로세스 FE 100% 단독 리뉴얼** — 위저드 단계 재설계(번호판
  조회→차량정보→상태→사고이력→사진업로드), B2B 딜러 웹앱 연동 프론트엔드 개발
- **하이브리드 네이티브 브릿지** 개발 — Android WebView / iOS WKWebView 인터페이스, 네이티브 이미지
  피커, FCM 푸시, 딥링크
- **Toss Payments 결제 연동** — 카드/가상계좌 결제 플로우, 환불 처리, 결제 상태 관리
- **이미지 처리 파이프라인** — CropperJS 크롭 + 클라이언트 사이드 압축 + S3 Presigned URL 업로드
- 앱 전반 FE 이슈 및 버그 수정 주도 (신차 장기렌트/리스, 사고수리, 결제 등 전 영역)

**| 카사요 중고차 딜러 (신규 구축)**

- Next.js, TypeScript, TailwindCSS, MUI, Zustand, React Query, Toss Payments, Recharts, Zod

- **B2B 온라인 경매 플랫폼 신규 프론트엔드 구축** — 내 차 팔기 리뉴얼과 연계하여 딜러용 웹앱 개발
- **PC/모바일 완전 분리 설계** — 미들웨어 디바이스 감지, /m 경로 자동 리다이렉트, 디바이스별
  최적화된 UX (PC 대시보드형 vs 모바일 시퀀셜 플로우)
- **경매/입찰 UI** — useInfiniteQuery 무한 스크롤, 실시간 입찰 시스템, 허위입찰 페널티 결제 플로우
- **거래 상태 관리** — 단계별(낙찰→검수→탁송→완료→정산) 카드 컴포넌트, 문서 업로드, Zustand persist
  필터 상태 유지
- **Zod 기반 폼 검증 체계** — 회원가입, 방문 예약, 탁송, 영수증 등 복잡한 폼 스키마, React Hook Form
  연동

**| 인슈어런스 홈페이지 + 복지몰 (신규 구축, FE 100% 단독)**

- Next.js, TypeScript, TailwindCSS, MUI, React Query, Zustand, React Hook Form, Zod

- **신규 프로젝트 프론트엔드 전체 단독 담당** — 디자인 시스템, 공통 컴포넌트, 폴더 구조, 서버 액션
  설계까지 일괄 주도
- **복지몰 OAuth2 연동 서버 액션** 개발 — 파트너별(현대이지웰/이제너두/비즈마켓) 토큰 발급, 인메모리
  캐싱, 401 리트라이
- **보험 견적 비교 페이지** — 주민번호 앞자리 인증 후 보험사별 견적 비교 테이블, 모바일 핀치 줌/팬
- **SMS 보안 폼** — RSA-OAEP 공개키 암호화, 랜덤 배열 보안 키패드, 3단계 약관 동의
- **ISR 적용** (300초 revalidation) — Notion CMS 연동 FAQ, 콘텐츠 빌드 없이 갱신

**| 인슈어런스 앱 (신규 구축 + 리뉴얼, FE 단독)**

- Next.js, TypeScript, TailwindCSS, MUI, Zustand, React Query, React Hook Form, Zod

- **보험 설계사/카매니저 전용 하이브리드 앱 신규 구축** — 프로젝트 셋업부터 디자인 시스템, 네이티브
  브릿지 설계까지
- 서비스 프로세스 변경에 따른 **화면/플로우 전면 리뉴얼** 진행
- **RSA-OAEP SHA-512 클라이언트 사이드 암호화** — WebCrypto API + iOS WebView 호환 서버 사이드 폴백
- **로그인 방식 전환** — 휴대폰 본인인증 → 아이디/패스워드, 세션 흐름 재구성

**| 카사요 홈페이지**

- Next.js, TypeScript, TailwindCSS, Zustand, React Query, Framer Motion, Zod

- **메인 페이지 디자인 리뉴얼** — 히어로 비디오 배너, 즉시출고 차량 캐러셀, 빠른 상담 요청 시스템
- **5단계 반응형 디자인 시스템** 구축 — micro/mobile/tablet/wide-tablet/pc 커스텀 브레이크포인트
- **SEO 최적화** — OpenGraph, Schema.org JSON-LD, UTM 리다이렉트 미들웨어

**| 카사요 관리자**

- React, TypeScript, Vite, TailwindCSS, MUI, Zustand, React Query, Recharts, Zod

- 대시보드, 고객/신청서/결제/마케팅/딜러/보험/복지몰 등 **전체 서비스 통합 관리 어드민** FE 유지보수
  및 기능 추가
- **Recharts 기반 데이터 시각화** 대시보드 개발

**| 인슈어런스 관리자**

- Next.js, TypeScript, TailwindCSS, Zustand, React Query, FullCalendar, ApexCharts

- 설계사/고객/상담/계약/정산 관리 어드민 FE 개발
- FullCalendar 기반 일정 관리, ApexCharts 통계 대시보드

**Tech Stack |** `JavaScript`, `TypeScript`, `React`, `Next.js`, `Vite`, `TailwindCSS`, `MUI`,
`Zustand`, `React Query`, `React Hook Form`, `Zod`, `Toss Payments`, `Framer Motion`, `Recharts`

---

### LUVMOM (럽맘)

2024.06 ~ 2024.08 (3개월)

프론트엔드 개발자, 프리랜서

**| LMEDRP**

- 기존 `context` 방식을 `AJAX`로 변경하여 **페이지 로딩 시간을 30% 단축**하고, 사용자 경험(UX)을
  개선
- 다중 파일 업로드 시 **Chunk 방식을 도입**하여 **업로드 시간을 50% 단축**, 프로그레스 바로 진행
  상황 실시간 제공
  ([트러블슈팅](https://lhjini.tistory.com/entry/파일-다중-업로드-Chunk-적용기-대용량-파일-업로드-최적화))
- 중복 코드 제거 및 함수화로 스케줄 캘린더 **로딩 속도 30% 개선**, 유지보수성 향상

**Tech Stack |** `JavaScript`, `JSP`, `MySQL`

---

### 퓨쳐솔루션

2021.05 ~ 2024.05 (3년 1개월)

SW 개발자, 정직원(사원)

**| 포켓 데이터**

- jQuery 기반 프로젝트를 **서버/클라이언트 분리 후 React로 리팩토링** — 상태 관리, 코드 가독성,
  재사용성 향상 및 불필요한 렌더링 최소화

**| 너의 운동은**

- **Redux를 적용한 비동기 데이터 처리**로 데이터 흐름 관리 효율화
- 공통 컴포넌트 구현 및 폴더 구조 개선으로 유지보수성/확장성 향상

**| 링크오더**

- **장바구니 기능 도입**으로 **구매 전환율 15% 증가**, 사용자 편의성 향상
- **세션 기반 장바구니** 구현으로 **페이지 로딩 시간 50% 단축**, 실시간 상품 수량 표시
- 점포 등록 및 직원 관리 프로세스 개선으로 **운영 효율성 및 배송 처리 속도 20% 향상**

**| Digital Real Trip (DRT)**

- 사용자 페이지 UI/기능 전체 개선으로 **사용자 수 20% 증가**
- BGM 추가 및 LMS 이미지 발송으로 **스토리 진행 이탈률 50%→20% 개선**
- 카카오/네이버 SNS 로그인 추가로 사용자 접근성 향상
- 관리자 스토리 템플릿 관리 기능으로 하드코딩 제거 및 성능 개선

**Tech Stack |** `JavaScript`, `JSP`, `React`, `Spring`, `Java`, `MySQL`, `Oracle`, `MariaDB`

---

### A2TEC

2018.11 ~ 2020.01 (1년 4개월)

SW 개발자, 정직원(연구원)

- VR 계열사 및 관리자 콘텐츠 관리 사이트의 **UI/UX 리뉴얼**로 사용자 만족도 향상
- **웹사이트 접근성 개선**

**Tech Stack |** `전자정부프레임워크`, `Java`, `Spring`, `JavaScript`, `JSP`, `PostgreSQL`

---

## Projects.

### Portfolio

2024.10 ~ 진행 중

[https://lhjin-portfolio.vercel.app](https://lhjin-portfolio.vercel.app/)

**Tech Stack |** `Next.js`, `TypeScript`, `TailwindCSS`, `Zustand`, `Framer Motion`, `Supabase`,
`Vercel`

- **데스크탑 OS 시뮬레이터** 형태의 개인 포트폴리오 — 드래그 가능한 윈도우 기반 독창적 UX
- Next.js App Router 파일 기반 라우팅, TailwindCSS 반응형, Framer Motion 스크롤 애니메이션
- Supabase PostgreSQL 기반 방명록, Vercel 자동 배포

---

## Tech Stack.

### | Front-End

`JavaScript`, `TypeScript`, `React`, `Next.js`

`TailwindCSS`, `MUI`, `Styled-components`

`Zustand`, `React Query (TanStack Query)`, `React Hook Form`

`Framer Motion`, `Zod`

### | Back-End

`Java`, `Spring`, `Supabase`

### | Database

`MySQL`, `MariaDB`, `Oracle`, `PostgreSQL`

### | DevOps

`Vercel`, `Netlify`, `GitHub Actions`

### | Tools

`Notion`, `Jira`, `GitHub`, `GitLab`, `Slack`, `Postman`, `Figma`

---

## Educations.

2021.01 ~ 2021.08 : 학점은행제 / 컴퓨터공학 졸업

2020.07 ~ 2021.01 : 예담 직업전문 학원(대구) / Java 개발자 양성 과정 수료

2016.02 ~ 2019.02 : 영남이공대(대구) / 컴퓨터정보과 졸업

2013.03 ~ 2016.02 : 남산고등학교(대구) / 이과 졸업

---

## Certifications.

2020.11 정보처리 산업기사

---

## Activities.

2024.11 ~ 2025.01 : 유데미 러닝크루 리더 1기 — TypeScript/Next.js 스터디 리더
