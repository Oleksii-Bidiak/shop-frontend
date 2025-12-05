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
    brand: 'SoftArmor',
    productType: 'Чохол',
    image: 'https://images.unsplash.com/photo-1610465299996-30f240ac2b8b?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1610465299996-30f240ac2b8b?auto=format&fit=crop&w=900&q=60' },
      { url: 'https://images.unsplash.com/photo-1582719478248-54e9f2af7567?auto=format&fit=crop&w=900&q=60' },
      { url: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Чорний', 'Бузковий', 'Карамель'],
    compatibility: ['iPhone 14', 'iPhone 13'],
    stock: 42,
    rating: 4.8,
    reviewCount: 124,
    shortDescription: 'Силіконовий чохол із софт-тач покриттям і надійним захистом камери.',
    variants: [
      { id: 'p-1-v1', model: 'Slim', color: 'Чорний', price: 1399, stock: 24 },
      { id: 'p-1-v2', model: 'Slim', color: 'Бузковий', price: 1399, stock: 10 },
      { id: 'p-1-v3', model: 'Armor', color: 'Чорний', price: 1599, stock: 8 },
      { id: 'p-1-v4', model: 'Armor', color: 'Карамель', price: 1599, stock: 5 }
    ],
    specs: [
      { label: 'Матеріал', value: 'Силікон + мікрофібра' },
      { label: 'Сумісність', value: 'iPhone 14 / 13' },
      { label: 'Особливості', value: 'Підтримка MagSafe, піднята рамка камери' }
    ]
  },
  {
    id: 'p-2',
    slug: 'navushniki-tws-studio-x',
    name: 'Навушники TWS Studio X',
    category: 'audio',
    categoryId: 'cat-audio',
    price: 2899,
    badge: 'Новинка',
    brand: 'SonicPro',
    productType: 'Навушники',
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&q=60' },
      { url: 'https://images.unsplash.com/photo-1526171522841-4af0970c2e5f?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Білий', 'Чорний'],
    compatibility: ['iOS', 'Android', 'Windows'],
    stock: 15,
    rating: 4.6,
    reviewCount: 57,
    shortDescription: 'Бездротові навушники з активним шумопоглинанням та автономністю до 24 годин.',
    variants: [
      { id: 'p-2-v1', model: 'Studio X', color: 'Білий', price: 2899, stock: 8 },
      { id: 'p-2-v2', model: 'Studio X', color: 'Чорний', price: 2899, stock: 7 },
      { id: 'p-2-v3', model: 'Studio X Max', color: 'Чорний', price: 3299, stock: 4 }
    ],
    specs: [
      { label: 'Час роботи', value: 'до 24 годин з кейсом' },
      { label: 'Шумопоглинання', value: 'Активне, 35 дБ' },
      { label: 'Підключення', value: 'Bluetooth 5.3, Multipoint' }
    ]
  },
  {
    id: 'p-3',
    slug: 'zahysne-sklo-3d-iphone-14',
    name: 'Захисне скло 3D для iPhone 14',
    category: 'glass',
    categoryId: 'cat-glass',
    price: 499,
    brand: 'ShieldX',
    productType: 'Захисне скло',
    image: 'https://images.unsplash.com/photo-1520367745676-254aa99d3c20?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1520367745676-254aa99d3c20?auto=format&fit=crop&w=900&q=60' },
      { url: 'https://images.unsplash.com/photo-1509701852056-175e52791dd3?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Прозорий'],
    compatibility: ['iPhone 14', 'iPhone 13'],
    stock: 64,
    rating: 4.9,
    reviewCount: 201,
    shortDescription: 'Посилене скло з олеофобним покриттям і рамкою для точного монтажу.',
    specs: [
      { label: 'Твердість', value: '9H' },
      { label: 'Покриття', value: 'Олеофобне' },
      { label: 'Форм-фактор', value: 'Full glue, 3D' }
    ]
  },
  {
    id: 'p-4',
    slug: 'chargers-gan-65w',
    name: 'Зарядний пристрій GaN 65W',
    category: 'chargers',
    categoryId: 'cat-chargers',
    price: 1899,
    badge: 'ТОП продажів',
    brand: 'Voltix',
    productType: 'Зарядний пристрій',
    image: 'https://images.unsplash.com/photo-1582719478248-54e9f2af7567?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1582719478248-54e9f2af7567?auto=format&fit=crop&w=900&q=60' },
      { url: 'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Білий'],
    compatibility: ['USB-C ноутбуки', 'iPhone', 'Android'],
    stock: 33,
    rating: 4.7,
    reviewCount: 89,
    shortDescription: 'GaN зарядка з двома USB-C та PPS для швидкого заряджання ноутбуків і смартфонів.',
    specs: [
      { label: 'Потужність', value: '65W' },
      { label: 'Порти', value: '2x USB-C, 1x USB-A' },
      { label: 'Протоколи', value: 'PD3.1, PPS, QC4+' }
    ]
  },
  {
    id: 'p-5',
    slug: 'powerbank-20000-mah',
    name: 'Powerbank 20 000 мА·год PD',
    category: 'chargers',
    categoryId: 'cat-chargers',
    price: 2399,
    brand: 'NordCharge',
    productType: 'Павербанк',
    image: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1509395062183-67c5ad6faff9?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Чорний', 'Сірий'],
    compatibility: ['Ноутбуки до 45W', 'iPhone', 'Android'],
    stock: 21,
    rating: 4.5,
    reviewCount: 33,
    shortDescription: 'Ємнісний павербанк із двома USB-C, дисплеєм заряду та підтримкою PD 45W.'
  },
  {
    id: 'p-6',
    slug: 'urban-line-laptop-sleeve-14',
    name: 'Чохол для ноутбука Urban Line 14"',
    category: 'other',
    categoryId: 'cat-other',
    price: 1599,
    brand: 'Urban Line',
    productType: 'Сумка / Sleeve',
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=60' },
      { url: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Сірий', 'Темно-синій'],
    compatibility: ['Ноутбуки 13"-14"'],
    stock: 18,
    rating: 4.4,
    reviewCount: 17,
    shortDescription: 'Водовідштовхувальний чохол з кишенями для зарядки та аксесуарів.'
  },
  {
    id: 'p-7',
    slug: 'magsafe-powerbank-mini',
    name: 'MagSafe батарея Mini 5000 мА·год',
    category: 'chargers',
    categoryId: 'cat-chargers',
    price: 1899,
    badge: 'MagSafe',
    brand: 'Orbit',
    productType: 'MagSafe акумулятор',
    image: 'https://images.unsplash.com/photo-1517429128955-67ff5c1e29ec?auto=format&fit=crop&w=900&q=60',
    gallery: [
      { url: 'https://images.unsplash.com/photo-1517429128955-67ff5c1e29ec?auto=format&fit=crop&w=900&q=60' },
      { url: 'https://images.unsplash.com/photo-1512499617640-c2f999098c01?auto=format&fit=crop&w=900&q=60' }
    ],
    colors: ['Білий', 'Чорний'],
    compatibility: ['iPhone 12/13/14/15', 'MagSafe чохли'],
    stock: 27,
    rating: 4.3,
    reviewCount: 41,
    shortDescription: 'Компактний MagSafe акумулятор із потужністю 15W та зарядкою через USB-C.'
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
