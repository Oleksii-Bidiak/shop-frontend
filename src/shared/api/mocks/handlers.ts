import { graphql, http, HttpResponse } from 'msw';

import { graphqlContract, restContract } from '@/shared/api/contracts';
import { cartFixture, productsFixture, sessionFixture } from './fixtures';

export const handlers = [
  http.post(restContract.auth.login.path, async () => HttpResponse.json(sessionFixture)),
  http.post(restContract.auth.refresh.path, async () =>
    HttpResponse.json({ ...sessionFixture, accessToken: 'mock-access-token-updated' })
  ),
  http.get(restContract.auth.session.path, async () => HttpResponse.json(sessionFixture)),
  http.get(restContract.products.list.path, async () => HttpResponse.json(productsFixture)),
  http.get(restContract.cart.current.path, async () => HttpResponse.json(cartFixture)),
  graphql.query(graphqlContract.catalog.products.operationName, () =>
    HttpResponse.json({ data: { products: productsFixture } })
  ),
  graphql.query(graphqlContract.session.viewer.operationName, () =>
    HttpResponse.json({ data: { viewer: sessionFixture.user } })
  ),
  graphql.query(graphqlContract.cart.summary.operationName, () =>
    HttpResponse.json({ data: { cart: cartFixture } })
  )
];
