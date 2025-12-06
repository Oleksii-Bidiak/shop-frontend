import type { MetadataRoute } from 'next';

import { appConfig } from '@/shared/config/app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api']
    },
    sitemap: `${appConfig.siteUrl}/sitemap.xml`,
    host: appConfig.siteUrl
  };
}
