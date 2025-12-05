import type { Category } from '@/entities/category';

export interface ProductMedia {
  url: string;
  alt?: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  model: string;
  color: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  categoryId: Category['id'];
  category: Category['slug'];
  price: number;
  badge?: string;
  brand?: string;
  productType?: string;
  image: string;
  gallery: ProductMedia[];
  colors: string[];
  compatibility?: string[];
  stock: number;
  rating?: number;
  reviewCount?: number;
  shortDescription?: string;
  variants?: ProductVariant[];
  specs?: ProductSpecification[];
}
