import { ProductPage } from '@/pages/product';

type ProductRouteProps = {
  params: {
    productId: string;
  };
};

export default function ProductRoute({ params }: ProductRouteProps) {
  return <ProductPage productId={params.productId} />;
}
