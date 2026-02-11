## 프론트엔드 개발자 이화진 포트폴리오

### 개요
- Next.js 기반 포트폴리오 웹사이트
- 반응형 레이아웃, 다크/라이트/커스텀 테마 지원
- 프로젝트 상세 모달, 이미지 미리보기 모달 제공
- 데이터는 `data/*.json`으로 관리

### 주요 기능
- 섹션 스크롤 내비게이션(헤더)
- 프로젝트 카드 및 상세 모달(이미지 프리뷰 포함)
- 스크롤 탑 버튼
- 다크/라이트/커스텀 테마 토글

### 데이터 관리
- JSON 파일로 데이터 분리
  - `data/projects.json`
  - `data/career.json`
  - `data/skills.json`
- 타입 및 로딩은 `src/data/*.ts`에서 처리

### 주요 명령어
```bash
# 개발 서버 실행 (Next.js)
pnpm dev

# 로컬 개발 서버 실행 (포트 4003)
pnpm start:local

# 빌드
pnpm build

# 코드 포맷
pnpm format

# 코드 포맷 검사
pnpm format:check

# 린트
pnpm lint

# 테스트
pnpm test

# 타입 체크
pnpm typecheck
```

### Tech Stack
- Next.js 14
- React 18
- TypeScript
- TailwindCSS
- styled-components
- framer-motion
- Jest

### 참고
- 테마 색상은 CSS 변수 기반으로 관리
- 커스텀 테마는 `.theme-custom` 클래스에 정의됨
