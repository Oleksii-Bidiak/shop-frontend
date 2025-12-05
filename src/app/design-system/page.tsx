'use client';

import { useMemo, useState } from 'react';

import { designTokens, type ThemeName } from '@/shared/design/tokens';
import { Badge } from '@/shared/ui/badge';
import { Breadcrumbs } from '@/shared/ui/breadcrumbs';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Dialog, Drawer } from '@/shared/ui/dialog';
import { Dropdown } from '@/shared/ui/dropdown';
import { Input } from '@/shared/ui/input';
import { Pagination } from '@/shared/ui/pagination';
import { Select } from '@/shared/ui/select';
import { Skeleton } from '@/shared/ui/skeleton';
import { Tabs } from '@/shared/ui/tabs';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { useToast } from '@/shared/ui/toast';
import { Tooltip } from '@/shared/ui/tooltip';

function ColorSwatches({ theme }: { theme: ThemeName }) {
  const colors = designTokens.colors[theme];
  const cssVars = designTokens.cssVariables[theme];
  const entries = useMemo(
    () =>
      Object.entries(colors).map(([name, value]) => {
        const variableName = `--ds-color-${name.replace(/([A-Z])/g, '-$1').toLowerCase()}`;
        return {
          name,
          value,
          variable: cssVars[variableName] ? variableName : undefined
        };
      }),
    [colors, cssVars]
  );

  return (
    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
      {entries.map((item) => (
        <div
          key={`${theme}-${item.name}`}
          className="flex items-center justify-between rounded-lg border border-border bg-surface p-3"
          style={{ backgroundColor: item.value, color: theme === 'dark' ? '#0b1222' : '#0f172a' }}
        >
          <div className="grid">
            <span className="font-semibold text-contrast">{item.name}</span>
            <span className="text-sm text-muted">{item.variable}</span>
          </div>
          <span className="text-sm font-semibold">{item.value}</span>
        </div>
      ))}
    </div>
  );
}

