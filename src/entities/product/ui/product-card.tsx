import Image from 'next/image';

import { Product } from '@/entities/product/model/types';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="card flex flex-col gap-4">
      <div className="relative h-[220px] w-full overflow-hidden rounded-lg">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div className="flex items-center justify-between">
        <div>
          <h3>{product.name}</h3>
          <p className="mt-1 text-muted">{product.colors.length} кольорів</p>
        </div>
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>
      <div className="flex items-center justify-between">
        <strong className="text-lg font-semibold">{product.price.toLocaleString('uk-UA')} грн</strong>
        <button className="button" type="button">
          Додати в кошик
        </button>
      </div>
    </div>
  );
};
