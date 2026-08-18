import Link from 'next/link';
import { products } from '@/data/products';
import { ProductCard } from '@/components/ui/product-card';

export default function AllProducts() {
  return (
    <section className='bg-white py-12 sm:py-16 lg:py-20'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        {/* ── Header ── */}
        <div className='mb-4 md:mb-8 flex items-end justify-between'>
          <div>
            <span className='inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary'>
              🛍️ Our Collection
            </span>
            <h2 className='mt-1 md:mt-2.5 font-heading text-2xl font-bold text-gray-900 sm:text-3xl'>
              All Products
            </h2>
          </div>
          <Link
            href='/products'
            className='hidden shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark sm:flex'
          >
            View All
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>

        {/* ── Grid ── */}
        <div className='grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 md:gap-6 xl:grid-cols-4 2xl:grid-cols-4'>
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className='mt-6 text-center sm:hidden'>
          <Link
            href='/products'
            className='inline-flex items-center gap-1 text-sm font-medium text-primary'
          >
            View All Products
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-4 w-4'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M9 5l7 7-7 7'
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
