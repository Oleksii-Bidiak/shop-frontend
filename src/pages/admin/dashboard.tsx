import { Suspense } from 'react';

import { AdminOrdersTable } from '@/features/product-list/ui/admin-orders-table';
import { ProductGrid } from '@/features/product-list/ui/product-grid';

export const AdminDashboardPage = () => {
  return (
    <div className="grid gap-6">
      <header className="flex items-center justify-between">
        <div>
          <p className="badge">Збірка для develop → тест, main → прод</p>
          <h1 className="my-2">Керування магазином</h1>
          <p className="text-muted">Швидкий огляд каталогу, замовлень та маржинальності.</p>
        </div>
        <button className="button" type="button">
          Створити товар
        </button>
      </header>

      <div className="card">
        <div className="section-title">
          <h2>Топ товари</h2>
          <span className="badge">live</span>
        </div>
        <Suspense fallback={<p>Завантаження...</p>}>
          <ProductGrid />
        </Suspense>
      </div>

      <div className="card">
        <div className="section-title">
          <h2>Нещодавні замовлення</h2>
          <a href="#">Експорт CSV</a>
        </div>
        <AdminOrdersTable />
      </div>
    </div>
  );
};
