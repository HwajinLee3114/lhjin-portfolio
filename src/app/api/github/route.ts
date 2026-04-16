import { NextResponse } from 'next/server'
import type { ContributionDay } from '@/types/github'

const GITHUB_USERNAME = 'HwajinLee3114'
const CACHE_DURATION = 3600

export async function GET() {
  const [userRes, reposRes, contribRes] = await Promise.all([
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: CACHE_DURATION },
    }),
    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`, {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: CACHE_DURATION },
    }),
    fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`, {
      next: { revalidate: CACHE_DURATION },
    }),
  ])

  if (!userRes.ok) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 502 })
  }

  const user = await userRes.json()
  const repos = reposRes.ok ? await reposRes.json() : []

  let contributions: ContributionDay[] = []
  let totalContributions = 0

  if (contribRes.ok) {
    const contribData = await contribRes.json()
    totalContributions = contribData.total?.lastYear || 0
    const allDays: ContributionDay[] = contribData.contributions?.flat() || []
    contributions = allDays.slice(-365)
  }

  return NextResponse.json({
    publicRepos: user.public_repos,
    followers: user.followers,
    recentRepos: repos.map((r: { name: string; html_url: string; updated_at: string }) => ({
      name: r.name,
      url: r.html_url,
      updatedAt: r.updated_at,
    })),
    contributions,
    totalContributions,
  })
}
