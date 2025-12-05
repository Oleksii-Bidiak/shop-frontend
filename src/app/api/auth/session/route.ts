import { NextResponse } from 'next/server';

import { sessionFixture } from '@/shared/api/mocks/fixtures';

export async function GET() {
  return NextResponse.json(sessionFixture);
}
