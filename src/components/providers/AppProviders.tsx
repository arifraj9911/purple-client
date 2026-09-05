'use client';

import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useCurrentUserQuery } from '@/hooks/useCurrentUser';

function AuthInitializer() {
  // Initiates profile sync with server on mount
  useCurrentUserQuery();
  return null;
}

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer />
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            fontFamily: 'var(--font-inter), sans-serif',
          },
        }}
      />
      {children}
    </QueryClientProvider>
  );
}
