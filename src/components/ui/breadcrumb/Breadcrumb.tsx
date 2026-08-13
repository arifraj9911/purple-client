'use client';

import Link from 'next/link';
import { FiChevronRight } from 'react-icons/fi';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav
      aria-label='Breadcrumb'
      className='flex items-center gap-1 text-xs text-gray-500 sm:text-sm'
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span
            key={`${item.label}-${index}`}
            className='flex items-center gap-1'
          >
            {index > 0 && (
              <FiChevronRight className='h-3.5 w-3.5 shrink-0 text-gray-300' />
            )}
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className='transition-colors hover:text-primary'
              >
                {item.label}
              </Link>
            ) : (
              <span className={isLast ? 'font-medium text-gray-800' : ''}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
