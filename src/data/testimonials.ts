import type { StaticImageData } from 'next/image';
import tes1 from '@/assets/images/tes1.jpg';
import tes2 from '@/assets/images/tes2.jpg';
import tes3 from '@/assets/images/tes3.jpg';
import tes4 from '@/assets/images/tes4.jpg';
import tes5 from '@/assets/images/tes5.jpg';

/* ─── Testimonial ─── */

export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number; // 1-5
  comment: string;
  image: StaticImageData;
}

/* ═══════════════════════════════════════════════════════
   DUMMY TESTIMONIALS (5 items)
   ═══════════════════════════════════════════════════════ */

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Rahim Uddin',
    location: 'Dhaka',
    rating: 5,
    comment:
      'Absolutely loved the acrylic paint set! Rich, vibrant colors and fast delivery. Highly recommended for every artist.',
    image: tes1,
  },
  {
    id: 2,
    name: 'Fatema Akhter',
    location: 'Chattogram',
    rating: 5,
    comment:
      'Beautiful handmade crafts and art supplies. Packaging was very careful and the quality exceeded my expectations.',
    image: tes2,
  },
  {
    id: 3,
    name: 'Mehedi Hasan',
    location: 'Sylhet',
    rating: 4,
    comment:
      'Great variety of products at reasonable prices. Delivery took a day extra but it was definitely worth the wait.',
    image: tes3,
  },
  {
    id: 4,
    name: 'Nusrat Jahan',
    location: 'Rajshahi',
    rating: 5,
    comment:
      'The stretched canvas quality is superb. My painting turned out amazing. Will definitely shop here again!',
    image: tes4,
  },
  {
    id: 5,
    name: 'Tanvir Ahmed',
    location: 'Khulna',
    rating: 5,
    comment:
      'Smooth checkout and easy payment with bKash. The customer support team was very responsive and helpful.',
    image: tes5,
  },
];
