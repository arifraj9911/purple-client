import Image from 'next/image';
import { hero } from '@/data/about';

export default function Hero() {
  return (
    <section className='relative overflow-hidden'>
      <Image
        src={hero.image}
        alt={hero.title}
        fill
        priority
        sizes='100vw'
      />
      <div className='absolute inset-0 bg-secondary/70' />

      <div className='relative mx-auto max-w-3xl px-4 py-20 text-center text-white sm:py-24 lg:py-32'>
        <p className='text-xs font-semibold uppercase tracking-widest text-primary-light sm:text-sm'>
          {hero.eyebrow}
        </p>
        <h1 className='mt-3 font-heading text-3xl font-bold text-white sm:text-4xl lg:text-5xl'>
          {hero.title}
        </h1>
        <p className='mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-100 sm:text-base'>
          {hero.subtitle}
        </p>
      </div>
    </section>
  );
}
