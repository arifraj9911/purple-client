import type { Metadata } from 'next';
import { ComparePage } from '@/components/compare';

export const metadata: Metadata = {
  title: 'Compare Products — Purple BD',
  description: 'Compare up to 3 products side by side.',
};

export default function Page() {
  return <ComparePage />;
}
