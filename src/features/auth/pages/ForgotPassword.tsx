import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import { useTranslation } from 'react-i18next';

export default function ForgotPassword() {
  const {  addToast } = useAppStore();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    setLoading(false);
    setSent(true);
    addToast('success', t('auth.resetLinkSent'));
  };

  return (
    <div
      className="animate-fade-in-up auth-card"
      style={{
        background: 'rgb(var(--bg-card))',
        padding: '3rem 2.5rem',
        borderRadius: '1.5rem',
        width: '100%',
        boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.08)',
        border: '1px solid rgb(var(--border-primary))',
        position: 'relative',
        overflow: 'hidden'
      }}
    >

      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{
          width: '64px', height: '64px',
          background: 'var(--gradient-warning)',
          borderRadius: '1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 10px 25px -5px rgb(245 158 11 / 0.4)',
        }}>
          <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 800, color: 'rgb(var(--text-primary))', letterSpacing: '-0.02em' }}>
          {t('auth.forgotPasswordTitle')}
        </h1>
        <p style={{ margin: 0, fontSize: '0.9375rem', color: 'rgb(var(--text-secondary))', lineHeight: 1.5 }}>
          {t('auth.forgotPasswordSubtitle')}
        </p>
      </div>

      {sent ? (
        <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
          <div style={{
            width: '64px', height: '64px', background: 'rgb(var(--accent-success-light))',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem',
          }}>
            <svg style={{ width: '32px', height: '32px', color: 'rgb(var(--accent-success))' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p style={{ margin: 0, color: 'rgb(var(--text-secondary))', fontSize: '0.9375rem' }}>
            {t('auth.checkInbox')}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))' }}>
              {t('auth.email')}
            </label>
            <div style={{
              position: 'relative', display: 'flex', alignItems: 'center',
              background: 'rgb(var(--bg-primary))',
              border: '2px solid transparent',
              borderRadius: '1rem',
              boxShadow: 'inset 0 2px 4px rgb(0 0 0 / 0.02), 0 0 0 1px rgb(var(--border-primary))',
              transition: 'all 0.2s',
            }}
            onFocus={(e) => { e.currentTarget.style.boxShadow = '0 0 0 2px rgb(var(--accent-primary) / 0.2), 0 0 0 1px rgb(var(--accent-primary))'; }}
            onBlur={(e) => { e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgb(0 0 0 / 0.02), 0 0 0 1px rgb(var(--border-primary))'; }}
            >
              <div style={{ width: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: 'rgb(var(--text-tertiary))' }}>
                <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com" required
                style={{
                  flex: 1, border: 'none', background: 'transparent', outline: 'none',
                  padding: '0.875rem 1rem 0.875rem 0', fontSize: '0.9375rem',
                  color: 'rgb(var(--text-primary))', fontFamily: 'var(--font-sans)',
                }}
              />
            </div>
          </div>
          <button type="submit" disabled={loading} className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '0.875rem 1.5rem', fontSize: '1rem', fontWeight: 700, marginTop: '0.5rem', borderRadius: '1rem' }}>
            {loading ? t('auth.sending') : t('auth.sendResetLink')}
          </button>
        </form>
      )}

      <p style={{ textAlign: 'center', fontSize: '0.9375rem', color: 'rgb(var(--text-secondary))', margin: '2rem 0 0' }}>
        <Link to="/auth/login" style={{ color: 'rgb(var(--text-link))', fontWeight: 700, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.375rem' }}>
          <svg className="icon-dir" style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {t('auth.backToLogin')}
        </Link>
      </p>
    </div>
  );
}
