'use client';

import Link from 'next/link';
import { FiMenu, FiSearch, FiFeather, FiShoppingCart } from 'react-icons/fi';

interface MiddleHeaderProps {
  onMenuToggle: () => void;
}

export default function MiddleHeader({ onMenuToggle }: MiddleHeaderProps) {
  return (
    <div className='border-b border-gray-200 bg-white'>
      <div className='container mx-auto flex items-center gap-4 px-4 md:px-6 lg:px-8 py-3 md:py-4'>
        {/* Mobile: Hamburger Menu — left */}
        <button
          onClick={onMenuToggle}
          className='shrink-0 rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden'
          aria-label='Open menu'
        >
          <FiMenu className='h-6 w-6' />
        </button>

        {/* Logo with Icon — center on mobile */}
        <Link
          href='/'
          className='shrink-0 font-heading text-xl font-bold text-secondary md:text-2xl flex items-center gap-1.5 mx-auto lg:mx-0'
        >
          <FiFeather className='h-6 w-6 md:h-7 md:w-7 text-primary' />
          <span className='text-primary'>Purple</span> BD
        </Link>

        {/* Search Bar — Desktop only */}
        <div className='hidden flex-1 lg:block'>
          <div className='relative mx-auto max-w-xl'>
            <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
              <FiSearch className='h-5 w-5 text-gray-400' />
            </div>
            <input
              type='text'
              placeholder='Search for products...'
              className='w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-20 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary'
            />
            <button className='absolute inset-y-1 right-1 rounded-md bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-dark'>
              Search
            </button>
          </div>
        </div>

        {/* Right: Cart (mobile) / Easy Returns (desktop) */}
        <div className='flex shrink-0 items-center gap-1 md:gap-4'>
          {/* Mobile: Cart only */}
          <button
            className='relative rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100 lg:hidden'
            aria-label='Shopping cart'
          >
            <FiShoppingCart className='h-5 w-5' />
            <span className='absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white'>
              5
            </span>
          </button>

          {/* Desktop: Easy Returns */}
          <div className='hidden items-center gap-2 lg:flex'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-8 w-8 text-primary shrink-0'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={1.5}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
              />
            </svg>
            <div className='text-sm leading-tight'>
              <p className='font-medium text-gray-900'>Easy Returns</p>
              <p className='text-gray-500'>Within 7 Days</p>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar — below the logo row, full width */}
      <div className='lg:hidden border-t border-gray-100 bg-white px-4 py-2'>
        <div className='relative'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <FiSearch className='h-4 w-4 text-gray-400' />
          </div>
          <input
            type='text'
            placeholder='Search for products...'
            className='w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary'
          />
        </div>
      </div>
    </div>
  );
}
