# 개발 컨벤션 — lhjin-portfolio

## 기술 스택

| 카테고리     | 기술                      | 버전              |
| ------------ | ------------------------- | ----------------- |
| 프레임워크   | Next.js (App Router)      | 14.2.15           |
| 언어         | TypeScript                | 5.9.3             |
| 스타일링     | Tailwind CSS              | 3.4.19            |
| CSS-in-JS    | styled-components         | 6.3.9             |
| 상태관리     | Zustand                   | 5.0.11            |
| 애니메이션   | Framer Motion             | 11.11.9           |
| 아이콘       | Lucide React, FontAwesome | -                 |
| 다이어그램   | React Flow / XYFlow       | 11.11.4 / 12.10.1 |
| DB           | Supabase (PostgreSQL)     | -                 |
| 테스트       | Jest + Testing Library    | 29.7.0            |
| 린팅         | ESLint + Prettier         | -                 |
| 패키지매니저 | pnpm                      | 9.0.0             |

## 코딩 컨벤션

### 컴포넌트

- 클라이언트 컴포넌트는 파일 최상단에 `'use client'` 선언
- Props는 인라인 타입 또는 `interface`로 정의 (별도 파일 분리 불필요)
- 상태: 로컬 UI → `useState`, 전역/공유 → Zustand 스토어
- 조건부 렌더링: 삼항 연산자보다 `&&` 패턴 선호

### 스타일링

- **1순위**: Tailwind 유틸리티 클래스
- **2순위**: CSS 변수 (`var(--theme-*)`) — 테마 대응
- **3순위**: CSS Modules (`*.module.css`) — 컴포넌트 고유 애니메이션
- 클래스 조합: `cn()` 유틸리티 사용 (`@/lib/utils`)
- 접근성: `focusRing` 상수 사용 (`@/styles/ui`)

### 네이밍

| 대상                 | 규칙                               | 예시                                  |
| -------------------- | ---------------------------------- | ------------------------------------- |
| 컴포넌트 파일        | PascalCase                         | `ProjectCard.tsx`                     |
| 훅 파일              | kebab-case + `use-`                | `use-window-store.ts`                 |
| CSS 클래스 (커스텀)  | 접두사 `l_` (로컬) / `g_` (글로벌) | `l_search_div`, `g_titleEngFontBlack` |
| Tailwind 커스텀 색상 | camelCase                          | `themacolor1`, `darkbg`               |
| 데이터 파일          | camelCase                          | `projects.ts`                         |
| JSON 데이터          | camelCase 키                       | `startDate`, `techStack`              |

### Import 순서

1. React / Next.js
2. 외부 라이브러리 (framer-motion, zustand 등)
3. 내부 컴포넌트 (`@/components/...`)
4. 훅 (`@/hooks/...`)
5. 유틸 / 데이터 (`@/lib/...`, `@/data/...`)
6. 스타일 / 타입

### 상태관리 패턴

```typescript
// Zustand 스토어 정의 (src/hooks/os/)
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ExampleStore {
  value: string
  setValue: (v: string) => void
}

export const useExampleStore = create<ExampleStore>()(
  persist(
    (set) => ({
      value: '',
      setValue: (v) => set({ value: v }),
    }),
    { name: 'example-storage' },
  ),
)
```

### 데이터 흐름

- 정적 콘텐츠: `data/*.json` → `src/data/*.ts` (타입 래퍼) → 컴포넌트
- DB 데이터: Supabase → `src/lib/supabase/*-service.ts` → 컴포넌트

## 금지 사항

- **코드 주석 금지** — 변수명과 함수명으로 의도 표현
- **`any` 타입 금지** — 최소한 `unknown`이라도 사용
- **`h-screen` 금지** — 모바일 주소창 문제. `min-h-dvh` 사용
- **`input[type=date]` 금지** — 공통 DatePicker 사용
- **기존 UI 대수술 금지** — 요청 범위만 수정
- **인라인 스타일(`style={}`) 금지** — Tailwind 또는 CSS 변수
- **불필요한 `useEffect` 금지** — 파생 값은 렌더링 중 계산
- **`console.log` 커밋 금지** — 디버깅용 로그는 반드시 제거
- **미사용 import 금지** — ESLint가 잡지만, 수동으로도 확인

## 브랜치 전략

- `master`: 프로덕션 (Vercel 배포)
- `dev`: 개발 브랜치
- 기능 브랜치: `dev`에서 분기 → PR로 머지

## 테스트

```bash
pnpm test              # 전체 테스트
pnpm test:watch        # 워치 모드
```

- 테스트 파일 위치: `__tests__/`
- Jest + React Testing Library 사용
