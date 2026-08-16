import { Breadcrumb } from '@/components/ui/breadcrumb';
import Hero from './Hero';
import WhoWeAre from './WhoWeAre';
import Values from './Values';
import WhyChooseUs from './WhyChooseUs';

export default function AboutPage() {
  return (
    <div className='bg-white'>
      {/* ── Breadcrumb ── */}
      <div className='container mx-auto px-4 pb-4 pt-6 md:px-6 lg:px-8'>
        <Breadcrumb
          items={[{ label: 'Home', href: '/' }, { label: 'About Us' }]}
        />
      </div>

      {/* ── Hero banner ── */}
      <Hero />

      {/* ── Who we are ── */}
      <WhoWeAre />

      {/* ── Our values ── */}
      <Values />

      {/* ── Why choose us ── */}
      <WhyChooseUs />
    </div>
  );
}