function TokenStack({
  label,
  values
}: {
  label: string;
  values: { name: string; value: string | number; variable?: string }[];
}) {
  return (
    <div className="grid gap-2">
      <p className="text-sm font-semibold text-muted">{label}</p>
      <div className="grid gap-2 md:grid-cols-2">
        {values.map((item) => (
          <div key={item.name} className="flex items-center justify-between rounded-md border border-border bg-surface px-3 py-2">
            <div className="grid">
              <span className="font-semibold text-text">{item.name}</span>
              {item.variable && <span className="text-xs text-muted">{item.variable}</span>}
            </div>
            <span className="text-sm text-muted">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DesignSystemPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(2);
  const { notify } = useToast();

  const tabItems = [
    { value: 'specs', label: 'Характеристики', content: <p>8 ГБ, 256 ГБ, OLED-дисплей.</p> },
    { value: 'delivery', label: 'Доставка', content: <p>Самовивіз, кур&apos;єр, поштомати.</p> },
    { value: 'service', label: 'Сервіс', content: <p>14 днів на повернення, гарантія 12 місяців.</p> }
  ];

  const dropdownItems = [
    { label: 'Редагувати', value: 'edit' },
    { label: 'Дублікат', value: 'duplicate' },
    { label: 'Архівувати', value: 'archive' }
  ];

  return (
    <div className="container grid gap-10 py-10">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="grid gap-2">
          <p className="badge">Design System</p>
          <h1>UI токени та компоненти</h1>
          <p>Світла та темна теми через data-theme з підключенням CSS variables у globals.css.</p>
        </div>
        <ThemeToggle />
      </header>

      <section className="grid gap-4">
        <div className="section-title">
          <h2>Токени</h2>
          <span className="text-muted">TypeScript + CSS variables</span>
        </div>

        <Card className="grid gap-5">
          <h3>Кольори (light)</h3>
          <ColorSwatches theme="light" />
          <h3>Кольори (dark)</h3>
          <ColorSwatches theme="dark" />
        </Card>

        <Card className="grid gap-5">
          <TokenStack
            label="Відступи"
            values={Object.entries(designTokens.spacing).map(([key, value]) => ({
              name: `space-${key}`,
              value,
              variable: `--ds-space-${key}`
            }))}
          />
          <TokenStack
            label="Радіуси"
            values={Object.entries(designTokens.radii).map(([key, value]) => ({
              name: key,
              value,
              variable: `--ds-radius-${key}`
            }))}
          />
          <TokenStack
            label="Типографіка"
            values={[
              { name: 'font-family', value: designTokens.typography.fontFamily, variable: '--ds-font-family' },
              ...Object.entries(designTokens.typography.sizes).map(([key, value]) => ({
                name: `font-${key}`,
                value,
                variable: `--ds-font-${key === 'display' ? 'display' : key}`
              })),
              ...Object.entries(designTokens.typography.weights).map(([key, value]) => ({
                name: `weight-${key}`,
                value,
                variable: `--ds-font-${key}`
              }))
            ]}
          />
        </Card>
      </section>

      <section className="grid gap-4">
        <div className="section-title">
          <h2>Компоненти</h2>
          <span className="text-muted">Button, Input, Select, Badge, Tabs, Dialog, Drawer, Tooltip, Dropdown, Card, Skeleton, Toast, Pagination, Breadcrumbs</span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Card className="grid gap-3">
            <h3>Кнопки</h3>
            <div className="flex flex-wrap items-center gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button size="sm">Small</Button>
              <Button size="lg">Large</Button>
            </div>
          </Card>

          <Card className="grid gap-3">
            <h3>Форми</h3>
            <div className="grid gap-3">
              <Input label="Email" placeholder="you@example.com" helperText="Ми не спамимо" />
              <Select label="Місто" defaultValue="kyiv">
                <option value="kyiv">Київ</option>
                <option value="lviv">Львів</option>
                <option value="odesa">Одеса</option>
              </Select>
              <Tabs items={tabItems} />
            </div>
          </Card>

          <Card className="grid gap-3">
            <h3>Стани та підказки</h3>
            <div className="flex flex-wrap items-center gap-2">
              <Badge>Новинка</Badge>
              <Badge className="success">Успіх</Badge>
              <Badge className="warning">Попередження</Badge>
              <Badge className="neutral">Нейтрально</Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Tooltip content="Підказка">
                <Button variant="secondary">Наведи</Button>
              </Tooltip>
              <Dropdown
                trigger={<Button variant="secondary">Дії</Button>}
                items={dropdownItems}
                onSelect={(value) => notify({ title: 'Дія', description: `Обрано: ${value}`, tone: 'default' })}
              />
            </div>
          </Card>

          <Card className="grid gap-3">
            <h3>Картки та скелетони</h3>
            <div className="grid gap-3 md:grid-cols-2">
              <Card>
                <p className="text-muted">Карточка</p>
                <p className="font-semibold">Інформаційний блок</p>
              </Card>
              <Skeleton className="h-20" />
            </div>
          </Card>

          <Card className="grid gap-3">
            <h3>Діалоги</h3>
            <div className="flex flex-wrap gap-3">
              <Button onClick={() => setDialogOpen(true)}>Відкрити діалог</Button>
              <Button variant="secondary" onClick={() => setDrawerOpen(true)}>
                Відкрити шухляду
              </Button>
            </div>
            <Dialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="Підтвердити дію"
              description="Це демонстрація модального вікна."
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                    Скасувати
                  </Button>
                  <Button onClick={() => setDialogOpen(false)}>Погодитись</Button>
                </div>
              }
            >
              <p>Діалоги та шухляди використовують data-theme і накладають overlay з токенів.</p>
            </Dialog>
            <Drawer
              open={drawerOpen}
              onClose={() => setDrawerOpen(false)}
              title="Кошик"
              description="Швидкий доступ до корзини."
              footer={
                <div className="flex justify-end gap-2">
                  <Button variant="secondary" onClick={() => setDrawerOpen(false)}>
                    Закрити
                  </Button>
                  <Button>Оформити</Button>
                </div>
              }
            >
              <p className="text-muted">Контент шухляди розташовується праворуч.</p>
            </Drawer>
          </Card>

          <Card className="grid gap-3">
            <h3>Навігація та повідомлення</h3>
            <Breadcrumbs
              items={[
                { label: 'Головна', href: '/' },
                { label: 'Каталог', href: '/catalog' },
                { label: 'Ноутбуки' },
                { label: 'MacBook Air' }
              ]}
            />
            <Pagination totalPages={8} currentPage={currentPage} onPageChange={setCurrentPage} />
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => notify({ title: 'Готово', description: 'Дія виконана успішно', tone: 'success' })}
              >
                Показати toast
              </Button>
              <Button onClick={() => notify({ title: 'Помилка', description: 'Щось пішло не так', tone: 'error' })}>
                Помилка
              </Button>
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-3">
        <div className="section-title">
          <h2>Тема в ізоляції</h2>
          <span className="text-muted">data-theme на контейнерах</span>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div data-theme="light" className="ds-surface grid gap-3">
            <p className="text-muted">data-theme=&quot;light&quot;</p>
            <Button>Кнопка</Button>
            <Input placeholder="Плейсхолдер" />
          </div>
          <div data-theme="dark" className="ds-surface grid gap-3">
            <p className="text-muted">data-theme=&quot;dark&quot;</p>
            <Button>Кнопка</Button>
            <Input placeholder="Плейсхолдер" />
          </div>
        </div>
      </section>
    </div>
  );
}
