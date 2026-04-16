-- ============================================
-- Guestbook RLS 정책 + 트리거
-- 대상: 001 실행 후 Supabase SQL Editor에서 실행
-- 날짜: 2026-04-16
-- ============================================

-- RLS 활성화
alter table public.portfolio_guestbook enable row level security;

-- updated_at 자동 갱신 트리거
create or replace function public.set_guestbook_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
begin
  if not exists (
    select 1 from pg_trigger where tgname = 'trg_set_guestbook_updated_at'
  ) then
    create trigger trg_set_guestbook_updated_at
    before update on public.portfolio_guestbook
    for each row
    execute function public.set_guestbook_updated_at();
  end if;
end $$;

-- SELECT 정책: is_visible = true 인 항목만 조회 가능
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'portfolio_guestbook'
      and policyname = 'guestbook_select_policy'
  ) then
    create policy guestbook_select_policy
      on public.portfolio_guestbook
      for select
      using (is_visible = true);
  end if;
end $$;

-- INSERT 정책: 메시지 1~80자 검증
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'portfolio_guestbook'
      and policyname = 'guestbook_insert_policy'
  ) then
    create policy guestbook_insert_policy
      on public.portfolio_guestbook
      for insert
      with check (char_length(message) between 1 and 80);
  end if;
end $$;
