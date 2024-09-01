import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '@/types'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Only process markdown files
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '')
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const matterResult = matter(fileContents)

      // Convert tags string to array
      const tags = matterResult.data.tags ? matterResult.data.tags.split(' ') : []

      // Ensure all required fields are present
      const post: Post = {
        slug,
        title: matterResult.data.title || '',
        date: matterResult.data.date || '',
        tags,
        img: matterResult.data.img || '',
        describe: matterResult.data.describe || '',
        language: matterResult.data.language || 'zh', // Default to Chinese if not specified
        content: matterResult.content
      }

      return post
    })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
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
    date: matterResult.data.date || '',
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
  return posts.filter(post => post.tags.includes(tag))
}