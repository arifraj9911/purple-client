import type { Metadata } from 'next';
import { AuthLayout, RegisterForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Create Account — Purple BD',
  description: 'Create a new Purple BD account.',
};

export default function RegisterPage() {
  return (
    <AuthLayout
      title='Create an Account'
      subtitle='Join Purple BD to shop faster and track your orders'
      breadcrumbLabel='Register'
    >
      <RegisterForm />
    </AuthLayout>
  );
}
