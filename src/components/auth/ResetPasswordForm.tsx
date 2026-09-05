'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import AuthTextField from './AuthTextField';
import { isValidEmail } from '@/lib/auth';
import { useResetPasswordMutation, useResendOtpMutation } from '@/hooks/useAuthMutations';
import { extractErrorMessage } from '@/lib/toast';

interface ResetPasswordErrors {
  email?: string;
  otp?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const PASSWORD_PATTERN = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
const RESEND_COOLDOWN_SECONDS = 300; // 5 minutes cooldown

interface ResetPasswordFormProps {
  initialEmail?: string;
  initialOtp?: string;
}

export default function ResetPasswordForm({
  initialEmail = '',
  initialOtp = '',
}: ResetPasswordFormProps) {
  const router = useRouter();

  const [email, setEmail] = useState(initialEmail);
  const [otp, setOtp] = useState(initialOtp);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [formError, setFormError] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_COOLDOWN_SECONDS);

  const resetPasswordMutation = useResetPasswordMutation();
  const resendOtpMutation = useResendOtpMutation();

  // 5-minute countdown timer for resend button
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secondsLeft]);

  const validate = (): boolean => {
    const next: ResetPasswordErrors = {};

    if (!email.trim()) {
      next.email = 'Email address is required';
    } else if (!isValidEmail(email)) {
      next.email = 'Please enter a valid email address';
    }

    if (!otp.trim()) {
      next.otp = '4-digit OTP code is required';
    } else if (otp.trim().length !== 4) {
      next.otp = 'OTP must be exactly 4 digits';
    }

    if (!newPassword) {
      next.newPassword = 'New password is required';
    } else if (newPassword.length < 8) {
      next.newPassword = 'Password must be at least 8 characters long';
    } else if (!PASSWORD_PATTERN.test(newPassword)) {
      next.newPassword = 'Must contain at least 1 uppercase, 1 lowercase, and 1 number or symbol';
    }

    if (!confirmPassword) {
      next.confirmPassword = 'Please confirm your new password';
    } else if (confirmPassword !== newPassword) {
      next.confirmPassword = 'Passwords do not match';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError('');

    if (!validate()) return;

    try {
      await resetPasswordMutation.mutateAsync({
        email: email.trim().toLowerCase(),
        otp: otp.trim(),
        newPassword,
      });

      router.push('/login');
    } catch (err: any) {
      const errMsg = extractErrorMessage(err, 'Failed to reset password.');
      setFormError(errMsg);
    }
  };

  const handleResend = async () => {
    if (!email.trim() || !isValidEmail(email)) {
      setFormError('Please enter a valid email address to resend OTP.');
      return;
    }

    if (secondsLeft > 0 || resendOtpMutation.isPending) return;

    setFormError('');
    try {
      await resendOtpMutation.mutateAsync({
        email: email.trim(),
        purpose: 'PASSWORD_RESET',
      });
      setSecondsLeft(RESEND_COOLDOWN_SECONDS);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err, 'Could not resend OTP. Please wait before trying again.');
      setFormError(errMsg);
    }
  };

  const isSubmitting = resetPasswordMutation.isPending;
  const isResending = resendOtpMutation.isPending;

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const formattedTime = `${minutes}:${String(seconds).padStart(2, '0')}`;

  return (
    <form onSubmit={handleSubmit} noValidate className='space-y-4'>
      <div className='text-sm text-gray-600 bg-purple-50/60 p-3 rounded-xl border border-purple-100'>
        <p>
          We sent a 4-digit code to{' '}
          <span className='font-semibold text-gray-900 break-all'>
            {email || 'your email'}
          </span>
          . Enter the code and your new password below.
        </p>
      </div>

      <AuthTextField
        id='reset-email'
        label='Email Address'
        type='email'
        value={email}
        onChange={(val) => {
          setEmail(val);
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        placeholder='you@example.com'
        error={errors.email}
        autoComplete='email'
        disabled={Boolean(initialEmail)}
        readOnly={Boolean(initialEmail)}
      />

      <div>
        <AuthTextField
          id='reset-otp'
          label='4-Digit OTP Code'
          type='text'
          value={otp}
          onChange={(val) => {
            setOtp(val.replace(/\D/g, '').slice(0, 4));
            if (errors.otp) setErrors((prev) => ({ ...prev, otp: undefined }));
          }}
          placeholder='1234'
          error={errors.otp}
          autoComplete='one-time-code'
        />
        <div className='mt-1.5 flex items-center justify-between text-xs text-gray-500'>
          <span>Didn&apos;t get the code?</span>
          {secondsLeft > 0 ? (
            <span className='font-medium text-gray-600'>
              Resend in <span className='font-bold text-gray-900'>{formattedTime}</span>
            </span>
          ) : (
            <button
              type='button'
              onClick={handleResend}
              disabled={isResending}
              className='font-semibold text-primary hover:text-primary-dark transition-colors disabled:opacity-60'
            >
              {isResending ? 'Sending…' : 'Resend code'}
            </button>
          )}
        </div>
      </div>

      <AuthTextField
        id='reset-new-password'
        label='New Password'
        type='password'
        value={newPassword}
        onChange={(val) => {
          setNewPassword(val);
          if (errors.newPassword) setErrors((prev) => ({ ...prev, newPassword: undefined }));
        }}
        placeholder='Min 8 chars, 1 upper, 1 lower, 1 number'
        error={errors.newPassword}
        autoComplete='new-password'
      />

      <AuthTextField
        id='reset-confirm-password'
        label='Confirm New Password'
        type='password'
        value={confirmPassword}
        onChange={(val) => {
          setConfirmPassword(val);
          if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }}
        placeholder='Re-enter new password'
        error={errors.confirmPassword}
        autoComplete='new-password'
      />

      {formError && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2'>
          <FiAlertCircle className='h-4 w-4 shrink-0 text-red-500' />
          <span>{formError}</span>
        </div>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70 shadow-sm'
      >
        {isSubmitting && <FiLoader className='h-4 w-4 animate-spin' />}
        {isSubmitting ? 'Resetting password…' : 'Reset Password'}
      </button>

      <p className='text-center text-sm text-gray-600 pt-2'>
        Remember your password?{' '}
        <Link
          href='/login'
          className='font-semibold text-primary hover:text-primary-dark transition-colors'
        >
          Back to Login
        </Link>
      </p>
    </form>
  );
}
