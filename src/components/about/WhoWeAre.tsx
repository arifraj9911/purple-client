import Image from 'next/image';
import { story } from '@/data/about';

export default function WhoWeAre() {
  return (
    <section className='bg-white py-12 lg:py-16'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='grid items-center gap-8 lg:grid-cols-2 lg:gap-12'>
          <div>
            <h2 className='font-heading text-2xl font-bold text-gray-900 sm:text-3xl'>
              {story.title}
            </h2>

            <div className='mt-4 space-y-3 text-sm leading-relaxed text-gray-600 sm:text-base'>
              {story.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className='mt-6 grid gap-4 sm:grid-cols-2'>
              <div className='rounded-xl border border-gray-100 bg-gray-50 p-4'>
                <h3 className='font-heading text-sm font-semibold text-primary'>
                  Our Mission
                </h3>
                <p className='mt-1.5 text-sm leading-relaxed text-gray-600'>
                  {story.mission}
                </p>
              </div>
              <div className='rounded-xl border border-gray-100 bg-gray-50 p-4'>
                <h3 className='font-heading text-sm font-semibold text-primary'>
                  Our Vision
                </h3>
                <p className='mt-1.5 text-sm leading-relaxed text-gray-600'>
                  {story.vision}
                </p>
              </div>
            </div>
          </div>

          <div className='relative aspect-4/3 overflow-hidden rounded-2xl'>
            <Image
              src={story.image}
              alt='Purple BD workshop'
              fill
              sizes='(max-width: 1024px) 100vw, 50vw'
              className='object-cover'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
