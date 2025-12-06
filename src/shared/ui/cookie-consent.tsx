'use client';

interface CookieConsentProps {
  visible: boolean;
  onAccept: () => void;
  onDecline: () => void;
}

export function CookieConsent({ visible, onAccept, onDecline }: CookieConsentProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-md rounded-lg border border-border bg-surface p-4 shadow-lg">
      <div className="flex flex-col gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold">Файли cookie для аналітики</p>
          <p className="text-sm text-muted">
            Ми використовуємо Google Analytics та Meta Pixel для вимірювання трафіку та ефективності кампаній. Оберіть, чи можна
            завантажувати трекінг-скрипти.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button className="button" type="button" onClick={onAccept}>
            Дозволити аналітику
          </button>
          <button className="button ghost" type="button" onClick={onDecline}>
            Відхилити
          </button>
        </div>
      </div>
    </div>
  );
}
