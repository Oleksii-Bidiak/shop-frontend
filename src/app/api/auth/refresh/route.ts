import { NextResponse } from 'next/server';

import { sessionFixture } from '@/shared/api/mocks/fixtures';

export async function POST() {
  return NextResponse.json({
    ...sessionFixture,
    accessToken: 'mock-access-token-updated'
  });
}
