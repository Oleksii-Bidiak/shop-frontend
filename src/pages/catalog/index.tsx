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
            <h2>Функціональність каталогу</h2>
            <p className="mt-1 text-muted">Беклог для розширення каталогу та SEO.</p>
          </div>
          <span className="badge">scope</span>
        </div>

        <ul className="grid gap-3 md:grid-cols-2">
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Фільтри каталогу</strong>
              <p className="text-muted">Ціна, бренд, сумісність та тип товару з окремими контролами.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Сортування і пагінація</strong>
              <p className="text-muted">Сортування за популярністю/ціною та посторінкове завантаження.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>SEO-метадані</strong>
              <p className="text-muted">Title, description і структуровані дані для кожної комбінації фільтрів.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Canonical-лінки</strong>
              <p className="text-muted">Правильні canonical для уникнення дублю контенту на фільтрах.</p>
            </div>
          </li>
        </ul>
      </section>

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
