'use client';

import { useState } from 'react';
import { FiEdit2, FiMapPin, FiPlus, FiTrash2 } from 'react-icons/fi';
import { addresses as seedAddresses, type Address } from '@/data/user';
import AddressForm from './AddressForm';

export default function AddressesSection() {
  const [list, setList] = useState<Address[]>(seedAddresses);
  const [draft, setDraft] = useState<Address | null>(null);

  const startAdd = () =>
    setDraft({
      id: 0,
      label: '',
      name: '',
      phone: '',
      city: '',
      zone: '',
      address: '',
      isDefault: list.length === 0,
    });

  const startEdit = (address: Address) => setDraft({ ...address });

  const save = (values: Address) => {
    setList((prev) => {
      const next = values.isDefault
        ? prev.map((a) => ({ ...a, isDefault: false }))
        : [...prev];

      if (values.id !== 0 && prev.some((a) => a.id === values.id)) {
        return next.map((a) =>
          a.id === values.id ? { ...values, isDefault: values.isDefault } : a,
        );
      }

      const newId = prev.reduce((max, a) => Math.max(max, a.id), 0) + 1;
      return [...next, { ...values, id: newId }];
    });
    setDraft(null);
  };

  const remove = (id: number) => {
    if (!window.confirm('Delete this address?')) return;
    setList((prev) => prev.filter((a) => a.id !== id));
  };

  const setDefault = (id: number) =>
    setList((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));

  if (draft) {
    return (
      <AddressForm
        initial={draft}
        onSave={save}
        onCancel={() => setDraft(null)}
      />
    );
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between'>
        <h3 className='font-heading text-base font-semibold text-gray-900'>
          Saved Addresses
        </h3>
        <button
          onClick={startAdd}
          className='flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
        >
          <FiPlus className='h-4 w-4' />
          Add New
        </button>
      </div>

      {list.length === 0 ? (
        <div className='flex flex-col items-center rounded-xl border border-dashed border-gray-200 bg-white py-14 text-center'>
          <FiMapPin className='mb-2 h-8 w-8 text-gray-300' />
          <p className='text-sm text-gray-500'>No saved addresses yet.</p>
          <button
            onClick={startAdd}
            className='mt-3 text-sm font-semibold text-primary hover:text-primary-dark'
          >
            Add an address
          </button>
        </div>
      ) : (
        <div className='grid gap-4 sm:grid-cols-2'>
          {list.map((address) => (
            <div
              key={address.id}
              className='relative rounded-xl border border-gray-200 bg-white p-4'
            >
              {address.isDefault && (
                <span className='absolute right-3 top-3 rounded-full bg-primary-light px-2 py-0.5 text-[11px] font-semibold text-primary'>
                  Default
                </span>
              )}
              <div className='flex items-center gap-2'>
                <FiMapPin className='h-4 w-4 shrink-0 text-primary' />
                <p className='font-semibold text-gray-900'>
                  {address.label || 'Address'}
                </p>
              </div>
              <p className='mt-2 text-sm text-gray-700'>
                {address.name} · {address.phone}
              </p>
              <p className='text-sm text-gray-500'>{address.address}</p>
              <p className='text-sm text-gray-500'>
                {address.zone && `${address.zone}, `}
                {address.city}
              </p>

              <div className='mt-3 flex flex-wrap items-center gap-3 border-t border-gray-100 pt-3 text-sm'>
                <button
                  onClick={() => startEdit(address)}
                  className='flex items-center gap-1 font-medium text-primary transition-colors hover:text-primary-dark'
                >
                  <FiEdit2 className='h-3.5 w-3.5' />
                  Edit
                </button>
                <button
                  onClick={() => remove(address.id)}
                  className='flex items-center gap-1 font-medium text-red-500 transition-colors hover:text-red-600'
                >
                  <FiTrash2 className='h-3.5 w-3.5' />
                  Delete
                </button>
                {!address.isDefault && (
                  <button
                    onClick={() => setDefault(address.id)}
                    className='ml-auto font-medium text-gray-500 transition-colors hover:text-primary'
                  >
                    Set as default
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
