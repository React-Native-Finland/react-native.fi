import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { siteConfig } from '@/constant/config';
import { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'jobs' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/jobs`,
      languages: {
        en: `${siteConfig.url}/en/jobs`,
        fi: `${siteConfig.url}/fi/jobs`,
      },
    },
  };
}

export default async function JobsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('jobs');

  const alternatives = [
    {
      title: t('alternatives.0.title'),
      description: t('alternatives.0.description'),
      cta: t('alternatives.0.cta'),
      href: t('alternatives.0.href'),
      isExternal: false,
    },
    {
      title: t('alternatives.1.title'),
      description: t('alternatives.1.description'),
      cta: t('alternatives.1.cta'),
      href: t('alternatives.1.href'),
      isExternal: false,
    },
    {
      title: t('alternatives.2.title'),
      description: t('alternatives.2.description'),
      cta: t('alternatives.2.cta'),
      href: t('alternatives.2.href'),
      isExternal: true,
    },
  ];

  return (
    <div className='bg-white'>
      {/* Hero Section */}
      <div className='bg-gradient-to-b from-indigo-50 to-white py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h1 className='text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
              {t('title')}
            </h1>
            <p className='mt-2 text-lg font-medium text-indigo-600'>
              {t('subtitle')}
            </p>
            <p className='mt-6 text-lg text-gray-600'>{t('description')}</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Section */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <div className='inline-flex items-center rounded-full bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700'>
              {t('comingSoon')}
            </div>
            <p className='mt-6 text-lg text-gray-600'>
              {t('comingSoonDescription')}
            </p>
          </div>

          {/* Alternatives Grid */}
          <div className='mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3'>
            {alternatives.map((item, index) => (
              <div
                key={index}
                className='flex flex-col rounded-2xl bg-gray-50 p-8'
              >
                <h3 className='text-lg font-semibold text-gray-900'>
                  {item.title}
                </h3>
                <p className='mt-2 flex-grow text-sm text-gray-600'>
                  {item.description}
                </p>
                {item.isExternal ? (
                  <a
                    href={item.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='mt-4 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    {item.cta}
                    <svg
                      className='ml-1 h-4 w-4'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                      />
                    </svg>
                  </a>
                ) : (
                  <Link
                    href={item.href as '/developers' | '/events'}
                    className='mt-4 inline-flex text-sm font-semibold text-indigo-600 hover:text-indigo-500'
                  >
                    {item.cta}
                    <span aria-hidden='true' className='ml-1'>
                      &rarr;
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notify Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
              {t('notify')}
            </h2>
            <p className='mt-6 text-lg text-gray-600'>
              {t('notifyDescription')}
            </p>
            <div className='mt-10'>
              <a
                href='https://meetup.com/react-native-helsinki'
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Join on Meetup
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
