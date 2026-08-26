import { useEffect, useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, PointElement, LineElement,
  BarElement, ArcElement, Title, Tooltip, Legend, Filler,
} from 'chart.js';
import PageHeader from '../../../components/shared/PageHeader';
import { useTranslation } from 'react-i18next';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend, Filler);

// STATS removed - inline data used

const RECENT_SALES = [
  { id: 'sale_001', invoiceNumber: 'INV-2026-001', customerName: 'Marcus Williams', total: 19.56, status: 'completed', date: '2026-08-25' },
  { id: 'sale_002', invoiceNumber: 'INV-2026-002', customerName: 'Sarah Chen', total: 50.91, status: 'completed', date: '2026-08-25' },
  { id: 'sale_007', invoiceNumber: 'INV-2026-007', customerName: 'Robert Anderson', total: 47.95, status: 'pending', date: '2026-08-23' },
  { id: 'sale_003', invoiceNumber: 'INV-2026-003', customerName: 'James Patel', total: 28.96, status: 'completed', date: '2026-08-24' },
  { id: 'sale_004', invoiceNumber: 'INV-2026-004', customerName: 'Olivia Martinez', total: 42.47, status: 'cancelled', date: '2026-08-24' },
];

const TOP_PRODUCTS = [
  { name: "Coca-Cola Classic 12pk", category: 'Beverages', sold: 312, revenue: 1868.88, color: '#E61E2B' },
  { name: "Tide Liquid Detergent 92oz", category: 'Household', sold: 187, revenue: 2242.13, color: '#FF6F00' },
  { name: "Starbucks Pike Place K-Cups", category: 'Beverages', sold: 165, revenue: 1648.35, color: '#00704A' },
  { name: "Lay's Classic Chips 10oz", category: 'Snacks', sold: 243, revenue: 1042.47, color: '#FFD700' },
  { name: "Bounty Select-A-Size 8pk", category: 'Household', sold: 134, revenue: 2209.66, color: '#1565C0' },
];

function getInitials(name: string) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function getStatusBadge(status: string) {
  const map: Record<string, string> = {
    completed: 'badge badge-success',
    pending: 'badge badge-warning',
    cancelled: 'badge badge-danger',
    refunded: 'badge badge-purple',
  };
  return map[status] ?? 'badge badge-gray';
}

const statCards = [
  {
    key: 'totalSales', titleKey: 'dashboard.totalSales', value: '$24,859', trend: 12.5,
    icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    color: '99 102 241', gradient: 'var(--gradient-primary)',
  },
  {
    key: 'revenue', titleKey: 'dashboard.revenue', value: '$18,324', trend: 8.3,
    icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    color: '34 197 94', gradient: 'var(--gradient-success)',
  },
  {
    key: 'orders', titleKey: 'dashboard.orders', value: '847', trend: -2.1,
    icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z',
    color: '245 158 11', gradient: 'var(--gradient-warning)',
  },
  {
    key: 'lowStockItems', titleKey: 'dashboard.lowStockItems', value: '6 items', trend: 50.0,
    icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    color: '239 68 68', gradient: 'var(--gradient-danger)',
  },
];

