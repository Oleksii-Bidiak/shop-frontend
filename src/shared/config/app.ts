import { runtimeConfig } from './runtime';

export const appConfig = {
  projectName: 'Accessory Shop',
  siteUrl: runtimeConfig.siteUrl,
  apiBaseUrl: runtimeConfig.apiBaseUrl,
  environment: runtimeConfig.environment,
  analytics: runtimeConfig.analytics,
  payments: runtimeConfig.payments
};
