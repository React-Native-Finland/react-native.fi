import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { siteConfig } from '@/constant/config';
import { Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'sponsors' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/sponsors`,
      languages: {
        en: `${siteConfig.url}/en/sponsors`,
        fi: `${siteConfig.url}/fi/sponsors`,
      },
    },
  };
}

export default async function SponsorsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('sponsors');

  const benefits = [
    { title: t('benefits.0.title'), description: t('benefits.0.description') },
    { title: t('benefits.1.title'), description: t('benefits.1.description') },
    { title: t('benefits.2.title'), description: t('benefits.2.description') },
    { title: t('benefits.3.title'), description: t('benefits.3.description') },
  ];

  const packages = [
    {
      name: t('packages.0.name'),
      description: t('packages.0.description'),
      includes: [
        t('packages.0.includes.0'),
        t('packages.0.includes.1'),
        t('packages.0.includes.2'),
        t('packages.0.includes.3'),
      ],
    },
    {
      name: t('packages.1.name'),
      description: t('packages.1.description'),
      includes: [
        t('packages.1.includes.0'),
        t('packages.1.includes.1'),
        t('packages.1.includes.2'),
        t('packages.1.includes.3'),
      ],
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

      {/* Why Sponsor Section */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 className='text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
              {t('whySponsor')}
            </h2>
          </div>
          <div className='mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none'>
            <dl className='grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2'>
              {benefits.map((benefit, index) => (
                <div key={index} className='flex flex-col'>
                  <dt className='text-lg font-semibold text-gray-900'>
                    {benefit.title}
                  </dt>
                  <dd className='mt-2 flex flex-auto flex-col text-base text-gray-600'>
                    <p className='flex-auto'>{benefit.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Packages Section */}
      <div className='bg-gray-50 py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl lg:text-center'>
            <h2 className='text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
              {t('whatYouGet')}
            </h2>
          </div>
          <div className='mx-auto mt-16 grid max-w-lg grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2'>
            {packages.map((pkg, index) => (
              <div
                key={index}
                className='flex flex-col rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-200'
              >
                <h3 className='text-xl font-semibold text-gray-900'>
                  {pkg.name}
                </h3>
                <p className='mt-2 text-sm text-gray-600'>{pkg.description}</p>
                <ul className='mt-6 space-y-3'>
                  {pkg.includes.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className='flex gap-x-3 text-sm text-gray-600'
                    >
                      <svg
                        className='h-5 w-5 flex-none text-indigo-600'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fillRule='evenodd'
                          d='M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z'
                          clipRule='evenodd'
                        />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className='py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl'>
              {t('cta')}
            </h2>
            <p className='mt-6 text-lg text-gray-600'>{t('ctaDescription')}</p>
            <div className='mt-10 flex flex-col items-center gap-4'>
              <a
                href='https://github.com/React-Native-Finland/react-native.fi/discussions'
                target='_blank'
                rel='noopener noreferrer'
                className='rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {t('contactButton')}
              </a>
              <p className='text-sm text-gray-500'>{t('contactEmail')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
