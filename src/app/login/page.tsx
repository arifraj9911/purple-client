import type { Metadata } from 'next';
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
      <LoginForm />
    </AuthLayout>
  );
}
