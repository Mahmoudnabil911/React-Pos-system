import { useState, useEffect } from 'react';
import PageHeader from '../../../components/shared/PageHeader';
import Select from '../../../components/shared/Select';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/ui/Modal';
import { useAppStore } from '../../../store/useAppStore';

const reportCards = [
  { titleKey: 'reports.salesReport', defaultTitle: 'Sales Report', value: '$245,680', change: '+12.5%', gradient: 'var(--gradient-primary)', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
  { titleKey: 'reports.revenueReport', defaultTitle: 'Revenue Report', value: '$183,240', change: '+8.3%', gradient: 'var(--gradient-success)', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { titleKey: 'reports.inventoryReport', defaultTitle: 'Inventory Report', value: '1,284 items', change: '+5.2%', gradient: 'var(--gradient-warning)', icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' },
];

const reportRows = [
  { name: 'Monthly Sales Report', period: 'August 2026', size: '2.4 MB', type: 'PDF', status: 'Ready' },
  { name: 'Inventory Status Report', period: 'August 2026', size: '1.8 MB', type: 'Excel', status: 'Ready' },
  { name: 'Customer Analysis', period: 'Q2 2026', size: '3.1 MB', type: 'PDF', status: 'Ready' },
  { name: 'Revenue Summary', period: 'July 2026', size: '0.9 MB', type: 'PDF', status: 'Ready' },
  { name: 'Expense Report', period: 'August 2026', size: '1.2 MB', type: 'Excel', status: 'Processing' },
];

export default function Reports() {
  const { t } = useTranslation();
  const { addToast } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportType, setReportType] = useState('sales');
  const [reportPeriod, setReportPeriod] = useState('this_month');
  
  useEffect(() => { setTimeout(() => setIsLoading(false), 600); }, []);

  const handleGenerateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    addToast('success', t('reports.processing') || 'Processing report...');
  };

  return (
    <div>
      <PageHeader
        title={t('nav.reports')} subtitle={t('reports.subtitle')}
        breadcrumbs={[{ label: t('nav.dashboard'), route: '/dashboard' }, { label: t('nav.finance') }, { label: t('nav.reports') }]}
      />

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {reportCards.map((card, i) => (
          <div
            key={card.titleKey}
            className="animate-fade-in-up"
            style={{
              position: 'relative',
              overflow: 'hidden',
              borderRadius: '1rem',
              padding: '1.5rem',
              color: 'white',
              background: card.gradient,
              boxShadow: 'var(--shadow-lg)',
              animationDelay: `${i * 0.1}s`, opacity: 0,
            }}
          >
            <div style={{ position: 'absolute', top: 0, right: 0, width: '120px', height: '120px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', transform: 'translate(30%, -30%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', transform: 'translate(-30%, 30%)' }} />
            <div style={{ position: 'relative' }}>
              <svg style={{ width: '28px', height: '28px', marginBottom: '0.75rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
              </svg>
              {isLoading ? (
                <div className="skeleton" style={{ height: '14px', marginBottom: '0.25rem' }} />
              ) : (
                <p style={{ margin: '0 0 0.25rem', fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{card.value}</p>
              )}
              <p style={{ margin: '0 0 0.5rem', fontSize: '0.875rem', opacity: 0.85 }}>{t(card.titleKey)}</p>
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.2)', padding: '0.25rem 0.5rem', borderRadius: '9999px' }}>{card.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Reports list */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgb(var(--border-primary))', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{t('reports.availableReports')}</h2>
          <button onClick={() => setIsModalOpen(true)} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.875rem', width: '100%' }}>
            <svg style={{ width: '16px', height: '16px', display: 'inline-block', marginInlineEnd: '0.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            {t('reports.generateReport')}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgb(var(--bg-secondary))', borderBottom: '1px solid rgb(var(--border-primary))' }}>
                {[
                  t('reports.reportName'),
                  t('reports.period'),
                  t('reports.fileSize'),
                  t('common.type'),
                  t('common.status'),
                  t('common.actions')
                ].map((h) => (
                  <th key={h} style={{ padding: '0.75rem', textAlign: 'start', fontSize: '0.75rem', fontWeight: 700, color: 'rgb(var(--text-secondary))', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>{Array.from({ length: 6 }).map((__, j) => (<td key={j} style={{ padding: '0.875rem' }}><div className="skeleton" style={{ height: '14px' }} /></td>))}</tr>
                  ))
                : reportRows.map((row, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgb(var(--border-primary))', transition: 'background-color 0.15s' }}>
                      <td style={{ padding: '0.875rem', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))' }}>{row.name}</td>
                      <td style={{ padding: '0.875rem', fontSize: '0.875rem', color: 'rgb(var(--text-secondary))' }}>{row.period}</td>
                      <td style={{ padding: '0.875rem', fontSize: '0.875rem', color: 'rgb(var(--text-secondary))' }}>{row.size}</td>
                      <td style={{ padding: '0.875rem' }}><span className="badge badge-info">{row.type}</span></td>
                      <td style={{ padding: '0.875rem' }}><span className={`badge ${row.status === 'Ready' ? 'badge-success' : 'badge-warning'}`}>{t(`reports.${row.status.toLowerCase()}`)}</span></td>
                      <td style={{ padding: '0.875rem' }}>
                        <button onClick={() => addToast('success', t('common.loading') + ' ' + t('reports.download'))} style={{ padding: '0.375rem 0.75rem', borderRadius: '0.5rem', background: 'transparent', border: '1px solid rgb(var(--border-primary))', cursor: 'pointer', fontSize: '0.75rem', fontFamily: 'var(--font-sans)', color: 'rgb(var(--text-secondary))', transition: 'background-color 0.15s' }}>
                          {t('reports.download')}
                        </button>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={t('reports.generateReport')}
        allowOverflow={true}
        footer={
          <div className="flex gap-3 justify-end w-full">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-primary bg-transparent text-secondary text-sm font-sans font-semibold transition-colors hover:bg-secondary">
              {t('common.cancel')}
            </button>
            <button type="submit" form="reportForm" className="btn-primary">
              {t('reports.generateReport')}
            </button>
          </div>
        }
      >
        <form id="reportForm" onSubmit={handleGenerateSubmit} className="flex flex-col gap-4 overflow-visible">
          <div className="flex flex-col gap-1.5 overflow-visible z-20">
            <label className="text-sm font-semibold text-primary capitalize">{t('reports.reportName')}</label>
            <Select
              value={reportType}
              onChange={setReportType}
              options={[
                { value: 'sales', label: t('reports.salesReport') || 'Sales Report' },
                { value: 'inventory', label: t('reports.inventoryReport') || 'Inventory Report' },
                { value: 'revenue', label: t('reports.revenueReport') || 'Revenue Report' }
              ]}
            />
          </div>
          <div className="flex flex-col gap-1.5 overflow-visible z-10">
            <label className="text-sm font-semibold text-primary capitalize">{t('reports.period')}</label>
            <Select
              value={reportPeriod}
              onChange={setReportPeriod}
              options={[
                { value: 'this_month', label: t('reports.month') || 'This Month' },
                { value: 'last_month', label: 'Last Month' },
                { value: 'this_year', label: 'This Year' }
              ]}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
}
