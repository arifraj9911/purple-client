'use client';

import { useEffect, useState, type FormEvent } from 'react';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import OtpInput from './OtpInput';
import { OTP_LENGTH, sendOtp, verifyOtp } from '@/lib/auth';

const RESEND_COOLDOWN_SECONDS = 60;

interface OtpFormProps {
  email: string;
}

export default function OtpForm({ email }: OtpFormProps) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);
  const [resending, setResending] = useState(false);

  // Countdown before the resend button becomes available again.
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (otp.length !== OTP_LENGTH) return;

    setError('');
    setVerifying(true);
    const ok = await verifyOtp(email, otp);
    setVerifying(false);

    if (!ok) {
      setError('Invalid code. Please try again.');
      setOtp('');
      return;
    }
    setVerified(true);
  };

  const handleResend = async () => {
    setResending(true);
    await sendOtp(email);
    setResending(false);
    setSecondsLeft(RESEND_COOLDOWN_SECONDS);
  };

  /* ── Verified success state ── */
  if (verified) {
    return (
      <div className='flex flex-col items-center py-4 text-center'>
        <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10'>
          <FiCheck className='h-7 w-7 text-accent' />
        </div>
        <h2 className='font-heading text-lg font-semibold text-gray-900'>
          Email Verified
        </h2>
        <p className='mt-1 max-w-xs text-sm text-gray-500'>
          Your account has been created. You can now log in.
        </p>
        <Link
          href='/login'
          className='mt-5 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
        >
          Continue to Login
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className='space-y-6'>
      <p className='text-center text-sm text-gray-600'>
        We&apos;ve sent a {OTP_LENGTH}-digit verification code to{' '}
        <span className='font-semibold text-gray-900'>
          {email || 'your email'}
        </span>
      </p>

      <OtpInput
        length={OTP_LENGTH}
        value={otp}
        onChange={setOtp}
        disabled={verifying}
        hasError={!!error}
      />

      {error && (
        <p className='text-center text-sm font-medium text-red-500'>{error}</p>
      )}

      <button
        type='submit'
        disabled={otp.length !== OTP_LENGTH || verifying}
        className='flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70'
      >
        {verifying ? 'Verifying…' : 'Verify'}
      </button>

      <div className='text-center text-sm text-gray-600'>
        {secondsLeft > 0 ? (
          <p>
            Resend code in{' '}
            <span className='font-semibold text-gray-900'>
              0:{String(secondsLeft).padStart(2, '0')}
            </span>
          </p>
        ) : (
          <button
            type='button'
            onClick={handleResend}
            disabled={resending}
            className='font-semibold text-primary transition-colors hover:text-primary-dark disabled:opacity-60'
          >
            {resending ? 'Sending…' : 'Resend code'}
          </button>
        )}
      </div>

      <p className='text-center text-sm text-gray-500'>
        <Link
          href='/register'
          className='font-medium text-primary hover:text-primary-dark'
        >
          Change email
        </Link>
      </p>
    </form>
  );
}
