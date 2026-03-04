import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function POST(req) {
    try {
        const subscription = await req.json()

        await kv.sadd('push_subscribers', JSON.stringify(subscription))

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Failed' }, { status: 500 })
    }
}
