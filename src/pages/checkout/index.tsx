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
    </div>
  );
};
