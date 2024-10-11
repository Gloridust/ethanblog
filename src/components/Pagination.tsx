import React from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
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
          className={`px-3 py-2 ml-0 leading-tight border rounded-l-lg 
            ${currentPage === 1 ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-blue-500 bg-white hover:bg-gray-100 hover:text-blue-700'}`}
        >
          上一页
        </button>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 py-2 leading-tight border 
              ${page === currentPage ? 'text-white bg-blue-500' : 'text-blue-500 bg-white hover:bg-gray-100 hover:text-blue-700'}`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-2 leading-tight border rounded-r-lg 
            ${currentPage === totalPages ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : 'text-blue-500 bg-white hover:bg-gray-100 hover:text-blue-700'}`}
        >
          下一页
        </button>
      </nav>
    </div>
  )
}

export default Pagination