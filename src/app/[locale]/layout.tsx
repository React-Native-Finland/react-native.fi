import { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from 'next-intl/server';
import * as React from 'react';

import { Footer } from '@/components/Footer';

import { Navbar } from '@/app/components/navbar';
import { siteConfig } from '@/constant/config';
import { locales } from '@/i18n/config';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default: t('title'),
      template: `%s | ${t('title')}`,
    },
    keywords:
      'React Native Finland, React Native Helsinki, React Native meetups Helsinki, React Native developers Finland, learn React Native Finland, React Native community Finland, mobile development Finland, React Native courses Finland, React Native MOOC',
    authors: [
      {
        name: 'Perttu Lähteenlahti',
        url: 'https://perttu.dev',
      },
      {
        name: 'Tobias Helsing',
        url: 'https://tobiashelsing.com',
      },
    ],
    description: t('description'),
    robots: { index: true, follow: true },
    openGraph: {
      url: `${siteConfig.url}/${locale}`,
      title: t('title'),
      description: t('description'),
      siteName: t('title'),
      images: [`${siteConfig.url}/images/og.jpg`],
      type: 'website',
      locale: locale === 'fi' ? 'fi_FI' : 'en_US',
      alternateLocale: locale === 'fi' ? 'en_US' : 'fi_FI',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [`${siteConfig.url}/images/og.jpg`],
      creator: '@plahteenlahti',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'React Native Finland',
    alternateName: 'React Native Helsinki',
    description: siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/images/og.jpg`,
    sameAs: [
      'https://meetup.com/react-native-helsinki',
      'https://github.com/React-Native-Finland',
    ],
    areaServed: {
      '@type': 'Country',
      name: 'Finland',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Helsinki',
      addressCountry: 'FI',
    },
    knowsAbout: [
      'React Native',
      'Mobile App Development',
      'TypeScript',
      'Expo',
      'iOS Development',
      'Android Development',
    ],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    publisher: {
      '@type': 'Organization',
      name: 'React Native Finland',
    },
    author: {
      '@type': 'Person',
      '@id': 'https://perttu.dev/#person',
      name: 'Perttu Lähteenlahti',
      url: 'https://perttu.dev',
    },
    inLanguage: locale,
    availableLanguage: ['en', 'fi'],
  };

  return (
    <NextIntlClientProvider messages={messages}>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
