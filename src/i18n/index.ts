import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enCommon from './locales/en/common.json';
import arCommon from './locales/ar/common.json';

const resources = {
  en: { common: enCommon },
  ar: { common: arCommon }
};

const savedLocale = localStorage.getItem('locale') || 'en';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLocale,
    fallbackLng: 'en',
    ns: ['common'],
    defaultNS: 'common',
    keySeparator: false,
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
