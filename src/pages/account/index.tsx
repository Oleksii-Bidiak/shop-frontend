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

      <div className="card grid gap-3">
        <div className="section-title mb-0">
          <h3>Функціональність акаунта</h3>
          <span className="badge">scope</span>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Історія замовлень</strong>
              <p className="text-muted">Трекінг статусів, повторне замовлення та завантаження чеків.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Адреси</strong>
              <p className="text-muted">Список адрес доставки й самовивозу з міткою за замовчуванням.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Платіжні методи</strong>
              <p className="text-muted">Збереження токенів карток/Apple Pay та керування дефолтним методом.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Повернення</strong>
              <p className="text-muted">Рекламаторія, статус RMA та перевипуск чеків після повернення.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Обране</strong>
              <p className="text-muted">Список фаворитів із синхронізацією між пристроями та CTA у каталозі.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
