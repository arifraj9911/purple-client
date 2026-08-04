'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { bannerSlides } from '@/data/banners';

export default function Banner() {
  const [, forceRender] = useState(0);
  const [hovered, setHovered] = useState(false);

  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      duration: 10,
    },
    [autoplay],
  );

  /* ── Derive from emblaApi ── */
  const selectedIndex = emblaApi?.selectedScrollSnap() ?? 0;
  const scrollSnaps = emblaApi ? [...emblaApi.scrollSnapList()] : [];

  /* ── Navigation ── */
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index: number) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  /* ── Embla events → re-render ── */
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

  /* ── Pause autoplay on hover ── */
  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    emblaApi?.plugins().autoplay?.stop();
  }, [emblaApi]);

  const handleMouseLeave = useCallback(() => {
    setHovered(false);
    emblaApi?.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <section
      className='relative w-full h-95 sm:h-110 md:h-125 lg:h-140 overflow-hidden group'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label='Promotional banner slider'
    >
      {/* ══════ Embla mechanical layer (hidden — drives timing & loop) ══════ */}
      <div className='overflow-hidden' ref={emblaRef}>
        <div className='flex' aria-hidden='true'>
          {bannerSlides.map((slide) => (
            <div key={slide.id} className='h-0 flex-[0_0_100%]' />
          ))}
        </div>
      </div>

      {/* ══════ Visual layer — absolute overlay, pure crossfade ══════ */}
      <div className='absolute inset-0'>
        {bannerSlides.map((slide, idx) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-linear-to-br ${slide.bgColor} transition-opacity duration-700 ease-in-out`}
            style={{ opacity: idx === selectedIndex ? 1 : 0 }}
          >
            <div className='container mx-auto flex h-full flex-col-reverse items-center justify-center gap-3 px-4 py-4 sm:gap-4 sm:py-6 md:flex-row md:items-center md:justify-between md:gap-10 md:px-6 md:py-0 lg:px-8'>
              {/* ── Left: Content ── */}
              <div className='flex w-full flex-col items-center text-center md:w-1/2 md:items-start md:text-left'>
                <h2 className='font-heading text-xl font-bold leading-tight text-gray-900 whitespace-pre-line sm:text-3xl md:text-4xl lg:text-5xl'>
                  {slide.headline}
                </h2>
                <p className='mt-2 max-w-md text-xs leading-relaxed text-gray-600 sm:mt-4 sm:text-base lg:text-lg'>
                  {slide.subHeadline}
                </p>
                <Link
                  href={slide.ctaLink}
                  className='mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-xs font-semibold text-white transition-colors hover:bg-primary-dark sm:mt-6 sm:px-8 sm:py-3 sm:text-base'
                >
                  {slide.ctaText}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-3.5 w-3.5 sm:h-4 sm:w-4'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9 5l7 7-7 7'
                    />
                  </svg>
                </Link>
              </div>

              {/* ── Right: Product Image (mobile: above text, centered) ── */}
              <div className='relative h-40 w-full sm:h-48 sm:w-3/4 md:h-80 md:w-1/2 lg:h-96'>
                <Image
                  src={slide.image}
                  alt={slide.headline.replace('\n', ' ')}
                  fill
                  className='object-contain md:object-right'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  priority={slide.id <= 2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── Prev / Next Arrows (at viewport edges, outside container) ── */}
      <button
        onClick={scrollPrev}
        className={`absolute lg:-left-1! 2xl:left-4! top-1/2 z-20 -translate-y-1/2 text-gray-500 transition-all duration-300 hover:text-primary hidden sm:block ${hovered ? 'opacity-100' : 'opacity-0'}`}
        aria-label='Previous slide'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10'
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
        className={`absolute lg:-right-1! 2xl:right-4! top-1/2 z-20 -translate-y-1/2 text-gray-500 transition-all duration-300 hover:text-primary hidden sm:block ${hovered ? 'opacity-100' : 'opacity-0'}`}
        aria-label='Next slide'
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-7 w-7 sm:h-8 sm:w-8 lg:h-10 lg:w-10'
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
          strokeWidth={2}
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M9 5l7 7-7 7' />
        </svg>
      </button>

      {/* ── Dot Indicators ── */}
      {scrollSnaps.length > 1 && (
        <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 sm:bottom-6'>
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === selectedIndex ? 'w-7 bg-primary shadow-sm' : 'w-2 bg-gray-400/60 hover:bg-gray-500'}`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
