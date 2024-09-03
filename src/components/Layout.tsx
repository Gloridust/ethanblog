import React, { ReactNode } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import useTranslation from '@/hooks/useTranslation'

interface LayoutProps {
  children: ReactNode
  title?: string
  description?: string
  keywords?: string
}

const Layout: React.FC<LayoutProps> = ({ children, title, description, keywords }) => {
  const { t } = useTranslation()

  const defaultTitle = t.blogTitle
  const defaultDescription = t.bio
  const defaultKeywords = 'ethan, Ethan Zou, Gloridust, blog, programming, development'

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <Head>
        <title>{title ? `${title} | ${defaultTitle}` : defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="keywords" content={keywords || defaultKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://gloridust.xyz/" />
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content="https://gloridust.xyz/favicon.png" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://gloridust.xyz/" />
        <meta property="twitter:title" content={title || defaultTitle} />
        <meta property="twitter:description" content={description || defaultDescription} />
        <meta property="twitter:image" content="https://gloridust.xyz/favicon.png" />
      </Head>
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 max-w-6xl">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout