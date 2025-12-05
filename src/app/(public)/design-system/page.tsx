'use client';

import { useState } from 'react';

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

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { notify } = useToast();

  return (
    <div className="container" style={{ display: 'grid', gap: '24px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p className="badge" style={{ marginBottom: 8 }}>
            Design tokens + UI kit
          </p>
          <h1 style={{ margin: 0 }}>Бібліотека компонентів</h1>
          <p style={{ color: 'var(--ds-color-muted)', maxWidth: 720 }}>
            Токени кольорів, відступів, радіусів та типографіки на CSS variables із синхронним TS-описом.
            Базові компоненти працюють з темами через data-theme.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Card>
        <h3>Кольори, spacing, radius</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
          {["accent", "text", "muted", "border"].map((token) => (
            <div key={token} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 'var(--ds-radius-md)',
                  border: '1px solid var(--ds-color-border)',
                  background:
                    token === 'accent'
                      ? 'var(--ds-color-accent)'
                      : token === 'text'
                        ? 'var(--ds-color-text)'
                        : token === 'muted'
                          ? 'var(--ds-color-muted)'
                          : 'var(--ds-color-border)'
                }}
              />
              <div>
                <strong>--ds-color-{token}</strong>
                <p style={{ margin: 0, color: 'var(--ds-color-muted)' }}>У темній темі значення автоматично змінюються</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          {[1, 2, 3, 4].map((step) => (
            <span
              key={step}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--ds-color-surface)',
                border: '1px dashed var(--ds-color-border)',
                padding: '4px 10px',
                borderRadius: 'var(--ds-radius-sm)',
                minWidth: 52
              }}
            >
              space-{step}
            </span>
          ))}
          <Badge tone="neutral">radius: md / lg / full</Badge>
        </div>
      </Card>

      <Card>
        <h3>Кнопки та інпут</h3>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button loading>Loading</Button>
        </div>
        <div style={{ display: 'grid', gap: 12, marginTop: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
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
            { value: 'overview', label: 'Огляд', content: <p style={{ margin: 0 }}>Контент першої вкладки</p> },
            { value: 'specs', label: 'Характеристики', content: <p style={{ margin: 0 }}>Детальні характеристики</p> },
            { value: 'reviews', label: 'Відгуки', content: <p style={{ margin: 0 }}>Оцінки покупців</p> }
          ]}
        />
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginTop: 16, flexWrap: 'wrap' }}>
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
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
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
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setDialogOpen(false)}>
                Скасувати
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Підтвердити</Button>
            </div>
          }
        >
          <p style={{ color: 'var(--ds-color-muted)', margin: 0 }}>Контент, форму чи будь-що можна вкласти всередину.</p>
        </Dialog>
        <Drawer
          open={drawerOpen}
          title="Дровер"
          description="Слайд-панель з overlay"
          onClose={() => setDrawerOpen(false)}
          footer={
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={() => setDrawerOpen(false)}>
                Закрити
              </Button>
            </div>
          }
        >
          <p style={{ color: 'var(--ds-color-muted)', margin: 0 }}>
            Додайте форму, фільтри чи навігацію. Стилі реагують на зміну теми.
          </p>
        </Drawer>
      </Card>

      <Card>
        <h3>Skeleton та Card</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
          <Card>
            <Skeleton height={160} style={{ marginBottom: 12 }} />
            <Skeleton width="60%" height={14} rounded style={{ marginBottom: 8 }} />
            <Skeleton width="40%" height={14} rounded />
          </Card>
          <Card>
            <h4 style={{ marginTop: 0 }}>Приклад картки</h4>
            <p style={{ color: 'var(--ds-color-muted)' }}>
              Картка використовує ті самі токени відступів, радіусів та кольорів.
            </p>
            <Button variant="secondary">Дія</Button>
          </Card>
        </div>
      </Card>
    </div>
  );
}
