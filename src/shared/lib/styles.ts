import { type ClassValue, clsx } from 'clsx';
import { tv, type VariantProps } from 'tailwind-variants';
import { twMerge } from 'tailwind-merge';

export const cva = tv;
export type { VariantProps };

export const tw = (...inputs: ClassValue[]) => twMerge(clsx(...inputs));
