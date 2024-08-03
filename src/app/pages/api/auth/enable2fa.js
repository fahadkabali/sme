import speakeasy from 'speakeasy';
import { User } from "../../../types/auth"  
import { NextApiRequest, NextApiResponse } from 'next';

import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import email from 'next-auth/providers/email';

const prisma = new PrismaClient()
export default async function handler(req, res) {
  const secret = speakeasy.generateSecret();
  // Save the secret.base32 to the user's record in the database
  res.json({ otpauth_url: secret.otpauth_url });
}
const user = await prisma.user.findUnique({ where: { email } });
// In your sign-in logic:
const verified = speakeasy.totp.verify({
  secret: user.twoFactorSecret,
  encoding: 'base32',
  token: req.body.twoFactorToken
});
if (!verified) {
  throw new Error('Invalid 2FA token');
}

