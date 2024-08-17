import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/db'

export async function POST(req: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { matchId, status } = await req.json()

  try {
    const interaction = await prisma.matchInteraction.upsert({
      where: {
        userId_matchId: {
          userId: session.user?.id as string,
          matchId,
        },
      },
      update: { status },
      create: {
        userId: session.user?.id as string,
        matchId,
        status,
      },
    })

    return NextResponse.json(interaction)
  } catch (error) {
    console.error('Match interaction error:', error)
    return NextResponse.json({ error: 'Failed to update match interaction' }, { status: 500 })
  }
}