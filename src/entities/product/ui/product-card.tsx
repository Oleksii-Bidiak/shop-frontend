import Image from 'next/image';
import { Product } from '@/entities/product/model/types';

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ position: 'relative', width: '100%', height: 220 }}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          style={{ objectFit: 'cover', borderRadius: '10px' }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0 }}>{product.name}</h3>
          <p style={{ margin: '0.35rem 0', color: 'var(--color-muted)' }}>{product.colors.length} кольорів</p>
        </div>
        {product.badge && <span className="badge">{product.badge}</span>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <strong style={{ fontSize: '1.1rem' }}>{product.price.toLocaleString('uk-UA')} грн</strong>
        <button className="button" type="button">
          Додати в кошик
        </button>
      </div>
    </div>
  );
};
