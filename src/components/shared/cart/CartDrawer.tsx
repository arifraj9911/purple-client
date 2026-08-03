'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiX, FiShoppingBag, FiMinus, FiPlus } from 'react-icons/fi';
import { useCart } from '@/lib/cart-context';

export default function CartDrawer() {
  const {
    items,
    totalItems,
    subtotal,
    isDrawerOpen,
    closeDrawer,
    removeItem,
    updateQuantity,
  } = useCart();

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity duration-300 ${
          isDrawerOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeDrawer}
        aria-hidden='true'
      />

      {/* Drawer panel */}
      <div
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${
          isDrawerOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role='dialog'
        aria-modal='true'
        aria-label='Shopping cart'
      >
        {/* ── Header ── */}
        <div className='flex items-center justify-between border-b border-gray-200 px-5 py-4'>
          <div className='flex items-center gap-2'>
            <FiShoppingBag className='h-5 w-5 text-primary' />
            <h2 className='text-lg font-heading font-semibold text-gray-900'>
              Shopping Cart
            </h2>
            <span className='rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500'>
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeDrawer}
            className='rounded-lg p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700'
            aria-label='Close cart'
          >
            <FiX className='h-5 w-5' />
          </button>
        </div>

        {/* ── Body: Cart Items ── */}
        <div className='flex-1 overflow-y-auto px-5 py-4'>
          {items.length === 0 ? (
            /* Empty State */
            <div className='flex flex-col items-center justify-center pt-16 text-center'>
              <div className='mb-4 rounded-full bg-gray-100 p-5'>
                <FiShoppingBag className='h-10 w-10 text-gray-300' />
              </div>
              <p className='mb-1 text-base font-medium text-gray-900'>
                Your cart is empty
              </p>
              <p className='mb-6 text-sm text-gray-500'>
                Looks like you haven&apos;t added anything yet.
              </p>
              <Link
                href='/shop'
                onClick={closeDrawer}
                className='rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark'
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <ul className='divide-y divide-gray-100'>
              {items.map((item) => (
                <li key={item.id} className='flex gap-4 py-5'>
                  {/* Product Image */}
                  <div className='relative h-22 w-22 shrink-0 overflow-hidden rounded-xl bg-gray-100'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='object-cover'
                      sizes='88px'
                    />
                  </div>

                  {/* Product Info */}
                  <div className='flex flex-1 flex-col justify-between'>
                    {/* Name + Remove */}
                    <div className='flex items-start justify-between gap-2'>
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeDrawer}
                        className='text-sm font-medium text-gray-900 transition-colors hover:text-primary line-clamp-2 leading-snug'
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className='shrink-0 -mr-1 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500'
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiX className='h-4 w-4' />
                      </button>
                    </div>

                    {/* Price */}
                    <p className='text-sm font-bold text-gray-900'>
                      ৳{item.price.toLocaleString()}
                    </p>

                    {/* Quantity Controls */}
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-1 rounded-lg border border-gray-200 p-0.5'>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className='flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary'
                          aria-label='Decrease quantity'
                        >
                          <FiMinus className='h-3 w-3' />
                        </button>
                        <span className='flex h-7 w-8 items-center justify-center text-center text-sm font-semibold text-gray-900'>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className='flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-primary'
                          aria-label='Increase quantity'
                        >
                          <FiPlus className='h-3 w-3' />
                        </button>
                      </div>

                      {/* Line total */}
                      <span className='text-sm font-semibold text-primary'>
                        ৳{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* ── Footer: Subtotal + Buttons ── */}
        {items.length > 0 && (
          <div className='border-t border-gray-200 px-5 py-4'>
            {/* Subtotal */}
            <div className='mb-4 flex items-center justify-between'>
              <span className='text-base font-medium text-gray-900'>
                Subtotal
              </span>
              <span className='text-lg font-bold text-primary'>
                ৳{subtotal.toLocaleString()}
              </span>
            </div>

            {/* Action Buttons */}
            <div className='flex flex-col gap-2 lg:flex-row lg:items-center'>
              <Link
                href='/checkout'
                onClick={closeDrawer}
                className='flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark lg:flex-1'
              >
                Proceed to Checkout
              </Link>
              <Link
                href='/cart'
                onClick={closeDrawer}
                className='flex w-full items-center justify-center rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:border-primary hover:text-primary lg:flex-1'
              >
                View Cart
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
