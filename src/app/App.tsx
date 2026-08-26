import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AppProviders } from './providers/AppProviders';
import ToastContainer from '../components/shared/ToastContainer';
import '../i18n'; // Initialize i18n

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
      <ToastContainer />
    </AppProviders>
  );
}
