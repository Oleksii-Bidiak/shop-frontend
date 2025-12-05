import { SiteFooter } from '@/widgets/layout/site-footer';
import { SiteHeader } from '@/widgets/layout/site-header';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <SiteHeader />
      <div className="container pb-12 pt-8">{children}</div>
      <SiteFooter />
    </div>
  );
}
