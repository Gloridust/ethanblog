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
  locale: pageLocale
}) => {
  const { t, locale } = useTranslation()
  const router = useRouter()

  const defaultTitle = t('blogTitle')
  const defaultDescription = t('bio')
  const defaultKeywords = 'Ethan Zou, Gloridust, blog, developer, entrepreneur'
  const defaultImage = '/favicon.png'

  const siteUrl = 'https://isethan.me'
  const canonicalUrl = `${siteUrl}${router.asPath}`
  const currentLocale = pageLocale || locale

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Head>
        <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="keywords" content={keywords || defaultKeywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:locale" content={currentLocale === 'cn' ? 'cn_CN' : 'en_US'} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content={defaultTitle} />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content={`${siteUrl}${image || defaultImage}`} />
        {date && <meta property="article:published_time" content={date} />}

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
          hrefLang="cn" 
        />
        <link 
          rel="alternate" 
          href={`${siteUrl}/en${router.pathname}`} 
          hrefLang="en" 
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
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": type === 'article' ? 'BlogPosting' : 'WebSite',
              "url": canonicalUrl,
              "name": title || defaultTitle,
              "description": description || defaultDescription,
              "author": {
                "@type": "Person",
                "name": author,
                "url": siteUrl
              },
              ...(date && {
                "datePublished": date,
                "dateModified": date
              })
            })
          }}
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