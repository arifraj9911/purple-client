import type { StaticImageData } from 'next/image';
import img1 from '@/assets/images/1.jpeg';
import img2 from '@/assets/images/2.jpeg';
import img3 from '@/assets/images/3.jpeg';

/* ─── Blog Post ─── */

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  image: StaticImageData;
}

/* ═══════════════════════════════════════════════════════
   DUMMY BLOG POSTS (3 items)
   ═══════════════════════════════════════════════════════ */

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Top 10 Acrylic Painting Tips for Beginners',
    slug: 'acrylic-painting-tips-beginners',
    excerpt:
      'Master the basics of acrylic painting with these simple yet effective techniques that will elevate your artwork.',
    author: 'Nusrat Jahan',
    date: '5 Aug, 2026',
    image: img1,
  },
  {
    id: 2,
    title: 'How to Choose the Right Canvas for Your Artwork',
    slug: 'choose-right-canvas-artwork',
    excerpt:
      'From cotton to linen, stretched to panel — find the perfect canvas that matches your medium and style.',
    author: 'Rahim Uddin',
    date: '28 Jul, 2026',
    image: img2,
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Watercolor Brush Care',
    slug: 'watercolor-brush-care-guide',
    excerpt:
      'Keep your brushes in top shape with proper cleaning, storage, and maintenance routines for long-lasting use.',
    author: 'Fatema Akhter',
    date: '15 Jul, 2026',
    image: img3,
  },
];
