export const AccountPage = () => {
  return (
    <div className="grid gap-4">
      <div className="section-title">
        <div>
          <p className="badge">Акаунт</p>
          <h1>Профіль покупця</h1>
          <p className="mt-1 text-muted">
            Тут будуть налаштування профілю, історія замовлень, адреси доставки та методи оплати.
          </p>
        </div>
        <span className="badge">MVP</span>
      </div>

      <div className="card grid gap-3">
        <h3>Безпека</h3>
        <p>Додайте двофакторку та керування сесіями після підключення бекенду.</p>
      </div>

      <div className="card grid gap-3">
        <h3>Замовлення</h3>
        <p>Після інтеграції з API тут відображатиметься трекінг статусів та повторне оформлення замовлень.</p>
      </div>
    </div>
  );
};
