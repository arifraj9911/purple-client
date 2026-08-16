import type { StaticImageData } from 'next/image';
import img1 from '@/assets/images/1.jpeg';
import img2 from '@/assets/images/2.jpeg';
import img3 from '@/assets/images/3.jpeg';
import img4 from '@/assets/images/4.jpeg';
import img5 from '@/assets/images/5.jpeg';
import img6 from '@/assets/images/6.jpeg';
import img7 from '@/assets/images/7.jpeg';
import img8 from '@/assets/images/8.jpeg';
import img9 from '@/assets/images/9.jpeg';
import img10 from '@/assets/images/10.jpeg';

/* ─── Cart Item ─── */

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  basePrice?: number;
  discountPrice?: number;
  image: string | StaticImageData;
  quantity: number;
  slug: string;
}

/* ═══════════════════════════════════════════════════════
   DUMMY CART ITEMS (10 items)
   Seeded into the CartProvider so the drawer & cart page
   have data on first load. Images come from src/assets/images.
   ═══════════════════════════════════════════════════════ */

export const initialCartItems: CartItem[] = [
  {
    id: 1,
    name: 'Acrylic Paint Set - 12 Colors',
    price: 1200,
    basePrice: 1500,
    discountPrice: 1200,
    image: img1,
    quantity: 2,
    slug: 'acrylic-paint-set-12-colors',
  },
  {
    id: 2,
    name: 'Professional Watercolor Brush Set for Artists and Beginners - Premium Quality Round & Flat Brushes Complete Collection',
    price: 850,
    basePrice: 1100,
    discountPrice: 850,
    image: img2,
    quantity: 1,
    slug: 'professional-watercolor-brush-set',
  },
  {
    id: 3,
    name: 'Stretched Canvas 12×16 inch',
    price: 450,
    basePrice: 600,
    discountPrice: 450,
    image: img3,
    quantity: 3,
    slug: 'stretched-canvas-12x16',
  },
  {
    id: 4,
    name: 'Oil Paint Set - 24 Tubes Assorted Colors with Carrying Case',
    price: 2200,
    basePrice: 2800,
    discountPrice: 2200,
    image: img4,
    quantity: 1,
    slug: 'oil-paint-set-24-colors',
  },
  {
    id: 5,
    name: 'Sketch Pad A4 Spiral Bound',
    price: 320,
    image: img5,
    quantity: 5,
    slug: 'sketch-pad-a4',
  },
  {
    id: 6,
    name: 'Premium Artist Easel Stand - Adjustable Height Heavy Duty Wooden Tripod Display Easel for Painting, Drawing & Canvas Display',
    price: 3500,
    basePrice: 4200,
    discountPrice: 3500,
    image: img6,
    quantity: 1,
    slug: 'premium-artist-easel-stand',
  },
  {
    id: 7,
    name: 'Color Pencil Set - 48 Shades',
    price: 680,
    image: img7,
    quantity: 2,
    slug: 'color-pencil-set-48',
  },
  {
    id: 8,
    name: 'Watercolor Pad 300GSM Cold Press',
    price: 550,
    basePrice: 700,
    discountPrice: 550,
    image: img8,
    quantity: 2,
    slug: 'watercolor-pad-300gsm',
  },
  {
    id: 9,
    name: 'Calligraphy Pen Set',
    price: 1200,
    image: img9,
    quantity: 1,
    slug: 'calligraphy-pen-set',
  },
  {
    id: 10,
    name: 'Complete Artist Starter Kit for Beginners & Professionals - Includes Acrylic Paints, Brushes, Canvas Panels, Palette, and Easel - Perfect Gift Set',
    price: 4500,
    basePrice: 5500,
    discountPrice: 4500,
    image: img10,
    quantity: 1,
    slug: 'complete-artist-starter-kit',
  },
];
