import { NextApiRequest, NextApiResponse } from 'next'
import { getPostsByLanguage } from '@/lib/posts'
import { generateRssFeed } from '@/lib/rss'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { lang } = req.query
  
  if (typeof lang !== 'string' || !['zh', 'en'].includes(lang)) {
    return res.status(400).json({ error: 'Invalid language' })
  }

  const posts = getPostsByLanguage(lang)
  const feed = generateRssFeed(posts, lang)
  
  res.setHeader('Content-Type', 'application/xml')
  res.write(feed.rss2())
  res.end()
} 