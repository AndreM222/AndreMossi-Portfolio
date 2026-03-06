import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'
import { parseCommitForNews } from '../../../api/gitAPI'
import crypto from 'crypto'
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
   POST - GitHub Webhook
   =========================== */
export async function POST(request) {
    try {
        const signature = request.headers.get('x-hub-signature-256')
        const event = request.headers.get('x-github-event')

        if (!signature || !event) {
            return NextResponse.json(
                { error: 'Missing headers' },
                { status: 400 }
            )
        }

        // Get raw body for verification
        const rawBody = await request.text()

        const expectedSignature =
            'sha256=' +
            crypto
                .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET)
                .update(rawBody)
                .digest('hex')

        if (
            !crypto.timingSafeEqual(
                Buffer.from(signature),
                Buffer.from(expectedSignature)
            )
        ) {
            return NextResponse.json(
                { error: 'Invalid signature' },
                { status: 401 }
            )
        }

        const body = JSON.parse(rawBody)

        let newItems = []

        /* ===========================
           PUSH EVENT
           =========================== */
        if (event === 'push' && body.commits?.length) {
            const commits = body.commits.map(commit => ({
                repo: body.repository.name,
                message: commit.message,
                url: commit.url,
                date: commit.timestamp
            }))

            const parsedCommits = commits
                .map(parseCommitForNews)
                .filter(item => item?.id)

            newItems.push(...parsedCommits)
        }

        /* ===========================
           STAR EVENT
           =========================== */
        if (event === 'star' && body.action === 'created') {
            newItems.push({
                id: `star-${body.repository.id}-${Date.now()}`,
                type: 'stars',
                category: 'general',
                date: new Date().toISOString().split('T')[0],
                title: body.repository.name,
                summary: `New star on ${body.repository.name}`,
                description: `${body.repository.name} received a new star.`,
                branch: body.repository.name,
                commit: null,
                repo: body.repository.name
            })
        }

        /* ===========================
           NEW REPOSITORY EVENT
           =========================== */
        if (event === 'repository' && body.action === 'created') {
            newItems.push({
                id: `repo-${body.repository.id}`,
                type: 'repository',
                category: 'general',
                date: body.repository.created_at.split('T')[0],
                title: body.repository.name,
                summary: `Created new repository ${body.repository.name}`,
                description: body.repository.description || '',
                branch: body.repository.name,
                commit: null,
                repo: body.repository.name
            })
        }

        if (!newItems.length) {
            return NextResponse.json({ success: true, ignored: true })
        }

        // 🔁 Instead of fetchRecentCommits — use webhook payload
        const commits = body.commits.map(commit => ({
            repo: body.repository.name,
            message: commit.message,
            url: commit.url,
            date: commit.timestamp
        }))

        // Parse commits (UNCHANGED)
        const parsedCommits = commits
            .map(parseCommitForNews)
            .filter(item => item?.id)

        if (!parsedCommits.length) {
            return NextResponse.json({ success: false })
        }

        // Get latest stored item (UNCHANGED)
        const latestRaw = await kv.lindex('news_feed', 0)
        const latest = latestRaw
            ? typeof latestRaw === 'string'
                ? JSON.parse(latestRaw)
                : latestRaw
            : null

        const latestId = latest?.id || null

        newItems = newItems.filter(item => item.id !== latestId)

        if (!newItems.length) {
            return NextResponse.json({ success: true, skipped: true })
        }

        if (!newItems.length) {
            return NextResponse.json({ success: true, skipped: true })
        }

        // Insert oldest first (UNCHANGED)
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

        /* ===========================
   NOTIFICATION FUNCTIONS - LANG ONLY
   =========================== */
        const title = lang => {
            if (newItems.length === 1) {
                const single = newItems[0]
                return (
                    NavContent(newsLang, 'types', single.type, lang, 'en') ||
                    NavContent(newsLang, 'types', 'feat', lang, 'en')
                )
            } else {
                return `${newItems.length} ${NavContent(newsLang, 'notificationMSG', 'content', lang, 'en')}`
            }
        }

        const bodyText = lang => {
            if (newItems.length === 1) {
                const single = newItems[0]
                return humanizeSummary(single.summary)
            } else {
                const counts = {}
                for (const item of newItems) {
                    counts[item.type] = (counts[item.type] || 0) + 1
                }

                const parts = Object.entries(counts).map(
                    ([type, count]) =>
                        `${count} ${NavContent(newsLang, 'switch-types', type, lang, 'en')}`
                )
                const separator = NavContent(
                    grammarLang,
                    'separator',
                    'content',
                    lang,
                    'en'
                )
                const andWord = NavContent(
                    grammarLang,
                    'and',
                    'content',
                    lang,
                    'en'
                )

                return parts.length === 1
                    ? parts[0]
                    : parts.slice(0, -1).join(separator) +
                    andWord +
                    parts[parts.length - 1]
            }
        }

        /* ===========================
           SEND PUSH
           =========================== */

        const subscribers = await kv.smembers('push_subscribers')

        await Promise.allSettled(
            subscribers.map(async sub => {
                try {
                    const { subscription, userLang } = JSON.parse(subStr)

                    await webpush.sendNotification(
                        subscription,
                        JSON.stringify({
                            title: title(userLang),
                            body: bodyText(userLang),
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
