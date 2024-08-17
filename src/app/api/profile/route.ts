import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/db'

export async function PUT(req: Request) {
  const session = await getServerSession()

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { name, companyName, companyType, industry, location, description, website } = await req.json()

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user?.email as string },
      data: { name, companyName, companyType, industry, location, description, website },
    })

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 })
  }
}