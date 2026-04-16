import { NextResponse } from 'next/server'

const GITHUB_USERNAME = 'HwajinLee3114'
const CACHE_DURATION = 3600

export async function GET() {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
    next: { revalidate: CACHE_DURATION },
  })

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 502 })
  }

  const user = await res.json()

  const reposRes = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=5`,
    {
      headers: { Accept: 'application/vnd.github.v3+json' },
      next: { revalidate: CACHE_DURATION },
    },
  )

  const repos = reposRes.ok ? await reposRes.json() : []

  return NextResponse.json({
    publicRepos: user.public_repos,
    followers: user.followers,
    recentRepos: repos.map((r: { name: string; html_url: string; updated_at: string }) => ({
      name: r.name,
      url: r.html_url,
      updatedAt: r.updated_at,
    })),
  })
}
