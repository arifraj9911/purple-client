'use client';

import { Fragment } from 'react';
import Image from 'next/image';
import { FiCheck, FiChevronLeft, FiXCircle } from 'react-icons/fi';
import {
  ORDER_STATUS_META,
  ORDER_TRACKER_STEPS,
  orderSubtotal,
  orderTotal,
  type Order,
  type OrderStatus,
} from '@/data/user';
import StatusBadge from './StatusBadge';

interface OrderDetailProps {
  order: Order;
  onBack: () => void;
}

export default function OrderDetail({ order, onBack }: OrderDetailProps) {
  const subtotal = orderSubtotal(order);
  const cancelled = order.status === 'cancelled';

  return (
    <div className='space-y-5'>
      <button
        onClick={onBack}
        className='flex items-center gap-1 text-sm font-medium text-gray-500 transition-colors hover:text-primary'
      >
        <FiChevronLeft className='h-4 w-4' />
        Back to orders
      </button>

      {/* ── Header + tracker ── */}
      <section className='rounded-xl border border-gray-200 bg-white p-5 sm:p-6'>
        <div className='flex flex-wrap items-center justify-between gap-3'>
          <div>
            <h3 className='font-heading text-lg font-semibold text-gray-900'>
              {order.id}
            </h3>
            <p className='text-sm text-gray-500'>
              {order.date} · {order.paymentMethod}
            </p>
          </div>
          <StatusBadge status={order.status} />
        </div>

        {cancelled ? (
          <div className='mt-4 flex items-center gap-2 rounded-lg bg-status-cancelled/10 px-4 py-3 text-sm font-medium text-status-cancelled'>
            <FiXCircle className='h-4 w-4 shrink-0' />
            This order was cancelled.
          </div>
        ) : (
          <div className='mt-6 overflow-x-auto'>
            <OrderTracker status={order.status} />
          </div>
        )}
      </section>

      {/* ── Items ── */}
      <section className='rounded-xl border border-gray-200 bg-white p-5 sm:p-6'>
        <h4 className='mb-2 font-heading text-xs font-semibold uppercase tracking-wide text-gray-400'>
          Items
        </h4>
        <div className='divide-y divide-gray-100'>
          {order.items.map((item) => (
            <div key={item.id} className='flex items-center gap-3 py-3'>
              <Image
                src={item.image}
                alt={item.name}
                width={48}
                height={48}
                className='h-12 w-12 shrink-0 rounded-lg object-cover'
              />
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-gray-900'>
                  {item.name}
                </p>
                <p className='text-xs text-gray-400'>
                  ৳{item.price.toLocaleString()} × {item.quantity}
                </p>
              </div>
              <p className='text-sm font-semibold text-gray-900'>
                ৳{(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Summary ── */}
      <section className='rounded-xl border border-gray-200 bg-white p-5 sm:p-6'>
        <h4 className='mb-3 font-heading text-xs font-semibold uppercase tracking-wide text-gray-400'>
          Summary
        </h4>
        <dl className='space-y-2 text-sm'>
          <div className='flex justify-between'>
            <dt className='text-gray-500'>Subtotal</dt>
            <dd className='font-medium text-gray-900'>
              ৳{subtotal.toLocaleString()}
            </dd>
          </div>
          <div className='flex justify-between'>
            <dt className='text-gray-500'>Shipping</dt>
            <dd className='font-medium text-gray-900'>
              ৳{order.shipping.toLocaleString()}
            </dd>
          </div>
          <div className='flex justify-between border-t border-gray-100 pt-2'>
            <dt className='font-semibold text-gray-900'>Total</dt>
            <dd className='font-bold text-gray-900'>
              ৳{orderTotal(order).toLocaleString()}
            </dd>
          </div>
        </dl>
        <p className='mt-4 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-500'>
          Deliver to: {order.shippingAddress}
        </p>
      </section>
    </div>
  );
}

function OrderTracker({ status }: { status: OrderStatus }) {
  const currentIndex = ORDER_TRACKER_STEPS.indexOf(status);

  return (
    <div className='flex min-w-105 items-start'>
      {ORDER_TRACKER_STEPS.map((step, index) => {
        const completed = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isLast = index === ORDER_TRACKER_STEPS.length - 1;
        const label = ORDER_STATUS_META[step].label;

        return (
          <Fragment key={step}>
            <div className='flex flex-col items-center'>
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                  completed || isCurrent
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {completed ? <FiCheck className='h-4 w-4' /> : index + 1}
              </span>
              <span
                className={`mt-1.5 whitespace-nowrap text-[11px] font-medium ${
                  completed || isCurrent ? 'text-gray-900' : 'text-gray-400'
                }`}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={`mx-1 mt-4 h-0.5 flex-1 ${
                  completed ? 'bg-primary' : 'bg-gray-200'
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
