'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { FiShoppingCart, FiStar, FiX } from 'react-icons/fi';
import { getCurrentPrice, type Product } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { MAX_COMPARE, useCompare } from '@/lib/compare-context';
import AddProductSearch from './AddProductSearch';

interface CompareTableProps {
  products: Product[];
}

/** True when a row's values are not all identical (used to highlight them). */
const differs = (values: (string | number | boolean)[]) =>
  new Set(values.map(String)).size > 1;

/** Highlight differing values with a subtle primary tint. */
const valueCellClass = (isDifferent: boolean) =>
  `px-3 py-3 text-sm text-gray-800 ${isDifferent ? 'bg-primary-light/30' : ''}`;

export default function CompareTable({ products }: CompareTableProps) {
  const { removeFromCompare } = useCompare();
  const { addItem, openDrawer } = useCart();

  /* Always render MAX_COMPARE columns — empty ones show the "Add" search. */
  const slots: (Product | undefined)[] = Array.from(
    { length: MAX_COMPARE },
    (_, index) => products[index],
  );

  const handleAddToCart = (product: Product) => {
    const hasDiscount =
      product.discountPrice !== null &&
      product.discountPrice < product.basePrice;
    addItem({
      id: product.id,
      name: product.name,
      price: getCurrentPrice(product),
      basePrice: hasDiscount ? product.basePrice : undefined,
      discountPrice: product.discountPrice ?? undefined,
      image: product.images[0],
      quantity: 1,
      slug: product.slug,
    });
    openDrawer();
  };

  const priceDiffers = differs(products.map(getCurrentPrice));
  const brandDiffers = differs(products.map((p) => p.brand));
  const ratingDiffers = differs(products.map((p) => p.rating));
  const availabilityDiffers = differs(products.map((p) => p.stock > 0));
  const categoryDiffers = differs(products.map((p) => p.category));
  const stockDiffers = differs(products.map((p) => p.stock));

  return (
    <div className='overflow-x-auto rounded-xl border border-gray-200 bg-white'>
      <table className='w-full min-w-180 border-collapse'>
        {/* ── Product header row ── */}
        <thead>
          <tr className='border-b border-gray-200'>
            <th className='sticky left-0 z-20 w-28 bg-white p-3 text-left align-bottom text-xs font-semibold uppercase tracking-wide text-gray-400 sm:w-32'>
              Product
            </th>
            {slots.map((product, index) => (
              <th
                key={product ? product.id : `empty-${index}`}
                className='min-w-55 p-3 align-top'
              >
                {product ? (
                  <div className='group relative'>
                    <button
                      type='button'
                      onClick={() => removeFromCompare(product.id)}
                      aria-label={`Remove ${product.name} from compare`}
                      className='absolute -right-1.5 -top-1.5 z-20 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-xs transition-all hover:border-red-200 hover:bg-red-50 hover:text-red-500 active:scale-90'
                    >
                      <FiX className='h-3.5 w-3.5' />
                    </button>
                    <Link href={`/products/${product.slug}`} className='block'>
                      <div className='relative mb-2 h-[180px] sm:h-[260px] w-full overflow-hidden rounded-lg bg-gray-50 flex items-center justify-center'>
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes='(max-width: 640px) 50vw, 25vw'
                          className='h-full w-auto transition-transform duration-500 group-hover:scale-105'
                        />
                      </div>
                      <span className='block text-sm font-semibold leading-snug text-gray-900 line-clamp-2 transition-colors group-hover:text-primary'>
                        {product.name}
                      </span>
                    </Link>
                  </div>
                ) : (
                  <AddProductSearch />
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Attribute rows ── */}
        <tbody>
          <Row label='Price'>
            {slots.map((product, index) => (
              <td key={index} className={valueCellClass(priceDiffers)}>
                {product ? <PriceCell product={product} /> : <Dash />}
              </td>
            ))}
          </Row>

          <Row label='Brand'>
            {slots.map((product, index) => (
              <td key={index} className={valueCellClass(brandDiffers)}>
                {product ? product.brand : <Dash />}
              </td>
            ))}
          </Row>

          <Row label='Rating'>
            {slots.map((product, index) => (
              <td key={index} className={valueCellClass(ratingDiffers)}>
                {product ? <RatingCell product={product} /> : <Dash />}
              </td>
            ))}
          </Row>

          <Row label='Availability'>
            {slots.map((product, index) => (
              <td key={index} className={valueCellClass(availabilityDiffers)}>
                {product ? <AvailabilityCell product={product} /> : <Dash />}
              </td>
            ))}
          </Row>

          <Row label='Category'>
            {slots.map((product, index) => (
              <td key={index} className={valueCellClass(categoryDiffers)}>
                {product ? product.category : <Dash />}
              </td>
            ))}
          </Row>

          <Row label='Stock'>
            {slots.map((product, index) => (
              <td key={index} className={valueCellClass(stockDiffers)}>
                {product ? `${product.stock} units` : <Dash />}
              </td>
            ))}
          </Row>

          {/* ── Actions row ── */}
          <tr>
            <th className='sticky left-0 z-20 bg-white px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500'>
              Actions
            </th>
            {slots.map((product, index) => (
              <td key={index} className='px-3 py-3'>
                {product ? (
                  <button
                    type='button'
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock === 0}
                    className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400'
                  >
                    <FiShoppingCart className='h-4 w-4' />
                    Add to Cart
                  </button>
                ) : null}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}

/* ─── Row + cell helpers ─── */

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <tr className='border-b border-gray-100'>
      <th className='sticky left-0 z-20 bg-white px-3 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500'>
        {label}
      </th>
      {children}
    </tr>
  );
}

function Dash() {
  return <span className='text-gray-300'>—</span>;
}

function PriceCell({ product }: { product: Product }) {
  const current = getCurrentPrice(product);
  const hasDiscount =
    product.discountPrice !== null && product.discountPrice < product.basePrice;

  return (
    <span className='flex flex-wrap items-baseline gap-1.5'>
      <span className='text-base font-semibold text-gray-900'>
        ৳{current.toLocaleString()}
      </span>
      {hasDiscount && (
        <span className='text-xs text-gray-400 line-through'>
          ৳{product.basePrice.toLocaleString()}
        </span>
      )}
    </span>
  );
}

function RatingCell({ product }: { product: Product }) {
  return (
    <span className='flex items-center gap-1.5'>
      <span className='flex items-center gap-0.5'>
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`h-3.5 w-3.5 ${
              star <= Math.round(product.rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-200'
            }`}
          />
        ))}
      </span>
      <span className='text-xs text-gray-400'>({product.reviewCount})</span>
    </span>
  );
}

function AvailabilityCell({ product }: { product: Product }) {
  const inStock = product.stock > 0;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
        inStock ? 'bg-accent/10 text-accent' : 'bg-gray-100 text-gray-500'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          inStock ? 'bg-accent' : 'bg-gray-400'
        }`}
      />
      {inStock ? 'In Stock' : 'Out of Stock'}
    </span>
  );
}
