"use client";

/**
 * Dictionaries — i18next client instance.
 *
 * Initializes react-i18next once with the English/Amharic resources. Consumed by
 * `I18nProvider` and the `useTranslation` hook.
 */

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./locales/en";
import { am } from "./locales/am";

if (!i18n.isInitialized) {
  void i18n.use(initReactI18next).init({
    resources: {
      en: { translation: en },
      am: { translation: am },
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export default i18n;
