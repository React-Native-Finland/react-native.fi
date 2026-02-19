'use client';

import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';

import { Link, usePathname } from '@/i18n/navigation';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const t = useTranslations('nav');

  // Track scroll position for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: t('events'), href: '/events' },
    { name: t('articles'), href: '/articles' },
    { name: t('developers'), href: '/developers' },
  ];

  // Determine if we're on a dark hero page (home)
  const isHome = pathname === '/';
  const showDarkMode = isHome && !scrolled;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 shadow-sm backdrop-blur-xl'
          : showDarkMode
            ? 'bg-transparent'
            : 'bg-white/80 backdrop-blur-md'
      }`}
    >
      <nav
        aria-label='Global'
        className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8'
      >
        {/* Logo */}
        <div className='flex lg:flex-1'>
          <Link href='/' className='group -m-1.5 flex items-center gap-3 p-1.5'>
            <span className='sr-only'>{t('siteName')}</span>
            {/* Logo mark */}
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-300 ${
                showDarkMode
                  ? 'bg-white/10 group-hover:bg-white/20'
                  : 'bg-[rgb(var(--finnish-blue))] group-hover:bg-[rgb(var(--finnish-blue-dark))]'
              }`}
            >
              <span
                className={`font-mono text-sm font-bold ${showDarkMode ? 'text-white' : 'text-white'}`}
              >
                RN
              </span>
            </div>
            {/* Logo text */}
            <div className='hidden sm:block'>
              <div
                className={`font-mono text-sm font-bold tracking-tight transition-colors ${
                  showDarkMode ? 'text-white' : 'text-[rgb(var(--mono-900))]'
                }`}
              >
                React Native
              </div>
              <div
                className={`font-mono text-xs font-medium ${
                  showDarkMode
                    ? 'text-[rgb(var(--accent-frost))]'
                    : 'text-[rgb(var(--finnish-blue))]'
                }`}
              >
                Finland
              </div>
            </div>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className='flex lg:hidden'>
          <button
            type='button'
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 transition-colors ${
              showDarkMode
                ? 'text-white hover:bg-white/10'
                : 'text-[rgb(var(--mono-700))] hover:bg-[rgb(var(--mono-100))]'
            }`}
          >
            <span className='sr-only'>{t('openMenu')}</span>
            <Bars3Icon aria-hidden='true' className='h-6 w-6' />
          </button>
        </div>

        {/* Desktop navigation */}
        <div className='hidden lg:flex lg:gap-x-1'>
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`relative rounded-full px-4 py-2 font-mono text-sm font-medium transition-all duration-200 ${
                  showDarkMode
                    ? isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                    : isActive
                      ? 'bg-[rgb(var(--mono-100))] text-[rgb(var(--finnish-blue))]'
                      : 'text-[rgb(var(--mono-600))] hover:bg-[rgb(var(--mono-100))] hover:text-[rgb(var(--mono-900))]'
                }`}
              >
                {item.name}
                {isActive && (
                  <span
                    className={`absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full ${
                      showDarkMode
                        ? 'bg-[rgb(var(--accent-frost))]'
                        : 'bg-[rgb(var(--finnish-blue))]'
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Right side - CTA & Language */}
        <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:gap-x-4'>
          <LanguageSwitcher />
          <a
            href='https://meetup.com/react-native-helsinki'
            target='_blank'
            rel='noopener noreferrer'
            className={`rounded-full px-4 py-2 font-mono text-sm font-semibold transition-all duration-200 ${
              showDarkMode
                ? 'bg-white text-[rgb(var(--navy-950))] hover:bg-white/90 hover:shadow-lg'
                : 'bg-[rgb(var(--finnish-blue))] text-white hover:bg-[rgb(var(--finnish-blue-dark))] hover:shadow-md'
            }`}
          >
            Join Meetup
          </a>
        </div>
      </nav>

      {/* Mobile menu */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className='lg:hidden'
      >
        <div className='fixed inset-0 z-50 bg-black/20 backdrop-blur-sm' />
        <DialogPanel className='fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-[rgb(var(--mono-200))]'>
          <div className='flex items-center justify-between'>
            <Link
              href='/'
              onClick={() => setMobileMenuOpen(false)}
              className='group -m-1.5 flex items-center gap-3 p-1.5'
            >
              <div className='flex h-9 w-9 items-center justify-center rounded-lg bg-[rgb(var(--finnish-blue))]'>
                <span className='font-mono text-sm font-bold text-white'>
                  RN
                </span>
              </div>
              <div>
                <div className='font-mono text-sm font-bold text-[rgb(var(--mono-900))]'>
                  React Native
                </div>
                <div className='font-mono text-xs font-medium text-[rgb(var(--finnish-blue))]'>
                  Finland
                </div>
              </div>
            </Link>
            <button
              type='button'
              onClick={() => setMobileMenuOpen(false)}
              className='-m-2.5 rounded-lg p-2.5 text-[rgb(var(--mono-700))] hover:bg-[rgb(var(--mono-100))]'
            >
              <span className='sr-only'>{t('closeMenu')}</span>
              <XMarkIcon aria-hidden='true' className='h-6 w-6' />
            </button>
          </div>
          <div className='mt-8 flow-root'>
            <div className='-my-6 divide-y divide-[rgb(var(--mono-200))]'>
              <div className='space-y-1 py-6'>
                {navigation.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block rounded-lg px-4 py-3 font-mono text-base font-semibold transition-colors ${
                        isActive
                          ? 'bg-[rgb(var(--finnish-blue)/0.1)] text-[rgb(var(--finnish-blue))]'
                          : 'text-[rgb(var(--mono-900))] hover:bg-[rgb(var(--mono-100))]'
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </div>
              <div className='py-6'>
                <a
                  href='https://meetup.com/react-native-helsinki'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='mb-4 block rounded-full bg-[rgb(var(--finnish-blue))] px-4 py-3 text-center font-mono text-sm font-semibold text-white'
                >
                  Join Meetup
                </a>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
};
