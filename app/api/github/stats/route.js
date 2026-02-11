import { NextResponse } from 'next/server'
import { fetchStats } from '../../../../api/gitAPI'

export async function GET() {
    try {
        const stats = await fetchStats()
        return NextResponse.json(stats, {
            headers: {
                'Cache-Control': 's-maxage=3600, stale-while-revalidate'
            }
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json([], { status: 500 })
    }
}
