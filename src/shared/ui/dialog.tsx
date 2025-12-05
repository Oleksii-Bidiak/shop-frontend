'use client';

import { PropsWithChildren, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface DialogProps {
  open: boolean;
  title?: string;
  description?: string;
  onClose?: () => void;
  footer?: ReactNode;
}

export function Dialog({ open, title, description, onClose, footer, children }: PropsWithChildren<DialogProps>) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;
  const content = (
    <div className="ds-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="ds-dialog" onClick={(event) => event.stopPropagation()}>
        {title && <h3>{title}</h3>}
        {description && <p className="text-muted">{description}</p>}
        <div>{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
  return createPortal(content, document.body);
}

interface DrawerProps extends DialogProps {}

export function Drawer(props: PropsWithChildren<DrawerProps>) {
  const { open, onClose, title, description, footer, children } = props;

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;
  const content = (
    <div className="ds-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="ds-drawer" onClick={(event) => event.stopPropagation()}>
        {title && <h3>{title}</h3>}
        {description && <p className="text-muted">{description}</p>}
        <div>{children}</div>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );

  return createPortal(content, document.body);
}
