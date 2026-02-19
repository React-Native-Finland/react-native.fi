'use client';

import { useLocale } from 'next-intl';

import { Locale, localeFlags, localeNames, locales } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className='flex items-center gap-2'>
      {locales.map((l) => (
        <button
          key={l}
          onClick={() => switchLocale(l)}
          className={`flex items-center gap-1 rounded-md px-2 py-1 text-sm font-medium transition-colors ${
            locale === l
              ? 'bg-indigo-100 text-indigo-700'
              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
          }`}
          aria-label={localeNames[l]}
        >
          <span>{localeFlags[l]}</span>
          <span className='hidden sm:inline'>{localeNames[l]}</span>
        </button>
      ))}
    </div>
  );
}
