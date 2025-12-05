'use client';

import type { HTMLAttributes, PropsWithChildren } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: 'accent' | 'success' | 'warning' | 'neutral';
}

export function Badge({ children, tone = 'accent', className, ...rest }: PropsWithChildren<BadgeProps>) {
  const classes = ['ds-badge'];
  if (tone !== 'accent') classes.push(tone);
  if (className) classes.push(className);

  return (
    <span className={classes.join(' ')} {...rest}>
      {children}
    </span>
  );
}
