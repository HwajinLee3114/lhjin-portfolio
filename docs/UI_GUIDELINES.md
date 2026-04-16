# UI 가이드라인 — lhjin-portfolio

## 테마 시스템

CSS 변수 기반 3-테마 시스템. `globals.css`에 정의.

### 색상 변수

| 변수          | Light     | Dark      | Custom    | 용도       |
| ------------- | --------- | --------- | --------- | ---------- |
| `--theme-1`   | `#f6f1e3` | `#1f262e` | `#faf8f4` | 기본 표면  |
| `--theme-1-5` | `#f5e8b6` | `#273038` | `#e8e4db` | 보조 표면  |
| `--theme-2`   | `#faad1a` | `#e3a01c` | `#eecd9e` | 액센트     |
| `--theme-3`   | `#344c36` | `#202a24` | `#78716c` | 딥 표면    |
| `--theme-4`   | `#3b82f6` | `#7aa6ff` | `#1e6f53` | 프라이머리 |
| `--theme-bg`  | `#ffffff` | `#1f262e` | `#f9f7f5` | 배경       |
| `--theme-fg`  | `#1f2937` | `#e2e4e4` | `#2d2926` | 텍스트     |

### Tailwind 커스텀 색상 매핑

```
themacolor1  → var(--theme-1)    // bg-themacolor1
themacolor15 → var(--theme-1-5)
themacolor2  → var(--theme-2)    // 액센트 (노란/금색)
themacolor3  → var(--theme-3)
themacolor4  → var(--theme-4)    // 프라이머리 (파란/초록)
darkbg       → var(--theme-bg)
darkfg       → var(--theme-fg)
custombg     → var(--custom-bg)
customfg     → var(--custom-fg)
```

### 테마 전환

```typescript
// ThemeToggle.tsx에서 처리
document.documentElement.classList.toggle('dark')
document.documentElement.classList.toggle('theme-custom')
```

- 3개 테마 모두에서 UI 확인 필수

## 공통 컴포넌트

### `cn()` — 클래스 조합

```typescript
import { cn } from '@/lib/utils'

cn('base-class', condition && 'conditional-class', className)
```

`clsx` + `tailwind-merge` 조합. Tailwind 클래스 충돌을 자동 해결.

### `focusRing` — 접근성 포커스 링

```typescript
import { focusRing } from '@/styles/ui'

<button className={cn(focusRing, 'other-classes')}>
```

### `SectionFrame` — 섹션 레이아웃

각 페이지 섹션의 공통 래퍼. 타이틀 + 컨텐츠 영역.

```typescript
import SectionFrame from '@/components/common/SectionFrame'

<SectionFrame title="섹션 제목">
  {children}
</SectionFrame>
```

### `ModalPortal` + `ModalOverlay` — 모달 시스템

```typescript
import ModalPortal from '@/components/comn/ModalPortal'
import ModalOverlay from '@/components/comn/ModalOverlay'

<ModalPortal>
  <ModalOverlay onClose={handleClose}>
    {content}
  </ModalOverlay>
</ModalPortal>
```

### `TagBadge` — 태그 표시

기술 스택, 카테고리 등을 배지 형태로 표시.

### `IconButton` / `IconCircleButton` — 아이콘 버튼

아이콘 + 텍스트 조합 버튼 / 원형 아이콘 버튼.

### `ImagePreviewModal` — 이미지 뷰어

이미지 확대 보기 모달.

## 폰트

| 폰트 이름                  | CSS 클래스/패밀리       | 용도               |
| -------------------------- | ----------------------- | ------------------ |
| Pretendard                 | `CommonFont` (기본)     | 본문 전체          |
| Hakgyoansim Puzzle Black   | `g_titleEngFontBlack`   | 영문 타이틀 (채움) |
| Hakgyoansim Puzzle Outline | `g_titleEngFontOutline` | 영문 타이틀 (윤곽) |
| RiaSans ExtraBold          | `g_RiaSansFont`         | 특수 강조 텍스트   |

## 애니메이션

### Framer Motion (주요)

```typescript
import { motion, AnimatePresence } from 'framer-motion'

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.3 }}
>
```

### CSS 애니메이션 (`custom.css`)

| 이름               | 용도                 |
| ------------------ | -------------------- |
| `blink`            | 커서 깜빡임 (0.7s)   |
| `skeleton-loading` | 로딩 스켈레톤 (1.2s) |

### 전역 트랜지션

```css
* {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-duration: 200ms;
}
```

모든 요소에 200ms 색상 전환 적용 (테마 전환 시 부드러운 효과).

## 반응형

- **데스크탑 우선** (OS 시뮬레이터 특성)
- 브레이크포인트: `lg` (1024px), `md` (768px)
- 모바일에서는 Dock, WindowFrame 등 OS 요소의 레이아웃 조정

## 스타일링 규칙

1. Tailwind 유틸리티 클래스 우선 사용
2. 조건부 클래스는 `cn()` 함수로 조합
3. 커스텀 CSS 클래스는 접두사 사용: `l_` (로컬), `g_` (글로벌)
4. 색상은 반드시 테마 변수 참조 (하드코딩 금지)
5. 다크모드: `dark:` Tailwind 프리픽스 사용
6. 호버/포커스: `hover:`, `focus-visible:` 프리픽스
7. 트랜지션: `transition-all duration-300` 패턴
8. z-index는 Zustand 스토어(`use-z-index-store`)로 관리
