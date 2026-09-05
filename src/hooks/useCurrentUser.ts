import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/store/auth.store';
import type { User } from '@/types/auth.types';

export function useCurrentUserQuery() {
  const { isAuthenticated, setUser, setInitialized } = useAuthStore();

  const query = useQuery<User>({
    queryKey: ['currentUser'],
    queryFn: async () => {
      const user = await authService.getProfile();
      return user;
    },
    // Only attempt profile fetch if user is marked authenticated or during initial load
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
      setInitialized(true);
    } else if (query.isError) {
      setInitialized(true);
    }
  }, [query.data, query.isError, setUser, setInitialized]);

  return query;
}
