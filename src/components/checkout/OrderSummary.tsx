'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiCheck, FiChevronLeft } from 'react-icons/fi';
import type { CartItem } from '@/lib/cart-context';

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  onPlaceOrder: () => void;
}

export default function OrderSummary({
  items,
  subtotal,
  shipping,
  total,
  onPlaceOrder,
}: OrderSummaryProps) {
  return (
    <aside className='w-full shrink-0 lg:w-96 lg:sticky lg:top-28 lg:self-start'>
      <div className='rounded-xl border border-gray-200 bg-white p-5'>
        <h2 className='font-heading text-lg font-semibold text-gray-900'>
          Order Summary
        </h2>

        {/* ── Items (with product images) ── */}
        <ul className='mt-4 space-y-3'>
          {items.map((item) => {
            const unitPrice = item.discountPrice ?? item.price;
            return (
              <li key={item.id} className='flex items-center gap-3'>
                <div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-gray-100'>
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className='object-cover'
                    sizes='56px'
                  />
                </div>
                <div className='min-w-0 flex-1'>
                  <p className='truncate text-sm font-medium text-gray-800'>
                    {item.name}
                  </p>
                  <p className='mt-0.5 text-xs text-gray-500'>
                    {item.quantity} × ৳{unitPrice.toLocaleString()}
                  </p>
                </div>
                <span className='shrink-0 text-sm font-semibold text-gray-900'>
                  ৳{(unitPrice * item.quantity).toLocaleString()}
                </span>
              </li>
            );
          })}
        </ul>

        {/* ── Totals ── */}
        <div className='mt-5 space-y-2.5 border-t border-gray-100 pt-4 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-500'>Subtotal</span>
            <span className='font-medium text-gray-900'>
              ৳{subtotal.toLocaleString()}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-500'>Shipping</span>
            <span className='font-medium text-gray-900'>
              ৳{shipping.toLocaleString()}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-500'>Discount</span>
            <span className='font-medium text-gray-900'>−৳0</span>
          </div>
          <div className='flex items-center justify-between border-t border-gray-100 pt-3 text-base'>
            <span className='font-semibold text-gray-900'>Total</span>
            <span className='font-bold text-primary'>
              ৳{total.toLocaleString()}
            </span>
          </div>
        </div>

        {/* ── Buttons (stay inside the summary) ── */}
        <button
          onClick={onPlaceOrder}
          className='mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
        >
          <FiCheck className='h-4 w-4' />
          Place Order
        </button>
        <Link
          href='/cart'
          className='mt-2 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary'
        >
          <FiChevronLeft className='h-4 w-4' />
          Back to Cart
        </Link>
      </div>
    </aside>
  );
}
