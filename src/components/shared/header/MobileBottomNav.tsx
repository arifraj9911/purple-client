'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiHome, FiHeart, FiUser, FiCopy } from 'react-icons/fi';

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/', icon: FiHome },
    { label: 'Wishlist', href: '/wishlist', icon: FiHeart },
    { label: 'Compare', href: '/compare', icon: FiCopy },
    { label: 'My Account', href: '/login', icon: FiUser },
  ] as const;

  return (
    <div className='fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white lg:hidden safe-area-bottom'>
      <nav className='flex items-center justify-around'>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 py-2 px-3 min-w-0 transition-colors ${
                isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'
              }`}
            >
              <Icon className='h-5 w-5' />
              <span className='text-[10px] font-medium whitespace-nowrap'>
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