export default function Dashboard() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const revenueChartData = {
    labels: [t('dashboard.months.jan'), t('dashboard.months.feb'), t('dashboard.months.mar'), t('dashboard.months.apr'), t('dashboard.months.may'), t('dashboard.months.jun'), t('dashboard.months.jul'), t('dashboard.months.aug'), t('dashboard.months.sep'), t('dashboard.months.oct'), t('dashboard.months.nov'), t('dashboard.months.dec')],
    datasets: [
      {
        label: t('dashboard.chart.revenue'),
        data: [18500, 22300, 19800, 24100, 27600, 25400, 29800, 32100, 28700, 35200, 31800, 45231],
        borderColor: 'rgb(59, 130, 246)', backgroundColor: 'rgba(59, 130, 246, 0.08)',
        fill: true, tension: 0.4, pointRadius: 0, pointHoverRadius: 6,
        pointHoverBackgroundColor: 'rgb(59, 130, 246)', pointHoverBorderColor: '#fff',
        pointHoverBorderWidth: 3, borderWidth: 2.5,
      },
      {
        label: t('dashboard.chart.lastYear'),
        data: [15200, 18100, 16900, 20400, 23200, 21800, 25100, 27300, 24600, 29800, 26400, 38100],
        borderColor: 'rgb(209, 213, 219)', backgroundColor: 'transparent',
        fill: false, tension: 0.4, pointRadius: 0, borderWidth: 2, borderDash: [5, 5],
      },
    ],
  };

  const categoryChartData = {
    labels: [t('cat.beverages'), t('cat.meat'), t('cat.dairy'), t('cat.bakery'), t('cat.produce'), t('cat.household')],
    datasets: [{
      data: [28, 22, 18, 14, 12, 6],
      backgroundColor: ['rgb(99,102,241)', 'rgb(239,68,68)', 'rgb(245,158,11)', 'rgb(16,185,129)', 'rgb(236,72,153)', 'rgb(14,165,233)'],
      borderWidth: 0, hoverOffset: 8,
    }],
  };

  const weeklySalesData = {
    labels: [t('dashboard.days.mon'), t('dashboard.days.tue'), t('dashboard.days.wed'), t('dashboard.days.thu'), t('dashboard.days.fri'), t('dashboard.days.sat'), t('dashboard.days.sun')],
    datasets: [{
      label: t('dashboard.chart.sales'),
      data: [4200, 3800, 5100, 4800, 6200, 7800, 3100],
      backgroundColor: ['rgba(59,130,246,0.8)','rgba(59,130,246,0.8)','rgba(59,130,246,0.8)','rgba(59,130,246,0.8)','rgba(59,130,246,0.8)','rgba(34,197,94,0.8)','rgba(59,130,246,0.4)'],
      borderRadius: 8, borderSkipped: false as const,
    }],
  };

  const chartOptions = {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: 'rgb(17,24,39)', padding: 12, cornerRadius: 8 } },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 12 } } },
      y: { grid: { color: 'rgba(0,0,0,0.05)' }, ticks: { font: { size: 12 }, callback: (v: unknown) => '$' + (Number(v) / 1000).toFixed(1) + 'k' } },
    },
  };

  return (
    <div>
      <PageHeader
        title={t('dashboard.title')}
        subtitle={t('dashboard.subtitle')}
        breadcrumbs={[{ label: t('nav.dashboard') }]}
      >
        <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
          <svg style={{ width: '16px', height: '16px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {t('dashboard.exportReport')}
        </button>
      </PageHeader>

      {/* Stats cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
        {statCards.map((card, i) => (
          <div
            key={card.key}
            className="card animate-fade-in-up"
            style={{ padding: '1.25rem', animationDelay: `${i * 0.08}s`, opacity: 0 }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
              <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: 'rgb(var(--text-secondary))', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {t(card.titleKey)}
              </p>
              <div style={{
                width: '36px', height: '36px', borderRadius: '10px',
                background: card.gradient,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: `0 4px 12px rgb(${card.color} / 0.3)`,
              }}>
                <svg style={{ width: '18px', height: '18px', color: 'white' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={card.icon} />
                </svg>
              </div>
            </div>
            {isLoading ? (
              <><div className="skeleton" style={{ height: '28px', width: '60%', marginBottom: '0.5rem' }} />
              <div className="skeleton" style={{ height: '14px', width: '40%' }} /></>
            ) : (
              <>
                <p style={{ margin: '0 0 0.375rem', fontSize: '1.75rem', fontWeight: 800, color: 'rgb(var(--text-primary))', letterSpacing: '-0.02em' }}>
                  {card.value}
                </p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: card.trend > 0 ? 'rgb(var(--accent-success))' : 'rgb(var(--accent-danger))' }}>
                  {card.trend > 0 ? '↑' : '↓'} {Math.abs(card.trend)}% {t('dashboard.vsLastMonth')}
                </p>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Charts row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        {/* Revenue chart */}
        <div className="card dashboard-grid-2" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{t('dashboard.salesOverview')}</h2>
            <span style={{ fontSize: '0.75rem', color: 'rgb(var(--text-secondary))', fontWeight: 500 }}>{t('dashboard.monthly')}</span>
          </div>
          {isLoading ? <div className="skeleton" style={{ height: '200px' }} /> : (
            <div style={{ height: '200px' }}>
              <Line data={revenueChartData} options={{ ...chartOptions, plugins: { ...chartOptions.plugins, legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 12, padding: 16 } } } } as never} />
            </div>
          )}
        </div>

        {/* Category doughnut */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{t('dashboard.salesByCategory')}</h2>
          {isLoading ? <div className="skeleton" style={{ height: '200px' }} /> : (
            <div style={{ height: '200px' }}>
              <Doughnut data={categoryChartData} options={{ responsive: true, maintainAspectRatio: false, cutout: '68%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, padding: 12, font: { size: 11 } } }, tooltip: { backgroundColor: 'rgb(17,24,39)', padding: 12, cornerRadius: 8 } } }} />
            </div>
          )}
        </div>
      </div>

      {/* Charts row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
        {/* Weekly sales bar */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{t('dashboard.weeklySales')}</h2>
          {isLoading ? <div className="skeleton" style={{ height: '180px' }} /> : (
            <div style={{ height: '180px' }}>
              <Bar data={weeklySalesData} options={chartOptions as never} />
            </div>
          )}
        </div>

        {/* Top products */}
        <div className="card" style={{ padding: '1.25rem' }}>
          <h2 style={{ margin: '0 0 1rem', fontSize: '1rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{t('dashboard.topProducts')}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    <div className="skeleton" style={{ width: '36px', height: '36px', borderRadius: '0.5rem', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div className="skeleton" style={{ height: '12px', width: '60%', marginBottom: '0.25rem' }} />
                      <div className="skeleton" style={{ height: '10px', width: '40%' }} />
                    </div>
                  </div>
                ))
              : TOP_PRODUCTS.map((product, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '0.5rem', flexShrink: 0,
                      background: product.color + '22', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: product.color }} />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ margin: 0, fontSize: '0.8125rem', fontWeight: 600, color: 'rgb(var(--text-primary))', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {product.name}
                      </p>
                      <p style={{ margin: 0, fontSize: '0.75rem', color: 'rgb(var(--text-secondary))' }}>
                        {product.sold} {t('dashboard.sold')} · ${product.revenue.toFixed(0)}
                      </p>
                    </div>
                    <span style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'rgb(var(--text-primary))', flexShrink: 0 }}>
                      #{i + 1}
                    </span>
                  </div>
                ))}
          </div>
        </div>
      </div>

      {/* Recent sales table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem', borderBottom: '1px solid rgb(var(--border-primary))', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, fontSize: '1rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>{t('dashboard.recentSales')}</h2>
          <button style={{ fontSize: '0.8125rem', color: 'rgb(var(--text-link))', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 500, fontFamily: 'var(--font-sans)' }}>
            {t('dashboard.viewAll')}
          </button>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgb(var(--border-primary))', background: 'rgb(var(--bg-secondary))' }}>
                {['common.invoice', 'common.customer', 'common.amount', 'common.status', 'common.date'].map((key) => (
                  <th key={key} style={{ padding: '0.75rem 1.25rem', textAlign: 'start', fontSize: '0.75rem', fontWeight: 700, color: 'rgb(var(--text-secondary))', textTransform: 'uppercase', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
                    {t(key)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array.from({ length: 4 }).map((_, i) => (
                    <tr key={i}>{Array.from({ length: 5 }).map((__, j) => (<td key={j} style={{ padding: '0.875rem 1.25rem' }}><div className="skeleton" style={{ height: '14px' }} /></td>))}</tr>
                  ))
                : RECENT_SALES.map((sale, i) => (
                    <tr
                      key={sale.id}
                      style={{ borderBottom: i < RECENT_SALES.length - 1 ? '1px solid rgb(var(--border-primary))' : 'none', transition: 'background 0.1s' }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = 'rgb(var(--bg-hover))')}
                      onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                    >
                      <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', fontWeight: 600, color: 'rgb(var(--text-link))' }}>{sale.invoiceNumber}</td>
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgb(var(--accent-primary-light))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <span style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'rgb(var(--accent-primary))' }}>{getInitials(sale.customerName)}</span>
                          </div>
                          <span style={{ fontSize: '0.875rem', color: 'rgb(var(--text-primary))', fontWeight: 500 }}>{sale.customerName}</span>
                        </div>
                      </td>
                      <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', fontWeight: 700, color: 'rgb(var(--text-primary))' }}>${sale.total.toFixed(2)}</td>
                      <td style={{ padding: '0.875rem 1.25rem' }}>
                        <span className={getStatusBadge(sale.status)}>
                          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }} />
                          {t(`sales.${sale.status.toLowerCase()}`) || sale.status}
                        </span>
                      </td>
                      <td style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', color: 'rgb(var(--text-secondary))' }}>{sale.date}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
