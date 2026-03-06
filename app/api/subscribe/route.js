import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(req) {
    try {
        const { subscription, locale } = await req.json()

        await kv.sadd(
            'push_subscribers',
            JSON.stringify({
                subscription,
                locale: locale
            })
        )

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
