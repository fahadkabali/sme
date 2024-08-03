import { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';
import { sendPasswordResetEmail } from '../../../utils/email';
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal that the user doesn't exist
      return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 3600000); // 1 hour from now

    await prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expires,
      },
    });

    await sendPasswordResetEmail(user.email, token);

    res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
  } catch (error) {
    console.error('Password reset request error:', error);
    res.status(500).json({ message: 'An error occurred while processing your request.' });
  }
}