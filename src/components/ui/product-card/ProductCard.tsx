'use client';

import Link from 'next/link';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { type Product } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import ProductImage from '../ProductImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem, openDrawer } = useCart();

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

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (outOfStock) return;
    addItem({
      id: product.id,
      name: product.name,
      price: currentPrice,
      basePrice: hasDiscount ? product.basePrice : undefined,
      discountPrice: product.discountPrice ?? undefined,
      image: product.images[0],
      quantity: 1,
      slug: product.slug,
    });
    openDrawer();
  };

  return (
    <div className='group relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-gray-200 hover:shadow-lg'>
      {/* ── Image ── */}
      <Link href={`/product/${product.slug}`} className='relative block'>
        {/* Padding wrapper — creates real visual spacing since absolute-positioned image ignores parent padding */}
        <div className='p-2.5'>
          <div className='relative aspect-square overflow-hidden rounded-lg bg-gray-100'>
            <ProductImage
              src={product.images[0]}
              alt={product.name}
              size={800}
              className='transition-transform duration-500 group-hover:scale-105'
            />

            {/* Out of Stock overlay */}
            {outOfStock && (
              <div className='absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-white/70'>
                <span className='rounded-lg bg-gray-800 px-4 py-1.5 text-sm font-semibold text-white'>
                  Out of Stock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Discount Badge */}
        {discountPercent && discountPercent > 0 && (
          <span className='absolute left-3 top-3 z-10 rounded-full bg-sale-badge px-2 py-0.5 text-xs font-bold text-white shadow-sm'>
            -{discountPercent}%
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            // TODO: wishlist logic
          }}
          className='absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-400 shadow-sm backdrop-blur transition-colors hover:bg-white hover:text-red-500'
          aria-label='Add to wishlist'
        >
          <FiHeart className='h-4 w-4' />
        </button>
      </Link>

      {/* ── Info ── */}
      <div className='flex flex-1 flex-col p-3 sm:p-4'>
        {/* Category */}
        <span className='mb-1 text-xs font-medium text-gray-400'>
          {product.category}
        </span>

        {/* Name */}
        <Link
          href={`/product/${product.slug}`}
          className='mb-1.5 text-base font-medium leading-snug text-gray-800 transition-colors hover:text-primary line-clamp-2'
        >
          {product.name}
        </Link>

        {/* Rating */}
        <div className='mb-2 flex items-center gap-1'>
          <div className='flex items-center gap-0.5'>
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`h-3 w-3 ${
                  star <= Math.round(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className='text-xs text-gray-400'>({product.reviewCount})</span>
        </div>

        {/* Price + Add to Cart */}
        <div className='mt-auto flex items-center justify-between'>
          <div className='flex items-baseline gap-1.5'>
            <span className='text-lg font-bold text-gray-900'>
              ৳{currentPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className='text-xs text-gray-400 line-through'>
                ৳{product.basePrice.toLocaleString()}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            disabled={outOfStock}
            className={`flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 ${
              outOfStock
                ? 'cursor-not-allowed bg-gray-100 text-gray-300'
                : 'bg-primary-light text-primary hover:bg-primary hover:text-white'
            }`}
            aria-label='Add to cart'
          >
            <FiShoppingCart className='h-4 w-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
