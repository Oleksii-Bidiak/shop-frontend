import { AdminOrdersTable } from '@/features/product-list/ui/admin-orders-table';

export const AdminOrdersPage = () => {
  return (
    <div className="card">
      <div className="section-title">
        <h1>Замовлення</h1>
        <a href="#">Вигрузити звіт</a>
      </div>
      <AdminOrdersTable />
    </div>
  );
};
