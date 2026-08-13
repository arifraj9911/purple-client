'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { FiGrid, FiList, FiSliders } from 'react-icons/fi';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Pagination } from '@/components/ui/pagination';
import { ProductCard } from '@/components/ui/product-card';
import FilterSidebar, {
  type FilterState,
} from '@/components/shop/FilterSidebar';
import {
  products,
  getProductPriceRange,
  getCurrentPrice,
} from '@/data/products';

const ITEMS_PER_PAGE = 9;
const SORT_OPTIONS = [
  { label: 'Default', value: 'default' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
  { label: 'Best Selling', value: 'best-selling' },
  { label: 'Top Rated', value: 'rating' },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]['value'];
type ViewMode = 'grid' | 'list';

export default function ShopPage() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<SortValue>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const topBarRef = useRef<HTMLDivElement>(null);

  // Scroll to absolute top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Price bounds from actual product data (min & max current price)
  const priceBounds: [number, number] = useMemo(
    () => getProductPriceRange(),
    [],
  );

  const [filters, setFilters] = useState<FilterState>({
    categoryIds: [],
    priceRange: priceBounds,
    brands: [],
    minRating: null,
    inStockOnly: false,
  });

  // ── Filter + Sort pipeline ──
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Category filter (include children? For now exact match on categoryId)
    if (filters.categoryIds.length > 0) {
      result = result.filter((p) => filters.categoryIds.includes(p.categoryId));
    }

    // Price range
    const currentPrice = (p: (typeof products)[0]) => getCurrentPrice(p);
    result = result.filter(
      (p) =>
        currentPrice(p) >= filters.priceRange[0] &&
        currentPrice(p) <= filters.priceRange[1],
    );

    // Brand
    if (filters.brands.length > 0) {
      result = result.filter((p) => filters.brands.includes(p.brand));
    }

    // Rating
    if (filters.minRating !== null) {
      result = result.filter((p) => p.rating >= filters.minRating!);
    }

    // In stock
    if (filters.inStockOnly) {
      result = result.filter((p) => p.stock > 0);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => currentPrice(a) - currentPrice(b));
        break;
      case 'price-desc':
        result.sort((a, b) => currentPrice(b) - currentPrice(a));
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case 'best-selling':
        result.sort((a, b) => b.soldCount - a.soldCount);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [filters, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  // Reset page when filters change
  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-2'>
        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Shop' }]} />
      </div>

      <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-2 pb-12'>
        <div className='flex gap-8'>
          {/* ── LEFT: Filter Sidebar (desktop) ── */}
          <aside className='hidden w-64 shrink-0 lg:block'>
            <div className='sticky top-28 lg:top-32'>
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                priceBounds={priceBounds}
              />
            </div>
          </aside>

          {/* ── MOBILE: Filter Drawer (always rendered for smooth transition) ── */}
          <>
            {/* Overlay */}
            <div
              className={`fixed inset-0 z-50 bg-black/50 transition-opacity duration-300 lg:hidden ${
                mobileFilterOpen
                  ? 'opacity-100'
                  : 'pointer-events-none opacity-0'
              }`}
              onClick={() => setMobileFilterOpen(false)}
            />
            {/* Drawer */}
            <div
              className={`fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] overflow-y-auto bg-white p-5 shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
                mobileFilterOpen ? 'translate-x-0' : '-translate-x-full'
              }`}
            >
              <div className='mb-4 flex items-center justify-between'>
                <h3 className='text-lg font-semibold font-heading'>Filters</h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className='rounded-lg p-1.5 text-gray-500 hover:bg-gray-100'
                >
                  <FiSliders className='h-5 w-5' />
                </button>
              </div>
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                priceBounds={priceBounds}
              />
            </div>
          </>

          {/* ── RIGHT: Main Content ── */}
          <div className='flex-1 min-w-0'>
            {/* Top Bar — clean, no bg/shadow */}
            <div
              ref={topBarRef}
              className='mb-5 flex flex-wrap items-center gap-3'
            >
              {/* Mobile filter toggle */}
              <button
                onClick={() => setMobileFilterOpen(true)}
                className='flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:border-primary hover:text-primary lg:hidden'
              >
                <FiSliders className='h-4 w-4' />
                Filter
              </button>

              {/* View toggle */}
              <div className='flex items-center rounded-lg border border-gray-200 p-0.5'>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`rounded-md p-1.5 transition-all duration-200 ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label='Grid view'
                >
                  <FiGrid className='h-4 w-4' />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`rounded-md p-1.5 transition-all duration-200 ${
                    viewMode === 'list'
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                  aria-label='List view'
                >
                  <FiList className='h-4 w-4' />
                </button>
              </div>

              {/* Results count — inline on desktop, full-width below on mobile */}
              <p className='text-sm text-gray-800 sm:order-none order-last sm:w-auto w-full'>
                Showing{' '}
                <span className='font-semibold'>
                  {filteredProducts.length === 0
                    ? '0'
                    : `${(currentPage - 1) * ITEMS_PER_PAGE + 1}-${Math.min(currentPage * ITEMS_PER_PAGE, filteredProducts.length)}`}
                </span>{' '}
                of{' '}
                <span className='font-semibold'>{filteredProducts.length}</span>{' '}
                results
              </p>

              {/* Sort */}
              <div className='flex items-center gap-2 sm:ml-auto'>
                <label
                  htmlFor='sort'
                  className='text-sm text-gray-500 hidden sm:inline'
                >
                  Sort by:
                </label>
                <select
                  id='sort'
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value as SortValue);
                    setCurrentPage(1);
                  }}
                  className='rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary'
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Product Grid / List */}
            {paginatedProducts.length === 0 ? (
              <div className='flex flex-col items-center justify-center py-20 text-center'>
                <p className='text-lg font-medium text-gray-500'>
                  No products found
                </p>
                <p className='text-sm text-gray-400 mt-1'>
                  Try adjusting your filters or search criteria.
                </p>
              </div>
            ) : viewMode === 'grid' ? (
              <div className='grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 2xl:grid-cols-4 transition-all duration-300'>
                {paginatedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    priority={index === 0}
                  />
                ))}
              </div>
            ) : (
              <div className='space-y-4 transition-all duration-300'>
                {paginatedProducts.map((product, index) => (
                  <ProductListRow
                    key={product.id}
                    product={product}
                    priority={index === 0}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className='mt-8'>
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── List View Row ─── */
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiShoppingCart, FiStar } from 'react-icons/fi';
import { type Product } from '@/data/products';
import { useCart } from '@/lib/cart-context';

function ProductListRow({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
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
      image: product.images[0],
      quantity: 1,
      slug: product.slug,
    });
    openDrawer();
  };

  return (
    <div className='flex gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md sm:gap-4'>
      <Link
        href={`/product/${product.slug}`}
        className='relative block aspect-4/3 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:w-32'
      >
        {/* Blurred background — fills gaps when object-contain leaves space */}
        <Image
          src={product.images[0]}
          alt=''
          fill
          sizes='(max-width: 640px) 96px, 128px'
          className='scale-110 object-cover blur-xl saturate-150'
          aria-hidden='true'
        />
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes='(max-width: 640px) 96px, 128px'
          priority={priority}
          className='relative z-10 object-contain'
        />
        {discountPercent && discountPercent > 0 && (
          <span className='absolute left-1.5 top-1.5 z-20 rounded-full bg-sale-badge px-2 py-0.5 text-[10px] font-bold text-white'>
            -{discountPercent}%
          </span>
        )}
      </Link>

      <div className='flex flex-1 flex-col justify-between min-w-0'>
        <div>
          <span className='text-[10px] font-medium text-gray-400'>
            {product.category}
          </span>
          <Link href={`/product/${product.slug}`} className='block'>
            <h3 className='text-sm font-semibold text-gray-800 line-clamp-2 hover:text-primary sm:text-base'>
              {product.name}
            </h3>
          </Link>
          <div className='mt-1 flex items-center gap-1'>
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
            <span className='text-[11px] text-gray-400'>
              ({product.reviewCount})
            </span>
          </div>
          <p className='mt-1 hidden text-xs text-gray-500 line-clamp-2 sm:block'>
            {product.shortDescription}
          </p>
        </div>

        <div className='mt-2 flex flex-wrap items-center justify-between gap-2'>
          <div className='flex items-baseline gap-2'>
            <span className='text-base font-semibold text-gray-900 sm:text-lg'>
              ৳{currentPrice.toLocaleString()}
            </span>
            {hasDiscount && (
              <span className='text-xs text-gray-400 line-through'>
                ৳{product.basePrice.toLocaleString()}
              </span>
            )}
          </div>
          <div className='flex items-center gap-1.5'>
            <button
              onClick={(e) => {
                e.preventDefault(); /* wishlist */
              }}
              className='rounded-lg p-1.5 text-gray-400 transition-colors hover:text-red-500'
            >
              <FiHeart className='h-4 w-4' />
            </button>
            <button
              onClick={handleAddToCart}
              disabled={outOfStock}
              className='flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-50'
            >
              <FiShoppingCart className='h-3.5 w-3.5' />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
