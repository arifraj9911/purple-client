'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiTag } from 'react-icons/fi';
import { useCart } from '@/lib/cart-context';

const PAYMENT_METHODS = ['bKash', 'Visa', 'Mastercard', 'SSL Commerz'];

export default function CartSummary() {
  const { subtotal } = useCart();
  const [coupon, setCoupon] = useState('');

  return (
    <aside className='w-full shrink-0 lg:w-80 lg:sticky lg:top-32 lg:self-start'>
      <div className='rounded-xl border border-gray-200 bg-white p-5'>
        <h2 className='font-heading text-lg font-semibold text-gray-900'>
          Cart Summary
        </h2>

        {/* ── Coupon ── */}
        <div className='mt-4 flex gap-2'>
          <div className='relative flex-1'>
            <FiTag className='pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' />
            <input
              type='text'
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder='Coupon code'
              className='w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary'
            />
          </div>
          <button
            type='button'
            className='rounded-lg bg-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
          >
            Apply
          </button>
        </div>

        {/* ── Totals ── */}
        <div className='mt-5 space-y-2.5 text-sm'>
          <div className='flex items-center justify-between'>
            <span className='text-gray-500'>Subtotal</span>
            <span className='font-medium text-gray-900'>
              ৳{subtotal.toLocaleString()}
            </span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-500'>Discount</span>
            <span className='font-medium text-gray-900'>−৳0</span>
          </div>
          <div className='flex items-center justify-between'>
            <span className='text-gray-500'>Shipping</span>
            <span className='font-medium text-gray-900'>
              Calculated at checkout
            </span>
          </div>
          <div className='flex items-center justify-between border-t border-gray-200 pt-3 text-base'>
            <span className='font-semibold text-gray-900'>Total</span>
            <span className='font-bold text-primary'>
              ৳{subtotal.toLocaleString()}
            </span>
          </div>
        </div>

        {/* ── CTA ── */}
        <Link
          href='/checkout'
          className='mt-5 flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
        >
          Proceed to Checkout
        </Link>
        <Link
          href='/shop'
          className='mt-2 flex w-full items-center justify-center rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary'
        >
          Continue Shopping
        </Link>

        {/* ── Payment methods ── */}
        <div className='mt-5 border-t border-gray-100 pt-4'>
          <p className='mb-2 text-xs font-medium text-gray-400'>We Accept</p>
          <div className='flex flex-wrap gap-2'>
            {PAYMENT_METHODS.map((method) => (
              <span
                key={method}
                className='rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600'
              >
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
