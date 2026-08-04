/**
 * Banner / Hero Slider Dummy Data
 */

export interface BannerSlide {
  id: number;
  headline: string;
  subHeadline: string;
  ctaText: string;
  ctaLink: string;
  /** Tailwind gradient classes for the background (e.g. 'from-amber-50 via-orange-50 to-rose-50') */
  bgColor: string;
  /** Product / illustration image path (from public/images/) */
  image: string;
}

export const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    headline: 'Discover Authentic\nHandicrafts of Bangladesh',
    subHeadline:
      'Artisan-made treasures that tell a story. Up to 40% off on your first order.',
    ctaText: 'Shop Now',
    ctaLink: '/shop',
    bgColor: 'from-amber-50 via-orange-50 to-rose-50',
    image: '/images/banner-slide-01.jpeg',
  },
  {
    id: 2,
    headline: 'Premium Art Supplies\nfor Every Creator',
    subHeadline:
      'From acrylics to watercolors — everything you need to bring your imagination to life.',
    ctaText: 'Explore Collection',
    ctaLink: '/shop?category=paints',
    bgColor: 'from-sky-50 via-indigo-50 to-violet-50',
    image: '/images/banner-slide-02.jpeg',
  },
  {
    id: 3,
    headline: 'New Arrival:\nArtist Starter Kits',
    subHeadline:
      'The perfect bundle for beginners and pros alike. Limited stock available!',
    ctaText: 'Grab Yours',
    ctaLink: '/shop?category=combo-packs',
    bgColor: 'from-emerald-50 via-teal-50 to-cyan-50',
    image: '/images/banner-slide-03.jpeg',
  },
  {
    id: 4,
    headline: 'Handmade with Love\nby Local Artisans',
    subHeadline:
      'Each piece carries the passion of Bangladeshi craftsmanship. Support local, shop unique.',
    ctaText: 'Discover More',
    ctaLink: '/shop',
    bgColor: 'from-fuchsia-50 via-pink-50 to-rose-50',
    image: '/images/banner-slide-04.jpeg',
  },
];
