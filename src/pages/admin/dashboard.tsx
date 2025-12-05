'use client';

import { useMemo, useState } from 'react';

import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import { Select } from '@/shared/ui/select';
import { Tabs } from '@/shared/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';

type ProductRow = {
  sku: string;
  name: string;
  variant: string;
  price: number;
  stock: number;
  margin: number;
  media: number;
  status: 'live' | 'draft' | 'archived';
};

type FulfillmentStatus = 'Очікує' | 'Комплектується' | 'Відправлено' | 'Доставлено';
type PaymentStatus = 'Не сплачено' | 'Сплачено' | 'Повернення';
type ReturnStatus = 'Немає' | 'Запит' | 'В процесі' | 'Завершено';

type OrderRow = {
  id: string;
  customer: string;
  status: 'Новий' | 'Оплачено' | 'Відправлено' | 'Повернення';
  fulfillment: FulfillmentStatus;
  payment: PaymentStatus;
  returnStatus: ReturnStatus;
  total: number;
  items: number;
};

type CategoryRow = { name: string; tags: string[]; slug: string; products: number };
type PromoRow = { code: string; discount: string; usage: number; status: string };
type UserRow = { name: string; role: string; email: string; active: boolean };
type ReviewRow = { author: string; rating: number; status: string; text: string };
type BannerRow = { name: string; placement: string; clicks: number; active: boolean };

const initialProducts: ProductRow[] = [
  { sku: 'SKU-1001', name: 'Чохол MagSafe', variant: 'iPhone 15, чорний', price: 1399, stock: 42, margin: 42, media: 6, status: 'live' },
  { sku: 'SKU-1002', name: 'Навушники TWS Air', variant: 'Білий кейс', price: 2899, stock: 12, margin: 36, media: 8, status: 'live' },
  { sku: 'SKU-1003', name: 'Зарядний блок 30W', variant: 'USB-C', price: 899, stock: 63, margin: 48, media: 3, status: 'draft' },
  { sku: 'SKU-1004', name: 'Захисне скло 2.5D', variant: 'iPhone 14 Pro', price: 499, stock: 8, margin: 28, media: 5, status: 'live' },
  { sku: 'SKU-1005', name: 'Бездротова док-станція', variant: 'Дерево', price: 1799, stock: 4, margin: 25, media: 7, status: 'archived' }
];

const initialOrders: OrderRow[] = [
  {
    id: 'INV-2045',
    status: 'Новий',
    customer: 'Ірина Коваль',
    total: 3250,
    items: 3,
    fulfillment: 'Очікує',
    payment: 'Не сплачено',
    returnStatus: 'Немає'
  },
  {
    id: 'INV-2044',
    status: 'Оплачено',
    customer: 'Роман Литвин',
    total: 1899,
    items: 1,
    fulfillment: 'Комплектується',
    payment: 'Сплачено',
    returnStatus: 'Немає'
  },
  {
    id: 'INV-2043',
    status: 'Відправлено',
    customer: 'Валерія Білик',
    total: 2480,
    items: 2,
    fulfillment: 'Відправлено',
    payment: 'Сплачено',
    returnStatus: 'Запит'
  },
  {
    id: 'INV-2042',
    status: 'Повернення',
    customer: 'Дмитро Уманський',
    total: 1199,
    items: 1,
    fulfillment: 'Доставлено',
    payment: 'Повернення',
    returnStatus: 'В процесі'
  }
];

const categoryRows: CategoryRow[] = [
  { name: 'Чохли', tags: ['magsafe', 'силікон'], slug: 'cases', products: 128 },
  { name: 'Захист екрана', tags: ['скло', 'плівка'], slug: 'screen-protection', products: 74 },
  { name: 'Зарядні пристрої', tags: ['pd', 'бездротові'], slug: 'chargers', products: 58 }
];

const promoRows: PromoRow[] = [
  { code: 'SPRING20', discount: '-20% на весь кошик', usage: 142, status: 'Активний' },
  { code: 'FREESHIP', discount: 'Безкоштовна доставка', usage: 320, status: 'Запланований' },
  { code: 'VIP30', discount: '-30% на аксесуари', usage: 51, status: 'Пауза' }
];

