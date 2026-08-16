'use client';

import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { type Product } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';

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
  const inWishlist = isInWishlist(product.id);

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
    if (outOfStock) return;
    addItem(cartPayload);
    openDrawer();
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addItem(cartPayload);
    // Opens the cart drawer so the user can complete checkout.
    // TODO: navigate to /checkout once that page exists.
    openDrawer();
  };

  return (
    <div className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg'>
      {/* ── Image ── */}
      <Link href={`/product/${product.slug}`} className='relative block'>
        <div className='relative aspect-4/3 overflow-hidden rounded-t-lg bg-gray-100'>
          {/* Blurred background image — fills gaps when object-contain leaves space */}
          <Image
            src={product.images[0]}
            alt=''
            width={600}
            height={600}
            className='absolute inset-0 h-full w-full scale-110 object-cover blur-xl saturate-150'
            aria-hidden='true'
          />
          <Image
            src={product.images[0]}
            alt={product.name}
            width={600}
            height={600}
            priority={priority}
            className='relative z-10 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105'
          />

          {/* Out of Stock overlay */}
          {outOfStock && (
            <div className='absolute inset-0 z-20 flex items-center justify-center rounded-lg bg-white/70'>
              <span className='rounded-lg bg-gray-800 px-3 py-1 text-xs font-semibold text-white'>
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Discount Badge */}
        {discountPercent && discountPercent > 0 && (
          <span className='absolute left-2.5 top-2.5 z-20 rounded-full bg-sale-badge px-2 py-0.5 text-[11px] font-bold text-white shadow-sm'>
            -{discountPercent}%
          </span>
        )}

        {/* Wishlist (small screens — overlays image top-right) */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className={`absolute right-2.5 top-2.5 z-20 flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-red-500 sm:hidden ${
            inWishlist ? 'text-red-500' : 'text-gray-500'
          }`}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <FiHeart className={`h-3 w-3 ${inWishlist ? 'fill-red-500' : ''}`} />
        </button>
      </Link>

      {/* ── Info (compact) ── */}
      <div className='flex flex-1 flex-col px-2.5 pb-2.5 sm:px-3 sm:pb-3 mt-2'>
        {/* Category */}
        <span className='mb-1 text-[10px] font-medium text-gray-400 sm:text-xs'>
          {product.category}
        </span>

        {/* Name */}
        <Link
          href={`/product/${product.slug}`}
          className='mb-4 text-[13px] font-medium leading-snug text-gray-800 transition-colors hover:text-primary line-clamp-2 sm:text-[15px]'
        >
          {product.name}
        </Link>

        {/* Rating */}
        {/* <div className='mb-1.5 flex items-center gap-1'>
          <div className='flex items-center gap-0.5'>
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`h-2.5 w-2.5 sm:h-3 sm:w-3 ${
                  star <= Math.round(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className='text-[10px] text-gray-400 sm:text-[11px]'>
            ({product.reviewCount})
          </span>
        </div> */}

        {/* Price + Actions */}
        <div className='mt-auto'>
          <div className='flex items-baseline gap-1.5'>
            <span className='text-base font-semibold text-gray-900 sm:text-xl'>
              ৳{currentPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className='text-[10px] text-gray-400 line-through sm:text-xs'>
                ৳{product.basePrice.toLocaleString()}
              </span>
            )}
          </div>

          <div className='mt-3 flex items-center gap-1 sm:mt-4 sm:gap-1.5'>
            {/* Wishlist Button (large screens only) */}
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.id);
              }}
              className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 sm:flex sm:h-10 sm:w-10 ${
                inWishlist
                  ? 'border-red-200 bg-red-50 text-red-500'
                  : 'border-gray-200 text-gray-400 hover:border-red-200 hover:bg-red-50 hover:text-red-500'
              }`}
              aria-label={
                inWishlist ? 'Remove from wishlist' : 'Add to wishlist'
              }
            >
              <FiHeart
                className={`h-3 w-3 sm:h-4 sm:w-4 ${inWishlist ? 'fill-red-500' : ''}`}
              />
            </button>

            {/* Add to Cart icon */}
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 sm:h-10 sm:w-10 ${
                outOfStock
                  ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                  : 'bg-primary-light text-primary hover:bg-primary hover:text-white'
              }`}
              aria-label='Add to cart'
            >
              <FiShoppingCart className='h-3 w-3 sm:h-4 sm:w-4' />
            </button>

            {/* Buy Now */}
            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className={`flex h-8 flex-1 items-center justify-center rounded-lg  font-semibold transition-all duration-200 sm:h-10 text-xs sm:text-sm ${
                outOfStock
                  ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                  : 'bg-primary text-white hover:bg-primary-dark'
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
