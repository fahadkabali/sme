import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false, // Use true if the port is 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface NotificationPayload {
  to: string;
  subject: string;
  message: string;
}

export async function sendNotification({ to, subject, message }: NotificationPayload) {
  try {
    await transporter.sendMail({
      from: '"Platform Notifications" <notifications@yourapp.com>',
      to,
      subject,
      text: message,
      html: `<p>${message}</p>`,
    });
    console.log(`Notification sent to ${to}`);
  } catch (error) {
    console.error('Error sending notification:', error);
    throw new Error('Unable to send notification.');
  }
}
