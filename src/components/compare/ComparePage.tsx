'use client';

import { useMemo } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCompare } from '@/lib/compare-context';
import { products, type Product } from '@/data/products';
import EmptyCompare from './EmptyCompare';
import CompareTable from './CompareTable';

export default function ComparePage() {
  const { items, maxItems, clearCompare } = useCompare();

  /* Map stored ids → Product objects, preserving compare insertion order. */
  const comparedProducts = useMemo(
    () =>
      items
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined),
    [items],
  );

  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 pt-6 md:px-6 lg:px-8'>
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Compare' }]}
        />
      </div>

      <div className='container mx-auto px-4 py-2 pb-12 md:px-6 lg:px-8'>
        {comparedProducts.length === 0 ? (
          <EmptyCompare />
        ) : (
          <>
            {/* ── Heading ── */}
            <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
              <h1 className='flex items-center gap-2 font-heading text-xl font-bold text-gray-900 sm:text-2xl'>
                Compare Products
                <span className='text-base font-medium text-gray-400'>
                  ({comparedProducts.length} of {maxItems})
                </span>
              </h1>

              <button
                onClick={clearCompare}
                className='text-sm font-medium text-red-500 transition-colors hover:text-red-600 hover:underline'
              >
                Clear All
              </button>
            </div>

            <CompareTable products={comparedProducts} />
          </>
        )}
      </div>
    </div>
  );
}
