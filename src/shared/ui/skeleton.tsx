import type { HTMLAttributes } from 'react';

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export function Skeleton({ width = '100%', height = 16, rounded = false, style, className, ...rest }: SkeletonProps) {
  const classes = ['ds-skeleton'];
  if (className) classes.push(className);
  return (
    <div
      className={classes.join(' ')}
      style={{ width, height, borderRadius: rounded ? '9999px' : undefined, ...style }}
      {...rest}
    />
  );
}
