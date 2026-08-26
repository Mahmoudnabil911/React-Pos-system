import { Outlet } from 'react-router-dom';
import Sidebar from '../components/shared/Sidebar';
import Header from '../components/shared/Header';
import { useAppStore } from '../store/useAppStore';

export default function MainLayout() {
  const { sidebarMobileOpen, closeMobileSidebar } = useAppStore();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'rgb(var(--bg-secondary))' }}>
      {/* Mobile overlay */}
      {sidebarMobileOpen && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgb(var(--bg-overlay))',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
          }}
          onClick={closeMobileSidebar}
        />
      )}

      <Sidebar />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header />
        <main style={{ flex: 1, padding: '1.5rem', overflowAuto: 'auto' } as React.CSSProperties}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
