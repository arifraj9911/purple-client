'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FiCheck,
  FiRepeat,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShoppingCart,
  FiStar,
  FiZap,
} from 'react-icons/fi';
import { type Product } from '@/data/products';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/lib/wishlist-context';
import { useCompare } from '@/lib/compare-context';

interface ProductPurchaseProps {
  product: Product;
}

export default function ProductPurchase({ product }: ProductPurchaseProps) {
  const { addItem, openDrawer } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isInCompare, addToCompare, removeFromCompare } = useCompare();

  const [quantityInput, setQuantityInput] = useState('1');
  const [compareNotice, setCompareNotice] = useState('');
  const compared = isInCompare(product.id);
  const wishlisted = isInWishlist(product.id);

  const outOfStock = product.stock === 0;
  const lowStock = !outOfStock && product.stock <= 10;
  const hasDiscount =
    product.discountPrice !== null && product.discountPrice < product.basePrice;
  const currentPrice = product.discountPrice ?? product.basePrice;
  const discountPercent = hasDiscount
    ? (product.discountPercent ??
      Math.round(
        ((product.basePrice - product.discountPrice!) / product.basePrice) *
          100,
      ))
    : null;

  const maxQuantity = product.stock || 1;

  const parseQuantity = (): number => {
    const parsed = parseInt(quantityInput, 10);
    return Number.isNaN(parsed) || parsed < 1 ? 1 : parsed;
  };

  const clampQuantity = (value: number) =>
    Math.min(maxQuantity, Math.max(1, value));

  const cartPayload = {
    id: product.id,
    name: product.name,
    price: currentPrice,
    basePrice: hasDiscount ? product.basePrice : undefined,
    discountPrice: product.discountPrice ?? undefined,
    image: product.images[0],
    slug: product.slug,
  };

  const addToCart = () => {
    if (outOfStock) return;
    addItem({ ...cartPayload, quantity: clampQuantity(parseQuantity()) });
    openDrawer();
  };

  const buyNow = () => {
    if (outOfStock) return;
    addItem({ ...cartPayload, quantity: clampQuantity(parseQuantity()) });
    // Opens the cart drawer so the user can complete checkout.
    // TODO: navigate to /checkout once that page exists.
    openDrawer();
  };

  const changeQuantity = (delta: number) => {
    const next = Math.max(1, parseQuantity() + delta);
    setQuantityInput(String(next));
  };

  const handleQuantityInput = (value: string) => {
    if (value === '') {
      setQuantityInput('');
      return;
    }
    setQuantityInput(value.replace(/\D/g, ''));
  };

  const commitQuantity = () => {
    setQuantityInput(String(parseQuantity()));
  };

  const handleToggleCompare = () => {
    if (compared) {
      removeFromCompare(product.id);
      return;
    }
    if (!addToCompare(product.id)) {
      setCompareNotice('You can compare up to 3 products at a time');
      setTimeout(() => setCompareNotice(''), 3000);
    }
  };

  const stars = [1, 2, 3, 4, 5];

  return (
    <div className='flex flex-col'>
      {/* ── Stock status ── */}
      <div className='flex items-center gap-2'>
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
            outOfStock
              ? 'bg-gray-100 text-gray-500'
              : lowStock
                ? 'bg-warning/20 text-yellow-700'
                : 'bg-accent/10 text-accent'
          }`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              outOfStock ? 'bg-gray-400' : lowStock ? 'bg-warning' : 'bg-accent'
            }`}
          />
          {outOfStock
            ? 'Out of Stock'
            : lowStock
              ? `Only ${product.stock} left in stock`
              : 'In Stock'}
        </span>
        {hasDiscount && (
          <span className='rounded-full bg-sale-badge/10 px-2.5 py-1 text-xs font-semibold text-sale-badge'>
            Save ৳{(product.basePrice - currentPrice).toLocaleString()}
          </span>
        )}
      </div>

      {/* ── Title ── */}
      <h1 className='mt-3 font-heading text-xl font-bold leading-snug text-gray-900 sm:text-2xl lg:text-3xl'>
        {product.name}
      </h1>

      {/* ── Rating ── */}
      <div className='mt-2 flex flex-wrap items-center gap-x-3 gap-y-1'>
        <div
          className='flex items-center gap-0.5'
          aria-label={`Rated ${product.rating} out of 5`}
        >
          {stars.map((star) => (
            <FiStar
              key={star}
              className={`h-4 w-4 ${
                star <= Math.round(product.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-200'
              }`}
            />
          ))}
        </div>
        <span className='text-sm font-medium text-gray-800'>
          {product.rating}
        </span>
        <span className='text-sm text-gray-400'>
          ({product.reviewCount} reviews)
        </span>
        <span className='hidden text-sm text-gray-400 sm:inline'>•</span>
        <span className='text-sm text-gray-500'>
          {product.soldCount.toLocaleString()} sold
        </span>
      </div>

      {/* ── Price ── */}
      <div className='mt-4 flex flex-wrap items-baseline gap-2'>
        <span className='text-2xl font-bold text-primary sm:text-3xl'>
          ৳{currentPrice.toLocaleString()}
        </span>
        {hasDiscount && (
          <span className='text-base text-gray-400 line-through'>
            ৳{product.basePrice.toLocaleString()}
          </span>
        )}
        {discountPercent && (
          <span className='rounded-md bg-sale-badge px-2 py-0.5 text-xs font-bold text-white'>
            -{discountPercent}%
          </span>
        )}
      </div>

      {/* ── Short description ── */}
      <p className='mt-3 leading-relaxed text-gray-600'>
        {product.shortDescription}
      </p>

      <hr className='my-4 border-gray-100' />

      {/* ── Brand / Category / Stock — below the divider ── */}
      <div className='space-y-1 text-sm'>
        <p className='text-gray-600'>
          <span className='font-medium text-gray-900'>Brand:</span>{' '}
          {product.brand}
        </p>
        <p className='text-gray-600'>
          <span className='font-medium text-gray-900'>Category:</span>{' '}
          <Link
            href='/shop'
            className='font-medium text-primary transition-colors hover:text-primary-dark hover:underline'
          >
            {product.category}
          </Link>
        </p>
        <p className='text-gray-600'>
          <span className='font-medium text-gray-900'>Stock:</span>{' '}
          <span className={`font-semibold ${outOfStock ? 'text-red-500' : 'text-emerald-600'}`}>
            {product.stock}
          </span>
        </p>
      </div>

      {/* ── Quantity + actions (compact, aligned row) ── */}
      <div className='mt-3 flex flex-wrap items-center gap-2'>
        {/* Quantity Stepper (compact) */}
        <div className='flex items-center rounded-lg border border-gray-300'>
          <button
            type='button'
            onClick={() => changeQuantity(-1)}
            disabled={outOfStock || parseQuantity() <= 1}
            aria-label='Decrease quantity'
            className='flex h-9 w-9 items-center justify-center text-gray-500 transition-colors hover:text-primary disabled:opacity-40'
          >
            <FiMinus className='h-3.5 w-3.5' />
          </button>
          <input
            type='text'
            inputMode='numeric'
            value={quantityInput}
            onChange={(e) => handleQuantityInput(e.target.value)}
            onBlur={commitQuantity}
            aria-label='Quantity'
            className='h-9 w-11 border-x border-gray-300 bg-white text-center text-xs font-semibold text-gray-900 outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary'
          />
          <button
            type='button'
            onClick={() => changeQuantity(1)}
            disabled={outOfStock}
            aria-label='Increase quantity'
            className='flex h-9 w-9 items-center justify-center text-gray-500 transition-colors hover:text-primary disabled:opacity-40'
          >
            <FiPlus className='h-3.5 w-3.5' />
          </button>
        </div>

        {/* Wishlist Button (compact) */}
        <button
          type='button'
          onClick={() => toggleWishlist(product.id)}
          aria-pressed={wishlisted}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 active:scale-95 ${
            wishlisted
              ? 'border-red-200 bg-red-50 text-red-500'
              : 'border-gray-300 text-gray-500 hover:border-red-200 hover:bg-red-50 hover:text-red-500'
          }`}
        >
          <FiHeart className={`h-4 w-4 ${wishlisted ? 'fill-red-500' : ''}`} />
        </button>

        {/* Compare Button (compact, matching card icon) */}
        <button
          type='button'
          onClick={handleToggleCompare}
          aria-pressed={compared}
          aria-label={compared ? 'Remove from compare' : 'Add to compare'}
          title={compared ? 'Remove from compare' : 'Add to compare'}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-all duration-200 active:scale-95 ${
            compared
              ? 'border-primary bg-primary-light text-primary'
              : 'border-gray-300 text-gray-500 hover:border-primary hover:bg-primary-light hover:text-primary'
          }`}
        >
          <FiRepeat className='h-4 w-4' />
        </button>

        {/* Add to Cart + Buy Now — equal width flex-1 on mobile */}
        <div className='flex w-full gap-2 sm:w-auto'>
          <button
            type='button'
            onClick={addToCart}
            disabled={outOfStock}
            className='flex h-9 flex-1 sm:flex-initial sm:px-4 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-semibold text-white shadow-xs transition-all duration-200 hover:bg-primary-dark hover:shadow active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400'
          >
            <FiShoppingCart className='h-3.5 w-3.5' />
            <span>Add to Cart</span>
          </button>

          <button
            type='button'
            onClick={buyNow}
            disabled={outOfStock}
            className='flex h-9 flex-1 sm:flex-initial sm:px-4 items-center justify-center gap-1.5 rounded-lg border border-primary bg-transparent px-3 text-xs font-semibold text-primary transition-all duration-200 hover:bg-primary hover:text-white active:scale-95 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-transparent disabled:text-gray-400'
          >
            <FiZap className='h-3.5 w-3.5' />
            <span>Buy Now</span>
          </button>
        </div>
      </div>

      {compareNotice && (
        <p className='mt-2 text-xs font-medium text-sale-badge'>
          {compareNotice}
        </p>
      )}

      {/* ── Compare feedback ── */}
      {compared && (
        <p className='mt-3 flex items-center gap-1.5 text-xs font-medium text-accent'>
          <FiCheck className='h-3.5 w-3.5' />
          Added to compare — compare up to 3 products from the compare page.
        </p>
      )}
    </div>
  );
}
