import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from 'react-i18next';

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

export default function Header() {
  const { theme, toggleTheme, locale, setLocale, currentUser, logout } = useAppStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const userRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const { openMobileSidebar: openSidebar } = useAppStore();

  // Click outside
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (userRef.current && !userRef.current.contains(e.target as Node)) setUserMenuOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangMenuOpen(false);
    }
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = () => {
    setUserMenuOpen(false);
    logout();
    navigate('/auth/login');
  };

  return (
    <header style={{
      height: 'var(--header-height)',
      background: 'rgb(var(--bg-card))',
      borderBottom: '1px solid rgb(var(--border-primary))',
      display: 'flex',
      alignItems: 'center',
      padding: '0 1.5rem',
      gap: '0.75rem',
      position: 'sticky',
      top: 0,
      zIndex: 20,
      boxShadow: 'var(--shadow-xs)',
    }}>
      {/* Mobile menu button */}
      <button
        onClick={openSidebar}
        className="mobile-only"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: '36px', height: '36px',
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'rgb(var(--text-secondary))',
          borderRadius: '0.5rem',
        }}
        title={t('header.menu')}
      >
        <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>

        {/* Language switcher */}
        <div ref={langRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setLangMenuOpen(!langMenuOpen)}
            style={{
              padding: '0.375rem 0.625rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              color: 'rgb(var(--text-secondary))',
              display: 'flex', alignItems: 'center', gap: '0.375rem',
              fontSize: '0.8125rem', fontWeight: 500,
              fontFamily: 'var(--font-sans)',
            }}
          >
            <span style={{ fontSize: '1rem' }}>{locale === 'ar' ? '🇪🇬' : '🇺🇸'}</span>
            <svg style={{ width: '12px', height: '12px', color: 'rgb(var(--text-tertiary))', transition: 'transform 0.2s', transform: langMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {langMenuOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', insetInlineStart: 0,
              background: 'rgb(var(--bg-card))',
              border: '1px solid rgb(var(--border-primary))',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-lg)',
              padding: '0.5rem',
              minWidth: '160px',
              zIndex: 100,
            }}>
              {[
                { code: 'en', flag: '🇺🇸', label: 'English' },
                { code: 'ar', flag: '🇪🇬', label: 'العربية' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setLocale(lang.code as 'en' | 'ar'); setLangMenuOpen(false); }}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.5rem',
                    padding: '0.5rem 0.75rem', borderRadius: '0.5rem',
                    border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)',
                    fontSize: '0.875rem',
                    background: locale === lang.code ? 'rgb(var(--accent-primary-light))' : 'none',
                    color: locale === lang.code ? 'rgb(var(--accent-primary))' : 'rgb(var(--text-secondary))',
                    fontWeight: locale === lang.code ? 600 : 400,
                  }}
                >
                  <span style={{ fontSize: '1rem' }}>{lang.flag}</span>
                  {lang.label}
                  {locale === lang.code && (
                    <svg style={{ width: '14px', height: '14px', marginInlineStart: 'auto' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? t('header.switchToLight') : t('header.switchToDark')}
          style={{
            width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '0.5rem', border: 'none', background: 'none', cursor: 'pointer',
            color: 'rgb(var(--text-secondary))',
          }}
        >
          {theme === 'dark' ? (
            <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        {/* Notifications */}
        <button
          onClick={() => navigate('/notifications')}
          style={{
            position: 'relative', width: '36px', height: '36px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            borderRadius: '0.5rem', border: 'none', background: 'none', cursor: 'pointer',
            color: 'rgb(var(--text-secondary))',
          }}
        >
          <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span style={{
            position: 'absolute', top: '6px', insetInlineEnd: '6px',
            width: '8px', height: '8px',
            borderRadius: '50%',
            background: 'rgb(var(--accent-danger))',
          }} />
        </button>

        {/* Divider */}
        <div style={{ width: '1px', height: '24px', background: 'rgb(var(--border-primary))', margin: '0 0.25rem' }} />

        {/* User menu */}
        <div ref={userRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.625rem',
              padding: '0.375rem 0.5rem 0.375rem 0.375rem',
              borderRadius: '0.75rem', border: 'none', background: 'none', cursor: 'pointer',
            }}
          >
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgb(var(--accent-primary-light))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgb(var(--accent-primary))' }}>
                {getInitials(currentUser?.name ?? 'U')}
              </span>
            </div>
            <div className="hide-on-mobile" style={{ textAlign: 'start' }}>
              <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', lineHeight: 1.2 }}>
                {currentUser?.name}
              </p>
              <p style={{ margin: 0, fontSize: '0.6875rem', color: 'rgb(var(--text-tertiary))', textTransform: 'capitalize', lineHeight: 1.2 }}>
                {currentUser?.role}
              </p>
            </div>
            <svg style={{ width: '14px', height: '14px', color: 'rgb(var(--text-tertiary))', transition: 'transform 0.2s', transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {userMenuOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', insetInlineEnd: 0,
              width: '224px',
              background: 'rgb(var(--bg-card))',
              border: '1px solid rgb(var(--border-primary))',
              borderRadius: '0.75rem',
              boxShadow: 'var(--shadow-lg)',
              zIndex: 100,
            }}>
              <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid rgb(var(--border-primary))' }}>
                <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))' }}>{currentUser?.name}</p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgb(var(--text-secondary))' }}>{currentUser?.email}</p>
              </div>
              <div style={{ padding: '0.25rem' }}>
                {[
                  { label: t('header.profile'), icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', to: '/settings' },
                  { label: t('header.settings'), icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z', to: '/settings' },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => { navigate(item.to); setUserMenuOpen(false); }}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                      padding: '0.625rem 0.75rem', borderRadius: '0.5rem',
                      border: 'none', cursor: 'pointer', background: 'none',
                      color: 'rgb(var(--text-secondary))', fontSize: '0.875rem',
                      fontFamily: 'var(--font-sans)',
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgb(var(--bg-hover))'; (e.currentTarget as HTMLButtonElement).style.color = 'rgb(var(--text-primary))'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = 'rgb(var(--text-secondary))'; }}
                  >
                    <svg style={{ width: '16px', height: '16px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    {item.label}
                  </button>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgb(var(--border-primary))', padding: '0.25rem' }}>
                <button
                  onClick={handleLogout}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.625rem 0.75rem', borderRadius: '0.5rem',
                    border: 'none', cursor: 'pointer', background: 'none',
                    color: 'rgb(var(--accent-danger))', fontSize: '0.875rem',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  <svg style={{ width: '16px', height: '16px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  {t('header.signOut')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
