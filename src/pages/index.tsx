import { useState, useMemo } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '@/components/Layout'
import Profile from '@/components/Profile'
import TagFilter from '@/components/TagFilter'
import PostGrid from '@/components/PostGrid'
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

  const filteredPosts = useMemo(() => {
    if (activeTag === 'All') {
      return posts
    }
    return posts.filter((post) => post.tags.includes(activeTag))
  }, [posts, activeTag])

  const handleFilterChange = (tag: string) => {
    setActiveTag(tag)
  }

  return (
    <Layout>
      <Head>
        <title>{t.blogTitle}</title>
        <meta name="description" content={t.bio} />
      </Head>
      <div className="max-w-4xl mx-auto">
        <Profile />
        <TagFilter tags={['All', ...allTags]} activeTag={activeTag} onFilterChange={handleFilterChange} />
      </div>
      <PostGrid posts={filteredPosts} />
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