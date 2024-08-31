import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Post } from '@/types'

interface PostGridProps {
  posts: Post[]
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link href={`/posts/${post.slug}`} key={post.slug}>
          <div className="bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-[420px] flex flex-col">
            <div className="relative h-48">
              <Image
                src={post.img}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h2 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3">{post.describe}</p>
              <div className="flex flex-wrap gap-2 mb-2 mt-auto">
                {Array.isArray(post.tags) ? (
                  post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                    {post.tags}
                  </span>
                )}
              </div>
              <p className="text-gray-500 text-sm">{post.date}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostGrid