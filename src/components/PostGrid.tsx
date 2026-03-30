import React, { useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { PostPreview } from '@/types'
import useTranslation from '@/hooks/useTranslation'

interface PostGridProps {
  posts: PostPreview[]
}

// Seeded random based on string hash - stable per slug
function seededRandom(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(31, h) + seed.charCodeAt(i) | 0
  }
  return ((h >>> 0) % 1000) / 1000
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const { t } = useTranslation()

  // Generate stable rotations per post
  const rotations = useMemo(() => {
    return posts.map((post) => {
      const r = seededRandom(post.slug)
      // Range: -3 to 3 degrees
      return (r * 6 - 3).toFixed(2)
    })
  }, [posts])

  if (posts.length === 0) {
    return <p className="text-center text-gray-600 dark:text-gray-300">{t('noPostsFound')}</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
      {posts.map((post, i) => (
        <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
          <div
            className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md h-full flex flex-col transition-all duration-500 ease-out group-hover:shadow-xl group-hover:scale-[1.03] group-hover:rotate-0 will-change-transform"
            style={{
              transform: `rotate(${rotations[i]}deg)`,
            }}
          >
            <div className="relative aspect-[16/9] bg-gray-200 dark:bg-gray-700 overflow-hidden">
              <Image
                src={post.img}
                alt={post.title}
                fill
                quality={75}
                loading="lazy"
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYxMC8vMTQ3PEFGODhNPTQ4RklJSkxOTlFRVVFMUVJRSkxJSkn/2wBDAR"
                className="transition-all duration-500 group-hover:scale-110"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement
                  img.style.opacity = '1'
                }}
              />
            </div>
            <div className="p-5 flex flex-col flex-grow">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2 text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-3 line-clamp-3 flex-grow text-sm leading-relaxed">
                {post.describe}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-2">
                {Array.isArray(post.tags) ? (
                  post.tags.map((tag) => (
                    <span key={tag} className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 px-2.5 py-0.5 rounded-full text-xs font-medium">
                    {post.tags}
                  </span>
                )}
              </div>
              <p className="text-gray-400 dark:text-gray-500 text-xs">{post.date}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default PostGrid
