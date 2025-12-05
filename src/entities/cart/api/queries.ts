import { queryOptions } from '@tanstack/react-query';

import { fetchCart } from './cart';

export const cartQueryOptions = queryOptions({
  queryKey: ['cart'],
  queryFn: fetchCart
});
