'use client';

import { PropsWithChildren, ReactNode, useRef, useState } from 'react';

interface TooltipProps {
  content: ReactNode;
}

export function Tooltip({ content, children }: PropsWithChildren<TooltipProps>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      style={{ position: 'relative', display: 'inline-flex' }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      tabIndex={0}
    >
      {children}
      {open && <div className="ds-tooltip">{content}</div>}
    </div>
  );
}
