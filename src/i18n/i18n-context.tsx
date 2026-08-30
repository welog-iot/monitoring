import { createContext, useContext, useMemo, type ReactNode } from 'react';

import { DEFAULT_LOCALE, translations, type Locale, type TranslationKey } from '@/i18n/translations';

type I18nContextValue = {
  locale: Locale;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
};

const I18nContext = createContext<I18nContextValue>({
  locale: DEFAULT_LOCALE,
  t: (key) => translations[DEFAULT_LOCALE][key],
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const value = useMemo<I18nContextValue>(
    () => ({
      locale: DEFAULT_LOCALE,
      t: (key, params) => {
        let str = translations[DEFAULT_LOCALE][key] as string;
        if (params) {
          for (const [k, v] of Object.entries(params)) {
            str = str.replace(`{${k}}`, String(v));
          }
        }
        return str;
      },
    }),
    [],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
