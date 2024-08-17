import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { findMatches } from '@/lib/matching'

export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const url = new URL(req.url)
  const page = parseInt(url.searchParams.get('page') || '1')
  const search = url.searchParams.get('search') || undefined
  const industry = url.searchParams.get('industry') || undefined
  const companyType = url.searchParams.get('companyType') || undefined
  const location = url.searchParams.get('location') || undefined

  try {
    const matches = await findMatches((session.user as {id: string}).id, page, 10, {
      search,
      industry,
      companyType,
      location,
    })
    return NextResponse.json(matches)
  } catch (error) {
    console.error('Matching error:', error)
    return NextResponse.json({ error: 'Failed to find matches' }, { status: 500 })
  }
}