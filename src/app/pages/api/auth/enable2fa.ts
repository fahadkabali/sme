import speakeasy from 'speakeasy';

export default async function handler(req, res) {
  const secret = speakeasy.generateSecret();
  // Save the secret.base32 to the user's record in the database
  res.json({ otpauth_url: secret.otpauth_url });
}

// In your sign-in logic:
const verified = speakeasy.totp.verify({
  secret: user.twoFactorSecret,
  encoding: 'base32',
  token: req.body.twoFactorToken
});
if (!verified) {
  throw new Error('Invalid 2FA token');
}
