'use client';

export interface AddressFormValues {
  name: string;
  phone: string;
  email: string;
  city: string;
  zone: string;
  address: string;
}

interface ShippingAddressFormProps {
  values: AddressFormValues;
  onChange: (values: AddressFormValues) => void;
  errors: Partial<Record<keyof AddressFormValues, string>>;
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

const DHAKA_ZONES = [
  'Dhanmondi',
  'Gulshan',
  'Mohammadpur',
  'Uttara',
  'Mirpur',
  'Banani',
  'Bashundhara',
  'Khilgaon',
];

const OTHER_ZONES = ['City Area', 'Suburb'];

const baseField =
  'w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary';

const fieldClass = (hasError: boolean) =>
  `${baseField} ${hasError ? 'border-red-400' : 'border-gray-300'}`;

export default function ShippingAddressForm({
  values,
  onChange,
  errors,
}: ShippingAddressFormProps) {
  const set = (field: keyof AddressFormValues, value: string) =>
    onChange({ ...values, [field]: value });

  const zoneOptions = values.city === 'Dhaka' ? DHAKA_ZONES : OTHER_ZONES;

  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
      {/* Full name */}
      <div className='sm:col-span-2'>
        <label
          htmlFor='co-name'
          className='mb-1.5 block text-sm font-medium text-gray-700'
        >
          Full Name *
        </label>
        <input
          id='co-name'
          type='text'
          value={values.name}
          onChange={(e) => set('name', e.target.value)}
          placeholder='Your full name'
          className={fieldClass(!!errors.name)}
        />
        {errors.name && (
          <p className='mt-1 text-xs text-red-500'>{errors.name}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor='co-phone'
          className='mb-1.5 block text-sm font-medium text-gray-700'
        >
          Phone *
        </label>
        <input
          id='co-phone'
          type='tel'
          value={values.phone}
          onChange={(e) => set('phone', e.target.value)}
          placeholder='01XXXXXXXXX'
          className={fieldClass(!!errors.phone)}
        />
        {errors.phone && (
          <p className='mt-1 text-xs text-red-500'>{errors.phone}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor='co-email'
          className='mb-1.5 block text-sm font-medium text-gray-700'
        >
          Email <span className='text-gray-400'>(optional)</span>
        </label>
        <input
          id='co-email'
          type='email'
          value={values.email}
          onChange={(e) => set('email', e.target.value)}
          placeholder='you@example.com'
          className={fieldClass(!!errors.email)}
        />
        {errors.email && (
          <p className='mt-1 text-xs text-red-500'>{errors.email}</p>
        )}
      </div>

      {/* City */}
      <div>
        <label
          htmlFor='co-city'
          className='mb-1.5 block text-sm font-medium text-gray-700'
        >
          City *
        </label>
        <select
          id='co-city'
          value={values.city}
          onChange={(e) => set('city', e.target.value)}
          className={fieldClass(!!errors.city)}
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

      {/* Zone / Area */}
      <div>
        <label
          htmlFor='co-zone'
          className='mb-1.5 block text-sm font-medium text-gray-700'
        >
          Zone / Area *
        </label>
        <select
          id='co-zone'
          value={values.zone}
          onChange={(e) => set('zone', e.target.value)}
          disabled={!values.city}
          className={`${fieldClass(!!errors.zone)} disabled:cursor-not-allowed disabled:bg-gray-50`}
        >
          <option value=''>Select area</option>
          {zoneOptions.map((zone) => (
            <option key={zone} value={zone}>
              {zone}
            </option>
          ))}
        </select>
        {errors.zone && (
          <p className='mt-1 text-xs text-red-500'>{errors.zone}</p>
        )}
      </div>

      {/* Full address */}
      <div className='sm:col-span-2'>
        <label
          htmlFor='co-address'
          className='mb-1.5 block text-sm font-medium text-gray-700'
        >
          Full Address *
        </label>
        <textarea
          id='co-address'
          rows={3}
          value={values.address}
          onChange={(e) => set('address', e.target.value)}
          placeholder='House, road, block, area...'
          className={`${fieldClass(!!errors.address)} resize-none`}
        />
        {errors.address && (
          <p className='mt-1 text-xs text-red-500'>{errors.address}</p>
        )}
      </div>
    </div>
  );
}
