import { NextApiRequest, NextApiResponse } from 'next'
import { getPostsByLanguage } from '@/lib/posts'
import { generateRssFeed } from '@/lib/rss'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { lang } = req.query
    
    if (typeof lang !== 'string' || !['zh', 'en'].includes(lang)) {
      return res.status(400).json({ error: 'Invalid language' })
    }

    const posts = getPostsByLanguage(lang)
    const feed = generateRssFeed(posts, lang)
    
    // 设置正确的内容类型和缓存控制
    res.setHeader('Content-Type', 'application/xml; charset=utf-8')
    res.setHeader('Cache-Control', 'public, max-age=3600, stale-while-revalidate=7200')
    
    // 生成 RSS 输出
    const rssOutput = feed.rss2()
    
    // 添加 XML 声明
    const xmlDeclaration = '<?xml version="1.0" encoding="UTF-8"?>\n'
    
    // 发送完整的 RSS feed
    res.send(xmlDeclaration + rssOutput)
  } catch (error) {
    console.error('RSS generation error:', error)
    res.status(500).json({ error: 'Failed to generate RSS feed' })
  }
}

// 配置该 API 路由使用正确的 CORS 设置
export const config = {
  api: {
    bodyParser: false,
  },
} 