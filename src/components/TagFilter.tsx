import React, { useState } from 'react'

interface TagFilterProps {
  tags: string[]
  onFilterChange: (tag: string) => void
}

const TagFilter: React.FC<TagFilterProps> = ({ tags, onFilterChange }) => {
  const [activeTag, setActiveTag] = useState<string>('All')

  const handleTagClick = (tag: string) => {
    setActiveTag(tag)
    onFilterChange(tag)
  }

  return (
    <div className="mb-8 flex justify-center">
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            activeTag === 'All' 
              ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-md' 
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
          }`}
          onClick={() => handleTagClick('All')}
        >
          全部
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTag === tag 
                ? 'bg-blue-500 dark:bg-blue-600 text-white shadow-md' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}

export default TagFilter