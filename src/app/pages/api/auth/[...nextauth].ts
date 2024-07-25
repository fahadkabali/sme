// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { User } from "../../../types/auth"
import { v4 as uuidv4 } from 'uuid'
import { sendPasswordResetEmail, sendVerificationEmail } from '../../../utils/email'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          if (!user.emailVerified) {
            throw new Error('Please verify your email before logging in.');
          }
          return { id: user.id, email: user.email, role: user.role };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as User).role = token.role as 'SME' | 'BigBrand';
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  }
}

const handler = NextAuth(authOptions);

export default async function wrappedHandler(req: { method: string; url: string | string[] }, res: any) {
  if (req.method === 'POST') {
    if (req.url?.includes('request-reset')) {
      return handlePasswordResetRequest(req, res);
    } else if (req.url?.includes('reset-password')) {
      return handlePasswordReset(req, res);
    }
  }
  return handler(req, res);
}

async function handlePasswordResetRequest(req: { method?: string; url?: string | string[]; body?: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal that the user doesn't exist
      return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 3600000); 

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

async function handlePasswordReset(req: { method?: string; url?: string | string[]; body?: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) {
  const { token, newPassword } = req.body;

  try {
    const passwordReset = await prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!passwordReset || passwordReset.expires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired password reset token.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: passwordReset.userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordReset.delete({
      where: { id: passwordReset.id },
    });

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'An error occurred while resetting your password.' });
  }
}



// pages/api/auth/[...nextauth].ts
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt"
import { User } from "../../../types/auth"
import { v4 as uuidv4 } from 'uuid'
import { sendPasswordResetEmail, sendVerificationEmail } from '../../../utils/email'
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          if (!user.emailVerified) {
            throw new Error('Please verify your email before logging in.');
          }
          return { id: user.id, email: user.email, role: user.role };
        }
        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as User).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as User).role = token.role as 'SME' | 'BigBrand';
      }
      return session;
    }
  },
  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    encryption: true,
  }
}

const handler = NextAuth(authOptions);

export default async function wrappedHandler(req: { method: string; url: string | string[] }, res: any) {
  if (req.method === 'POST') {
    if (req.url?.includes('request-reset')) {
      return handlePasswordResetRequest(req, res);
    } else if (req.url?.includes('reset-password')) {
      return handlePasswordReset(req, res);
    }
  }
  return handler(req, res);
}

async function handlePasswordResetRequest(req: { method?: string; url?: string | string[]; body?: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) {
  const { email } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      // Don't reveal that the user doesn't exist
      return res.status(200).json({ message: 'If a user with that email exists, a password reset link has been sent.' });
    }

    const token = uuidv4();
    const expires = new Date(Date.now() + 3600000); 

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

async function handlePasswordReset(req: { method?: string; url?: string | string[]; body?: any }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string }): void; new(): any } } }) {
  const { token, newPassword } = req.body;

  try {
    const passwordReset = await prisma.passwordReset.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!passwordReset || passwordReset.expires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired password reset token.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: passwordReset.userId },
      data: { password: hashedPassword },
    });

    await prisma.passwordReset.delete({
      where: { id: passwordReset.id },
    });

    res.status(200).json({ message: 'Password has been reset successfully.' });
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'An error occurred while resetting your password.' });
  }
}