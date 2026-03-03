import { GUESTBOOK_SCHEMA_SQL, GUESTBOOK_TABLE } from '@/lib/supabase/guestbook-schema'

export type GuestbookEntryRow = {
  id: string
  name: string
  message: string
  is_visible: boolean
  created_at: string
  updated_at: string
}

export type GuestbookCreateInput = {
  name?: string
  message: string
}

type QueryError = { message: string } | null

type QueryManyResult<T> = Promise<{ data: T[] | null; error: QueryError }>
type QueryOneResult<T> = Promise<{ data: T | null; error: QueryError }>

type GuestbookSelectBuilder = {
  order: (
    column: keyof GuestbookEntryRow | string,
    options: { ascending: boolean },
  ) => {
    limit: (count: number) => QueryManyResult<GuestbookEntryRow>
  }
}

type GuestbookInsertBuilder = {
  select: (columns: string) => {
    single: () => QueryOneResult<GuestbookEntryRow>
  }
}

type GuestbookTableClient = {
  select: (columns: string) => GuestbookSelectBuilder
  insert: (value: { name: string; message: string }) => GuestbookInsertBuilder
}

export type SupabaseLikeClient = {
  from: (table: string) => GuestbookTableClient
}

export type SqlExecutor = {
  execute: (sql: string) => Promise<unknown>
}

const normalizeGuestName = (name?: string) => {
  const normalized = name?.trim()
  return normalized ? normalized.slice(0, 20) : 'Anonymous'
}

const normalizeGuestMessage = (message: string) => {
  const normalized = message.trim()
  if (!normalized) throw new Error('Message is required')
  if (normalized.length > 80) throw new Error('Message must be 80 chars or fewer')
  return normalized
}

export const runGuestbookSchema = async (executor: SqlExecutor) => {
  return executor.execute(GUESTBOOK_SCHEMA_SQL)
}

export const fetchGuestbookEntries = async (client: SupabaseLikeClient, limit = 50) => {
  const safeLimit = Math.max(1, Math.min(limit, 200))
  const { data, error } = await client
    .from(GUESTBOOK_TABLE)
    .select('id,name,message,is_visible,created_at,updated_at')
    .order('created_at', { ascending: false })
    .limit(safeLimit)

  if (error) throw new Error(error.message)
  return data ?? []
}

export const insertGuestbookEntry = async (
  client: SupabaseLikeClient,
  input: GuestbookCreateInput,
) => {
  const payload = {
    name: normalizeGuestName(input.name),
    message: normalizeGuestMessage(input.message),
  }

  const { data, error } = await client
    .from(GUESTBOOK_TABLE)
    .insert(payload)
    .select('id,name,message,is_visible,created_at,updated_at')
    .single()

  if (error) throw new Error(error.message)
  if (!data) throw new Error('Insert succeeded but no row returned')
  return data
}
