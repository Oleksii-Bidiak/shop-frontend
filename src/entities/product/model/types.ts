import type { Category } from '@/entities/category';

export interface ProductMedia {
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: Category['id'];
  category: Category['slug'];
  price: number;
  badge?: string;
  image: string;
  gallery: ProductMedia[];
  colors: string[];
  stock: number;
  rating?: number;
  reviewCount?: number;
  shortDescription?: string;
}
