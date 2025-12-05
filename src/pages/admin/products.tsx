import { Suspense } from 'react';

import { ProductGrid } from '@/features/product/ui/product-grid';

export const AdminProductsPage = () => {
  return (
    <div className="grid gap-4">
      <div className="section-title">
        <h1>Каталог</h1>
        <button className="button" type="button">
          Додати позицію
        </button>
      </div>
      <p className="text-muted">Категорії: чохли, навушники, захисне скло, зарядні пристрої.</p>
      <Suspense fallback={<p>Завантаження каталогу...</p>}>
        <ProductGrid />
      </Suspense>
    </div>
  );
};
