'use client';

import { useEffect, useState } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { ProductCard } from '@/components/ui/product-card';
import { products } from '@/data/products';

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);
  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  /* Scroll to top on page change */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 pt-6 md:px-6 lg:px-8'>
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'All Products' }]}
        />
      </div>

      <div className='container mx-auto px-4 py-6 pb-12 md:px-6 lg:px-8'>
        <div className='grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6 xl:grid-cols-4'>
          {paginatedProducts.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              priority={index === 0 && currentPage === 1}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className='mt-10'>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}
