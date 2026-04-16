# 개선사항 목록 — lhjin-portfolio

> 작성일: 2026-04-16 | 최종 업데이트: 2026-04-16 상태 마커: `[ ]` 미착수 / `[~]` 진행중 / `[x]` 완료

---

## P0 — 즉시 처리

### [x] 1. 이미지 최적화

**완료 내역:**

- [x] `about/page.tsx` — `<img>` → Next.js `<Image>` 교체 (fill + sizes + priority)
- [x] `ProjectCard.tsx` — 썸네일 `<Image>` 교체 (fill + responsive sizes)
- [x] `skills/page.tsx` — 카테고리 아이콘 `<Image>` 교체 (width/height)
- [x] `next.config.mjs` — `images.formats: ['image/webp']`, `poweredByHeader: false`

**미완료 (수동 작업 필요):**

- [ ] 프로필 이미지 WebP 변환 + 리사이징 (현재 4.3MB → 목표 200KB 이하)
- [ ] `profile2.jpg` 삭제 (사용처 없음 확인 완료, 2.8MB)

---

### [x] 2. SEO 메타데이터

**완료 내역:**

- [x] `layout.tsx` — `lang="ko"` 수정
- [x] `layout.tsx` — OpenGraph + Twitter Card + keywords 메타데이터 추가
- [x] `src/app/robots.ts` 생성
- [x] `src/app/sitemap.ts` 생성 (/, /resume, /os)

---

## P1 — 우선 처리

### [x] 3. 문서형 뷰 추가

**완료 내역:**

- [x] `/` — 랜딩 페이지 (모드 선택: 이력서 보기 / OS 체험하기)
- [x] `/resume` — 문서형 스크롤 레이아웃 (프로필 → 기술 → 프로젝트 → 경력)
- [x] `/os` — 기존 OS 시뮬레이터 이동
- [x] 모바일 안내 문구 추가 ("모바일에서는 이력서 보기를 권장합니다")
- [x] 네비게이션 바 (sticky, 앵커 링크 + OS 모드 전환 버튼)
- [x] 기존 JSON 데이터 + TagBadge, SlideButton 컴포넌트 재사용

---

### [x] 4. `h-screen` → `h-dvh` 전환

**완료 내역:**

- [x] `src/app/os/page.tsx` — `h-dvh`
- [x] `Desktop.tsx` — `h-dvh`
- [x] `WindowFrame.tsx` — `100dvh`, `calc(100dvh - 32px)`

---

## P2 — 품질 개선

### [x] 5. 가짜 로딩 제거

**완료 내역:**

- [x] `about/page.tsx` — loading state + skeleton 제거, Framer Motion 진입 애니메이션 유지
- [x] `career/page.tsx` — 동일
- [x] `skills/page.tsx` — 동일
- [x] `ProjectsSection.tsx` — 동일

---

### [x] 6. localStorage 저장 debounce

**완료 내역:**

- [x] `use-window-store.ts` — subscribe에 400ms debounce 적용

---

## P3 — 정리/최적화

### [x] 7. FontAwesome 제거, Lucide 통일

**완료 내역:**

- [x] `SlideButton.tsx` — `FontAwesomeIcon` → `ArrowRight` (Lucide)
- [x] FontAwesome 3개 패키지 삭제

---

### [x] 8. Dock 아이템 상수 통합

**완료 내역:**

- [x] `src/data/navigation.ts` 생성 (공유 `navItems` 상수)
- [x] `Desktop.tsx` — `navItems` import
- [x] `Dock.tsx` — `navItems` import (기존 `dockItems` 제거)

---

### [x] 9. StatusBar 업데이트 간격 최적화

**완료 내역:**

- [x] 1초 → 분 변경 시점에 맞춘 타이머 (초기 msUntilNextMinute 후 60초 간격)

---

### [ ] 10. OS 프레임 다크모드 미지원

**현황:**

- `Desktop.tsx` — `bg-white` 하드코딩
- `StatusBar.tsx` — `bg-white/70` 하드코딩
- `WindowFrame.tsx` — `bg-white` 하드코딩

**작업:**

- [ ] OS 프레임 컴포넌트들에 `dark:` 클래스 추가
- [ ] 3개 테마 모두에서 OS 프레임 확인

---

### [ ] 11. 모달 접근성 (포커스 트랩)

**현황:**

- `useFocusTrap` 훅이 존재하지만 `ProjectDetailModal`에서 미사용

**작업:**

