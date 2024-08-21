import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const interactions = await prisma.matchInteraction.findMany({
      where: { userId: (session.user as { id: string }).id as string },
      include: {
        match: {
          select: {
            companyName: true,
            industry: true,
          },
        },
      },
    })

    return NextResponse.json(interactions)
  } catch (error) {
    console.error('Interactions retrieval error:', error)
    return NextResponse.json({ error: 'Failed to retrieve interactions' }, { status: 500 })
  }
}