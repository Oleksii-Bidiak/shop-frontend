const mockOrders = [
  { id: 'INV-2045', status: 'Новий', customer: 'Ірина Коваль', total: 3250, items: 3 },
  { id: 'INV-2044', status: 'Оплачено', customer: 'Роман Литвин', total: 1899, items: 1 },
  { id: 'INV-2043', status: 'Відправлено', customer: 'Валерія Білик', total: 2480, items: 2 }
];

export const AdminOrdersTable = () => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Клієнт</th>
          <th>Статус</th>
          <th>Сума</th>
          <th>SKU</th>
        </tr>
      </thead>
      <tbody>
        {mockOrders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.customer}</td>
            <td>
              <span className="status-chip">{order.status}</span>
            </td>
            <td>{order.total.toLocaleString('uk-UA')} грн</td>
            <td>{order.items}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
