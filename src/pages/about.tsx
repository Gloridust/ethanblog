import React from 'react'
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import ReactMarkdown from 'react-markdown'
import Layout from '../components/Layout'
import useTranslation from '../hooks/useTranslation'

interface AboutProps {
  content: string
}

const About: React.FC<AboutProps> = ({ content }) => {
  const { t } = useTranslation()

  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">{t.aboutTitle}</h1>
      <div className="prose dark:prose-dark">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const markdownFile = path.join(process.cwd(), 'src', 'content', locale || 'zh', 'about.md')
  const fileContents = fs.readFileSync(markdownFile, 'utf8')
  const { content } = matter(fileContents)

  return {
    props: {
      content,
    },
  }
}

export default About