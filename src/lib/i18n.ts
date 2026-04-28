import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import commonEn from '../../public/locales/en-US/common.json';
import homeEn from '../../public/locales/en-US/home.json';
import paymentEn from '../../public/locales/en-US/payment.json';
import commonEs from '../../public/locales/es-ES/common.json';
import homeEs from '../../public/locales/es-ES/home.json';
import paymentEs from '../../public/locales/es-ES/payment.json';
import commonPt from '../../public/locales/pt-BR/common.json';
import homePt from '../../public/locales/pt-BR/home.json';
import paymentPt from '../../public/locales/pt-BR/payment.json';

export const SUPPORTED = ['en-US', 'pt-BR', 'es-ES'] as const;
export type SupportedLocale = (typeof SUPPORTED)[number];

const LOCALE_COOKIE = 'nexploring-lang';

export function getPersistedLocale(): SupportedLocale {
  try {
    // html[lang] is set by the server (RootLayout reads the cookie via next/headers)
    // so this gives us the correct locale even before the cookie is readable client-side.
    const htmlLang = document.documentElement.lang;
    if (htmlLang && (SUPPORTED as readonly string[]).includes(htmlLang)) {
      return htmlLang as SupportedLocale;
    }
    // Fallback: read cookie directly (works after client-side navigation resets html[lang]).
    const match = document.cookie.split(';').find((c) => c.trim().startsWith(`${LOCALE_COOKIE}=`));
    const cookieLang = match?.split('=')?.[1]?.trim();
    if (cookieLang && (SUPPORTED as readonly string[]).includes(cookieLang)) {
      return cookieLang as SupportedLocale;
    }
  } catch {
    // SSR or restricted environment
  }
  return 'en-US';
}

export function persistLocale(locale: SupportedLocale) {
  try {
    if (locale === 'en-US') {
      document.cookie = `${LOCALE_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
    } else {
      document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${365 * 24 * 3600}; SameSite=Lax`;
    }
  } catch {
    // Restricted environment
  }
}

// All locales are bundled inline so:
// 1. SSR and client both start with 'en-US' (no hydration mismatch on translated text).
// 2. changeLanguage() is synchronous — no network round-trip, no flash.
// LocaleSync (in AppProviders) calls changeLanguage() after hydration to apply the user's locale.
i18n.use(initReactI18next).init({
  lng: 'en-US',
  fallbackLng: 'en-US',
  supportedLngs: SUPPORTED,
  ns: ['common', 'home', 'payment'],
  defaultNS: 'common',
  resources: {
    'en-US': { common: commonEn, home: homeEn, payment: paymentEn },
    'pt-BR': { common: commonPt, home: homePt, payment: paymentPt },
    'es-ES': { common: commonEs, home: homeEs, payment: paymentEs },
  },
  interpolation: { escapeValue: false },
});

export default i18n;