- [ ] `ProjectDetailModal`에 `useFocusTrap` 적용
- [ ] 기타 모달에도 적용 검토

---

## 추가 개선 (세션 2 — 2026-04-16)

### [x] 12. OS 윈도우 내부 ScrollTop 버튼

**배경:** Career 같은 긴 콘텐츠에서 스크롤 올리기 번거로움

**완료 내역:**

- [x] `WindowFrame.tsx` — 내부 스크롤 200px 이상 시 우하단 `↑` 버튼 표시
- [x] Framer Motion fade in/out 애니메이션
- [x] `absolute` positioning — 스크롤 영역 위에 오버레이 (sticky → absolute 수정, 안정성 개선)

---

### [x] 13. 문서 모드 네비게이션 active 상태

**배경:** 헤더에서 섹션 클릭 시 이동은 되지만 현재 위치 표시가 없음

**완료 내역:**

- [x] `resume/page.tsx` — IntersectionObserver로 현재 섹션 감지
- [x] active 섹션 텍스트 강조 (진한 색 + 하단 인디케이터 라인)
- [x] 모바일에서 네비 링크 `hidden sm:inline-block` 처리

---

### [x] 14. OS ↔ 문서/이력서 모드 전환

**배경:** OS 모드에서 문서 모드/이력서 미리보기로 전환하는 경로가 없음

**완료 내역:**

- [x] `StatusBar.tsx` — macOS 스타일 드롭다운 메뉴 ("메뉴 ▾" → 문서 모드 / 이력서 미리보기)
- [x] 드롭다운 `fixed` + `z-[1001]`로 윈도우 위에 정상 표시
- [x] 바깥 클릭 시 자동 닫힘
- [x] `resume/preview` 돌아가기 버튼: `Link href="/resume"` → `router.back()`으로 변경 (진입 경로로
      정확히 복귀)

---

### [x] 15. OS 윈도우 위치/크기 계산 수정

**배경:** PC 작은 창에서 윈도우가 중앙에 안 뜨고 화면 밖으로 벗어남

**원인 분석:**

- z-index 기반 offset (`nextZ % 5 * 20`) — z-index 300+에서 예측 불가능한 위치
- StatusBar(32px), Dock(80px) 영역 미고려
- 기존 창 재오픈 시 브라우저 리사이즈 후 화면 밖 위치 미보정
- offset 후 뷰포트 clamp 없음

**완료 내역:**

- [x] `use-window-store.ts` — 가용 영역 계산 (vh - StatusBar - Dock)
- [x] offset을 열린 창 개수 기반으로 변경 (`openCount % 4 * 24`)
- [x] 신규/기존 창 모두 `Math.min/max` clamp로 뷰포트 안에 위치 보장
- [x] 드래그 후에도 최소 100px 화면 안 유지 (`WindowFrame.tsx`)
- [x] localStorage 키 `v1` → `v2` 변경 (이전 잘못된 위치 데이터 리셋)

---

### [x] 16. 이력서 미리보기 페이지

**배경:** 문서 모드가 OS를 한 페이지에 나열한 느낌, 실제 이력서 형식이 아님

**완료 내역:**

- [x] `/resume/preview` — A4 문서형 이력서 페이지 생성
- [x] JSON 데이터 기반 자동 생성 (소개, 기술 스택, 경력+프로젝트, 사이드 프로젝트)
- [x] 인쇄/PDF 저장 버튼 (`window.print()`)
- [x] `@media print` CSS — A4 크기, 마진 10mm, 트랜지션/애니메이션 비활성화
- [x] 문서 모드 헤더에 "이력서 미리보기" 버튼 추가

---

### [x] 17. 데이터 관리 방식 리팩토링

**배경:** JSON 파일에 순차 숫자 ID 하드코딩, career↔project 간 수동 참조가 번거로움

**완료 내역:**

- [x] 숫자 ID → slug ID (`"kt-giga-cms"`, `"bunyang"`, `"linkorder"` 등)
- [x] project에 `company` 필드 추가 (career id와 매칭: `"a2tec"`, `"futuresolution"`, `"luvmom"`)
- [x] career.json에서 `projects` 배열 제거 → `getProjectsByCompany()` 자동 역참조
- [x] `careerWithProjects`, `sortedCareer`를 `src/data/career.ts`로 통합 (3곳 중복 제거)
- [x] career 정렬: `parseInt(id)` → `periodStart` 기준 `localeCompare` (slug에서도 동작)
- [x] project 정렬: `Number(id)` → `periodStart` 기준
- [x] contribution/skillItem/images에서 무의미한 `id` 필드 전량 삭제
- [x] 타입 정의 정리: `Image` → `ProjectImage` (전역 `Image` 충돌 방지)

