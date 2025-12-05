import { Cart } from '@/entities/cart/model/types';
import { Product } from '@/entities/product/model/types';
import { SessionPayload } from '@/shared/types/auth';

export const sessionFixture: SessionPayload = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  user: {
    id: 'u-1',
    email: 'admin@shop.ua',
    role: 'admin'
  }
};

export const productsFixture: Product[] = [
  {
    id: 'p-1',
    slug: 'chohol-chocolate-iphone-14',
    name: 'Чохол Chocolate для iPhone 14',
    category: 'cases',
    categoryId: 'cat-cases',
    price: 1399,
    badge: 'Хіт',
    image: 'https://images.unsplash.com/photo-1610465299996-30f240ac2b8b?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1610465299996-30f240ac2b8b?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Чорний', 'Бузковий', 'Карамель'],
    stock: 42,
    rating: 4.8,
    reviewCount: 124,
    shortDescription: 'Силіконовий чохол із софт-тач покриттям і надійним захистом камери.'
  },
  {
    id: 'p-2',
    slug: 'navushniki-tws-studio-x',
    name: 'Навушники TWS Studio X',
    category: 'audio',
    categoryId: 'cat-audio',
    price: 2899,
    badge: 'Новинка',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Білий', 'Чорний'],
    stock: 15,
    rating: 4.6,
    reviewCount: 57,
    shortDescription: 'Бездротові навушники з активним шумопоглинанням та автономністю до 24 годин.'
  },
  {
    id: 'p-3',
    slug: 'zahysne-sklo-3d-iphone-14',
    name: 'Захисне скло 3D для iPhone 14',
    category: 'glass',
    categoryId: 'cat-glass',
    price: 499,
    image: 'https://images.unsplash.com/photo-1520367745676-254aa99d3c20?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1520367745676-254aa99d3c20?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Прозорий'],
    stock: 64,
    rating: 4.9,
    reviewCount: 201,
    shortDescription: 'Посилене скло з олеофобним покриттям і рамкою для точного монтажу.'
  }
];

export const cartFixture: Cart = {
  id: 'cart-1',
  userId: sessionFixture.user.id,
  items: [
    {
      productId: productsFixture[0].id,
      quantity: 2,
      price: productsFixture[0].price,
      title: productsFixture[0].name,
      selectedOptions: { color: productsFixture[0].colors[0] }
    },
    {
      productId: productsFixture[1].id,
      quantity: 1,
      price: productsFixture[1].price,
      title: productsFixture[1].name,
      selectedOptions: { color: productsFixture[1].colors[0] }
    }
  ],
  totalPrice: productsFixture[0].price * 2 + productsFixture[1].price,
  currency: 'UAH',
  updatedAt: new Date().toISOString()
};
