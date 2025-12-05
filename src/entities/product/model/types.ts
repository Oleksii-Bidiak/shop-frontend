export interface Product {
  id: string;
  name: string;
  category: 'cases' | 'audio' | 'glass' | 'chargers' | 'other';
  price: number;
  badge?: string;
  image: string;
  colors: string[];
  stock: number;
}
