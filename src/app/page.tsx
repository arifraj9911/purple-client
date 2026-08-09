import { Banner } from '@/components/home/banner';
import { ServiceFeatures } from '@/components/home/service-features';
import { FlashSale } from '@/components/home/flash-sale';
import { NewArrivals } from '@/components/home/new-arrivals';
import { BestSellers } from '@/components/home/best-sellers';
import { AllProducts } from '@/components/home/all-products';
import { Testimonials } from '@/components/home/testimonials';
import { Blog } from '@/components/home/blog';

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

      {/* ── Testimonials (Carousel) ── */}
      <Testimonials />

      {/* ── Blog Section (Grid) ── */}
      <Blog />
    </>
  );
}
