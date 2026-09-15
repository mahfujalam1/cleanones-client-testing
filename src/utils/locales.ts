/** Supported UI locales for the client portal. */
export const SUPPORTED_LOCALES = [
  "en",
  "nl",
  "fr",
  "es",
  "pl",
  "uk",
  "pt",
  "ar",
] as const;

export type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: AppLocale = "en";

export function isSupportedLocale(value: string | null | undefined): value is AppLocale {
  return Boolean(value && (SUPPORTED_LOCALES as readonly string[]).includes(value));
}
