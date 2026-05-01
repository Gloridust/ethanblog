import React, { useMemo, useCallback, useRef, useState } from 'react'
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

const PostCard: React.FC<{ post: PostPreview; rotation: string }> = ({ post, rotation }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = `rotate(${rotation}deg)`
    card.style.boxShadow = '0 1px 0 oklch(100% 0 0 / 0.6) inset, 0 4px 16px -4px oklch(20% 0.02 70 / 0.06)'
    setIsHovered(false)
  }, [rotation])

  return (
    <Link href={`/blog/${post.slug}`} key={post.slug} className="block group">
      <div
        ref={cardRef}
        className="overflow-hidden h-full flex flex-col will-change-transform"
        style={{
          background: 'var(--glass-strong)',
          backdropFilter: 'blur(20px) saturate(180%)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--r-lg)',
          boxShadow: '0 1px 0 oklch(100% 0 0 / 0.6) inset, 0 4px 16px -4px oklch(20% 0.02 70 / 0.06)',
          transform: `rotate(${rotation}deg)`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s var(--ease-out), box-shadow 0.5s var(--ease-out)',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={() => {
          const card = cardRef.current
          if (!card) return
          card.style.boxShadow = '0 1px 0 oklch(100% 0 0 / 0.6) inset, 0 12px 32px -8px oklch(20% 0.02 70 / 0.12)'
          setIsHovered(true)
        }}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/10' }}>
          <Image
            src={post.img}
            alt={post.title}
            fill
            quality={75}
            loading="lazy"
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkLzYxMC8vMTQ3PEFGODhNPTQ4RklJSkxOTlFRVVFMUVJRSkxJSkn/2wBDAR"
            className="transition-transform duration-500 group-hover:scale-[1.06]"
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onLoad={(e) => {
              const img = e.target as HTMLImageElement
              img.style.opacity = '1'
            }}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow">
          <h2
            className="text-lg font-semibold mb-2 line-clamp-2 transition-colors duration-300"
            style={{ color: isHovered ? 'var(--accent)' : 'var(--ink)' }}
          >
            {post.title}
          </h2>
          <p
            className="mb-3 line-clamp-3 flex-grow text-sm leading-relaxed"
            style={{ color: 'var(--ink-2)' }}
          >
            {post.describe}
          </p>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {Array.isArray(post.tags) ? (
              post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 text-xs font-medium"
                  style={{
                    background: 'var(--accent-soft)',
                    color: 'var(--accent-ink)',
                    borderRadius: 'var(--r-pill)',
                  }}
                >
                  {tag}
                </span>
              ))
            ) : (
              <span
                className="px-2.5 py-0.5 text-xs font-medium"
                style={{
                  background: 'var(--accent-soft)',
                  color: 'var(--accent-ink)',
                  borderRadius: 'var(--r-pill)',
                }}
              >
                {post.tags}
              </span>
            )}
          </div>
          <p
            className="text-xs"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-4)' }}
          >
            {post.date}
          </p>
        </div>
      </div>
    </Link>
  )
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
  const { t } = useTranslation()

  // Generate alternating rotations: odd index → positive, even index → negative
  // Magnitude varies per slug for organic feel, but direction alternates
  const rotations = useMemo(() => {
    return posts.map((post, i) => {
      const r = seededRandom(post.slug)
      const magnitude = 1.5 + r * 2  // 1.5° to 3.5°
      const sign = i % 2 === 0 ? -1 : 1  // alternating: left, right, left, right...
      return (sign * magnitude).toFixed(2)
    })
  }, [posts])

  if (posts.length === 0) {
    return <p className="text-center" style={{ color: 'var(--ink-3)' }}>{t('noPostsFound')}</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} rotation={rotations[i]} />
      ))}
    </div>
  )
}

export default PostGrid
