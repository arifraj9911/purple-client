'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FiCheck } from 'react-icons/fi';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useCart } from '@/lib/cart-context';
import EmptyCart from '@/components/cart/EmptyCart';
import CheckoutSection from './CheckoutSection';
import ShippingAddressForm, {
  type AddressFormValues,
} from './ShippingAddressForm';
import DeliveryOptionForm, { type DeliveryOption } from './DeliveryOptionForm';
import PaymentMethodForm, { type PaymentMethod } from './PaymentMethodForm';
import OrderSummary from './OrderSummary';

const SHIPPING_COST: Record<DeliveryOption, number> = {
  inside: 60,
  outside: 120,
};

export default function CheckoutPage() {
  const { items, subtotal } = useCart();

  const [address, setAddress] = useState<AddressFormValues>({
    name: '',
    phone: '',
    email: '',
    city: '',
    zone: '',
    address: '',
  });
  const [delivery, setDelivery] = useState<DeliveryOption>('inside');
  const [payment, setPayment] = useState<PaymentMethod>('cod');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState(false);

  const shipping = SHIPPING_COST[delivery];
  const total = subtotal + shipping;

  const validate = () => {
    const next: Record<string, string> = {};
    if (!address.name.trim()) next.name = 'Full name is required';
    if (!address.phone.trim()) {
      next.phone = 'Phone number is required';
    } else if (!/^01\d{9}$/.test(address.phone.replace(/\s/g, ''))) {
      next.phone = 'Enter a valid BD phone (01XXXXXXXXX)';
    }
    if (address.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) {
      next.email = 'Enter a valid email address';
    }
    if (!address.city) next.city = 'Select a city';
    if (!address.zone) next.zone = 'Select an area';
    if (!address.address.trim()) next.address = 'Address is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) return;
    setPlaced(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ── Success state ── */
  if (placed) {
    return (
      <div className='bg-gray-50'>
        <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-12'>
          <div className='flex flex-col items-center justify-center py-20 text-center'>
            <div className='mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10'>
              <FiCheck className='h-8 w-8 text-accent' />
            </div>
            <h1 className='font-heading text-xl font-bold text-gray-900 sm:text-2xl'>
              Order Placed Successfully!
            </h1>
            <p className='mt-2 max-w-md text-sm text-gray-500'>
              Thank you for your order. We&apos;ll contact you shortly to
              confirm your delivery.
            </p>
            <Link
              href='/shop'
              className='mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark'
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-6 pb-2'>
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Cart', href: '/cart' },
            { label: 'Checkout' },
          ]}
        />
      </div>

      <div className='container mx-auto px-4 md:px-6 lg:px-8 pt-2 pb-12'>
        {items.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <h1 className='mb-6 font-heading text-xl font-bold text-gray-900 sm:text-2xl'>
              Checkout
            </h1>

            <div className='flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-6'>
              {/* ── LEFT: Billing / form sections ── */}
              <div className='min-w-0 flex-1 space-y-5'>
                <CheckoutSection step={1} title='Shipping Address'>
                  <ShippingAddressForm
                    values={address}
                    onChange={setAddress}
                    errors={errors}
                  />
                </CheckoutSection>

                <CheckoutSection step={2} title='Delivery Option'>
                  <DeliveryOptionForm value={delivery} onChange={setDelivery} />
                </CheckoutSection>

                <CheckoutSection step={3} title='Payment Method'>
                  <PaymentMethodForm value={payment} onChange={setPayment} />
                </CheckoutSection>

                <CheckoutSection step={4} title='Additional Info'>
                  <label
                    htmlFor='co-notes'
                    className='mb-1.5 block text-sm font-medium text-gray-700'
                  >
                    Order Notes{' '}
                    <span className='text-gray-400'>(optional)</span>
                  </label>
                  <textarea
                    id='co-notes'
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder='Any special instructions for your order...'
                    className='w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary'
                  />
                </CheckoutSection>
              </div>

              {/* ── RIGHT: Sticky order summary ── */}
              <OrderSummary
                items={items}
                subtotal={subtotal}
                shipping={shipping}
                total={total}
                onPlaceOrder={handlePlaceOrder}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
