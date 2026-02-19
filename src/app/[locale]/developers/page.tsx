import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getAllDevelopers } from '@/lib/developers';

import { siteConfig } from '@/constant/config';
import { Locale } from '@/i18n/config';

import { DeveloperCard } from './developer-card';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'developers' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/developers`,
      languages: {
        en: `${siteConfig.url}/en/developers`,
        fi: `${siteConfig.url}/fi/developers`,
      },
    },
  };
}

export default async function DevelopersPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('developers');
  const developers = getAllDevelopers();

  return (
    <div className='bg-white'>
      {/* Hero Image */}
      <div className='relative h-64 sm:h-80 lg:h-96 w-full'>
        <Image
          src='/images/developers.jpg'
          alt={t('heroAlt')}
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-white' />
      </div>

      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-20 px-6 py-16 lg:px-8 xl:grid-cols-3'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h1 className='text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl'>
            {t('title')}
          </h1>
          <p className='mt-6 text-lg/8 text-gray-600'>{t('description')}</p>
          {/* For Hiring Managers callout */}
          <div className='mt-8 rounded-lg border border-indigo-200 bg-indigo-50 p-6'>
            <h2 className='text-base font-semibold text-indigo-900'>
              {t('forHiring')}
            </h2>
            <p className='mt-2 text-sm text-indigo-700'>
              {t('forHiringDescription')}
            </p>
          </div>

          {/* Add yourself callout */}
          <div className='mt-4 rounded-lg border border-gray-200 bg-gray-50 p-6'>
            <h2 className='text-base font-semibold text-gray-900'>
              {t('addYourself')}
            </h2>
            <p className='mt-2 text-sm text-gray-600'>{t('addDescription')}</p>

            {/* Step-by-step guide */}
            <div className='mt-6'>
              <h3 className='text-sm font-semibold text-gray-900'>
                {t('howToAdd')}
              </h3>
              <p className='mt-1 text-xs text-gray-500'>
                {t('howToAddDescription')}
              </p>
              <ol className='mt-4 space-y-3'>
                {[0, 1, 2, 3].map((index) => (
                  <li key={index} className='flex gap-3'>
                    <span className='flex size-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-600'>
                      {index + 1}
                    </span>
                    <div className='text-sm'>
                      <p className='font-medium text-gray-900'>
                        {t(`steps.${index}.title`)}
                      </p>
                      <p className='text-gray-500'>
                        {t(`steps.${index}.description`)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Profile template preview */}
            <div className='mt-6'>
              <h3 className='text-sm font-semibold text-gray-900'>
                {t('templateTitle')}
              </h3>
              <p className='mt-1 text-xs text-gray-500'>
                {t('templateDescription')}
              </p>
              <pre className='mt-3 overflow-x-auto rounded-lg bg-gray-900 p-4 text-xs text-gray-300'>
                {`{
  "slug": "your-name",
  "name": "Your Name",
  "role": "Your Role at Company",
  "location": "City, Finland",
  "imageUrl": "/images/your-name.jpg",
  "bio": "A short bio about yourself...",
  "xUrl": "https://twitter.com/...",
  "linkedinUrl": "https://linkedin.com/in/...",
  "githubUrl": "https://github.com/...",
  "websiteUrl": "https://...",
  "expertise": ["React Native", "..."],
  "availability": "Available for hire"
}`}
              </pre>
            </div>

            <a
              href='https://github.com/React-Native-Finland/react-native.fi'
              target='_blank'
              rel='noopener noreferrer'
              className='mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500'
            >
              {t('startPR')}
              <svg
                className='ml-2 size-4'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25'
                />
              </svg>
            </a>
          </div>
        </div>
        <ul
          role='list'
          className='mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-20 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:gap-x-8 xl:col-span-2'
        >
          {developers.map((developer) => (
            <DeveloperCard key={developer.slug} developer={developer} />
          ))}
        </ul>
      </div>
    </div>
  );
}
