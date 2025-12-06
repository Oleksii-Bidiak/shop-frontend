import type { Metadata } from 'next';
import './globals.css';
import { AppProviders } from '@/shared/providers/app-providers';
import { appConfig } from '@/shared/config/app';

export const metadata: Metadata = {
  metadataBase: new URL(appConfig.siteUrl),
  title: 'Accessory Shop — аксесуари та гаджети',
  description: 'Комерційний магазин аксесуарів з каталогом, SSR/ISR та адмінкою.',
  keywords: ['аксесуари', 'чохли', 'зарядки', 'навушники', 'магазин аксесуарів'],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: appConfig.siteUrl,
    title: 'Accessory Shop — аксесуари та гаджети',
    description: 'Каталог аксесуарів із SSR/ISR, SEO-метаданими та готовністю до масштабування.',
    siteName: 'Accessory Shop',
    images: [
      {
        url: `${appConfig.siteUrl}/og-default.png`,
        width: 1200,
        height: 630,
        alt: 'Accessory Shop каталог'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Accessory Shop — аксесуари та гаджети',
    description: 'Публічний сайт і адмінка для магазину аксесуарів.',
    images: [`${appConfig.siteUrl}/og-default.png`]
  },
  robots: {
    index: true,
    follow: true
  }
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
