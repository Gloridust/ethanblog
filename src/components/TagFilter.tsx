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
    <div className="mb-8">
      <h2 className="text-xl font-bold mb-4">Filter by Tag</h2>
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded-full ${
            activeTag === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => handleTagClick('All')}
        >
          All
        </button>
        {tags.map((tag) => (
          <button
            key={tag}
            className={`px-3 py-1 rounded-full ${
              activeTag === tag ? 'bg-blue-500 text-white' : 'bg-gray-200'
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