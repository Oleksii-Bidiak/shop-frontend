import { Suspense } from 'react';

import { ProductGrid } from '@/features/product-list/ui/product-grid';

export const CatalogPage = () => {
  return (
    <div className="grid gap-6">
      <header className="section-title">
        <div>
          <p className="badge">Каталог</p>
          <h1>Знайдіть аксесуари під свій гаджет</h1>
          <p className="text-muted">
            Пошук за категоріями, брендами, кольорами й наявністю. Структура FSD дозволяє нарощувати фільтри без
            переписування базових шарів.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="button" type="button">
            Фільтри
          </button>
          <button className="button ghost" type="button">
            Сортувати
          </button>
        </div>
      </header>

      <section className="card grid gap-4">
        <div className="section-title mb-0">
          <div>
            <h2>Популярні товари</h2>
            <p className="mt-1 text-muted">Список формується з аналітики продажів та переглядів.</p>
          </div>
          <span className="badge">live</span>
        </div>
        <Suspense fallback={<p>Завантаження каталогу...</p>}>
          <ProductGrid />
        </Suspense>
      </section>
    </div>
  );
};
