"use client";

import { CheckoutPage } from '@/pages/checkout';
import { AuthGuard } from '@/entities/user';

export default function CheckoutRoute() {
  return (
    <AuthGuard fallback={<section className="p-8">Перевіряємо авторизацію…</section>}>
      <CheckoutPage />
    </AuthGuard>
  );
}
