'use client';

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

export function Button({
  children,
  className,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const classes = ['ds-button'];
  if (variant !== 'primary') classes.push(variant);
  if (size !== 'md') classes.push(size);
  if (rest.disabled || loading) classes.push('disabled');
  if (className) classes.push(className);

  return (
    <button
      className={classes.join(' ')}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span aria-hidden="true">⏳</span>}
      <span>{children}</span>
    </button>
  );
}
