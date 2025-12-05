import Link from 'next/link';
import '@/app/globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-screen grid-cols-[260px_1fr]">
      <aside className="bg-contrast p-6 text-contrast-foreground">
        <h2 className="m-0">Адмінка</h2>
        <nav className="grid gap-2">
          <Link className="text-contrast-foreground" href="/admin">
            Дашборд
          </Link>
          <Link className="text-contrast-foreground" href="/admin#products">
            Товари та SKU
          </Link>
          <Link className="text-contrast-foreground" href="/admin#categories">
            Категорії та теги
          </Link>
          <Link className="text-contrast-foreground" href="/admin#promos">
            Акції й промокоди
          </Link>
          <Link className="text-contrast-foreground" href="/admin#orders">
            Замовлення
          </Link>
          <Link className="text-contrast-foreground" href="/admin#users">
            Користувачі та ролі
          </Link>
          <Link className="text-contrast-foreground" href="/admin#reviews">
            Відгуки та модерація
          </Link>
          <Link className="text-contrast-foreground" href="/admin#banners">
            Банери
          </Link>
        </nav>
      </aside>
      <section className="bg-surface p-8">{children}</section>
    </div>
  );
}
