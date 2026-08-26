import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../../../store/useAppStore';
import { useTranslation } from 'react-i18next';

export default function Register() {
  const { register: registerUser, addToast } = useAppStore();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(name, email, password);
      addToast('success', t('toast.auth.registerSuccess'));
      navigate('/dashboard');
    } catch {
      addToast('error', t('auth.registrationFailed'));
    } finally {
      setLoading(false);
    }
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
          background: 'var(--gradient-success)',
          borderRadius: '1.25rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1.5rem',
          boxShadow: '0 10px 25px -5px rgb(34 197 94 / 0.4)',
        }}>
          <svg style={{ width: '32px', height: '32px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h1 style={{ margin: '0 0 0.5rem', fontSize: '1.75rem', fontWeight: 800, color: 'rgb(var(--text-primary))', letterSpacing: '-0.02em' }}>
          {t('auth.createAccount')}
        </h1>
        <p style={{ margin: 0, fontSize: '0.9375rem', color: 'rgb(var(--text-secondary))', lineHeight: 1.5 }}>
          {t('auth.registerSubtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {[
          { id: 'name', label: t('auth.name'), value: name, setValue: setName, type: 'text', placeholder: 'John Doe', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
          { id: 'email', label: t('auth.email'), value: email, setValue: setEmail, type: 'email', placeholder: 'you@example.com', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
          { id: 'password', label: t('auth.password'), value: password, setValue: setPassword, type: 'password', placeholder: '••••••••', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
        ].map((field) => (
          <div key={field.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))' }}>{field.label}</label>
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
                  <path strokeLinecap="round" strokeLinejoin="round" d={field.icon} />
                </svg>
              </div>
              <input
                type={field.type}
                value={field.value}
                onChange={(e) => field.setValue(e.target.value)}
                placeholder={field.placeholder}
                required
                style={{
                  flex: 1, border: 'none', background: 'transparent', outline: 'none',
                  padding: '0.875rem 1rem 0.875rem 0', fontSize: '0.9375rem',
                  color: 'rgb(var(--text-primary))', fontFamily: 'var(--font-sans)',
                }}
              />
            </div>
          </div>
        ))}

        <button type="submit" disabled={loading} className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '0.875rem 1.5rem', fontSize: '1rem', fontWeight: 700, marginTop: '0.5rem', borderRadius: '1rem' }}>
          {loading ? (
            <><svg className="animate-spin" style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24">
              <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={4} />
              <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>{t('auth.creatingAccount')}</>
          ) : (t('auth.createAccount'))}
        </button>
      </form>

      <p style={{ textAlign: 'center', fontSize: '0.9375rem', color: 'rgb(var(--text-secondary))', margin: '2rem 0 0' }}>
        {t('auth.haveAccount')}{' '}
        <Link to="/auth/login" style={{ color: 'rgb(var(--text-link))', fontWeight: 700, textDecoration: 'none' }}>
          {t('auth.signIn')}
        </Link>
      </p>
    </div>
  );
}
