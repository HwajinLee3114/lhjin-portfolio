# 데이터베이스 — lhjin-portfolio

## 인프라

- **서비스**: Supabase (PostgreSQL)
- **스키마 파일**: `src/lib/supabase/guestbook-schema.ts`
- **서비스 파일**: `src/lib/supabase/guestbook-service.ts`

## 테이블

### `guestbook_entries`

방명록 테이블. 방문자가 남기는 짧은 메시지를 저장.

| 컬럼 | 타입 | 기본값 | 제약조건 | 설명 |
|------|------|--------|---------|------|
| `id` | `uuid` | `gen_random_uuid()` | PK | 고유 식별자 |
| `name` | `text` | `'Anonymous'` | NOT NULL | 작성자 이름 |
| `message` | `text` | - | NOT NULL, 1~80자 | 메시지 내용 |
| `is_visible` | `boolean` | `true` | NOT NULL | 표시 여부 |
| `created_at` | `timestamptz` | `now()` | NOT NULL | 생성 시각 |
| `updated_at` | `timestamptz` | `now()` | NOT NULL | 수정 시각 |

**인덱스:**
- `idx_guestbook_entries_created_at` — `created_at DESC` (최신순 조회 최적화)

**트리거:**
- `trg_set_guestbook_updated_at` — UPDATE 시 `updated_at` 자동 갱신

### RLS (Row Level Security) 정책

| 정책 | 동작 | 조건 |
|------|------|------|
| `guestbook_select_policy` | SELECT | `is_visible = true` |
| `guestbook_insert_policy` | INSERT | `char_length(message) BETWEEN 1 AND 80` |

## TypeScript 타입

```typescript
// 조회 결과 타입
interface GuestbookEntryRow {
  id: string          // UUID
  name: string
  message: string     // 최대 80자
  is_visible: boolean
  created_at: string  // ISO 8601 timestamp
  updated_at: string  // ISO 8601 timestamp
}

// 생성 입력 타입
interface GuestbookCreateInput {
  name?: string       // 선택, 기본 'Anonymous'
  message: string     // 필수, 1~80자
}
```

## 서비스 함수

| 함수 | 설명 | 파일 |
|------|------|------|
| `fetchGuestbookEntries(client, limit?)` | 보이는 항목을 최신순 조회 (기본 50개) | `guestbook-service.ts` |
| `insertGuestbookEntry(client, input)` | 새 방명록 항목 추가 | `guestbook-service.ts` |
| `runGuestbookSchema(executor)` | DB 스키마 초기화 | `guestbook-service.ts` |

## 정적 데이터 (JSON)

DB가 아닌 JSON 파일로 관리하는 콘텐츠:

| 파일 | 설명 | 사용처 |
|------|------|--------|
| `data/projects.json` | 프로젝트 목록 (이름, 설명, 기술스택, 이미지) | `/project` 페이지 |
| `data/skills.json` | 기술 스택 (카테고리별) | `/skills` 페이지 |
| `data/career.json` | 경력 (회사, 기간, 프로젝트) | `/career` 페이지 |

- JSON 래퍼: `src/data/*.ts` — JSON을 import하고 타입을 부여
