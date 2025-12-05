export const CheckoutPage = () => {
  return (
    <div className="card grid gap-5">
      <div className="section-title">
        <div>
          <p className="badge">Оформлення</p>
          <h1>Оплата та доставка</h1>
          <p className="mt-1 text-muted">
            Місце для інтеграції платіжного провайдера, адресної форми й перевірки кошика перед оплатою.
          </p>
        </div>
        <span className="badge">soon</span>
      </div>

      <div className="grid gap-3 rounded-lg border border-dashed border-border bg-surface p-4">
        <p>Додайте інтеграцію з платіжним провайдером після підʼєднання бекенду.</p>
        <p className="text-muted">Каркас передбачає окремі віджети для адрес, способів доставки та методів оплати.</p>
      </div>

      <div className="card grid gap-3">
        <div className="section-title mb-0">
          <h3>Ключові кроки чекауту</h3>
          <span className="badge">scope</span>
        </div>
        <ul className="grid gap-3 md:grid-cols-2">
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Кроки доставки та оплати</strong>
              <p className="text-muted">Покрокові форми з контактами, адресою, вибором способу доставки й оплати.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Платіжні шлюзи</strong>
              <p className="text-muted">Інтеграція з провайдерами на кшталт Stripe/WayForPay з хендлінгом 3DS.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Валідація форм</strong>
              <p className="text-muted">Перевірка адреси, контактів, складу й блокування кнопки оплати до готовності.</p>
            </div>
          </li>
          <li className="flex gap-3 rounded-lg border border-dashed border-border bg-surface p-3">
            <span className="mt-1 block h-2 w-2 rounded-full bg-accent" aria-hidden />
            <div>
              <strong>Статус замовлення</strong>
              <p className="text-muted">Рендерінг результату оплати, pending/failed стани та трекінг.</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
