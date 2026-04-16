# 기능 & 라우트 목록 — lhjin-portfolio

## 라우트 구조

| 경로              | 파일                              | 설명                                       |
| ----------------- | --------------------------------- | ------------------------------------------ |
| `/`               | `src/app/page.tsx`                | 랜딩 — 모드 선택 (이력서 보기 / OS 체험)   |
| `/resume`         | `src/app/resume/page.tsx`         | 문서형 포트폴리오 (스크롤 기반)            |
| `/resume/preview` | `src/app/resume/preview/page.tsx` | A4 이력서 미리보기 (인쇄/PDF 지원)         |
| `/os`             | `src/app/os/page.tsx`             | 데스크탑 OS 시뮬레이터                     |
| `/home`           | `src/app/home/page.tsx`           | 인트로 섹션 (타이핑 애니메이션, OS 배경용) |
| `/about`          | `src/app/about/page.tsx`          | 프로필 (OS 윈도우 내부 콘텐츠)             |
| `/skills`         | `src/app/skills/page.tsx`         | 기술 스택 (OS 윈도우 내부 콘텐츠)          |
| `/project`        | `src/app/project/page.tsx`        | 프로젝트 아카이브 (OS 윈도우 내부 콘텐츠)  |
| `/career`         | `src/app/career/page.tsx`         | 경력 타임라인 (OS 윈도우 내부 콘텐츠)      |
| `/architecture`   | `src/app/architecture/page.tsx`   | 시스템 아키텍처 다이어그램                 |

- 404 처리: `src/app/not-found.tsx`
- `/about`, `/skills`, `/project`, `/career`는 OS 데스크탑 내 **윈도우**로 열림
- `/resume`는 독립된 문서형 레이아웃 (네비게이션 바 + 스크롤)
- `/resume/preview`는 A4 인쇄용 이력서 (JSON 데이터 기반 자동 생성)

## 핵심 기능

### 1. 데스크탑 OS 시뮬레이터

메인 UX. 포트폴리오 각 섹션이 드래그 가능한 윈도우로 열리는 구조.

- **Desktop** (`components/os/Desktop.tsx`): 전체 데스크탑 환경
- **WindowFrame** (`components/os/WindowFrame.tsx`): 드래그/리사이즈 가능한 윈도우
- **Dock** (`components/os/Dock.tsx`): 하단 앱 런처 바
- **DesktopIcon** (`components/os/DesktopIcon.tsx`): 바탕화면 앱 아이콘
- **StatusBar** (`components/os/StatusBar.tsx`): 상단 상태 바

### 2. 위젯 시스템

데스크탑 위에 떠 있는 인터랙티브 위젯들.

- **StickyMemo** (`components/os/StickyMemo.tsx`): 드래그 가능한 스티키 메모 (4색)
- **MusicPlayer** (`components/os/MusicPlayer.tsx`): BGM 오디오 플레이어
- **GuestbookWidget** (`components/os/GuestbookWidget.tsx`): 방명록 (Supabase 연동)
- **MiniTerminalWidget** (`components/os/MiniTerminalWidget.tsx`): 미니 터미널

### 3. 프로젝트 아카이브

프로젝트를 카드 형태로 보여주고 필터링/검색 지원.

- **필터**: 개인 / 팀 / 기능별 (`?filter=personal|team|feature`)
- **검색**: 프로젝트 이름, 설명, 기술스택으로 검색
- **상세 모달**: 프로젝트 상세 정보 모달 (`ProjectDetailModal.tsx`)
- **데이터 소스**: `data/projects.json`

### 4. 경력 타임라인

경력 히스토리를 타임라인 형태로 표시.

- 회사별 기간, 직책, 담당 프로젝트
- 프로젝트 상세는 접기/펼치기
- **데이터 소스**: `data/career.json`

### 5. 기술 스택 쇼케이스

카테고리별(Frontend, Backend, Database, Tools, DevOps) 기술 스택.

- 아이콘 + 이름 배지 형태
- **데이터 소스**: `data/skills.json`

### 6. 시스템 아키텍처

React Flow를 이용한 인터랙티브 아키텍처 다이어그램.

- 커스텀 노드 (`ServiceNode.tsx`)
- 줌/패닝 지원
- **데이터 소스**: `src/data/architecture.ts`

### 7. 테마 시스템

3가지 테마 지원 (CSS 변수 기반).

| 테마   | 클래스          | 배경색    |
| ------ | --------------- | --------- |
| Light  | (기본)          | `#ffffff` |
| Dark   | `.dark`         | `#1f262e` |
| Custom | `.theme-custom` | `#f9f7f5` |

- 전환: `ThemeToggle` 컴포넌트 (`components/comn/ThemeToggle.tsx`)
- `document.documentElement.classList`로 토글

### 8. 방명록 (Guestbook)

방문자 메시지를 Supabase DB에 저장/조회.

- **DB**: Supabase `portfolio_guestbook` 테이블 (`src/lib/supabase/client.ts`)
- 위젯 열릴 때 자동 조회, 전송 시 DB insert + UI 즉시 반영
- 최대 80자 메시지, 이름 선택 입력 (기본: Anonymous)
- RLS 정책으로 보안 처리 (SELECT: `is_visible=true`, INSERT: 메시지 길이 검증)
- 로딩/전송 중 스피너, 빈 상태 안내 표시
