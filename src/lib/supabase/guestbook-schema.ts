export const GUESTBOOK_TABLE = 'guestbook_entries'

export const CREATE_GUESTBOOK_TABLE_SQL = `
create extension if not exists pgcrypto;

create table if not exists public.${GUESTBOOK_TABLE} (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Anonymous',
  message text not null check (char_length(message) between 1 and 80),
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_${GUESTBOOK_TABLE}_created_at
  on public.${GUESTBOOK_TABLE} (created_at desc);
`

export const ENABLE_GUESTBOOK_RLS_SQL = `
alter table public.${GUESTBOOK_TABLE} enable row level security;

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
    select 1
    from pg_trigger
    where tgname = 'trg_set_guestbook_updated_at'
  ) then
    create trigger trg_set_guestbook_updated_at
    before update on public.${GUESTBOOK_TABLE}
    for each row
    execute function public.set_guestbook_updated_at();
  end if;
end $$;

do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = '${GUESTBOOK_TABLE}'
      and policyname = 'guestbook_select_policy'
  ) then
    create policy guestbook_select_policy
      on public.${GUESTBOOK_TABLE}
      for select
      using (is_visible = true);
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = '${GUESTBOOK_TABLE}'
      and policyname = 'guestbook_insert_policy'
  ) then
    create policy guestbook_insert_policy
      on public.${GUESTBOOK_TABLE}
      for insert
      with check (char_length(message) between 1 and 80);
  end if;
end $$;
`

export const GUESTBOOK_SCHEMA_SQL = `
${CREATE_GUESTBOOK_TABLE_SQL}

${ENABLE_GUESTBOOK_RLS_SQL}
`
