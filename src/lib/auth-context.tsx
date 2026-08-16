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
 * Global (mock) authentication store.
 *
 * Tracks the currently signed-in user so the header profile dropdown and the
 * user dashboard stay in sync. Swap `login`/`logout` for real API calls later.
 */

export interface AuthUser {
  id: number;
  name: string;
  email: string;
  phone: string;
}

const STORAGE_KEY = 'purple-auth-user';

/** Derive a readable display name from an email (used by the mock login). */
const nameFromEmail = (email: string): string => {
  const local = email.split('@')[0] ?? '';
  const name = local.replace(/[._-]+/g, ' ').trim();
  if (!name) return 'Customer';
  return name.replace(/\b\w/g, (c) => c.toUpperCase());
};

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  /* Restore the signed-in user once, on the client, after hydration. */
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setUser(JSON.parse(stored) as AuthUser);
    } catch {
      /* ignore storage errors */
    }
    setHydrated(true);
  }, []);

  /* Persist the signed-in user (or clear it on logout). */
  useEffect(() => {
    if (!hydrated) return;
    try {
      if (user) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      /* ignore storage errors */
    }
  }, [user, hydrated]);

  const login = useCallback((email: string, name?: string) => {
    setUser({
      id: 1,
      name: name ?? nameFromEmail(email),
      email,
      phone: '017XXXXXXXX',
    });
  }, []);

  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider
      value={{ user, isLoggedIn: user !== null, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
