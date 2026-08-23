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
          className='group relative overflow-hidden rounded-xl sm:rounded-2xl lg:rounded-none'
          aria-label='Promotional banner slider'
        >
          {/* ── Slides (crossfade) ── */}
          <div className='relative h-80 sm:h-96 md:h-104 lg:h-110'>
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                aria-hidden={index !== activeIndex}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === activeIndex ? 'z-10 opacity-100' : 'z-0 opacity-0'
                }`}
              >
                {/* ── Background image with subtle light-dark overlay (Mobile only) ── */}
                <div className='absolute inset-0 z-0 overflow-hidden bg-gray-100 lg:hidden'>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    sizes='(max-width: 1024px) 100vw, 1200px'
                    priority={slide.id === 1}
                    className='object-contain object-center'
                  />
                  {/* Subtle dark overlay */}
                  <div className='absolute inset-0 bg-black/40' />
                </div>

                <div className='relative z-10 grid h-full grid-cols-1 items-center lg:grid-cols-[1fr_1fr] lg:gap-2'>
                  {/* ── Content (Center aligned on small devices, Left aligned on lg) ── */}
                  <div className='flex flex-col items-center justify-center px-4 text-center sm:px-6 lg:items-start lg:justify-center lg:pl-16 lg:text-left'>
                    <span className='inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-primary shadow-md sm:px-4 sm:py-1.5 sm:text-xs'>
                      {slide.badge}
                    </span>
                    <h2 className='mt-2.5 font-heading text-2xl font-bold leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.7)] sm:text-3xl lg:mt-3 lg:text-[2.75rem] lg:text-gray-900 lg:drop-shadow-none xl:text-5xl'>
                      {slide.title}
                    </h2>
                    <p className='mx-auto mt-2 max-w-xs text-xs font-medium leading-relaxed text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.7)] sm:max-w-md sm:text-sm lg:mx-0 lg:max-w-md lg:text-base lg:font-normal lg:text-gray-700 lg:drop-shadow-none'>
                      {slide.description}
                    </p>
                    <div className='mt-4 sm:mt-5 lg:mt-6'>
                      <Link
                        href='/shop'
                        className='inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-primary/30 transition-all duration-200 hover:bg-primary-dark hover:shadow-primary/40 sm:px-7 sm:py-3 sm:text-base'
                      >
                        Shop Now
                        <FiArrowRight className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
                      </Link>
                    </div>
                  </div>

                  {/* ── Right: transparent product image (Desktop only) ── */}
                  <div className='relative hidden items-center justify-center pr-4 sm:pr-6 lg:flex lg:pr-10'>
                    <span className='absolute h-60 w-60 rounded-full bg-white/60 blur-2xl sm:h-72 sm:w-72 md:h-76 md:w-76 lg:h-104 lg:w-104 xl:h-112 xl:w-md' />
                    <div className='relative h-48 w-48 sm:h-60 sm:w-60 md:h-72 md:w-72 lg:h-96 lg:w-96 xl:h-100 xl:w-100'>
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        sizes='(max-width: 1024px) 50vw, 400px'
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
          <div className='absolute bottom-3 sm:bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2'>
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                type='button'
                onClick={() => goTo(index)}
                className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'w-7 bg-primary shadow-sm'
                    : 'w-2 bg-gray-400/80 lg:bg-gray-300 hover:bg-gray-600 lg:hover:bg-gray-500'
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
            className='pointer-events-none absolute left-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-2 text-white lg:text-gray-700 opacity-0 transition-opacity duration-300 hover:text-primary focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover:pointer-events-auto group-hover:opacity-100 sm:left-0'
          >
            <FiChevronLeft className='h-6 w-6 sm:h-9 sm:w-9' />
          </button>

          <button
            onClick={goNext}
            type='button'
            aria-label='Next slide'
            className='pointer-events-none absolute right-3 top-1/2 z-20 -translate-y-1/2 cursor-pointer border-0 bg-transparent p-2 text-white lg:text-gray-700 opacity-0 transition-opacity duration-300 hover:text-primary focus-visible:pointer-events-auto focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary group-hover:pointer-events-auto group-hover:opacity-100 sm:right-4'
          >
            <FiChevronRight className='h-6 w-6 sm:h-9 sm:w-9' />
          </button>
        </div>
      </div>
    </section>
  );
}
