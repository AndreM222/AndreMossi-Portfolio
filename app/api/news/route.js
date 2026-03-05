import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { fetchRecentCommits, parseCommitForNews } from '../../../api/gitAPI'
import webpush from 'web-push'
import { humanizeSummary } from '../../../components/humanizeCommits'
import NavContent from '../../../components/translations/navigationContent'

import newsLang from '../../../locales/pages/news.json'
import grammarLang from '../../../locales/grammarSymbols.json'

webpush.setVapidDetails(
    'mailto:admin@yourdomain.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
)

/* ===========================
   GET - Public News Feed
   =========================== */
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '25')

        const start = (page - 1) * limit
        const end = start + limit - 1

        const items = await kv.lrange('news_feed', start, end)

        return NextResponse.json(items, {
            headers: {
                'Cache-Control': 's-maxage=300, stale-while-revalidate'
            }
        })
    } catch (error) {
        console.error('GET /api/news error:', error)
        return NextResponse.json([], { status: 500 })
    }
}

/* ===========================
   POST - Cron Trigger Only
   =========================== */
export async function POST(request) {
    try {
        const authHeader = request.headers.get('authorization')
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        // Fetch multiple commits for batching
        const commits = await fetchRecentCommits(10)
        if (!commits?.length) {
            return NextResponse.json({ success: false })
        }

        // Parse commits once
        const parsedCommits = commits
            .map(parseCommitForNews)
            .filter(item => item?.id)

        if (!parsedCommits.length) {
            return NextResponse.json({ success: false })
        }

        // Get latest stored item
        const latestRaw = await kv.lindex('news_feed', 0)
        const latest = latestRaw
            ? typeof latestRaw === 'string'
                ? JSON.parse(latestRaw)
                : latestRaw
            : null

        const latestId = latest?.id || null

        // Collect only NEW commits (stop once we hit known id)
        const newItems = []
        for (const item of parsedCommits) {
            if (item.id === latestId) break
            newItems.push(item)
        }

        if (!newItems.length) {
            return NextResponse.json({ success: true, skipped: true })
        }

        // Insert oldest first so order stays correct
        for (const item of [...newItems].reverse()) {
            await kv.lpush('news_feed', {
                ...item,
                createdAt: Date.now()
            })
        }

        await kv.ltrim('news_feed', 0, 199)

        /* ===========================
           BUILD NOTIFICATION CONTENT
           =========================== */

        let title = ''
        let body = ''

        if (newItems.length === 1) {
            const single = newItems[0]

            title =
                NavContent(newsLang, 'types', single.type) ||
                NavContent(newsLang, 'types', 'feat')

            body = humanizeSummary(single.summary)
        } else {
            const counts = {}

            for (const item of newItems) {
                counts[item.type] = (counts[item.type] || 0) + 1
            }

            const parts = Object.entries(counts).map(
                ([type, count]) =>
                    `${count} ${NavContent(newsLang, 'switch-types', type)}`
            )

            const separator = NavContent(grammarLang, 'separator', 'content')

            const andWord = NavContent(grammarLang, 'and', 'content')

            if (parts.length === 1) {
                body = parts[0]
            } else {
                body =
                    parts.slice(0, -1).join(separator) +
                    andWord +
                    parts[parts.length - 1]
            }

            title = `${newItems.length} ${NavContent(newsLang, "notificationMSG", "content")}`
        }

        /* ===========================
           SEND PUSH
           =========================== */

        const subscribers = await kv.smembers('push_subscribers')

        await Promise.allSettled(
            subscribers.map(async sub => {
                try {
                    await webpush.sendNotification(
                        sub,
                        JSON.stringify({
                            title,
                            body,
                            url: 'https://andremossi.vercel.app/?entry=news'
                        })
                    )
                } catch (err) {
                    if (err.statusCode === 410 || err.statusCode === 404) {
                        await kv.srem('push_subscribers', sub)
                    }
                }
            })
        )

        return NextResponse.json({
            success: true,
            inserted: newItems.length
        })
    } catch (error) {
        console.error('POST /api/news error:', error)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
