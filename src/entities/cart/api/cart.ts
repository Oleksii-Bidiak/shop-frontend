import { apiClient } from '@/shared/api/client';
import { restContract } from '@/shared/api/contracts';
import { Cart } from '@/entities/cart/model/types';

export const fetchCart = async (): Promise<Cart> =>
  apiClient.get<Cart>(restContract.cart.current.path);
