import { Feed, FeedOptions, Item } from 'feed'
import { Post } from '@/types'
import { marked } from 'marked'

export function generateRssFeed(posts: Post[], language: string): Feed {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://isethan.me'
  const author = {
    name: "Ethan",
    email: "contact@isethan.me",
    link: baseUrl
  }

  const feedOptions: FeedOptions = {
    title: language === 'zh' ? "Ethan的博客" : "Ethan's Blog",
    description: language === 'zh' ? 
      "分享编程、技术和生活的点点滴滴" : 
      "Sharing thoughts on programming, technology and life",
    id: baseUrl,
    link: baseUrl,
    language: language,
    image: `${baseUrl}/images/avatar.png`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, Ethan`,
    author: author,
    feedLinks: {
      rss2: `${baseUrl}/api/rss/${language}`,
      json: `${baseUrl}/api/feed/${language}`,
      atom: `${baseUrl}/api/atom/${language}`,
    },
    updated: new Date(),
  }

  const feed = new Feed(feedOptions)

  posts.forEach((post) => {
    const htmlContent = marked(post.content)

    const item: Item = {
      title: post.title,
      id: `${baseUrl}/blog/${post.slug}`,
      link: `${baseUrl}/blog/${post.slug}`,
      description: post.describe,
      content: htmlContent,
      author: [author],
      date: new Date(post.date),
      image: post.img ? `${baseUrl}${post.img}` : undefined,
      category: Array.isArray(post.tags) ? 
        post.tags.map(tag => ({ name: tag })) :
        [{ name: post.tags }],
      published: new Date(post.date),
      copyright: `All rights reserved ${new Date().getFullYear()}, Ethan`,
    }
    feed.addItem(item)
  })

  return feed
} 