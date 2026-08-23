'use client';

export type PaymentMethod = 'cod' | 'bkash' | 'ssl';

interface PaymentMethodFormProps {
  value: PaymentMethod;
  onChange: (value: PaymentMethod) => void;
}

const OPTIONS: { value: PaymentMethod; label: string; desc: string }[] = [
  {
    value: 'cod',
    label: 'Cash on Delivery',
    desc: 'Pay with cash when your order arrives',
  },
  {
    value: 'bkash',
    label: 'bKash',
    desc: 'Pay via your bKash mobile wallet',
  },
  {
    value: 'ssl',
    label: 'SSL Commerz',
    desc: 'Card, mobile or internet banking',
  },
];

export default function PaymentMethodForm({
  value,
  onChange,
}: PaymentMethodFormProps) {
  return (
    <div className='space-y-3'>
      {OPTIONS.map((option) => {
        const active = value === option.value;
        return (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center rounded-lg border p-3.5 transition-colors ${
              active
                ? 'border-primary bg-primary-light/40'
                : 'border-gray-300 hover:border-gray-300'
            }`}
          >
            <input
              type='radio'
              name='payment-method'
              checked={active}
              onChange={() => onChange(option.value)}
              className='h-4 w-4 accent-primary'
            />
            <span className='ml-2.5'>
              <span className='block text-sm font-medium text-gray-800'>
                {option.label}
              </span>
              <span className='block text-xs text-gray-500'>{option.desc}</span>
            </span>
          </label>
        );
      })}
    </div>
  );
}
