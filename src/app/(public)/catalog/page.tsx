import type { Metadata } from 'next';

import { CatalogPage } from '@/pages/catalog';

export const metadata: Metadata = {
  title: 'Каталог аксесуарів | shop-frontend',
  description: 'Фільтри по бренду, сумісності та ціні з SSR/ISR для SEO.',
  alternates: { canonical: '/catalog' },
  openGraph: {
    type: 'website',
    title: 'Каталог аксесуарів | shop-frontend',
    description: 'Каталог аксесуарів із фільтрами, пагінацією та ISR.',
    url: '/catalog'
  },
  robots: {
    index: true,
    follow: true
  }
};

export const revalidate = 1800;

export default function CatalogRoute() {
  return <CatalogPage />;
}
