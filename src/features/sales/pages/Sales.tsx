import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/shared/PageHeader';
import DataTable from '../../../components/shared/DataTable';
import { MOCK_SALES, statusBadgeClass } from '../../../utils/mockData';
import { useTranslation } from 'react-i18next';

export default function Sales() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => { setTimeout(() => setIsLoading(false), 400); }, []);

  const columns = [
    { key: 'invoiceNumber', label: t('sales.saleId'), render: (row: typeof MOCK_SALES[0]) => <span style={{ fontWeight: 600, color: 'rgb(var(--text-link))' }}>{row.invoiceNumber}</span> },
    { key: 'customer', label: t('sales.customer') },
    { key: 'amount', label: t('sales.amount'), render: (row: typeof MOCK_SALES[0]) => <span style={{ fontWeight: 700 }}>${row.amount.toFixed(2)}</span> },
    { key: 'status', label: t('sales.status'), render: (row: typeof MOCK_SALES[0]) => <span className={statusBadgeClass(row.status)}>{t(`sales.${row.status.toLowerCase()}`)}</span> },
    { key: 'paymentMethod', label: t('sales.paymentMethod') },
    { key: 'date', label: t('sales.date') },
  ];

  return (
    <div>
      <PageHeader
        title={t('sales.title')} subtitle={t('sales.subtitle')}
        breadcrumbs={[{ label: t('nav.dashboard'), route: '/dashboard' }, { label: t('nav.commerce') }, { label: t('nav.sales') }]}
      >
        <button className="btn-primary" onClick={() => navigate('/pos')}><svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>{t('sales.newSale')}</button>
      </PageHeader>
      <DataTable columns={columns as never} data={MOCK_SALES as never} isLoading={isLoading} searchPlaceholder={t('sales.searchPlaceholder')} pageSize={10} />
    </div>
  );
}
