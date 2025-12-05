'use client';

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

import { cva, tw, type VariantProps } from '@/shared/lib/styles';

const buttonStyles = cva('ds-button', {
  variants: {
    variant: {
      primary: '',
      secondary: 'secondary',
      ghost: 'ghost'
    },
    size: {
      sm: 'sm',
      md: '',
      lg: 'lg'
    },
    loading: {
      true: 'cursor-wait opacity-80',
      false: ''
    }
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    loading: false
  }
});

type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonStyles> & { loading?: boolean }
>;

export function Button({ children, className, variant, size, loading = false, disabled, ...rest }: ButtonProps) {
  return (
    <button
      className={tw(buttonStyles({ variant, size, loading }), className)}
      disabled={disabled || loading}
      {...rest}
    >
      {loading && <span aria-hidden="true">⏳</span>}
      <span>{children}</span>
    </button>
  );
}
