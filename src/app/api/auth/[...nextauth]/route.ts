import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/db'
import bcrypt from 'bcrypt'
import { verifyMFAToken } from '@/lib/mfa'

const MAX_LOGIN_ATTEMPTS = 5
const LOCKOUT_DURATION = 15 * 60 * 1000 

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        mfaToken: { label: "MFA Token", type: "text" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          return null
        }

        if (user.lockedUntil && user.lockedUntil > new Date()) {
          throw new Error('Account is locked. Please try again later.')
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        if (!isPasswordValid) {
          await prisma.user.update({
            where: { id: user.id },
            data: { 
              loginAttempts: user.loginAttempts + 1,
              lockedUntil: user.loginAttempts + 1 >= MAX_LOGIN_ATTEMPTS 
                ? new Date(Date.now() + LOCKOUT_DURATION) 
                : null
            }
          })
          throw new Error('Invalid email or password')
        }

        if (user.mfaEnabled) {
          if (!credentials.mfaToken || !verifyMFAToken(user.mfaSecret!, credentials.mfaToken)) {
            throw new Error('Invalid MFA token')
          }
        }

        await prisma.user.update({
          where: { id: user.id },
          data: { loginAttempts: 0, lockedUntil: null }
        })

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as { id: string }).id = token.id as string
      }
      return session
    }
  },
})

export { handler as GET, handler as POST }