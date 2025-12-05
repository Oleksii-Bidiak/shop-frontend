export const AccountPage = () => {
  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div className="section-title">
        <div>
          <p className="badge">Акаунт</p>
          <h1 style={{ margin: 0 }}>Профіль покупця</h1>
          <p style={{ margin: '0.25rem 0', color: 'var(--color-muted)' }}>
            Тут будуть налаштування профілю, історія замовлень, адреси доставки та методи оплати.
          </p>
        </div>
        <span className="badge">MVP</span>
      </div>

      <div className="card" style={{ display: 'grid', gap: '0.75rem' }}>
        <h3 style={{ margin: 0 }}>Безпека</h3>
        <p style={{ margin: 0 }}>Додайте двофакторку та керування сесіями після підключення бекенду.</p>
      </div>

      <div className="card" style={{ display: 'grid', gap: '0.75rem' }}>
        <h3 style={{ margin: 0 }}>Замовлення</h3>
        <p style={{ margin: 0 }}>
          Після інтеграції з API тут відображатиметься трекінг статусів та повторне оформлення замовлень.
        </p>
      </div>
    </div>
  );
};
