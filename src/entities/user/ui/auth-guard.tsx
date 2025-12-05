'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../model/hooks';

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
  redirectTo?: string;
}

export const AuthGuard = ({ children, fallback = null, redirectTo = '/catalog' }: AuthGuardProps) => {
  const { isAuthenticated, isRefreshing, isAnonymous } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAnonymous && redirectTo) {
      router.replace(redirectTo);
    }
  }, [isAnonymous, redirectTo, router]);

  if (isRefreshing) return <>{fallback}</>;

  if (!isAuthenticated) return <>{fallback}</>;

  return <>{children}</>;
};
