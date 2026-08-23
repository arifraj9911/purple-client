'use client';

import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
  FiMoreHorizontal,
} from 'react-icons/fi';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  showEdges?: boolean;
  siblingCount?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
  showEdges = false,
  siblingCount = 1,
}: PaginationProps) {
  if (totalPages <= 1) return null;

  // Build page numbers array with dots
  const pages: (number | 'dots-start' | 'dots-end')[] = [];

  const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
  const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

  const shouldShowLeftDots = leftSiblingIndex > 2;
  const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = Array.from(
      { length: Math.min(leftItemCount, totalPages) },
      (_, i) => i + 1,
    );
    pages.push(...leftRange);
    if (totalPages > leftItemCount) {
      pages.push('dots-end');
      pages.push(totalPages);
    }
  } else if (shouldShowLeftDots && !shouldShowRightDots) {
    const rightItemCount = 3 + 2 * siblingCount;
    pages.push(1);
    pages.push('dots-start');
    const start = Math.max(totalPages - rightItemCount + 1, 2);
    for (let i = start; i <= totalPages; i++) {
      pages.push(i);
    }
  } else if (shouldShowLeftDots && shouldShowRightDots) {
    pages.push(1);
    pages.push('dots-start');
    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      pages.push(i);
    }
    pages.push('dots-end');
    pages.push(totalPages);
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  }

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav
      role='navigation'
      aria-label='Pagination'
      className={`flex items-center justify-center gap-1 sm:gap-1.5 select-none ${className}`}
    >
      {/* First Page (optional edge button for large page counts) */}
      {showEdges && totalPages > 5 && (
        <button
          type='button'
          onClick={() => handlePageClick(1)}
          disabled={currentPage === 1}
          className='group flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-xs transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-30 disabled:border-gray-100 disabled:bg-gray-50'
          aria-label='First page'
          title='First page'
        >
          <FiChevronsLeft className='h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5' />
        </button>
      )}

      {/* Previous Page */}
      <button
        type='button'
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={currentPage === 1}
        className='group flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-2 sm:px-2.5 text-gray-600 shadow-xs transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-30 disabled:border-gray-100 disabled:bg-gray-50'
        aria-label='Previous page'
      >
        <FiChevronLeft className='h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5' />
        <span className='hidden sm:inline-block text-xs font-medium'>Prev</span>
      </button>

      {/* Page Numbers */}
      <div className='flex items-center gap-1'>
        {pages.map((page, idx) => {
          if (page === 'dots-start' || page === 'dots-end') {
            return (
              <span
                key={`${page}-${idx}`}
                className='flex h-8 w-5 sm:w-6 items-center justify-center text-gray-400'
                aria-hidden='true'
              >
                <FiMoreHorizontal className='h-3.5 w-3.5' />
              </span>
            );
          }

          const isActive = page === currentPage;

          return (
            <button
              key={page}
              type='button'
              onClick={() => handlePageClick(page)}
              aria-current={isActive ? 'page' : undefined}
              aria-label={`Page ${page}`}
              className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold tabular-nums transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
                isActive
                  ? 'bg-primary text-white shadow-sm shadow-primary/30 ring-1 ring-primary active:scale-95'
                  : 'border border-gray-200 bg-white text-gray-700 shadow-xs hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-95'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* Next Page */}
      <button
        type='button'
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={currentPage === totalPages}
        className='group flex h-8 min-w-8 items-center justify-center gap-1 rounded-lg border border-gray-200 bg-white px-2 sm:px-2.5 text-gray-600 shadow-xs transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-30 disabled:border-gray-100 disabled:bg-gray-50'
        aria-label='Next page'
      >
        <span className='hidden sm:inline-block text-xs font-medium'>Next</span>
        <FiChevronRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
      </button>

      {/* Last Page (optional edge button for large page counts) */}
      {showEdges && totalPages > 5 && (
        <button
          type='button'
          onClick={() => handlePageClick(totalPages)}
          disabled={currentPage === totalPages}
          className='group flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-xs transition-all duration-200 hover:border-primary/40 hover:bg-primary/5 hover:text-primary active:scale-95 disabled:pointer-events-none disabled:opacity-30 disabled:border-gray-100 disabled:bg-gray-50'
          aria-label='Last page'
          title='Last page'
        >
          <FiChevronsRight className='h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5' />
        </button>
      )}
    </nav>
  );
}
