'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { FiPlus, FiSearch } from 'react-icons/fi';
import { getCurrentPrice, products } from '@/data/products';
import { useCompare } from '@/lib/compare-context';

/**
 * Searchable dropdown used to fill an empty compare slot.
 * Lists every product that is not already being compared.
 */
export default function AddProductSearch() {
  const { items, addToCompare } = useCompare();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);

  const available = useMemo(
    () => products.filter((p) => !items.includes(p.id)),
    [items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return available;
    return available.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [available, query]);

  /* Close the dropdown when clicking outside. */
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id: number) => {
    addToCompare(id);
    setQuery('');
    setOpen(false);
  };

  return (
    <div ref={wrapperRef} className='relative h-full min-h-50'>
      <button
        type='button'
        onClick={() => setOpen((o) => !o)}
        className='flex h-full w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-gray-200 p-4 text-gray-400 transition-colors hover:border-primary hover:text-primary'
      >
        <FiPlus className='h-6 w-6' />
        <span className='text-sm font-medium'>Add Product</span>
      </button>

      {open && (
        <div className='absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg'>
          <div className='border-b border-gray-100 p-2'>
            <div className='relative'>
              <FiSearch className='absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
              <input
                autoFocus
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder='Search products…'
                className='w-full rounded-lg bg-gray-50 py-2 pl-8 pr-2 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-primary'
              />
            </div>
          </div>

          <ul className='max-h-60 overflow-y-auto'>
            {filtered.map((product) => (
              <li key={product.id}>
                <button
                  type='button'
                  onClick={() => handleSelect(product.id)}
                  className='flex w-full items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-gray-50'
                >
                  <Image
                    src={product.images[0]}
                    alt=''
                    width={40}
                    height={40}
                    className='h-10 w-10 shrink-0 rounded object-cover'
                  />
                  <span className='min-w-0 flex-1'>
                    <span className='block truncate text-sm text-gray-800'>
                      {product.name}
                    </span>
                    <span className='block text-xs text-gray-400'>
                      ৳{getCurrentPrice(product).toLocaleString()}
                    </span>
                  </span>
                </button>
              </li>
            ))}
            {filtered.length === 0 && (
              <li className='px-3 py-4 text-center text-sm text-gray-400'>
                No products found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
