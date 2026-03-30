import crypto from 'crypto'

export const COOKIE_NAME = 'resume_auth'
const TOKEN_MAX_AGE = 24 * 60 * 60 // 24 hours in seconds

export function createToken(secret: string): string {
  const timestamp = Math.floor(Date.now() / 1000).toString()
  const hmac = crypto.createHmac('sha256', secret).update(timestamp).digest('hex')
  return `${timestamp}:${hmac}`
}

export function verifyToken(token: string, secret: string): boolean {
  const parts = token.split(':')
  if (parts.length !== 2) return false

  const [timestamp, hmac] = parts
  const ts = parseInt(timestamp, 10)
  if (isNaN(ts)) return false

  // Check expiration
  const now = Math.floor(Date.now() / 1000)
  if (now - ts > TOKEN_MAX_AGE) return false

  // Recompute and compare
  const expected = crypto.createHmac('sha256', secret).update(timestamp).digest('hex')

  // Timing-safe comparison
  if (hmac.length !== expected.length) return false
  try {
    return crypto.timingSafeEqual(Buffer.from(hmac, 'hex'), Buffer.from(expected, 'hex'))
  } catch {
    return false
  }
}
