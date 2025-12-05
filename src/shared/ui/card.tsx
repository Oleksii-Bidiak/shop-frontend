import type { HTMLAttributes, PropsWithChildren } from 'react';

export function Card({ children, className, ...rest }: PropsWithChildren<HTMLAttributes<HTMLDivElement>>) {
  const classes = ['ds-card'];
  if (className) classes.push(className);
  return (
    <div className={classes.join(' ')} {...rest}>
      {children}
    </div>
  );
}
