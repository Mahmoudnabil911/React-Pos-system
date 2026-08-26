import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  sortable?: boolean;
}

interface DataTableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  isLoading?: boolean;
  searchPlaceholder?: string;
  pageSize?: number;
}

export default function DataTable<T extends Record<string, unknown>>({
  columns, data, isLoading = false,   searchPlaceholder, pageSize = 10,
}: DataTableProps<T>) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc');
  const { t } = useTranslation();

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return data.filter((row) =>
      !q || Object.values(row).some((v) => String(v).toLowerCase().includes(q))
    );
  }, [data, search]);

  const sorted = useMemo(() => {
    if (!sortKey) return filtered;
    return [...filtered].sort((a, b) => {
      const av = String(a[sortKey] ?? '');
      const bv = String(b[sortKey] ?? '');
      return sortDir === 'asc' ? av.localeCompare(bv) : bv.localeCompare(av);
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  const handleSort = (key: string) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
    setPage(1);
  };

  const handleSearch = (v: string) => { setSearch(v); setPage(1); };

  return (
    <div className="card" style={{ overflow: 'hidden' }}>
      {/* Search */}
      <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid rgb(var(--border-primary))' }}>
        <div style={{ position: 'relative', maxWidth: '320px' }}>
          <svg style={{
            position: 'absolute', insetInlineStart: '0.75rem', top: '50%', transform: 'translateY(-50%)',
            width: '16px', height: '16px', color: 'rgb(var(--text-tertiary))',
            pointerEvents: 'none',
          }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            className="input-base"
            style={{ paddingInlineStart: '2.25rem' }}
            placeholder={searchPlaceholder || t('header.search')}
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgb(var(--border-primary))' }}>
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable !== false && handleSort(col.key)}
                  style={{
                    padding: '0.75rem 1.25rem', textAlign: 'start',
                    fontSize: '0.75rem', fontWeight: 700,
                    color: 'rgb(var(--text-secondary))',
                    textTransform: 'uppercase', letterSpacing: '0.05em',
                    cursor: col.sortable !== false ? 'pointer' : 'default',
                    whiteSpace: 'nowrap',
                    background: 'rgb(var(--bg-secondary))',
                    userSelect: 'none',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    {col.label}
                    {col.sortable !== false && sortKey === col.key && (
                      <svg style={{ width: '12px', height: '12px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d={sortDir === 'asc' ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'} />
                      </svg>
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={col.key} style={{ padding: '0.875rem 1.25rem' }}>
                      <div className="skeleton" style={{ height: '14px', width: '80%' }} />
                    </td>
                  ))}
                </tr>
              ))
            ) : paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length}>
                  <div style={{
                    padding: '3rem', textAlign: 'center',
                    color: 'rgb(var(--text-secondary))', fontSize: '0.875rem',
                  }}>
                    {search ? (t('common.noResults') || 'No results found') : (t('common.noData') || 'No data available')}
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < paginated.length - 1 ? '1px solid rgb(var(--border-primary))' : 'none',
                    transition: 'background 0.1s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgb(var(--bg-hover))')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
                >
                  {columns.map((col) => (
                    <td key={col.key} style={{ padding: '0.875rem 1.25rem', fontSize: '0.875rem', color: 'rgb(var(--text-primary))' }}>
                      {col.render ? col.render(row) : String(row[col.key] ?? '')}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!isLoading && totalPages > 1 && (
        <div style={{
          padding: '0.75rem 1.25rem',
          borderTop: '1px solid rgb(var(--border-primary))',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '0.75rem',
        }}>
          <p style={{ margin: 0, fontSize: '0.8125rem', color: 'rgb(var(--text-secondary))' }}>
            {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, sorted.length)} of {sorted.length}
          </p>
          <div style={{ display: 'flex', gap: '0.25rem' }}>
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              style={{
                padding: '0.375rem 0.75rem', borderRadius: '0.5rem',
                border: '1px solid rgb(var(--border-primary))',
                background: 'none', cursor: page === 1 ? 'not-allowed' : 'pointer',
                color: page === 1 ? 'rgb(var(--text-tertiary))' : 'rgb(var(--text-primary))',
                fontSize: '0.8125rem', fontFamily: 'var(--font-sans)',
              }}
            >
              {t('common.prev') || 'Prev'}
            </button>
            <button
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              style={{
                padding: '0.375rem 0.75rem', borderRadius: '0.5rem',
                border: '1px solid rgb(var(--border-primary))',
                background: 'none', cursor: page === totalPages ? 'not-allowed' : 'pointer',
                color: page === totalPages ? 'rgb(var(--text-tertiary))' : 'rgb(var(--text-primary))',
                fontSize: '0.8125rem', fontFamily: 'var(--font-sans)',
              }}
            >
              {t('common.next') || 'Next'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
