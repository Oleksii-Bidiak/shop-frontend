import Link from 'next/link';
import { Suspense } from 'react';

import { ProductGrid } from '@/features/product/ui/product-grid';
import { productsFixture } from '@/shared/api/mocks/fixtures';

import { CatalogExplorer } from './ui/catalog-explorer';

export const CatalogPage = () => {
  const promoWidgets = [
    {
      title: 'Банер з промокодом',
      description: '10% на перше замовлення та контроль UTM-міток для аналітики.',
      badge: 'promo'
    },
    {
      title: 'Розумні банери',
      description: 'Підлаштовуються під категорію та URL фільтрів для SEO-сторінок.',
      badge: 'SEO'
    },
    {
      title: 'Популярні категорії',
      description: 'Чохли, зарядки, аудіо, захист екрана — з можливістю швидкого переходу.',
      badge: 'UX'
    }
  ];

  const seoChecklist = [
    'SSR/ISR для лендінгів категорій та фільтрів, щоб пошуковики бачили контент.',
    'Title/description формуються від комбінації бренду, цін та сумісності.',
    'Canonical та пагінація через rel="prev"/"next" для уникнення дублювання.',
    'Breadcrumbs + структуровані дані для товарів і списків.'
  ];

  const categoryShortcuts = [
    { title: 'Чохли та захист', href: '/catalog?category=cases', accent: 'cases' },
    { title: 'Зарядні пристрої', href: '/catalog?category=chargers', accent: 'chargers' },
    { title: 'Аудіо', href: '/catalog?category=audio', accent: 'audio' }
  ];

  return (
    <div className="grid gap-6">
      <header className="section-title">
        <div>
          <p className="badge">Каталог</p>
          <h1>Знайдіть аксесуари під свій гаджет</h1>
          <p className="text-muted">
            Фільтри по ціні, бренду, типу та сумісності + сортування/пагінація. Компонент розміщений у Server
            Component-сторінці, готовій до SSR/ISR для SEO.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a className="button" href="#catalog-filters">
            До фільтрів
          </a>
          <Link className="button ghost" href="/products/p-1">
            Демо картки товару
          </Link>
        </div>
      </header>

      <section className="grid gap-6" id="catalog-filters">
        <div className="card">
          <div className="section-title mb-4">
            <div>
              <h2>Каталог з фільтрами та пагінацією</h2>
              <p className="mt-1 text-muted">
                Ціна, бренд, тип товару та сумісність — доповнені сортуванням за популярністю, рейтингом і ціною.
                Пагінація готова для API-підвантаження.
              </p>
            </div>
            <span className="badge">live</span>
          </div>
          <CatalogExplorer products={productsFixture} />
        </div>

        <div className="card grid gap-4">
          <div className="section-title mb-0">
            <div>
              <h3>SEO й SSR/ISR</h3>
              <p className="mt-1 text-muted">Метадані формуються від фільтрів і поєднуються з ISR.</p>
            </div>
            <span className="badge">SSR · ISR</span>
          </div>
          <ul className="grid gap-3 md:grid-cols-2">
            {seoChecklist.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3"
              >
                <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
                <p className="text-muted">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card grid gap-4">
        <div className="section-title mb-0">
          <div>
            <h2>Віджети</h2>
            <p className="mt-1 text-muted">Промо-блоки, банери та швидкі категорії.</p>
          </div>
          <span className="badge">widgets</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {promoWidgets.map((promo) => (
            <div key={promo.title} className="rounded-lg border border-dashed border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <strong>{promo.title}</strong>
                <span className="badge">{promo.badge}</span>
              </div>
              <p className="mt-2 text-muted">{promo.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-3 md:grid-cols-3">
          {categoryShortcuts.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="rounded-lg border border-border bg-surface p-4 transition hover:-translate-y-0.5 hover:border-accent"
            >
              <p className="badge mb-2 capitalize">{category.accent}</p>
              <h3>{category.title}</h3>
              <p className="mt-1 text-muted">Швидкий перехід на сторінку категорії з SSR/ISR.</p>
            </Link>
          ))}
        </div>
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
