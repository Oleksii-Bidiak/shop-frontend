'use client';

import { useEffect } from 'react';
import { useQuery, queryOptions } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { fetchSession } from '@/shared/api/auth';
import { loadTokens } from '@/shared/lib/token-storage';
import type { AppDispatch } from '@/shared/store';
import { clearSession, setRefreshing, setSession } from '../model/auth-slice';

export const sessionQueryOptions = queryOptions({
  queryKey: ['session'],
  queryFn: fetchSession,
  retry: 0
});

export const useSessionQuery = (enabled = true) => {
  const dispatch = useDispatch<AppDispatch>();
  const hasAccessToken = Boolean(loadTokens().accessToken);

  const query = useQuery({
    ...sessionQueryOptions,
    enabled: enabled && hasAccessToken
  });

  useEffect(() => {
    if (query.isFetching) {
      dispatch(setRefreshing());
    }
  }, [dispatch, query.isFetching]);

  useEffect(() => {
    if (query.data) {
      dispatch(setSession(query.data));
    }
  }, [dispatch, query.data]);

  useEffect(() => {
    if (query.isError) {
      dispatch(clearSession());
    }
  }, [dispatch, query.isError]);

  return query;
};
