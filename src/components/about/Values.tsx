import type { IconType } from 'react-icons';
import { FiAward, FiHeart, FiFeather, FiDollarSign } from 'react-icons/fi';
import { values } from '@/data/about';

const ICONS: IconType[] = [FiAward, FiHeart, FiFeather, FiDollarSign];

export default function Values() {
  return (
    <section className='bg-gray-50 py-12 lg:py-16'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='font-heading text-2xl font-bold text-gray-900 sm:text-3xl'>
            Our Values
          </h2>
          <p className='mt-3 text-sm text-gray-500 sm:text-base'>
            The principles that guide everything we do.
          </p>
        </div>

        <div className='mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          {values.map((value, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={value.id}
                className='rounded-xl border border-gray-100 bg-white p-6 text-center transition-shadow hover:shadow-md'
              >
                <div className='mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary'>
                  <Icon className='h-6 w-6' />
                </div>
                <h3 className='font-heading text-base font-semibold text-gray-900'>
                  {value.title}
                </h3>
                <p className='mt-2 text-sm leading-relaxed text-gray-500'>
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
