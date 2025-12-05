import Link from 'next/link';
import { appConfig } from '@/shared/config/app';

export const SiteHeader = () => {
  return (
    <header className="header">
      <div className="container navbar">
        <Link href="/">
          <strong>{appConfig.projectName}</strong>
        </Link>
        <nav className="nav-links">
          <Link href="/">Каталог</Link>
          <Link href="/">Про нас</Link>
          <Link href="/">Доставка</Link>
          <Link href="/admin">Адмінка</Link>
        </nav>
      </div>
    </header>
  );
};
