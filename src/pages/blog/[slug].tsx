import { GetStaticProps, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
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
    <span className="block my-8">
      <LazyImage src={props.src || ''} alt={props.alt || ''} />
    </span>
  ),
  code: ({ node, inline, className, children, ...props }: any) => {
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''
    
    // 如果是行内代码，使用默认样式
    if (inline) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props}>
          {children}
        </code>
      )
    }

    // 获取文件名（如果有）
    const fileMatch = /language-(\w+):(.+)/.exec(className || '')
    const fileName = fileMatch ? fileMatch[2] : ''

    return (
      <div className="relative group">
        {/* 文件名显示 */}
        {fileName && (
          <div className="absolute top-0 left-0 right-0 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-t-lg text-sm text-gray-700 dark:text-gray-300 font-mono">
            {fileName}
          </div>
        )}
        
        {/* 复制按钮 */}
        <button
          onClick={() => {
            navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
          }}
          className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-700 dark:bg-gray-600 text-white dark:text-gray-200 px-2 py-1 rounded text-sm"
        >
          复制
        </button>

        <SyntaxHighlighter
          language={language}
          style={tomorrow}
          customStyle={{
            margin: 0,
            marginTop: fileName ? '2.5rem' : 0,
            padding: '1.5rem',
            borderRadius: '0.5rem',
            backgroundColor: 'rgb(30, 41, 59)',
          }}
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      </div>
    )
  }
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