import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { sendEmail } from '@/lib/email'
import crypto from 'crypto'

export async function POST(req: Request) {
  const { email } = await req.json()

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return NextResponse.json({ message: 'If an account exists, a reset link has been sent.' })
  }

  const resetToken = crypto.randomBytes(32).toString('hex')
  const resetTokenExpiry = Date.now() + 3600000 // 1 hour from now

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken, resetTokenExpiry },
  })

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`
  await sendEmail(
    user.email,
    'Password Reset Request',
    `Click the following link to reset your password: ${resetUrl}`
  )

  return NextResponse.json({ message: 'If an account exists, a reset link has been sent.' })
}