# 기록해 (banya_log) — 프로젝트 분석

## 개요

일상 기록 및 콘텐츠 관리 iOS PWA 앱.
독서/영화/시리즈/스탬프/메모/북마크/캐릭터 등 다양한 콘텐츠를 종합 관리하는 개인 프로젝트.

- 시작일: 2026.01
- 종료일: 진행 중

## 기술 스택

| 분류 | 기술 |
|------|------|
| Frontend | React 18 + TypeScript, Vite, React Router 7 |
| Styling | Tailwind CSS, Framer Motion |
| Backend/DB | Supabase (PostgreSQL + Auth + Edge Functions) |
| Validation | Zod |
| Export | html-to-image, jsPDF, html2canvas |
| Icons | Lucide React |
| Package Manager | pnpm |

## 주요 기능

1. **대시보드** — 일일 완료율, 연속 기록 스트릭, 루틴/습관 트래커, 현재 읽는 책 진행도
2. **피드** — 캘린더 기반 일일 로깅 (월/주 뷰), 카테고리별 항목 관리, 일기 (텍스트 + 이미지 6장)
3. **독서 관리** — 캘린더/히트맵/라이브러리 뷰, Kakao Book API 검색, 독서 세션 타이머, 하이라이트/인용구 관리, 독서 통계, 3D 책장 시각화
4. **영화/시리즈 관리** — TMDB API 연동, 시청 세션 기록, 시즌/에피소드별 진행 추적, 프랜차이즈 그룹핑
5. **메모 & 북마크** — 폴더 기반 정리, 마크다운 에디터, OG 메타 자동 스크랩, Web Share Target API, 트위터 미디어 추출
6. **캐릭터 관리** — 프로필/컬러팔레트/관계도/커미션 트래킹, 캐릭터 카드 이미지/PDF 내보내기
7. **스탬프 수집** — 스탬프북 관리, 방문 기록, 위치 정보, 다중 이미지
8. **아카이브** — 통합 타임라인 피드 (커스텀 포스트 + 완료 콘텐츠)
9. **유틸리티** — 할일 체크리스트, 24시간 시간표, 프로필 카드, 스마트 정리함
10. **설정** — 테마/폰트/다크모드, 데이터 백업/복원, 푸시 알림

## 기술적 특징

- Supabase Edge Functions (계정 삭제, Kakao/TMDB API 프록시, OG 스크래핑)
- 오프라인 mutation 큐 (optimistic update)
- React.lazy 코드 스플리팅
- PWA (홈 화면 설치, Web Share Target)
- Zod 런타임 스키마 검증
- 60+ SQL 마이그레이션
- 338개 TypeScript/TSX 파일

## 프로젝트 구조 (핵심)

```
banya_log/
├── components/          # 196 React 컴포넌트 (도메인별 분류)
│   ├── tabs/            # 메인 탭 라우트
│   ├── books/           # 독서 관리
│   ├── media/           # 영화/시리즈
│   ├── characters/      # 캐릭터 관리
│   ├── stamps/          # 스탬프 수집
│   ├── notes/           # 메모 & 북마크
│   ├── ui/              # 61 공통 UI 컴포넌트
│   └── ...
├── hooks/               # 44 커스텀 훅
├── utils/               # 30+ 유틸리티
│   └── db/              # 35 DB 모듈
├── supabase/            # 마이그레이션 + Edge Functions
│   └── functions/       # delete-account, kakao-book-search, movie-search, fetch-og-data
├── types.ts             # 전체 타입 정의
└── App.tsx              # 메인 앱 (상태 관리 허브)
```

## DB 주요 테이블

- profiles, user_settings, attachments
- categories, items, routines, diaries, backlog_todos
- books, book_sessions, book_highlights, reading_goals
- movies, movie_sessions, movie_highlights
- series, series_seasons, series_sessions, series_highlights
- media_franchises, media_platforms
- notes, note_folders, bookmarks, bookmarks_folders
- characters, character_colors, character_commissions, character_relationships
- stamp_books, stamps, stamp_visits, stamp_images
- archives
