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
          className={`px-3 py-2 ml-0 leading-tight border rounded-l-lg transition-colors duration-200
            ${currentPage === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-blue-500 bg-white hover:bg-gray-100 hover:text-blue-700'}`}
        >
          {t('previous')}
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 leading-tight border transition-colors duration-200
              ${page === currentPage ? 'text-white bg-blue-500' : 'text-blue-500 bg-white hover:bg-gray-100 hover:text-blue-700'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 leading-tight border rounded-r-lg transition-colors duration-200
            ${currentPage === totalPages ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-blue-500 bg-white hover:bg-gray-100 hover:text-blue-700'}`}
        >
          {t('next')}
        </button>
      </nav>
    </div>
  )
}

export default Pagination