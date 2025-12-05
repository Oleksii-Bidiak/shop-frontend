'use client';

import { useQuery } from '@tanstack/react-query';

import { fetchProducts } from '@/entities/product/api/products';
import { ProductCard } from '@/entities/product/ui/product-card';

export const ProductGrid = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  if (isLoading) {
    return <p>Завантаження каталогу...</p>;
  }

  return (
    <div className="grid">
      {data?.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};
