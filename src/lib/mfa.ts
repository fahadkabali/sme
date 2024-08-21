import speakeasy from 'speakeasy'
import QRCode from 'qrcode'

export function generateMFASecret(email: string) {
  const secret = speakeasy.generateSecret({
    name: `SME Matching App (${email})`,
  })
  return {
    secret: secret.base32,
    otpauth_url: secret.otpauth_url,
  }
}

export function verifyMFAToken(secret: string, token: string) {
  return speakeasy.totp.verify({
    secret,
    encoding: 'base32',
    token,
  })
}

export async function generateQRCode(otpauth_url: string) {
  return QRCode.toDataURL(otpauth_url)
}