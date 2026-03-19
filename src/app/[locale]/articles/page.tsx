import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { ArticleTag, getAllArticles } from '@/lib/articles';

import { ArticleFilteredGrid } from '@/components/ArticleFilteredGrid';
import { ArticleTagFilter } from '@/components/ArticleTagFilter';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { NewsletterSignup } from '@/components/NewsletterSignup';

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

  // Collect unique tags from articles
  const availableTags = Array.from(
    new Set(articles.flatMap((a) => a.tags || [])),
  ).sort() as ArticleTag[];

  // CollectionPage structured data
  const collectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: t('title'),
    description: t('pageDescription'),
    url: `${siteConfig.url}/${locale}/articles`,
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: articles.length,
      itemListElement: articles.map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${siteConfig.url}/${locale}/articles/${article.slug}`,
        name: article.title,
      })),
    },
    publisher: {
      '@type': 'Organization',
      name: 'React Native Finland',
      url: siteConfig.url,
    },
  };

  return (
    <div className='bg-white'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />

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
        {/* Breadcrumbs */}
        <Breadcrumbs
          homeLabel={locale === 'fi' ? 'Etusivu' : 'Home'}
          items={[{ name: locale === 'fi' ? 'Artikkelit' : 'Articles' }]}
        />

        {/* Header section */}
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <p className='text-base/7 font-semibold text-indigo-600'>
            {t('header')}
          </p>
          <h1 className='mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl'>
            {t('title')}
          </h1>
          <p className='mt-6 text-lg/8 text-gray-600'>{t('description')}</p>
        </div>

        {/* Articles section */}
        <div className='mt-16 pt-16 border-t border-gray-200'>
          <h2 className='text-2xl font-semibold text-gray-900'>
            {t('communityArticles')}
          </h2>
          <p className='mt-4 text-base text-gray-600'>
            {t('communityDescription')}
          </p>

          {/* Tag filter */}
          {availableTags.length > 0 && (
            <div className='mt-8'>
              <Suspense>
                <ArticleTagFilter availableTags={availableTags} />
              </Suspense>
            </div>
          )}
        </div>

        {articles.length > 0 && (
          <Suspense>
            <ArticleFilteredGrid articles={articles} />
          </Suspense>
        )}

        {/* Newsletter Signup */}
        <NewsletterSignup variant='banner' className='mt-16' />
      </div>
    </div>
  );
}
