'use client';

import { useState } from 'react';

import { tw } from '@/shared/lib/styles';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Dialog, Drawer } from '@/shared/ui/dialog';
import { Dropdown } from '@/shared/ui/dropdown';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { Skeleton } from '@/shared/ui/skeleton';
import { Tabs } from '@/shared/ui/tabs';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { Tooltip } from '@/shared/ui/tooltip';
import { useToast } from '@/shared/ui/toast';

const dropdownItems = [
  { label: 'Профіль', value: 'profile' },
  { label: 'Налаштування', value: 'settings' },
  { label: 'Вийти', value: 'logout' }
];

const colorSwatchClass: Record<string, string> = {
  accent: 'bg-accent',
  text: 'bg-text',
  muted: 'bg-muted',
  border: 'bg-border'
};

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { notify } = useToast();

  return (
    <div className="container grid gap-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3">
          <p className="badge w-fit">Design tokens + UI kit</p>
          <h1>Бібліотека компонентів</h1>
          <p className="max-w-3xl text-base text-muted">
            Токени кольорів, відступів, радіусів та типографіки на CSS variables із синхронним TS-описом. Базові компоненти
            працюють з темами через data-theme.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Card>
        <h3>Кольори, spacing, radius</h3>
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(180px,1fr))]">
          {["accent", "text", "muted", "border"].map((token) => (
            <div key={token} className="flex items-center gap-3">
              <span className={tw('h-[40px] w-[40px] rounded-md border border-border', colorSwatchClass[token])} />
              <div className="space-y-1">
                <strong>--ds-color-{token}</strong>
                <p className="text-sm text-muted">У темній темі значення автоматично змінюються</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              className="inline-flex min-w-[52px] items-center justify-center rounded-sm border border-dashed border-border bg-surface px-2.5 py-1 text-sm text-muted"
            >
              space-{step}
            </span>
          ))}
          <Badge tone="neutral">radius: md / lg / full</Badge>
        </div>
      </Card>

      <Card>
        <h3>Кнопки та інпут</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
        </div>
        <div className="mt-4 grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(240px,1fr))]">
          <Input label="Email" placeholder="you@example.com" helperText="Працює у будь-якій темі" />
          <Select label="Статус">
            <option>Чернетка</option>
            <option>Опубліковано</option>
            <option>Архів</option>
          </Select>
        </div>
      </Card>

      <Card>
        <h3>Tabs, Badge, Tooltip</h3>
        <Tabs
          items={[
            { value: 'overview', label: 'Огляд', content: <p className="text-muted">Контент першої вкладки</p> },
            { value: 'specs', label: 'Характеристики', content: <p className="text-muted">Детальні характеристики</p> },
            { value: 'reviews', label: 'Відгуки', content: <p className="text-muted">Оцінки покупців</p> }
          ]}
        />
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Badge>accent</Badge>
          <Badge tone="success">success</Badge>
          <Badge tone="warning">warning</Badge>
          <Tooltip content="Тултіп на hover/focus">
            <Button variant="ghost">Наведи курсор</Button>
          </Tooltip>
        </div>
      </Card>

      <Card>
        <h3>Dialog, Drawer, Dropdown, Toast</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => setDialogOpen(true)}>Відкрити діалог</Button>
          <Button onClick={() => setDrawerOpen(true)} variant="secondary">
            Відкрити дровер
          </Button>
          <Dropdown
            items={dropdownItems}
            onSelect={(value) => notify({ title: 'Dropdown', description: value })}
            trigger={<Button>Дропдаун</Button>}
          />
          <Button onClick={() => notify({ title: 'Успіх', description: 'Дані збережено', tone: 'success' })}>
            Показати toast
          </Button>
        </div>
        <Dialog
          open={dialogOpen}
          title="Діалогове вікно"
          description="Готове до повторного використання із data-theme"
          onClose={() => setDialogOpen(false)}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Підтвердити</Button>
            </div>
          }
        >
          <p className="text-muted">Контент, форму чи будь-що можна вкласти всередину.</p>
        </Dialog>
        <Drawer
          open={drawerOpen}
          title="Дровер"
          description="Слайд-панель з overlay"
          onClose={() => setDrawerOpen(false)}
          footer={
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => setDrawerOpen(false)}>
                Закрити
              </Button>
            </div>
          }
        >
          <p className="text-muted">Додайте форму, фільтри чи навігацію. Стилі реагують на зміну теми.</p>
        </Drawer>
      </Card>

      <Card>
        <h3>Skeleton та Card</h3>
        <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]">
          <Card>
            <Skeleton className="mb-3 h-[160px]" />
            <Skeleton className="mb-2 h-[14px] w-3/5 rounded-full" />
            <Skeleton className="h-[14px] w-2/5 rounded-full" />
          </Card>
          <Card>
            <h4>Приклад картки</h4>
            <p className="text-muted">Картка використовує ті самі токени відступів, радіусів та кольорів.</p>
            <Button variant="secondary">Дія</Button>
          </Card>
        </div>
      </Card>
    </div>
  );
}
