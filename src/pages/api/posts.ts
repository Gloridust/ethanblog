import { NextApiRequest, NextApiResponse } from 'next'
import { getPaginatedPosts } from '@/lib/posts'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const page = Number(req.query.page) || 1
  const locale = String(req.query.locale) || 'cn'
  const tag = req.query.tag as string | undefined

  const data = getPaginatedPosts(locale, page, 12, tag)
  res.status(200).json(data)
} 