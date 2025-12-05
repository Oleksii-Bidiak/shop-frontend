import { NextResponse } from 'next/server';

import { cartFixture } from '@/shared/api/mocks/fixtures';

export async function GET() {
  return NextResponse.json(cartFixture);
}
