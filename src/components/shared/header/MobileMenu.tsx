'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { FiX, FiChevronDown, FiFeather } from 'react-icons/fi';
import { FaFacebook, FaInstagram, FaTiktok } from 'react-icons/fa';
import {
  categories,
  buildCategoryTree,
  type Category,
} from '@/data/categories';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Shop', href: '/shop' },
  { label: 'Products', href: '/products' },
  { label: 'Blog', href: '/blog' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
  { label: 'Offers', href: '/offers' },
] as const;

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<'categories' | 'menu'>(
    'categories',
  );
  const prevPathname = useRef(pathname);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close drawer only when pathname actually changes (not on mount)
  useEffect(() => {
    if (prevPathname.current !== pathname) {
      onClose();
    }
    prevPathname.current = pathname;
  }, [pathname]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* ===== TOP: Purple BD Logo (left) + Close X (right) ===== */}
        <div className='flex items-center justify-between border-b border-gray-300 px-4 py-4'>
          <Link
            href='/'
            className='font-heading text-lg font-bold text-secondary flex items-center gap-1.5'
            onClick={onClose}
          >
            <FiFeather className='h-5 w-5 text-primary' />
            <span className='text-primary'>Purple</span> BD
          </Link>
          <button
            onClick={onClose}
            className='rounded-lg p-2 text-gray-500 transition-colors hover:bg-gray-100'
            aria-label='Close menu'
          >
            <FiX className='h-5 w-5' />
          </button>
        </div>

        {/* ===== TABS: CATEGORIES | MENU — 50/50 full width with bg ===== */}
        <div className='flex border-b border-gray-300 px-4 py-3'>
          <div className='flex w-full rounded-lg bg-gray-100 p-1'>
            <button
              onClick={() => setActiveTab('categories')}
              className={`flex-1 rounded-md py-2 text-sm font-semibold font-heading transition-colors text-center ${
                activeTab === 'categories'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              CATEGORIES
            </button>
            <button
              onClick={() => setActiveTab('menu')}
              className={`flex-1 rounded-md py-2 text-sm font-semibold font-heading transition-colors text-center ${
                activeTab === 'menu'
                  ? 'bg-white text-primary shadow-sm'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              MENU
            </button>
          </div>
        </div>

        {/* ===== DRAWER CONTENT ===== */}
        <div
          className='overflow-y-auto'
          style={{ height: 'calc(100% - 195px)' }}
        >
          {activeTab === 'categories' && (
            <div className='px-3 py-2'>
              <ul className='space-y-0.5'>
                {buildCategoryTree(categories).map((cat) => (
                  <MobileCategoryItem
                    key={cat.slug}
                    category={cat}
                    onClose={onClose}
                  />
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'menu' && (
            <div className='px-3 py-2'>
              <ul className='space-y-0.5'>
                {NAV_LINKS.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          isActive
                            ? 'bg-primary-light text-primary'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary'
                        }`}
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* ===== BOTTOM: Follow Us Social ===== */}
        <div className='absolute bottom-0 left-0 right-0 border-t border-gray-300 bg-white px-4 py-3'>
          <div className='flex items-center justify-center gap-5'>
            <span className='text-xs text-gray-500 font-medium'>
              Follow Us:
            </span>
            <a
              href='https://facebook.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-[#1877F2] transition-colors'
              aria-label='Facebook'
            >
              <FaFacebook className='h-4 w-4' />
            </a>
            <a
              href='https://instagram.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-[#E4405F] transition-colors'
              aria-label='Instagram'
            >
              <FaInstagram className='h-4 w-4' />
            </a>
            <a
              href='https://tiktok.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-gray-400 hover:text-black transition-colors'
              aria-label='TikTok'
            >
              <FaTiktok className='h-4 w-4' />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/** Recursive mobile category item — supports N-level nesting */
function MobileCategoryItem({
  category,
  onClose,
  depth = 0,
}: {
  category: Category;
  onClose: () => void;
  depth?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = !!(category.children && category.children.length > 0);

  return (
    <li>
      <div
        className={`flex items-center rounded-lg transition-colors ${
          expanded ? 'bg-primary-light/30' : ''
        } ${depth > 0 ? 'ml-3' : ''}`}
      >
        <Link
          href={`/shop?category=${category.slug}`}
          className={`flex flex-1 items-center gap-2 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:text-primary ${
            depth === 0 ? 'px-3' : 'px-2'
          }`}
          onClick={onClose}
        >
          <span className={`${depth === 0 ? 'font-semibold' : ''}`}>
            {category.name}
          </span>
        </Link>
        {hasChildren && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className='mr-1 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700'
            aria-label={expanded ? 'Collapse' : 'Expand'}
            aria-expanded={expanded}
          >
            <FiChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                expanded ? 'rotate-180' : ''
              }`}
            />
          </button>
        )}
      </div>
      {hasChildren && (
        <ul
          className={`ml-2 border-l-2 border-primary-light/60 space-y-0.5 overflow-hidden transition-all duration-300 ease-in-out ${
            expanded ? 'mt-0.5 max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          {category.children!.map((child) => (
            <MobileCategoryItem
              key={child.slug}
              category={child}
              onClose={onClose}
              depth={depth + 1}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
