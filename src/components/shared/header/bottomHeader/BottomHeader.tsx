'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiShoppingCart } from 'react-icons/fi';
import CategoryDropdown from '../CategoryDropdown';
import UserDropdown from '../UserDropdown';
import { useCart } from '@/lib/cart-context';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
] as const;

export default function BottomHeader() {
  const pathname = usePathname();
  const { totalItems, openDrawer } = useCart();

  return (
    <div className='hidden lg:block border-b border-gray-300 bg-white py-1.5'>
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

        {/* Right: Cart + User profile */}
        <div className='ml-auto hidden lg:flex items-center gap-1 lg:gap-2'>
          <button
            onClick={openDrawer}
            className='relative rounded-lg p-2 text-gray-700 transition-colors hover:bg-gray-100'
            aria-label='Shopping cart'
          >
            <FiShoppingCart className='h-6.5 w-6.5' />
            {totalItems > 0 && (
              <span className='absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white'>
                {totalItems}
              </span>
            )}
          </button>

          <UserDropdown />
        </div>
      </div>
    </div>
  );
}
