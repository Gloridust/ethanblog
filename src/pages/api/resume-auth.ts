import type { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'
import { createToken, COOKIE_NAME } from '@/lib/resume-auth'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const secret = process.env.RESUME_PASSWORD
  if (!secret) {
    return res.status(500).json({ error: 'Server misconfigured' })
  }

  if (req.method === 'POST') {
    const { password } = req.body
    if (!password || typeof password !== 'string') {
      return res.status(400).json({ error: 'Password required' })
    }

    // Timing-safe comparison
    const a = Buffer.from(password)
    const b = Buffer.from(secret)
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return res.status(401).json({ error: 'Invalid password' })
    }

    const token = createToken(secret)
    const isProduction = process.env.NODE_ENV === 'production'

    res.setHeader('Set-Cookie', [
      `${COOKIE_NAME}=${token}; Path=/resume; HttpOnly; SameSite=Strict; Max-Age=86400${isProduction ? '; Secure' : ''}`,
    ])
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    res.setHeader('Set-Cookie', [
      `${COOKIE_NAME}=; Path=/resume; HttpOnly; SameSite=Strict; Max-Age=0`,
    ])
    return res.status(200).json({ ok: true })
  }

  res.setHeader('Allow', 'POST, DELETE')
  return res.status(405).json({ error: 'Method not allowed' })
}
