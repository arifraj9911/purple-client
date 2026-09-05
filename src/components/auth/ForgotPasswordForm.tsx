'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import AuthTextField from './AuthTextField';
import { isValidEmail } from '@/lib/auth';
import { useForgotPasswordMutation } from '@/hooks/useAuthMutations';
import { extractErrorMessage } from '@/lib/toast';

export default function ForgotPasswordForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [formError, setFormError] = useState('');

  const forgotPasswordMutation = useForgotPasswordMutation();

  const validate = (): boolean => {
    if (!email.trim()) {
      setError('Email address is required');
      return false;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError('');

    if (!validate()) return;

    try {
      await forgotPasswordMutation.mutateAsync({
        email: email.trim(),
      });

      // Redirect directly to Reset Password page with email prefilled
      router.push(
        `/reset-password?email=${encodeURIComponent(email.trim())}`
      );
    } catch (err: any) {
      const errMsg = extractErrorMessage(err, 'Could not send reset code.');
      setFormError(errMsg);
    }
  };

  const isSubmitting = forgotPasswordMutation.isPending;

  return (
    <form onSubmit={handleSubmit} noValidate className='space-y-5'>
      <p className='text-sm text-gray-600'>
        Enter the email address associated with your account. We will send you a 4-digit code to reset your password.
      </p>

      <AuthTextField
        id='forgot-email'
        label='Email Address'
        type='email'
        value={email}
        onChange={(val) => {
          setEmail(val);
          if (error) setError('');
        }}
        placeholder='you@example.com'
        error={error}
        autoComplete='email'
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
        {isSubmitting ? 'Sending reset code…' : 'Send Reset Code'}
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
