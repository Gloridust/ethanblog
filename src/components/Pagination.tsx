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
    <div className="flex justify-center mt-8 mb-12">
      <nav
        className="inline-flex items-center gap-0.5 px-2 py-1.5"
        style={{
          background: 'var(--bg-2)',
          borderRadius: 'var(--r-pill)',
        }}
      >
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full transition-all duration-200"
          style={{
            color: currentPage === 1 ? 'var(--glass-border)' : 'var(--ink-3)',
            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
            opacity: currentPage === 1 ? 0.5 : 1,
          }}
          aria-label="Previous page"
          onMouseEnter={(e) => {
            if (currentPage !== 1) {
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'
            }
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = currentPage === 1 ? 'var(--glass-border)' : 'var(--ink-3)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {pages.map((page) => {
          const isActive = page === currentPage
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className="min-w-[2.5rem] h-10 rounded-full text-sm font-medium transition-all duration-200"
              style={{
                background: isActive ? 'var(--accent)' : 'transparent',
                color: isActive ? 'white' : 'var(--ink-2)',
                boxShadow: isActive ? '0 2px 8px -2px var(--accent)' : 'none',
              }}
              aria-label={`Page ${page}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {page}
            </button>
          )
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-full transition-all duration-200"
          style={{
            color: currentPage === totalPages ? 'var(--glass-border)' : 'var(--ink-3)',
            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
            opacity: currentPage === totalPages ? 0.5 : 1,
          }}
          aria-label="Next page"
          onMouseEnter={(e) => {
            if (currentPage !== totalPages) {
              ;(e.currentTarget as HTMLButtonElement).style.color = 'var(--ink)'
            }
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.color = currentPage === totalPages ? 'var(--glass-border)' : 'var(--ink-3)'
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>
      </nav>
    </div>
  )
}

export default Pagination
