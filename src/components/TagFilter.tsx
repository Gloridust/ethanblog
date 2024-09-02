import React, { useState, useRef, useEffect } from 'react'

interface TagFilterProps {
  tags: string[]
  activeTag: string
  onFilterChange: (tag: string) => void
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, activeTag, onFilterChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
    <div className="mb-8 flex justify-center">
      {/* Mobile dropdown */}
      <div className="relative md:hidden" ref={dropdownRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-blue-500 text-white rounded-full text-sm font-medium"
        >
          {activeTag} ▼
        </button>
        {isOpen && (
          <div className="absolute z-10 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className={`block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left ${
                    activeTag === tag ? 'bg-gray-100 text-gray-900' : ''
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

      {/* Desktop buttons */}
      <div className="hidden md:flex flex-wrap gap-2 justify-center">
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              activeTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
            onClick={() => onFilterChange(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TagFilter