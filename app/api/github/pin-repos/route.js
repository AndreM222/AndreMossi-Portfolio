import { NextResponse } from 'next/server'
import { fetchPinRepos } from '../../../../api/gitAPI'

export async function GET() {
    try {
        const repos = await fetchPinRepos()
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
