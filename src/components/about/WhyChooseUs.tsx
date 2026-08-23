import Image from 'next/image';
import type { IconType } from 'react-icons';
import { FiFeather, FiTruck, FiRefreshCw, FiShield } from 'react-icons/fi';
import { whyChooseUs } from '@/data/about';

const ICONS: IconType[] = [FiFeather, FiTruck, FiRefreshCw, FiShield];

export default function WhyChooseUs() {
  return (
    <section className='bg-white py-12 lg:py-16'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='grid items-center gap-8 lg:grid-cols-2 lg:gap-12'>
          <div className='relative h-64 w-full overflow-hidden rounded-2xl sm:h-80 lg:h-[25rem]'>
            <Image
              src={whyChooseUs.image}
              alt='Why choose Purple BD'
              fill
              sizes='(max-width: 1024px) 100vw, 50vw'
            />
          </div>

          <div>
            <h2 className='font-heading text-2xl font-bold text-gray-900 sm:text-3xl'>
              Why Choose Purple BD
            </h2>
            <p className='mt-3 text-sm text-gray-500 sm:text-base'>
              More than a store — here is why creators across Bangladesh trust
              us.
            </p>

            <ul className='mt-6 space-y-4'>
              {whyChooseUs.items.map((item, index) => {
                const Icon = ICONS[index];
                return (
                  <li key={item.id} className='flex items-start gap-4'>
                    <span className='flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary-light text-primary'>
                      <Icon className='h-5 w-5' />
                    </span>
                    <div>
                      <h3 className='font-heading text-sm font-semibold text-gray-900 sm:text-base'>
                        {item.title}
                      </h3>
                      <p className='mt-0.5 text-sm leading-relaxed text-gray-500'>
                        {item.description}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
