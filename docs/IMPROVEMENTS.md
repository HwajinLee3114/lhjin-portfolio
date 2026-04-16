# 개선사항 목록 — lhjin-portfolio

> 작성일: 2026-04-16 상태 마커: `[ ]` 미착수 / `[~]` 진행중 / `[x]` 완료

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

## 참고: 잘 된 점 (유지할 것)

- OS 시뮬레이터 컨셉 — 프론트엔드 역량의 살아있는 증명
- Zustand 도메인별 분리 (window, os, widget, z-index)
- WindowFrame 리사이즈 로직 — 최소 크기 제한, 뷰포트 대응, 모바일 자동 최대화
- Framer Motion 활용 — spring 파라미터가 자연스럽고 과하지 않음
- TypeScript strict 모드 + 일관적인 인터페이스 정의
- Career-Project JSON 간 ID 참조로 데이터 정규화
