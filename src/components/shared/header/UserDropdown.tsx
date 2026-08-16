'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogIn, FiUserPlus, FiGrid, FiLogOut } from 'react-icons/fi';
import { useAuth } from '@/lib/auth-context';

export default function UserDropdown() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  const initial = user ? user.name.charAt(0).toUpperCase() : '';

  return (
    <div className='relative' ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-lg p-2 transition-colors ${
          isOpen
            ? 'bg-primary-light text-primary'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
        aria-label='User account'
        aria-expanded={isOpen}
      >
        {user ? (
          <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-white'>
            {initial}
          </span>
        ) : (
          <FiUser className='h-5 w-5' />
        )}
      </button>

      <div
        className={`absolute right-0 top-full z-50 mt-2 w-56 rounded-xl border border-gray-200 bg-white py-2 shadow-lg transition-all duration-200 origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible'
        }`}
      >
        <div className='absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-l border-t border-gray-200 bg-white' />

        {user ? (
          <>
            <div className='px-4 py-2'>
              <p className='truncate text-sm font-semibold text-gray-900'>
                {user.name}
              </p>
              <p className='truncate text-xs text-gray-500'>{user.email}</p>
            </div>

            <div className='my-1 h-px bg-gray-100' />

            <Link
              href='/user-dashboard'
              className='flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors'
              onClick={() => setIsOpen(false)}
            >
              <FiGrid className='h-4 w-4' />
              Dashboard
            </Link>

            <button
              onClick={handleLogout}
              className='flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors'
            >
              <FiLogOut className='h-4 w-4' />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href='/login'
              className='flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors'
              onClick={() => setIsOpen(false)}
            >
              <FiLogIn className='h-4 w-4' />
              Login
            </Link>

            <div className='my-1 h-px bg-gray-100' />

            <Link
              href='/register'
              className='flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors'
              onClick={() => setIsOpen(false)}
            >
              <FiUserPlus className='h-4 w-4' />
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
