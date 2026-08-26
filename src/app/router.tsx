import { createBrowserRouter, Navigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';

// Layouts
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import PosLayout from '../layouts/PosLayout';

// Pages
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import ForgotPassword from '../features/auth/pages/ForgotPassword';
import Dashboard from '../features/dashboard/pages/Dashboard';
import Pos from '../features/pos/pages/Pos';
import Sales from '../features/sales/pages/Sales';
import Purchases from '../features/purchases/pages/Purchases';
import Products from '../features/products/pages/Products';
import Categories from '../features/categories/pages/Categories';
import Inventory from '../features/inventory/pages/Inventory';
import Customers from '../features/customers/pages/Customers';
import Suppliers from '../features/suppliers/pages/Suppliers';
import Expenses from '../features/expenses/pages/Expenses';
import Employees from '../features/employees/pages/Employees';
import Invoices from '../features/invoices/pages/Invoices';
import Reports from '../features/reports/pages/Reports';
import Notifications from '../features/notifications/pages/Notifications';
import Settings from '../features/settings/pages/Settings';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const authReady = useAppStore((s) => s.authReady);
  if (!authReady) return null; // Wait for storage to be read
  if (!isAuthenticated) return <Navigate to="/auth/login" replace />;
  return <>{children}</>;
}

function PublicGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppStore((s) => s.isAuthenticated);
  const authReady = useAppStore((s) => s.authReady);
  if (!authReady) return null; // Wait for storage to be read
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

export const router = createBrowserRouter([
  {
    path: '/auth',
    element: <PublicGuard><AuthLayout /></PublicGuard>,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    path: '/pos',
    element: <AuthGuard><PosLayout /></AuthGuard>,
    children: [
      { index: true, element: <Pos /> },
    ],
  },
  {
    path: '/',
    element: <AuthGuard><MainLayout /></AuthGuard>,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'sales', element: <Sales /> },
      { path: 'purchases', element: <Purchases /> },
      { path: 'products', element: <Products /> },
      { path: 'categories', element: <Categories /> },
      { path: 'inventory', element: <Inventory /> },
      { path: 'customers', element: <Customers /> },
      { path: 'suppliers', element: <Suppliers /> },
      { path: 'expenses', element: <Expenses /> },
      { path: 'employees', element: <Employees /> },
      { path: 'invoices', element: <Invoices /> },
      { path: 'reports', element: <Reports /> },
      { path: 'notifications', element: <Notifications /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
]);
