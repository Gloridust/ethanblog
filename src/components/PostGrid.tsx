import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PostPreview } from '@/types'
import useTranslation from '@/hooks/useTranslation'

interface PostGridProps {
  posts: PostPreview[]
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const { t } = useTranslation()

  if (posts.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-300">{t('noPostsFound')}</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <Link href={`/blog/${post.slug}`} key={post.slug} className="block">
          <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-full flex flex-col transform hover:-translate-y-1">
            <div className="relative aspect-[16/9] bg-gray-200 dark:bg-gray-700">
              <Image
                src={post.img}
                alt={post.title}
                fill
                quality={75}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYxMC8vMTQ3PEFGODhNPTQ4RklJSkxOTlFRVVFMUVJRSkxJSkn/2wBDAR"
                className="transition-opacity duration-300"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.opacity = '1'
                }}
              />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h2 className="text-xl font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                {post.describe}
              </p>
              <div className="flex flex-wrap gap-2 mb-2">
                {Array.isArray(post.tags) ? (
                  post.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm">
                    {post.tags}
                  </span>
                )}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">{post.date}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostGrid
