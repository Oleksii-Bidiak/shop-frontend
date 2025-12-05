'use client';

import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/shared/store';
import { setCart } from '@/features/cart/model/cart-slice';
import { loadCartFromStorage, persistCartToStorage } from './storage';

export const useCartPersistence = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);

  useEffect(() => {
    const stored = loadCartFromStorage();

    if (stored && !cart.items.length) {
      dispatch(setCart({ ...stored, updatedAt: stored.updatedAt ?? new Date().toISOString() }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    persistCartToStorage(cart);
  }, [cart]);
};
