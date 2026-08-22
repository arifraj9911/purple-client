'use client';

import { useState } from 'react';
import {
  FiCheck,
  FiMessageSquare,
  FiRefreshCw,
  FiSend,
  FiStar,
  FiTruck,
  FiUser,
} from 'react-icons/fi';
import {
  type Product,
  type DescriptionBlock,
  type Review,
} from '@/data/products';

type TabId = 'description' | 'reviews' | 'shipping' | 'returns';

interface ProductTabsProps {
  product: Product;
}

export default function ProductTabs({ product }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('description');

  const tabs: { id: TabId; label: string; count?: number }[] = [
    { id: 'description', label: 'Description' },
    { id: 'reviews', label: 'Reviews', count: product.reviewCount },
    { id: 'shipping', label: 'Shipping Info' },
    { id: 'returns', label: 'Return Policy' },
  ];

  return (
    <section className='mt-10 sm:mt-14'>
      {/* ── Tab bar — centered, stays on one line on small devices ── */}
      <div
        role='tablist'
        aria-label='Product information'
        className='flex flex-wrap justify-center gap-1 border-b border-gray-200'
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type='button'
            role='tab'
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`-mb-px flex items-center gap-1 border-b-2 px-3 py-2.5 text-xs font-semibold transition-colors sm:px-4 sm:py-3 sm:text-sm ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span
                className={`rounded-full px-1 py-0.5 text-[9px] font-semibold sm:px-1.5 sm:text-[10px] ${
                  activeTab === tab.id
                    ? 'bg-primary-light text-primary'
                    : 'bg-gray-100 text-gray-500'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Panels ── */}
      <div className='mx-auto max-w-3xl py-6 sm:py-8'>
        {activeTab === 'description' && (
          <>
            <DescriptionContent blocks={product.description} />
            <div className='mt-8'>
              <h3 className='mb-4 font-heading text-lg font-semibold text-gray-900'>
                Additional Information
              </h3>
              <InfoTable product={product} />
            </div>
          </>
        )}

        {activeTab === 'reviews' && <ReviewsPanel product={product} />}

        {activeTab === 'shipping' && <ShippingInfoPanel />}

        {activeTab === 'returns' && <ReturnPolicyPanel />}
      </div>
    </section>
  );
}

