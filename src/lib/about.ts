import fs from 'fs/promises'
import path from 'path'

const aboutDirectory = path.join(process.cwd(), 'src/content/about')

export async function getAboutContent(locale: string): Promise<string> {
  const fullPath = path.join(aboutDirectory, `${locale}.md`)
  try {
    const content = await fs.readFile(fullPath, 'utf8')
    return content
  } catch (error) {
    console.error(`Error reading about content for locale ${locale}:`, error)
    return ''
  }
}