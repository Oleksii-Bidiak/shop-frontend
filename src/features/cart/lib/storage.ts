import { CartState } from '@/features/cart/model/cart-slice';

const STORAGE_KEY = 'cart-state';

export const loadCartFromStorage = (): CartState | null => {
  if (typeof window === 'undefined') return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as CartState;
  } catch (error) {
    console.error('Failed to parse cart from storage', error);
    return null;
  }
};

export const persistCartToStorage = (value: CartState) => {
  if (typeof window === 'undefined') return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
};

export const clearCartStorage = () => {
  if (typeof window === 'undefined') return;

  window.localStorage.removeItem(STORAGE_KEY);
};
