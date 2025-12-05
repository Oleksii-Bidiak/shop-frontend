'use client';

import { useQuery } from '@tanstack/react-query';

import { productsQueryOptions } from '@/entities/product/api/queries';
import { ProductCard } from '@/entities/product/ui/product-card';

export const ProductGrid = () => {
  const { data, isLoading, error } = useQuery(productsQueryOptions);

  if (isLoading) {
    return <p>Завантаження каталогу...</p>;
  }

  if (error) {
    return <p>Не вдалося завантажити каталог.</p>;
  }

  return (
    <div className="grid">
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
