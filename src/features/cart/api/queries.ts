'use client';

import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';

import { cartQueryOptions } from '@/entities/cart/api/queries';
import type { AppDispatch } from '@/shared/store';
import { setCart, setStatus } from '../model/cart-slice';

export const useCartQuery = (enabled = true) => {
  const dispatch = useDispatch<AppDispatch>();
  const query = useQuery({ ...cartQueryOptions, enabled });

  useEffect(() => {
    if (query.isLoading) {
      dispatch(setStatus('loading'));
    } else if (query.isError) {
      dispatch(setStatus('error'));
    } else {
      dispatch(setStatus('idle'));
    }
  }, [dispatch, query.isError, query.isLoading]);

  useEffect(() => {
    if (query.data) {
      dispatch(setCart(query.data));
    }
  }, [dispatch, query.data]);

  return query;
};
