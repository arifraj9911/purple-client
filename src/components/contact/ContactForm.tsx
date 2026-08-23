'use client';

import { useState, type FormEvent } from 'react';
import { FiCheck, FiLoader } from 'react-icons/fi';

interface FormState {
  name: string;
  phone: string;
  message: string;
}

const INITIAL_STATE: FormState = {
  name: '',
  phone: '',
  message: '',
};

export default function ContactForm() {
  const [values, setValues] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (field: keyof FormState, value: string) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!values.name.trim()) next.name = 'Name is required';
    if (!values.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Mock submission — replace with an API call later.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);

    setSent(true);
    setValues(INITIAL_STATE);
  };

  const fieldClass = (hasError?: string) =>
    `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary ${
      hasError ? 'border-red-400' : 'border-gray-300'
    }`;

  if (sent) {
    return (
      <div className='flex h-full flex-col items-center justify-center rounded-2xl border border-gray-300 bg-white p-10 text-center'>
        <div className='mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10'>
          <FiCheck className='h-7 w-7 text-accent' />
        </div>
        <h2 className='font-heading text-lg font-semibold text-gray-900'>
          Message Sent!
        </h2>
        <p className='mt-1 text-sm text-gray-500'>
          Thank you for reaching out. We&apos;ll get back to you soon.
        </p>
        <button
          onClick={() => setSent(false)}
          className='mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
        >
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className='space-y-4 rounded-2xl border border-gray-300 bg-white p-5 sm:p-6'
    >
      <h2 className='font-heading text-lg font-semibold text-gray-900'>
        Send Us a Message
      </h2>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div>
          <label
            htmlFor='ct-name'
            className='mb-1.5 block text-sm font-medium text-gray-700'
          >
            Full Name *
          </label>
          <input
            id='ct-name'
            type='text'
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder='Your full name'
            className={fieldClass(errors.name)}
          />
          {errors.name && (
            <p className='mt-1 text-xs text-red-500'>{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='ct-phone'
            className='mb-1.5 block text-sm font-medium text-gray-700'
          >
            Phone <span className='text-gray-400'>(optional)</span>
          </label>
          <input
            id='ct-phone'
            type='tel'
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder='01XXXXXXXXX'
            className={fieldClass()}
          />
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='ct-message'
            className='mb-1.5 block text-sm font-medium text-gray-700'
          >
            Message *
          </label>
          <textarea
            id='ct-message'
            rows={5}
            value={values.message}
            onChange={(e) => set('message', e.target.value)}
            placeholder='How can we help you?'
            className={`${fieldClass(errors.message)} resize-none`}
          />
          {errors.message && (
            <p className='mt-1 text-xs text-red-500'>{errors.message}</p>
          )}
        </div>
      </div>

      <button
        type='submit'
        disabled={loading}
        className='flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark disabled:cursor-not-allowed disabled:opacity-70'
      >
        {loading && <FiLoader className='h-4 w-4 animate-spin' />}
        {loading ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
}
