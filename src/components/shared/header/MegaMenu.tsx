'use client';

import Link from 'next/link';
import { useState } from 'react';
import { categories, type Category } from '@/data/categories';

export default function MegaMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className='relative'
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Trigger Button */}
      <button
        className={`flex h-full items-center gap-2 border-r border-gray-200 px-5 py-3 font-heading text-sm font-semibold transition-colors ${
          isOpen
            ? 'bg-primary text-white'
            : 'text-secondary hover:bg-primary hover:text-white'
        }`}
      >
        {/* Grid Icon */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4 6h16M4 10h16M4 14h16M4 18h16'
          />
        </svg>
        All Categories
        {/* Chevron */}
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`h-3 w-3 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={3}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </button>

      {/* Mega Dropdown */}
      <div
        className={`absolute left-0 top-full z-50 w-[800px] max-w-[95vw] rounded-b-xl border border-gray-200 bg-white shadow-2xl transition-all duration-200 origin-top ${
          isOpen
            ? 'opacity-100 scale-y-100 visible'
            : 'opacity-0 scale-y-95 invisible'
        }`}
      >
        <div className='grid grid-cols-4 gap-2 p-6'>
          {categories.map((cat) => (
            <MegaMenuColumn key={cat.slug} category={cat} />
          ))}
        </div>

        {/* Bottom: View All */}
        <div className='border-t border-gray-100 px-6 py-3'>
          <Link
            href='/shop'
            className='text-sm font-medium text-primary hover:text-primary-dark transition-colors'
          >
            View All Categories →
          </Link>
        </div>
      </div>
    </div>
  );
}

/** Recursive column for one top-level category */
function MegaMenuColumn({ category }: { category: Category }) {
  return (
    <div className='space-y-2'>
      {/* Parent Category Heading */}
      <Link
        href={`/shop?category=${category.slug}`}
        className='flex items-center gap-2 font-heading text-sm font-semibold text-secondary hover:text-primary transition-colors'
      >
        {category.name}
      </Link>

      {/* Divider */}
      <div className='h-px bg-gray-100' />

      {/* Children */}
      {category.children && category.children.length > 0 && (
        <ul className='space-y-0.5'>
          {category.children.map((child) => (
            <MegaMenuItem key={child.slug} category={child} />
          ))}
        </ul>
      )}
    </div>
  );
}

/** Recursive item for sub-categories */
function MegaMenuItem({ category }: { category: Category }) {
  const hasChildren = category.children && category.children.length > 0;

  return (
    <li>
      <Link
        href={`/shop?category=${category.slug}`}
        className={`block rounded px-1 py-1 text-sm transition-colors ${
          hasChildren
            ? 'font-medium text-gray-800 hover:text-primary hover:bg-primary-light'
            : 'text-gray-600 hover:text-primary hover:bg-primary-light'
        }`}
      >
        {category.name}
      </Link>

      {/* Nested children (3rd level+) */}
      {hasChildren && (
        <ul className='ml-3 border-l border-gray-100 pl-2 space-y-0.5'>
          {category.children!.map((grandchild) => (
            <li key={grandchild.slug}>
              <Link
                href={`/shop?category=${grandchild.slug}`}
                className='block rounded px-1 py-0.5 text-small text-gray-500 hover:text-primary hover:bg-primary-light transition-colors'
              >
                {grandchild.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
