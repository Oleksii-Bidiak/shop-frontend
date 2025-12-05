'use client';

import { useCallback, useMemo } from 'react';

import { useSessionQuery } from '@/features/user';
import { clearSession, setRefreshing, setSession as setSessionAction } from '@/features/user/model/auth-slice';
import { SessionPayload } from '@/shared/types/auth';
import { useAppDispatch, useAppSelector } from '@/shared/store';

export const useSession = (options?: { enabled?: boolean }) => {
  const dispatch = useAppDispatch();
  const { accessToken, refreshToken, status, user } = useAppSelector((state) => state.auth);

  const query = useSessionQuery(options?.enabled ?? true);

  const setSession = useCallback(
    (payload: SessionPayload) => {
      dispatch(setSessionAction(payload));
    },
    [dispatch]
  );

  const clear = useCallback(() => {
    dispatch(clearSession());
  }, [dispatch]);

  const startRefresh = useCallback(() => {
    dispatch(setRefreshing());
  }, [dispatch]);

  return {
    accessToken,
    refreshToken,
    status,
    user,
    setSession,
    clearSession: clear,
    setRefreshing: startRefresh,
    query
  };
};

export const useAuth = () => {
  const { user, status } = useSession();

  return useMemo(
    () => ({
      user,
      status,
      isAuthenticated: status === 'authenticated',
      isAnonymous: status === 'anonymous',
      isRefreshing: status === 'refreshing'
    }),
    [status, user]
  );
};
