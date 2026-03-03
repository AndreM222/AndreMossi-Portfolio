import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { fetchRecentCommits, parseCommitForNews } from '../../../api/gitAPI'

export async function GET() {
    try {
        let news = []
        try {
            const kvNews = await kv.zrevrange('news', 0, 24)
            news = kvNews.map(item => JSON.parse(item))
        } catch {
            const commits = await fetchRecentCommits(25)
            news = commits.map(commit => parseCommitForNews(commit))
        }

        return NextResponse.json(news, {
            headers: {
                'Cache-Control': 's-maxage=1800, stale-while-revalidate=300'
            }
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json([], { status: 500 })
    }
}

export async function POST() {
    try {
        const commits = await fetchRecentCommits(1)
        if (commits[0]) {
            const newsItem = parseCommitForNews(commits[0])

            await kv.zadd('news', {
                score: Date.now(),
                member: JSON.stringify(newsItem)
            })

            const allNews = await kv.zrevrange('news', 0, 24)
            if (allNews.length > 25) {
                await kv.zremrangebyrank('news', 0, allNews.length - 26)
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
