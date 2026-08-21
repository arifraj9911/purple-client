'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight, FiArrowRight } from 'react-icons/fi';
import b1 from '@/assets/images/bb1.png';
import b2 from '@/assets/images/bb2.png';
import b3 from '@/assets/images/bb4.png';

interface Slide {
  id: number;
  image: typeof b1;
  badge: string;
  title: string;
  description: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: b1,
    badge: 'Big Sale',
    title: 'Up to 50% Off',
    description:
      'Discover the best products at unbeatable prices. Shop your favorites before the deal ends.',
  },
  {
    id: 2,
    image: b2,
    badge: 'New Arrivals',
    title: 'Fresh Styles, Just Landed',
    description:
      'Explore our latest collection of premium handicrafts and art supplies, curated just for you.',
  },
  {
    id: 3,
    image: b3,
    badge: 'Handmade in BD',
    title: 'Authentic Handicrafts',
    description:
      'Artisan-made treasures that tell a story. Support local craftsmanship with every purchase.',
  },
  
];

const AUTOPLAY_DELAY = 5000;

export default function Banner() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goTo = useCallback((index: number) => {
    setActiveIndex(((index % slides.length) + slides.length) % slides.length);
  }, []);

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  /* ── Autoplay ── */
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className='bg-gray-50'>
      <div className='container mx-auto px-2 md:px-4'>
        <div
          className='group relative overflow-hidden'
          aria-label='Promotional banner slider'
        >
          {/* ── Slides (crossfade) ── */}
          <div className='relative h-140 md:h-120 lg:h-110'>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                aria-hidden={index !== activeIndex}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
                }`}
              >
                <div className='grid h-full grid-cols-1 items-center gap-2 lg:grid-cols-[1fr_1fr] lg:gap-2'>
                  {/* ── Left: content ── */}
                  <div className='relative z-10 pt-4 pl-4 text-center sm:pl-6 lg:pt-0 lg:pl-16 lg:text-left'>
                    <span className='inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary shadow-sm'>
                      {slide.badge}
                    </span>
                    <h2 className='mt-3 font-heading text-3xl font-bold leading-[1.1] text-gray-900 sm:text-4xl lg:text-[2.75rem] xl:text-5xl'>
                      {slide.title}
                    </h2>
                    <p className='mx-auto mt-2 max-w-md text-sm leading-relaxed text-gray-700 sm:text-base lg:mx-0'>
                      {slide.description}
                    </p>
                    <div className='mt-5 lg:mt-6'>
                      <Link
                        href='/shop'
                        className='inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-primary-dark hover:shadow-primary/40 sm:px-7 sm:text-base'
                      >
                        Shop Now
                        <FiArrowRight className='h-4 w-4' />
                      </Link>
                    </div>
                  </div>

                  {/* ── Right: transparent product image ── */}
                  <div className='relative flex items-center justify-center pr-4 sm:pr-6 lg:pr-10'>
                    <span className='absolute h-60 w-60 rounded-full bg-white/60 blur-2xl sm:h-72 sm:w-72 md:h-76 md:w-76 lg:h-104 lg:w-104 xl:h-112 xl:w-md' />
                    <div className='relative h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-96 lg:w-96 xl:h-100 xl:w-100'>
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes='(max-width: 1024px) 50vw, 512px'
                        priority={slide.id === 1}
                        className='object-contain drop-shadow-2xl'
                      />
                    </div>
                  </div>
                </div>
              </div>
          ))}
        </div>

        {/* ── Dot indicators ── */}
        <div className='absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2'>
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type='button'
              onClick={() => goTo(index)}
              className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-7 bg-primary shadow-sm'
                  : 'w-2 bg-gray-300 hover:bg-gray-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            />
          ))}
        </div>

        {/* ── Prev / Next arrows ── */}
        <button
          onClick={goPrev}
          type='button'
          aria-label='Previous slide'
          className='pointer-events-none absolute left-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-2 text-gray-700 opacity-0 transition-opacity duration-300 hover:text-primary focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover:pointer-events-auto group-hover:opacity-100 sm:left-0'
        >
          <FiChevronLeft className='h-6 w-6 sm:h-9 sm:w-9' />
        </button>

        <button
          onClick={goNext}
          type='button'
          aria-label='Next slide'
          className='pointer-events-none absolute right-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-2 text-gray-700 opacity-0 transition-opacity duration-300 hover:text-primary focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover:pointer-events-auto group-hover:opacity-100 sm:right-4'
        >
          <FiChevronRight className='h-6 w-6 sm:h-9 sm:w-9' />
        </button>
        </div>
      </div>
    </section>
  );
}
