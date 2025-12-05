'use client';

import { useEffect } from 'react';
import { useQuery, queryOptions } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { fetchCart } from '@/entities/cart/api/cart';
import type { AppDispatch } from '@/shared/store';
import { setCart, setStatus } from '@/features/cart/model/cart-slice';
import { loadCartFromStorage } from '@/features/cart/lib/storage';

export const cartQueryOptions = queryOptions({
  queryKey: ['cart'],
  queryFn: fetchCart,
  retry: 0
});

export const useCartQuery = (enabled = true) => {
  const dispatch = useDispatch<AppDispatch>();

  const query = useQuery({
    ...cartQueryOptions,
    enabled
  });

  useEffect(() => {
    if (query.isFetching) {
      dispatch(setStatus('loading'));
    }
  }, [dispatch, query.isFetching]);

  useEffect(() => {
    if (query.data) {
      dispatch(setCart(query.data));
    }
  }, [dispatch, query.data]);

  useEffect(() => {
    if (query.isError) {
      const stored = loadCartFromStorage();
      if (stored) {
        dispatch(setCart({ ...stored, updatedAt: stored.updatedAt ?? new Date().toISOString() }));
      }

      dispatch(setStatus('error'));
    }
  }, [dispatch, query.isError]);

  return query;
};
