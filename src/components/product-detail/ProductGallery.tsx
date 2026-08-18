'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiX,
} from 'react-icons/fi';

interface ProductGalleryProps {
  images: string[];
  alt: string;
}

export default function ProductGallery({ images, alt }: ProductGalleryProps) {
  const slides = images;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

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

  /* Lock body scroll + close on Escape while the lightbox is open */
  useEffect(() => {
    if (!isZoomed) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsZoomed(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isZoomed]);

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

        {/* Zoom button */}
        <button
          type='button'
          onClick={() => setIsZoomed(true)}
          aria-label='Zoom image'
          className='absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white/90 text-gray-700 shadow-sm backdrop-blur transition-all duration-300 hover:border-primary hover:text-primary'
        >
          <FiMaximize2 className='h-4 w-4' />
        </button>
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

      {/* ── Zoom lightbox ── */}
      <div
        role='dialog'
        aria-modal='true'
        aria-label='Zoomed product image'
        onClick={() => setIsZoomed(false)}
        className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 transition-opacity duration-300 ${
          isZoomed ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <button
          type='button'
          onClick={() => setIsZoomed(false)}
          aria-label='Close zoom'
          className='absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25'
        >
          <FiX className='h-5 w-5' />
        </button>

        <div
          onClick={(e) => e.stopPropagation()}
          className={`relative h-[80vh] w-full max-w-4xl transition-transform duration-300 ${
            isZoomed ? 'scale-100' : 'scale-95'
          }`}
        >
          <Image
            src={slides[selectedIndex]}
            alt={`${alt} — zoomed image ${selectedIndex + 1}`}
            fill
            sizes='100vw'
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
}
