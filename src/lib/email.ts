import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string)

export async function sendEmail(to: string, subject: string, content: string) {
  const msg = {
    to,
    from: process.env.SENDGRID_FROM_EMAIL as string,
    subject,
    text: content,
    html: content,
  }

  try {
    await sgMail.send(msg)
  } catch (error) {
    console.error('Email send error:', error)
  }
}