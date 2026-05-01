import React, { ReactNode } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Header from './Header'
import Footer from './Footer'
import useTranslation from '@/hooks/useTranslation'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  keywords?: string
  image?: string
  date?: string
  type?: 'website' | 'article' | 'profile'
  author?: string
  locale?: string
  structuredData?: Record<string, any>
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  description,
  keywords,
  image,
  date,
  type = 'website',
  author = 'Ethan Zou',
  locale: pageLocale,
  publishedTime,
  modifiedTime,
  section,
  tags,
}) => {
  const { t, locale } = useTranslation()
  const router = useRouter()

  const defaultTitle = t('blogTitle')
  const defaultDescription = t('bio')
  const defaultKeywords = 'Ethan Zou, Gloridust, blog, developer, 邹怡翔'
  const defaultImage = '/favicon.png'

  const siteUrl = 'https://isethan.me'
  const canonicalUrl = `${siteUrl}${router.asPath}`
  const currentLocale = pageLocale || locale

  // 构建完整的结构化数据
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type === 'article' ? 'BlogPosting' : 'WebSite',
    url: canonicalUrl,
    name: title || defaultTitle,
    description: description || defaultDescription,
    author: {
      "@type": "Person",
      name: author,
      url: siteUrl,
      image: `${siteUrl}/images/avatar.png`,
      sameAs: [
        "https://twitter.com/gloridust1024",
        "https://github.com/Gloridust"
      ]
    },
    publisher: {
      "@type": "Organization",
      name: "Ethan Zou's Blog",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.png`
      }
    },
    ...(publishedTime && {
      datePublished: publishedTime,
      dateModified: modifiedTime || publishedTime
    })
  }

  return (
    <div
      className="flex flex-col min-h-screen transition-colors duration-200"
      style={{ background: 'var(--bg)', color: 'var(--ink)' }}
    >
      <Head>
        <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="keywords" content={keywords || defaultKeywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&family=Source+Serif+4:ital,opsz,wght@0,8..60,200..900;1,8..60,200..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
          rel="stylesheet"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:locale" content={currentLocale === 'cn' ? 'zh_CN' : 'en_US'} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={defaultTitle} />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={`${siteUrl}${image || defaultImage}`} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {publishedTime && <meta property="article:published_time" content={publishedTime} />}
        {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
        {section && <meta property="article:section" content={section} />}
        {tags && tags.map(tag => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@gloridust" />
        <meta name="twitter:creator" content="@gloridust" />
        <meta name="twitter:title" content={title || defaultTitle} />
        <meta name="twitter:description" content={description || defaultDescription} />
        <meta name="twitter:image" content={`${siteUrl}${image || defaultImage}`} />

        {/* Additional SEO tags */}
        <meta name="author" content="Ethan Zou" />
        {date && <meta name="date" content={date} />}

        {/* 添加语言相关标签 */}
        <meta httpEquiv="content-language" content={currentLocale} />
        <meta name="language" content={currentLocale === 'cn' ? 'Chinese' : 'English'} />

        {/* 添加替代语言链接 */}
        <link
          rel="alternate"
          href={`${siteUrl}${router.pathname}`}
          hrefLang="zh-CN"
        />
        <link
          rel="alternate"
          href={`${siteUrl}/en${router.pathname}`}
          hrefLang="en-US"
        />
        <link
          rel="alternate"
          href={`${siteUrl}${router.pathname}`}
          hrefLang="x-default"
        />

        {/* 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      </Head>

      <div className="ambient" />

      <Header />
      <main
        className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl pt-24"
        style={{ position: 'relative', zIndex: 2 }}
      >
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
