import type { IconType } from 'react-icons';
import { FiAward, FiHeart, FiFeather, FiDollarSign } from 'react-icons/fi';
import { values } from '@/data/about';

const ICONS: IconType[] = [FiAward, FiHeart, FiFeather, FiDollarSign];

export default function Values() {
  return (
    <section className='bg-gray-50 py-8 sm:py-12'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='font-heading text-2xl font-bold text-gray-900 sm:text-3xl'>
            Our Values
          </h2>
          <p className='mt-2 text-xs text-gray-500 sm:mt-3 sm:text-sm md:text-base'>
            The principles that guide everything we do.
          </p>
        </div>

        <div className='mt-6 sm:mt-8 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4'>
          {values.map((value, index) => {
            const Icon = ICONS[index];
            return (
              <div
                key={value.id}
                className='group flex flex-col items-center rounded-lg border border-gray-300 bg-white p-4 md:pt-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg'
              >
                {/* Icon */}
                <div className='mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:mb-4 sm:h-12 sm:w-12'>
                  <Icon className='h-5 w-5 sm:h-6 sm:w-6' />
                </div>

                {/* Title */}
                <h3 className='font-heading text-sm font-semibold text-gray-900 sm:text-lg'>
                  {value.title}
                </h3>

                {/* Description */}
                <p className='mt-1.5 text-xs leading-tight text-gray-500 sm:mt-2 sm:text-sm'>
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
