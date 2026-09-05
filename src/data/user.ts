/**
 * User Dashboard Dummy Data.
 *
 * These shapes mirror what the backend will return (see the /api/user/*
 * endpoints in the project documentation). Swap the exported constants for
 * API calls once the server is ready — the dashboard components only consume
 * the types and helpers defined here.
 */

/* ─── Types ─── */

export const ORDER_STATUSES = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export interface OrderItem {
  id: number;
  name: string;
  image: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string;
  status: OrderStatus;
  paymentMethod: string;
  shipping: number;
  shippingAddress: string;
  items: OrderItem[];
}

export interface Address {
  id: number;
  label: string;
  name: string;
  phone: string;
  city: string;
  zone: string;
  address: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  joined: string;
}

/* ─── Status metadata ─── */

export const ORDER_STATUS_META: Record<
  OrderStatus,
  { label: string; badgeClass: string; dotClass: string }
> = {
  pending: {
    label: 'Pending',
    badgeClass: 'bg-status-pending/10 text-status-pending',
    dotClass: 'bg-status-pending',
  },
  confirmed: {
    label: 'Confirmed',
    badgeClass: 'bg-accent/10 text-accent',
    dotClass: 'bg-accent',
  },
  processing: {
    label: 'Processing',
    badgeClass: 'bg-status-processing/10 text-status-processing',
    dotClass: 'bg-status-processing',
  },
  shipped: {
    label: 'Shipped',
    badgeClass: 'bg-status-shipped/10 text-status-shipped',
    dotClass: 'bg-status-shipped',
  },
  delivered: {
    label: 'Delivered',
    badgeClass: 'bg-status-delivered/10 text-status-delivered',
    dotClass: 'bg-status-delivered',
  },
  cancelled: {
    label: 'Cancelled',
    badgeClass: 'bg-status-cancelled/10 text-status-cancelled',
    dotClass: 'bg-status-cancelled',
  },
};

/** Order flow shown in the progress tracker. */
export const ORDER_TRACKER_STEPS: OrderStatus[] = [
  'pending',
  'confirmed',
  'processing',
  'shipped',
  'delivered',
];

/* ─── Derived helpers ─── */

export const orderSubtotal = (order: Order): number =>
  order.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export const orderTotal = (order: Order): number =>
  orderSubtotal(order) + order.shipping;

/* ─── Dummy profile ─── */

export const profile: UserProfile = {
  id: 1,
  name: 'Rahim Uddin',
  email: 'rahim@example.com',
  phone: '01712-345678',
  joined: 'March 2024',
};

/* ─── Dummy orders ─── */

export const orders: Order[] = [
  {
    id: '#12345',
    date: '12 Aug 2026',
    status: 'delivered',
    paymentMethod: 'bKash',
    shipping: 60,
    shippingAddress: 'House 12, Road 5, Dhanmondi, Dhaka',
    items: [
      {
        id: 1,
        name: 'Acrylic Paint Set - 24 Tube Colors',
        image: '/images/product-1.jpeg',
        quantity: 2,
        price: 1650,
      },
      {
        id: 3,
        name: 'Stretched Cotton Canvas 16×20 inch - Pack of 5',
        image: '/images/product-3.jpeg',
        quantity: 1,
        price: 1200,
      },
    ],
  },
  {
    id: '#12346',
    date: '14 Aug 2026',
    status: 'processing',
    paymentMethod: 'Cash on Delivery',
    shipping: 60,
    shippingAddress: 'Level 4, ABC Tower, Gulshan-1, Dhaka',
    items: [
      {
        id: 2,
        name: 'Watercolor Pan Set - 36 Colors',
        image: '/images/product-2.jpeg',
        quantity: 1,
        price: 1350,
      },
    ],
  },
  {
    id: '#12347',
    date: '10 Aug 2026',
    status: 'shipped',
    paymentMethod: 'SSL Commerz',
    shipping: 120,
    shippingAddress: 'Road 7, Uposhohor, Sylhet',
    items: [
      {
        id: 4,
        name: 'Professional Synthetic Brush Set - 15 Pieces',
        image: '/images/product-4.jpeg',
        quantity: 1,
        price: 2100,
      },
    ],
  },
  {
    id: '#12348',
    date: '15 Aug 2026',
    status: 'pending',
    paymentMethod: 'Cash on Delivery',
    shipping: 60,
    shippingAddress: 'House 22, Road 3, Mirpur, Dhaka',
    items: [
      {
        id: 12,
        name: 'Craft Glue Gun with 20 Glue Sticks',
        image: '/images/product-12.jpeg',
        quantity: 1,
        price: 440,
      },
    ],
  },
  {
    id: '#12349',
    date: '08 Aug 2026',
    status: 'cancelled',
    paymentMethod: 'Cash on Delivery',
    shipping: 60,
    shippingAddress: 'Road 2, Chittagong',
    items: [
      {
        id: 7,
        name: 'Graphite Pencil Set - 12 Grades (6H to 8B)',
        image: '/images/product-7.jpeg',
        quantity: 1,
        price: 950,
      },
    ],
  },
  {
    id: '#12350',
    date: '02 Aug 2026',
    status: 'delivered',
    paymentMethod: 'bKash',
    shipping: 60,
    shippingAddress: 'House 12, Road 5, Dhanmondi, Dhaka',
    items: [
      {
        id: 6,
        name: 'Oil Paint Set - 12 Tubes 40ml Each',
        image: '/images/product-6.jpeg',
        quantity: 1,
        price: 2560,
      },
    ],
  },
];

/* ─── Dummy addresses ─── */

export const addresses: Address[] = [
  {
    id: 1,
    label: 'Home',
    name: 'Rahim Uddin',
    phone: '01712-345678',
    city: 'Dhaka',
    zone: 'Dhanmondi',
    address: 'House 12, Road 5, Dhanmondi',
    isDefault: true,
  },
  {
    id: 2,
    label: 'Office',
    name: 'Rahim Uddin',
    phone: '01712-345678',
    city: 'Dhaka',
    zone: 'Gulshan',
    address: 'Level 4, ABC Tower, Gulshan-1',
    isDefault: false,
  },
];
