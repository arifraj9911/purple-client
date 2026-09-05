import type { Metadata } from 'next';
import { AuthLayout, ForgotPasswordForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Forgot Password — Purple BD',
  description: 'Request a password reset code for your Purple BD account.',
};

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title='Forgot Password'
      subtitle='Recover access to your account'
      breadcrumbLabel='Forgot Password'
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
