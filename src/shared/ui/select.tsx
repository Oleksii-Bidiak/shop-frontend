'use client';

import type { PropsWithChildren, SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  helperText?: string;
}

export function Select({ label, helperText, children, ...rest }: PropsWithChildren<SelectProps>) {
  return (
    <label style={{ display: 'grid', gap: '6px' }}>
      {label && <span style={{ fontWeight: 600 }}>{label}</span>}
      <select className="ds-select" {...rest}>
        {children}
      </select>
      {helperText && <span style={{ color: 'var(--ds-color-muted)', fontSize: 'var(--ds-font-sm)' }}>{helperText}</span>}
    </label>
  );
}
