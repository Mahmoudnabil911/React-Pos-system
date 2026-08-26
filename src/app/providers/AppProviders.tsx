import { useEffect } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { useTranslation } from 'react-i18next';

export function AppProviders({ children }: { children: React.ReactNode }) {
  const { loadAuthFromStorage, setTheme } = useAppStore();
  const { i18n } = useTranslation();

  useEffect(() => {
    loadAuthFromStorage();
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) setTheme(savedTheme);
  }, [loadAuthFromStorage, setTheme]);

  useEffect(() => {
    const locale = i18n.language || 'en';
    const direction = locale === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', locale === 'ar' ? 'ar' : 'en');
    useAppStore.setState({ locale: locale as 'en' | 'ar', direction });
  }, [i18n.language]);

  return <>{children}</>;
}