---

### [x] 18. 이력서 미리보기 간격/스타일 개선

**배경:** 섹션 간 `mb-8` 간격 과도, 개별 margin 대신 부모 gap으로 통일 필요

**완료 내역:**

- [x] 개별 `section.mb-8` → 부모 `div.space-y-6`으로 통합
- [x] SectionTitle `mb-3` → `mb-2`
- [x] header `mb-8` → `pb-5` (space-y에 의해 간격 자동 관리)

### [x] 19. 랜딩 페이지 UI 리디자인

**배경:** 진입점이 타이틀 + 버튼만 있어서 면접관에게 정보 부족

**완료 내역:**

- [x] 프로필 사진 + 이름 + 직함 + 한 줄 소개 추가
- [x] 소셜 링크 (GitHub, Blog, Email) 아이콘 버튼
- [x] 핵심 기술스택 태그 (React, Next.js, TypeScript, Tailwind CSS)
- [x] "체험하기" → "포트폴리오 둘러보기" 워딩 변경
- [x] 경력 수치 섹션 제거 (유저 피드백)

---

### [x] 20. 전체 라우팅/반응형 검토

**완료 내역:**

- [x] `resume/page.tsx` — `<a href="/os">` 3곳 → `<Link>` 전환 (404 에러 수정)
- [x] `architecture/page.tsx` — `w-screen h-screen` → `w-full h-dvh`
- [x] `not-found.tsx` — `min-h-screen` → `min-h-dvh`
- [x] `project/page.tsx` — `min-h-screen` → `min-h-dvh`
- [x] `Header.tsx` — 모바일 메뉴 `h-screen` → `h-dvh`
- [x] 프로젝트 전체 내부 라우트 `<a>` 잔존 없음 확인

### [x] 21. 윈도우/위젯 z-index 통합 (실제 OS 포커스 동작)

**배경:** 위젯(Guestbook, Terminal, Music)이 윈도우 아래 깔려서 클릭해도 안 보임

**원인:**

- 윈도우: `windowMaxZIndex` 300부터 시작 (301, 302, 303...)
- 위젯: `widgetMaxZIndex` 100부터 시작 (101, 102, 103...)
- 별도 카운터라 위젯은 절대 윈도우 위로 올라갈 수 없었음

**완료 내역:**

- [x] `use-z-index-store.ts` — 글로벌 `maxZIndex` 단일 카운터로 통합
- [x] `getNextWindowZIndex()`와 `getNextWidgetZIndex()` 모두 같은 카운터에서 증가
- [x] 클릭한 윈도우/위젯이 항상 최상위로 올라옴 (실제 OS처럼)
- [x] `use-window-store.ts` 초기화에서 `maxZIndex`도 함께 세팅
- [x] GuestbookWidget 기본 위치 수정 (`y: 420` → `y: 60`, Dock에 가려지는 문제 해결)
- [x] GuestbookWidget 기본 높이 수정 (`500` → `460`, 화면 내 수용)

---

### [x] 22. 프로필 정보 상수 통합

**배경:** 이메일, 이름, 소개 문구, 소셜 링크가 7개 파일에 하드코딩 중복

**완료 내역:**

- [x] `src/data/profile.ts` 생성 — 이름, 직함, 이메일, 소개, 소셜 링크, 프로필 이미지, 핵심 기술
      통합
- [x] `page.tsx` (랜딩) — `profile.*` 참조로 전환
- [x] `about/page.tsx` — 동일
- [x] `resume/page.tsx` — 동일
- [x] `resume/preview/page.tsx` — 동일
- [x] `StatusBar.tsx` — 동일
- [x] `ProfileCircle.tsx` — 동일
- [x] 이제 `profile.ts` 한 곳만 수정하면 전체 반영

---

### [x] 23. Guestbook Supabase 연동

**배경:** 방명록이 로컬 state만 사용하여 새로고침하면 사라지고, 다른 사람이 남긴 메시지 확인 불가

**완료 내역:**

