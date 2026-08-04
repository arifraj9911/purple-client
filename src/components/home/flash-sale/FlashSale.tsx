'use client';

import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { flashSaleProducts } from '@/data/products';
import { ProductCard } from '@/components/ui/product-card';

export default function FlashSale() {
  const [, forceRender] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const tick = () => forceRender((n) => n + 1);
    emblaApi.on('select', tick);
    emblaApi.on('reInit', tick);
    emblaApi.on('init', tick);
    return () => {
      emblaApi.off('select', tick);
      emblaApi.off('reInit', tick);
      emblaApi.off('init', tick);
    };
  }, [emblaApi]);

  const canScrollPrev = emblaApi?.canScrollPrev() ?? false;
  const canScrollNext = emblaApi?.canScrollNext() ?? false;

  if (flashSaleProducts.length === 0) return null;

  return (
    <section className='bg-gray-50 py-12 sm:py-16 lg:py-20'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        {/* ── Header ── */}
        <div className='mb-8 flex items-end justify-between'>
          <div>
            <span className='inline-block rounded-full bg-sale-badge/10 px-3 py-1 text-xs font-semibold text-sale-badge'>
              ⚡ Limited Time
            </span>
            <h2 className='mt-3 font-heading text-2xl font-bold text-gray-900 sm:text-3xl'>
              Flash Sale
            </h2>
          </div>

          {/* Arrows */}
          <div className='hidden shrink-0 items-center gap-1 sm:flex'>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:opacity-30'
              aria-label='Previous'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              className='flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:opacity-30'
              aria-label='Next'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-4 w-4'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9 5l7 7-7 7'
                />
              </svg>
            </button>
          </div>
        </div>

        {/* ── Carousel ── */}
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex items-stretch gap-4 sm:gap-5 md:gap-6'>
            {flashSaleProducts.map((product) => (
              <div
                key={product.id}
                className='w-[75vw] min-w-0 shrink-0 sm:w-[45vw] md:w-[30vw] lg:w-[23vw] xl:w-[24vw] 2xl:w-[18vw]'
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
