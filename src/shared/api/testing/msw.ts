import { setupWorker } from 'msw/browser';
import { setupServer } from 'msw/node';

import { handlers } from '@/shared/api/mocks/handlers';

export const apiMocksServer = setupServer(...handlers);
export const apiMocksWorker = typeof window !== 'undefined' ? setupWorker(...handlers) : null;
