'use client';

import type { PropsWithChildren, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
}

export function Select({ label, helperText, children, ...rest }: PropsWithChildren<SelectProps>) {
  return (
    <label className="grid gap-1.5">
      {label && <span className="font-semibold">{label}</span>}
      <select className="ds-select" {...rest}>
        {children}
      </select>
      {helperText && <span className="text-sm text-muted">{helperText}</span>}
    </label>
  );
}
