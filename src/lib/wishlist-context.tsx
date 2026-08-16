'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

/**
 * Global wishlist store.
 *
 * Keeps product IDs in state (with localStorage persistence) so the heart
 * icon, header count badge, product detail button and the wishlist page all
 * stay in sync without prop drilling.
 */

const STORAGE_KEY = 'purple-wishlist';

/* Seed with a few products so the wishlist isn't empty on first visit. */
const DEFAULT_ITEMS: number[] = [1, 2, 3, 4];

interface WishlistContextValue {
  /** Product ids currently in the wishlist (insertion order). */
  items: number[];
  totalItems: number;
  isInWishlist: (id: number) => boolean;
  toggleWishlist: (id: number) => void;
  addToWishlist: (id: number) => void;
  removeFromWishlist: (id: number) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  /* Initial state must be identical on server & client to avoid hydration
     mismatches, so we always start from DEFAULT_ITEMS and hydrate from
     localStorage in a client-only effect after mount. */
  const [items, setItems] = useState<number[]>(DEFAULT_ITEMS);
  const [hydrated, setHydrated] = useState(false);

  /* Load persisted wishlist once, on the client, after hydration. */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setItems(parsed.filter((id): id is number => typeof id === 'number'));
        }
      }
    } catch {
      /* ignore storage errors (e.g. private mode) */
    }
    setHydrated(true);
  }, []);

  /* Persist to localStorage whenever the wishlist changes. Skip the very
     first render so we don't clobber stored data before it has been read. */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage errors */
    }
  }, [items, hydrated]);

  const isInWishlist = useCallback((id: number) => items.includes(id), [items]);

  const toggleWishlist = useCallback((id: number) => {
    setItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }, []);

  const addToWishlist = useCallback((id: number) => {
    setItems((prev) => (prev.includes(id) ? prev : [...prev, id]));
  }, []);

  const removeFromWishlist = useCallback((id: number) => {
    setItems((prev) => prev.filter((x) => x !== id));
  }, []);

  const clearWishlist = useCallback(() => setItems([]), []);

  return (
    <WishlistContext.Provider
      value={{
        items,
        totalItems: items.length,
        isInWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist(): WishlistContextValue {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}
