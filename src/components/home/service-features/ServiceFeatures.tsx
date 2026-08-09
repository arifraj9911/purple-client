'use client';

import Link from 'next/link';

/* ─── Icon Components ─── */

function DeliveryIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 sm:h-8 sm:w-8'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.5}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12'
      />
    </svg>
  );
}

function ShippingIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 sm:h-8 sm:w-8'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.5}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z'
      />
    </svg>
  );
}

function RefundIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 sm:h-8 sm:w-8'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.5}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182M8.25 12h-3.5a.75.75 0 0 0-.75.75v4.5c0 .414.336.75.75.75H6m10.5-7.5h2.25a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75H18m-6 0h-1.5a.75.75 0 0 1-.75-.75V8.25A.75.75 0 0 1 10.5 7.5h3a.75.75 0 0 1 .75.75v8.25a.75.75 0 0 1-.75.75ZM12 7.5v-.75'
      />
    </svg>
  );
}

function HappyCustomersIcon() {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className='h-6 w-6 sm:h-8 sm:w-8'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      strokeWidth={1.5}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z'
      />
    </svg>
  );
}

/* ─── Data ─── */

const features = [
  {
    id: 1,
    icon: <DeliveryIcon />,
    title: 'Fast Delivery',
    description: 'Free delivery on orders above ৳2,000 across Bangladesh.',
    link: '/shipping',
  },
  {
    id: 2,
    icon: <ShippingIcon />,
    title: 'Shipping Policy',
    description: 'Know our simple and transparent shipping process.',
    link: '/shipping',
  },
  {
    id: 3,
    icon: <RefundIcon />,
    title: 'Easy Refund',
    description:
      'Hassle-free 7-day refund & return policy for your peace of mind.',
    link: '/refund',
  },
  {
    id: 4,
    icon: <HappyCustomersIcon />,
    title: '5,000+ Happy Customers',
    description:
      'Join thousands of satisfied artisans & creators across Bangladesh.',
    link: '/about',
  },
];

/* ─── Component ─── */

export default function ServiceFeatures() {
  return (
    <section className='bg-white py-8 sm:py-10 lg:py-14'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8'>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
          {features.map((feature) => (
            <Link
              key={feature.id}
              href={feature.link}
              className='group flex flex-col items-center rounded-xl border border-gray-100 bg-gray-50 p-4 md:p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg '
            >
              {/* Icon */}
              <div className='mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary-light text-primary transition-colors group-hover:bg-primary group-hover:text-white sm:mb-4 sm:h-14 sm:w-14'>
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className='font-heading text-sm font-semibold text-gray-900 sm:text-lg'>
                {feature.title}
              </h3>

              {/* Description */}
              <p className='mt-1.5 text-xs leading-relaxed text-gray-500 sm:mt-2 sm:text-sm'>
                {feature.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
