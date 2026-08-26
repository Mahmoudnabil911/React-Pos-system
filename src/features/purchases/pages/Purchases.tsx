import { useState, useEffect } from 'react';
import PageHeader from '../../../components/shared/PageHeader';
import DataTable from '../../../components/shared/DataTable';
import { MOCK_PURCHASES, statusBadgeClass } from '../../../utils/mockData';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/ui/Modal';
import { useAppStore } from '../../../store/useAppStore';

export default function Purchases() {
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
    { key: 'poNumber', label: t('purchases.poNumber'), render: (row: typeof MOCK_PURCHASES[0]) => <span style={{ fontWeight: 600, color: 'rgb(var(--text-link))' }}>{row.poNumber}</span> },
    { key: 'supplier', label: t('nav.suppliers') },
    { key: 'items', label: t('pos.items'), render: (row: typeof MOCK_PURCHASES[0]) => <span>{row.items} {t('pos.items').toLowerCase()}</span> },
    { key: 'amount', label: t('common.amount'), render: (row: typeof MOCK_PURCHASES[0]) => <span style={{ fontWeight: 700 }}>${row.amount.toFixed(2)}</span> },
    { key: 'status', label: t('common.status'), render: (row: typeof MOCK_PURCHASES[0]) => <span className={statusBadgeClass(row.status)}>{t(`purchases.${row.status.toLowerCase()}`) || row.status}</span> },
    { key: 'date', label: t('common.date') },
  ];

  return (
    <div>
      <PageHeader
        title={t('nav.purchases')} subtitle={t('purchases.subtitle')}
        breadcrumbs={[{ label: t('nav.dashboard'), route: '/dashboard' }, { label: t('nav.commerce') }, { label: t('nav.purchases') }]}
      >
        <button className="btn-primary" onClick={handleCreate}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          {t('purchases.newPurchase')}
        </button>
      </PageHeader>
      
      <DataTable columns={columns as never} data={MOCK_PURCHASES as never} isLoading={isLoading} searchPlaceholder={t('purchases.search')} pageSize={10} />
      
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={t('purchases.newPurchase')}
        footer={
          <div className="flex gap-3 justify-end w-full">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-primary bg-transparent text-secondary text-sm font-sans font-semibold transition-colors hover:bg-secondary">
              {t('common.cancel')}
            </button>
            <button type="submit" form="purchaseForm" className="btn-primary">
              {t('common.save')}
            </button>
          </div>
        }
      >
        <form id="purchaseForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">{t('purchases.poNumber')}</label>
            <input type="text" className="input-base w-full" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">{t('nav.suppliers')}</label>
            <input type="text" className="input-base w-full" required />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">{t('common.amount')}</label>
            <input type="number" step="0.01" className="input-base w-full" required />
          </div>
        </form>
      </Modal>
    </div>
  );
}
