'use client';

import { useState, useEffect, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import AuthTextField from './AuthTextField';
import GoogleSignInButton from './GoogleSignInButton';
import { isValidEmail } from '@/lib/auth';
import { useLoginMutation } from '@/hooks/useAuthMutations';
import { extractErrorMessage } from '@/lib/toast';

interface LoginErrors {
  email?: string;
  password?: string;
}

const REMEMBER_ME_KEY = 'purple_remembered_email';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') || '/user-dashboard';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState('');
  const [needsVerification, setNeedsVerification] = useState(false);

  const loginMutation = useLoginMutation();

  // Restore remembered email on mount
  useEffect(() => {
    try {
      const savedEmail = localStorage.getItem(REMEMBER_ME_KEY);
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberMe(true);
      }
    } catch {
      // ignore localStorage errors in SSR/privacy mode
    }
  }, []);

  const validate = (): boolean => {
    const next: LoginErrors = {};
    if (!email.trim()) {
      next.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      next.email = 'Enter a valid email address';
    }
    if (!password) {
      next.password = 'Password is required';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError('');
    setNeedsVerification(false);

    if (!validate()) return;

    try {
      await loginMutation.mutateAsync({
        email: email.trim(),
        password,
      });

      // Save or remove remembered email in localStorage
      try {
        if (rememberMe) {
          localStorage.setItem(REMEMBER_ME_KEY, email.trim());
        } else {
          localStorage.removeItem(REMEMBER_ME_KEY);
        }
      } catch {
        // ignore localStorage errors
      }

      router.push(redirectUrl);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err, 'Failed to login. Please check your credentials.');
      setFormError(errMsg);

      // Check if server rejected due to unverified email (HTTP 403)
      if (err?.response?.status === 403 && errMsg.toLowerCase().includes('verify')) {
        setNeedsVerification(true);
      }
    }
  };

  const isSubmitting = loginMutation.isPending;

  return (
    <form onSubmit={handleSubmit} noValidate className='space-y-4'>
      <AuthTextField
        id='login-email'
        label='Email'
        type='email'
        value={email}
        onChange={(val) => {
          setEmail(val);
          if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
        }}
        placeholder='you@example.com'
        error={errors.email}
        autoComplete='email'
      />

      <AuthTextField
        id='login-password'
        label='Password'
        type='password'
        value={password}
        onChange={(val) => {
          setPassword(val);
          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        placeholder='Enter your password'
        error={errors.password}
        autoComplete='current-password'
      />

      <div className='flex items-center justify-between text-sm'>
        <label className='flex cursor-pointer items-center gap-2 text-gray-600'>
          <input
            type='checkbox'
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
          />
          Remember me
        </label>
        <Link
          href='/forgot-password'
          className='font-semibold text-primary hover:text-primary-dark transition-colors'
        >
          Forgot password?
        </Link>
      </div>

      {formError && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 flex flex-col gap-2'>
          <div className='flex items-center gap-2 font-medium'>
            <FiAlertCircle className='h-4 w-4 shrink-0 text-red-500' />
            <span>{formError}</span>
          </div>
          {needsVerification && (
            <Link
              href={`/verify-otp?email=${encodeURIComponent(email.trim())}&purpose=EMAIL_VERIFICATION`}
              className='mt-1 inline-flex items-center justify-center rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-red-700 transition-colors'
            >
              Verify Email with OTP
            </Link>
          )}
        </div>
      )}

      <button
        type='submit'
        disabled={isSubmitting}
        className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70 shadow-sm'
      >
        {isSubmitting && <FiLoader className='h-4 w-4 animate-spin' />}
        {isSubmitting ? 'Logging in…' : 'Login'}
      </button>

      <div className='relative my-2'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-200' />
        </div>
        <div className='relative flex justify-center text-xs'>
          <span className='bg-white px-3 text-gray-500'>or continue with</span>
        </div>
      </div>

      <GoogleSignInButton />

      <p className='text-center text-sm text-gray-600 pt-2'>
        Don&apos;t have an account?{' '}
        <Link
          href='/register'
          className='font-semibold text-primary hover:text-primary-dark transition-colors'
        >
          Register
        </Link>
      </p>
    </form>
  );
}
