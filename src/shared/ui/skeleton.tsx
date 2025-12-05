import type { HTMLAttributes } from 'react';

import { tw } from '@/shared/lib/styles';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  rounded?: boolean;
}

export function Skeleton({ rounded = false, className, ...rest }: SkeletonProps) {
  return <div className={tw('ds-skeleton', rounded && 'rounded-full', className)} {...rest} />;
}
