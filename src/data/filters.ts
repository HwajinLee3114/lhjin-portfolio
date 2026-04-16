export const FILTER_NAMES = ['all', 'feature', 'personal', 'team'] as const
export type FilterName = (typeof FILTER_NAMES)[number]

const TAG_COLORS: Record<string, string> = {
  team: '#6495ED',
  feature: '#FFD700',
  풀스택: '#FF6347',
  FE: '#90EE90',
  BE: '#FF7F50',
  personal: '#CD5C5C',
}

export function tag(name: string): { name: string; color: string } {
  return { name, color: TAG_COLORS[name] || 'gray' }
}

export function filterProjects<T extends { filter: { name: string }[] }>(
  projects: T[],
  filterName: string,
): T[] {
  if (filterName === 'all') return projects
  return projects.filter((p) => p.filter.some((f) => f.name === filterName))
}
