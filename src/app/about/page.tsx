import type { Metadata } from 'next';
import { AboutPage } from '@/components/about';

export const metadata: Metadata = {
  title: 'About Us — Purple BD',
  description:
    'Learn more about Purple BD — your home for handicrafts and art supplies in Bangladesh.',
};

export default function Page() {
  return <AboutPage />;
}
