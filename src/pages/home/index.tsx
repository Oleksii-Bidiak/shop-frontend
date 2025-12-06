import Image from 'next/image';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ProductGrid = dynamic(
  () => import('@/features/product/ui/product-grid').then((module) => module.ProductGrid),
  { ssr: false, loading: () => <p>Завантаження каталогу...</p> }
);

export const HomePage = () => {
  return (
    <div className="grid gap-8">
      <section className="hero">
        <div>
          <p className="badge">Український eCom</p>
          <h1>Аксесуари для смартфонів, ноутбуків та аудіо</h1>
          <p>
            Натхнення від KTC, Ivan Chohol, Ash-mobile та PatiFon — гнучка архітектура FSD з готовністю до
            масштабування під нові категорії та канали продажів.
          </p>
          <div className="flex items-center gap-3">
            <a className="button" href="/catalog">
              Переглянути каталог
            </a>
            <span className="text-muted">Роздільні середовища: develop → тест, main → прод</span>
          </div>
        </div>
        <div className="card relative min-h-[320px] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1518441250704-7556d1a7af31?auto=format&fit=crop&w=900&q=60"
            alt="Accessories"
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>Новинки тижня</h2>
          <a href="/catalog">Усі категорії</a>
        </div>
        <Suspense fallback={<p>Завантаження каталогу...</p>}>
          <ProductGrid />
        </Suspense>
      </section>
    </div>
  );
};
