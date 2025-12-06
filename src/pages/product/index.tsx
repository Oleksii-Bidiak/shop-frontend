import Link from 'next/link';
import Script from 'next/script';

import type { ProductSpecification } from '@/entities/product/model/types';
import { productsFixture } from '@/shared/api/mocks/fixtures';
import { appConfig } from '@/shared/config/app';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';

import { ProductDetails, ProductReview } from './ui/product-details';

interface ProductPageProps {
  productId: string;
}

export const ProductPage = ({ productId }: ProductPageProps) => {
  const product = productsFixture.find((item) => item.id === productId) ?? productsFixture[0];

  const specs: ProductSpecification[] =
    product.specs ??
    ([
      { label: 'Матеріал', value: 'Полікарбонат + алюміній' },
      { label: 'Гарантія', value: '12 місяців' },
      { label: 'Комплектація', value: 'Корпус, інструкція, кабель' }
    ] satisfies ProductSpecification[]);

  const reviews: ProductReview[] = [
    {
      id: 'r1',
      author: 'Олена',
      rating: 5,
      comment: 'Чудова якість, щільно прилягає і не ковзає в руці.',
      createdAt: '12.02.2024'
    },
    {
      id: 'r2',
      author: 'Роман',
      rating: 4,
      comment: 'MagSafe тримає впевнено, хотілося б більше кольорів у наявності.',
      createdAt: '03.03.2024'
    }
  ];

  const similarProducts = productsFixture
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  const productUrl = `${appConfig.siteUrl}/products/${product.id}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Головна', item: appConfig.siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Каталог', item: `${appConfig.siteUrl}/catalog` },
      { '@type': 'ListItem', position: 3, name: product.name, item: productUrl }
    ]
  };

  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: [product.image, ...(product.gallery?.map((item) => item.url) ?? [])],
    description: product.shortDescription,
    sku: product.id,
    brand: product.brand,
    category: product.category,
    offers: {
      '@type': 'Offer',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      priceCurrency: 'UAH',
      price: product.price,
      url: productUrl,
      itemCondition: 'https://schema.org/NewCondition'
    },
    aggregateRating:
      product.rating && product.reviewCount
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount
          }
        : undefined
  };

  const structuredData = JSON.stringify([productSchema, breadcrumbSchema]);

  return (
    <div className="grid gap-6">
      <Script id="product-schema" type="application/ld+json" strategy="afterInteractive">
        {structuredData}
      </Script>
      <Breadcrumbs
        items={[
          { label: 'Головна', href: '/' },
          { label: 'Каталог', href: '/catalog' },
          { label: product.name }
        ]}
      />
      <header className="section-title">
        <div>
          <p className="badge">Продукт</p>
          <h1>{product.name}</h1>
          <p className="mt-1 text-muted">
            Галерея, варіанти моделі/кольору, характеристики, наявність та відгуки. Поточний id: {productId}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link className="button ghost" href="/catalog">
            Назад до каталогу
          </Link>
          <span className="badge">SSR/ISR ready</span>
        </div>
      </header>

      <ProductDetails product={product} specs={specs} reviews={reviews} similarProducts={similarProducts} />
    </div>
  );
};
