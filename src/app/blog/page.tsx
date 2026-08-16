import type { Metadata } from 'next';
import { BlogPage } from '@/components/blog';

export const metadata: Metadata = {
  title: 'Blog — Purple BD',
  description: 'Tips, guides and inspiration for artists and crafters.',
};

export default function Page() {
  return <BlogPage />;
}
