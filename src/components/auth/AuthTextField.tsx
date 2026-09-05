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
  disabled?: boolean;
  readOnly?: boolean;
}

/** Reusable labeled input with error display, password visibility toggle, and disabled/dimmed support. */
export default function AuthTextField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  disabled = false,
  readOnly = false,
}: AuthTextFieldProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const isDimmed = disabled || readOnly;

  const fieldClass = [
    'w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition-colors',
    isDimmed
      ? 'bg-gray-100/90 text-gray-500 border-gray-200 cursor-not-allowed select-none'
      : 'bg-white text-gray-900 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary',
    error && !isDimmed ? 'border-red-400' : isDimmed ? 'border-gray-200' : 'border-gray-200',
    isPassword ? 'pr-10' : '',
  ].join(' ');

  return (
    <div>
      <label
        htmlFor={id}
        className={`mb-1.5 block text-sm font-medium ${
          isDimmed ? 'text-gray-500' : 'text-gray-700'
        }`}
      >
        {label}
      </label>

      <div className='relative'>
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={(e) => {
            if (!isDimmed) onChange(e.target.value);
          }}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          readOnly={readOnly}
          className={fieldClass}
        />
        {isPassword && !isDimmed && (
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

      {error && !isDimmed && <p className='mt-1 text-xs text-red-500'>{error}</p>}
    </div>
  );
}
