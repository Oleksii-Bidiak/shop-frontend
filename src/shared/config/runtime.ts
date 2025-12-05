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
  apiBaseUrl: normalizeUrl(process.env.NEXT_PUBLIC_API_URL, 'http://localhost:3000/api'),
  analytics: {
    provider: process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER || 'plausible',
    writeKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY || ''
  },
  payments: {
    provider: process.env.NEXT_PUBLIC_PAYMENTS_PROVIDER || 'stripe',
    publicKey: process.env.NEXT_PUBLIC_PAYMENTS_PUBLIC_KEY || ''
  }
};
