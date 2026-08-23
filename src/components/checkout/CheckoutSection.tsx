import type { ReactNode } from 'react';

interface CheckoutSectionProps {
  step: number;
  title: string;
  children: ReactNode;
}

export default function CheckoutSection({
  step,
  title,
  children,
}: CheckoutSectionProps) {
  return (
    <section className='rounded-xl border border-gray-300 bg-white p-5'>
      <h2 className='mb-4 flex items-center gap-2.5 font-heading text-base font-semibold text-gray-900'>
        <span className='flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-light text-xs font-bold text-primary'>
          {step}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
