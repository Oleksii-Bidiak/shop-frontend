import { NextResponse } from 'next/server';

export async function POST() {
  return NextResponse.json({
    accessToken: 'mock-access-token-updated',
    refreshToken: 'mock-refresh-token',
    user: {
      id: 'u-1',
      email: 'admin@shop.ua',
      role: 'admin'
    }
  });
}
