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
    <section className='bg-gray-50 py-8 sm:py-12'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        {/* ── Header ── */}
        <div className='mb-4 md:mb-8 flex items-end justify-between'>
          <div>
            <span className='inline-block rounded-full bg-sale-badge/10 px-3 py-1 text-xs font-semibold text-sale-badge'>
              Limited Time
            </span>
            <h2 className='mt-1 md:2.5 font-heading text-2xl font-bold text-gray-900 sm:text-3xl'>
              Offer Sale
            </h2>
          </div>

          {/* Arrows */}
          <div className='flex shrink-0 items-center gap-1'>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className='flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-gray-400 bg-white text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:opacity-30'
              aria-label='Previous'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5 sm:h-4 sm:w-4'
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
              className='flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-gray-400 bg-white text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:opacity-30'
              aria-label='Next'
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-3.5 w-3.5 sm:h-4 sm:w-4'
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
          <div className='flex items-stretch gap-3 sm:gap-5 md:gap-6'>
            {flashSaleProducts.map((product) => (
              <div
                key={product.id}
                className='w-[62vw] min-w-0 shrink-0 sm:w-[45vw] md:w-[calc(25%-18px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] 2xl:w-[calc(25%-18px)]'
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
