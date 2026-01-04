import crypto from 'crypto';

export function generateResetToken() {
  const token = crypto.randomBytes(32).toString('hex');
  // Create expiry time as a Date object (1 hour from now)
  const expiresAt = new Date(Date.now() + 3600000);

  return {
    token,
    expiresAt,
  };
}

export function verifyResetToken(token: string, tokenExpiry: Date) {
  if (!token || !tokenExpiry) {
    return false;
  }

  return Date.now() <= new Date(tokenExpiry).getTime();
}