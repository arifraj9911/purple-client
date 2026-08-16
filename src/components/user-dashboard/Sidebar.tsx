'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { IconType } from 'react-icons';
import {
  FiGrid,
  FiPackage,
  FiHeart,
  FiMapPin,
  FiLock,
  FiLogOut,
} from 'react-icons/fi';
import { useAuth } from '@/lib/auth-context';

export type Section = 'overview' | 'orders' | 'addresses' | 'password';

interface NavItem {
  key: Section;
  label: string;
  icon: IconType;
}

const SECTIONS: NavItem[] = [
  { key: 'overview', label: 'Overview', icon: FiGrid },
  { key: 'orders', label: 'My Orders', icon: FiPackage },
  { key: 'addresses', label: 'Addresses', icon: FiMapPin },
];

const PASSWORD_ITEM: NavItem = {
  key: 'password',
  label: 'Change Password',
  icon: FiLock,
};

interface DashboardNavProps {
  active: Section;
  onSelect: (section: Section) => void;
  variant: 'mobile' | 'desktop';
}

/**
 * Dashboard navigation.
 * - Desktop: vertical sidebar items (rendered inside the sticky aside).
 * - Mobile: horizontal scrollable pill tabs shown above the content.
 */
export default function DashboardNav({
  active,
  onSelect,
  variant,
}: DashboardNavProps) {
  const { logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (variant === 'mobile') {
    const pillClass =
      'flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors';

    return (
      <nav className='flex items-center gap-2 overflow-x-auto pb-1'>
        {SECTIONS.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.key;
          return (
            <button
              key={item.key}
              type='button'
              onClick={() => onSelect(item.key)}
              className={`${pillClass} ${
                isActive
                  ? 'border-primary bg-primary text-white'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary'
              }`}
            >
              <Icon className='h-4 w-4' />
              {item.label}
            </button>
          );
        })}

        <Link
          href='/wishlist'
          className={`${pillClass} border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary`}
        >
          <FiHeart className='h-4 w-4' />
          Wishlist
        </Link>

        <button
          type='button'
          onClick={() => onSelect(PASSWORD_ITEM.key)}
          className={`${pillClass} ${
            active === PASSWORD_ITEM.key
              ? 'border-primary bg-primary text-white'
              : 'border-gray-200 bg-white text-gray-600 hover:border-primary hover:text-primary'
          }`}
        >
          <FiLock className='h-4 w-4' />
          {PASSWORD_ITEM.label}
        </button>

        <button
          type='button'
          onClick={handleLogout}
          className={`${pillClass} border-gray-200 bg-white text-red-500 hover:border-red-200 hover:bg-red-50`}
        >
          <FiLogOut className='h-4 w-4' />
          Logout
        </button>
      </nav>
    );
  }

  const itemClass = (isActive: boolean) =>
    `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
      isActive
        ? 'bg-primary-light text-primary'
        : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
    }`;

  return (
    <nav className='space-y-1'>
      {SECTIONS.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.key;
        return (
          <button
            key={item.key}
            type='button'
            onClick={() => onSelect(item.key)}
            className={`w-full ${itemClass(isActive)}`}
          >
            <Icon className='h-4 w-4 shrink-0' />
            {item.label}
          </button>
        );
      })}

      <Link href='/wishlist' className={`w-full ${itemClass(false)}`}>
        <FiHeart className='h-4 w-4 shrink-0' />
        Wishlist
      </Link>

      <button
        type='button'
        onClick={() => onSelect(PASSWORD_ITEM.key)}
        className={`w-full ${itemClass(active === PASSWORD_ITEM.key)}`}
      >
        <FiLock className='h-4 w-4 shrink-0' />
        {PASSWORD_ITEM.label}
      </button>

      <div className='my-2 h-px bg-gray-100' />

      <button
        type='button'
        onClick={handleLogout}
        className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-red-50 hover:text-red-500'
      >
        <FiLogOut className='h-4 w-4 shrink-0' />
        Logout
      </button>
    </nav>
  );
}
