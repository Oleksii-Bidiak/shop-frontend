'use client';

import type { InputHTMLAttributes, PropsWithChildren } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export function Input({ label, helperText, ...rest }: PropsWithChildren<InputProps>) {
  return (
    <label style={{ display: 'grid', gap: '6px' }}>
      {label && <span style={{ fontWeight: 600 }}>{label}</span>}
      <input className="ds-input" {...rest} />
      {helperText && <span style={{ color: 'var(--ds-color-muted)', fontSize: 'var(--ds-font-sm)' }}>{helperText}</span>}
    </label>
  );
}
