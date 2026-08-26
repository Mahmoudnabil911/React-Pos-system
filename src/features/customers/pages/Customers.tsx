import { useState, useEffect } from 'react';
import PageHeader from '../../../components/shared/PageHeader';
import DataTable from '../../../components/shared/DataTable';
import { MOCK_CUSTOMERS, statusBadgeClass } from '../../../utils/mockData';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/ui/Modal';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog';
import { useAppStore } from '../../../store/useAppStore';

function getInitials(name: string) { return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2); }

export default function Customers() {
  const { t } = useTranslation();
  const { addToast } = useAppStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [, setItemToDelete] = useState<any>(null);
  
  const handleCreate = () => { setEditingItem(null); setIsModalOpen(true); };
  const handleEdit = (item: any) => { setEditingItem(item); setIsModalOpen(true); };
  const handleDelete = (item: any) => { setItemToDelete(item); setIsConfirmOpen(true); };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(false);
    addToast('success', editingItem ? t('common.updatedSuccessfully') : t('common.createdSuccessfully'));
  };

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { setTimeout(() => setIsLoading(false), 400); }, []);

  const columns = [
    { key: 'name', label: t('common.customer'), render: (row: typeof MOCK_CUSTOMERS[0]) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgb(var(--accent-primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgb(var(--accent-primary))' }}>{getInitials(row.name)}</span>
        </div>
        <div><p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-primary))' }}>{row.name}</p><p style={{ margin: 0, fontSize: '0.75rem', color: 'rgb(var(--text-secondary))' }}>{row.email}</p></div>
      </div>
    ) },
    { key: 'phone', label: t('common.phone') },
    { key: 'totalOrders', label: t('customers.totalOrders'), render: (row: typeof MOCK_CUSTOMERS[0]) => <span className="badge badge-primary">{row.totalOrders}</span> },
    { key: 'totalSpent', label: t('customers.totalSpent'), render: (row: typeof MOCK_CUSTOMERS[0]) => <span style={{ fontWeight: 700 }}>${row.totalSpent.toFixed(2)}</span> },
    { key: 'status', label: t('common.status'), render: (row: typeof MOCK_CUSTOMERS[0]) => <span className={statusBadgeClass(row.status)}>{t(`common.${row.status.toLowerCase()}`) || row.status}</span> },
    { key: 'joinDate', label: t('common.date') },
      { key: 'actions', label: t('common.actions'), render: (row: any) => (
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button onClick={() => handleEdit(row)} style={{ border: 'none', background: 'none', color: 'rgb(var(--text-link))', cursor: 'pointer', padding: '0.25rem' }}>
          <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
        </button>
        <button onClick={() => handleDelete(row)} style={{ border: 'none', background: 'none', color: 'rgb(var(--accent-danger))', cursor: 'pointer', padding: '0.25rem' }}>
          <svg style={{ width: '18px', height: '18px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    )},
];

  return (
    <div>
      <PageHeader
        title={t('nav.customers')}         subtitle={t('customers.subtitle')}
        breadcrumbs={[{ label: t('nav.dashboard'), route: '/dashboard' }, { label: t('nav.people') }, { label: t('nav.customers') }]}
      >
        <button className="btn-primary" onClick={handleCreate}><svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>{t('customers.addCustomer')}</button>
      </PageHeader>
      <DataTable columns={columns as never} data={MOCK_CUSTOMERS as never} isLoading={isLoading} searchPlaceholder={t('customers.search')} pageSize={10} />
    
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? t('customers.editCustomer') : t('customers.addCustomer')}
        footer={
          <div className="flex gap-3 justify-end w-full">
            <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 rounded-xl border border-primary bg-transparent text-secondary text-sm font-sans font-semibold transition-colors hover:bg-secondary">
              {t('common.cancel')}
            </button>
            <button type="submit" form="customerForm" className="btn-primary">
              {t('common.save')}
            </button>
          </div>
        }
      >
        <form id="customerForm" onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">{t('common.name')}</label>
            <input type="text" className="input-base w-full" required defaultValue={editingItem?.name || ''} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">{t('common.email')}</label>
            <input type="email" className="input-base w-full" required defaultValue={editingItem?.email || ''} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-primary capitalize">{t('common.phone')}</label>
            <input type="text" className="input-base w-full" required defaultValue={editingItem?.phone || ''} />
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={() => {
           addToast('success', t('common.deletedSuccessfully'));
           setIsConfirmOpen(false);
        }}
        title={t('common.confirmDelete')}
        message={t('common.confirmDeleteMessage')}
      />
    </div>
  );
}
