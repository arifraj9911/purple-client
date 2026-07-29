'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { FiUser, FiLogIn, FiUserPlus } from 'react-icons/fi';

export default function UserDropdown() {
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
        <FiUser className='h-5 w-5' />
      </button>

      <div
        className={`absolute right-0 top-full z-50 mt-2 w-48 rounded-xl border border-gray-200 bg-white py-2 shadow-lg transition-all duration-200 origin-top-right ${
          isOpen
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible'
        }`}
      >
        <div className='absolute -top-1.5 right-4 h-3 w-3 rotate-45 border-l border-t border-gray-200 bg-white' />

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
      </div>
    </div>
  );
}
