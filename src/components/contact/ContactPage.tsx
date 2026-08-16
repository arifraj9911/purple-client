import { Breadcrumb } from '@/components/ui/breadcrumb';
import ContactInfo from './ContactInfo';
import ContactForm from './ContactForm';
import MapEmbed from './MapEmbed';

export default function ContactPage() {
  return (
    <div className='bg-gray-50'>
      <div className='container mx-auto px-4 pt-6 md:px-6 lg:px-8'>
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'Contact Us' }]}
        />
      </div>

      <div className='container mx-auto px-4 py-6 pb-12 md:px-6 lg:px-8'>
        <div className='mb-8 text-center'>
          <h1 className='font-heading text-2xl font-bold text-gray-900 sm:text-3xl'>
            Contact Us
          </h1>
          <p className='mx-auto mt-2 max-w-xl text-sm text-gray-500 sm:text-base'>
            Questions, feedback or custom orders — we&apos;re here to help.
          </p>
        </div>

        <div className='grid gap-6 lg:grid-cols-2'>
          <ContactInfo />
          <ContactForm />
        </div>

        <MapEmbed />
      </div>
    </div>
  );
}
