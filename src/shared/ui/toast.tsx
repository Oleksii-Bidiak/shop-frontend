'use client';

import { createContext, ReactNode, useContext, useMemo, useState } from 'react';

export type ToastTone = 'default' | 'success' | 'warning' | 'error';

export interface ToastPayload {
  id: string;
  title: string;
  description?: string;
  tone?: ToastTone;
}

interface ToastContextValue {
  notify: (toast: Omit<ToastPayload, 'id'>) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastPayload[]>([]);

  const notify = (toast: Omit<ToastPayload, 'id'>) => {
    const id = crypto.randomUUID();
    const tone = toast.tone ?? 'default';
    setToasts((prev) => [...prev, { ...toast, id, tone }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id));
    }, 3500);
  };

  const value = useMemo(() => ({ notify }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastStack toasts={toasts} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}

function ToastStack({ toasts }: { toasts: ToastPayload[] }) {
  return (
    <div className="ds-toast-stack" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`ds-toast ${toast.tone !== 'default' ? toast.tone : ''}`}>
          <p className="title">{toast.title}</p>
          {toast.description && <p className="description">{toast.description}</p>}
        </div>
      ))}
    </div>
  );
}
