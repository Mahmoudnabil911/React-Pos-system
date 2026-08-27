import { useState, useEffect } from 'react';
import PageHeader from '../../../components/shared/PageHeader';
import Select from '../../../components/shared/Select';
import { useAppStore } from '../../../store/useAppStore';
import { useTranslation } from 'react-i18next';

const SECTIONS = [
  { id: 'general', i18nKey: 'settings.general', defaultLabel: 'General', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  { id: 'appearance', i18nKey: 'settings.appearance', defaultLabel: 'Appearance', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
  { id: 'security', i18nKey: 'settings.changePassword', defaultLabel: 'Change Password', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
  { id: 'notifications', i18nKey: 'settings.notificationSettings', defaultLabel: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  { id: 'billing', i18nKey: 'settings.billing', defaultLabel: 'Billing', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z' },
];

export default function Settings() {
  const {  theme, toggleTheme, locale, setLocale, addToast } = useAppStore();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('general');
  const [isLoading, setIsLoading] = useState(true);
  const [storeName, setStoreName] = useState('My POS Store');
  const [storeEmail, setStoreEmail] = useState('store@example.com');
  const [currency, setCurrency] = useState('USD');
  const [taxRate, setTaxRate] = useState('10');
  
  const [lowStockAlerts, setLowStockAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);

  useEffect(() => { setTimeout(() => setIsLoading(false), 400); }, []);

  const handleSave = () => {
    addToast('success', t('settings.saveSuccess'));
  };

  const activeBtnStyle: React.CSSProperties = { borderColor: 'rgb(var(--accent-primary))', background: 'rgb(var(--accent-primary-light))', color: 'rgb(var(--accent-primary))' };
  const inactiveBtnStyle: React.CSSProperties = { borderColor: 'rgb(var(--border-primary))', background: 'rgb(var(--bg-secondary))', color: 'rgb(var(--text-secondary))' };

  return (
    <div>
      <PageHeader
        title={t('nav.settings')} subtitle={t('settings.subtitle')}
        breadcrumbs={[{ label: t('nav.dashboard'), route: '/dashboard' }, { label: t('nav.settings') }]}
      />
      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-6">
        <div className="card flex flex-wrap md:flex-col gap-2 w-full p-2 self-start">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveTab(section.id)}
              className={`flex-1 basis-[30%] min-w-[100px] flex flex-col md:flex-row items-center justify-center md:justify-start gap-1.5 md:gap-2.5 px-2 py-2.5 md:px-3 md:py-3 rounded-lg font-semibold text-xs md:text-sm transition-all md:w-full ${
                activeTab === section.id 
                  ? 'bg-[rgb(var(--accent-primary-light))] text-[rgb(var(--accent-primary))]' 
                  : 'text-[rgb(var(--text-secondary))] hover:bg-[rgb(var(--bg-hover))] hover:text-[rgb(var(--text-primary))]'
              }`}
            >
              <svg style={{ width: '22px', height: '22px', flexShrink: 0 }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
              </svg>
              <span className="text-center whitespace-normal leading-tight">{t(section.i18nKey)}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="card" style={{ padding: '1.5rem', width: '100%', maxWidth: '100%', overflow: 'hidden' }}>
          {isLoading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i}><div className="skeleton" style={{ height: '14px', width: '30%', marginBottom: '0.5rem' }} /><div className="skeleton" style={{ height: '42px' }} /></div>
              ))}
            </div>
          ) : activeTab === 'general' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'rgb(var(--text-primary))', marginBottom: '0.5rem' }}>{t('settings.general')}</h2>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: '0.375rem' }}>{t('settings.businessName')}</label>
                <input className="input-base" style={{ width: '100%' }} type="text" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: '0.375rem' }}>{t('settings.emailAddress')}</label>
                <input className="input-base" style={{ width: '100%' }} type="email" value={storeEmail} onChange={(e) => setStoreEmail(e.target.value)} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: '0.375rem' }}>{t('settings.currency')}</label>
                <Select 
                  value={currency} 
                  onChange={setCurrency}
                  options={[
                    { value: 'USD', label: 'USD ($)' },
                    { value: 'EUR', label: 'EUR (€)' },
                    { value: 'EGP', label: 'EGP (ج.م)' },
                    { value: 'SAR', label: 'SAR (ر.س)' },
                    { value: 'AED', label: 'AED (د.إ)' }
                  ]}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: '0.375rem' }}>{t('settings.taxRate')}</label>
                <input className="input-base" style={{ width: '100%' }} type="number" value={taxRate} onChange={(e) => setTaxRate(e.target.value)} />
              </div>
            </div>
          ) : activeTab === 'appearance' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'rgb(var(--text-primary))', marginBottom: '0.5rem' }}>{t('settings.appearance')}</h2>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: '0.75rem' }}>{t('settings.appearance')}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {['light', 'dark'].map((t_) => (
                    <button
                      key={t_}
                      onClick={() => theme !== t_ && toggleTheme()}
                      style={{
                        padding: '1.25rem 1.25rem',
                        borderRadius: '0.75rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        border: '2px solid',
                        transition: 'all 0.15s',
                        ...(theme === t_ ? activeBtnStyle : inactiveBtnStyle),
                      }}
                    >
                      {t_ === 'light' ? `☀️ ${t('settings.light')}` : `🌙 ${t('settings.dark')}`}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: '0.75rem' }}>{t('settings.language')}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {[{ code: 'en', label: '🇺🇸 English' }, { code: 'ar', label: '🇪🇬 العربية' }].map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setLocale(lang.code as 'en' | 'ar')}
                      style={{
                        padding: '1.25rem 1.25rem',
                        borderRadius: '0.75rem',
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        transition: 'all 0.15s',
                        border: '2px solid',
                        ...(locale === lang.code ? activeBtnStyle : inactiveBtnStyle),
                      }}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : activeTab === 'notifications' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'rgb(var(--text-primary))', marginBottom: '0.5rem' }}>{t('settings.notificationSettings')}</h2>
              
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid rgb(var(--border-primary))', borderRadius: '0.75rem' }}>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))' }}>{t('settings.lowStockAlerts') || 'Low Stock Alerts'}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgb(var(--text-secondary))' }}>{t('settings.lowStockAlertsDesc') || 'Get notified when stock is running low'}</p>
                </div>
                <div onClick={() => setLowStockAlerts(!lowStockAlerts)} style={{ width: '40px', height: '24px', background: lowStockAlerts ? 'rgb(var(--accent-success))' : 'rgb(var(--border-primary))', borderRadius: '9999px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: '2px', left: lowStockAlerts ? '18px' : '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'all 0.2s' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', border: '1px solid rgb(var(--border-primary))', borderRadius: '0.75rem' }}>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))' }}>{t('settings.emailNotifications') || 'Email Notifications'}</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgb(var(--text-secondary))' }}>{t('settings.emailNotificationsDesc') || 'Receive notifications via email'}</p>
                </div>
                <div onClick={() => setEmailNotifications(!emailNotifications)} style={{ width: '40px', height: '24px', background: emailNotifications ? 'rgb(var(--accent-success))' : 'rgb(var(--border-primary))', borderRadius: '9999px', position: 'relative', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ position: 'absolute', top: '2px', left: emailNotifications ? '18px' : '2px', width: '20px', height: '20px', background: 'white', borderRadius: '50%', transition: 'all 0.2s' }} />
                </div>
              </div>
            </div>
          ) : activeTab === 'security' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'rgb(var(--text-primary))', marginBottom: '0.5rem' }}>{t('settings.changePassword')}</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: '0.375rem' }}>{t('settings.currentPassword')}</label>
                  <input className="input-base" style={{ width: '100%' }} type="password" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: '0.375rem' }}>{t('settings.newPassword')}</label>
                  <input className="input-base" style={{ width: '100%' }} type="password" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))', marginBottom: '0.375rem' }}>{t('settings.confirmPassword')}</label>
                  <input className="input-base" style={{ width: '100%' }} type="password" />
                </div>
              </div>
            </div>
          ) : activeTab === 'billing' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'rgb(var(--text-primary))', marginBottom: '0.5rem' }}>{t('settings.billing')}</h2>
              
              <div style={{ padding: '1.5rem', border: '1px solid rgb(var(--border-primary))', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', gap: '1rem', background: 'rgb(var(--bg-secondary))' }}>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-secondary))', textTransform: 'uppercase' }}>{t('settings.billingPlan')}</p>
                  <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'rgb(var(--text-primary))' }}>{t('settings.proPlan')}</p>
                </div>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'rgb(var(--text-secondary))' }}>{t('settings.nextBillingDate')}</p>
                <div style={{ marginTop: '0.5rem' }}>
                  <button className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}>{t('settings.manageSubscription')}</button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700, color: 'rgb(var(--text-primary))', marginBottom: '1rem' }}>{t(SECTIONS.find(s => s.id === activeTab)?.i18nKey || '')} {t('nav.settings')}</h2>
              <p style={{ color: 'rgb(var(--text-secondary))', fontSize: '0.875rem' }}>{t('common.noDataAvailable') || 'Section content coming soon...'}</p>
            </div>
          )}

          {!isLoading && (
            <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgb(var(--border-primary))', display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button onClick={handleSave} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>{t('settings.save')}</button>
              <button style={{ padding: '0.625rem 1.25rem', borderRadius: '0.75rem', border: '1px solid rgb(var(--border-primary))', background: 'transparent', color: 'rgb(var(--text-secondary))', fontSize: '0.875rem', fontFamily: 'var(--font-sans)', width: '100%', transition: 'background-color 0.15s' }}>
                {t('common.cancel')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
