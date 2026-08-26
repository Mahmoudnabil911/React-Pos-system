import { useAppStore } from '../../store/useAppStore';

export default function ToastContainer() {
  const { toasts, removeToast } = useAppStore();

  const icons: Record<string, string> = {
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    warning: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  };

  const colors: Record<string, string> = {
    success: 'rgb(var(--accent-success))',
    error: 'rgb(var(--accent-danger))',
    warning: 'rgb(var(--accent-warning))',
    info: 'rgb(var(--accent-info))',
  };

  const bgColors: Record<string, string> = {
    success: 'rgb(var(--accent-success-light))',
    error: 'rgb(var(--accent-danger-light))',
    warning: 'rgb(var(--accent-warning-light))',
    info: 'rgb(var(--accent-info-light))',
  };

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="animate-fade-in-up"
          style={{
            display: 'flex', alignItems: 'flex-start', gap: '0.75rem',
            padding: '0.875rem 1rem',
            background: 'rgb(var(--bg-card))',
            border: `1px solid ${bgColors[toast.type]}`,
            borderRadius: '0.875rem',
            boxShadow: 'var(--shadow-xl)',
            maxWidth: '360px',
            minWidth: '280px',
          }}
        >
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%', flexShrink: 0,
            background: bgColors[toast.type],
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg style={{ width: '16px', height: '16px', color: colors[toast.type] }}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d={icons[toast.type]} />
            </svg>
          </div>
          <p style={{ margin: 0, flex: 1, fontSize: '0.875rem', color: 'rgb(var(--text-primary))', lineHeight: 1.5 }}>
            {toast.message}
          </p>
          <button
            onClick={() => removeToast(toast.id)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'rgb(var(--text-tertiary))', padding: '0.125rem',
              display: 'flex', alignItems: 'center',
            }}
          >
            <svg style={{ width: '14px', height: '14px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}
