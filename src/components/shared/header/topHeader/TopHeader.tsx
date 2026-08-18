'use client';

import Link from 'next/link';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import { FiPhone, FiMail, FiHeart, FiColumns } from 'react-icons/fi';
import { useWishlist } from '@/lib/wishlist-context';
import { useCompare } from '@/lib/compare-context';

export default function TopHeader() {
  const { totalItems: wishlistCount } = useWishlist();
  const { totalItems: compareCount } = useCompare();

  return (
    <div className='hidden lg:block bg-secondary text-white'>
      <div className='container mx-auto flex items-center justify-between px-4 md:px-6 lg:px-8 py-2 text-small'>
        {/* Left: Social Links */}
        <div className='flex items-center gap-4'>
          <a
            href='https://facebook.com'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center text-gray-300 transition-colors hover:text-[#1877F2]'
            aria-label='Facebook'
          >
            <FaFacebook className='h-4 w-4' />
          </a>
          <a
            href='https://instagram.com'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center text-gray-300 transition-colors hover:text-[#E4405F]'
            aria-label='Instagram'
          >
            <FaInstagram className='h-4 w-4' />
          </a>
          <a
            href='https://tiktok.com'
            target='_blank'
            rel='noopener noreferrer'
            className='flex items-center justify-center text-gray-300 transition-colors hover:text-white'
            aria-label='TikTok'
          >
            <FaTiktok className='h-4 w-4' />
          </a>
        </div>

        {/* Right: Phone | Email | Wishlist | Compare */}
        <div className='flex items-center gap-4'>
          <a
            href='tel:+8801700000000'
            className='flex items-center gap-1.5 text-gray-300 transition-colors hover:text-white'
          >
            <FiPhone className='h-3.5 w-3.5' />
            <span>017XX-XXXXXX</span>
          </a>
          <span className='h-4 w-px bg-gray-600' />
          <a
            href='mailto:info@purplebd.com'
            className='flex items-center gap-1.5 text-gray-300 transition-colors hover:text-white'
          >
            <FiMail className='h-3.5 w-3.5' />
            <span>info@purplebd.com</span>
          </a>

          <span className='h-4 w-px bg-gray-600' />

          <Link
            href='/wishlist'
            className='relative flex items-center justify-center text-gray-300 transition-colors hover:text-white'
            aria-label='Wishlist'
          >
            <FiHeart className='h-4 w-4' />
            {wishlistCount > 0 && (
              <span className='absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-sale-badge px-1 text-[10px] font-bold text-white'>
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link
            href='/compare'
            className='relative flex items-center justify-center text-gray-300 transition-colors hover:text-white'
            aria-label='Compare products'
          >
            <FiColumns className='h-4 w-4' />
            {compareCount > 0 && (
              <span className='absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white'>
                {compareCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}
