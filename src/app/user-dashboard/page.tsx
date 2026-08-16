import type { Metadata } from 'next';
import { UserDashboardPage } from '@/components/user-dashboard';

export const metadata: Metadata = {
  title: 'My Account — Purple BD',
  description: 'Manage your orders, addresses and account settings.',
};

export default function Page() {
  return <UserDashboardPage />;
}
