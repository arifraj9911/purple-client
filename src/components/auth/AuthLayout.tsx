import type { ReactNode } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';

interface AuthLayoutProps {
  title: string;
  subtitle?: string;
  breadcrumbLabel: string;
  children: ReactNode;
  footer?: ReactNode;
}

/**
 * Shared shell for the auth pages (login, register, OTP verify).
 * Renders the breadcrumb and a centered card.
 */
export default function AuthLayout({
  title,
  subtitle,
  breadcrumbLabel,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className='bg-gray-50'>
      {/* ── Breadcrumb ── */}
      <div className='container mx-auto px-4 pt-6 md:px-6 lg:px-8'>
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: breadcrumbLabel }]}
        />
      </div>

      <div className='container mx-auto px-4 py-8 pb-16 md:px-6 lg:px-8'>
        <div className='mx-auto max-w-md'>
          {/* ── Card ── */}
          <div className='rounded-2xl border border-gray-200 bg-white p-6 sm:p-8'>
            <h1 className='text-center font-heading text-xl font-bold text-gray-900 sm:text-2xl'>
              {title}
            </h1>
            {subtitle ? (
              <p className='mt-2 text-center text-sm text-gray-500'>
                {subtitle}
              </p>
            ) : null}
            <div className='mt-6'>{children}</div>
          </div>

          {footer ? (
            <div className='mt-5 text-center text-sm text-gray-600'>
              {footer}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
