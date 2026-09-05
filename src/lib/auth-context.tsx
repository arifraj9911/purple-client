'use client';

import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useAuthStore } from '@/store/auth.store';
import { useLogoutMutation } from '@/hooks/useAuthMutations';

export interface AuthUser {
  id: string | number;
  name: string;
  email: string;
  phone?: string;
  isVerified?: boolean;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoggedIn: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { user: storeUser, isAuthenticated, setAuth } = useAuthStore();
  const logoutMutation = useLogoutMutation();

  const user: AuthUser | null = useMemo(() => {
    if (!storeUser) return null;
    return {
      id: storeUser.id,
      name: storeUser.fullName || storeUser.email.split('@')[0],
      email: storeUser.email,
      phone: '017XXXXXXXX',
      isVerified: storeUser.isVerified,
    };
  }, [storeUser]);

  const login = (email: string, name?: string) => {
    setAuth({
      id: 'local-session',
      email,
      fullName: name || email.split('@')[0],
      isVerified: true,
      provider: 'LOCAL',
    });
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: isAuthenticated && !!user,
        login,
        logout,
      }}
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
