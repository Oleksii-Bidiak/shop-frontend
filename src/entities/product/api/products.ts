import { axiosInstance } from '@/shared/api/axios-instance';
import { Product } from '@/entities/product/model/types';

export const fetchProducts = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get<Product[]>('/products');
  return data;
};
