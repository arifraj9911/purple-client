'use client';

import { useState } from 'react';
import { FiMessageCircle, FiPhone, FiX } from 'react-icons/fi';
import { FaWhatsapp, FaFacebookMessenger } from 'react-icons/fa';

interface ContactOption {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
  bgClass: string;
}

const CONTACT_OPTIONS: ContactOption[] = [
  {
    icon: FiPhone,
    label: 'Call Us',
    href: 'tel:+8801700000000',
    bgClass: 'bg-green-500 hover:bg-green-600',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    href: 'https://wa.me/8801700000000',
    bgClass: 'bg-[#25D366] hover:bg-[#1ebe57]',
  },
  {
    icon: FaFacebookMessenger,
    label: 'Messenger',
    href: 'https://m.me/purplebd',
    bgClass: 'bg-[#0084FF] hover:bg-[#0073e6]',
  },
];

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='fixed right-5 bottom-26.5 z-50 flex flex-col items-center gap-2 lg:right-5 lg:bottom-17'>
      {/* Contact option buttons — pop into place above the button */}
      {CONTACT_OPTIONS.map((option) => (
        <a
          key={option.label}
          href={option.href}
          target='_blank'
          rel='noopener noreferrer'
          aria-label={option.label}
          title={option.label}
          className={`flex h-8 w-8 items-center justify-center rounded-full text-white shadow-lg transition-all duration-300 ${option.bgClass} ${
            isOpen
              ? 'scale-100 opacity-100'
              : 'pointer-events-none scale-0 opacity-0'
          }`}
        >
          <option.icon className='h-4 w-4' />
        </a>
      ))}

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close contact menu' : 'Open contact menu'}
        className={`flex h-9 w-9 items-center justify-center rounded-full shadow-lg transition-all duration-300 cursor-pointer ${
          isOpen
            ? 'rotate-90 bg-gray-800 text-white hover:bg-gray-900'
            : 'bg-gray-800 text-white hover:bg-gray-900'
        }`}
      >
        {isOpen ? (
          <FiX className='h-4 w-4' />
        ) : (
          <FiMessageCircle className='h-4 w-4' />
        )}
      </button>
    </div>
  );
}
