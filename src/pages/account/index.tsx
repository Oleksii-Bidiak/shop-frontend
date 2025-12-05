import { useMemo, useState } from 'react';

type OrderStatus = 'processing' | 'delivered' | 'shipped' | 'cancelled';

type Order = {
  id: string;
  date: string;
  total: number;
  status: OrderStatus;
  delivery: string;
  payment: string;
  items: { name: string; quantity: number }[];
};

type Address = {
  id: string;
  label: string;
  recipient: string;
  phone: string;
  details: string;
  notes?: string;
};

type PaymentMethod = {
  id: string;
  label: string;
  details: string;
  type: 'card' | 'applepay' | 'cash';
  expires?: string;
};

type FavoriteItem = {
  id: string;
  name: string;
  price: number;
  status: 'in-stock' | 'preorder';
  note?: string;
};

const orders: Order[] = [
  {
    id: 'UA-12098',
    date: '12 травня 2024',
    total: 3520,
    status: 'delivered',
    delivery: 'Київ, Нова пошта, відділення 23',
    payment: 'Mastercard ••2912 (оплачено)',
    items: [
      { name: 'Кеди Vans Old Skool', quantity: 1 },
      { name: 'Шкарпетки Nike Everyday', quantity: 2 }
    ]
  },
  {
    id: 'UA-12147',
    date: '28 квітня 2024',
    total: 2180,
    status: 'shipped',
    delivery: 'Самовивіз, пункт Львів • Сихів',
    payment: 'Apple Pay (резерв)',
    items: [
      { name: 'Футболка Oversize', quantity: 1 },
      { name: 'Поясна сумка', quantity: 1 }
    ]
  },
  {
    id: 'UA-12001',
    date: '2 квітня 2024',
    total: 1640,
    status: 'cancelled',
    delivery: 'Одеса, доставка курʼєром',
    payment: 'Готівка при отриманні',
    items: [{ name: 'Толстовка з капюшоном', quantity: 1 }]
  }
];

const addresses: Address[] = [
  {
    id: 'home',
    label: 'Домашня адреса',
    recipient: 'Олена Петренко',
    phone: '+380931112233',
    details: 'вул. Іоанна Павла II, 12, Київ, 01001',
    notes: 'Домофон 24, 6 поверх'
  },
  {
    id: 'office',
    label: 'Офіс / самовивіз',
    recipient: 'Олена Петренко',
    phone: '+380931112233',
    details: 'Нова пошта, відділення 23, Київ',
    notes: 'Відправляйте замовлення до 18:00'
  },
  {
    id: 'parents',
    label: 'Батьки',
    recipient: 'Тамара Петренко',
    phone: '+380671234567',
    details: 'м. Львів, просп. Свободи, 8',
    notes: 'Курʼєр телефонує за 30 хв'
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    id: 'mono',
    label: 'Mono Black',
    details: 'Mastercard ••2912',
    type: 'card',
    expires: '11/27'
  },
  {
    id: 'apple',
    label: 'Apple Pay',
    details: 'Привʼязана картка Visa ••4411',
    type: 'applepay'
  },
  {
    id: 'cod',
    label: 'Готівка',
    details: 'Оплата при отриманні',
    type: 'cash'
  }
];

const favoriteItems: FavoriteItem[] = [
  {
    id: 'fav-1',
    name: 'Кросівки New Balance 574',
    price: 4399,
    status: 'in-stock',
    note: 'Доступні у 38-40 розмірах'
  },
  {
    id: 'fav-2',
    name: 'Сорочка лляна oversize',
    price: 1999,
    status: 'preorder',
    note: 'Під замовлення, відвантаження за 3 дні'
  },
  {
    id: 'fav-3',
    name: 'Рюкзак roll-top водостійкий',
    price: 2890,
    status: 'in-stock'
  }
];

const statusBadge: Record<OrderStatus, string> = {
  delivered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
  processing: 'bg-amber-100 text-amber-800 border-amber-200',
  shipped: 'bg-blue-100 text-blue-800 border-blue-200',
  cancelled: 'bg-rose-100 text-rose-800 border-rose-200'
};

const statusLabel: Record<OrderStatus, string> = {
  delivered: 'Доставлено',
  processing: 'Обробляємо',
  shipped: 'Дорогою',
  cancelled: 'Скасовано'
};

const formatPrice = (value: number) => new Intl.NumberFormat('uk-UA', { style: 'currency', currency: 'UAH' }).format(value);

