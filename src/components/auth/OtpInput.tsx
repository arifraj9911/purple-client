'use client';

import { useRef, type KeyboardEvent } from 'react';

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

/**
 * Row of single-digit boxes for OTP entry.
 * Handles auto-advance, backspace to the previous box, and pasting a full code.
 */
export default function OtpInput({
  length = 4,
  value,
  onChange,
  disabled = false,
  hasError = false,
}: OtpInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  const focusInput = (index: number) => {
    const clamped = Math.max(0, Math.min(index, length - 1));
    inputs.current[clamped]?.focus();
  };

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, '');

    // Deleting the character at this position.
    if (digits === '') {
      onChange(value.slice(0, index) + value.slice(index + 1));
      return;
    }

    // Pasting (or fast typing) several digits — spread them across the boxes.
    if (digits.length > 1) {
      const merged = value.slice(0, index) + digits;
      onChange(merged.slice(0, length));
      focusInput(index + digits.length);
      return;
    }

    // A single digit typed into this box.
    const next = value.slice(0, index) + digits + value.slice(index + 1);
    onChange(next.slice(0, length));
    focusInput(index + 1);
  };

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    // Move back when Backspace is pressed on an already-empty box.
    if (event.key === 'Backspace' && !value[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  const boxClass = [
    'h-12 w-12 rounded-lg border text-center text-lg font-semibold text-gray-900 outline-none transition-colors',
    'focus:border-primary focus:ring-1 focus:ring-primary',
    hasError ? 'border-red-400' : 'border-gray-200',
    disabled ? 'bg-gray-50' : 'bg-white',
  ].join(' ');

  return (
    <div className='flex justify-center gap-2 sm:gap-3'>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            inputs.current[index] = el;
          }}
          type='text'
          inputMode='numeric'
          autoComplete={index === 0 ? 'one-time-code' : 'off'}
          maxLength={length}
          value={value[index] ?? ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled}
          className={boxClass}
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  );
}
