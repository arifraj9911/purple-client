import type { Metadata } from 'next';
import { ContactPage } from '@/components/contact';

export const metadata: Metadata = {
  title: 'Contact Us — Purple BD',
  description:
    'Get in touch with Purple BD — questions, feedback and custom orders.',
};

export default function Page() {
  return <ContactPage />;
}
