import { runtimeConfig } from './runtime';

export const appConfig = {
  projectName: 'Accessory Shop',
  apiBaseUrl: runtimeConfig.apiBaseUrl,
  environment: runtimeConfig.environment,
  analytics: runtimeConfig.analytics,
  payments: runtimeConfig.payments
};
