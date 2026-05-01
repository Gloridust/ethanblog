import React, { useState, useRef, useEffect } from 'react'
import useTranslation from '@/hooks/useTranslation'

interface TagFilterProps {
  tags: string[]
  activeTag: string
  onFilterChange: (tag: string) => void
  filteredPostsCount: number
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, activeTag, onFilterChange, filteredPostsCount }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { t } = useTranslation()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleTagClick = (tag: string) => {
    onFilterChange(tag)
    setIsOpen(false)
  }

  return (
    <div className="mb-8">
      <div className="flex justify-center">
        {/* Mobile dropdown */}
        <div className="relative md:hidden" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 text-white text-sm font-medium transition-all duration-200 focus:outline-none"
            style={{
              background: 'var(--accent)',
              borderRadius: 'var(--r-pill)',
              boxShadow: '0 2px 8px -2px var(--accent)',
            }}
          >
            {activeTag} {isOpen ? '▲' : '▼'}
          </button>
          {isOpen && (
            <div
              className="absolute z-10 mt-2 w-44 overflow-hidden py-1.5"
              style={{
                background: 'var(--glass-strong)',
                backdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--r-lg)',
                boxShadow: '0 8px 32px -4px oklch(20% 0.02 70 / 0.12)',
              }}
            >
              <div role="menu">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className="block w-full px-4 py-2 text-sm text-left transition-colors duration-150"
                    style={{
                      background: activeTag === tag ? 'var(--accent)' : 'transparent',
                      color: activeTag === tag ? 'white' : 'var(--ink-2)',
                      fontWeight: activeTag === tag ? 500 : 400,
                    }}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Desktop pill bar */}
        <div
          className="hidden md:flex flex-wrap gap-1.5 justify-center p-[5px]"
          style={{
            background: 'var(--bg-2)',
            borderRadius: 'var(--r-pill)',
          }}
        >
          {tags.map((tag) => {
            const isActive = activeTag === tag
            return (
              <button
                key={tag}
                className="px-4 py-1.5 text-sm font-medium transition-all duration-200 relative flex items-center gap-1.5"
                style={{
                  borderRadius: 'var(--r-pill)',
                  background: isActive ? 'var(--accent)' : 'transparent',
                  color: isActive ? 'white' : 'var(--ink-2)',
                  boxShadow: isActive ? '0 2px 8px -2px var(--accent)' : 'none',
                }}
                onClick={() => onFilterChange(tag)}
              >
                {isActive && (
                  <span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-white animate-pulse"
                    style={{ flexShrink: 0 }}
                  />
                )}
                {tag}
              </button>
            )
          })}
        </div>
      </div>

      <p
        className="text-center mt-4"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          color: 'var(--ink-4)',
        }}
      >
        {t('foundPosts', { count: filteredPostsCount })}
      </p>
    </div>
  )
}

export default TagFilter
