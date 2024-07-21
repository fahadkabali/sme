// utils/email.ts
import nodemailer from 'nodemailer';

export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    from: '"Your App" <noreply@yourapp.com>',
    to: email,
    subject: 'Password Reset Request',
    text: `Please use the following link to reset your password: ${resetUrl}`,
    html: `<p>Please use the following link to reset your password:</p><p><a href="${resetUrl}">${resetUrl}</a></p>`,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: '"Your App" <noreply@yourapp.com>',
    to: email,
    subject: 'Email Verification',
    text: `Please use the following link to verify your email: ${verifyUrl}`,
    html: `<p>Please use the following link to verify your email:</p><p><a href="${verifyUrl}">${verifyUrl}</a></p>`,
  });
}
