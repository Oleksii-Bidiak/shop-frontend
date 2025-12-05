'use client';

import type { InputHTMLAttributes, PropsWithChildren } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
}

export function Input({ label, helperText, ...rest }: PropsWithChildren<InputProps>) {
  return (
    <label className="grid gap-1.5">
      {label && <span className="font-semibold">{label}</span>}
      <input className="ds-input" {...rest} />
      {helperText && <span className="text-sm text-muted">{helperText}</span>}
    </label>
  );
}
