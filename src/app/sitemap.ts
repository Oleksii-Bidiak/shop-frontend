import type { MetadataRoute } from 'next';

import { productsFixture } from '@/shared/api/mocks/fixtures';
import { appConfig } from '@/shared/config/app';

const buildUrl = (path: string) => new URL(path, appConfig.siteUrl).toString();

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: buildUrl('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: buildUrl('/catalog'), lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: buildUrl('/design-system'), lastModified: now, changeFrequency: 'monthly', priority: 0.4 }
  ];

  const productRoutes: MetadataRoute.Sitemap = productsFixture.map((product) => ({
    url: buildUrl(`/products/${product.id}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  return [...staticRoutes, ...productRoutes];
}
