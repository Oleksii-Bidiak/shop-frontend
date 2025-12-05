'use client';

import { PropsWithChildren, ReactNode, useEffect, useRef, useState } from 'react';

interface DropdownProps {
  trigger: ReactNode;
  items: { label: string; value: string; icon?: ReactNode }[];
  onSelect?: (value: string) => void;
}

export function Dropdown({ trigger, items, onSelect }: PropsWithChildren<DropdownProps>) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <div className="ds-dropdown" ref={ref}>
      <div onClick={() => setOpen((prev) => !prev)}>{trigger}</div>
      {open && (
        <div className="ds-dropdown-menu" role="menu">
          {items.map((item) => (
            <button
              type="button"
              key={item.value}
              className="ds-dropdown-item"
              role="menuitem"
              onClick={() => {
                onSelect?.(item.value);
                setOpen(false);
              }}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
