'use client';

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon, GlobeAltIcon } from '@heroicons/react/20/solid';
import { useLocale } from 'next-intl';

import { Locale, localeNames, locales } from '@/i18n/config';
import { usePathname, useRouter } from '@/i18n/navigation';

const localeLabels: Record<Locale, string> = {
  en: 'EN',
  fi: 'FI',
};

export function LanguageSwitcher({ darkMode = false }: { darkMode?: boolean }) {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Menu as='div' className='relative'>
      <MenuButton
        className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-sm font-medium transition-all duration-200 ${
          darkMode
            ? 'text-white/80 hover:bg-white/10 hover:text-white'
            : 'text-[rgb(var(--mono-600))] hover:bg-[rgb(var(--mono-100))] hover:text-[rgb(var(--mono-900))]'
        }`}
      >
        <GlobeAltIcon className='h-4 w-4' />
        <span>{localeLabels[locale]}</span>
        <ChevronDownIcon className='h-3.5 w-3.5 opacity-60' />
      </MenuButton>

      <MenuItems
        transition
        anchor='bottom end'
        className='z-[60] mt-2 w-36 origin-top-right rounded-xl bg-white p-1 shadow-lg ring-1 ring-black/5 transition duration-150 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0'
      >
        {locales.map((l) => (
          <MenuItem key={l}>
            <button
              onClick={() => switchLocale(l)}
              className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 font-mono text-sm transition-colors ${
                locale === l
                  ? 'bg-[rgb(var(--finnish-blue)/0.08)] font-semibold text-[rgb(var(--finnish-blue))]'
                  : 'text-[rgb(var(--mono-700))] data-[focus]:bg-[rgb(var(--mono-100))]'
              }`}
            >
              <span className='font-semibold'>{localeLabels[l]}</span>
              <span className='text-[rgb(var(--mono-500))]'>
                {localeNames[l]}
              </span>
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
