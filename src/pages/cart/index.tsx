import Link from 'next/link';

export const CartPage = () => {
  return (
    <div className="card" style={{ display: 'grid', gap: '1rem' }}>
      <div className="section-title">
        <div>
          <p className="badge">Кошик</p>
          <h1 style={{ margin: 0 }}>Ваші товари</h1>
          <p style={{ color: 'var(--color-muted)', margin: '0.25rem 0' }}>
            Інтегрується з шаром cart у FSD. Тут будуть лінійки товарів, підсумки, промокоди та валідації складу.
          </p>
        </div>
        <Link className="button ghost" href="/catalog">
          Продовжити покупки
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gap: '0.75rem',
          padding: '1rem',
          border: '1px dashed var(--color-border)',
          borderRadius: '10px'
        }}
      >
        <p style={{ margin: 0 }}>Кошик порожній. Додайте щось із каталогу, щоб побачити підсумок.</p>
        <small style={{ color: 'var(--color-muted)' }}>
          В майбутньому тут зʼявляться проміжні стани, зміна кількості та рекомендуемі аксесуари.
        </small>
      </div>

      <div className="section-title" style={{ alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0 }}>Підсумок</h3>
          <p style={{ margin: '0.25rem 0', color: 'var(--color-muted)' }}>Оплата і доставка на наступному кроці.</p>
        </div>
        <Link className="button" href="/checkout">
          Перейти до оплати
        </Link>
      </div>
    </div>
  );
};
