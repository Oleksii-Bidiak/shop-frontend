import { NextRequest, NextResponse } from 'next/server';

import { graphqlContract } from '@/shared/api/contracts';
import { cartFixture, productsFixture, sessionFixture } from '@/shared/api/mocks/fixtures';

const resolvers = {
  [graphqlContract.catalog.products.operationName]: {
    data: { products: productsFixture }
  },
  [graphqlContract.session.viewer.operationName]: {
    data: { viewer: sessionFixture.user }
  },
  [graphqlContract.cart.summary.operationName]: {
    data: { cart: cartFixture }
  }
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const queryText: string = body.query || '';

  const matchedOperation = Object.entries(resolvers).find(([operationName]) =>
    queryText.includes(operationName)
  );

  if (!matchedOperation) {
    return NextResponse.json(
      { errors: [{ message: 'Unsupported GraphQL operation for mock handler' }] },
      { status: 400 }
    );
  }

  return NextResponse.json(matchedOperation[1]);
}
