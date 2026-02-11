const parseYearMonth = (value?: string) => {
  if (!value) return null
  const [y, m] = value.split('-').map((v) => parseInt(v, 10))
  if (!y || !m) return null
  return { y, m }
}

const diffMonths = (start: { y: number; m: number }, end: { y: number; m: number }) => {
  return (end.y - start.y) * 12 + (end.m - start.m) + 1
}

const formatDuration = (months: number) => {
  const years = Math.floor(months / 12)
  const remain = months % 12
  const parts: string[] = []
  if (years > 0) parts.push(`${years}년`)
  if (remain > 0) parts.push(`${remain}개월`)
  return parts.join(' ')
}

export const formatPeriod = (periodStart?: string, periodEnd?: string) => {
  const start = parseYearMonth(periodStart)
  const end = parseYearMonth(periodEnd)

  if (!start) return ''

  const startStr = `${start.y}.${String(start.m).padStart(2, '0')}`
  const endStr = end ? `${end.y}.${String(end.m).padStart(2, '0')}` : ''

  if (!end) {
    return `${startStr} ~`
  }

  const months = diffMonths(start, end)
  const duration = formatDuration(months)
  return `${startStr} ~ ${endStr}${duration ? ` (${duration})` : ''}`
}
