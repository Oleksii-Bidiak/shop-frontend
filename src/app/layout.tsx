import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/shared/providers/app-providers';

export const metadata: Metadata = {
  title: 'Accessory Shop',
  description: 'Комерційний магазин аксесуарів з адмінкою та основним сайтом.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>
        <AppProviders>
          <main>{children}</main>
        </AppProviders>
      </body>
    </html>
  );
}
