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
}

const Layout: React.FC<LayoutProps> = ({ 
  children, 
  title, 
  description, 
  keywords,
  image,
  date,
  type = 'website'
}) => {
  const { t, locale } = useTranslation()
  const router = useRouter()

  const defaultTitle = t('blogTitle')
  const defaultDescription = t('bio')
  const defaultKeywords = 'Ethan Zou, Gloridust, blog, developer, entrepreneur'
  const defaultImage = '/favicon.png'

  const siteUrl = 'https://isethan.me'
  const canonicalUrl = `${siteUrl}${router.asPath}`

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Head>
        <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="keywords" content={keywords || defaultKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={defaultTitle} />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={image || defaultImage} />
        {date && <meta property="article:published_time" content={date} />}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={canonicalUrl} />
        <meta name="twitter:title" content={title || defaultTitle} />
        <meta name="twitter:description" content={description || defaultDescription} />
        <meta name="twitter:image" content={image || defaultImage} />

        {/* Additional SEO tags */}
        <meta name="author" content="Ethan Zou" />
        {date && <meta name="date" content={date} />}

        {/* 添加语言相关标签 */}
        <meta httpEquiv="content-language" content={locale} />
        <meta name="language" content={locale === 'zh' ? 'Chinese' : 'English'} />
        
        {/* 添加替代语言链接 */}
        <link 
          rel="alternate" 
          href={`https://isethan.me${router.pathname}`} 
          hrefLang="zh" 
        />
        <link 
          rel="alternate" 
          href={`https://isethan.me/en${router.pathname}`} 
          hrefLang="en" 
        />
        <link 
          rel="alternate" 
          href={`https://isethan.me${router.pathname}`} 
          hrefLang="x-default" 
        />
      </Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl pt-24">
        {/* Added pt-24 class to create space for the fixed header */}
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout