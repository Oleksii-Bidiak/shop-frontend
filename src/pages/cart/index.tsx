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
