import { useState } from 'react'
import Head from 'next/head'
import Layout from '@/components/Layout'
import Profile from '@/components/Profile'
import TagFilter from '@/components/TagFilter'
import PostGrid from '@/components/PostGrid'
import { getAllPosts } from '@/lib/posts'
import { Post } from '@/types'

interface HomeProps {
  posts: Post[]
  allTags: string[]
}

export default function Home({ posts, allTags }: HomeProps) {
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(posts)

  const handleFilterChange = (tag: string) => {
    if (tag === 'All') {
      setFilteredPosts(posts)
    } else {
      setFilteredPosts(posts.filter((post) => post.tags.includes(tag)))
    }
  }

  return (
    <Layout>
      <Head>
        <title>Ethan Zou's Blog</title>
        <meta name="description" content="Personal blog of Ethan Zou" />
      </Head>
      <div className="max-w-4xl mx-auto">
        <Profile />
        <TagFilter tags={allTags} onFilterChange={handleFilterChange} />
      </div>
      <PostGrid posts={filteredPosts} />
    </Layout>
  )
}

export async function getStaticProps() {
  const posts = getAllPosts()
  const allTags = Array.from(new Set(posts.flatMap((post) => post.tags)))
  return {
    props: {
      posts,
      allTags,
    },
  }
}