import Link from 'next/link';
import { Suspense } from 'react';

import { ProductGrid } from '@/features/product-list/ui/product-grid';

interface ProductPageProps {
  productId: string;
}

export const ProductPage = ({ productId }: ProductPageProps) => {
  return (
    <div style={{ display: 'grid', gap: '1.5rem' }}>
      <header className="section-title">
        <div>
          <p className="badge">Продукт</p>
          <h1 style={{ margin: 0 }}>Картка товару</h1>
          <p style={{ color: 'var(--color-muted)', margin: '0.25rem 0' }}>
            Роадмап: підвантаження даних із бекенду, відгуки та опції (колір/памʼять). Поточний id: {productId}
          </p>
        </div>
        <Link className="button ghost" href="/catalog">
          Назад до каталогу
        </Link>
      </header>

      <section className="card" style={{ display: 'grid', gap: '1rem' }}>
        <div className="section-title" style={{ marginBottom: 0 }}>
          <h2 style={{ margin: 0 }}>Огляд</h2>
          <span className="badge">MVP</span>
        </div>
        <p>
          Тут буде опис, медіа-галерея, характеристики та блок з підпискою на повідомлення про наявність. Каркас
          маршруту дозволяє рознести UI по FSD-шарах без жорстких залежностей від API.
        </p>
      </section>

      <section className="card" style={{ display: 'grid', gap: '1rem' }}>
        <div className="section-title" style={{ marginBottom: 0 }}>
          <h3 style={{ margin: 0 }}>Схожі товари</h3>
          <Link href="/catalog">Увесь каталог</Link>
        </div>
        <Suspense fallback={<p>Завантаження каталогу...</p>}>
          <ProductGrid />
        </Suspense>
      </section>
    </div>
  );
};
