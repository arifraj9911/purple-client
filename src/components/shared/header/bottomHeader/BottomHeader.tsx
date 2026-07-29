'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHeart, FiShoppingCart } from 'react-icons/fi';
import CategoryDropdown from '../CategoryDropdown';
import UserDropdown from '../UserDropdown';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Offers', href: '/offers' },
] as const;

export default function BottomHeader() {
  const pathname = usePathname();

  return (
    <div className='hidden lg:block sticky top-0 z-40 border-b border-gray-200 bg-white'>
      <div className='container mx-auto flex items-center px-4 md:px-6 lg:px-8'>
        {/* Categories — with Dropdown (reduced left padding) */}
        <div className='hidden lg:block'>
          <CategoryDropdown />
        </div>

        {/* Navigation Links — Desktop */}
        <nav className='hidden items-center lg:flex'>
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-3 text-sm font-heading font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-b-2 border-primary text-primary'
                    : 'text-gray-700 hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: User + Wishlist + Cart (Desktop only) */}
        <div className='ml-auto hidden lg:flex items-center gap-1 lg:gap-2'>
          {/* User Dropdown */}
          <div className='hidden lg:block'>
            <UserDropdown />
          </div>

          {/* Wishlist Icon */}
          <button
            className='relative rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100'
            aria-label='Wishlist'
          >
            <FiHeart className='h-5 w-5' />
            <span className='absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sale-badge px-1 text-[10px] font-bold text-white'>
              3
            </span>
          </button>

          {/* Cart Icon */}
          <button
            className='relative rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100'
            aria-label='Shopping cart'
          >
            <FiShoppingCart className='h-5 w-5' />
            <span className='absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white'>
              5
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
