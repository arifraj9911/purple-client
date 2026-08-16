'use client';

import { useState } from 'react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { useAuth } from '@/lib/auth-context';
import { orders as seedOrders, profile, type Order } from '@/data/user';
import DashboardNav, { type Section } from './Sidebar';
import Overview from './Overview';
import OrdersSection from './OrdersSection';
import OrderDetail from './OrderDetail';
import AddressesSection from './AddressesSection';
import ChangePasswordSection from './ChangePasswordSection';

export default function UserDashboardPage() {
  const { user } = useAuth();
  const [active, setActive] = useState<Section>('overview');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  /* Fall back to the dummy profile until a real user API exists. */
  const displayUser = {
    id: user?.id ?? profile.id,
    name: user?.name ?? profile.name,
    email: user?.email ?? profile.email,
    phone: user?.phone ?? profile.phone,
    joined: profile.joined,
  };

  const handleSelect = (section: Section) => {
    setSelectedOrder(null);
    setActive(section);
  };

  const openOrderFromOverview = (order: Order) => {
    setSelectedOrder(order);
    setActive('orders');
  };

  const content = selectedOrder ? (
    <OrderDetail order={selectedOrder} onBack={() => setSelectedOrder(null)} />
  ) : active === 'overview' ? (
    <Overview
      user={displayUser}
      orders={seedOrders}
      onViewOrder={openOrderFromOverview}
      onViewAllOrders={() => setActive('orders')}
    />
  ) : active === 'orders' ? (
    <OrdersSection orders={seedOrders} onViewOrder={setSelectedOrder} />
  ) : active === 'addresses' ? (
    <AddressesSection />
  ) : (
    <ChangePasswordSection />
  );

  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 pt-6 md:px-6 lg:px-8'>
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'My Account' }]}
        />
      </div>

      <div className='container mx-auto px-4 py-4 pb-12 md:px-6 lg:px-8'>
        <h1 className='mb-5 font-heading text-xl font-bold text-gray-900 sm:text-2xl'>
          My Account
        </h1>

        {/* ── Mobile navigation (top) ── */}
        <div className='mb-5 lg:hidden'>
          <DashboardNav
            active={active}
            onSelect={handleSelect}
            variant='mobile'
          />
        </div>

        <div className='flex flex-col gap-6 lg:flex-row lg:gap-5'>
          {/* ── Desktop sidebar (sticky relative to the content) ── */}
          <aside className='hidden w-64 shrink-0 lg:block'>
            <div className='rounded-xl border border-gray-200 bg-white p-4 lg:sticky lg:top-28'>
              <DashboardNav
                active={active}
                onSelect={handleSelect}
                variant='desktop'
              />
            </div>
          </aside>

          {/* ── Main content ── */}
          <div className='min-w-0 flex-1'>{content}</div>
        </div>
      </div>
    </div>
  );
}
