import { NextResponse } from 'next/server';
import { Product } from '@/entities/product/model/types';

const products: Product[] = [
  {
    id: 'p-1',
    name: 'Чохол Chocolate для iPhone 14',
    category: 'cases',
    price: 1399,
    badge: 'Хіт',
    image: 'https://images.unsplash.com/photo-1610465299996-30f240ac2b8b?auto=format&fit=crop&w=900&q=60',
    colors: ['Чорний', 'Бузковий', 'Карамель'],
    stock: 42
  },
  {
    id: 'p-2',
    name: 'Навушники TWS Studio X',
    category: 'audio',
    price: 2899,
    badge: 'Новинка',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=60',
    colors: ['Білий', 'Чорний'],
    stock: 15
  },
  {
    id: 'p-3',
    name: 'Захисне скло 3D для iPhone 14',
    category: 'glass',
    price: 499,
    image: 'https://images.unsplash.com/photo-1520367745676-254aa99d3c20?auto=format&fit=crop&w=900&q=60',
    colors: ['Прозорий'],
    stock: 64
  }
];

export async function GET() {
  return NextResponse.json(products);
}
