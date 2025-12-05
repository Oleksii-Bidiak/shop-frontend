'use client';

import type { HTMLAttributes, PropsWithChildren } from 'react';

import { cva, tw, type VariantProps } from '@/shared/lib/styles';

const badgeStyles = cva('ds-badge', {
  variants: {
    tone: {
      accent: '',
      success: 'success',
      warning: 'warning',
      neutral: 'neutral'
    }
  },
  defaultVariants: {
    tone: 'accent'
  }
});

type BadgeProps = PropsWithChildren<HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeStyles>>;

export function Badge({ children, tone, className, ...rest }: BadgeProps) {
  return (
    <span className={tw(badgeStyles({ tone }), className)} {...rest}>
      {children}
    </span>
  );
}
