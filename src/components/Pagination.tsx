import React from 'react'
import useTranslation from '@/hooks/useTranslation'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const { t } = useTranslation()
  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="flex justify-center mt-8">
      <nav className="inline-flex -space-x-px">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 ml-0 leading-tight border rounded-l-lg transition-colors duration-200
            ${currentPage === 1 
              ? 'text-gray-400 bg-gray-800 cursor-not-allowed' // 保持禁用状态样式
              : 'text-blue-600 bg-white dark:bg-gray-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'}`} // 优化按钮样式
        >
          {t('previous')}
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-4 py-2 leading-tight border transition-colors duration-200
              ${page === currentPage 
                ? 'text-white bg-blue-600 rounded' // 突出当前页
                : 'text-blue-500 bg-white dark:bg-gray-700 dark:text-blue-200 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'}`} // 优化分页按钮样式
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 leading-tight border rounded-r-lg transition-colors duration-200
            ${currentPage === totalPages 
              ? 'text-gray-400 bg-gray-800 cursor-not-allowed' // 保持禁用状态样式
              : 'text-blue-600 bg-white dark:bg-gray-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-gray-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'}`} // 优化按钮样式
        >
          {t('next')}
        </button>
      </nav>
    </div>
  )
}

export default Pagination