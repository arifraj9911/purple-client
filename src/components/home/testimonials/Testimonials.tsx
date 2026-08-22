'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { FiStar } from 'react-icons/fi';
import { testimonials, type Testimonial } from '@/data/testimonials';

/* ─── Testimonial Card ─── */

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className='relative flex h-full flex-col rounded-2xl border border-gray-300 bg-white'>
      {/* Quote Icon — half outside the card top */}
      <span className='absolute -top-5 left-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-4 w-4'
          fill='currentColor'
          viewBox='0 0 24 24'
        >
          <path d='M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z' />
        </svg>
      </span>

      {/* Rating */}
      <div className='mt-4 flex items-center gap-0.5 px-6 pt-6 sm:px-7 sm:pt-7'>
        {[1, 2, 3, 4, 5].map((star) => (
          <FiStar
            key={star}
            className={`h-3.5 w-3.5 ${
              star <= testimonial.rating
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Comment */}
      <p className='mt-3 flex-1 px-6 text-sm leading-relaxed text-gray-600 sm:px-7'>
        {testimonial.comment}
      </p>

      {/* Divider + Avatar + Name */}
      <div className='mt-5 flex items-center gap-3 border-t border-gray-100 px-6 pb-5 pt-4 sm:px-7 sm:pb-6'>
        <Image
          src={testimonial.image}
          alt={testimonial.name}
          width={44}
          height={44}
          className='h-11 w-11 rounded-full object-cover ring-2 ring-primary-light'
        />
        <div>
          <p className='text-sm font-semibold text-gray-900'>
            {testimonial.name}
          </p>
          <p className='text-xs text-gray-400'>{testimonial.location}</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Section ─── */

export default function Testimonials() {
  const [, forceRender] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    skipSnaps: false,
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

  return (
    <section className='bg-gray-50 py-8 sm:py-12'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        {/* ── Header ── */}
        <div className='mb-4 flex items-end justify-between md:mb-8'>
          <div>
            <span className='inline-block rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary'>
            Customer Reviews
            </span>
            <h2 className='mt-1 font-heading text-2xl font-bold text-gray-900 sm:text-3xl md:mt-2.5'>
              What Our Customers Say
            </h2>
          </div>

          {/* Arrows */}
          <div className='flex shrink-0 items-center gap-1'>
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              className='flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-gray-400 bg-white text-gray-500 transition-colors hover:border-primary hover:text-primary disabled:opacity-30'
              aria-label='Previous testimonial'
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
              aria-label='Next testimonial'
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
        <div className='overflow-hidden py-6' ref={emblaRef}>
          <div className='flex items-stretch gap-3 sm:gap-5 md:gap-6'>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className='w-[65vw] min-w-0 shrink-0 sm:w-[60vw] md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(33.333%-16px)] 2xl:w-[calc(33.333%-16px)]'
              >
                <TestimonialCard testimonial={testimonial} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
