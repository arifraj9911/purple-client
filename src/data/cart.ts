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
    name: 'Acrylic Paint Set - 24 Tube Colors',
    price: 1650,
    basePrice: 2200,
    discountPrice: 1650,
    image: img1,
    quantity: 2,
    slug: 'acrylic-paint-set-24-tube-colors',
  },
  {
    id: 2,
    name: 'Watercolor Pan Set - 36 Colors',
    price: 1350,
    basePrice: 1800,
    discountPrice: 1350,
    image: img2,
    quantity: 1,
    slug: 'watercolor-pan-set-36-colors',
  },
  {
    id: 3,
    name: 'Stretched Cotton Canvas 16×20 inch - Pack of 5',
    price: 1200,
    basePrice: 1500,
    discountPrice: 1200,
    image: img3,
    quantity: 3,
    slug: 'stretched-cotton-canvas-16x20-pack-5',
  },
  {
    id: 4,
    name: 'Professional Synthetic Brush Set - 15 Pieces',
    price: 2100,
    basePrice: 2800,
    discountPrice: 2100,
    image: img4,
    quantity: 1,
    slug: 'professional-synthetic-brush-set-15-pieces',
  },
  {
    id: 5,
    name: 'Artist Sketch Pad A3 - 50 Sheets 120GSM',
    price: 650,
    image: img5,
    quantity: 5,
    slug: 'artist-sketch-pad-a3-50-sheets-120gsm',
  },
  {
    id: 6,
    name: 'Oil Paint Set - 12 Tubes 40ml Each',
    price: 2560,
    basePrice: 3200,
    discountPrice: 2560,
    image: img6,
    quantity: 1,
    slug: 'oil-paint-set-12-tubes-40ml',
  },
  {
    id: 7,
    name: 'Graphite Pencil Set - 12 Grades (6H to 8B)',
    price: 950,
    image: img7,
    quantity: 2,
    slug: 'graphite-pencil-set-12-grades-6h-8b',
  },
  {
    id: 8,
    name: 'Wooden Table Easel - Adjustable Angle',
    price: 1920,
    basePrice: 2400,
    discountPrice: 1920,
    image: img8,
    quantity: 2,
    slug: 'wooden-table-easel-adjustable-angle',
  },
  {
    id: 9,
    name: 'Calligraphy Pen Set - 12 Nibs + Holder',
    price: 1200,
    image: img9,
    quantity: 1,
    slug: 'calligraphy-pen-set-12-nibs-holder',
  },
  {
    id: 10,
    name: 'Acrylic Color Pouring Medium - 500ml',
    price: 680,
    basePrice: 850,
    discountPrice: 680,
    image: img10,
    quantity: 1,
    slug: 'acrylic-color-pouring-medium-500ml',
  },
];
