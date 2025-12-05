import type { Product } from '@/entities/product/model/types';
import type { User } from '@/entities/user/model/types';

export interface Review {
  id: string;
  productId: Product['id'];
  authorId: User['id'];
  rating: number;
  title?: string;
  comment: string;
  createdAt: string;
  updatedAt?: string;
}
