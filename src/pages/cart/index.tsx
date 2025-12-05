'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';

import {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  setStatus
} from '@/features/cart/model/cart-slice';
import { useCartQuery } from '@/features/cart/api/queries';
import { useCartPersistence } from '@/features/cart/lib/use-cart-persistence';
import { useAppDispatch, useAppSelector } from '@/shared/store';

const PROMO_CODES = {
  SAVE10: { label: 'Знижка 10%', type: 'percent', amount: 0.1 },
  FREESHIP: { label: 'Безкоштовна доставка', type: 'shipping', amount: 0 },
  WELCOME100: { label: '-100 грн на замовлення', type: 'flat', amount: 100 }
} as const;

type PromoKey = keyof typeof PROMO_CODES;
type PromoConfig = (typeof PROMO_CODES)[PromoKey];

const formatPrice = (value: number, currency: string) =>
  new Intl.NumberFormat('uk-UA', { style: 'currency', currency }).format(value);

export const CartPage = () => {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoConfig | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');
  const [postalCode, setPostalCode] = useState('01001');
  const cartQuery = useCartQuery(true);

  useCartPersistence();

  const subtotal = useMemo(() => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0), [
    cart.items
  ]);

  const discount = useMemo(() => {
    if (!appliedPromo) return 0;

    if (appliedPromo.type === 'percent') return subtotal * appliedPromo.amount;
    if (appliedPromo.type === 'flat') return appliedPromo.amount;
    return 0;
  }, [appliedPromo, subtotal]);

  const shippingBase = useMemo(() => {
    if (deliveryMethod === 'pickup') return 0;
    return postalCode.startsWith('9') ? 160 : 120;
  }, [deliveryMethod, postalCode]);

  const shipping = appliedPromo?.type === 'shipping' ? 0 : shippingBase;
  const taxableAmount = Math.max(0, subtotal - discount);
  const taxRate = postalCode.startsWith('0') ? 0.07 : 0.05;
  const taxes = Math.round(taxableAmount * taxRate);
  const total = taxableAmount + shipping + taxes;

  const applyPromo = () => {
    const normalized = promoInput.trim().toUpperCase();

    if (!normalized) return;
    const promo = PROMO_CODES[normalized as PromoKey];

    if (promo) {
      setAppliedPromo(promo);
    } else {
      setAppliedPromo(null);
    }
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateQuantity({ productId, quantity }));
  };

  const handleRemove = (productId: string) => dispatch(removeItem(productId));

  const handleAddRandom = () => {
    dispatch(
      addItem({
        productId: 'accessory-demo',
        quantity: 1,
        price: 399,
        title: 'Аксесуар до кошика'
      })
    );
  };

  const statusBadge = cart.status === 'loading' ? 'Синхронізація…' : 'Кошик готовий';

  const showErrorFallback = cart.status === 'error';

  const handleRetry = () => {
    dispatch(setStatus('loading'));
    cartQuery.refetch();
  };

  return (
    <div className="card grid gap-4">
      <div className="section-title">
        <div>
          <p className="badge">Кошик</p>
          <h1>Ваші товари</h1>
          <p className="mt-1 text-muted">
            Підтримує локальне збереження, промокоди, розрахунок доставки й податків перед переходом до чекауту.
          </p>
        </div>
        <Link className="button ghost" href="/catalog">
          Продовжити покупки
        </Link>
      </div>

      <div className="flex items-center justify-between rounded-lg border border-border bg-surface px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="badge ghost">{statusBadge}</span>
          <span className="text-muted">
            Стан зберігається у localStorage. Якщо API недоступне, показуємо локальну копію.
          </span>
        </div>
        <button className="text-primary underline" onClick={handleAddRandom}>
          Додати тестовий товар
        </button>
      </div>

      {showErrorFallback && (
        <div className="rounded-lg border border-amber-500 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          <p className="font-medium">API кошика недоступне.</p>
          <p>
            Ми завантажили локальну копію збережену у браузері. Спробуйте повторити запит або продовжуйте з наявними
            даними.
          </p>
          <div className="mt-2 flex gap-2">
            <button className="button sm" onClick={handleRetry}>
              Повторити запит
            </button>
            <button className="button ghost sm" onClick={() => dispatch(clearCart())}>
              Очистити локально
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="card divide-y divide-border">
          {cart.items.length === 0 && (
            <div className="p-4 text-muted">Кошик порожній. Додайте товари, щоб побачити підсумок.</div>
          )}

          {cart.items.map((item) => (
            <div key={item.productId} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium">{item.title ?? 'Товар'}</p>
                <p className="text-muted text-sm">
                  {item.selectedOptions?.color ? `Колір: ${item.selectedOptions.color}` : 'Без опцій'}
                </p>
              </div>
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center">
                <div className="flex items-center gap-2 rounded-lg border border-border px-3 py-1">
                  <label className="text-sm text-muted" htmlFor={`qty-${item.productId}`}>
                    К-сть
                  </label>
                  <input
                    id={`qty-${item.productId}`}
                    className="w-16 rounded-md border border-border bg-surface px-2 py-1 text-right"
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(event) => handleQuantityChange(item.productId, Number(event.target.value))}
                  />
                </div>
                <p className="text-sm text-muted">{formatPrice(item.price, cart.currency)}</p>
                <strong>{formatPrice(item.price * item.quantity, cart.currency)}</strong>
                <button className="button ghost sm" onClick={() => handleRemove(item.productId)}>
                  Видалити
                </button>
              </div>
            </div>
          ))}
        </section>

        <aside className="card grid gap-4 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted text-sm">Доставка</p>
              <strong>Курʼєр чи самовивіз</strong>
            </div>
            <div className="flex gap-2 text-sm">
              <button
                className={`button ghost sm ${deliveryMethod === 'courier' ? 'border-primary text-primary' : ''}`}
                onClick={() => setDeliveryMethod('courier')}
              >
                Курʼєр
              </button>
              <button
                className={`button ghost sm ${deliveryMethod === 'pickup' ? 'border-primary text-primary' : ''}`}
                onClick={() => setDeliveryMethod('pickup')}
              >
                Самовивіз
              </button>
            </div>
          </div>

          <label className="grid gap-1 text-sm">
            <span className="text-muted">Поштовий індекс для розрахунку податків</span>
            <input
              value={postalCode}
              onChange={(event) => setPostalCode(event.target.value)}
              className="rounded-lg border border-border bg-surface px-3 py-2"
              placeholder="Наприклад, 01001"
            />
          </label>

          <div className="grid gap-2 rounded-lg border border-dashed border-border bg-surface p-3">
            <label className="grid gap-1 text-sm">
              <span className="text-muted">Промокод</span>
              <div className="flex gap-2">
                <input
                  className="flex-1 rounded-lg border border-border bg-surface px-3 py-2"
                  placeholder="SAVE10, FREESHIP…"
                  value={promoInput}
                  onChange={(event) => setPromoInput(event.target.value)}
                />
                <button className="button sm" onClick={applyPromo}>
                  Застосувати
                </button>
              </div>
            </label>
            {appliedPromo ? (
              <p className="text-sm text-green-700">{appliedPromo.label} застосовано.</p>
            ) : (
              <p className="text-sm text-muted">Підтримує відсоткові, фіксовані та безкоштовну доставку.</p>
            )}
          </div>

          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted">Проміжний підсумок</span>
              <span>{formatPrice(subtotal, cart.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Знижка</span>
              <span>-{formatPrice(discount, cart.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Доставка</span>
              <span>{shipping === 0 ? 'Безкоштовно' : formatPrice(shipping, cart.currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted">Податки ({(taxRate * 100).toFixed(0)}%)</span>
              <span>{formatPrice(taxes, cart.currency)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
              <span>Разом</span>
              <span>{formatPrice(total, cart.currency)}</span>
            </div>
          </div>

          <Link className="button" href="/checkout">
            Перейти до оплати
          </Link>
          <p className="text-xs text-muted">
            Перед оплатою ми повторно перевіримо склад та актуальні ціни. Якщо сервер тимчасово недоступний, дані з
            localStorage дають змогу не втратити прогрес.
          </p>
        </aside>
      </div>
    </div>
  );
};
