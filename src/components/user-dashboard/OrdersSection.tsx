'use client';

import { useState } from 'react';
import { Pagination } from '@/components/ui/pagination';
import { orderTotal, type Order } from '@/data/user';
import StatusBadge from './StatusBadge';

const ITEMS_PER_PAGE = 5;

interface OrdersSectionProps {
  orders: Order[];
  onViewOrder: (order: Order) => void;
}

export default function OrdersSection({
  orders,
  onViewOrder,
}: OrdersSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(orders.length / ITEMS_PER_PAGE);
  const paginatedOrders = orders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const itemCount = (order: Order) =>
    order.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className='space-y-4'>
      {/* ── Desktop table ── */}
      <div className='hidden overflow-x-auto rounded-xl border border-gray-200 bg-white md:block'>
        <table className='w-full min-w-150 text-left text-sm'>
          <thead className='border-b border-gray-200 text-xs uppercase tracking-wide text-gray-400'>
            <tr>
              <th className='px-4 py-3 font-semibold'>Order</th>
              <th className='px-4 py-3 font-semibold'>Date</th>
              <th className='px-4 py-3 font-semibold'>Items</th>
              <th className='px-4 py-3 font-semibold'>Total</th>
              <th className='px-4 py-3 font-semibold'>Status</th>
              <th className='px-4 py-3 text-right font-semibold'>Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-100'>
            {paginatedOrders.map((order) => (
              <tr key={order.id} className='transition-colors hover:bg-gray-50'>
                <td className='px-4 py-3 font-semibold text-gray-900'>
                  {order.id}
                </td>
                <td className='px-4 py-3 text-gray-500'>{order.date}</td>
                <td className='px-4 py-3 text-gray-500'>{itemCount(order)}</td>
                <td className='px-4 py-3 font-semibold text-gray-900'>
                  ৳{orderTotal(order).toLocaleString()}
                </td>
                <td className='px-4 py-3'>
                  <StatusBadge status={order.status} />
                </td>
                <td className='px-4 py-3 text-right'>
                  <button
                    onClick={() => onViewOrder(order)}
                    className='text-sm font-medium text-primary transition-colors hover:text-primary-dark'
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Mobile cards ── */}
      <div className='space-y-3 md:hidden'>
        {paginatedOrders.map((order) => (
          <div
            key={order.id}
            className='rounded-xl border border-gray-200 bg-white p-4'
          >
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-gray-900'>{order.id}</p>
              <StatusBadge status={order.status} />
            </div>
            <p className='mt-1 text-xs text-gray-400'>{order.date}</p>
            <div className='mt-3 flex items-center justify-between'>
              <p className='text-sm text-gray-500'>
                {itemCount(order)} {itemCount(order) === 1 ? 'item' : 'items'}
              </p>
              <p className='text-sm font-semibold text-gray-900'>
                ৳{orderTotal(order).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => onViewOrder(order)}
              className='mt-3 w-full rounded-lg border border-primary/30 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary-light'
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
