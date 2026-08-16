import type { StaticImageData } from 'next/image';
import heroImage from '@/assets/images/1.jpeg';
import storyImage from '@/assets/images/3.jpeg';
import whyImage from '@/assets/images/8.jpeg';

/**
 * About Us dummy data (article 4.12).
 * Swap these constants for CMS/API content later.
 */

export interface Value {
  id: number;
  title: string;
  description: string;
}

export interface WhyChooseUsItem {
  id: number;
  title: string;
  description: string;
}

export const hero = {
  eyebrow: 'Our Story',
  title: 'About Purple BD',
  subtitle:
    'From a small workshop in Dhaka to a trusted home for artists, crafters and creators across Bangladesh.',
  image: heroImage,
};

export const story = {
  title: 'Who We Are',
  paragraphs: [
    'Purple BD began as a tiny art-supply corner with one simple belief — every creator in Bangladesh deserves access to quality materials at honest prices.',
    'Today we curate handicrafts, paints, brushes, canvases and craft supplies from trusted local and international brands, delivered straight to your doorstep.',
  ],
  mission:
    'To make high-quality art & craft supplies accessible and affordable for every creator in Bangladesh.',
  vision:
    'To grow a thriving community of Bangladeshi artists, crafters and makers we proudly support.',
  image: storyImage,
};

export const values: Value[] = [
  {
    id: 1,
    title: 'Quality First',
    description:
      'We hand-pick every product so you always get reliable, long-lasting materials.',
  },
  {
    id: 2,
    title: 'Handmade with Care',
    description:
      'We champion local artisans and authentic handmade crafts from across Bangladesh.',
  },
  {
    id: 3,
    title: 'Creativity for All',
    description:
      'From beginners to pros, we stock tools and supplies for every skill level.',
  },
  {
    id: 4,
    title: 'Fair Prices',
    description:
      'Honest, transparent pricing with regular deals so creativity stays affordable.',
  },
];

export const whyChooseUs: {
  image: StaticImageData;
  items: WhyChooseUsItem[];
} = {
  image: whyImage,
  items: [
    {
      id: 1,
      title: 'Authentic Handicrafts',
      description:
        'Directly sourced from local artisans, every piece is genuine and made with love.',
    },
    {
      id: 2,
      title: 'Fast Nationwide Delivery',
      description:
        'Quick dispatch with reliable couriers covering every corner of Bangladesh.',
    },
    {
      id: 3,
      title: 'Easy 7-Day Returns',
      description:
        'Not satisfied? Enjoy a hassle-free refund and return within 7 days.',
    },
    {
      id: 4,
      title: 'Secure Payments',
      description: 'Pay safely with bKash, cards or cash on delivery.',
    },
  ],
};
