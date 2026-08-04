'use client';

import {
  createContext,
  useContext,
  useReducer,
  useCallback,
  type ReactNode,
} from 'react';

/* ─── Types ─── */

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  basePrice?: number;
  discountPrice?: number;
  image: string;
  quantity: number;
  slug: string;
}

interface CartState {
  items: CartItem[];
  isDrawerOpen: boolean;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { id: string | number } }
  | {
      type: 'UPDATE_QUANTITY';
      payload: { id: string | number; quantity: number };
    }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_DRAWER'; payload?: boolean };

/* ─── Reducer ─── */

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (item) => item.id === action.payload.id,
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item,
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      };

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item,
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    case 'TOGGLE_DRAWER':
      return {
        ...state,
        isDrawerOpen: action.payload ?? !state.isDrawerOpen,
      };

    default:
      return state;
  }
}

/* ─── Context ─── */

interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  isDrawerOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  clearCart: () => void;
  openDrawer: () => void;
  closeDrawer: () => void;
  toggleDrawer: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

/* ─── Provider ─── */

const initialState: CartState = {
  items: [
    {
      id: 1,
      name: 'Acrylic Paint Set - 12 Colors',
      price: 1200,
      basePrice: 1500,
      discountPrice: 1200,
      image: '/images/product-placeholder.svg',
      quantity: 2,
      slug: 'acrylic-paint-set-12-colors',
    },
    {
      id: 2,
      name: 'Professional Watercolor Brush Set for Artists and Beginners - Premium Quality Round & Flat Brushes Complete Collection',
      price: 850,
      basePrice: 1100,
      discountPrice: 850,
      image: '/images/product-placeholder.svg',
      quantity: 1,
      slug: 'professional-watercolor-brush-set',
    },
    {
      id: 3,
      name: 'Stretched Canvas 12×16 inch',
      price: 450,
      basePrice: 600,
      discountPrice: 450,
      image: '/images/product-placeholder.svg',
      quantity: 3,
      slug: 'stretched-canvas-12x16',
    },
    {
      id: 4,
      name: 'Oil Paint Set - 24 Tubes Assorted Colors with Carrying Case',
      price: 2200,
      basePrice: 2800,
      discountPrice: 2200,
      image: '/images/product-placeholder.svg',
      quantity: 1,
      slug: 'oil-paint-set-24-colors',
    },
    {
      id: 5,
      name: 'Sketch Pad A4 Spiral Bound',
      price: 320,
      image: '/images/product-placeholder.svg',
      quantity: 5,
      slug: 'sketch-pad-a4',
    },
    {
      id: 6,
      name: 'Premium Artist Easel Stand - Adjustable Height Heavy Duty Wooden Tripod Display Easel for Painting, Drawing & Canvas Display',
      price: 3500,
      basePrice: 4200,
      discountPrice: 3500,
      image: '/images/product-placeholder.svg',
      quantity: 1,
      slug: 'premium-artist-easel-stand',
    },
    {
      id: 7,
      name: 'Color Pencil Set - 48 Shades',
      price: 680,
      image: '/images/product-placeholder.svg',
      quantity: 2,
      slug: 'color-pencil-set-48',
    },
    {
      id: 8,
      name: 'Watercolor Pad 300GSM Cold Press',
      price: 550,
      basePrice: 700,
      discountPrice: 550,
      image: '/images/product-placeholder.svg',
      quantity: 2,
      slug: 'watercolor-pad-300gsm',
    },
    {
      id: 9,
      name: 'Calligraphy Pen Set',
      price: 1200,
      image: '/images/product-placeholder.svg',
      quantity: 1,
      slug: 'calligraphy-pen-set',
    },
    {
      id: 10,
      name: 'Complete Artist Starter Kit for Beginners & Professionals - Includes Acrylic Paints, Brushes, Canvas Panels, Palette, and Easel - Perfect Gift Set',
      price: 4500,
      basePrice: 5500,
      discountPrice: 4500,
      image: '/images/product-placeholder.svg',
      quantity: 1,
      slug: 'complete-artist-starter-kit',
    },
  ],
  isDrawerOpen: false,
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeItem = useCallback((id: string | number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  }, []);

  const updateQuantity = useCallback(
    (id: string | number, quantity: number) => {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    },
    [],
  );

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const openDrawer = useCallback(() => {
    dispatch({ type: 'TOGGLE_DRAWER', payload: true });
  }, []);

  const closeDrawer = useCallback(() => {
    dispatch({ type: 'TOGGLE_DRAWER', payload: false });
  }, []);

  const toggleDrawer = useCallback(() => {
    dispatch({ type: 'TOGGLE_DRAWER' });
  }, []);

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = state.items.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        totalItems,
        subtotal,
        isDrawerOpen: state.isDrawerOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        openDrawer,
        closeDrawer,
        toggleDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

/* ─── Hook ─── */

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
