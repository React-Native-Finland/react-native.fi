import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getAllArticles } from '@/lib/articles';

import { ArticleCard } from '@/app/components/article-card';
import { siteConfig } from '@/constant/config';
import { Locale } from '@/i18n/config';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'articles' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/articles`,
      languages: {
        en: `${siteConfig.url}/en/articles`,
        fi: `${siteConfig.url}/fi/articles`,
      },
    },
  };
}

export default async function LearnAndArticlesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('articles');
  const articles = await getAllArticles(locale);

  return (
    <div className='bg-white'>
      {/* Hero Image */}
      <div className='relative h-64 sm:h-80 lg:h-96 w-full'>
        <Image
          src='/images/articles.jpg'
          alt={t('heroAlt')}
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-white' />
      </div>

      <div className='mx-auto max-w-7xl px-6 py-16 lg:px-8'>
        {/* Header section */}
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <p className='text-base/7 font-semibold text-indigo-600'>
            {t('header')}
          </p>
          <h1 className='mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl'>
            {t('title')}
          </h1>
          <p className='mt-6 text-lg/8 text-gray-600'>{t('description')}</p>
          <div className='mt-8'>
            <a
              href='https://studies.helsinki.fi/kurssit/toteutus/otm-e859336d-9d63-47ac-9906-a7da74cae32d'
              target='_blank'
              rel='noopener noreferrer'
              className='text-base/7 font-semibold text-indigo-600 hover:text-indigo-500'
            >
              {t('startCourse')} <span aria-hidden='true'>&rarr;</span>
            </a>
          </div>
        </div>

        {/* MOOC Info Card */}
        <div className='mt-16 rounded-2xl bg-gray-50 p-8 sm:p-12'>
          <h2 className='text-xl font-semibold text-gray-900'>
            {t('moocTitle')}
          </h2>
          <p className='mt-4 text-base text-gray-600'>{t('moocDescription')}</p>
          <a
            href='https://studies.helsinki.fi/kurssit/toteutus/otm-e859336d-9d63-47ac-9906-a7da74cae32d'
            target='_blank'
            rel='noopener noreferrer'
            className='mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            {t('startTheCourse')}
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

        {/* Articles section */}
        <div className='mt-16 pt-16 border-t border-gray-200'>
          <h2 className='text-2xl font-semibold text-gray-900'>
            {t('communityArticles')}
          </h2>
          <p className='mt-4 text-base text-gray-600'>
            {t('communityDescription')}
          </p>
        </div>

        {articles.length > 0 && (
          <div className='mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3'>
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
