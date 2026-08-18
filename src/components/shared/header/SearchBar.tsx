'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FiSearch } from 'react-icons/fi';
import {
  products,
  newArrivals,
  getCurrentPrice,
  type Product,
} from '@/data/products';

const MAX_RESULTS = 10;

interface SearchBarProps {
  placeholder?: string;
  showSubmitButton?: boolean;
  inputClassName?: string;
}

export default function SearchBar({
  placeholder = 'Search for products...',
  showSubmitButton = false,
  inputClassName = '',
}: SearchBarProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  /* Close the dropdown on outside click */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return newArrivals.slice(0, MAX_RESULTS);
    return products
      .filter((p) =>
        [p.name, p.category, p.brand, p.slug].some((value) =>
          value.toLowerCase().includes(q),
        ),
      )
      .slice(0, MAX_RESULTS);
  }, [query]);

  const goToShop = (product?: Product) => {
    const q = product ? product.slug : query.trim();
    if (!q) return;
    router.push(`/shop?q=${encodeURIComponent(q)}`);
    setIsOpen(false);
    setQuery('');
  };

  const viewAll = () => {
    const q = query.trim();
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
    setIsOpen(false);
    setQuery('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    goToShop();
  };

  return (
    <div ref={wrapperRef} className='relative'>
      <form onSubmit={handleSubmit}>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <FiSearch className='h-5 w-5 text-gray-400' />
        </div>
        <input
          type='text'
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`w-full rounded-lg border border-gray-200 bg-gray-50 pl-10 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary ${
            showSubmitButton ? 'pr-20' : 'pr-3'
          } ${inputClassName}`}
        />
        {showSubmitButton && (
          <button
            type='submit'
            className='absolute inset-y-1 right-1 rounded-md bg-primary px-4 text-sm font-medium text-white transition-colors hover:bg-primary-dark'
          >
            Search
          </button>
        )}
      </form>

      {/* ── Results dropdown ── */}
      <div
        className={`absolute left-0 right-0 top-full z-50 mt-1 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg transition-all duration-200 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className='max-h-75 overflow-y-auto'>
          {results.length === 0 ? (
            <p className='px-4 py-6 text-center text-sm text-gray-400'>
              No products found
            </p>
          ) : (
            <ul>
              {results.map((product) => (
                <li key={product.id}>
                  <button
                    type='button'
                    onClick={() => goToShop(product)}
                    className='flex w-full items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-gray-50'
                  >
                    <div className='relative h-10 w-10 shrink-0 overflow-hidden rounded-md bg-gray-100'>
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes='40px'
                        className='object-cover'
                      />
                    </div>
                    <div className='min-w-0 flex-1'>
                      <p className='truncate text-sm font-medium text-gray-800'>
                        {product.name}
                      </p>
                      <p className='truncate text-xs text-gray-400'>
                        {product.category}
                      </p>
                    </div>
                    <span className='shrink-0 text-sm font-semibold text-primary'>
                      ৳{getCurrentPrice(product).toLocaleString()}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* View All footer */}
        <button
          type='button'
          onClick={viewAll}
          className='block w-full border-t border-gray-100 bg-gray-50 px-4 py-2.5 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary-light'
        >
          View All
        </button>
      </div>
    </div>
  );
}
