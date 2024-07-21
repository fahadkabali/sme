// pages/api/users/index.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import { User, SignUpData } from '../../../types/auth'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ user: Omit<User, 'password'> } | { error: string }>
) {
  if (req.method === "POST") {
    const { email, password, role } = req.body as SignUpData
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          role,
        },
      })
      res.status(201).json({ user: { id: user.id, email: user.email, role: user.role } })
    } catch (error) {
      res.status(400).json({ error: "Unable to create user" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}