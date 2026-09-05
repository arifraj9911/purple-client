import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { AuthLayout, OtpForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Verify Email — Purple BD',
  description: 'Verify your email code to activate your account.',
};

interface VerifyOtpPageProps {
  searchParams: Promise<{ email?: string; purpose?: string }>;
}

export default async function VerifyOtpPage({
  searchParams,
}: VerifyOtpPageProps) {
  const { email, purpose: rawPurpose } = await searchParams;

  if (rawPurpose === 'PASSWORD_RESET') {
    redirect(`/reset-password?email=${encodeURIComponent(email ?? '')}`);
  }

  return (
    <AuthLayout
      title='Verify Your Email'
      subtitle='Enter the 4-digit code sent to your email to activate your account'
      breadcrumbLabel='Verify OTP'
    >
      <OtpForm email={email ?? ''} purpose='EMAIL_VERIFICATION' />
    </AuthLayout>
  );
}
