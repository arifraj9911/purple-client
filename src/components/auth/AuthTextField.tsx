'use client';

import { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';

interface AuthTextFieldProps {
  id: string;
  label: string;
  type?: 'text' | 'email' | 'password';
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  autoComplete?: string;
}

/** Reusable labeled input with error display and a password visibility toggle. */
export default function AuthTextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
}: AuthTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const fieldClass = [
    'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors',
    'placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary',
    error ? 'border-red-400' : 'border-gray-200',
    isPassword ? 'pr-10' : '',
  ].join(' ');

  return (
    <div>
      <label
        htmlFor={id}
        className='mb-1.5 block text-sm font-medium text-gray-700'
      >
        {label}
      </label>

      <div className='relative'>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={fieldClass}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 transition-colors hover:text-gray-600'
          >
            {showPassword ? (
              <FiEyeOff className='h-4 w-4' />
            ) : (
              <FiEye className='h-4 w-4' />
            )}
          </button>
        )}
      </div>

      {error && <p className='mt-1 text-xs text-red-500'>{error}</p>}
    </div>
  );
}
