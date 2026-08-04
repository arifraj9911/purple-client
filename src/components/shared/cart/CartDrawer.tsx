'use client';

import { useState, useCallback } from 'react';
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

  // Track per-item local editing values so the user can clear & retype
  const [editQtys, setEditQtys] = useState<Record<string | number, string>>({});

  const commitQty = useCallback(
    (id: string | number, raw: string) => {
      const num = parseInt(raw, 10);
      if (isNaN(num) || num <= 0) {
        updateQuantity(id, 1);
      } else {
        updateQuantity(id, num);
      }
      // Clear local editing state after commit
      setEditQtys((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    },
    [updateQuantity],
  );

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
        <div className='flex-1 overflow-y-auto px-4 py-3'>
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
                <li key={item.id} className='flex gap-3 py-3'>
                  {/* Product Image */}
                  <div className='relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100'>
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className='object-cover'
                      sizes='64px'
                    />
                  </div>

                  {/* Product Info */}
                  <div className='flex flex-1 flex-col justify-between min-w-0'>
                    {/* Name + Remove */}
                    <div className='flex items-start justify-between gap-2'>
                      <Link
                        href={`/product/${item.slug}`}
                        onClick={closeDrawer}
                        className='text-xs font-medium text-gray-800 transition-colors hover:text-primary line-clamp-2 leading-snug'
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => removeItem(item.id)}
                        className='shrink-0 flex h-5 w-5 items-center justify-center rounded-full text-gray-300 transition-colors hover:bg-red-50 hover:text-red-500'
                        aria-label={`Remove ${item.name}`}
                      >
                        <FiX className='h-3.5 w-3.5' />
                      </button>
                    </div>

                    {/* Price + Qty Row */}
                    <div className='flex items-center justify-between mt-1'>
                      {/* Price area */}
                      <div className='flex items-baseline gap-2'>
                        <span className='text-sm font-bold text-gray-900'>
                          ৳{(item.discountPrice ?? item.price).toLocaleString()}
                        </span>
                        {item.basePrice &&
                          item.basePrice >
                            (item.discountPrice ?? item.price) && (
                            <span className='text-xs text-gray-400 line-through'>
                              ৳{item.basePrice.toLocaleString()}
                            </span>
                          )}
                      </div>

                      {/* Quantity Controls */}
                      <div className='flex items-center gap-0.5 rounded-md border border-gray-200 p-0.5'>
                        <button
                          onClick={() => {
                            const newQty = item.quantity - 1;
                            updateQuantity(item.id, newQty);
                            setEditQtys((prev) => {
                              const next = { ...prev };
                              delete next[item.id];
                              return next;
                            });
                          }}
                          className='flex h-6 w-6 items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-100 hover:text-primary'
                          aria-label='Decrease quantity'
                        >
                          <FiMinus className='h-2.5 w-2.5' />
                        </button>
                        <input
                          type='text'
                          inputMode='numeric'
                          value={editQtys[item.id] ?? String(item.quantity)}
                          onChange={(e) => {
                            const raw = e.target.value;
                            // Block negative sign
                            if (raw.includes('-')) return;
                            // Allow empty for clearing & retyping
                            if (raw === '') {
                              setEditQtys((prev) => ({
                                ...prev,
                                [item.id]: '',
                              }));
                              return;
                            }
                            // Only allow digits
                            if (/^\d+$/.test(raw)) {
                              setEditQtys((prev) => ({
                                ...prev,
                                [item.id]: raw,
                              }));
                            }
                          }}
                          onBlur={(e) => {
                            commitQty(item.id, e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              commitQty(
                                item.id,
                                editQtys[item.id] ?? String(item.quantity),
                              );
                              (e.target as HTMLInputElement).blur();
                            }
                          }}
                          className='h-6 w-7 bg-transparent text-center text-xs font-semibold text-gray-900 outline-none'
                          aria-label='Quantity'
                        />
                        <button
                          onClick={() => {
                            const newQty = item.quantity + 1;
                            updateQuantity(item.id, newQty);
                            setEditQtys((prev) => {
                              const next = { ...prev };
                              delete next[item.id];
                              return next;
                            });
                          }}
                          className='flex h-6 w-6 items-center justify-center rounded text-gray-400 transition-colors hover:bg-gray-100 hover:text-primary'
                          aria-label='Increase quantity'
                        >
                          <FiPlus className='h-2.5 w-2.5' />
                        </button>
                      </div>
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
