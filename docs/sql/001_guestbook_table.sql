-- ============================================
-- Guestbook 테이블 생성
-- 대상: Supabase SQL Editor에서 실행
-- 날짜: 2026-04-16
-- ============================================

-- UUID 생성 확장
create extension if not exists pgcrypto;

-- 테이블 생성
create table if not exists public.portfolio_guestbook (
  id uuid primary key default gen_random_uuid(),
  name text not null default 'Anonymous',
  message text not null check (char_length(message) between 1 and 80),
  is_visible boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 최신순 조회 인덱스
create index if not exists idx_portfolio_guestbook_created_at
  on public.portfolio_guestbook (created_at desc);
