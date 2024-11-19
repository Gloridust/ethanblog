import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Layout from '@/components/Layout'
import { getAllPosts, getPostData } from '@/lib/posts'
import { Post } from '@/types'
import useTranslation from '@/hooks/useTranslation'

interface PostPageProps {
  postData: Post | null
}

export default function PostPage({ postData }: PostPageProps) {
  const router = useRouter()
  const { t } = useTranslation()

  if (router.isFallback) {
    return <div>Loading...</div>
  }

  if (!postData) {
    return (
      <Layout title={t('postNotFound')}>
        <div className="text-center mt-8">
          <h1 className="text-2xl font-bold">{t('postNotFound')}</h1>
        </div>
      </Layout>
    )
  }

  const metadata = {
    title: postData.title,
    description: postData.describe || postData.content.slice(0, 160),
    keywords: Array.isArray(postData.tags) ? postData.tags.join(', ') : postData.tags,
    image: postData.img || '/default-post-image.jpg',
    date: postData.date,
    type: 'article' as const
  }

  return (
    <Layout {...metadata}>
      <article className="max-w-3xl mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{postData.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('postedOn')}: {postData.date}</p>
        <div className="prose dark:prose-dark">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {postData.content}
          </ReactMarkdown>
        </div>
      </article>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (context) => {
  const posts = getAllPosts()
  const locales = context.locales || ['zh']

  const paths = locales.flatMap((locale) => 
    posts.map((post) => ({
      params: { slug: post.slug },
      locale: locale,
    }))
  )

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<PostPageProps> = async (context) => {
  const { params, locale } = context

  if (typeof params?.slug !== 'string' || typeof locale !== 'string') {
    return { notFound: true }
  }

  const postData = getPostData(params.slug, locale)
  
  if (!postData) {
    return { notFound: true }
  }

  return {
    props: {
      postData,
    },
  }
}