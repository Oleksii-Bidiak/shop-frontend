import { Suspense } from 'react';

import { AdminOrdersTable } from '@/features/product-list/ui/admin-orders-table';
import { ProductGrid } from '@/features/product-list/ui/product-grid';

export const AdminDashboardPage = () => {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <p className="badge">Збірка для develop → тест, main → прод</p>
          <h1 style={{ margin: '0.5rem 0' }}>Керування магазином</h1>
          <p style={{ color: 'var(--color-muted)', margin: 0 }}>
            Швидкий огляд каталогу, замовлень та маржинальності.
          </p>
        </div>
        <button className="button" type="button">
          Створити товар
        </button>
      </header>

      <div className="card">
        <div className="section-title">
          <h2 style={{ margin: 0 }}>Топ товари</h2>
          <span className="badge">live</span>
        </div>
        <Suspense fallback={<p>Завантаження...</p>}>
          <ProductGrid />
        </Suspense>
      </div>

      <div className="card">
        <div className="section-title">
          <h2 style={{ margin: 0 }}>Нещодавні замовлення</h2>
          <a href="#">Експорт CSV</a>
        </div>
        <AdminOrdersTable />
      </div>
    </div>
  );
};
