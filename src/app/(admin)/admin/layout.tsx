import Link from 'next/link';
import '@/app/globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
      <aside style={{ background: '#0f172a', color: '#e2e8f0', padding: '1.5rem' }}>
        <h2 style={{ marginTop: 0 }}>Адмінка</h2>
        <nav style={{ display: 'grid', gap: '0.5rem' }}>
          <Link href="/admin" style={{ color: '#e2e8f0' }}>
            Дашборд
          </Link>
          <Link href="/admin/products" style={{ color: '#e2e8f0' }}>
            Каталог
          </Link>
          <Link href="/admin/orders" style={{ color: '#e2e8f0' }}>
            Замовлення
          </Link>
        </nav>
      </aside>
      <section style={{ padding: '2rem', background: 'var(--color-surface)' }}>{children}</section>
    </div>
  );
}
