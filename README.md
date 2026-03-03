# LHJIN Portfolio OS

프론트엔드 개발자 이화진의 포트폴리오 웹사이트입니다. 데스크톱 OS 형태의 인터랙션 위에
`About / Skills / Projects / Career` 콘텐츠를 창(Window) 기반으로 탐색할 수 있도록 구성했습니다.

## 핵심 컨셉

- 포트폴리오 콘텐츠를 단순 스크롤 페이지가 아닌 OS UI 패턴으로 탐색
- 방문자가 직접 조작하며 이해할 수 있는 인터랙티브 UX 제공
- 데이터 기반(`data/*.json`)으로 콘텐츠 유지보수 단순화

## 주요 기능

- 데스크톱 아이콘 더블클릭(모바일/터치는 단일 탭)으로 창 열기/닫기
- 창 드래그 이동, 리사이즈, 최소화/최대화, 포커스(z-index) 처리
- Dock에서 앱(섹션) 전환
- Sticky Memo 위젯(드래그, 위치 저장)
- Music Player 위젯(드래그, 재생/일시정지, 진행바, 오디오 파일 없어도 UI 동작)
- Guestbook 위젯(프론트 UI 데모, 익명 한줄 등록/목록)
- Mini Terminal 위젯(`help`, `about`, `projects`, `open 3` 등 명령 기반 탐색)
- Projects 필터/검색 및 상세 모달
- 다크/라이트/커스텀 테마 토글
- 반응형 대응 + 키보드 조작 접근성(Enter/Space) 보완

## 화면/섹션 구조

- `Home`: 타이핑 인트로
- `About`: 프로필/링크/이력서 다운로드
- `Skills`: 카테고리별 기술 스택
- `Projects`: 필터/검색/카드/상세
- `Career`: 경력 타임라인 + 프로젝트 연계

## 기술 스택

- Next.js 14 (App Router)
- React 18 + TypeScript
- Tailwind CSS
- Framer Motion
- Zustand (상태 관리)
- Jest + Testing Library

## 디렉터리

```text
src/
  app/                  # 라우트 및 섹션 페이지
  components/
    os/                 # Desktop, Window, Dock, Widget
    project/            # 프로젝트 카드/상세
    common/, comn/      # 공통 UI
  data/                 # JSON 데이터 로더/타입
  hooks/                # 커스텀 훅, Zustand 스토어
  lib/                  # 유틸 함수
    supabase/           # Supabase 스키마/서비스 준비 파일

data/
  projects.json
  career.json
  skills.json
```

## 실행 방법

```bash
pnpm install
pnpm dev
```

## 스크립트

```bash
pnpm dev           # 개발 서버
pnpm start:local   # 4003 포트 개발 서버
pnpm build         # 프로덕션 빌드
pnpm lint          # ESLint
pnpm format        # Prettier write
pnpm format:check  # Prettier check
pnpm test          # Jest
pnpm typecheck     # 타입 검사
```

## 데이터 관리

- 포트폴리오 데이터는 `data/*.json`에서 관리
- 화면 렌더링용 타입/매핑은 `src/data/*.ts`에서 처리

## 상태 관리

- `use-window-store`: 창 상태(open/min/max/position/size/z-index)
- `use-os-store`: Sticky Memo, Music Player 상태 및 persist
- `use-z-index-store`: 창/위젯 z-index 카운터 분리 관리
- `use-widget-store`: 위젯 포커스 및 위젯 내부 z-index 관리
- `Desktop`: Guestbook, Mini Terminal 위젯 open/close 상태 관리

## 위젯 커맨드

- Mini Terminal:
  - `help`
  - `about`, `skills`, `projects`, `career`
  - `open <name|index>` 예: `open projects`, `open 3`
  - `clear`, `exit`

## Supabase 준비 파일

- 실제 Supabase 연동 전, 스키마/쿼리와 실행 함수를 미리 분리해둠
- [guestbook-schema.ts](src/lib/supabase/guestbook-schema.ts): 테이블 생성, RLS, 정책, 트리거 SQL
- [guestbook-service.ts](src/lib/supabase/guestbook-service.ts): 스키마 실행/조회/등록 함수

## 최근 리팩터링

- `About / Skills / Projects / Career`의 공통 레이아웃을 `SectionFrame`으로 통합
- 섹션 프레임(타이틀 + 컨테이너) 중복 제거로 유지보수성 개선
- z-index 정책 분리로 창(Window)이 위젯보다 항상 상단에 오도록 레이어 우선순위 고정
- Desktop 윈도우 레이어의 스택 컨텍스트(`z-20`) 제거로 창 포커스 시 위젯보다 위에 정상 노출

## 배포

Vercel 배포를 기준으로 설계되어 있으며, 일반적인 Next.js 배포 절차를 그대로 사용할 수 있습니다.
