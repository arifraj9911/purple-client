import type { Metadata } from 'next';
import { AuthLayout, OtpForm } from '@/components/auth';

export const metadata: Metadata = {
  title: 'Verify Email — Purple BD',
  description: 'Verify your email with the code we sent you.',
};

interface VerifyOtpPageProps {
  searchParams: Promise<{ email?: string }>;
}

export default async function VerifyOtpPage({
  searchParams,
}: VerifyOtpPageProps) {
  const { email } = await searchParams;

  return (
    <AuthLayout title='Verify Your Email' breadcrumbLabel='Verify OTP'>
      <OtpForm email={email ?? ''} />
    </AuthLayout>
  );
}
