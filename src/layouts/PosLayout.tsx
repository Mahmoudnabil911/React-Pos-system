import { Outlet } from 'react-router-dom';

export default function PosLayout() {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: 'rgb(var(--bg-secondary))' }}>
      <Outlet />
    </div>
  );
}
