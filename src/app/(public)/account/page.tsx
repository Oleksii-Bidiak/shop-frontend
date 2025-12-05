"use client";

import { AccountPage } from '@/pages/account';
import { AuthGuard } from '@/entities/user';

export default function AccountRoute() {
  return (
    <AuthGuard fallback={<section className="p-8">Перевіряємо авторизацію…</section>}>
      <AccountPage />
    </AuthGuard>
  );
}
