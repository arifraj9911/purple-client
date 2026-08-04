import { Banner } from '@/components/home/banner';
import { ServiceFeatures } from '@/components/home/service-features';
import { FlashSale } from '@/components/home/flash-sale';
import { NewArrivals } from '@/components/home/new-arrivals';
import { BestSellers } from '@/components/home/best-sellers';
import { AllProducts } from '@/components/home/all-products';

export default function Home() {
  return (
    <>
      {/* ── Banner / Hero Slider ── */}
      <Banner />

      {/* ── Service Features ── */}
      <ServiceFeatures />

      {/* ── Flash Sale (Carousel) ── */}
      <FlashSale />

      {/* ── New Arrivals (Carousel) ── */}
      <NewArrivals />

      {/* ── Best Sellers (Carousel) ── */}
      <BestSellers />

      {/* ── All Products (Grid) ── */}
      <AllProducts />

      {/* Font & Color Verification */}
      <section className='flex flex-col items-center justify-center bg-gray-50 px-6 py-16'>
        <h1 className='text-primary mb-4 text-center'>
          Hello, Welcome to Purple BD
        </h1>

        <p className='max-w-lg text-center text-lg text-gray-700'>
          Your one-stop destination for authentic handicrafts &amp; art supplies
          in Bangladesh.
        </p>

        <div className='mt-8 h-1 w-20 rounded-full bg-primary' />

        {/* Font & Color Verification */}
        <div className='mt-10 space-y-2 text-center'>
          <p className='font-heading text-lg font-semibold text-gray-900'>
            This is Poppins (Heading Font)
          </p>
          <p className='font-body text-gray-700'>This is Inter (Body Font)</p>
        </div>

        <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
          {[
            { label: 'Primary', color: 'bg-primary' },
            { label: 'Primary Dark', color: 'bg-primary-dark' },
            { label: 'Primary Light', color: 'bg-primary-light' },
            { label: 'Secondary', color: 'bg-secondary' },
            { label: 'Accent', color: 'bg-accent' },
            { label: 'Sale', color: 'bg-sale-badge' },
          ].map((swatch) => (
            <div
              key={swatch.label}
              className='flex flex-col items-center gap-1'
            >
              <div className={`h-10 w-10 rounded-lg ${swatch.color}`} />
              <span className='text-small text-gray-500'>{swatch.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
