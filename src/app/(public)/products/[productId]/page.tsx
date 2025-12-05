import type { Metadata } from 'next';

import { ProductPage } from '@/pages/product';
import { productsFixture } from '@/shared/api/mocks/fixtures';

type ProductRouteProps = {
  params: {
    productId: string;
  };
};

export const revalidate = 900;

export async function generateStaticParams() {
  return productsFixture.map((product) => ({ productId: product.id }));
}

export async function generateMetadata({ params }: ProductRouteProps): Promise<Metadata> {
  const product = productsFixture.find((item) => item.id === params.productId);
  const title = product ? `${product.name} | Купити` : 'Картка товару';

  return {
    title,
    description: product?.shortDescription ?? 'Картка товару з відгуками та варіантами.',
    alternates: { canonical: `/products/${params.productId}` }
  };
}

export default function ProductRoute({ params }: ProductRouteProps) {
  return <ProductPage productId={params.productId} />;
}
