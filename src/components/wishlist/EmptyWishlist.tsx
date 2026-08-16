import Link from 'next/link';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';

export default function EmptyWishlist() {
  return (
    <div className='flex flex-col items-center justify-center py-20 text-center'>
      <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-red-50'>
        <FiHeart className='h-10 w-10 text-red-300' />
      </div>
      <h2 className='font-heading text-lg font-semibold text-gray-800'>
        Your wishlist is empty
      </h2>
      <p className='mt-1 max-w-sm text-sm text-gray-500'>
        Save your favourite products here and find them whenever you come back.
      </p>
      <Link
        href='/shop'
        className='mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
      >
        <FiShoppingBag className='h-4 w-4' />
        Browse Products
      </Link>
    </div>
  );
}
