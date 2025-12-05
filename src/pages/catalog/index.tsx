import { Suspense } from 'react';

import { ProductGrid } from '@/features/product-list/ui/product-grid';

export const CatalogPage = () => {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <header className="section-title">
        <div>
          <p className="badge">Каталог</p>
          <h1 style={{ margin: 0 }}>Знайдіть аксесуари під свій гаджет</h1>
          <p style={{ color: 'var(--color-muted)' }}>
            Пошук за категоріями, брендами, кольорами й наявністю. Структура FSD дозволяє нарощувати фільтри без
            переписування базових шарів.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <button className="button" type="button">
            Фільтри
          </button>
          <button className="button ghost" type="button">
            Сортувати
          </button>
        </div>
      </header>

      <section className="card" style={{ display: 'grid', gap: '1rem' }}>
        <div className="section-title" style={{ marginBottom: 0 }}>
          <div>
            <h2 style={{ margin: 0 }}>Популярні товари</h2>
            <p style={{ margin: '0.25rem 0', color: 'var(--color-muted)' }}>
              Список формується з аналітики продажів та переглядів.
            </p>
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
