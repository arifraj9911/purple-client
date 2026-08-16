import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';

export default function EmptyCart() {
  return (
    <div className='flex flex-col items-center justify-center py-20 text-center'>
      <div className='mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100'>
        <FiShoppingBag className='h-10 w-10 text-gray-300' />
      </div>
      <h2 className='font-heading text-lg font-semibold text-gray-800'>
        Your cart is empty
      </h2>
      <p className='mt-1 max-w-sm text-sm text-gray-500'>
        Looks like you haven&apos;t added anything to your cart yet.
      </p>
      <Link
        href='/shop'
        className='mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
      >
        <FiShoppingBag className='h-4 w-4' />
        Start Shopping
      </Link>
    </div>
  );
}
