import nodemailer from 'nodemailer';

// Create a nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: process.env.EMAIL_SERVER_SECURE === 'true',
});

interface SendMailOptions {
  to: string;
  subject: string;
  text: string;
  html: string;
}

async function sendMail({ to, subject, text, html }: SendMailOptions) {
  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    text,
    html,
  });
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await sendMail({
    to: email,
    subject: 'Password Reset Request',
    text: `Please use the following link to reset your password: ${resetUrl}`,
    html: `
      <p>Please use the following link to reset your password:</p>
      <p><a href="${resetUrl}">${resetUrl}</a></p>
      <p>This link will expire in 1 hour.</p>
    `,
  });
}

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await sendMail({
    to: email,
    subject: 'Verify Your Email',
    text: `Please use the following link to verify your email: ${verificationUrl}`,
    html: `
      <p>Please use the following link to verify your email:</p>
      <p><a href="${verificationUrl}">${verificationUrl}</a></p>
    `,
  });
}

export async function sendWelcomeEmail(email: string, name: string) {
  await sendMail({
    to: email,
    subject: 'Welcome to Our Platform',
    text: `Welcome ${name}! We're glad to have you on board.`,
    html: `
      <h1>Welcome to Our Platform</h1>
      <p>Hello ${name},</p>
      <p>We're thrilled to have you join our community. Here are some next steps you can take:</p>
      <ul>
        <li>Complete your profile</li>
        <li>Explore our features</li>
        <li>Connect with other users</li>
      </ul>
      <p>If you have any questions, don't hesitate to reach out to our support team.</p>
    `,
  });
}

export async function sendMatchNotificationEmail(email: string, matchDetails: string) {
  await sendMail({
    to: email,
    subject: 'New Match Found!',
    text: `We've found a new match for you! ${matchDetails}`,
    html: `
      <h1>New Match Found!</h1>
      <p>We're excited to inform you that we've found a new match for you!</p>
      <p>${matchDetails}</p>
      <p>Log in to your account to view more details and take action.</p>
    `,
  });
}