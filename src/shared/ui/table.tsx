import type { HTMLAttributes, PropsWithChildren } from 'react';

import { tw } from '@/shared/lib/styles';

export function Table({ className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLTableElement>>) {
  return <table className={tw('table', className)} {...rest} />;
}

export function TableHeader({ className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) {
  return <thead className={className} {...rest} />;
}

export function TableBody({ className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLTableSectionElement>>) {
  return <tbody className={className} {...rest} />;
}

export function TableRow({ className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLTableRowElement>>) {
  return <tr className={className} {...rest} />;
}

export function TableHead({ className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) {
  return <th className={tw('text-sm font-semibold text-muted', className)} {...rest} />;
}

export function TableCell({ className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLTableCellElement>>) {
  return <td className={className} {...rest} />;
}
