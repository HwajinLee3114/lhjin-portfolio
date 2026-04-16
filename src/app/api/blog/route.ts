import { NextResponse } from 'next/server'

const TISTORY_RSS = 'https://lhjini.tistory.com/rss'
const CACHE_DURATION = 3600

export async function GET() {
  try {
    const res = await fetch(TISTORY_RSS, {
      next: { revalidate: CACHE_DURATION },
    })

    if (!res.ok) {
      return NextResponse.json({ posts: [] })
    }

    const xml = await res.text()

    const items: { title: string; link: string; pubDate: string }[] = []
    const itemRegex = /<item>([\s\S]*?)<\/item>/g
    let match

    while ((match = itemRegex.exec(xml)) !== null && items.length < 5) {
      const content = match[1]
      const title = content.match(/<title><!\[CDATA\[(.*?)\]\]><\/title>/)?.[1] || ''
      const link = content.match(/<link>(.*?)<\/link>/)?.[1] || ''
      const pubDate = content.match(/<pubDate>(.*?)<\/pubDate>/)?.[1] || ''

      if (title && link) {
        items.push({ title, link, pubDate })
      }
    }

    return NextResponse.json({ posts: items })
  } catch {
    return NextResponse.json({ posts: [] })
  }
}
