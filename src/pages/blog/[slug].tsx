import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Layout from '@/components/Layout'
import { getAllPosts, getPostData } from '@/lib/posts'
import { Post } from '@/types'
import useTranslation from '@/hooks/useTranslation'
import Head from 'next/head'
import LazyImage from '@/components/LazyImage'
import Comments from '@/components/Comments'

interface PostPageProps {
  postData: Post | null
}

const renderers = {
  img: (props: React.ComponentPropsWithoutRef<'img'>) => (
    <div className="my-8">
      <LazyImage src={props.src || ''} alt={props.alt || ''} />
    </div>
  ),
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
    description: postData.describe || postData.content.slice(0, 160).replace(/[#*`]/g, ''),
    keywords: `${Array.isArray(postData.tags) ? postData.tags.join(', ') : postData.tags}, Ethan Zou, Gloridust, blog, developer, entrepreneur`,
    image: postData.img || '/images/avatar.png',
    date: postData.date,
    type: 'article' as const,
    structuredData: {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: postData.title,
      description: postData.describe,
      image: postData.img,
      datePublished: postData.date,
      author: {
        '@type': 'Person',
        name: 'Ethan Zou',
        url: 'https://isethan.me'
      }
    }
  }

  return (
    <Layout {...metadata}>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(metadata.structuredData)
          }}
        />
        <meta name="author" content="Ethan Zou" />
        <meta name="article:published_time" content={postData.date} />
        <meta name="article:section" content={Array.isArray(postData.tags) ? postData.tags[0] : postData.tags} />
        {Array.isArray(postData.tags) && postData.tags.map(tag => (
          <meta key={tag} name="article:tag" content={tag} />
        ))}
      </Head>
      <article className="max-w-3xl mx-auto mt-8 px-4">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-gray-100">{postData.title}</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{t('postedOn')}: {postData.date}</p>
        <div className="prose dark:prose-dark">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={renderers}
          >
            {postData.content}
          </ReactMarkdown>
        </div>
        <Comments />
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