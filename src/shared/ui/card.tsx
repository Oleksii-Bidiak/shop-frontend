import type { HTMLAttributes, PropsWithChildren } from 'react';

import { tw } from '@/shared/lib/styles';

export function Card({ children, className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  return (
    <div className={tw('ds-card', className)} {...rest}>
      {children}
    </div>
  );
}
