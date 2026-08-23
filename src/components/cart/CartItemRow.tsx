'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart, type CartItem } from '@/lib/cart-context';

interface CartItemRowProps {
  item: CartItem;
}

export default function CartItemRow({ item }: CartItemRowProps) {
  const { removeItem, updateQuantity } = useCart();
  const [editQty, setEditQty] = useState<string | null>(null);
  const [priceChange, setPriceChange] = useState<'up' | 'down' | null>(null);

  const unitPrice = item.discountPrice ?? item.price;
  const lineTotal = unitPrice * item.quantity;

  /* Clear the price-change indicator shortly after it appears. */
  useEffect(() => {
    if (priceChange === null) return;
    const timer = setTimeout(() => setPriceChange(null), 800);
    return () => clearTimeout(timer);
  }, [priceChange]);

  const changeQuantity = (delta: number) => {
    updateQuantity(item.id, item.quantity + delta);
    setEditQty(null);
    setPriceChange(delta > 0 ? 'up' : 'down');
  };

  const commitQty = (raw: string) => {
    const num = parseInt(raw, 10);
    updateQuantity(item.id, isNaN(num) || num <= 0 ? 1 : num);
    setEditQty(null);
  };

  return (
    <li className='grid grid-cols-12 items-center gap-x-3 gap-y-3 px-4 py-4 sm:px-5'>
      {/* ── Product (full width on mobile, 6 cols on desktop) ── */}
      <div className='col-span-12 flex items-center gap-3 sm:col-span-6'>
        <Link
          href={`/products/${item.slug}`}
          className='relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-100'
        >
          <Image
            src={item.image}
            alt={item.name}
            fill
            className='object-cover'
            sizes='80px'
          />
        </Link>
        <div className='min-w-0 flex-1'>
          <Link
            href={`/products/${item.slug}`}
            className='line-clamp-2 text-sm font-medium leading-snug text-gray-800 transition-colors hover:text-primary'
          >
            {item.name}
          </Link>
          <button
            onClick={() => removeItem(item.id)}
            className='mt-1 flex items-center gap-1 text-xs text-gray-400 transition-colors hover:text-red-500'
            aria-label={`Remove ${item.name}`}
          >
            <FiTrash2 className='h-3.5 w-3.5' />
            Remove
          </button>
        </div>
      </div>

      {/* ── Price ── */}
      <div className='col-span-4 sm:col-span-2 sm:text-center'>
        <div className='flex flex-col sm:items-center'>
          <span className='text-sm font-semibold text-gray-900'>
            ৳{unitPrice.toLocaleString()}
          </span>
          {item.basePrice && item.basePrice > unitPrice && (
            <span className='text-xs text-gray-400 line-through'>
              ৳{item.basePrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>

      {/* ── Quantity ── */}
      <div className='col-span-4 sm:col-span-2 sm:flex sm:justify-center'>
        <div className='inline-flex items-center rounded-lg border border-gray-300'>
          <button
            onClick={() => changeQuantity(-1)}
            className='flex h-9 w-9 items-center justify-center text-gray-400 transition-colors hover:bg-gray-100 hover:text-primary'
            aria-label='Decrease quantity'
          >
            <FiMinus className='h-3.5 w-3.5' />
          </button>
          <input
            type='text'
            inputMode='numeric'
            value={editQty ?? String(item.quantity)}
            onChange={(e) => {
              const raw = e.target.value;
              if (raw === '') {
                setEditQty('');
                return;
              }
              if (/^\d+$/.test(raw)) {
                setEditQty(raw);
              }
            }}
            onBlur={(e) => commitQty(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                commitQty(e.currentTarget.value);
                e.currentTarget.blur();
              }
            }}
            className='h-9 w-10 bg-transparent text-center text-sm font-semibold text-gray-900 outline-none'
            aria-label='Quantity'
          />
          <button
            onClick={() => changeQuantity(1)}
            className='flex h-9 w-9 items-center justify-center text-gray-400 transition-colors hover:bg-gray-100 hover:text-primary'
            aria-label='Increase quantity'
          >
            <FiPlus className='h-3.5 w-3.5' />
          </button>
        </div>
      </div>

      {/* ── Line total ── */}
      <div className='col-span-4 text-right sm:col-span-2'>
        <span className='text-sm font-bold text-primary'>
          ৳{lineTotal.toLocaleString()}
          {priceChange && (
            <span
              className={`ml-1 text-xs font-semibold ${
                priceChange === 'up' ? 'text-accent' : 'text-red-500'
              }`}
            >
              {priceChange === 'up' ? '▲' : '▼'}
            </span>
          )}
        </span>
      </div>
    </li>
  );
}
