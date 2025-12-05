import Link from 'next/link';

export const CartPage = () => {
  return (
    <div className="card grid gap-4">
      <div className="section-title">
        <div>
          <p className="badge">Кошик</p>
          <h1>Ваші товари</h1>
          <p className="mt-1 text-muted">
            Інтегрується з шаром cart у FSD. Тут будуть лінійки товарів, підсумки, промокоди та валідації складу.
          </p>
        </div>
        <Link className="button ghost" href="/catalog">
          Продовжити покупки
        </Link>
      </div>

      <div className="grid gap-3 rounded-lg border border-dashed border-border bg-surface p-4">
        <p>Кошик порожній. Додайте щось із каталогу, щоб побачити підсумок.</p>
        <small className="text-muted">
          В майбутньому тут зʼявляться проміжні стани, зміна кількості та рекомендуемі аксесуари.
        </small>
      </div>

      <div className="card grid gap-3">
        <div className="section-title mb-0">
          <h3>Що має підтримувати кошик</h3>
          <span className="badge">scope</span>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Збереження стану</strong>
              <p className="text-muted">localStorage для анонімних сесій і синхронізація після логіну.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Промокоди</strong>
              <p className="text-muted">Введення кодів знижок із валідацією та повторним перерахунком підсумків.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Доставка та самовивіз</strong>
              <p className="text-muted">Опції доставки/пікапу з розрахунком вартості за адресою чи відділенням.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Податки і доставка</strong>
              <p className="text-muted">Динамічний розрахунок податків та доставки перед переходом на оплату.</p>
            </div>
          </li>
        </ul>
      </div>

      <div className="section-title items-center">
        <div>
          <h3>Підсумок</h3>
          <p className="mt-1 text-muted">Оплата і доставка на наступному кроці.</p>
        </div>
        <Link className="button" href="/checkout">
          Перейти до оплати
        </Link>
      </div>
    </div>
  );
};
