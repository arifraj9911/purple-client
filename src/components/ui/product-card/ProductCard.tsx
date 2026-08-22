'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiShoppingCart, FiRepeat, FiEye, FiStar } from 'react-icons/fi';
import { type Product } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useCompare } from '@/lib/compare-context';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  const { addItem, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const inWishlist = isInWishlist(product.id);
  const inCompare = isInCompare(product.id);

  const outOfStock = product.stock === 0;
  const hasDiscount =
    product.discountPrice !== null && product.discountPrice < product.basePrice;
  const currentPrice = product.discountPrice ?? product.basePrice;
  const discountPercent = hasDiscount
    ? Math.round(
        ((product.basePrice - product.discountPrice!) / product.basePrice) *
          100,
      )
    : null;

  const cartPayload = {
    id: product.id,
    name: product.name,
    price: currentPrice,
    basePrice: hasDiscount ? product.basePrice : undefined,
    discountPrice: product.discountPrice ?? undefined,
    image: product.images[0],
    quantity: 1,
    slug: product.slug,
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (outOfStock) return;
    addItem(cartPayload);
    openDrawer();
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(product.id);
    } else {
      addToCompare(product.id);
    }
  };

  return (
    <div className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-300 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg'>
      {/* ── Image ── */}
      <Link href={`/products/${product.slug}`} className='relative block p-[4px]'>
        <div className='relative w-auto h-[150px] sm:h-[220px] overflow-hidden rounded-t-lg bg-gray-50 flex items-center justify-center'>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
            priority={priority}
            className='h-full w-auto transition-transform duration-500 group-hover:scale-105'
          />

          {/* Out of Stock overlay */}
          {outOfStock && (
            <div className='absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-white/70'>
              <span className='rounded-lg bg-gray-800 px-3 py-1 text-xs font-semibold text-white'>
                Out of Stock
              </span>
            </div>
          )}

          {/* Desktop Floating Action Bar (Wishlist, Compare, Quick View) — exactly matches provided design */}
          <div
            className='hidden sm:flex absolute bottom-2.5 left-1/2 z-20 -translate-x-1/2 items-center rounded-xl bg-white shadow-lg border border-gray-100/90 divide-x divide-gray-100 overflow-hidden translate-y-3 opacity-0 pointer-events-none group-hover:translate-y-0 group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 ease-out'
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {/* 1. Wishlist Button */}
            <button
              type='button'
              onClick={handleToggleWishlist}
              className={`flex h-9 w-9 items-center justify-center transition-colors duration-200 hover:bg-gray-50 active:scale-95 ${
                inWishlist
                  ? 'text-red-500'
                  : 'text-gray-700 hover:text-red-500'
              }`}
              aria-label={
                inWishlist ? 'Remove from wishlist' : 'Add to wishlist'
              }
              title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart
                className={`h-4 w-4 ${inWishlist ? 'fill-red-500' : ''}`}
              />
            </button>

            {/* 2. Compare Button (Repeat icon matching image) */}
            <button
              type='button'
              onClick={handleToggleCompare}
              className={`flex h-9 w-9 items-center justify-center transition-colors duration-200 hover:bg-gray-50 active:scale-95 ${
                inCompare
                  ? 'text-primary'
                  : 'text-gray-700 hover:text-primary'
              }`}
              aria-label={
                inCompare ? 'Remove from compare' : 'Add to compare'
              }
              title={inCompare ? 'Remove from compare' : 'Add to compare'}
            >
              <FiRepeat className='h-4 w-4' />
            </button>
          </div>

          {/* Mobile Compare Button (Top Right Corner of Image) */}
          <button
            type='button'
            onClick={handleToggleCompare}
            className={`absolute right-1.5 top-1.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-white/90 shadow-xs border border-gray-100/90 backdrop-blur-sm transition-all duration-200 active:scale-95 sm:hidden ${
              inCompare
                ? 'bg-primary-light text-primary'
                : 'text-gray-600 hover:bg-primary-light hover:text-primary'
            }`}
            aria-label={
              inCompare ? 'Remove from compare' : 'Add to compare'
            }
            title={inCompare ? 'Remove from compare' : 'Add to compare'}
          >
            <FiRepeat className='h-3 w-3' />
          </button>
        </div>

        {/* Discount Badge */}
        {discountPercent && discountPercent > 0 && (
          <span className='absolute left-2 top-2 z-20 rounded-full bg-sale-badge px-2 py-0.5 text-[11px] font-bold text-white shadow-sm'>
            -{discountPercent}%
          </span>
        )}
      </Link>

      {/* ── Info ── */}
      <div className='flex flex-1 flex-col px-2 pb-2.5 pt-1.5 sm:p-3'>
        {/* Category & Review Row */}
        <div className='mb-1 flex items-center justify-between gap-1.5'>
          <span className='text-[10px] font-medium text-gray-400 sm:text-xs truncate'>
            {product.category}
          </span>

          {/* Review (Single star with rating & count) */}
          <div className='flex items-center gap-0.5 sm:gap-1 shrink-0'>
            <FiStar className='h-3 w-3 sm:h-3.5 sm:w-3.5 fill-amber-400 text-amber-400' />
            <span className='text-[10px] font-semibold text-gray-700 sm:text-xs'>
              {product.rating > 0 ? product.rating.toFixed(1) : '5.0'}
            </span>
            <span className='text-[9px] text-gray-400 sm:text-[10px]'>
              ({product.reviewCount})
            </span>
          </div>
        </div>

        {/* Name */}
        <Link
          href={`/products/${product.slug}`}
          className='mb-1 md:mb-1.5 text-[13px] font-medium leading-snug text-gray-800 transition-colors hover:text-primary line-clamp-2 sm:text-[15px]'
        >
          {product.name}
        </Link>

        {/* Stock Quantity */}
        <div className='mb-2 flex items-center gap-1 text-xs sm:text-sm text-gray-400 font-medium'>
          <span>Stock:</span>
          <span className={`font-semibold ${outOfStock ? 'text-red-500' : 'text-green-600'}`}>
            {product.stock}
          </span>
        </div>

        {/* Price + Action Section:
            - Mobile (< sm): Heart icon on the left of Add to Cart button below the price
            - Desktop (>= sm): Add to Cart is aligned to the right of the price */}
        <div className='mt-auto flex flex-col gap-2 pt-2 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between'>
          {/* Price */}
          <div className='flex flex-col'>
            <div className='flex items-baseline gap-1.5'>
              <span className='text-sm font-bold text-gray-900 sm:text-base'>
                ৳{currentPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className='text-[10px] text-gray-400 line-through sm:text-xs'>
                  ৳{product.basePrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Action Row: On mobile Heart is to the left of Add to Cart; on desktop Add to Cart is aligned right */}
          <div className='flex items-center gap-1.5'>
            {/* Heart (Wishlist) Button — Mobile Only */}
            <button
              type='button'
              onClick={handleToggleWishlist}
              className={`flex h-7 w-7 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-200 active:scale-95 sm:hidden ${
                inWishlist
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-gray-300 bg-white text-gray-600 hover:border-red-200 hover:bg-red-50 hover:text-red-500'
              }`}
              aria-label={
                inWishlist ? 'Remove from wishlist' : 'Add to wishlist'
              }
              title={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <FiHeart
                className={`h-3.5 w-3.5 md:h-4 md:w-4 ${inWishlist ? 'fill-red-500' : ''}`}
              />
            </button>

            {/* Add to Cart Button */}
            <button
              type='button'
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`flex flex-1 sm:flex-initial sm:w-auto items-center justify-center gap-1.5 rounded-full px-4 py-1.5 md:py-2 text-xs font-semibold shadow-xs transition-all duration-200 active:scale-95 ${
                outOfStock
                  ? 'cursor-not-allowed bg-gray-100 text-gray-400'
                  : 'bg-primary text-white hover:bg-primary-dark hover:shadow-md'
              }`}
              aria-label='Add to cart'
              title='Add to cart'
            >
              <FiShoppingCart className='h-3.5 w-3.5 hidden md:flex' />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


