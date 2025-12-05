'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '../model/hooks';
import { UserRole } from '../model/types';

interface RoleGuardProps {
  children: ReactNode;
  allowedRoles: UserRole[];
  fallback?: ReactNode;
  redirectTo?: string;
}

export const RoleGuard = ({
  children,
  allowedRoles,
  fallback = null,
  redirectTo = '/catalog'
}: RoleGuardProps) => {
  const { user, isAuthenticated, isRefreshing } = useAuth();
  const router = useRouter();

  const isAllowed = user && allowedRoles.includes(user.role);

  useEffect(() => {
    if (isAuthenticated && !isAllowed && redirectTo) {
      router.replace(redirectTo);
    }
  }, [isAllowed, isAuthenticated, redirectTo, router]);

  if (isRefreshing) return <>{fallback}</>;

  if (!isAuthenticated || !isAllowed) return <>{fallback}</>;

  return <>{children}</>;
};
