import { SiteFooter } from '@/widgets/layout/site-footer';
import { SiteHeader } from '@/widgets/layout/site-header';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <div className="container" style={{ padding: '2rem 0 3rem' }}>
        {children}
      </div>
      <SiteFooter />
    </div>
  );
}
