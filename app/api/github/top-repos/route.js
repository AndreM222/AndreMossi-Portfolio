import { NextResponse } from 'next/server'
import { fetchTopRepos } from '../../../../api/gitAPI'

export async function GET() {
    try {
        const repos = await fetchTopRepos()
        return NextResponse.json(repos, {
            headers: {
                'Cache-Control': 's-maxage=3600, stale-while-revalidate'
            }
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json([], { status: 500 })
    }
}