- [x] `@supabase/supabase-js` 패키지 설치
- [x] `.env.local` — `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` 설정
- [x] `src/lib/supabase/client.ts` — Supabase 클라이언트 초기화 파일 생성
- [x] `GuestbookWidget.tsx` — 로컬 state → Supabase 실시간 연동
  - 위젯 열릴 때 `fetchEntries()` 자동 호출
  - 메시지 전송 시 DB insert → 성공하면 UI에 즉시 반영
  - 로딩/전송 중 상태 표시 (Loader2 스피너)
  - 빈 상태 안내 메시지
  - `formatTimeAgo()` — DB timestamp를 "just now", "3m ago" 등으로 변환

**Supabase 테이블 생성 필요** — SQL Editor에서 순서대로 실행:

1. [`docs/sql/001_guestbook_table.sql`](sql/001_guestbook_table.sql) — 테이블 + 인덱스
2. [`docs/sql/002_guestbook_rls.sql`](sql/002_guestbook_rls.sql) — RLS 정책 + 트리거

---

## 전체 검토 (세션 3 — 2026-04-16)

### 코드 정리

#### [x] 24. `comn/` → `common/` 디렉토리 통합

**완료 내역:**

- [x] `comn/` 내 12개 파일을 `common/`으로 이동
- [x] 전체 import 경로 수정 (4개 파일)
- [x] `comn/` 디렉토리 삭제

---

#### [x] 25. 미사용 코드 정리

**완료 내역:**

- [x] `ScrollDownBtn.tsx` + `.module.css` 삭제
- [x] `SkillItem.tsx` 삭제 + `skill/` 디렉토리 삭제
- [x] `HoverAMenu.tsx`, `ConfettiBurst.tsx`, `Footer.tsx`, `ScrollTopButton.tsx` 삭제
- [x] `home/page.tsx` 주석 코드 제거
- [x] `styled-components`, `tailwind-styled-components`, `@types/styled-components` 패키지 삭제
- [x] `ProjectDetailModal.tsx`의 `tw.div` → 순수 Tailwind className으로 변환

---

#### [x] 26. 중복 Flow 라이브러리 정리

**완료 내역:**

- [x] `reactflow` 패키지 삭제 (실제 사용은 `@xyflow/react`만)

---

### 데이터 관리

#### [x] 27. JSON 스키마 검증 추가 (zod)

**완료 내역:**

- [x] `zod` 패키지 설치
- [x] `projects.ts` — ProjectSchema, SkillItemSchema 등 정의 + `z.array().parse()`
- [x] `career.ts` — CareerSchema, RoleSchema 정의 + `z.array().parse()`
- [x] `skills.ts` — SkillSchema, SkillCategorySchema 정의 + `z.array().parse()`
- [x] `as Type[]` 캐스트 전량 제거 → 런타임 검증으로 전환
- [x] JSON 필드 누락/타입 오류 시 빌드 시점에 즉시 에러

---

#### [x] 28. 프로젝트 추가 프로세스 간소화

**완료 내역:**

