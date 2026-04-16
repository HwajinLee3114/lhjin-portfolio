import type { FilterTag, Project } from './projects'

export const FILTER_NAMES = ['all', 'feature', 'personal', 'team'] as const
export type FilterName = (typeof FILTER_NAMES)[number]

const TAG_COLORS: Record<string, string> = {
  team: 'cornflowerblue',
  feature: 'gold',
  풀스택: 'tomato',
  FE: 'lightgreen',
  BE: 'coral',
  personal: 'indianred',
}

export function tag(name: string): FilterTag {
  return { name, color: TAG_COLORS[name] || 'gray' }
}

export function filterProjects(projects: Project[], filterName: string): Project[] {
  if (filterName === 'all') return projects
  return projects.filter((p) => p.filter.some((f) => f.name === filterName))
}
