'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiLoader } from 'react-icons/fi';
import AuthTextField from './AuthTextField';
import GoogleSignInButton from './GoogleSignInButton';
import { isValidEmail, login as requestLogin } from '@/lib/auth';
import { useAuth } from '@/lib/auth-context';

interface LoginErrors {
  email?: string;
  password?: string;
}

export default function LoginForm() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = (): boolean => {
    const next: LoginErrors = {};
    if (!email.trim()) next.email = 'Email is required';
    else if (!isValidEmail(email)) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setFormError('');
    if (!validate()) return;

    setLoading(true);
    const ok = await requestLogin(email, password);
    setLoading(false);

    if (!ok) {
      setFormError('Invalid email or password. Please try again.');
      return;
    }

    login(email);
    router.push('/');
  };

  return (
    <form onSubmit={handleSubmit} noValidate className='space-y-4'>
      <AuthTextField
        id='login-email'
        label='Email'
        type='email'
        value={email}
        onChange={setEmail}
        placeholder='you@example.com'
        error={errors.email}
        autoComplete='email'
      />

      <AuthTextField
        id='login-password'
        label='Password'
        type='password'
        value={password}
        onChange={setPassword}
        placeholder='Enter your password'
        error={errors.password}
        autoComplete='current-password'
      />

      <div className='flex items-center justify-between text-sm'>
        <label className='flex items-center gap-2 text-gray-600'>
          <input
            type='checkbox'
            className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
          />
          Remember me
        </label>
        <Link
          href='/forgot-password'
          className='font-semibold text-primary hover:text-primary-dark'
        >
          Forgot password?
        </Link>
      </div>

      {formError && (
        <p className='rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600'>
          {formError}
        </p>
      )}

      <button
        type='submit'
        disabled={loading}
        className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70'
      >
        {loading && <FiLoader className='h-4 w-4 animate-spin' />}
        {loading ? 'Logging in…' : 'Login'}
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
        Don&apos;t have an account?{' '}
        <Link
          href='/register'
          className='font-semibold text-primary hover:text-primary-dark'
        >
          Register
        </Link>
      </p>
    </form>
  );
}
