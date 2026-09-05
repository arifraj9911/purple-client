'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiCheck, FiLoader, FiAlertCircle } from 'react-icons/fi';
import OtpInput from './OtpInput';
import { OTP_LENGTH } from '@/lib/auth';
import { useVerifyOtpMutation, useResendOtpMutation } from '@/hooks/useAuthMutations';
import { extractErrorMessage } from '@/lib/toast';
import type { OtpPurpose } from '@/types/auth.types';

const RESEND_COOLDOWN_SECONDS = 300; // 5 minutes cooldown

interface OtpFormProps {
  email: string;
  purpose?: OtpPurpose;
}

export default function OtpForm({
  email,
  purpose = 'EMAIL_VERIFICATION',
}: OtpFormProps) {
  const router = useRouter();

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [verified, setVerified] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);

  const verifyOtpMutation = useVerifyOtpMutation();
  const resendOtpMutation = useResendOtpMutation();

  // Countdown timer for resend button availability
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (otp.length !== OTP_LENGTH) {
      setError(`Please enter the complete ${OTP_LENGTH}-digit code.`);
      return;
    }

    setError('');

    try {
      await verifyOtpMutation.mutateAsync({
        email: email.trim(),
        code: otp.trim(),
        purpose,
      });

      if (purpose === 'PASSWORD_RESET') {
        // Proceed to Reset Password page with verified code
        router.push(
          `/reset-password?email=${encodeURIComponent(email.trim())}&otp=${encodeURIComponent(otp.trim())}`
        );
      } else {
        setVerified(true);
      }
    } catch (err: any) {
      const errMsg = extractErrorMessage(err, 'Invalid or expired verification code.');
      setError(errMsg);
      setOtp('');
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || resendOtpMutation.isPending) return;

    setError('');
    try {
      await resendOtpMutation.mutateAsync({
        email: email.trim(),
        purpose,
      });
      setSecondsLeft(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err, 'Could not resend code. Please try again later.');
      setError(errMsg);
    }
  };

  const isVerifying = verifyOtpMutation.isPending;
  const isResending = resendOtpMutation.isPending;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

  /* ── Verified success state (For Email Verification) ── */
  if (verified) {
    return (
      <div className='flex flex-col items-center py-4 text-center'>
        <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100'>
          <FiCheck className='h-7 w-7 text-green-600' />
        </div>
        <h2 className='font-heading text-lg font-semibold text-gray-900'>
          Email Verified Successfully
        </h2>
        <p className='mt-2 max-w-xs text-sm text-gray-500'>
          Your account has been activated. You can now log in to your account.
        </p>
        <Link
          href='/login'
          className='mt-6 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark shadow-sm'
        >
          Continue to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className='space-y-6'>
      <div className='text-center'>
        <p className='text-sm text-gray-600'>
          We have sent a {OTP_LENGTH}-digit verification code to
        </p>
        <p className='mt-1 font-semibold text-gray-900 break-all'>
          {email || 'your email'}
        </p>
      </div>

      <OtpInput
        length={OTP_LENGTH}
        value={otp}
        onChange={(val) => {
          setOtp(val);
          if (error) setError('');
        }}
        disabled={isVerifying}
        hasError={!!error}
      />

      {error && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center justify-center gap-2'>
          <FiAlertCircle className='h-4 w-4 shrink-0 text-red-500' />
          <span>{error}</span>
        </div>
      )}

      <button
        type='submit'
        disabled={otp.length !== OTP_LENGTH || isVerifying}
        className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70 shadow-sm'
      >
        {isVerifying && <FiLoader className='h-4 w-4 animate-spin' />}
        {isVerifying ? 'Verifying…' : 'Verify Code'}
      </button>

      <div className='text-center text-sm text-gray-600'>
        {secondsLeft > 0 ? (
          <p>
            Resend code in{' '}
            <span className='font-semibold text-gray-900'>
              {formattedTime}
            </span>
          </p>
        ) : (
          <button
            type='button'
            onClick={handleResend}
            disabled={isResending}
            className='inline-flex items-center gap-1.5 font-semibold text-primary transition-colors hover:text-primary-dark disabled:opacity-60'
          >
            {isResending && <FiLoader className='h-3.5 w-3.5 animate-spin' />}
            {isResending ? 'Sending new code…' : 'Resend code'}
          </button>
        )}
      </div>

      <p className='text-center text-sm text-gray-500'>
        <Link
          href={purpose === 'PASSWORD_RESET' ? '/forgot-password' : '/register'}
          className='font-medium text-primary hover:text-primary-dark transition-colors'
        >
          {purpose === 'PASSWORD_RESET' ? 'Change email for reset' : 'Change email'}
        </Link>
      </p>
    </form>
  );
}
