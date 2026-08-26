import { useState, useEffect } from 'react';
import PageHeader from '../../../components/shared/PageHeader';
import { MOCK_NOTIFICATIONS } from '../../../utils/mockData';
import { useTranslation } from 'react-i18next';

type NotifType = typeof MOCK_NOTIFICATIONS[0]['type'];

function notifColors(type: NotifType) {
  const map: Record<NotifType, { bg: string; color: string; icon: string }> = {
    success: { bg: 'rgb(var(--accent-success-light))', color: 'rgb(var(--accent-success))', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    warning: { bg: 'rgb(var(--accent-warning-light))', color: 'rgb(var(--accent-warning))', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' },
    error: { bg: 'rgb(var(--accent-danger-light))', color: 'rgb(var(--accent-danger))', icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z' },
    info: { bg: 'rgb(var(--accent-info-light))', color: 'rgb(var(--accent-info))', icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  };
  return map[type];
}

export default function Notifications() {
  const { t } = useTranslation();
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { setTimeout(() => setIsLoading(false), 400); }, []);

  const markAllRead = () => setNotifs((prev) => prev.map((n) => ({ ...n, read: true })));
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div>
      <PageHeader
        title={t('nav.notifications')} subtitle={t('notifications.unreadCount', { count: unreadCount })}
        breadcrumbs={[{ label: t('nav.dashboard'), route: '/dashboard' }, { label: t('nav.notifications') }]}
      >
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgb(var(--border-primary))', background: 'none', cursor: 'pointer', fontSize: '0.875rem', fontFamily: 'var(--font-sans)', color: 'rgb(var(--text-secondary))' }}>
            {t('notifications.markAllRead')}
          </button>
        )}
      </PageHeader>

      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', padding: '1.25rem', borderBottom: '1px solid rgb(var(--border-primary))' }}>
                  <div className="skeleton" style={{ width: '44px', height: '44px', borderRadius: '50%', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div className="skeleton" style={{ height: '14px', width: '40%', marginBottom: '0.5rem' }} />
                    <div className="skeleton" style={{ height: '12px', width: '70%' }} />
                  </div>
                </div>
              ))
            : notifs.map((notif, i) => {
                const c = notifColors(notif.type);
                return (
                  <div
                    key={notif.id}
                    onClick={() => setNotifs((prev) => prev.map((n) => n.id === notif.id ? { ...n, read: true } : n))}
                    style={{
                      display: 'flex', alignItems: 'flex-start', gap: '1rem', padding: '1.25rem',
                      borderBottom: i < notifs.length - 1 ? '1px solid rgb(var(--border-primary))' : 'none',
                      cursor: 'pointer', transition: 'background 0.1s',
                      background: notif.read ? 'none' : 'rgb(var(--accent-primary-light) / 0.3)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'rgb(var(--bg-hover))')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = notif.read ? 'none' : 'rgb(var(--accent-primary-light) / 0.3)')}
                  >
                    <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg style={{ width: '20px', height: '20px', color: c.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={c.icon} />
                      </svg>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                        <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: notif.read ? 500 : 700, color: 'rgb(var(--text-primary))' }}>{t(`notif.${notif.id}.title`, { defaultValue: notif.title })}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.75rem', color: 'rgb(var(--text-tertiary))' }}>{t(`notif.${notif.id}.time`, { defaultValue: notif.time })}</span>
                          {!notif.read && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'rgb(var(--accent-primary))', flexShrink: 0 }} />}
                        </div>
                      </div>
                      <p style={{ margin: 0, fontSize: '0.8125rem', color: 'rgb(var(--text-secondary))' }}>{t(`notif.${notif.id}.msg`, { defaultValue: notif.message })}</p>
                    </div>
                  </div>
                );
              })}
        </div>
      </div>
    </div>
  );
}
