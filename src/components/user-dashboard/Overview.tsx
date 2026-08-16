'use client';

import type { IconType } from 'react-icons';
import {
  FiClock,
  FiPackage,
  FiTruck,
  FiXCircle,
  FiChevronRight,
} from 'react-icons/fi';
import { orderTotal, type Order, type UserProfile } from '@/data/user';
import StatusBadge from './StatusBadge';

interface OverviewProps {
  user: UserProfile;
  orders: Order[];
  onViewOrder: (order: Order) => void;
  onViewAllOrders: () => void;
}

export default function Overview({
  user,
  orders,
  onViewOrder,
  onViewAllOrders,
}: OverviewProps) {
  const total = orders.length;
  const active = orders.filter(
    (o) => o.status !== 'delivered' && o.status !== 'cancelled',
  ).length;
  const pending = orders.filter((o) => o.status === 'pending').length;
  const cancelled = orders.filter((o) => o.status === 'cancelled').length;

  const stats: {
    label: string;
    value: number;
    icon: IconType;
    iconClass: string;
  }[] = [
    {
      label: 'Total Orders',
      value: total,
      icon: FiPackage,
      iconClass: 'bg-primary-light text-primary',
    },
    {
      label: 'Active Orders',
      value: active,
      icon: FiTruck,
      iconClass: 'bg-status-processing/10 text-status-processing',
    },
    {
      label: 'Pending',
      value: pending,
      icon: FiClock,
      iconClass: 'bg-status-pending/10 text-status-pending',
    },
    {
      label: 'Cancelled',
      value: cancelled,
      icon: FiXCircle,
      iconClass: 'bg-status-cancelled/10 text-status-cancelled',
    },
  ];

  return (
    <div className='space-y-6'>
      {/* ── Profile card ── */}
      <section className='flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:p-6'>
        <span className='flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-xl font-bold text-white'>
          {user.name.charAt(0).toUpperCase()}
        </span>
        <div className='min-w-0'>
          <h2 className='truncate font-heading text-lg font-semibold text-gray-900'>
            {user.name}
          </h2>
          <p className='truncate text-sm text-gray-500'>{user.email}</p>
          <p className='text-xs text-gray-400'>Member since {user.joined}</p>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className='grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className='rounded-xl border border-gray-200 bg-white p-4'
            >
              <div
                className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconClass}`}
              >
                <Icon className='h-5 w-5' />
              </div>
              <p className='text-2xl font-bold text-gray-900'>{stat.value}</p>
              <p className='text-xs font-medium text-gray-500'>{stat.label}</p>
            </div>
          );
        })}
      </section>

      {/* ── Recent orders ── */}
      <section className='rounded-xl border border-gray-200 bg-white p-5 sm:p-6'>
        <div className='mb-2 flex items-center justify-between'>
          <h3 className='font-heading text-base font-semibold text-gray-900'>
            Recent Orders
          </h3>
          <button
            onClick={onViewAllOrders}
            className='flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary-dark'
          >
            View All <FiChevronRight className='h-4 w-4' />
          </button>
        </div>

        <div className='divide-y divide-gray-100'>
          {orders.slice(0, 3).map((order) => (
            <div
              key={order.id}
              className='flex flex-wrap items-center gap-3 py-3'
            >
              <div className='min-w-0 flex-1'>
                <p className='font-semibold text-gray-900'>{order.id}</p>
                <p className='text-xs text-gray-400'>{order.date}</p>
              </div>
              <StatusBadge status={order.status} />
              <p className='text-sm font-semibold text-gray-900'>
                ৳{orderTotal(order).toLocaleString()}
              </p>
              <button
                onClick={() => onViewOrder(order)}
                className='text-sm font-medium text-primary transition-colors hover:text-primary-dark'
              >
                View
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
