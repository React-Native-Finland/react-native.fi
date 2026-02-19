import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getDeveloperBySlug } from '@/lib/developers';
import { getAllEvents, getEventBySlug } from '@/lib/events';

import { Breadcrumbs } from '@/components/Breadcrumbs';
import { EventJsonLd } from '@/components/EventJsonLd';

import { siteConfig } from '@/constant/config';
import { Locale, locales } from '@/i18n/config';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
};

export function generateStaticParams() {
  const events = getAllEvents();
  return locales.flatMap((locale) =>
    events.map((event) => ({
      locale,
      slug: event.slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale: _locale } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `${event.title} - React Native Helsinki`,
    description: event.description,
  };
}

function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'fi' ? 'fi-FI' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function EventPage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('events');
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  // Create ISO datetime for structured data
  const startDateTime = `${event.date}T${event.startTime}:00`;
  const endDateTime = `${event.date}T${event.endTime}:00`;
  const eventUrl = `${siteConfig.url}/${locale}/events/${slug}`;
  const ogImageUrl = `${siteConfig.url}/events/${slug}/opengraph-image`;

  return (
    <>
      <EventJsonLd
        name={event.title}
        description={event.description}
        startDate={startDateTime}
        endDate={endDateTime}
        location={{
          name: event.venue.name,
          address: event.venue.address,
          city: event.venue.city,
        }}
        url={eventUrl}
        imageUrl={ogImageUrl}
        organizer={event.host}
      />
      <div className='bg-white py-24 sm:py-32'>
        <div className='mx-auto max-w-5xl px-6 lg:px-8'>
          {/* Breadcrumbs */}
          <Breadcrumbs
            homeLabel={locale === 'fi' ? 'Etusivu' : 'Home'}
            items={[
              {
                name: locale === 'fi' ? 'Tapahtumat' : 'Events',
                href: '/events',
              },
              { name: event.title },
            ]}
          />

          {/* Event header */}
          <div>
            {!event.isPast && (
              <span className='inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-600/20 mb-4'>
                {t('upcomingBadge')}
              </span>
            )}
            {event.isPast && (
              <span className='inline-flex items-center rounded-full bg-gray-50 px-3 py-1 text-sm font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10 mb-4'>
                {locale === 'fi' ? 'Mennyt tapahtuma' : 'Past Event'}
              </span>
            )}
            <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {event.title}
            </h1>
            <p className='mt-4 text-lg text-gray-600'>{event.description}</p>
          </div>

          {/* Event details */}
          <div className='mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2'>
            <div className='rounded-xl bg-gray-50 p-6'>
              <h3 className='text-sm font-semibold text-gray-900'>
                {locale === 'fi' ? 'Päivämäärä ja aika' : 'Date & Time'}
              </h3>
              <div className='mt-3 space-y-2'>
                <div className='flex items-center gap-3 text-sm text-gray-600'>
                  <svg
                    className='size-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5'
                    />
                  </svg>
                  <span>{formatDate(event.date, locale)}</span>
                </div>
                <div className='flex items-center gap-3 text-sm text-gray-600'>
                  <svg
                    className='size-5 text-gray-400'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                  <span>
                    {event.startTime} - {event.endTime} {event.timezone}
                  </span>
                </div>
              </div>
            </div>

            <div className='rounded-xl bg-gray-50 p-6'>
              <h3 className='text-sm font-semibold text-gray-900'>
                {locale === 'fi' ? 'Sijainti' : 'Location'}
              </h3>
              <div className='mt-3 space-y-2'>
                <div className='flex items-start gap-3 text-sm text-gray-600'>
                  <svg
                    className='size-5 text-gray-400 mt-0.5'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M15 10.5a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z'
                    />
                  </svg>
                  <div>
                    <p className='font-medium text-gray-900'>
                      {event.venue.name}
                    </p>
                    <p>{event.venue.address}</p>
                    <p>{event.venue.city}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Talks section */}
          <div className='mt-12 pt-12 border-t border-gray-200'>
            <h2 className='text-2xl font-semibold text-gray-900'>
              {locale === 'fi' ? 'Esitykset' : 'Talks'} ({event.talks.length})
            </h2>
            <div className='mt-8 space-y-6'>
              {event.talks.map((talk, index) => {
                const developer = talk.speaker.slug
                  ? getDeveloperBySlug(talk.speaker.slug)
                  : null;

                return (
                  <div
                    key={index}
                    className='rounded-xl border border-gray-200 p-6'
                  >
                    <div className='flex items-start justify-between gap-4'>
                      <div className='flex-1'>
                        <h3 className='text-lg font-semibold text-gray-900'>
                          {talk.title}
                        </h3>
                        {talk.level && (
                          <span className='mt-2 inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-700'>
                            {talk.level}
                          </span>
                        )}
                        <p className='mt-3 text-sm text-gray-600'>
                          {talk.description}
                        </p>
                      </div>
                    </div>
                    <div className='mt-4 pt-4 border-t border-gray-100'>
                      <div className='flex items-center gap-3'>
                        {developer?.imageUrl ? (
                          <img
                            src={developer.imageUrl}
                            alt={talk.speaker.name}
                            className='size-10 rounded-full object-cover'
                          />
                        ) : (
                          <div className='size-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-semibold'>
                            {talk.speaker.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          {developer ? (
                            <Link
                              href={`/developers/${developer.slug}`}
                              className='text-sm font-medium text-gray-900 hover:text-indigo-600'
                            >
                              {talk.speaker.name}
                            </Link>
                          ) : (
                            <p className='text-sm font-medium text-gray-900'>
                              {talk.speaker.name}
                            </p>
                          )}
                          <p className='text-xs text-gray-500'>
                            {locale === 'fi' ? 'Puhuja' : 'Speaker'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Host info */}
          <div className='mt-12 pt-12 border-t border-gray-200'>
            <p className='text-sm text-gray-500'>
              {locale === 'fi' ? 'Järjestäjä' : 'Hosted by'}{' '}
              <span className='font-medium text-gray-700'>{event.host}</span>
            </p>
          </div>

          {/* CTA for upcoming events */}
          {!event.isPast && (
            <div className='mt-12 rounded-xl bg-indigo-50 p-6 sm:p-8'>
              <h3 className='text-lg font-semibold text-indigo-900'>
                {locale === 'fi'
                  ? 'Osallistu tähän tapahtumaan'
                  : 'Join This Event'}
              </h3>
              <p className='mt-2 text-sm text-indigo-700'>
                {locale === 'fi'
                  ? 'Ilmoittaudu Meetup.comissa varmistaaksesi paikkasi ja saadaksesi tapahtumatiedotteet.'
                  : 'RSVP on Meetup.com to secure your spot and get event updates.'}
              </p>
              <a
                href='https://meetup.com/react-native-helsinki'
                target='_blank'
                rel='noopener noreferrer'
                className='mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'
              >
                {locale === 'fi'
                  ? 'Ilmoittaudu Meetup.comissa'
                  : 'RSVP on Meetup.com'}
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
          )}
        </div>
      </div>
    </>
  );
}
