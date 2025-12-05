import { NextResponse } from 'next/server';

import { productsFixture } from '@/shared/api/mocks/fixtures';

export async function GET() {
  return NextResponse.json(productsFixture);
}
