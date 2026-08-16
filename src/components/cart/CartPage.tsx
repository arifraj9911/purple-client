'use client';

import Link from 'next/link';
import { FiShoppingBag } from 'react-icons/fi';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCart } from '@/lib/cart-context';
import CartItemRow from './CartItemRow';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';

export default function CartPage() {
  const { items, totalItems } = useCart();

  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-2'>
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Cart' }]} />
      </div>

      <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-2 pb-12'>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            {/* ── Heading ── */}
            <h1 className='mb-6 flex flex-wrap items-center gap-2 font-heading text-xl font-bold text-gray-900 sm:text-2xl'>
              <FiShoppingBag className='h-6 w-6 text-primary' />
              Shopping Cart
              <span className='text-base font-medium text-gray-400'>
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            </h1>

            <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6'>
              {/* ── LEFT: Items ── */}
              <div className='min-w-0 flex-1'>
                <div className='overflow-hidden rounded-xl border border-gray-200 bg-white'>
                  {/* Column headers (desktop) */}
                  <div className='hidden grid-cols-12 gap-3 border-b border-gray-100 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-400 sm:grid'>
                    <span className='col-span-6'>Product</span>
                    <span className='col-span-2 text-center'>Price</span>
                    <span className='col-span-2 text-center'>Quantity</span>
                    <span className='col-span-2 text-right'>Total</span>
                  </div>

                  <ul className='divide-y divide-gray-100'>
                    {items.map((item) => (
                      <CartItemRow key={item.id} item={item} />
                    ))}
                  </ul>
                </div>

                <div className='mt-4'>
                  <Link
                    href='/shop'
                    className='inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-primary-dark'
                  >
                    ← Continue Shopping
                  </Link>
                </div>
              </div>

              {/* ── RIGHT: Summary ── */}
              <CartSummary />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