export const AccountPage = () => {
  const [defaultAddressId, setDefaultAddressId] = useState(addresses[0].id);
  const [defaultPaymentId, setDefaultPaymentId] = useState(paymentMethods[0].id);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [newsletter, setNewsletter] = useState(true);
  const [reorderMessage, setReorderMessage] = useState('');

  const deliveredCount = useMemo(() => orders.filter((order) => order.status === 'delivered').length, []);

  const handleReorder = (orderId: string) => {
    setReorderMessage(`Створили драфт повторного замовлення #${orderId}. Перевірте кошик перед оплатою.`);
  };

  return (
    <div className="grid gap-4">
      <div className="section-title">
        <div>
          <p className="badge">Акаунт</p>
          <h1>Профіль покупця</h1>
          <p className="mt-1 text-muted">
            Керуйте контактними даними, адресами доставки, замовленнями та улюбленими товарами. Безпекові налаштування
            стануть активними після підключення бекенду.
          </p>
        </div>
        <span className="badge">MVP</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="card grid gap-4 p-4">
          <div className="section-title mb-0">
            <div>
              <h3>Профіль і безпека</h3>
              <p className="text-muted">Оновіть контактні дані, пароль та двофакторну автентифікацію.</p>
            </div>
            <button className="button ghost">Зберегти чернетку</button>
          </div>

          <div className="grid gap-3 md:grid-cols-2 md:gap-4">
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Імʼя та прізвище</span>
              <input className="rounded-lg border border-border bg-surface px-3 py-2" defaultValue="Олена Петренко" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Email</span>
              <input className="rounded-lg border border-border bg-surface px-3 py-2" defaultValue="olena@example.com" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Телефон</span>
              <input className="rounded-lg border border-border bg-surface px-3 py-2" defaultValue="+380931112233" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Мова сповіщень</span>
              <select className="rounded-lg border border-border bg-surface px-3 py-2">
                <option>Українська</option>
                <option>English</option>
              </select>
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-3 md:gap-4">
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Поточний пароль</span>
              <input className="rounded-lg border border-border bg-surface px-3 py-2" type="password" placeholder="••••••••" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Новий пароль</span>
              <input className="rounded-lg border border-border bg-surface px-3 py-2" type="password" placeholder="Мінімум 8 символів" />
            </label>
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Підтвердження</span>
              <input className="rounded-lg border border-border bg-surface px-3 py-2" type="password" placeholder="Повторіть пароль" />
            </label>
          </div>

          <div className="grid gap-3 md:grid-cols-2">
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
              <div>
                <p className="font-medium">Двофакторна опція</p>
                <p className="text-sm text-muted">Увімкніть OTP у застосунку або через SMS, коли бекенд підтримає.</p>
              </div>
              <button
                className={`button ghost ${twoFactorEnabled ? 'border-primary text-primary' : ''}`}
                onClick={() => setTwoFactorEnabled((state) => !state)}
              >
                {twoFactorEnabled ? 'Увімкнено' : 'Вимкнено'}
              </button>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2">
              <div>
                <p className="font-medium">Сповіщення</p>
                <p className="text-sm text-muted">Розсилка про статус замовлень та персональні пропозиції.</p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-border text-primary"
                  checked={newsletter}
                  onChange={() => setNewsletter((state) => !state)}
                />
                Email + push
              </label>
            </div>
          </div>
        </div>

        <div className="card grid gap-3 p-4">
          <div className="flex items-center justify-between">
            <h3>Швидкі показники</h3>
            <span className="badge ghost">Beta</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-dashed border-border bg-surface p-3">
              <p className="text-sm text-muted">Доставлено</p>
              <p className="text-3xl font-semibold">{deliveredCount}</p>
              <p className="text-xs text-muted">за останні 90 днів</p>
            </div>
            <div className="rounded-lg border border-dashed border-border bg-surface p-3">
              <p className="text-sm text-muted">Улюблені</p>
              <p className="text-3xl font-semibold">{favoriteItems.length}</p>
              <p className="text-xs text-muted">збережені для швидкої покупки</p>
            </div>
          </div>
          <div className="rounded-lg border border-dashed border-border bg-surface p-3 text-sm text-muted">
            Збірка інтерфейсу без підключення до API. Інтегруємо, щойно бекенд поверне ендпоінти для сесій, замовлень та
            платіжних токенів.
          </div>
        </div>
      </div>

      <div className="card grid gap-4 p-4">
        <div className="section-title mb-0">
          <div>
            <h3>Історія замовлень</h3>
            <p className="text-muted">Статуси, повторне оформлення та завантаження чеків.</p>
          </div>
          <button className="button ghost">Експорт CSV</button>
        </div>

        {reorderMessage && <div className="rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm">{reorderMessage}</div>}

        <div className="grid gap-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-lg border border-border bg-surface p-4">
              <div className="flex flex-wrap items-center gap-3 justify-between">
                <div>
                  <p className="text-sm text-muted">Замовлення {order.id}</p>
                  <p className="font-semibold">{order.date}</p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`badge ${statusBadge[order.status]} border`}>{statusLabel[order.status]}</span>
                  <span className="font-semibold">{formatPrice(order.total)}</span>
                </div>
              </div>

              <div className="mt-3 grid gap-2 text-sm text-muted md:grid-cols-2">
                <p>Доставка: {order.delivery}</p>
                <p>Оплата: {order.payment}</p>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {order.items.map((item) => (
                  <span key={`${order.id}-${item.name}`} className="badge ghost">
                    {item.name} × {item.quantity}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                <button className="button ghost">Відстежити статус</button>
                <button className="button ghost" onClick={() => handleReorder(order.id)}>
                  Повторити замовлення
                </button>
                <button className="button ghost">Завантажити чек</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="card grid gap-3 p-4">
          <div className="section-title mb-0">
            <div>
              <h3>Адреси та доставка</h3>
              <p className="text-muted">Керуйте адресами самовивозу або курʼєрської доставки.</p>
            </div>
            <button className="button ghost">Додати адресу</button>
          </div>

          <div className="grid gap-3">
            {addresses.map((address) => (
              <div key={address.id} className="rounded-lg border border-border bg-surface p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="grid gap-1">
                    <p className="font-semibold">{address.label}</p>
                    <p className="text-sm text-muted">{address.recipient} • {address.phone}</p>
                    <p className="text-sm">{address.details}</p>
                    {address.notes && <p className="text-xs text-muted">{address.notes}</p>}
                  </div>
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="radio"
                      name="default-address"
                      className="h-4 w-4 text-primary"
                      checked={defaultAddressId === address.id}
                      onChange={() => setDefaultAddressId(address.id)}
                    />
                    За замовчуванням
                  </label>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-sm">
                  <button className="button ghost">Редагувати</button>
                  <button className="button ghost">Історія доставки</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card grid gap-3 p-4">
          <div className="section-title mb-0">
            <div>
              <h3>Методи оплати</h3>
              <p className="text-muted">Збережені картки, Apple Pay або оплата готівкою.</p>
            </div>
            <button className="button ghost">Додати метод</button>
          </div>

          <div className="grid gap-3">
            {paymentMethods.map((method) => (
              <div key={method.id} className="flex items-start justify-between gap-2 rounded-lg border border-border bg-surface p-3">
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold">{method.label}</p>
                    <span className="badge ghost text-xs capitalize">{method.type}</span>
                  </div>
                  <p className="text-sm">{method.details}</p>
                  {method.expires && <p className="text-xs text-muted">Діє до {method.expires}</p>}
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="default-payment"
                    className="h-4 w-4 text-primary"
                    checked={defaultPaymentId === method.id}
                    onChange={() => setDefaultPaymentId(method.id)}
                  />
                  За замовчуванням
                </label>
              </div>
            ))}
          </div>

          <div className="rounded-lg border border-dashed border-border bg-surface p-3 text-sm text-muted">
            Токени карток та активний метод оплати будуть збережені після інтеграції з платіжним шлюзом.
          </div>
        </div>
      </div>

      <div className="card grid gap-4 p-4">
        <div className="section-title mb-0">
          <div>
            <h3>Улюблені товари</h3>
            <p className="text-muted">Зберігайте товари, щоб оформити замовлення пізніше.</p>
          </div>
          <button className="button ghost">Очистити список</button>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {favoriteItems.map((item) => (
            <div key={item.id} className="rounded-lg border border-border bg-surface p-3">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold leading-tight">{item.name}</p>
                <span
                  className={`badge ${
                    item.status === 'in-stock'
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                      : 'bg-amber-100 text-amber-800 border-amber-200'
                  } border`}
                >
                  {item.status === 'in-stock' ? 'В наявності' : 'Передзамовлення'}
                </span>
              </div>
              <p className="mt-1 text-lg font-semibold">{formatPrice(item.price)}</p>
              {item.note && <p className="text-sm text-muted">{item.note}</p>}
              <div className="mt-3 flex flex-wrap gap-2 text-sm">
                <button className="button ghost">Додати в кошик</button>
                <button className="button ghost">Видалити</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
