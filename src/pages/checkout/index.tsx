'use client';

import { useMemo, useState } from 'react';

import { useAppSelector } from '@/shared/store';

type Step = 'address' | 'shipping' | 'payment' | 'confirm';

const formatPrice = (value: number, currency: string) =>
  new Intl.NumberFormat('uk-UA', { style: 'currency', currency }).format(value);

export const CheckoutPage = () => {
  const cart = useAppSelector((state) => state.cart);
  const [step, setStep] = useState<Step>('address');
  const [gatewayStatus, setGatewayStatus] = useState<'idle' | 'processing' | 'failed' | 'success'>('idle');
  const [gatewayError, setGatewayError] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState<'courier' | 'pickup'>('courier');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cod' | 'applepay'>('card');
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    email: '',
    city: 'Київ',
    street: '',
    postal: '01001',
    comment: ''
  });
  const [pickupPoint, setPickupPoint] = useState('Київ, вул. Хрещатик, 10');

  const subtotal = useMemo(
    () => cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart.items]
  );
  const shipping = deliveryMethod === 'pickup' ? 0 : address.city === 'Львів' ? 140 : 120;
  const taxes = Math.round(subtotal * (address.city === 'Київ' ? 0.07 : 0.05));
  const total = subtotal + shipping + taxes;

  const goTo = (next: Step) => setStep(next);

  const handleAddressSubmit = () => {
    if (!address.fullName || !address.phone || !address.street) return;
    goTo('shipping');
  };

  const handleShippingSubmit = () => {
    goTo('payment');
  };

  const handlePayment = () => {
    setGatewayStatus('processing');
    setGatewayError('');

    setTimeout(() => {
      if (paymentMethod === 'card') {
        setGatewayStatus('success');
        goTo('confirm');
      } else if (paymentMethod === 'applepay') {
        setGatewayStatus('failed');
        setGatewayError('Платіжний шлюз тимчасово недоступний. Спробуйте інший метод.');
      } else {
        setGatewayStatus('success');
        goTo('confirm');
      }
    }, 600);
  };

  const steps: { id: Step; label: string; number: number }[] = [
    { id: 'address', label: 'Адреса', number: 1 },
    { id: 'shipping', label: 'Доставка', number: 2 },
    { id: 'payment', label: 'Оплата', number: 3 },
    { id: 'confirm', label: 'Підтвердження', number: 4 }
  ];

  const currentStep = steps.find((item) => item.id === step);
  const stepNumber = currentStep?.number ?? 1;

  return (
    <div className="card grid gap-5">
      <div className="section-title">
        <div>
          <p className="badge">Оформлення</p>
          <h1>Оплата та доставка</h1>
          <p className="mt-1 text-muted">
            Покроковий чекаут із адресою, вибором доставки чи самовивозу, оплати через шлюз та фінальним підтвердженням.
          </p>
        </div>
        <span className="badge">Крок {stepNumber} / 4</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[2fr_1fr]">
        <section className="card grid gap-4 p-4">
          <div className="flex flex-wrap items-center gap-2 text-sm">
            {steps.map(({ id, label, number }) => {
              const isActive = step === id;
              const isDone = stepNumber > number;

              return (
                <div
                  key={id}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1 ${
                    isActive ? 'border-primary bg-surface' : 'border-border bg-muted/10'
                  }`}
                >
                  <span className={`badge ghost ${isActive || isDone ? 'bg-primary/10 text-primary' : ''}`}>{number}</span>
                  <span className="font-medium">{label}</span>
                </div>
              );
            })}
          </div>

          {step === 'address' && (
            <div className="grid gap-3">
              <div className="grid gap-1">
                <label className="text-sm text-muted">ПІБ</label>
                <input
                  className="rounded-lg border border-border bg-surface px-3 py-2"
                  value={address.fullName}
                  onChange={(event) => setAddress({ ...address, fullName: event.target.value })}
                  placeholder="Олена Петренко"
                />
              </div>
              <div className="grid gap-1 md:grid-cols-2 md:gap-3">
                <label className="grid gap-1 text-sm">
                  <span className="text-muted">Телефон</span>
                  <input
                    className="rounded-lg border border-border bg-surface px-3 py-2"
                    value={address.phone}
                    onChange={(event) => setAddress({ ...address, phone: event.target.value })}
                    placeholder="+380XXYYYZZZZ"
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-muted">Email</span>
                  <input
                    className="rounded-lg border border-border bg-surface px-3 py-2"
                    value={address.email}
                    onChange={(event) => setAddress({ ...address, email: event.target.value })}
                    placeholder="you@example.com"
                  />
                </label>
              </div>
              <div className="grid gap-1 md:grid-cols-3 md:gap-3">
                <label className="grid gap-1 text-sm md:col-span-1">
                  <span className="text-muted">Місто</span>
                  <input
                    className="rounded-lg border border-border bg-surface px-3 py-2"
                    value={address.city}
                    onChange={(event) => setAddress({ ...address, city: event.target.value })}
                  />
                </label>
                <label className="grid gap-1 text-sm md:col-span-2">
                  <span className="text-muted">Вулиця та будинок</span>
                  <input
                    className="rounded-lg border border-border bg-surface px-3 py-2"
                    value={address.street}
                    onChange={(event) => setAddress({ ...address, street: event.target.value })}
                    placeholder="вул. Іоанна Павла II, 12"
                  />
                </label>
              </div>
              <div className="grid gap-1 md:grid-cols-2 md:gap-3">
                <label className="grid gap-1 text-sm">
                  <span className="text-muted">Поштовий індекс</span>
                  <input
                    className="rounded-lg border border-border bg-surface px-3 py-2"
                    value={address.postal}
                    onChange={(event) => setAddress({ ...address, postal: event.target.value })}
                  />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-muted">Коментар до доставки</span>
                  <input
                    className="rounded-lg border border-border bg-surface px-3 py-2"
                    value={address.comment}
                    onChange={(event) => setAddress({ ...address, comment: event.target.value })}
                    placeholder="Підійти після дзвінка"
                  />
                </label>
              </div>
              <div className="flex justify-between">
                <p className="text-sm text-muted">Збережемо адресу для повторних замовлень.</p>
                <button className="button" onClick={handleAddressSubmit}>
                  До доставки
                </button>
              </div>
            </div>
          )}

          {step === 'shipping' && (
            <div className="grid gap-3">
              <p className="text-muted">Обирайте доставку курʼєром або самовивіз із точки видачі.</p>
              <div className="flex gap-2">
                <button
                  className={`button ghost ${deliveryMethod === 'courier' ? 'border-primary text-primary' : ''}`}
                  onClick={() => setDeliveryMethod('courier')}
                >
                  Курʼєр
                </button>
                <button
                  className={`button ghost ${deliveryMethod === 'pickup' ? 'border-primary text-primary' : ''}`}
                  onClick={() => setDeliveryMethod('pickup')}
                >
                  Самовивіз
                </button>
              </div>

              {deliveryMethod === 'pickup' ? (
                <label className="grid gap-1 text-sm">
                  <span className="text-muted">Пункт самовивозу</span>
                  <select
                    className="rounded-lg border border-border bg-surface px-3 py-2"
                    value={pickupPoint}
                    onChange={(event) => setPickupPoint(event.target.value)}
                  >
                    <option>Київ, вул. Хрещатик, 10</option>
                    <option>Львів, пр-т Свободи, 5</option>
                    <option>Одеса, вул. Пушкінська, 20</option>
                  </select>
                </label>
              ) : (
                <p className="rounded-lg border border-dashed border-border bg-surface px-3 py-2 text-sm text-muted">
                  Курʼєр доставить замовлення за адресою: {address.street || 'адреса ще не вказана'}, {address.city}.
                </p>
              )}

              <div className="flex justify-between">
                <button className="button ghost" onClick={() => goTo('address')}>
                  Назад
                </button>
                <button className="button" onClick={handleShippingSubmit}>
                  До оплати
                </button>
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="grid gap-3">
              <p className="text-muted">Підтримуємо онлайн-оплату та післяплату. У разі збою шлюзу показуємо fallback.</p>
              <div className="grid gap-2">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <span>Банківська карта (WayForPay/Stripe)</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'applepay'}
                    onChange={() => setPaymentMethod('applepay')}
                  />
                  <span>Apple Pay / Google Pay</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <span>Оплата при отриманні</span>
                </label>
              </div>
              {gatewayError && <p className="rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-900">{gatewayError}</p>}
              <div className="flex justify-between">
                <button className="button ghost" onClick={() => goTo('shipping')}>
                  Назад
                </button>
                <button className="button" onClick={handlePayment} disabled={gatewayStatus === 'processing'}>
                  {gatewayStatus === 'processing' ? 'Обробка…' : 'Оплатити / підтвердити'}
                </button>
              </div>
              {gatewayStatus === 'failed' && (
                <p className="text-sm text-muted">
                  Якщо платіжний шлюз недоступний, ми зберігаємо замовлення та пропонуємо безготівковий рахунок або оплату
                  при отриманні.
                </p>
              )}
            </div>
          )}

          {step === 'confirm' && (
            <div className="grid gap-3 rounded-lg border border-success bg-green-50 px-3 py-2 text-sm text-green-900">
              <p className="font-semibold">Замовлення підтверджено.</p>
              <p>
                Деталі доставки: {deliveryMethod === 'pickup' ? pickupPoint : `${address.street}, ${address.city}`}. Ми
                продублюємо інформацію на {address.email || 'вказану пошту'}.
              </p>
              <p>Сума до сплати: {formatPrice(total, cart.currency)}.</p>
              <div className="flex gap-2">
                <button className="button" onClick={() => goTo('address')}>
                  Почати новий чекаут
                </button>
                <button className="button ghost" onClick={() => setGatewayStatus('idle')}>
                  Залишитися на сторінці
                </button>
              </div>
            </div>
          )}
        </section>

        <aside className="card grid gap-3 p-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Товари ({cart.items.length})</span>
            <span>{formatPrice(subtotal, cart.currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Доставка</span>
            <span>{shipping === 0 ? 'Безкоштовно' : formatPrice(shipping, cart.currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">Податки</span>
            <span>{formatPrice(taxes, cart.currency)}</span>
          </div>
          <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
            <span>Разом</span>
            <span>{formatPrice(total, cart.currency)}</span>
          </div>
          <p className="text-muted text-xs">
            Перед оплатою повторно зчитуємо кошик. Якщо бекенд недоступний, показуємо локальні дані та пропонуємо оплату
            при отриманні.
          </p>
        </aside>
      </div>
    </div>
  );
};
