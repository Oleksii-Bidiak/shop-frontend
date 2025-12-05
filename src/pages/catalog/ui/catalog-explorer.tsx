'use client';

import { useEffect, useMemo, useState } from 'react';

import { Product } from '@/entities/product/model/types';
import { ProductCard } from '@/entities/product/ui/product-card';

interface CatalogExplorerProps {
  products: Product[];
}

type SortOption = 'popular' | 'price-asc' | 'price-desc' | 'rating';

const PAGE_SIZE = 6;

export const CatalogExplorer = ({ products }: CatalogExplorerProps) => {
  const prices = useMemo(() => products.map((product) => product.price), [products]);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedCompatibility, setSelectedCompatibility] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>('popular');
  const [page, setPage] = useState(1);

  const brands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand).filter(Boolean) as string[])),
    [products]
  );

  const productTypes = useMemo(
    () => Array.from(new Set(products.map((product) => product.productType).filter(Boolean) as string[])),
    [products]
  );

  const compatibilityOptions = useMemo(
    () =>
      Array.from(
        new Set(
          products
            .flatMap((product) => product.compatibility ?? [])
            .filter((item): item is string => Boolean(item))
        )
      ),
    [products]
  );

  useEffect(() => {
    setPage(1);
  }, [selectedBrands, selectedTypes, selectedCompatibility, priceRange, sort]);

  useEffect(() => {
    setPriceRange([minPrice, maxPrice]);
  }, [minPrice, maxPrice]);

  const toggleValue = (value: string, setter: (updater: (prev: string[]) => string[]) => void) =>
    setter((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]));

  const filteredProducts = useMemo(() => {
    const byPrice = products.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    const byBrand = selectedBrands.length
      ? byPrice.filter((product) => product.brand && selectedBrands.includes(product.brand))
      : byPrice;

    const byType = selectedTypes.length
      ? byBrand.filter((product) => product.productType && selectedTypes.includes(product.productType))
      : byBrand;

    const byCompatibility = selectedCompatibility.length
      ? byType.filter((product) =>
          selectedCompatibility.every((option) => product.compatibility?.includes(option))
        )
      : byType;

    const sorted = [...byCompatibility].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return (b.rating ?? 0) - (a.rating ?? 0);
        default:
          return (b.reviewCount ?? 0) - (a.reviewCount ?? 0);
      }
    });

    return sorted;
  }, [products, priceRange, selectedBrands, selectedCompatibility, selectedTypes, sort]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * PAGE_SIZE,
    (currentPage - 1) * PAGE_SIZE + PAGE_SIZE
  );

  return (
    <div className="grid gap-6 lg:grid-cols-[280px,1fr]">
      <aside className="card grid h-fit gap-5">
        <div className="section-title mb-0">
          <div>
            <h3>Фільтри</h3>
            <p className="text-muted">Ціна, бренд, тип і сумісність.</p>
          </div>
          <span className="badge">live</span>
        </div>

        <div className="grid gap-3">
          <div className="flex items-center justify-between">
            <span className="text-muted">Ціна</span>
            <button
              className="text-sm text-accent"
              type="button"
              onClick={() => setPriceRange([minPrice, maxPrice])}
            >
              Скинути
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="grid gap-1 text-sm text-muted">
              Від
              <input
                className="input"
                type="number"
                value={priceRange[0]}
                min={minPrice}
                max={priceRange[1]}
                onChange={(event) =>
                  setPriceRange([Number(event.target.value), priceRange[1]])
                }
              />
            </label>
            <label className="grid gap-1 text-sm text-muted">
              До
              <input
                className="input"
                type="number"
                value={priceRange[1]}
                min={priceRange[0]}
                max={maxPrice}
                onChange={(event) =>
                  setPriceRange([priceRange[0], Number(event.target.value)])
                }
              />
            </label>
          </div>
        </div>

        <div className="grid gap-3">
          <p className="text-sm font-semibold">Бренд</p>
          <div className="grid gap-2">
            {brands.map((brand) => (
              <label key={brand} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => toggleValue(brand, setSelectedBrands)}
                />
                {brand}
              </label>
            ))}
            {!brands.length && <p className="text-muted">Бренди завантажуються...</p>}
          </div>
        </div>

        <div className="grid gap-3">
          <p className="text-sm font-semibold">Тип</p>
          <div className="grid gap-2">
            {productTypes.map((type) => (
              <label key={type} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleValue(type, setSelectedTypes)}
                />
                {type}
              </label>
            ))}
          </div>
        </div>

        <div className="grid gap-3">
          <p className="text-sm font-semibold">Сумісність</p>
          <div className="grid gap-2">
            {compatibilityOptions.map((compatibility) => (
              <label key={compatibility} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedCompatibility.includes(compatibility)}
                  onChange={() => toggleValue(compatibility, setSelectedCompatibility)}
                />
                {compatibility}
              </label>
            ))}
          </div>
        </div>
      </aside>

      <div className="card grid gap-4">
        <div className="section-title mb-0">
          <div>
            <h2>Результати</h2>
            <p className="mt-1 text-muted">
              Сортування працює поверх SSR/ISR сторінки, а пагінація дозволяє розбивати запити до бекенду.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-muted">
              Сортування
              <select
                className="input min-w-[160px]"
                value={sort}
                onChange={(event) => setSort(event.target.value as SortOption)}
              >
                <option value="popular">Популярні</option>
                <option value="price-asc">Ціна ↑</option>
                <option value="price-desc">Ціна ↓</option>
                <option value="rating">Рейтинг</option>
              </select>
            </label>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm text-muted">
          <span>
            Знайдено {filteredProducts.length} товарів • Сторінка {currentPage} / {totalPages}
          </span>
          <button className="text-accent" type="button" onClick={() => setPage(1)}>
            На початок
          </button>
        </div>

        {paginatedProducts.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paginatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border bg-surface p-6 text-center text-muted">
            За вибраними фільтрами нічого не знайдено.
          </div>
        )}

        <div className="flex items-center justify-between gap-3">
          <button
            className="button ghost"
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage((prev) => Math.max(1, prev - 1))}
          >
            Попередня
          </button>
          <div className="flex items-center gap-2 text-sm text-muted">
            {Array.from({ length: totalPages }).map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  className={`rounded px-3 py-1 text-sm ${
                    pageNumber === currentPage ? 'bg-accent text-contrast' : 'bg-surface'
                  }`}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
          <button
            className="button ghost"
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Наступна
          </button>
        </div>
      </div>
    </div>
  );
};
