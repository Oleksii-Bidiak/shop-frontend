'use client';

import { ReactNode, useEffect, useMemo, useState } from 'react';
import Script from 'next/script';

import { appConfig } from '@/shared/config/app';
import { CookieConsent } from '@/shared/ui/cookie-consent';

type ConsentStatus = 'granted' | 'denied' | 'unset';

const CONSENT_STORAGE_KEY = 'shop.analytics-consent';

interface AnalyticsProviderProps {
  children: ReactNode;
}

export function AnalyticsProvider({ children }: AnalyticsProviderProps) {
  const [consent, setConsent] = useState<ConsentStatus>('unset');

  useEffect(() => {
    const storedConsent = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentStatus | null;
    if (storedConsent === 'granted' || storedConsent === 'denied') {
      setConsent(storedConsent);
    }
  }, []);

  const grantConsent = (value: boolean) => {
    const status: ConsentStatus = value ? 'granted' : 'denied';
    setConsent(status);
    window.localStorage.setItem(CONSENT_STORAGE_KEY, status);
  };

  const { gaMeasurementId, metaPixelId } = appConfig.analytics;
  const shouldLoadAnalytics = consent === 'granted';

  const metaPixelScript = useMemo(() => {
    if (!metaPixelId) return null;
    return `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?\n    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;\n    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);\n    t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)\n    }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');\n    fbq('init', '${metaPixelId}');\n    fbq('consent', 'grant');\n    fbq('track', 'PageView');`;
  }, [metaPixelId]);

  return (
    <>
      {children}
      <CookieConsent visible={consent === 'unset'} onAccept={() => grantConsent(true)} onDecline={() => grantConsent(false)} />

      {shouldLoadAnalytics && gaMeasurementId && (
        <>
          <Script
            id="ga-loader"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-inline" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} // eslint-disable-line
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', { anonymize_ip: true });
            `}
          </Script>
        </>
      )}

      {shouldLoadAnalytics && metaPixelId && metaPixelScript && (
        <>
          <Script id="meta-pixel" strategy="afterInteractive">
            {metaPixelScript}
          </Script>
          <noscript>
            <img
              alt="Facebook Pixel"
              height="1"
              width="1"
              style={{ display: 'none' }}
              src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
            />
          </noscript>
        </>
      )}
    </>
  );
}
