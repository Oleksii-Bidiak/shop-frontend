'use client';

import { ReactNode, useState } from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { store } from '@/shared/store';
import { ThemeProvider } from './theme-provider';
import { ToastProvider } from '@/shared/ui/toast';

interface Props {
  children: ReactNode;
}

export function AppProviders({ children }: Props) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Provider store={store}>
      <ThemeProvider>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </ToastProvider>
      </ThemeProvider>
    </Provider>
  );
}
