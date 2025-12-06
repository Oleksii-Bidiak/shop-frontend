type AppEnvironment = 'development' | 'staging' | 'production';

const normalizeUrl = (value: string | undefined, fallback: string) => {
  if (!value) return fallback;
  return value.endsWith('/') ? value.slice(0, -1) : value;
};

const resolveEnvironment = (): AppEnvironment => {
  const explicitEnv = process.env.NEXT_PUBLIC_APP_ENV as AppEnvironment | undefined;
  if (explicitEnv === 'staging' || explicitEnv === 'production' || explicitEnv === 'development') {
    return explicitEnv;
  }

  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
};

export const runtimeConfig = {
  environment: resolveEnvironment(),
  siteUrl: normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL, 'http://localhost:3000'),
  apiBaseUrl: normalizeUrl(process.env.NEXT_PUBLIC_API_URL, 'http://localhost:3000/api'),
  analytics: {
    provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'plausible',
    writeKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY || '',
    gaMeasurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || '',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || ''
  },
  payments: {
    provider: process.env.NEXT_PUBLIC_PAYMENTS_PROVIDER || 'stripe',
    publicKey: process.env.NEXT_PUBLIC_PAYMENTS_PUBLIC_KEY || ''
  }
};
