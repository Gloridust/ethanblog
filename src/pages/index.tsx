import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '@/components/Layout'
import Profile from '@/components/Profile'
import TagFilter from '@/components/TagFilter'
import PostGrid from '@/components/PostGrid'
import Pagination from '@/components/Pagination' // 新增
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
  const [currentPage, setCurrentPage] = useState<number>(1) // 新增
  const POSTS_PER_PAGE = 12 // 新增

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

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE) // 新增

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag)
    setCurrentPage(1) // 筛选变化时重置到第一页
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <Layout>
      <Head>
        <title>{t('blogTitle')}</title>
        <meta name="description" content={t('bio')} />
      </Head>
      <div className="max-w-4xl mx-auto">
        <Profile />
        <TagFilter tags={['All', ...allTags]} activeTag={activeTag} onFilterChange={handleFilterChange} />
      </div>
      <PostGrid posts={paginatedPosts} />
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
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