import { useState, useMemo, useEffect } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '@/components/Layout'
import Profile from '@/components/Profile'
import TagFilter from '@/components/TagFilter'
import PostGrid from '@/components/PostGrid'
import Pagination from '@/components/Pagination'
import LoadingScreen from '@/components/LoadingScreen'
import { getPaginatedPosts } from '@/lib/posts'
import { PostPreview } from '@/types'
import useTranslation from '@/hooks/useTranslation'
import { useRouter } from 'next/router'

interface HomeProps {
  initialPosts: {
    posts: PostPreview[];
    totalPosts: number;
    currentPage: number;
    totalPages: number;
  };
  allTags: string[];
}

const POSTS_PER_PAGE = 12

export default function Home({ initialPosts, allTags }: HomeProps) {
  const router = useRouter()
  const { t, locale } = useTranslation()
  const [activeTag, setActiveTag] = useState<string>('All')
  const [currentPage, setCurrentPage] = useState<number>(initialPosts.currentPage)
  const [posts, setPosts] = useState<PostPreview[]>(initialPosts.posts)
  const [isLoading, setIsLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(initialPosts.totalPages)
  const [totalPosts, setTotalPosts] = useState(initialPosts.totalPosts)

  // 监听语言变化，重置标签和页码
  useEffect(() => {
    setActiveTag('All')
    setCurrentPage(1)
  }, [locale])

  // 监听数据变化
  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `/api/posts?page=${currentPage}&locale=${locale}${
            activeTag !== 'All' ? `&tag=${activeTag}` : ''
          }`
        )
        const data = await response.json()
        setPosts(data.posts)
        setTotalPages(data.totalPages)
        setTotalPosts(data.totalPosts)
      } catch (error) {
        console.error('Failed to fetch posts:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [locale, currentPage, activeTag])

  const handlePageChange = async (page: number) => {
    setIsLoading(true)
    try {
      // 获取新页面的数据
      const response = await fetch(`/api/posts?page=${page}&locale=${router.locale}${activeTag !== 'All' ? `&tag=${activeTag}` : ''}`)
      const data = await response.json()
      setPosts(data.posts)
      
      // 更新 URL
      router.push({
        pathname: router.pathname,
        query: { ...router.query, page },
      }, undefined, { shallow: true })
      
      setCurrentPage(page)
      window.scrollTo(0, 0)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag)
    setCurrentPage(1)
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page: 1, tag },
    }, undefined, { shallow: true })
  }

  return (
    <Layout
      title={t('blogTitle')}
      description={t('bio')}
      keywords="Ethan Zou, blog, developer, entrepreneur, React, NextJS, Flutter, SwiftUI, ML, Python"
      image="/images/avatar.png"
      type="website"
      locale={locale}
    >
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
            filteredPostsCount={totalPosts}
          />
        </div>
        <PostGrid posts={posts} />
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
  const page = 1 // 初始页面
  const paginatedPosts = getPaginatedPosts(locale, page, POSTS_PER_PAGE)
  
  // 获取所有标签
  const allTags = Array.from(new Set(paginatedPosts.posts.flatMap(post => 
    Array.isArray(post.tags) ? post.tags : [post.tags]
  )))
  
  return {
    props: {
      initialPosts: paginatedPosts,
      allTags,
    },
    revalidate: 60, // 每分钟重新生成页面
  }
}
