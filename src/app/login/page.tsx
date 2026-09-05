import type { Metadata } from 'next';
import { Suspense } from 'react';
import { AuthLayout, LoginForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Login — Purple BD',
  description: 'Log in to your Purple BD account.',
};

export default function LoginPage() {
  return (
    <AuthLayout
      title='Login'
      subtitle='Log in to continue shopping'
      breadcrumbLabel='Login'
    >
      <Suspense fallback={<div className='py-8 text-center text-sm text-gray-500'>Loading login form...</div>}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
