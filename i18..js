import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/assets/translation/en.json';
import ar from './src/assets/translation/ar.json';
import { getValue } from './src/core/storage/storage';

i18n.use(initReactI18next).init({
        resources: {
                en: { translation: en },
                ar: { translation: ar },
        },
        lng: getValue('lang') !== '' ? getValue("lang") : 'en',
        fallbackLng: 'en',
        interpolation: {
                escapeValue: false,
        },
});

export default i18n;
