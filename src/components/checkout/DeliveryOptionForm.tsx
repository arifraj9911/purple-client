'use client';

export type DeliveryOption = 'inside' | 'outside';

interface DeliveryOptionFormProps {
  value: DeliveryOption;
  onChange: (value: DeliveryOption) => void;
}

const OPTIONS: { value: DeliveryOption; label: string; price: number }[] = [
  { value: 'inside', label: 'Inside Dhaka', price: 60 },
  { value: 'outside', label: 'Outside Dhaka', price: 120 },
];

export default function DeliveryOptionForm({
  value,
  onChange,
}: DeliveryOptionFormProps) {
  return (
    <div className='space-y-3'>
      {OPTIONS.map((option) => {
        const active = value === option.value;
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center justify-between rounded-lg border p-3.5 transition-colors ${
              active
                ? 'border-primary bg-primary-light/40'
                : 'border-gray-300 hover:border-gray-300'
            }`}
          >
            <span className='flex items-center gap-2.5'>
              <input
                type='radio'
                name='delivery-option'
                checked={active}
                onChange={() => onChange(option.value)}
                className='h-4 w-4 accent-primary'
              />
              <span className='text-sm font-medium text-gray-800'>
                {option.label}
              </span>
            </span>
            <span className='text-sm font-semibold text-gray-900'>
              ৳{option.price}
            </span>
          </label>
        );
      })}
    </div>
  );
}
