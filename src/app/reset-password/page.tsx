import type { Metadata } from 'next';
import { AuthLayout, ResetPasswordForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Reset Password — Purple BD',
  description: 'Create a new secure password for your Purple BD account.',
};

interface ResetPasswordPageProps {
  searchParams: Promise<{ email?: string; otp?: string }>;
}

export default async function ResetPasswordPage({
  searchParams,
}: ResetPasswordPageProps) {
  const { email, otp } = await searchParams;

  return (
    <AuthLayout
      title='Reset Password'
      subtitle='Set a new password for your account'
      breadcrumbLabel='Reset Password'
    >
      <ResetPasswordForm initialEmail={email ?? ''} initialOtp={otp ?? ''} />
    </AuthLayout>
  );
}
