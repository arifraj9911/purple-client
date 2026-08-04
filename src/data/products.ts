/**
 * Product Dummy Data — used across the entire application
 * (Product Cards, Flash Sale, New Arrivals, Best Sellers, Details, etc.)
 */

/* ─── Review ─── */
export interface Review {
  id: number;
  userId: number;
  userName: string;
  rating: number; // 1-5
  comment: string;
  createdAt: string; // ISO date
}

/* ─── Product ─── */
export interface Product {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  category: string;
  brand: string;
  images: string[]; // first = primary
  basePrice: number;
  discountPrice: number | null;
  stock: number;
  soldCount: number;
  rating: number; // average 1-5
  reviewCount: number;
  reviews: Review[];
  shortDescription: string;
  /** Is this product part of the flash sale? */
  isFlashSale: boolean;
  /** Discount percentage badge (derived from basePrice & discountPrice) */
  discountPercent: number | null;
  createdAt: string; // ISO date — for New Arrivals
  tags: string[];
}

/* ─── Helper ─── */
const today = new Date();
const daysAgo = (n: number) =>
  new Date(today.getTime() - n * 24 * 60 * 60 * 1000).toISOString();

/* ═══════════════════════════════════════════════════════
   DUMMY PRODUCTS (12 items)
   ═══════════════════════════════════════════════════════ */

