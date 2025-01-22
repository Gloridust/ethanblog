import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post, PostPreview } from '@/types'

const postsDirectory = path.join(process.cwd(), 'src/posts')

function formatDate(dateString: string | undefined): string {
  if (!dateString) return ''
  try {
    const date = new Date(dateString)
    if (isNaN(date.getTime())) {
      console.warn(`Invalid date: ${dateString}`)
      return ''
    }
    return date.toLocaleDateString('en-CA') // 'en-CA' uses YYYY-MM-DD format
  } catch (error) {
    console.error(`Error parsing date: ${dateString}`, error)
    return ''
  }
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      const tags = matterResult.data.tags ? matterResult.data.tags.split(' ') : []

      const post: Post = {
        slug,
        title: matterResult.data.title || '',
        date: formatDate(matterResult.data.date),
        tags,
        img: matterResult.data.img || '',
        describe: matterResult.data.describe || '',
        language: matterResult.data.language || 'zh',
        content: matterResult.content
      }

      return post
    })

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostsByLanguage(language: string): Post[] {
  const allPosts = getAllPosts()
  return allPosts.filter(post => post.language === language)
}

export function getPostData(slug: string, language: string): Post | undefined {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  
  if (!fs.existsSync(fullPath)) {
    return undefined
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const matterResult = matter(fileContents)

  const tags = matterResult.data.tags ? matterResult.data.tags.split(' ') : []

  const post: Post = {
    slug,
    title: matterResult.data.title || '',
    date: formatDate(matterResult.data.date),
    tags,
    img: matterResult.data.img || '',
    describe: matterResult.data.describe || '',
    language: matterResult.data.language || 'zh',
    content: matterResult.content
  }

  if (post.language !== language) {
    return undefined
  }

  return post
}

export function getAllPostSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory)
  return fileNames.map(fileName => fileName.replace(/\.md$/, ''))
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const allTags = posts.flatMap(post => post.tags)
  return Array.from(new Set(allTags))
}

export function getPostsByTag(tag: string, language: string): Post[] {
  const posts = getPostsByLanguage(language)
  return posts.filter(post => Array.isArray(post.tags) && post.tags.includes(tag))
}

interface PaginatedPosts {
  posts: PostPreview[];
  totalPosts: number;
  currentPage: number;
  totalPages: number;
}

export function getPaginatedPosts(
  locale: string,
  page: number = 1,
  limit: number = 12,
  tag?: string
): PaginatedPosts {
  let allPosts = getPostsByLanguage(locale)
  
  // 如果指定了标签且不是 'All'，进行过滤
  if (tag && tag !== 'All') {
    allPosts = allPosts.filter(post => 
      Array.isArray(post.tags) && post.tags.includes(tag)
    )
  }

  const start = (page - 1) * limit
  const end = start + limit
  
  const paginatedPosts = allPosts.slice(start, end).map(post => ({
    slug: post.slug,
    title: post.title,
    date: post.date,
    tags: post.tags,
    img: post.img,
    describe: post.describe,
  }))

  return {
    posts: paginatedPosts,
    totalPosts: allPosts.length,
    currentPage: page,
    totalPages: Math.ceil(allPosts.length / limit)
  }
}