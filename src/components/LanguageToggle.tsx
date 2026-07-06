"use client";

/**
 * components — LanguageToggle. Switches locale (English / Amharic) via i18n.
 */

import { useTranslation } from "@/hooks/use-translation";
import { Button } from "@/components/ui/Button";

export function LanguageToggle() {
  const { locale, setLocale } = useTranslation();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLocale(locale === "en" ? "am" : "en")}
      aria-label="Toggle language"
    >
      {locale === "en" ? "አማ" : "EN"}
    </Button>
  );
}
