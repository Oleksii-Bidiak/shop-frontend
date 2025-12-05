export const CheckoutPage = () => {
  return (
    <div className="card" style={{ display: 'grid', gap: '1.25rem' }}>
      <div className="section-title">
        <div>
          <p className="badge">Оформлення</p>
          <h1 style={{ margin: 0 }}>Оплата та доставка</h1>
          <p style={{ color: 'var(--color-muted)', margin: '0.25rem 0' }}>
            Місце для інтеграції платіжного провайдера, адресної форми й перевірки кошика перед оплатою.
          </p>
        </div>
        <span className="badge">soon</span>
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
        <p style={{ margin: 0 }}>Додайте інтеграцію з платіжним провайдером після підʼєднання бекенду.</p>
        <p style={{ margin: 0, color: 'var(--color-muted)' }}>
          Каркас передбачає окремі віджети для адрес, способів доставки та методів оплати.
        </p>
      </div>
    </div>
  );
};
