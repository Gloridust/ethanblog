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
        <Link href={`/posts/${post.slug}`} key={post.slug} className="block">
          <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            <div className="relative h-48">
              <Image
                src={post.img}
                alt={post.title}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">{post.title}</h2>
              <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">{post.describe}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {Array.isArray(post.tags) ? (
                  post.tags.map((tag) => (
                    <span key={tag} className="bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-700">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="bg-gray-200 px-2 py-1 rounded-full text-sm text-gray-700">
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