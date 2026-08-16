'use client';

import { useState, type FormEvent } from 'react';
import { FiCheck } from 'react-icons/fi';
import AuthTextField from '@/components/auth/AuthTextField';

export default function ChangePasswordSection() {
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const validate = (): boolean => {
    const e: Record<string, string> = {};
    if (!current) e.current = 'Current password is required';
    if (!next) e.next = 'New password is required';
    else if (next.length < 6) e.next = 'Password must be at least 6 characters';
    if (!confirm) e.confirm = 'Please confirm your new password';
    else if (confirm !== next) e.confirm = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSuccess(false);
    if (!validate()) return;

    // Mock update — replace with an API call later.
    setCurrent('');
    setNext('');
    setConfirm('');
    setSuccess(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className='space-y-4 rounded-xl border border-gray-200 bg-white p-5 sm:p-6'
    >
      <h3 className='font-heading text-base font-semibold text-gray-900'>
        Change Password
      </h3>

      <AuthTextField
        id='pw-current'
        label='Current Password'
        type='password'
        value={current}
        onChange={setCurrent}
        placeholder='Enter current password'
        error={errors.current}
        autoComplete='current-password'
      />

      <AuthTextField
        id='pw-new'
        label='New Password'
        type='password'
        value={next}
        onChange={setNext}
        placeholder='At least 6 characters'
        error={errors.next}
        autoComplete='new-password'
      />

      <AuthTextField
        id='pw-confirm'
        label='Confirm New Password'
        type='password'
        value={confirm}
        onChange={setConfirm}
        placeholder='Re-enter new password'
        error={errors.confirm}
        autoComplete='new-password'
      />

      {success && (
        <p className='flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2 text-sm font-medium text-accent'>
          <FiCheck className='h-4 w-4' />
          Password updated successfully.
        </p>
      )}

      <button
        type='submit'
        className='rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
      >
        Update Password
      </button>
    </form>
  );
}
