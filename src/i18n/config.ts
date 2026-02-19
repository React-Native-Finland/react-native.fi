export const locales = ['en', 'fi'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

// 'always' means /en/... and /fi/... prefixes are always shown
export const localePrefix = 'always' as const;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  fi: 'Suomi',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  fi: '🇫🇮',
};
