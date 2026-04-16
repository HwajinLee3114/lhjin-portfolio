export type ContributionDay = { date: string; count: number; level: number }

export type GitHubData = {
  publicRepos: number
  followers: number
  recentRepos: { name: string; url: string; updatedAt: string }[]
  contributions: ContributionDay[]
  totalContributions: number
}
