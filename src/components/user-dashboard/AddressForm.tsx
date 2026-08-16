'use client';

import { useState, type FormEvent } from 'react';
import { type Address } from '@/data/user';

interface AddressFormProps {
  initial: Address;
  onSave: (values: Address) => void;
  onCancel: () => void;
}

const CITIES = [
  'Dhaka',
  'Chattogram',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh',
];

export default function AddressForm({
  initial,
  onSave,
  onCancel,
}: AddressFormProps) {
  const [values, setValues] = useState<Address>(initial);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const set = (field: keyof Address, value: string | boolean) =>
    setValues((prev) => ({ ...prev, [field]: value }));

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = 'Name is required';
    if (!values.phone.trim()) next.phone = 'Phone is required';
    if (!values.city) next.city = 'Select a city';
    if (!values.address.trim()) next.address = 'Address is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;
    onSave({ ...values, label: values.label.trim() || 'Address' });
  };

  const fieldClass = (hasError?: string) =>
    `w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary ${
      hasError ? 'border-red-400' : 'border-gray-200'
    }`;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className='rounded-xl border border-gray-200 bg-white p-5 sm:p-6'
    >
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='font-heading text-base font-semibold text-gray-900'>
          {initial.id === 0 ? 'Add Address' : 'Edit Address'}
        </h3>
        <button
          type='button'
          onClick={onCancel}
          className='text-sm font-medium text-gray-500 transition-colors hover:text-primary'
        >
          Cancel
        </button>
      </div>

      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <div>
          <label
            htmlFor='addr-label'
            className='mb-1.5 block text-sm font-medium text-gray-700'
          >
            Label
          </label>
          <input
            id='addr-label'
            type='text'
            value={values.label}
            onChange={(e) => set('label', e.target.value)}
            placeholder='e.g. Home, Office'
            className={fieldClass()}
          />
        </div>

        <div>
          <label
            htmlFor='addr-name'
            className='mb-1.5 block text-sm font-medium text-gray-700'
          >
            Full Name *
          </label>
          <input
            id='addr-name'
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
            htmlFor='addr-phone'
            className='mb-1.5 block text-sm font-medium text-gray-700'
          >
            Phone *
          </label>
          <input
            id='addr-phone'
            type='tel'
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            placeholder='01XXXXXXXXX'
            className={fieldClass(errors.phone)}
          />
          {errors.phone && (
            <p className='mt-1 text-xs text-red-500'>{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            htmlFor='addr-city'
            className='mb-1.5 block text-sm font-medium text-gray-700'
          >
            City *
          </label>
          <select
            id='addr-city'
            value={values.city}
            onChange={(e) => set('city', e.target.value)}
            className={fieldClass(errors.city)}
          >
            <option value=''>Select city</option>
            {CITIES.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className='mt-1 text-xs text-red-500'>{errors.city}</p>
          )}
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='addr-zone'
            className='mb-1.5 block text-sm font-medium text-gray-700'
          >
            Area / Zone
          </label>
          <input
            id='addr-zone'
            type='text'
            value={values.zone}
            onChange={(e) => set('zone', e.target.value)}
            placeholder='e.g. Dhanmondi'
            className={fieldClass()}
          />
        </div>

        <div className='sm:col-span-2'>
          <label
            htmlFor='addr-address'
            className='mb-1.5 block text-sm font-medium text-gray-700'
          >
            Full Address *
          </label>
          <textarea
            id='addr-address'
            rows={3}
            value={values.address}
            onChange={(e) => set('address', e.target.value)}
            placeholder='House, road, block, area...'
            className={`${fieldClass(errors.address)} resize-none`}
          />
          {errors.address && (
            <p className='mt-1 text-xs text-red-500'>{errors.address}</p>
          )}
        </div>

        <label className='flex items-center gap-2 text-sm text-gray-600 sm:col-span-2'>
          <input
            type='checkbox'
            checked={values.isDefault}
            onChange={(e) => set('isDefault', e.target.checked)}
            className='h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary'
          />
          Set as default address
        </label>
      </div>

      <button
        type='submit'
        className='mt-5 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
      >
        Save Address
      </button>
    </form>
  );
}
