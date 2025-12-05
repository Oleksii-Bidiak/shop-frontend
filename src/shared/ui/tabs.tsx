'use client';

import { PropsWithChildren, ReactNode, useMemo, useState } from 'react';

export interface TabItem {
  value: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function Tabs({ items, defaultValue, onChange }: PropsWithChildren<TabsProps>) {
  const initial = useMemo(() => defaultValue ?? items[0]?.value, [defaultValue, items]);
  const [current, setCurrent] = useState(initial);

  const active = items.find((item) => item.value === current) ?? items[0];

  return (
    <div className="grid gap-3">
      <div className="ds-tabs" role="tablist">
        {items.map((item) => (
          <button
            key={item.value}
            role="tab"
            aria-selected={current === item.value}
            className={`ds-tab ${current === item.value ? 'active' : ''}`}
            onClick={() => {
              setCurrent(item.value);
              onChange?.(item.value);
            }}
            type="button"
          >
            {item.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{active?.content}</div>
    </div>
  );
}
