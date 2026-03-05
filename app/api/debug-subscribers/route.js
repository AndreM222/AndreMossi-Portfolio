import { NextResponse } from 'next/server'
import { kv } from '@vercel/kv'

export async function GET() {
    try {
        const subscribers = await kv.smembers('push_subscribers')
        return NextResponse.json(subscribers || [])
    } catch (error) {
        console.error(error)
        return NextResponse.json([], { status: 500 })
    }
}
