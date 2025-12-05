import type { Product } from '@/entities/product/model/types';
import type { User } from '@/entities/user/model/types';

export interface CartItem {
  productId: Product['id'];
  quantity: number;
  price: number;
  title?: string;
  selectedOptions?: {
    color?: string;
  };
}

export interface Cart {
  id: string;
  userId?: User['id'];
  items: CartItem[];
  totalPrice: number;
  currency: 'UAH' | 'USD' | 'EUR';
  updatedAt: string;
}
