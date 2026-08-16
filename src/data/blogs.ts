import type { StaticImageData } from 'next/image';
import img1 from '@/assets/images/1.jpeg';
import img2 from '@/assets/images/2.jpeg';
import img3 from '@/assets/images/3.jpeg';
import img5 from '@/assets/images/5.jpeg';
import img6 from '@/assets/images/6.jpeg';
import img9 from '@/assets/images/9.jpeg';

/* ─── Content blocks (rich text) ─── */

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'quote'; text: string };

/* ─── Blog Post ─── */

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: StaticImageData;
  tags: string[];
  content: ContentBlock[];
}

export interface BlogComment {
  id: number;
  postId: number;
  author: string;
  text: string;
  date: string;
  likes: number;
}

/* ═══════════════════════════════════════════════════════
   DUMMY BLOG POSTS (6 items)
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
    category: 'Painting',
    image: img1,
    tags: ['acrylic', 'painting', 'beginner'],
    content: [
      {
        type: 'paragraph',
        text: 'Acrylics are one of the most forgiving and versatile painting mediums — perfect for beginners and pros alike. These simple habits will help you get cleaner blends and more confident results from day one.',
      },
      { type: 'heading', text: 'Start with the Right Supplies' },
      {
        type: 'list',
        items: [
          'Use student or artist-grade paints for strong pigment',
          'Keep a spray bottle to mist your palette',
          'Invest in a few quality flat and round brushes',
        ],
      },
      { type: 'heading', text: 'Layer, Don\u2019t Rush' },
      {
        type: 'paragraph',
        text: 'Acrylics dry fast, so work in thin layers and build up colour gradually. This avoids muddy mixes and gives your painting real depth.',
      },
      {
        type: 'quote',
        text: 'Every artist was first an amateur. — Ralph Waldo Emerson',
      },
    ],
  },
  {
    id: 2,
    title: 'How to Choose the Right Canvas for Your Artwork',
    slug: 'choose-right-canvas-artwork',
    excerpt:
      'From cotton to linen, stretched to panel — find the perfect canvas that matches your medium and style.',
    author: 'Rahim Uddin',
    date: '28 Jul, 2026',
    category: 'Painting',
    image: img2,
    tags: ['canvas', 'painting', 'supplies'],
    content: [
      {
        type: 'paragraph',
        text: 'The canvas you choose affects everything — texture, absorbency and how your paint behaves. Here is how to pick the right one for your medium.',
      },
      { type: 'heading', text: 'Cotton vs Linen' },
      {
        type: 'list',
        items: [
          'Cotton: affordable and beginner-friendly',
          'Linen: durable with a smoother, professional surface',
          'Panels: rigid and great for mixed media',
        ],
      },
      {
        type: 'paragraph',
        text: 'For most students, a triple-primed cotton canvas is the perfect starting point. It holds acrylic, oil and watercolor washes beautifully.',
      },
    ],
  },
  {
    id: 3,
    title: 'The Ultimate Guide to Watercolor Brush Care',
    slug: 'watercolor-brush-care-guide',
    excerpt:
      'Keep your brushes in top shape with proper cleaning, storage, and maintenance routines for long-lasting use.',
    author: 'Fatema Akhter',
    date: '15 Jul, 2026',
    category: 'Painting',
    image: img3,
    tags: ['watercolor', 'brushes', 'care'],
    content: [
      {
        type: 'paragraph',
        text: 'A good watercolor brush can last for years if you treat it well. These care routines will keep your bristles springy and your points sharp.',
      },
      { type: 'heading', text: 'Cleaning & Drying' },
      {
        type: 'list',
        items: [
          'Rinse gently in lukewarm water after every session',
          'Reshape the tip and dry horizontally',
          'Never leave brushes standing in water',
        ],
      },
      {
        type: 'paragraph',
        text: 'Avoid harsh soaps and hot water — both can loosen the ferrule and shed bristles over time.',
      },
    ],
  },
  {
    id: 4,
    title: 'Sketching Essentials Every Artist Should Own',
    slug: 'sketching-essentials-every-artist',
    excerpt:
      'A small, well-chosen kit is all you need to build a daily drawing habit and sharpen your skills.',
    author: 'Mehedi Hasan',
    date: '6 Aug, 2026',
    category: 'Drawing',
    image: img5,
    tags: ['sketching', 'drawing', 'pencils'],
    content: [
      {
        type: 'paragraph',
        text: 'Sketching is the foundation of every artwork. A small, well-chosen kit is all you need to build a daily drawing habit.',
      },
      { type: 'heading', text: 'What to Carry' },
      {
        type: 'list',
        items: [
          'A set of graphite pencils (2H to 8B)',
          'A hardbound A4 or A5 sketch pad',
          'A kneaded eraser and a blending stump',
        ],
      },
      {
        type: 'quote',
        text: 'Drawing is the honesty of the art. There is no possibility of cheating. — Salvador Dalí',
      },
    ],
  },
  {
    id: 5,
    title: 'Understanding Oil Paint Drying Times',
    slug: 'understanding-oil-paint-drying-times',
    excerpt:
      'Oil paints dry by oxidation, not evaporation. Learn how this changes your layering and finishing process.',
    author: 'Rahim Uddin',
    date: '20 Jul, 2026',
    category: 'Painting',
    image: img6,
    tags: ['oil paint', 'painting', 'technique'],
    content: [
      {
        type: 'paragraph',
        text: 'Oil paints dry differently from acrylics — by oxidation, not evaporation. Understanding this changes how you layer and finish your work.',
      },
      { type: 'heading', text: 'How Long Does Oil Paint Take to Dry?' },
      {
        type: 'list',
        items: [
          'Thin layers: 1–2 days',
          'Thick impasto strokes: several weeks',
          'Adding medium can speed up or slow down drying',
        ],
      },
      {
        type: 'paragraph',
        text: 'Plan your sessions around the "fat over lean" rule: start with thin, lean layers and finish with thicker, oil-rich ones to prevent cracking.',
      },
    ],
  },
  {
    id: 6,
    title: 'Beginner Calligraphy: Getting Started with Nibs',
    slug: 'beginner-calligraphy-getting-started',
    excerpt:
      'With a dip pen and a little patience, anyone can learn beautiful letterforms from scratch.',
    author: 'Nusrat Jahan',
    date: '10 Jul, 2026',
    category: 'Drawing',
    image: img9,
    tags: ['calligraphy', 'lettering', 'nibs'],
    content: [
      {
        type: 'paragraph',
        text: 'Calligraphy is equal parts art and ritual. With a dip pen and a little patience, anyone can learn beautiful letterforms.',
      },
      { type: 'heading', text: 'Getting Started' },
      {
        type: 'list',
        items: [
          'Prime new nibs by wiping with soapy water',
          'Hold the pen at a steady 45° angle',
          'Practice basic strokes before full letters',
        ],
      },
      {
        type: 'paragraph',
        text: 'Consistency comes from repetition. Warm up with ten minutes of ovals and straight lines before every session.',
      },
    ],
  },
];

/* ─── Dummy comments ─── */

export const comments: BlogComment[] = [
  {
    id: 1,
    postId: 1,
    author: 'Sadia Islam',
    text: 'These acrylic tips really helped me improve my blending. Thank you!',
    date: '2 days ago',
    likes: 5,
  },
  {
    id: 2,
    postId: 1,
    author: 'Arif Rahman',
    text: 'Clear and practical advice. The layering section was gold.',
    date: '1 week ago',
    likes: 2,
  },
  {
    id: 3,
    postId: 2,
    author: 'Tanvir Ahmed',
    text: 'Finally understood the difference between cotton and linen canvases.',
    date: '3 days ago',
    likes: 3,
  },
];
