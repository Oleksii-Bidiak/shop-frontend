'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';

import type { Product, ProductSpecification } from '@/entities/product/model/types';
import { ProductCard } from '@/entities/product/ui/product-card';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface ProductDetailsProps {
  product: Product;
  specs: ProductSpecification[];
  reviews: ProductReview[];
  similarProducts: Product[];
}

export const ProductDetails = ({ product, specs, reviews, similarProducts }: ProductDetailsProps) => {
  const modelOptions = useMemo(
    () => Array.from(new Set(product.variants?.map((variant) => variant.model) ?? ['Базова модель'])),
    [product.variants]
  );

  const [selectedModel, setSelectedModel] = useState(modelOptions[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [activeImage, setActiveImage] = useState(product.gallery[0]?.url ?? product.image);

  useEffect(() => {
    const colorsForModel =
      product.variants?.filter((variant) => variant.model === selectedModel).map((variant) => variant.color) ??
      product.colors;
    setSelectedColor(colorsForModel[0]);
  }, [product.colors, product.variants, selectedModel]);

  const currentVariant = product.variants?.find(
    (variant) => variant.model === selectedModel && variant.color === selectedColor
  );

  const price = currentVariant?.price ?? product.price;
  const stock = currentVariant?.stock ?? product.stock;
  const fallbackRating = reviews.length ? reviews.reduce((sum, item) => sum + item.rating, 0) / reviews.length : 0;
  const averageRating = product.rating ?? fallbackRating;
  const reviewCount = product.reviewCount ?? reviews.length;
  const compatibility = product.compatibility?.join(', ') ?? 'Для більшості сучасних пристроїв';

  return (
    <div className="grid gap-6">
      <div className="card grid gap-6 lg:grid-cols-[1.2fr,1fr]">
        <div className="space-y-4">
          <div className="relative h-[360px] w-full overflow-hidden rounded-lg">
            <Image
              src={activeImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto">
            {[product.image, ...product.gallery.map((item) => item.url)].map((image) => (
              <button
                key={image}
                className={`relative h-20 w-20 overflow-hidden rounded-lg border ${
                  activeImage === image ? 'border-accent' : 'border-border'
                }`}
                type="button"
                onClick={() => setActiveImage(image)}
              >
                <Image src={image} alt={product.name} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="section-title mb-0">
            <div>
              <p className="badge capitalize">{product.productType ?? 'Товар'}</p>
              <h1>{product.name}</h1>
              <p className="mt-1 text-muted">{product.shortDescription}</p>
              <p className="text-sm text-muted">Сумісність: {compatibility}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-semibold">{averageRating.toFixed(1)} ★</p>
              <p className="text-muted text-sm">{reviewCount} відгуків</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="text-2xl font-semibold">{price.toLocaleString('uk-UA')} грн</span>
            {product.badge && <span className="badge">{product.badge}</span>}
            <span className={`badge ${stock > 0 ? 'success' : 'ghost'}`}>
              {stock > 0 ? `Є в наявності (${stock})` : 'Немає'}
            </span>
          </div>

          <div className="grid gap-3">
            <p className="font-semibold">Модель</p>
            <div className="flex flex-wrap gap-2">
              {modelOptions.map((model) => (
                <button
                  key={model}
                  type="button"
                  className={`rounded border px-3 py-1 text-sm ${
                    selectedModel === model ? 'border-accent bg-accent/10 text-accent' : 'border-border'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  {model}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-3">
            <p className="font-semibold">Колір</p>
            <div className="flex flex-wrap gap-2">
              {(product.variants?.filter((variant) => variant.model === selectedModel).map((variant) => variant.color) ??
                product.colors
              ).map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`rounded border px-3 py-1 text-sm ${
                    selectedColor === color ? 'border-accent bg-accent/10 text-accent' : 'border-border'
                  }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-2 text-sm text-muted">
            <p>Бренд: {product.brand ?? 'Уточнюється'}</p>
            <p>Артикул / SKU: {currentVariant?.id ?? product.id}</p>
            <p>Доставка: Нова Пошта, курʼєр, самовивіз</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="button" type="button">
              Додати в кошик
            </button>
            <button className="button ghost" type="button">
              Повідомити про наявність
            </button>
          </div>
        </div>
      </div>

      <div className="card grid gap-4">
        <div className="section-title mb-0">
          <div>
            <h3>Характеристики та сумісність</h3>
            <p className="text-muted">Окремі рядки для табличних характеристик.</p>
          </div>
          <span className="badge">specs</span>
        </div>
        <dl className="grid gap-3 md:grid-cols-2">
          {specs.map((spec) => (
            <div
              key={`${spec.label}-${spec.value}`}
              className="rounded-lg border border-dashed border-border bg-surface p-3"
            >
              <dt className="text-sm text-muted">{spec.label}</dt>
              <dd className="font-semibold">{spec.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="card grid gap-4">
        <div className="section-title mb-0">
          <div>
            <h3>Відгуки та рейтинг</h3>
            <p className="text-muted">Сортування за релевантністю, рейтингом та датою.</p>
          </div>
          <span className="badge">reviews</span>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex items-center justify-between">
                <strong>{review.author}</strong>
                <span className="badge">{review.rating} ★</span>
              </div>
              <p className="mt-2 text-muted">{review.comment}</p>
              <p className="text-xs text-muted">{review.createdAt}</p>
            </div>
          ))}
        </div>
        <Link className="text-accent" href="#">
          Усі відгуки
        </Link>
      </div>

      <div className="card grid gap-4">
        <div className="section-title mb-0">
          <div>
            <h3>Схожі товари</h3>
            <p className="text-muted">Рекомендації за категорією та брендом.</p>
          </div>
          <Link href="/catalog" className="text-accent">
            Увесь каталог
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {similarProducts.map((productItem) => (
            <ProductCard key={productItem.id} product={productItem} />
          ))}
        </div>
      </div>
    </div>
  );
};
