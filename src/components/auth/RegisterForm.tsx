'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiLoader } from 'react-icons/fi';
import AuthTextField from './AuthTextField';
import GoogleSignInButton from './GoogleSignInButton';
import { isValidEmail, sendOtp } from '@/lib/auth';

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

/** Registration data kept in session storage until OTP is verified. */
interface PendingRegistration {
  name: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const next: RegisterErrors = {};
    if (!name.trim()) next.name = 'Full name is required';
    if (!email.trim()) next.email = 'Email is required';
    else if (!isValidEmail(email)) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    else if (password.length < 6)
      next.password = 'Password must be at least 6 characters';
    if (!confirmPassword) next.confirmPassword = 'Please confirm your password';
    else if (confirmPassword !== password)
      next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    const sent = await sendOtp(email);
    setLoading(false);

    if (!sent) {
      setErrors((prev) => ({
        ...prev,
        email: 'Could not send a code to this email.',
      }));
      return;
    }

    // Keep the registration data so signup can complete after OTP verification.
    const pending: PendingRegistration = {
      name: name.trim(),
      email: email.trim(),
      password,
    };
    sessionStorage.setItem('pendingRegistration', JSON.stringify(pending));

    router.push(`/verify-otp?email=${encodeURIComponent(email.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} noValidate className='space-y-4'>
      <AuthTextField
        id='register-name'
        label='Full Name'
        value={name}
        onChange={setName}
        placeholder='Your full name'
        error={errors.name}
        autoComplete='name'
      />

      <AuthTextField
        id='register-email'
        label='Email'
        type='email'
        value={email}
        onChange={setEmail}
        placeholder='you@example.com'
        error={errors.email}
        autoComplete='email'
      />

      <AuthTextField
        id='register-password'
        label='Password'
        type='password'
        value={password}
        onChange={setPassword}
        placeholder='At least 6 characters'
        error={errors.password}
        autoComplete='new-password'
      />

      <AuthTextField
        id='register-confirm-password'
        label='Confirm Password'
        type='password'
        value={confirmPassword}
        onChange={setConfirmPassword}
        placeholder='Re-enter your password'
        error={errors.confirmPassword}
        autoComplete='new-password'
      />

      <label className='flex items-start gap-2 text-sm text-gray-600'>
        <input
          type='checkbox'
          className='mt-0.5 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
        />
        <span>I agree to the Terms &amp; Conditions</span>
      </label>

      <button
        type='submit'
        disabled={loading}
        className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70'
      >
        {loading && <FiLoader className='h-4 w-4 animate-spin' />}
        {loading ? 'Sending code…' : 'Create Account'}
      </button>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t border-gray-200' />
        </div>
        <div className='relative flex justify-center text-xs'>
          <span className='bg-white px-3 text-gray-500'>or continue with</span>
        </div>
      </div>

      <GoogleSignInButton />

      <p className='text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <Link
          href='/login'
          className='font-semibold text-primary hover:text-primary-dark'
        >
          Login
        </Link>
      </p>
    </form>
  );
}
