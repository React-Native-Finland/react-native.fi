import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getPastEvents, getUpcomingEvents } from '@/lib/events';

import { siteConfig } from '@/constant/config';
import { Locale } from '@/i18n/config';

import { EventCard } from './event-card';

type Props = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'events' });

  return {
    title: t('pageTitle'),
    description: t('pageDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/events`,
      languages: {
        en: `${siteConfig.url}/en/events`,
        fi: `${siteConfig.url}/fi/events`,
      },
    },
  };
}

export default async function EventsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('events');
  const upcomingEvents = getUpcomingEvents();
  const pastEvents = getPastEvents();

  return (
    <div className='bg-white'>
      {/* Hero Image */}
      <div className='relative h-64 sm:h-80 lg:h-96 w-full'>
        <Image
          src='/images/events.jpg'
          alt={t('heroAlt')}
          fill
          sizes='100vw'
          className='object-cover'
          priority
        />
        <div className='absolute inset-0 bg-gradient-to-b from-transparent to-white' />
      </div>

      <div className='mx-auto max-w-7xl px-6 py-16 lg:px-8'>
        <div className='mx-auto max-w-2xl lg:mx-0'>
          <h1 className='text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
            {t('title')}
          </h1>
          <p className='mt-6 text-lg text-gray-600'>{t('description')}</p>
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className='mt-16'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              {t('upcoming')}
            </h2>
            <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {upcomingEvents.map((event) => (
                <EventCard key={event.slug} event={event} isUpcoming={true} />
              ))}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div className='mt-16 pt-16 border-t border-gray-200'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              {t('past')}
            </h2>
            <div className='mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
              {pastEvents.map((event) => (
                <EventCard key={event.slug} event={event} isUpcoming={false} />
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className='mt-16 pt-16 border-t border-gray-200'>
          <div className='rounded-2xl bg-gray-50 p-8 sm:p-12'>
            <h2 className='text-xl font-semibold text-gray-900'>
              {t('neverMiss')}
            </h2>
            <p className='mt-4 text-base text-gray-600'>
              {t('neverMissDescription')}
            </p>
            <a
              href='https://meetup.com/react-native-helsinki'
              target='_blank'
              rel='noopener noreferrer'
              className='mt-6 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              {t('joinMeetup')}
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
      </div>
    </div>
  );
}
