import i18n from 'i18n-js';
import * as Localization from 'expo-localization';
import en from './en'
import es from './es'

// Set the locale once at the beginning of your app.
i18n.locale = Localization.locale || 'en';

// When a value is missing from a language it'll fallback to another language with the key present.
i18n.fallbacks = true;
i18n.translations = {
  en,
  es,
};

export default i18n;