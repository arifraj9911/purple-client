'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiLoader, FiAlertCircle } from 'react-icons/fi';
import AuthTextField from './AuthTextField';
import GoogleSignInButton from './GoogleSignInButton';
import { isValidEmail } from '@/lib/auth';
import { useRegisterMutation } from '@/hooks/useAuthMutations';
import { extractErrorMessage } from '@/lib/toast';

interface RegisterErrors {
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
}

const PASSWORD_PATTERN = /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

export default function RegisterForm() {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [formError, setFormError] = useState('');

  const registerMutation = useRegisterMutation();

  const validate = (): boolean => {
    const next: RegisterErrors = {};

    if (!fullName.trim()) {
      next.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      next.email = 'Email is required';
    } else if (!isValidEmail(email)) {
      next.email = 'Please enter a valid email address';
    }

    if (!password) {
      next.password = 'Password is required';
    } else if (password.length < 8) {
      next.password = 'Password must be at least 8 characters long';
    } else if (!PASSWORD_PATTERN.test(password)) {
      next.password = 'Must contain at least 1 uppercase, 1 lowercase, and 1 number or symbol';
    }

    if (!confirmPassword) {
      next.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      next.confirmPassword = 'Passwords do not match';
    }

    if (!agreeTerms) {
      next.terms = 'You must agree to the Terms & Conditions';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError('');

    if (!validate()) return;

    try {
      await registerMutation.mutateAsync({
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      // Save email for verification and redirect to verify-otp page
      router.push(`/verify-otp?email=${encodeURIComponent(email.trim())}&purpose=EMAIL_VERIFICATION`);
    } catch (err: any) {
      const errMsg = extractErrorMessage(err, 'Failed to create account.');
      setFormError(errMsg);
    }
  };

  const isSubmitting = registerMutation.isPending;

  return (
    <form onSubmit={handleSubmit} noValidate className='space-y-4'>
      <AuthTextField
        id='register-name'
        label='Full Name'
        value={fullName}
        onChange={(val) => {
          setFullName(val);
          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: undefined }));
        }}
        placeholder='e.g. Arif Raj'
        error={errors.fullName}
        autoComplete='name'
      />

      <AuthTextField
        id='register-email'
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
        id='register-password'
        label='Password'
        type='password'
        value={password}
        onChange={(val) => {
          setPassword(val);
          if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
        }}
        placeholder='Min 8 chars, 1 upper, 1 lower, 1 number'
        error={errors.password}
        autoComplete='new-password'
      />

      <AuthTextField
        id='register-confirm-password'
        label='Confirm Password'
        type='password'
        value={confirmPassword}
        onChange={(val) => {
          setConfirmPassword(val);
          if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
        }}
        placeholder='Re-enter your password'
        error={errors.confirmPassword}
        autoComplete='new-password'
      />

      <div className='space-y-1'>
        <label className='flex cursor-pointer items-start gap-2 text-sm text-gray-600'>
          <input
            type='checkbox'
            checked={agreeTerms}
            onChange={(e) => {
              setAgreeTerms(e.target.checked);
              if (errors.terms) setErrors((prev) => ({ ...prev, terms: undefined }));
            }}
            className='mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
          />
          <span>
            I agree to the{' '}
            <Link href='/terms' className='text-primary hover:underline'>
              Terms &amp; Conditions
            </Link>
          </span>
        </label>
        {errors.terms && <p className='text-xs text-red-500 pl-6'>{errors.terms}</p>}
      </div>

      {formError && (
        <div className='rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700 flex items-center gap-2'>
          <FiAlertCircle className='h-4 w-4 shrink-0 text-red-500' />
          <span>{formError}</span>
        </div>
      )}

      <button
        type='submit'
        disabled={isSubmitting || !agreeTerms}
        className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-primary shadow-sm'
      >
        {isSubmitting && <FiLoader className='h-4 w-4 animate-spin' />}
        {isSubmitting ? 'Creating account…' : 'Create Account'}
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
        Already have an account?{' '}
        <Link
          href='/login'
          className='font-semibold text-primary hover:text-primary-dark transition-colors'
        >
          Login
        </Link>
      </p>
    </form>
  );
}
