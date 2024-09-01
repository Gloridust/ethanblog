import { GetStaticProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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
      <div className="max-w-4xl mx-auto mt-12 px-4">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          <div className="relative h-64 sm:h-80 md:h-96">
            <Image
              src="/images/about-banner.jpg"
              alt="About Me Banner"
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-900 dark:text-gray-100">
              {t.aboutTitle}
            </h1>
            <div className="prose dark:prose-dark">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const content = getAboutContent(locale || 'en')
  return {
    props: {
      content,
    },
  }
}