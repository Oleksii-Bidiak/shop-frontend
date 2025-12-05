import Link from 'next/link';
import { Suspense } from 'react';

import { ProductGrid } from '@/features/product-list/ui/product-grid';

interface ProductPageProps {
  productId: string;
}

export const ProductPage = ({ productId }: ProductPageProps) => {
  return (
    <div className="grid gap-6">
      <header className="section-title">
        <div>
          <p className="badge">Продукт</p>
          <h1>Картка товару</h1>
          <p className="mt-1 text-muted">
            Роадмап: підвантаження даних із бекенду, відгуки та опції (колір/памʼять). Поточний id: {productId}
          </p>
        </div>
        <Link className="button ghost" href="/catalog">
          Назад до каталогу
        </Link>
      </header>

      <section className="card grid gap-4">
        <div className="section-title mb-0">
          <h2>Огляд</h2>
          <span className="badge">MVP</span>
        </div>
        <p>
          Тут буде опис, медіа-галерея, характеристики та блок з підпискою на повідомлення про наявність. Каркас
          маршруту дозволяє рознести UI по FSD-шарах без жорстких залежностей від API.
        </p>
      </section>

      <section className="card grid gap-4">
        <div className="section-title mb-0">
          <h3>Що входить у картку товару</h3>
          <span className="badge">scope</span>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Медіа-галерея</strong>
              <p className="text-muted">Фото, відео та превʼю, що реагують на вибір варіації.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Варіанти</strong>
              <p className="text-muted">Модель і колір з синхронізацією ціни, SKU та наявності.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Характеристики та наявність</strong>
              <p className="text-muted">Технічні дані, бейдж наявності та можливість підписки на restock.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Відгуки та рейтинг</strong>
              <p className="text-muted">Карта оцінок, сортування за релевантністю та модерація.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Схожі товари</strong>
              <p className="text-muted">Блок рекомендацій за категорією, брендом та переглядами.</p>
            </div>
          </li>
        </ul>
      </section>

      <section className="card grid gap-4">
        <div className="section-title mb-0">
          <h3>Схожі товари</h3>
          <Link href="/catalog">Увесь каталог</Link>
        </div>
        <Suspense fallback={<p>Завантаження каталогу...</p>}>
          <ProductGrid />
        </Suspense>
      </section>
    </div>
  );
};
