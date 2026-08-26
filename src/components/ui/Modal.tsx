import { useEffect, useRef } from 'react';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  allowOverflow?: boolean;
}

export function Modal({ isOpen, onClose, title, children, footer, allowOverflow = false }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1rem', backgroundColor: 'rgba(0, 0, 0, 0.5)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="card animate-fade-in-up"
        style={{
          width: '100%', maxWidth: '500px', maxHeight: '90vh',
          display: 'flex', flexDirection: 'column',
          backgroundColor: 'rgb(var(--bg-primary))',
          borderRadius: '1rem', overflow: allowOverflow ? 'visible' : 'hidden',
          boxShadow: 'var(--shadow-xl)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{
          padding: '1.25rem', borderBottom: '1px solid rgb(var(--border-primary))',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <h2 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>
            {title}
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '0.25rem', color: 'rgb(var(--text-secondary))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div style={{ padding: '1.25rem', overflowY: allowOverflow ? 'visible' : 'auto', flex: 1 }}>
          {children}
        </div>

        {footer && (
          <div style={{
            padding: '1rem 1.25rem', borderTop: '1px solid rgb(var(--border-primary))',
            display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.75rem',
            backgroundColor: 'rgb(var(--bg-secondary))',
          }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
