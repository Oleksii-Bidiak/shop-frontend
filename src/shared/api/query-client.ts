import { QueryCache, QueryClient } from '@tanstack/react-query';

import { ApiError } from '@/shared/api/errors';

export const createQueryClient = () =>
  new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => {
        const apiError = error as ApiError;
        console.error('[API] Query failed', apiError.message, apiError.details);
      }
    }),
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: 1
      },
      mutations: {
        retry: 0
      }
    }
  });
