'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import banner1 from '@/assets/images/banner1.png';
import banner2 from '@/assets/images/banner2.png';
import banner3 from '@/assets/images/banner3.png';

const slides = [
  { id: 1, image: banner1, alt: 'Banner 1' },
  { id: 2, image: banner2, alt: 'Banner 2' },
  { id: 3, image: banner3, alt: 'Banner 3' },
];

export default function Banner() {
  const [, forceRender] = useState(0);

  const autoplay = Autoplay({ delay: 5000, stopOnInteraction: false });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      duration: 20,
    },
    [autoplay],
  );

  /* ── Derive from emblaApi ── */
  const selectedIndex = emblaApi?.selectedScrollSnap() ?? 0;
  const scrollSnaps = emblaApi ? [...emblaApi.scrollSnapList()] : [];
  const canScrollPrev = emblaApi?.canScrollPrev() ?? false;
  const canScrollNext = emblaApi?.canScrollNext() ?? false;

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
    emblaApi?.plugins().autoplay?.stop();
  }, [emblaApi]);

  const handleMouseLeave = useCallback(() => {
    emblaApi?.plugins().autoplay?.play();
  }, [emblaApi]);

  return (
    <section className='container mx-auto bg-white'>
      <div
        className='group relative overflow-hidden'
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label='Promotional banner slider'
      >
        {/* ── Slider ── */}
        <div className='overflow-hidden' ref={emblaRef}>
          <div className='flex'>
            {slides.map((slide) => (
              <div
                key={slide.id}
                className='relative h-60 min-w-0 flex-[0_0_100%] sm:h-72 md:h-80 lg:h-96'
              >
                <Image
                  src={slide.image}
                  alt={slide.alt}
                  fill
                  sizes='(max-width: 1280px) 100vw, 1280px'
                  priority={slide.id === 1}
                  className='object-cover'
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Prev / Next Arrows — always visible ── */}
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          aria-label='Previous slide'
          className='absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur transition-all duration-200 hover:bg-primary hover:text-white disabled:opacity-0 sm:left-4 sm:h-11 sm:w-11'
        >
          <FiChevronLeft className='h-5 w-5 sm:h-6 sm:w-6' />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          aria-label='Next slide'
          className='absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow-md backdrop-blur transition-all duration-200 hover:bg-primary hover:text-white disabled:opacity-0 sm:right-4 sm:h-11 sm:w-11'
        >
          <FiChevronRight className='h-5 w-5 sm:h-6 sm:w-6' />
        </button>

        {/* ── Dot Indicators ── */}
        {scrollSnaps.length > 1 && (
          <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2'>
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === selectedIndex
                    ? 'w-7 bg-primary shadow-sm'
                    : 'w-2 bg-white/80 hover:bg-white'
                }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === selectedIndex ? 'true' : undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
