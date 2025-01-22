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
import { useState } from 'react'
import Image from 'next/image'

interface PostPageProps {
  postData: Post | null
}

const PostPage = ({ postData }: PostPageProps) => {
  const router = useRouter()
  const { t } = useTranslation()
  
  // 创建一个独立的代码块组件来处理 useState
  const CodeBlock = ({ inline, className, children, ...props }: any) => {
    const [copied, setCopied] = useState(false)
    const match = /language-(\w+)/.exec(className || '')
    const language = match ? match[1] : ''
    
    if (inline) {
      return (
        <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5" {...props}>
          {children}
        </code>
      )
    }

    const fileMatch = /language-(\w+):(.+)/.exec(className || '')
    const fileName = fileMatch ? fileMatch[2] : ''

    const handleCopy = () => {
      navigator.clipboard.writeText(String(children).replace(/\n$/, ''))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }

    return (
      <span className="block my-4"> {/* 改用 span 而不是 div */}
        <span className="relative group block"> {/* 同样改用 span */}
          {fileName && (
            <span className="absolute top-0 left-0 right-0 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-t-lg text-sm text-gray-700 dark:text-gray-300 font-mono">
              {fileName}
            </span>
          )}
          
          <button
            onClick={handleCopy}
            className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-700 dark:bg-gray-600 hover:bg-gray-600 dark:hover:bg-gray-500 text-white dark:text-gray-200 px-2 py-1 rounded text-sm"
          >
            {copied ? t('copied') : t('copy')}
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
        </span>
      </span>
    )
  }

  const renderers = {
    img: (props: React.ComponentPropsWithoutRef<'img'>) => (
      <span className="block my-8">
        <Image
          src={props.src || ''}
          alt={props.alt || ''}
          width={800}
          height={400}
          className="rounded-lg"
          style={{ objectFit: 'cover' }}
          onLoad={(e) => {
            const img = e.target as HTMLImageElement
            img.style.opacity = '1'
          }}
        />
      </span>
    ),
    code: CodeBlock
  }

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

  // 构建完整的图片 URL
  const fullImageUrl = postData.img ? 
    (postData.img.startsWith('http') ? postData.img : `https://isethan.me${postData.img}`) : 
    'https://isethan.me/images/avatar.png'

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

        {/* Open Graph 标签 */}
        <meta property="og:title" content={postData.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content={fullImageUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="Ethan Zou's Blog" />
        <meta property="og:url" content={`https://isethan.me/blog/${postData.slug}`} />

        {/* Twitter Card 标签 */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gloridust" />
        <meta name="twitter:creator" content="@gloridust" />
        <meta name="twitter:title" content={postData.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content={fullImageUrl} />
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

export default PostPage

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