export const products: Product[] = [
  {
    id: 1,
    name: 'Acrylic Paint Set - 24 Tube Colors',
    slug: 'acrylic-paint-set-24-tube-colors',
    categoryId: 2,
    category: 'Acrylic Paints',
    brand: 'Mont Marte',
    images: ['/images/product-1.jpeg', '/images/product-1.jpeg'],
    basePrice: 2200,
    discountPrice: 1650,
    stock: 45,
    soldCount: 328,
    rating: 4.7,
    reviewCount: 86,
    reviews: [
      {
        id: 1,
        userId: 1,
        userName: 'Rahim Uddin',
        rating: 5,
        comment: 'Excellent quality! Colors are vibrant and long-lasting.',
        createdAt: daysAgo(5),
      },
      {
        id: 2,
        userId: 2,
        userName: 'Fatema Akhter',
        rating: 4,
        comment: 'Good value for money. Packaging could be better.',
        createdAt: daysAgo(12),
      },
    ],
    shortDescription:
      'Professional-grade acrylic paint set with 24 vibrant colors in tubes.',
    isFlashSale: true,
    discountPercent: 25,
    createdAt: daysAgo(90),
    tags: ['acrylic', 'paint', 'set', 'professional'],
  },
  {
    id: 2,
    name: 'Watercolor Pan Set - 36 Colors',
    slug: 'watercolor-pan-set-36-colors',
    categoryId: 6,
    category: 'Watercolor Paints',
    brand: 'Winsor & Newton',
    images: ['/images/product-2.jpeg', '/images/product-2.jpeg'],
    basePrice: 1800,
    discountPrice: 1350,
    stock: 32,
    soldCount: 256,
    rating: 4.8,
    reviewCount: 64,
    reviews: [
      {
        id: 3,
        userId: 3,
        userName: 'Karim Hassan',
        rating: 5,
        comment: 'Best watercolors I have used. Highly pigmented!',
        createdAt: daysAgo(3),
      },
    ],
    shortDescription:
      'Premium watercolor pan set — 36 richly pigmented colors for artists.',
    isFlashSale: true,
    discountPercent: 25,
    createdAt: daysAgo(75),
    tags: ['watercolor', 'pan set', 'premium'],
  },
  {
    id: 3,
    name: 'Stretched Cotton Canvas 16×20 inch - Pack of 5',
    slug: 'stretched-cotton-canvas-16x20-pack-5',
    categoryId: 29,
    category: 'Canvas',
    brand: 'Artify',
    images: ['/images/product-3.jpeg', '/images/product-3.jpeg'],
    basePrice: 1500,
    discountPrice: 1200,
    stock: 60,
    soldCount: 412,
    rating: 4.5,
    reviewCount: 112,
    reviews: [
      {
        id: 4,
        userId: 4,
        userName: 'Sharmin Sultana',
        rating: 4,
        comment: 'Good quality canvas. Perfect for acrylic and oil.',
        createdAt: daysAgo(8),
      },
    ],
    shortDescription:
      'Triple-primed cotton canvas, ready to paint. Pack of 5 panels.',
    isFlashSale: true,
    discountPercent: 20,
    createdAt: daysAgo(120),
    tags: ['canvas', 'stretched', 'cotton', 'pack'],
  },
  {
    id: 4,
    name: 'Professional Synthetic Brush Set - 15 Pieces',
    slug: 'professional-synthetic-brush-set-15-pieces',
    categoryId: 14,
    category: 'Brushes',
    brand: 'Da Vinci',
    images: ['/images/product-4.jpeg', '/images/product-4.jpeg'],
    basePrice: 2800,
    discountPrice: 2100,
    stock: 18,
    soldCount: 189,
    rating: 4.9,
    reviewCount: 47,
    reviews: [
      {
        id: 5,
        userId: 5,
        userName: 'Tanvir Ahmed',
        rating: 5,
        comment: 'Absolutely amazing brushes. Worth every taka!',
        createdAt: daysAgo(2),
      },
    ],
    shortDescription:
      '15-piece professional synthetic brush set — flat, round, filbert & detail.',
    isFlashSale: true,
    discountPercent: 25,
    createdAt: daysAgo(60),
    tags: ['brushes', 'synthetic', 'professional', 'set'],
  },
  {
    id: 5,
    name: 'Artist Sketch Pad A3 - 50 Sheets 120GSM',
    slug: 'artist-sketch-pad-a3-50-sheets-120gsm',
    categoryId: 24,
    category: 'Pads & Paper',
    brand: 'Fabriano',
    images: ['/images/product-5.jpeg', '/images/product-5.jpeg'],
    basePrice: 650,
    discountPrice: null,
    stock: 95,
    soldCount: 145,
    rating: 4.3,
    reviewCount: 38,
    reviews: [],
    shortDescription:
      'Premium A3 sketch pad with 50 acid-free sheets, ideal for dry media.',
    isFlashSale: false,
    discountPercent: null,
    createdAt: daysAgo(14),
    tags: ['sketch', 'pad', 'A3', 'drawing'],
  },
  {
    id: 6,
    name: 'Oil Paint Set - 12 Tubes 40ml Each',
    slug: 'oil-paint-set-12-tubes-40ml',
    categoryId: 12,
    category: 'Oil Paints',
    brand: 'Pebeo',
    images: ['/images/product-6.jpeg', '/images/product-6.jpeg'],
    basePrice: 3200,
    discountPrice: 2560,
    stock: 22,
    soldCount: 98,
    rating: 4.6,
    reviewCount: 29,
    reviews: [
      {
        id: 6,
        userId: 6,
        userName: 'Nusrat Jahan',
        rating: 5,
        comment: 'Rich and buttery consistency. Love these oils!',
        createdAt: daysAgo(7),
      },
    ],
    shortDescription:
      'Studio-quality oil paints, 12 classic colors in 40ml tubes.',
    isFlashSale: false,
    discountPercent: 20,
    createdAt: daysAgo(45),
    tags: ['oil paint', 'tubes', 'studio'],
  },
  {
    id: 7,
    name: 'Graphite Pencil Set - 12 Grades (6H to 8B)',
    slug: 'graphite-pencil-set-12-grades-6h-8b',
    categoryId: 39,
    category: 'Drawing',
    brand: 'Staedtler',
    images: ['/images/product-7.jpeg', '/images/product-7.jpeg'],
    basePrice: 950,
    discountPrice: null,
    stock: 78,
    soldCount: 210,
    rating: 4.4,
    reviewCount: 55,
    reviews: [],
    shortDescription:
      'Complete graphite set from 6H to 8B — perfect for sketching & shading.',
    isFlashSale: false,
    discountPercent: null,
    createdAt: daysAgo(10),
    tags: ['graphite', 'pencil', 'drawing', 'sketching'],
  },
  {
    id: 8,
    name: 'Wooden Table Easel - Adjustable Angle',
    slug: 'wooden-table-easel-adjustable-angle',
    categoryId: 57,
    category: 'Easels & Stands',
    brand: 'Artify',
    images: ['/images/product-8.jpeg', '/images/product-8.jpeg'],
    basePrice: 2400,
    discountPrice: 1920,
    stock: 15,
    soldCount: 76,
    rating: 4.2,
    reviewCount: 21,
    reviews: [],
    shortDescription:
      'Sturdy wooden table easel with adjustable angle for comfortable painting.',
    isFlashSale: false,
    discountPercent: 20,
    createdAt: daysAgo(30),
    tags: ['easel', 'table', 'wooden', 'adjustable'],
  },
  {
    id: 9,
    name: 'Calligraphy Pen Set - 12 Nibs + Holder',
    slug: 'calligraphy-pen-set-12-nibs-holder',
    categoryId: 39,
    category: 'Drawing',
    brand: 'Manuscript',
    images: ['/images/product-9.jpeg', '/images/product-9.jpeg'],
    basePrice: 1200,
    discountPrice: null,
    stock: 40,
    soldCount: 167,
    rating: 4.5,
    reviewCount: 43,
    reviews: [
      {
        id: 7,
        userId: 7,
        userName: 'Arif Rahman',
        rating: 5,
        comment: 'Smooth writing experience. Great for beginners!',
        createdAt: daysAgo(4),
      },
    ],
    shortDescription:
      'Complete calligraphy starter kit with 12 interchangeable nibs & wooden holder.',
    isFlashSale: false,
    discountPercent: null,
    createdAt: daysAgo(20),
    tags: ['calligraphy', 'pen', 'nibs', 'starter'],
  },
  {
    id: 10,
    name: 'Acrylic Color Pouring Medium - 500ml',
    slug: 'acrylic-color-pouring-medium-500ml',
    categoryId: 2,
    category: 'Acrylic Paints',
    brand: 'Liquitex',
    images: ['/images/product-10.jpeg', '/images/product-10.jpeg'],
    basePrice: 850,
    discountPrice: 680,
    stock: 55,
    soldCount: 134,
    rating: 4.1,
    reviewCount: 18,
    reviews: [],
    shortDescription:
      'Professional pouring medium for acrylic fluid art & cells effect.',
    isFlashSale: false,
    discountPercent: 20,
    createdAt: daysAgo(3),
    tags: ['acrylic', 'pouring', 'medium', 'fluid art'],
  },
  {
    id: 11,
    name: 'Premium Charcoal Set - Willow, Compressed & Pencil',
    slug: 'premium-charcoal-set-willow-compressed-pencil',
    categoryId: 39,
    category: 'Drawing',
    brand: 'Generals',
    images: ['/images/product-11.jpeg', '/images/product-11.jpeg'],
    basePrice: 750,
    discountPrice: null,
    stock: 67,
    soldCount: 89,
    rating: 4.0,
    reviewCount: 15,
    reviews: [],
    shortDescription:
      'All-in-one charcoal drawing set with willow sticks, compressed & pencils.',
    isFlashSale: true,
    discountPercent: null,
    createdAt: daysAgo(7),
    tags: ['charcoal', 'drawing', 'set', 'willow'],
  },
  {
    id: 12,
    name: 'Craft Glue Gun with 20 Glue Sticks',
    slug: 'craft-glue-gun-20-glue-sticks',
    categoryId: 52,
    category: 'Craft Supplies',
    brand: 'Fevicol',
    images: ['/images/product-12.jpeg', '/images/product-12.jpeg'],
    basePrice: 550,
    discountPrice: 440,
    stock: 85,
    soldCount: 203,
    rating: 4.3,
    reviewCount: 32,
    reviews: [],
    shortDescription:
      'Electric hot glue gun with 20 sticks — perfect for DIY & crafts.',
    isFlashSale: false,
    discountPercent: 20,
    createdAt: daysAgo(1),
    tags: ['glue gun', 'craft', 'DIY', 'hot glue'],
  },
];

/* ─── Derived lists ─── */

/** Products with `isFlashSale === true` */
export const flashSaleProducts = products.filter((p) => p.isFlashSale);

/** Products sorted by `createdAt` descending (newest first) */
export const newArrivals = [...products].sort(
  (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
);

/** Products sorted by `soldCount` descending (most sold first) */
export const bestSellers = [...products].sort(
  (a, b) => b.soldCount - a.soldCount,
);
