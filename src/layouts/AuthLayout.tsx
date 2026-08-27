import { Outlet } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { useTranslation } from 'react-i18next';

export default function AuthLayout() {
  const { theme, toggleTheme, locale, setLocale } = useAppStore();
  const { t } = useTranslation();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'rgb(var(--bg-primary))' }}>
      {/* Header */}
      <header className="auth-header" style={{
        height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem',
        background: 'rgb(var(--bg-card))',
        borderBottom: '1px solid rgb(var(--border-primary))',
        zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'var(--gradient-primary)', borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
             <svg style={{ width: '18px', height: '18px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{t('sidebar.brand')}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            display: 'flex', alignItems: 'center', background: 'rgb(var(--bg-secondary))',
            borderRadius: '999px', padding: '0.25rem', border: '1px solid rgb(var(--border-primary))'
          }}>
            <button onClick={() => setLocale('en')} style={{
              padding: '0.25rem 0.75rem', borderRadius: '999px', border: 'none',
              background: locale === 'en' ? 'rgb(var(--accent-primary))' : 'transparent',
              color: locale === 'en' ? 'white' : 'rgb(var(--text-secondary))',
              fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
            }}>EN</button>
            <button onClick={() => setLocale('ar')} style={{
              padding: '0.25rem 0.75rem', borderRadius: '999px', border: 'none',
              background: locale === 'ar' ? 'rgb(var(--accent-primary))' : 'transparent',
              color: locale === 'ar' ? 'white' : 'rgb(var(--text-secondary))',
              fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s'
            }}>عربي</button>
          </div>
          <button onClick={toggleTheme} style={{
             width: '36px', height: '36px', borderRadius: '50%',
             background: 'rgb(var(--bg-secondary))', border: '1px solid rgb(var(--border-primary))',
             display: 'flex', alignItems: 'center', justifyContent: 'center',
             cursor: 'pointer', color: 'rgb(var(--text-secondary))'
          }}>
            {theme === 'light' ? (
              <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
            ) : (
              <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        {/* Left Pane (Hidden on mobile) */}
        <div className="auth-hero-pane" style={{
          flex: 1,
          background: 'var(--gradient-primary)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '4rem',
          color: 'white'
        }}>
          {/* Decorative circles */}
          <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
          
          <div style={{ maxWidth: '480px', zIndex: 1, margin: '0 auto' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '1rem',
              border: '2px solid rgba(255,255,255,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '2rem'
            }}>
              <svg style={{ width: '28px', height: '28px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.5rem' }}>
              {t('authLayout.brandTitle')}<br />{t('authLayout.brandAccent')}
            </h1>
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', marginBottom: '2.5rem', lineHeight: 1.6 }}>
              {t('authLayout.brandSub')}
            </p>

            <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 3rem 0', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                t('authLayout.features.realtime'),
                t('authLayout.features.multilang'),
                t('authLayout.features.pos'),
                t('authLayout.features.analytics')
              ].map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.9)' }}>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  {item}
                </li>
              ))}
            </ul>

            <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.1)', marginBottom: '2rem' }} />

            <div style={{ display: 'flex', gap: '3rem' }}>
              {[
                { val: '99.9%', label: t('authLayout.stats.uptime') },
                { val: '50K+', label: t('authLayout.stats.products') },
                { val: '24/7', label: t('authLayout.stats.support') }
              ].map(stat => (
                <div key={stat.label}>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{stat.val}</div>
                  <div style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)', marginTop: '0.25rem' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane */}
        <div className="auth-right-pane" style={{ flex: 1, display: 'flex', padding: '2rem', overflowY: 'auto' }}>
          <div style={{ width: '100%', maxWidth: '420px', margin: 'auto' }}>
            <Outlet />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .auth-hero-pane { display: none !important; }
        }
        @media (max-width: 640px) {
          .auth-header { padding: 0 1rem !important; }
          .auth-right-pane { padding: 1rem !important; }
        }
      `}</style>
    </div>
  );
}