/* ─── Description (rich-text blocks) ─── */
function DescriptionContent({ blocks }: { blocks: DescriptionBlock[] }) {
  if (blocks.length === 0) {
    return <p className='text-sm text-gray-500 sm:text-base'>No description available.</p>;
  }

  return (
    <div className='space-y-3 sm:space-y-4'>
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'heading':
            return (
              <h3
                key={index}
                className='font-heading text-base font-semibold text-gray-900 sm:text-lg'
              >
                {block.text}
              </h3>
            );
          case 'list':
            return (
              <ul key={index} className='space-y-1.5 sm:space-y-2'>
                {block.items.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className='flex items-start gap-2 text-sm leading-relaxed text-gray-600 sm:text-base'
                  >
                    <FiCheck className='mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary' />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          default:
            return (
              <p
                key={index}
                className='text-sm leading-relaxed text-gray-600 sm:text-base'
              >
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}

/* ─── Additional Info (built from existing product fields) ─── */
function InfoTable({ product }: { product: Product }) {
  const rows: { label: string; value: string }[] = [
    { label: 'Brand', value: product.brand },
    { label: 'Category', value: product.category },
    {
      label: 'Availability',
      value: product.stock === 0 ? 'Out of Stock' : 'In Stock',
    },
    {
      label: 'Stock',
      value: product.stock === 0 ? '0' : `${product.stock} units available`,
    },
    { label: 'Sold', value: `${product.soldCount.toLocaleString()} units` },
    { label: 'Rating', value: `${product.rating} / 5` },
    {
      label: 'Added',
      value: new Date(product.createdAt).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    },
    { label: 'Tags', value: product.tags.join(', ') },
  ];

  return (
    <div className='overflow-hidden rounded-xl border border-gray-200'>
      <table className='w-full text-left text-xs sm:text-sm'>
        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.label}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <th className='w-28 sm:w-40 px-3 sm:px-4 py-2 sm:py-3 font-medium text-gray-500'>
                {row.label}
              </th>
              <td className='px-3 sm:px-4 py-2 sm:py-3 text-gray-800'>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ─── Reviews ─── */
function ReviewsPanel({ product }: { product: Product }) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(5);
  const [newReviews, setNewReviews] = useState<Review[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const reviews = [...newReviews, ...product.reviews];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;
    const review: Review = {
      id: Date.now(),
      userId: 0,
      userName: name.trim() || 'Anonymous',
      rating,
      comment: comment.trim(),
      createdAt: new Date().toISOString(),
    };
    setNewReviews((prev) => [review, ...prev]);
    setName('');
    setComment('');
    setRating(5);
    setSubmitted(true);
  };

  return (
    <div>
      {/* Summary */}
      <div className='flex flex-wrap items-center gap-4 sm:gap-6 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5'>
        <div className='text-center'>
          <div className='text-3xl sm:text-4xl font-bold text-gray-900'>
            {product.rating}
          </div>
          <div className='mt-1 flex items-center justify-center gap-0.5'>
            {[1, 2, 3, 4, 5].map((star) => (
              <FiStar
                key={star}
                className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                  star <= Math.round(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'text-gray-200'
                }`}
              />
            ))}
          </div>
          <div className='mt-1 text-[11px] sm:text-xs text-gray-500'>
            Based on {product.reviewCount + newReviews.length} reviews
          </div>
        </div>

        {reviews.length > 0 && (
          <p className='flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-600'>
            <FiMessageSquare className='h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary' />
            Showing {reviews.length} of{' '}
            {product.reviewCount + newReviews.length} reviews
          </p>
        )}
      </div>

      {/* Review list */}
      {reviews.length === 0 ? (
        <div className='mt-5 sm:mt-6 rounded-xl border border-dashed border-gray-200 p-6 sm:p-10 text-center'>
          <p className='text-xs sm:text-sm font-medium text-gray-700'>No reviews yet</p>
          <p className='mt-1 text-[11px] sm:text-xs text-gray-500'>
            Be the first to share your experience with this product.
          </p>
        </div>
      ) : (
        <ul className='mt-5 sm:mt-6 space-y-3.5 sm:space-y-5'>
          {reviews.map((review) => (
            <li
              key={review.id}
              className='rounded-xl border border-gray-100 p-3.5 sm:p-5'
            >
              <div className='flex flex-wrap items-center justify-between gap-2'>
                <div className='flex items-center gap-2'>
                  <span className='flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-primary-light text-primary'>
                    <FiUser className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
                  </span>
                  <span className='text-xs sm:text-sm font-semibold text-gray-900'>
                    {review.userName}
                  </span>
                </div>
                <span className='text-[10px] sm:text-xs text-gray-400'>
                  {new Date(review.createdAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div className='mt-1.5 sm:mt-2 flex items-center gap-0.5'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FiStar
                    key={star}
                    className={`h-3 w-3 sm:h-3.5 sm:w-3.5 ${
                      star <= review.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
              <p className='mt-2 text-xs sm:text-sm leading-relaxed text-gray-600'>
                {review.comment}
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* ── Review form ── */}
      <form
        onSubmit={handleSubmit}
        className='mt-6 sm:mt-8 rounded-xl border border-gray-100 bg-gray-50 p-4 sm:p-5'
      >
        <h3 className='font-heading text-base font-semibold text-gray-900 sm:text-lg'>
          Write a Review
        </h3>

        {/* Star rating picker */}
        <div className='mt-2.5 sm:mt-3 flex items-center gap-2'>
          <span className='text-xs sm:text-sm text-gray-600'>Your rating:</span>
          <div className='flex items-center gap-1'>
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type='button'
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                className='transition-transform hover:scale-110'
              >
                <FiStar
                  className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors ${
                    star <= rating
                      ? 'fill-amber-400 text-amber-400'
                      : 'text-gray-300 hover:text-amber-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Name (optional) */}
        <div className='mt-3.5 sm:mt-4'>
          <label
            htmlFor='review-name'
            className='mb-1 block text-xs sm:text-sm font-medium text-gray-700'
          >
            Name <span className='font-normal text-gray-400'>(optional)</span>
          </label>
          <input
            id='review-name'
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder='Your name'
            className='w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
          />
        </div>

        {/* Comment */}
        <div className='mt-3.5 sm:mt-4'>
          <label
            htmlFor='review-comment'
            className='mb-1 block text-xs sm:text-sm font-medium text-gray-700'
          >
            Your Review <span className='text-primary'>*</span>
          </label>
          <textarea
            id='review-comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder='Share your experience with this product...'
            className='w-full resize-y rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm text-gray-800 placeholder:text-gray-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
          />
        </div>

        <button
          type='submit'
          disabled={!comment.trim()}
          className='mt-3.5 sm:mt-4 flex items-center gap-1.5 sm:gap-2 rounded-lg bg-primary px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400'
        >
          <FiSend className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
          Submit Review
        </button>

        {submitted && (
          <p className='mt-3 flex items-center gap-1.5 text-xs font-medium text-accent'>
            <FiCheck className='h-3.5 w-3.5' />
            Thank you! Your review has been submitted.
          </p>
        )}
      </form>
    </div>
  );
}

/* ─── Shipping Info ─── */
function ShippingInfoPanel() {
  const items = [
    'Inside Dhaka: ৳60 — delivered within 2–3 business days',
    'Outside Dhaka: ৳120 — delivered within 3–5 business days',
    'Free delivery on orders above ৳2,000',
    'Orders are dispatched within 24 hours (Saturday–Thursday)',
  ];

  return (
    <div className='space-y-3 sm:space-y-4'>
      <p className='text-sm sm:text-base leading-relaxed text-gray-600'>
        We deliver to all 64 districts of Bangladesh through trusted courier
        partners. Orders placed before 3 PM are dispatched the same day, and you
        will receive a tracking number as soon as your parcel ships.
      </p>
      <ul className='space-y-1.5 sm:space-y-2'>
        {items.map((item) => (
          <li
            key={item}
            className='flex items-start gap-2 text-sm sm:text-base leading-relaxed text-gray-600'
          >
            <FiTruck className='mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary' />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── Return Policy ─── */
function ReturnPolicyPanel() {
  const items = [
    'Easy 7-day refund from the date of delivery',
    'Items must be unused and in their original packaging',
    'Refunds are processed within 3–5 business days after inspection',
    'Damaged or incorrect items are replaced at no extra cost',
  ];

  return (
    <div className='space-y-3 sm:space-y-4'>
      <p className='text-sm sm:text-base leading-relaxed text-gray-600'>
        Not happy with your purchase? No worries — we offer a simple,
        hassle-free return process so you can shop with confidence.
      </p>
      <ul className='space-y-1.5 sm:space-y-2'>
        {items.map((item) => (
          <li
            key={item}
            className='flex items-start gap-2 text-sm sm:text-base leading-relaxed text-gray-600'
          >
            <FiRefreshCw className='mt-0.5 sm:mt-1 h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 text-primary' />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
