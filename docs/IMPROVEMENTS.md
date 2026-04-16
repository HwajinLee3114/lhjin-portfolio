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
- [x] `resume/preview` 돌아가기 버튼: `Link href="/resume"` → `router.back()`으로 변경 (진입 경로로 정확히 복귀)

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

## 참고: 잘 된 점 (유지할 것)

- OS 시뮬레이터 컨셉 — 프론트엔드 역량의 살아있는 증명
- Zustand 도메인별 분리 (window, os, widget, z-index)
- WindowFrame 리사이즈 로직 — 최소 크기 제한, 뷰포트 대응, 모바일 자동 최대화
- Framer Motion 활용 — spring 파라미터가 자연스럽고 과하지 않음
- TypeScript strict 모드 + 일관적인 인터페이스 정의
- Career-Project JSON 간 ID 참조로 데이터 정규화
