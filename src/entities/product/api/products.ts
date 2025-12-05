import { apiClient } from '@/shared/api/client';
import { restContract } from '@/shared/api/contracts';
import { Product } from '@/entities/product/model/types';

export const fetchProducts = async (): Promise<Product[]> =>
  apiClient.get<Product[]>(restContract.products.list.path);
