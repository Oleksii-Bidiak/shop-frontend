import type { CartItem } from '@/entities/cart/model/types';
import type { User } from '@/entities/user/model/types';

export type OrderStatus = 'draft' | 'pending' | 'paid' | 'shipped' | 'completed' | 'cancelled';

export interface Order {
  id: string;
  userId: User['id'];
  items: CartItem[];
  totalPrice: number;
  currency: 'UAH' | 'USD' | 'EUR';
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
  paymentMethod?: string;
  deliveryAddress?: string;
}
