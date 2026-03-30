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
            className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 shadow-md shadow-blue-500/20"
          >
            {activeTag} {isOpen ? '▲' : '▼'}
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-2 w-44 rounded-2xl shadow-xl bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 overflow-hidden py-1.5">
              <div role="menu">
                {tags.map((tag) => (
                  <button
                    key={tag}
                    className={`block w-full px-4 py-2 text-sm text-left transition-colors duration-150 ${
                      activeTag === tag
                        ? 'bg-blue-500 text-white font-medium'
                        : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
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
        <div className="hidden md:flex flex-wrap gap-1.5 justify-center bg-gray-100/80 dark:bg-gray-800/60 rounded-full p-1 backdrop-blur-sm">
          {tags.map((tag) => (
            <button
              key={tag}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTag === tag
                  ? 'bg-blue-500 text-white shadow-md shadow-blue-500/25'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-gray-700/40'
              }`}
              onClick={() => onFilterChange(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <p className="text-center mt-4 text-sm text-gray-500 dark:text-gray-400">
        {t('foundPosts', { count: filteredPostsCount })}
      </p>
    </div>
  )
}

export default TagFilter
