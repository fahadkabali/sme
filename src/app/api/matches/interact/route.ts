import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/db'
import { sendEmail } from '@/lib/email'

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

    const match = await prisma.user.findUnique({
      where:{id:matchId}
    })
    if(match){
      await sendEmail(
        match.email,
        `New interaction with your match: ${session.user?.name}`,
        `The user ${session.user?.name} has marked your company as "${status}".`
      )
    }

    return NextResponse.json(interaction)
  } catch (error) {
    console.error('Match interaction error:', error)
    return NextResponse.json({ error: 'Failed to update match interaction' }, { status: 500 })
  }
}