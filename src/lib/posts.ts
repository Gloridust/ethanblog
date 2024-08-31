import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Post } from '@/types'

const postsDirectory = path.join(process.cwd(), 'src/posts')

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)

    // Convert tags string to array
    const tags = matterResult.data.tags ? matterResult.data.tags.split(' ') : []

    return {
      slug,
      ...matterResult.data,
      tags,
    } as Post
  })

  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}