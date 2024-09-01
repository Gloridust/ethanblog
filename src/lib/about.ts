import fs from 'fs'
import path from 'path'

const contentDirectory = path.join(process.cwd(), 'src/content')

export function getAboutContent(locale: string): string {
  const fullPath = path.join(contentDirectory, locale, 'about.md')
  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    return fileContents
  } catch (error) {
    console.error(`Error reading about content for locale ${locale}:`, error)
    return `# About content not found\n\nSorry, the about content for ${locale} is not available.`
  }
}