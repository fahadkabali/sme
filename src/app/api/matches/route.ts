import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { findMatches } from '@/lib/matching'

export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const matches = await findMatches(session.user?.email as string)
    return NextResponse.json(matches)
  } catch (error) {
    console.error('Matching error:', error)
    return NextResponse.json({ error: 'Failed to find matches' }, { status: 500 })
  }
}