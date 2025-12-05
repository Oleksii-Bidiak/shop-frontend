import { Suspense } from 'react';

import { ProductGrid } from '@/features/product-list/ui/product-grid';

export const AdminProductsPage = () => {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div className="section-title">
        <h1 style={{ margin: 0 }}>Каталог</h1>
        <button className="button" type="button">
          Додати позицію
        </button>
      </div>
      <p style={{ color: 'var(--color-muted)' }}>
        Категорії: чохли, навушники, захисне скло, зарядні пристрої.
      </p>
      <Suspense fallback={<p>Завантаження каталогу...</p>}>
        <ProductGrid />
      </Suspense>
    </div>
  );
};
