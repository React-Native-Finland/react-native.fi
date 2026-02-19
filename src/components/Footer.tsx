'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');

  const currentYear = new Date().getFullYear();

  return (
    <footer className='border-t border-[rgb(var(--mono-200))] bg-white'>
      <div className='mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20'>
        {/* Top section */}
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-4 lg:gap-8'>
          {/* Brand column */}
          <div className='lg:col-span-2'>
            <Link href='/' className='group inline-flex items-center gap-3'>
              <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-[rgb(var(--finnish-blue))] transition-colors group-hover:bg-[rgb(var(--finnish-blue-dark))]'>
                <span className='font-mono text-sm font-bold text-white'>
                  RN
                </span>
              </div>
              <div>
                <div className='font-mono text-base font-bold text-[rgb(var(--mono-900))]'>
                  React Native Finland
                </div>
                <div className='font-mono text-xs text-[rgb(var(--mono-500))]'>
                  {t('tagline')}
                </div>
              </div>
            </Link>
            <p className='mt-6 max-w-md text-sm leading-6 text-[rgb(var(--mono-600))]'>
              Building the React Native community in Finland since 2018. Join
              our meetups, learn from articles, and connect with fellow
              developers.
            </p>

            {/* Social links */}
            <div className='mt-6 flex items-center gap-4'>
              <a
                href='https://meetup.com/react-native-helsinki'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--mono-100))] text-[rgb(var(--mono-600))] transition-all hover:bg-[rgb(var(--finnish-blue))] hover:text-white'
                aria-label='Meetup'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M6.98.555a.518.518 0 0 0-.105.011.53.53 0 1 0 .222 1.04.533.533 0 0 0 .408-.634.53.53 0 0 0-.525-.417zm6.455.638a.984.984 0 0 0-.955.957.98.98 0 0 0 .97 1.006.98.98 0 0 0 .983-.982.984.984 0 0 0-.998-.98zm6.982 1.792a.74.74 0 0 0-.748.74.74.74 0 0 0 .74.748.74.74 0 0 0 .748-.74.74.74 0 0 0-.74-.748zm-14.653.792c-.841-.004-1.634.395-2.134 1.09-.5.693-.63 1.583-.35 2.392L5.28 13.76a2.803 2.803 0 0 0 2.625 1.873c.275 0 .55-.037.818-.115a2.812 2.812 0 0 0 1.983-1.796l2.267-6.269 1.264 4.473a2.804 2.804 0 0 0 2.174 1.992 2.8 2.8 0 0 0 2.742-1.11l4.054-5.565a.524.524 0 0 0-.118-.733.528.528 0 0 0-.736.115l-4.053 5.568a1.77 1.77 0 0 1-1.723.697 1.762 1.762 0 0 1-1.367-1.253l-1.563-5.53a.52.52 0 0 0-.5-.376.52.52 0 0 0-.501.376l-2.618 7.244a1.769 1.769 0 0 1-1.247 1.13 1.766 1.766 0 0 1-1.637-.436 1.765 1.765 0 0 1-.527-1.547l1.992-6.5c.172-.57.102-1.19-.193-1.703a1.987 1.987 0 0 0-1.366-.96 2.04 2.04 0 0 0-.358-.02z' />
                </svg>
              </a>
              <a
                href='https://github.com/react-native-helsinki'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--mono-100))] text-[rgb(var(--mono-600))] transition-all hover:bg-[rgb(var(--mono-900))] hover:text-white'
                aria-label='GitHub'
              >
                <svg
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
                </svg>
              </a>
              <a
                href='https://twitter.com/plahteenlahti'
                target='_blank'
                rel='noopener noreferrer'
                className='flex h-10 w-10 items-center justify-center rounded-full bg-[rgb(var(--mono-100))] text-[rgb(var(--mono-600))] transition-all hover:bg-[rgb(var(--mono-900))] hover:text-white'
                aria-label='Twitter/X'
              >
                <svg
                  className='h-4 w-4'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation columns */}
          <div>
            <h3 className='font-mono text-xs font-semibold uppercase tracking-wider text-[rgb(var(--mono-900))]'>
              Explore
            </h3>
            <ul className='mt-4 space-y-3'>
              <li>
                <Link
                  href='/events'
                  className='text-sm text-[rgb(var(--mono-600))] transition-colors hover:text-[rgb(var(--finnish-blue))]'
                >
                  {tNav('events')}
                </Link>
              </li>
              <li>
                <Link
                  href='/articles'
                  className='text-sm text-[rgb(var(--mono-600))] transition-colors hover:text-[rgb(var(--finnish-blue))]'
                >
                  {tNav('articles')}
                </Link>
              </li>
              <li>
                <Link
                  href='/developers'
                  className='text-sm text-[rgb(var(--mono-600))] transition-colors hover:text-[rgb(var(--finnish-blue))]'
                >
                  {tNav('developers')}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className='font-mono text-xs font-semibold uppercase tracking-wider text-[rgb(var(--mono-900))]'>
              Resources
            </h3>
            <ul className='mt-4 space-y-3'>
              <li>
                <Link
                  href='/conferences'
                  className='text-sm text-[rgb(var(--mono-600))] transition-colors hover:text-[rgb(var(--finnish-blue))]'
                >
                  RN Conferences 2026
                </Link>
              </li>
              <li>
                <a
                  href='https://studies.helsinki.fi/kurssit/toteutus/otm-e859336d-9d63-47ac-9906-a7da74cae32d'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-[rgb(var(--mono-600))] transition-colors hover:text-[rgb(var(--finnish-blue))]'
                >
                  MOOC Course
                </a>
              </li>
              <li>
                <a
                  href='https://reactnative.dev'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-[rgb(var(--mono-600))] transition-colors hover:text-[rgb(var(--finnish-blue))]'
                >
                  React Native Docs
                </a>
              </li>
              <li>
                <a
                  href='https://expo.dev'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-sm text-[rgb(var(--mono-600))] transition-colors hover:text-[rgb(var(--finnish-blue))]'
                >
                  Expo
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className='mt-12 border-t border-[rgb(var(--mono-200))] pt-8'>
          <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
            <p className='text-sm text-[rgb(var(--mono-500))]'>
              &copy; {currentYear} React Native Finland. {t('builtBy')}{' '}
              <a
                href='https://perttu.dev'
                rel='author'
                className='font-medium text-[rgb(var(--finnish-blue))] transition-colors hover:text-[rgb(var(--finnish-blue-dark))]'
              >
                Perttu Lähteenlahti
              </a>
            </p>
            <div className='flex items-center gap-4'>
              <span className='font-mono text-xs text-[rgb(var(--mono-400))]'>
                Made in Helsinki
              </span>
              <span className='text-[rgb(var(--mono-300))]'>•</span>
              <span className='font-mono text-xs text-[rgb(var(--mono-400))]'>
                Built with Next.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
