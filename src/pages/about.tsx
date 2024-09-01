import { GetStaticProps } from 'next'
import Head from 'next/head'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Layout from '@/components/Layout'
import { getAboutContent } from '@/lib/about'
import useTranslation from '@/hooks/useTranslation'

interface AboutPageProps {
  content: string
}

export default function AboutPage({ content }: AboutPageProps) {
  const { t } = useTranslation()

  return (
    <Layout>
      <Head>
        <title>{t.aboutTitle}</title>
      </Head>
      <div className="max-w-3xl mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold mb-8">{t.aboutTitle}</h1>
        <div className="prose dark:prose-dark max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const content = await getAboutContent(locale || 'zh')
  return {
    props: {
      content,
    },
  }
}