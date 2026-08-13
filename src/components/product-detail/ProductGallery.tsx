'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const slides = images;

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [mainRef, mainApi] = useEmblaCarousel({ align: 'start' });
  const [thumbsRef, thumbsApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => mainApi?.scrollPrev(), [mainApi]);
  const scrollNext = useCallback(() => mainApi?.scrollNext(), [mainApi]);
  const scrollTo = useCallback(
    (index: number) => mainApi?.scrollTo(index),
    [mainApi],
  );

  /* Keep counter + thumbnails in sync with the main carousel */
  useEffect(() => {
    if (!mainApi) return;
    const onSelect = () => {
      const index = mainApi.selectedScrollSnap();
      setSelectedIndex(index);
      thumbsApi?.scrollTo(index);
    };
    mainApi.on('select', onSelect);
    mainApi.on('init', onSelect);
    return () => {
      mainApi.off('select', onSelect);
      mainApi.off('init', onSelect);
    };
  }, [mainApi, thumbsApi]);

  const canScrollPrev = mainApi?.canScrollPrev() ?? false;
  const canScrollNext = mainApi?.canScrollNext() ?? false;
  const hasMultiple = slides.length > 1;

  const thumbnailButtons = slides.map((src, index) => (
    <button
      key={`${src}-thumb-${index}`}
      type='button'
      onClick={() => scrollTo(index)}
      aria-label={`View image ${index + 1}`}
      aria-current={index === selectedIndex}
      className={`relative aspect-square w-16 shrink-0 overflow-hidden rounded-md border-2 transition-all duration-300 sm:w-20 ${
        index === selectedIndex
          ? 'border-primary opacity-100'
          : 'border-gray-200 opacity-70 hover:border-gray-300 hover:opacity-100'
      }`}
    >
      <Image src={src} alt='' fill sizes='96px' className='object-cover' />
    </button>
  ));

  return (
    <div className='flex flex-col gap-3 lg:flex-row lg:gap-4'>
      {/* ── Main slider ── */}
      <div className='group relative min-w-0 flex-1 lg:order-2'>
        <div
          ref={mainRef}
          className='overflow-hidden rounded-md border border-gray-200 bg-gray-50'
        >
          <div className='flex'>
            {slides.map((src, index) => (
              <div
                key={`${src}-${index}`}
                className='relative aspect-4/3 min-w-0 flex-[0_0_100%]'
              >
                {/* Blurred backdrop — fills gaps when object-contain leaves space */}
                <Image
                  src={src}
                  alt=''
                  fill
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className='scale-110 object-cover blur-xl saturate-150'
                  aria-hidden='true'
                />
                <Image
                  src={src}
                  alt={`${alt} — image ${index + 1}`}
                  fill
                  sizes='(max-width: 1024px) 100vw, 50vw'
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className='relative z-10 rounded-md object-contain p-4'
                />
              </div>
            ))}
          </div>
        </div>

        {/* Prev / Next arrows — always visible on mobile, reveal on hover on desktop */}
        {hasMultiple && (
          <>
            <button
              type='button'
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label='Previous image'
              className='absolute left-3 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm backdrop-blur transition-all duration-300 hover:border-primary hover:text-primary disabled:pointer-events-none disabled:hidden sm:h-8 sm:w-8 sm:opacity-0 sm:group-hover:opacity-100 lg:h-10 lg:w-10'
            >
              <FiChevronLeft className='h-5 w-5' />
            </button>
            <button
              type='button'
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label='Next image'
              className='absolute right-3 top-1/2 z-20 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm backdrop-blur transition-all duration-300 hover:border-primary hover:text-primary disabled:pointer-events-none disabled:hidden sm:h-8 sm:w-8 sm:opacity-0 sm:group-hover:opacity-100 lg:h-10 lg:w-10'
            >
              <FiChevronRight className='h-5 w-5' />
            </button>
          </>
        )}

        {/* Slide counter */}
        {hasMultiple && (
          <span className='absolute bottom-2 right-2 z-20 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white lg:bottom-3 lg:right-3 lg:px-2.5 lg:py-1 lg:text-xs'>
            {selectedIndex + 1} / {slides.length}
          </span>
        )}
      </div>

      {/* ── Thumbnails ── */}
      {hasMultiple && (
        <>
          {/* Mobile / tablet — horizontal slider below the image */}
          <div ref={thumbsRef} className='overflow-hidden lg:hidden'>
            <div className='flex gap-2'>{thumbnailButtons}</div>
          </div>

          {/* Desktop — vertical strip on the left */}
          <div className='hidden shrink-0 flex-col gap-2 lg:order-1 lg:flex'>
            {thumbnailButtons}
          </div>
        </>
      )}
    </div>
  );
}
