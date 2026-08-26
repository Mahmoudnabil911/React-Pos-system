import { useNavigate } from 'react-router-dom';

interface Breadcrumb {
  label: string;
  route?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  children?: React.ReactNode;
}

export default function PageHeader({ title, subtitle, breadcrumbs, children }: PageHeaderProps) {
  const navigate = useNavigate();

  return (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem',
      marginBottom: '1.5rem',
    }}>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
            {breadcrumbs.map((crumb, i) => (
              <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                {i > 0 && (
                  <svg className="breadcrumb-sep icon-dir" style={{ width: '12px', height: '12px', color: 'rgb(var(--text-tertiary))' }}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                )}
                {crumb.route ? (
                  <button
                    onClick={() => navigate(crumb.route!)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                      fontSize: '0.75rem', color: 'rgb(var(--text-tertiary))',
                      fontFamily: 'var(--font-sans)',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgb(var(--text-link))')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgb(var(--text-tertiary))')}
                  >
                    {crumb.label}
                  </button>
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'rgb(var(--text-secondary))', fontWeight: 500 }}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800, color: 'rgb(var(--text-primary))', letterSpacing: '-0.02em' }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ margin: '0.25rem 0 0', fontSize: '0.875rem', color: 'rgb(var(--text-secondary))' }}>
            {subtitle}
          </p>
        )}
      </div>
      {children && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          {children}
        </div>
      )}
    </div>
  );
}
