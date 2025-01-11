import { useState, useMemo, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '@/components/Layout'
import Profile from '@/components/Profile'
import TagFilter from '@/components/TagFilter'
import PostGrid from '@/components/PostGrid'
import Pagination from '@/components/Pagination'
import LoadingScreen from '@/components/LoadingScreen'
import { getPostsByLanguage } from '@/lib/posts'
import { Post } from '@/types'
import useTranslation from '@/hooks/useTranslation'

interface HomeProps {
  posts: Post[]
  allTags: string[]
}

export default function Home({ posts, allTags }: HomeProps) {
  const { t } = useTranslation()
  const [activeTag, setActiveTag] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [isLoading, setIsLoading] = useState(true)
  const [imagesLoaded, setImagesLoaded] = useState(0)
  const POSTS_PER_PAGE = 12

  // 计算需要加载的总图片数
  const totalImages = posts.length

  useEffect(() => {
    // 预加载所有文章图片
    const imagePromises = posts.map(post => {
      return new Promise((resolve) => {
        const img = new Image()
        img.src = post.img
        img.onload = () => {
          setImagesLoaded(prev => prev + 1)
          resolve(null)
        }
        img.onerror = () => resolve(null) // 处理加载失败的情况
      })
    })

    Promise.all(imagePromises).then(() => {
      setIsLoading(false)
    })

    // 如果图片加载时间过长，设置一个超时
    const timeout = setTimeout(() => {
      setIsLoading(false)
    }, 3000)

    return () => clearTimeout(timeout)
  }, [posts])

  const filteredPosts = useMemo(() => {
    if (activeTag === 'All') {
      return posts
    }
    return posts.filter((post) => post.tags.includes(activeTag))
  }, [posts, activeTag])

  const paginatedPosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE
    const end = start + POSTS_PER_PAGE
    return filteredPosts.slice(start, end)
  }, [filteredPosts, currentPage])

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE)

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [currentPage])

  return (
    <Layout>
      <Head>
        <title>{t('blogTitle')}</title>
        <meta name="description" content={t('bio')} />
      </Head>

      <LoadingScreen isLoading={isLoading} />

      <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <div className="max-w-4xl mx-auto">
          <Profile />
          <TagFilter 
            tags={['All', ...allTags]} 
            activeTag={activeTag} 
            onFilterChange={handleFilterChange} 
            filteredPostsCount={filteredPosts.length}
          />
        </div>
        <PostGrid posts={paginatedPosts} />
        {totalPages > 1 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        )}
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<HomeProps> = async (context) => {
  const locale = context.locale || 'zh'
  const posts = getPostsByLanguage(locale)
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))
  
  return {
    props: {
      posts,
      allTags,
    },
  }
}
