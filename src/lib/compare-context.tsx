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
 * Global compare store.
 *
 * Keeps up to MAX_COMPARE product IDs in state (with localStorage persistence)
 * so the header icon, product detail button and the compare page all stay in
 * sync without prop drilling.
 */

const STORAGE_KEY = 'purple-compare';

/** Maximum number of products that can be compared at once. */
export const MAX_COMPARE = 3;

/* Seed with a couple of products so the compare list isn't empty on first visit. */
const DEFAULT_ITEMS: number[] = [1, 2];

interface CompareContextValue {
  /** Product ids currently in the compare list (insertion order). */
  items: number[];
  totalItems: number;
  maxItems: number;
  isInCompare: (id: number) => boolean;
  /** Adds a product. Returns false when the list is already full. */
  addToCompare: (id: number) => boolean;
  removeFromCompare: (id: number) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextValue | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<number[]>(DEFAULT_ITEMS);
  const [hydrated, setHydrated] = useState(false);

  /* Load persisted compare list once, on the client, after hydration. */
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

  /* Persist to localStorage whenever the compare list changes. */
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore storage errors */
    }
  }, [items, hydrated]);

  const isInCompare = useCallback((id: number) => items.includes(id), [items]);

  const addToCompare = useCallback(
    (id: number): boolean => {
      if (items.includes(id)) return true;
      if (items.length >= MAX_COMPARE) return false;
      setItems((prev) => [...prev, id]);
      return true;
    },
    [items],
  );

  const removeFromCompare = useCallback((id: number) => {
    setItems((prev) => prev.filter((x) => x !== id));
  }, []);

  const clearCompare = useCallback(() => setItems([]), []);

  return (
    <CompareContext.Provider
      value={{
        items,
        totalItems: items.length,
        maxItems: MAX_COMPARE,
        isInCompare,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare(): CompareContextValue {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
