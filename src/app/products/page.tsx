import type { Metadata } from 'next';
import { ProductsPage } from '@/components/products';

export const metadata: Metadata = {
  title: 'All Products — Purple BD',
  description:
    'Browse the complete collection of handicrafts and art supplies.',
};

export default function Page() {
  return <ProductsPage />;
}
