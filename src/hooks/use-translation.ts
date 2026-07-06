"use client";

/**
 * hooks — useTranslation.
 *
 * Thin wrapper over react-i18next so features import translation from one place.
 * Provides `t()` plus the current locale and a switcher. Requires the i18n
 * client instance (see `src/dictionaries/client.ts`) mounted via `I18nProvider`.
 */

import { useTranslation as useI18n } from "react-i18next";

export function useTranslation(namespace?: string) {
  const { t, i18n } = useI18n(namespace);
  return {
    t,
    locale: i18n.language,
    setLocale: (lng: string) => i18n.changeLanguage(lng),
  };
}
