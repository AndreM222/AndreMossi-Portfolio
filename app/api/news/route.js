import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { fetchRecentCommits, parseCommitForNews } from '../../../api/gitAPI'
import webpush from 'web-push'
import { humanizeSummary, typeConfig } from '../../../components/humanizeCommits'

webpush.setVapidDetails(
    'mailto:admin@yourdomain.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
)

export async function GET() {
    try {
        const commits = await fetchRecentCommits(25)
        const parsed = commits.map(parseCommitForNews).filter(Boolean)

        return NextResponse.json(parsed, {
            headers: {
                'Cache-Control': 's-maxage=3600, stale-while-revalidate'
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
        if (!commits[0]) {
            return NextResponse.json({ success: false })
        }

        const newsItem = parseCommitForNews(commits[0])
        if (!newsItem) {
            return NextResponse.json({ success: false })
        }

        const subscribers = await kv.smembers('push_subscribers')

        for (const sub of subscribers) {
            try {
                await webpush.sendNotification(
                    sub,
                    JSON.stringify({
                        title:
                            typeConfig[newsItem.type] || 'Portfolio updated',
                        body: humanizeSummary(newsItem.summary),
                        url: 'https://andremossi.vercel.app/?entry=news'
                    })
                )
                console.log('Push sent successfully')
            } catch (err) {
                if (err.statusCode === 410 || err.statusCode === 404) {
                    await kv.srem('push_subscribers', sub)
                }
                console.error('Push failed:', err)
            }
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
