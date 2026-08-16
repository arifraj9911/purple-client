'use client';

import { useEffect, useMemo, useState } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { ProductCard } from '@/components/ui/product-card';
import { useWishlist } from '@/lib/wishlist-context';
import { products, type Product } from '@/data/products';
import EmptyWishlist from './EmptyWishlist';

const ITEMS_PER_PAGE = 20;

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlist();
  const [currentPage, setCurrentPage] = useState(1);

  /* Reset to page 1 whenever the wishlist changes. Adjusting state based on a
     previous render (instead of an effect) is the React-recommended approach
     and avoids cascading renders. */
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setCurrentPage(1);
  }

  /* Map stored ids → Product objects, preserving wishlist insertion order. */
  const wishlistProducts = useMemo(
    () =>
      items
        .map((id) => products.find((p) => p.id === id))
        .filter((p): p is Product => p !== undefined),
    [items],
  );

  /* Scroll to top on page change. */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const totalPages = Math.ceil(wishlistProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = wishlistProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-2'>
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Wishlist' }]}
        />
      </div>

      <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-2 pb-12'>
        {wishlistProducts.length === 0 ? (
          <EmptyWishlist />
        ) : (
          <>
            {/* ── Heading ── */}
            <div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
              <h1 className='flex items-center gap-2 font-heading text-xl font-bold text-gray-900 sm:text-2xl'>
                My Wishlist
                <span className='text-base font-medium text-gray-400'>
                  ({items.length} {items.length === 1 ? 'item' : 'items'})
                </span>
              </h1>

              <button
                onClick={clearWishlist}
                className='text-sm font-medium text-red-500 transition-colors hover:text-red-600 hover:underline'
              >
                Clear All
              </button>
            </div>

            {/* ── Grid ── */}
            <div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 2xl:grid-cols-4'>
              {paginatedProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  priority={index === 0}
                />
              ))}
            </div>

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className='mt-8'>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
