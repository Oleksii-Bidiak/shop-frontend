import { Suspense } from 'react';
import Image from 'next/image';

import { ProductGrid } from '@/features/product-list/ui/product-grid';

export const HomePage = () => {
  return (
    <div style={{ display: 'grid', gap: '2rem' }}>
      <section className="hero">
        <div>
          <p className="badge">Український eCom</p>
          <h1>Аксесуари для смартфонів, ноутбуків та аудіо</h1>
          <p>
            Натхнення від KTC, Ivan Chohol, Ash-mobile та PatiFon — гнучка архітектура FSD з готовністю до
            масштабування під нові категорії та канали продажів.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <a className="button" href="/catalog">
              Переглянути каталог
            </a>
            <span style={{ color: 'var(--color-muted)' }}>Роздільні середовища: develop → тест, main → прод</span>
          </div>
        </div>
        <div className="card" style={{ position: 'relative', minHeight: 320 }}>
          <Image
            src="https://images.unsplash.com/photo-1518441250704-7556d1a7af31?auto=format&fit=crop&w=900&q=60"
            alt="Accessories"
            fill
            style={{ objectFit: 'cover', borderRadius: '10px' }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2 style={{ margin: 0 }}>Новинки тижня</h2>
          <a href="/catalog">Усі категорії</a>
        </div>
        <Suspense fallback={<p>Завантаження каталогу...</p>}>
          <ProductGrid />
        </Suspense>
      </section>
    </div>
  );
};