const userRows: UserRow[] = [
  { name: 'Марія Зайцева', role: 'Менеджер контенту', email: 'maria@shop.ua', active: true },
  { name: 'Орест Онищук', role: 'Сапорт', email: 'orest@shop.ua', active: true },
  { name: 'Світлана Мельник', role: 'Адміністратор', email: 'svitlana@shop.ua', active: false }
];

const reviewRows: ReviewRow[] = [
  { author: 'Анна', rating: 5, status: 'Опубліковано', text: 'Швидка доставка, якісний товар.' },
  { author: 'Богдан', rating: 3, status: 'На модерації', text: 'Хороший звук, але затримали доставку.' },
  { author: 'Оксана', rating: 1, status: 'Приховано', text: 'Отримала інший колір, прошу заміну.' }
];

const bannerRows: BannerRow[] = [
  { name: 'Весняний сейл', placement: 'Головна', clicks: 1290, active: true },
  { name: 'Новинки аудіо', placement: 'Каталог', clicks: 820, active: true },
  { name: 'Додаткові аксесуари', placement: 'Кошик', clicks: 305, active: false }
];

export const AdminDashboardPage = () => {
  const [products, setProducts] = useState(initialProducts);
  const [selectedProducts, setSelectedProducts] = useState<Record<string, boolean>>({});
  const [productSearch, setProductSearch] = useState('');
  const [productStatus, setProductStatus] = useState('all');
  const [productSort, setProductSort] = useState<{ column: keyof ProductRow; direction: 'asc' | 'desc' }>({
    column: 'margin',
    direction: 'desc'
  });

  const [orders, setOrders] = useState(initialOrders);
  const [orderFilter, setOrderFilter] = useState('all');
  const [orderFulfillmentFilter, setOrderFulfillmentFilter] = useState<FulfillmentStatus | 'all'>('all');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState<PaymentStatus | 'all'>('all');
  const [orderReturnFilter, setOrderReturnFilter] = useState<ReturnStatus | 'all'>('all');
  const [orderSearch, setOrderSearch] = useState('');
  const [orderSort, setOrderSort] = useState<'total' | 'items' | 'customer'>('total');
  const [selectedOrders, setSelectedOrders] = useState<Record<string, boolean>>({});
  const [reviewFilter, setReviewFilter] = useState<'all' | 'Опубліковано' | 'На модерації' | 'Приховано'>('all');

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        [product.name, product.sku, product.variant].some((value) =>
          value.toLowerCase().includes(productSearch.toLowerCase())
        )
      )
      .filter((product) => (productStatus === 'all' ? true : product.status === productStatus))
      .sort((a, b) => {
        const { column, direction } = productSort;
        const [first, second] = direction === 'asc' ? [a, b] : [b, a];
        return typeof first[column] === 'number'
          ? (first[column] as number) - (second[column] as number)
          : String(first[column]).localeCompare(String(second[column]));
      });
  }, [productSearch, productStatus, productSort, products]);

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => (orderFilter === 'all' ? true : order.status === orderFilter))
      .filter((order) => (orderFulfillmentFilter === 'all' ? true : order.fulfillment === orderFulfillmentFilter))
      .filter((order) => (orderPaymentFilter === 'all' ? true : order.payment === orderPaymentFilter))
      .filter((order) => (orderReturnFilter === 'all' ? true : order.returnStatus === orderReturnFilter))
      .filter((order) =>
        orderSearch
          ? [order.id, order.customer].some((value) => value.toLowerCase().includes(orderSearch.toLowerCase()))
          : true
      )
      .sort((a, b) => {
        if (orderSort === 'customer') {
          return a.customer.localeCompare(b.customer);
        }
        return orderSort === 'items' ? b.items - a.items : b.total - a.total;
      });
  }, [orderFilter, orderFulfillmentFilter, orderPaymentFilter, orderReturnFilter, orderSearch, orderSort, orders]);

  const filteredReviews = useMemo(
    () => reviewRows.filter((review) => (reviewFilter === 'all' ? true : review.status === reviewFilter)),
    [reviewFilter]
  );

  const metrics = [
    { label: 'Дохід (30д)', value: '₴ 482 100', trend: '+14%' },
    { label: 'Рівень виконання', value: '96%', trend: '+2.1%' },
    { label: 'Середній чек', value: '₴ 1 540', trend: '+5%' },
    { label: 'NPS', value: '62', trend: '+3' }
  ];

  const tabItems = [
    { value: 'products', label: 'Товари та SKU', content: <div id="products">{renderProducts()}</div> },
    { value: 'categories', label: 'Категорії та теги', content: <div id="categories">{renderCategories()}</div> },
    { value: 'promos', label: 'Акції / промокоди', content: <div id="promos">{renderPromos()}</div> },
    { value: 'orders', label: 'Замовлення', content: <div id="orders">{renderOrders()}</div> },
    { value: 'users', label: 'Користувачі', content: <div id="users">{renderUsers()}</div> },
    { value: 'reviews', label: 'Відгуки', content: <div id="reviews">{renderReviews()}</div> },
    { value: 'banners', label: 'Банери', content: <div id="banners">{renderBanners()}</div> }
  ];

  function toggleAllProducts(checked: boolean) {
    const nextSelection: Record<string, boolean> = {};
    filteredProducts.forEach((item) => {
      nextSelection[item.sku] = checked;
    });
    setSelectedProducts(nextSelection);
  }

  function toggleProductSelection(sku: string, checked: boolean) {
    setSelectedProducts((prev) => ({ ...prev, [sku]: checked }));
  }

  function toggleProductSort(column: keyof ProductRow) {
    setProductSort((prev) => {
      if (prev.column === column) {
        return { column, direction: prev.direction === 'asc' ? 'desc' : 'asc' };
      }
      return { column, direction: 'desc' };
    });
  }

  function updateProductField(sku: string, field: 'price' | 'stock' | 'margin', value: number) {
    setProducts((prev) =>
      prev.map((product) => (product.sku === sku ? { ...product, [field]: value } : product))
    );
  }

  function toggleAllOrders(checked: boolean) {
    const nextSelection: Record<string, boolean> = {};
    filteredOrders.forEach((item) => {
      nextSelection[item.id] = checked;
    });
    setSelectedOrders(nextSelection);
  }

  function toggleOrderSelection(id: string, checked: boolean) {
    setSelectedOrders((prev) => ({ ...prev, [id]: checked }));
  }

  function updateOrderField<TField extends keyof OrderRow>(id: string, field: TField, value: OrderRow[TField]) {
    setOrders((prev) => prev.map((order) => (order.id === id ? { ...order, [field]: value } : order)));
  }

  function renderProducts() {
    return (
      <Card className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Input
            value={productSearch}
            onChange={(event) => setProductSearch(event.target.value)}
            placeholder="Пошук за SKU, назвою або варіантом"
          />
          <Select value={productStatus} onChange={(event) => setProductStatus(event.target.value)}>
            <option value="all">Усі статуси</option>
            <option value="live">Live</option>
            <option value="draft">Чернетка</option>
            <option value="archived">Архів</option>
          </Select>
          <Button className="sm" variant="secondary">
            Експорт CSV
          </Button>
          <Button className="sm">Створити товар</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-border pb-3">
          <span className="text-sm text-muted">Bulk-дії:</span>
          <Button className="sm" variant="ghost">
            Опублікувати вибране
          </Button>
          <Button className="sm" variant="ghost">
            Позначити як чернетку
          </Button>
          <Button className="sm" variant="ghost">
            Оновити медіа
          </Button>
        </div>

        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <input
                    aria-label="Обрати все"
                    checked={filteredProducts.every((item) => selectedProducts[item.sku])}
                    className="accent-accent"
                    onChange={(event) => toggleAllProducts(event.target.checked)}
                    type="checkbox"
                  />
                </TableHead>
                <TableHead>
                  SKU
                  <button className="ml-1 text-xs text-muted" onClick={() => toggleProductSort('sku')}>
                    ⇅
                  </button>
                </TableHead>
                <TableHead>Назва</TableHead>
                <TableHead>Варіант</TableHead>
                <TableHead>
                  Маржа
                  <button className="ml-1 text-xs text-muted" onClick={() => toggleProductSort('margin')}>
                    ⇅
                  </button>
                </TableHead>
                <TableHead>
                  Запаси
                  <button className="ml-1 text-xs text-muted" onClick={() => toggleProductSort('stock')}>
                    ⇅
                  </button>
                </TableHead>
                <TableHead>Медіа</TableHead>
                <TableHead>Статус</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.sku} className="align-top">
                  <TableCell>
                    <input
                      aria-label={`Select ${product.sku}`}
                      checked={Boolean(selectedProducts[product.sku])}
                      className="accent-accent"
                      onChange={(event) => toggleProductSelection(product.sku, event.target.checked)}
                      type="checkbox"
                    />
                  </TableCell>
                  <TableCell className="font-semibold">{product.sku}</TableCell>
                  <TableCell>
                    <div className="font-semibold text-text">{product.name}</div>
                    <p className="text-sm text-muted">₴ {product.price.toLocaleString('uk-UA')}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted">{product.variant}</TableCell>
                  <TableCell>
                    <Input
                      aria-label={`Маржа ${product.sku}`}
                      className="ds-input h-10 w-28 text-center"
                      value={product.margin}
                      onChange={(event) => updateProductField(product.sku, 'margin', Number(event.target.value))}
                      type="number"
                    />
                    <p className="text-xs text-muted">%</p>
                  </TableCell>
                  <TableCell>
                    <Input
                      aria-label={`Запаси ${product.sku}`}
                      className="ds-input h-10 w-24 text-center"
                      value={product.stock}
                      onChange={(event) => updateProductField(product.sku, 'stock', Number(event.target.value))}
                      type="number"
                    />
                    <p className="text-xs text-muted">од.</p>
                  </TableCell>
                  <TableCell>
                    <Badge className="neutral">{product.media} файлів</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={product.status === 'live' ? 'success' : product.status === 'draft' ? 'warning' : 'neutral'}>
                      {product.status}
                    </Badge>
                    <p className="text-xs text-muted">₴ {product.price.toLocaleString('uk-UA')}</p>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    );
  }

  function renderOrders() {
    return (
      <Card className="space-y-4">
        <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
          <div className="flex flex-wrap items-center gap-2">
            <Input
              value={orderSearch}
              onChange={(event) => setOrderSearch(event.target.value)}
              placeholder="Пошук за замовленням або клієнтом"
            />
            <Select value={orderSort} onChange={(event) => setOrderSort(event.target.value as typeof orderSort)}>
              <option value="total">Сортувати за сумою</option>
              <option value="items">Сортувати за SKU</option>
              <option value="customer">Сортувати за клієнтом</option>
            </Select>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={orderFilter} onChange={(event) => setOrderFilter(event.target.value)}>
              <option value="all">Усі статуси</option>
              <option value="Новий">Нові</option>
              <option value="Оплачено">Оплачені</option>
              <option value="Відправлено">Відправлені</option>
              <option value="Повернення">Повернення</option>
            </Select>
            <Select value={orderFulfillmentFilter} onChange={(event) => setOrderFulfillmentFilter(event.target.value as FulfillmentStatus | 'all')}>
              <option value="all">Будь-який фулфілмент</option>
              <option value="Очікує">Очікує</option>
              <option value="Комплектується">Комплектується</option>
              <option value="Відправлено">Відправлено</option>
              <option value="Доставлено">Доставлено</option>
            </Select>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={orderPaymentFilter} onChange={(event) => setOrderPaymentFilter(event.target.value as PaymentStatus | 'all')}>
              <option value="all">Будь-яка оплата</option>
              <option value="Не сплачено">Не сплачено</option>
              <option value="Сплачено">Сплачено</option>
              <option value="Повернення">Повернення</option>
            </Select>
            <Select value={orderReturnFilter} onChange={(event) => setOrderReturnFilter(event.target.value as ReturnStatus | 'all')}>
              <option value="all">Повернення</option>
              <option value="Немає">Немає</option>
              <option value="Запит">Запит</option>
              <option value="В процесі">В процесі</option>
              <option value="Завершено">Завершено</option>
            </Select>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 border-b border-border pb-3">
          <span className="text-sm text-muted">Bulk-дії:</span>
          <Button className="sm" variant="ghost">
            Підтвердити оплату
          </Button>
          <Button className="sm" variant="ghost">
            Розпочати фулфілмент
          </Button>
          <Button className="sm" variant="ghost">
            Оформити повернення
          </Button>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <input
                  aria-label="Обрати всі замовлення"
                  checked={filteredOrders.every((item) => selectedOrders[item.id]) && filteredOrders.length > 0}
                  className="accent-accent"
                  onChange={(event) => toggleAllOrders(event.target.checked)}
                  type="checkbox"
                />
              </TableHead>
              <TableHead>Замовлення</TableHead>
              <TableHead>Клієнт</TableHead>
              <TableHead>Сума</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Фулфілмент</TableHead>
              <TableHead>Оплата</TableHead>
              <TableHead>Повернення</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <input
                    aria-label={`Select ${order.id}`}
                    checked={Boolean(selectedOrders[order.id])}
                    className="accent-accent"
                    onChange={(event) => toggleOrderSelection(order.id, event.target.checked)}
                    type="checkbox"
                  />
                </TableCell>
                <TableCell className="font-semibold">{order.id}</TableCell>
                <TableCell>{order.customer}</TableCell>
                <TableCell>₴ {order.total.toLocaleString('uk-UA')}</TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>
                  <Select
                    aria-label={`Статус ${order.id}`}
                    value={order.status}
                    onChange={(event) => updateOrderField(order.id, 'status', event.target.value as OrderRow['status'])}
                  >
                    <option value="Новий">Новий</option>
                    <option value="Оплачено">Оплачено</option>
                    <option value="Відправлено">Відправлено</option>
                    <option value="Повернення">Повернення</option>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    aria-label={`Фулфілмент ${order.id}`}
                    value={order.fulfillment}
                    onChange={(event) =>
                      updateOrderField(order.id, 'fulfillment', event.target.value as OrderRow['fulfillment'])
                    }
                  >
                    <option value="Очікує">Очікує</option>
                    <option value="Комплектується">Комплектується</option>
                    <option value="Відправлено">Відправлено</option>
                    <option value="Доставлено">Доставлено</option>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    aria-label={`Оплата ${order.id}`}
                    value={order.payment}
                    onChange={(event) => updateOrderField(order.id, 'payment', event.target.value as OrderRow['payment'])}
                  >
                    <option value="Не сплачено">Не сплачено</option>
                    <option value="Сплачено">Сплачено</option>
                    <option value="Повернення">Повернення</option>
                  </Select>
                </TableCell>
                <TableCell>
                  <Select
                    aria-label={`Повернення ${order.id}`}
                    value={order.returnStatus}
                    onChange={(event) =>
                      updateOrderField(order.id, 'returnStatus', event.target.value as OrderRow['returnStatus'])
                    }
                  >
                    <option value="Немає">Немає</option>
                    <option value="Запит">Запит</option>
                    <option value="В процесі">В процесі</option>
                    <option value="Завершено">Завершено</option>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  function renderCategories() {
    return (
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Категорії, теги та SEO-шляхи</p>
            <h3>Структура каталогу</h3>
          </div>
          <Button className="sm" variant="secondary">
            Додати категорію
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Категорія</TableHead>
              <TableHead>Теги</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Товарів</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryRows.map((category) => (
              <TableRow key={category.slug}>
                <TableCell className="font-semibold">{category.name}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    {category.tags.map((tag) => (
                      <Badge key={tag} className="neutral">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <Input className="ds-input h-10" defaultValue={category.slug} aria-label={`Slug ${category.name}`} />
                </TableCell>
                <TableCell>{category.products}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  function renderPromos() {
    return (
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Розклад акцій, промокоди та контроль бюджету</p>
            <h3>Маркетинг</h3>
          </div>
          <Button className="sm">Створити промокод</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Код</TableHead>
              <TableHead>Опис</TableHead>
              <TableHead>Використань</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {promoRows.map((promo) => (
              <TableRow key={promo.code}>
                <TableCell className="font-semibold">{promo.code}</TableCell>
                <TableCell>{promo.discount}</TableCell>
                <TableCell>{promo.usage}</TableCell>
                <TableCell>
                  <Badge className="neutral">{promo.status}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  function renderUsers() {
    return (
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h3>Користувачі та ролі</h3>
          <Button className="sm" variant="secondary">
            Запросити
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Співробітник</TableHead>
              <TableHead>Роль</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userRows.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="font-semibold">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge className={user.active ? 'success' : 'warning'}>
                    {user.active ? 'Активний' : 'Очікує'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  function renderReviews() {
    return (
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm text-muted">Модерація, блокування та відповіді</p>
            <h3>Відгуки та модерація</h3>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Select value={reviewFilter} onChange={(event) => setReviewFilter(event.target.value as typeof reviewFilter)}>
              <option value="all">Усі статуси</option>
              <option value="Опубліковано">Опубліковано</option>
              <option value="На модерації">На модерації</option>
              <option value="Приховано">Приховано</option>
            </Select>
            <Button className="sm" variant="secondary">
              Масово сховати спам
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Автор</TableHead>
              <TableHead>Оцінка</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Коментар</TableHead>
              <TableHead>Модерація</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredReviews.map((review) => (
              <TableRow key={`${review.author}-${review.status}`}>
                <TableCell className="font-semibold">{review.author}</TableCell>
                <TableCell>{review.rating}★</TableCell>
                <TableCell>
                  <Select defaultValue={review.status} aria-label={`Статус відгуку ${review.author}`}>
                    <option value="Опубліковано">Опубліковано</option>
                    <option value="На модерації">На модерації</option>
                    <option value="Приховано">Приховано</option>
                  </Select>
                </TableCell>
                <TableCell className="max-w-[480px] text-sm text-muted">{review.text}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Button className="sm" variant="ghost">
                      Відповісти
                    </Button>
                    <Button className="sm" variant="ghost">
                      Позначити як спам
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  function renderBanners() {
    return (
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <h3>Банери та слоти</h3>
          <Button className="sm">Додати банер</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Назва</TableHead>
              <TableHead>Розміщення</TableHead>
              <TableHead>Кліки</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bannerRows.map((banner) => (
              <TableRow key={banner.name}>
                <TableCell className="font-semibold">{banner.name}</TableCell>
                <TableCell>{banner.placement}</TableCell>
                <TableCell>{banner.clicks}</TableCell>
                <TableCell>
                  <Badge className={banner.active ? 'success' : 'neutral'}>
                    {banner.active ? 'Активний' : 'Вимкнений'}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    );
  }

  return (
    <div className="grid gap-6">
      <header className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="badge">Адмін-модулі: товарний контент, замовлення, маркетинг</p>
          <h1 className="my-2">Керування магазином</h1>
          <p className="text-muted">
            Інструменти для SKU, варіантів, медіа, категорій, акцій, замовлень, ролей, модерації та банерів.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Імпорт XLSX</Button>
          <Button>Нова кампанія</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label} className="space-y-2">
            <p className="text-sm text-muted">{metric.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl">{metric.value}</h3>
              <Badge className="success">{metric.trend}</Badge>
            </div>
          </Card>
        ))}
      </div>

      <Tabs items={tabItems} />
    </div>
  );
};
