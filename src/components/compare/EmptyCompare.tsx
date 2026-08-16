import Link from 'next/link';
import { FiColumns } from 'react-icons/fi';

export default function EmptyCompare() {
  return (
    <div className='flex flex-col items-center justify-center py-20 text-center'>
      <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light'>
        <FiColumns className='h-8 w-8 text-primary' />
      </div>
      <h2 className='font-heading text-lg font-semibold text-gray-900'>
        Nothing to compare yet
      </h2>
      <p className='mt-2 max-w-md text-sm text-gray-500'>
        Add up to 3 products to compare their price, brand, rating and more side
        by side.
      </p>
      <Link
        href='/shop'
        className='mt-6 inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
      >
        Browse Products
      </Link>
    </div>
  );
}