- [x] `docs/IMPROVEMENTS.md` 하단에 데이터 파일 관리 가이드 작성 완료
- [x] zod 검증으로 필수 필드 누락 시 빌드 실패 (#27 연계)

---

### 접근성

#### [x] 29. 접근성 개선

**완료 내역:**

- [x] `home/page.tsx` — `alt="icon"` → `alt="검색 아이콘"` 구체화
- [x] `GuestbookWidget.tsx` — input에 `aria-label` 추가 ("작성자 이름", "방명록 메시지")

---

### 기능 개선

#### [x] 30. Music Player 개선

**완료 내역:**

- [x] 단일 트랙 → Skip 버튼(이전/다음) 제거, 재생/일시정지 버튼만 유지
- [x] 재생 버튼에 `aria-label` 추가
- [x] 미사용 import (`SkipBack`, `SkipForward`) 제거

---

#### [x] 31. Guestbook 스팸 방지

**완료 내역:**

- [x] 전송 후 10초 쿨다운 (`cooldown` state)
- [x] 쿨다운 중 버튼 비활성화 + "잠시 후 다시 시도해주세요" 메시지

---

#### [x] 32. 이력서 미리보기 인쇄 최적화

**완료 내역:**

- [x] `globals.css` — `break-inside: avoid-page` (section, div)
- [x] `break-after: avoid-page` (h1~h4) — 제목 뒤에서 페이지 안 끊김

---

### 어필/차별화 포인트

#### [x] 33. GitHub 활동 + 잔디 그래프 연동

**완료 내역:**

- [x] `/api/github` API Route — repos + 최근 레포 + contribution 데이터 통합
- [x] `github-contributions-api` 공개 API 활용 (토큰 불필요, 1시간 캐싱)
- [x] `about/page.tsx` — GitHub 잔디 그래프 (ContributionGraph 컴포넌트)
  - 365일 기여 그리드, level 0~4 색상 (emerald 계열)
  - hover 시 날짜 + 기여 수 표시 (title 속성)
  - 총 기여 수 표시
- [x] 최근 레포 목록 (5개)
- [x] API 실패 시 섹션 숨김

---

#### [x] 34. 블로그 최신 글 연동

**완료 내역:**

- [x] `/api/blog` API Route 생성 — Tistory RSS 파싱, 최근 5개 포스트
- [x] 서버 사이드 캐싱 (1시간 revalidate)
- [x] `resume/page.tsx` — Career 섹션 아래에 "Blog" 섹션 추가
- [x] RSS 파싱 실패 시 섹션 숨김 (graceful fallback)

---

### [x] 35. 이미지 미리보기 닫기 시 프로젝트 모달까지 닫히는 버그

**원인:** ImagePreviewModal의 ModalOverlay 닫기 클릭 이벤트가 아래 ProjectCard의 ModalOverlay까지
전파

**완료 내역:**

- [x] `ModalOverlay.tsx` — `onClick` → `e.target === e.currentTarget` 체크 추가 (배경만 클릭 시
      닫기)
- [x] 이벤트 버블링으로 인한 중첩 모달 동시 닫힘 방지

---

### [x] 36. ProjectDetailModal UI 리디자인

**배경:** 외부 이미지 의존, 탭 코드 중복, OS 모드 스타일과 불일치

**완료 내역:**

- [x] 닫기 버튼: 외부 이미지(`b2close-100.png`) → Lucide `X` 아이콘
- [x] 탭 바: 4번 중복 코드 → `tabs` 상수 배열 + `visibleTabs` 필터 + `cn()` 조건부 클래스
- [x] ARIA: 탭에 `role="tablist"`, `role="tab"`, `aria-selected` 추가
- [x] 섹션 아이콘: 외부 이미지 → Lucide (`Star`, `Users`, `MonitorSmartphone`)
- [x] `SectionHeading` 컴포넌트 추출 — 아이콘 + 색상 + 제목 재사용
- [x] GitHub/사이트 링크: `IconCircleButton` → 심플한 `<a>` 버튼 (ExternalLink 아이콘)
- [x] 높이 단위: `85vh` → `85dvh` (iOS 대응)
- [x] 이미지 카드: `div onClick` → `button` (접근성)
- [x] `IconButton`, `IconCircleButton` import 제거 (의존성 감소)

---

### [x] 37. 이미지 미리보기 UI 리디자인

**배경:** 미리보기 창이 프로젝트 모달 헤더와 겹쳐서 닫기 버튼이 안 보임. 외부
이미지(`b2close-100.png`) 사용.

**완료 내역:**

- [x] `ModalOverlay` 의존 제거 → 자체 `z-[2000]` 풀스크린 오버레이
- [x] 레이아웃: 상단(닫기) + 중앙(이미지) + 하단(줌 툴바) 3단 구조
- [x] `bg-black/90 backdrop-blur-sm` 배경 — 프로젝트 모달과 명확히 분리
- [x] 닫기/줌 버튼: 외부 이미지 → Lucide (`X`, `ZoomIn`, `ZoomOut`, `RotateCcw`)
- [x] 줌 비율 실시간 표시 (100%, 120% 등)
- [x] 이미지 `max-h-[80dvh]` + `rounded-lg shadow-2xl` 적용
- [x] Framer Motion 진입/퇴장 애니메이션

---

### [x] 38. Skills 페이지 UI 리디자인

**배경:** 카테고리별 가로 나열 + hover 시 하단 라인만 있어서 밋밋함

**완료 내역:**

- [x] 1행 1카테고리 카드 레이아웃 유지 (유저 피드백으로 grid-2 → 세로 리스트 복원)
- [x] 각 행을 카드로 감싸기 (`border` + `rounded-2xl` + `hover:shadow-md`)
- [x] 스킬 배지: 회색 배경 → 실제 브랜드 색상 적용 (`skill.color` + `skill.txtcolor`)
- [x] 배지 인터랙션: `hover:-translate-y-0.5 hover:shadow-md`
- [x] 카테고리 아이콘 크기 축소 (80px → 40px)
- [x] GuestbookWidget `DEFAULT_SIZE`/`DEFAULT_POS` 상수를 컴포넌트 외부로 이동 (ESLint warning 해결)

---

### [x] 41. Sticky Memo 숨김 + GitHub 잔디 위젯

**완료 내역:**

- [x] `Desktop.tsx` — StickyMemo 렌더링 주석 처리 (숨김)
- [x] `GitHubWidget.tsx` 생성 — 드래그 가능한 잔디 그래프 위젯
  - 총 기여 수 + public repos 수 + GitHub 프로필 링크
  - 365일 잔디 그래프 (level 0~4 emerald 색상)
  - hover 시 날짜별 기여 수 tooltip
  - 모바일 대응 (드래그 비활성화, 풀 너비)
- [x] Desktop 좌측 위젯 아이콘에 GitHub 추가 (검정 배경 + 흰색 아이콘)

---

### [x] 39. Projects 카드/리스트 뷰 전환

**배경:** 카드형 외에 목록형으로도 프로젝트를 빠르게 훑어볼 수 있으면 좋겠다는 의견

**완료 내역:**

- [x] 필터 바 옆에 뷰 전환 토글 추가 (`LayoutGrid` / `List` 아이콘)
- [x] 카드 뷰 (기존): 3열 그리드, 썸네일 + 상세 카드
- [x] 리스트 뷰 (신규): 1행 1프로젝트, 작은 썸네일 + 제목 + 설명 + 기간
- [x] 리스트 항목 클릭 시 동일한 ProjectDetailModal 열림
- [x] `AnimatePresence`로 뷰 전환 애니메이션

---

### [x] 40. ProjectCard UI 정리

**완료 내역:**

- [x] `rounded-[2rem]` + 내부 `rounded-[1.5rem]` 이중 라운딩 → `rounded-2xl` + `rounded-t-2xl` 통일
- [x] `border border-zinc-200` 제거 — 프로젝트 톤에 맞게 border-less
- [x] `p-4` 전체 패딩 → 이미지는 패딩 없이 꽉 차게, 텍스트 영역만 `p-4`
- [x] hover 시 description 오버레이 제거 → 본문에 `line-clamp-2`로 항상 표시
- [x] 화살표 버튼 박스 제거 → 텍스트 색상만으로 심플하게
- [x] 기술 아이콘 grayscale 제거 — 항상 컬러로 가독성 개선
- [x] 아이콘 5개 → 4개 표시 (공간 효율)
- [x] 기간 텍스트를 하단 우측으로 이동 (아이콘과 양쪽 정렬)

---

## 데이터 파일 관리 가이드

### 프로젝트 추가 절차

```
1. data/projects.json에 항목 추가
   - id: 슬러그 (예: "new-project")
   - company: career.json의 id와 매칭 (예: "carsayo"), 개인은 생략
   - thumb: "pjN.png" 파일을 public/images/thumb/에 배치
   - images: [{url: "N_1.png", name: "설명"}] 파일을 public/images/project/에 배치

2. 경력은 자동 연결됨 (company 필드 기준)

3. 빌드 확인: pnpm build
```

### 경력 추가 절차

```
1. data/career.json에 항목 추가
   - id: 슬러그 (예: "new-company")
   - projects 배열은 없음 (자동 역참조)

2. 기존 projects.json에서 해당 회사 프로젝트에 company 필드 추가/수정

3. 빌드 확인: pnpm build
```

### 스킬 추가 절차

```
1. data/skills.json 해당 카테고리에 추가
   - name, color, txtcolor(선택)

2. 프로필 핵심 기술이면 src/data/profile.ts의 coreSkills 배열에도 추가
```

---

## 참고: 잘 된 점 (유지할 것)

- OS 시뮬레이터 컨셉 — 프론트엔드 역량의 살아있는 증명
- Zustand 도메인별 분리 (window, os, widget, z-index)
- WindowFrame 리사이즈 로직 — 최소 크기 제한, 뷰포트 대응, 모바일 자동 최대화
- Framer Motion 활용 — spring 파라미터가 자연스럽고 과하지 않음
- TypeScript strict 모드 + 일관적인 인터페이스 정의
- 프로필 상수 통합 (`profile.ts`) — 한 곳 수정으로 전체 반영
- Career → Project 자동 역참조 — 프로젝트 추가 시 career 수정 불필요
- SQL 마이그레이션 파일 관리 (`docs/sql/`)
- 문서 자동 업데이트 체계
