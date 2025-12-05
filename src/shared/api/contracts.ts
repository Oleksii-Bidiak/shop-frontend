import { Cart } from '@/entities/cart/model/types';
import { Product } from '@/entities/product/model/types';
import { SessionPayload, User } from '@/shared/types/auth';

export type RestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface RestEndpoint<Req, Res> {
  method: RestMethod;
  path: string;
  description?: string;
  mock?: Res;
  requiresAuth?: boolean;
}

export interface GraphqlOperation<Vars, Res> {
  operationName: string;
  query: string;
  description?: string;
  mock?: Res;
}

export const restContract = {
  auth: {
    login: {
      method: 'POST',
      path: '/auth/login',
      description: 'Повертає пару токенів та інформацію про користувача.',
      mock: undefined as unknown as SessionPayload
    } satisfies RestEndpoint<{ email: string; password: string }, SessionPayload>,
    refresh: {
      method: 'POST',
      path: '/auth/refresh',
      description: 'Оновлює токени за refreshToken.',
      mock: undefined as unknown as SessionPayload,
      requiresAuth: true
    } satisfies RestEndpoint<{ refreshToken: string }, SessionPayload>,
    session: {
      method: 'GET',
      path: '/auth/session',
      description: 'Повертає поточну сесію користувача за accessToken.',
      mock: undefined as unknown as SessionPayload,
      requiresAuth: true
    } satisfies RestEndpoint<void, SessionPayload>
  },
  products: {
    list: {
      method: 'GET',
      path: '/products',
      description: 'Каталог публічних товарів.',
      mock: undefined as unknown as Product[]
    } satisfies RestEndpoint<void, Product[]>,
    bySlug: {
      method: 'GET',
      path: '/products/:slug',
      description: 'Детальна інформація про товар.',
      mock: undefined as unknown as Product,
      requiresAuth: false
    } satisfies RestEndpoint<{ slug: Product['slug'] }, Product>
  },
  cart: {
    current: {
      method: 'GET',
      path: '/cart',
      description: 'Повертає кошик для поточного користувача або гостьовий.',
      mock: undefined as unknown as Cart,
      requiresAuth: false
    } satisfies RestEndpoint<void, Cart>,
    addItem: {
      method: 'POST',
      path: '/cart/items',
      description: 'Додає товар до кошика.',
      mock: undefined as unknown as Cart,
      requiresAuth: false
    } satisfies RestEndpoint<{ productId: string; quantity: number }, Cart>,
    updateItem: {
      method: 'PATCH',
      path: '/cart/items/:productId',
      description: 'Оновлює кількість товару у кошику.',
      mock: undefined as unknown as Cart,
      requiresAuth: false
    } satisfies RestEndpoint<{ productId: string; quantity: number }, Cart>
  }
};

export const graphqlContract = {
  catalog: {
    products: {
      operationName: 'CatalogProducts',
      description: 'GraphQL альтернатива для отримання каталогу.',
      query: /* GraphQL */ `
        query CatalogProducts {
          products {
            id
            name
            price
            slug
            category
            rating
          }
        }
      `
    } satisfies GraphqlOperation<Record<string, never>, { products: Product[] }>
  },
  session: {
    viewer: {
      operationName: 'ViewerSession',
      description: 'Повертає користувача для GraphQL схем.',
      query: /* GraphQL */ `
        query ViewerSession {
          viewer {
            id
            email
            role
          }
        }
      `
    } satisfies GraphqlOperation<Record<string, never>, { viewer: User }>
  },
  cart: {
    summary: {
      operationName: 'CartSummary',
      description: 'Повертає кошик через GraphQL.',
      query: /* GraphQL */ `
        query CartSummary {
          cart {
            id
            totalPrice
            currency
            updatedAt
            items {
              productId
              quantity
              price
              title
            }
          }
        }
      `
    } satisfies GraphqlOperation<Record<string, never>, { cart: Cart }>
  }
};
