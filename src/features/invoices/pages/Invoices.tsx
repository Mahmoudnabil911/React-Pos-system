import { useState, useEffect } from 'react';
import PageHeader from '../../../components/shared/PageHeader';
import DataTable from '../../../components/shared/DataTable';
import { MOCK_INVOICES, statusBadgeClass } from '../../../utils/mockData';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/ui/Modal';
import { useAppStore } from '../../../store/useAppStore';

export default function Invoices() {
  const { t } = useTranslation();
  const { addToast } = useAppStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(() => { setTimeout(() => setIsLoading(false), 400); }, []);

  const handleCreate = () => { setIsModalOpen(true); };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    addToast('success', t('common.createdSuccessfully'));
  };

  const columns = [
    { key: 'invoiceNumber', label: t('invoices.invoiceId'), render: (row: typeof MOCK_INVOICES[0]) => <span style={{ fontWeight: 600, color: 'rgb(var(--text-link))' }}>{row.invoiceNumber}</span> },
    { key: 'customer', label: t('common.customer'), render: (row: typeof MOCK_INVOICES[0]) => <span style={{ fontWeight: 500 }}>{row.customer}</span> },
    { key: 'amount', label: t('common.amount'), render: (row: typeof MOCK_INVOICES[0]) => <span style={{ fontWeight: 700 }}>${row.amount.toFixed(2)}</span> },
    { key: 'status', label: t('common.status'), render: (row: typeof MOCK_INVOICES[0]) => <span className={statusBadgeClass(row.status)}>{t(`invoices.${row.status.toLowerCase()}`) || row.status}</span> },
    { key: 'issueDate', label: t('invoices.issueDate') },
    { key: 'dueDate', label: t('common.date') },
  ];

  return (
    <div>
      <PageHeader
        title={t('nav.invoices')} subtitle={t('invoices.subtitle')}
        breadcrumbs={[{ label: t('nav.dashboard'), route: '/dashboard' }, { label: t('nav.commerce') }, { label: t('nav.invoices') }]}
      >
        <button className="btn-primary" onClick={handleCreate}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {t('invoices.newInvoice')}
        </button>
      </PageHeader>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {[
          { label: t('common.total'), value: `$${MOCK_INVOICES.reduce((s,i) => s + i.amount, 0).toFixed(2)}`, cls: 'badge-primary' },
          { label: t('invoices.paid'), value: `${MOCK_INVOICES.filter(i=>i.status==='Paid').length}`, cls: 'badge-success' },
          { label: t('invoices.pending'), value: `${MOCK_INVOICES.filter(i=>i.status==='Pending').length}`, cls: 'badge-warning' },
          { label: t('invoices.overdue'), value: `${MOCK_INVOICES.filter(i=>i.status==='Overdue').length}`, cls: 'badge-danger' },
        ].map((card) => (
          <div key={card.label} className="card" style={{ padding: '1.25rem', textAlign: 'center' }}>
            <p style={{ margin: '0 0 0.5rem', fontSize: '0.8125rem', color: 'rgb(var(--text-secondary))' }}>{card.label}</p>
            <p style={{ margin: 0 }}><span className={`badge ${card.cls}`} style={{ fontSize: '1.125rem', padding: '0.375rem 0.875rem' }}>{card.value}</span></p>
          </div>
        ))}
      </div>

      <DataTable columns={columns as never} data={MOCK_INVOICES as never} isLoading={isLoading} searchPlaceholder={t('invoices.search')} pageSize={10} />
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={t('invoices.newInvoice')}
        footer={
          <div className="flex gap-3 justify-end w-full">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-primary bg-transparent text-secondary text-sm font-sans font-semibold transition-colors hover:bg-secondary">
              {t('common.cancel')}
            </button>
            <button type="submit" form="invoiceForm" className="btn-primary">
              {t('common.save')}
            </button>
          </div>
        }
      >
        <form id="invoiceForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">{t('common.customer')}</label>
            <input type="text" className="input-base w-full" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">{t('common.amount')}</label>
            <input type="number" step="0.01" className="input-base w-full" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">{t('common.date')}</label>
            <input type="date" className="input-base w-full" required />
          </div>
        </form>
      </Modal>
    </div>
  );
}
