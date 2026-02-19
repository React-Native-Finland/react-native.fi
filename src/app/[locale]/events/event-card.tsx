'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Event } from '@/lib/events';

import { Link } from '@/i18n/navigation';

function formatDate(dateString: string, locale: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(locale === 'fi' ? 'fi-FI' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function EventCard({
  event,
  isUpcoming,
}: {
  event: Event;
  isUpcoming: boolean;
}) {
  const locale = useLocale();
  const t = useTranslations('events');

  return (
    <Link
      href={`/events/${event.slug}`}
      className='group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200 hover:ring-indigo-300 hover:shadow-md transition-all'
    >
      {/* OG Image */}
      <div className='relative aspect-[1200/630] overflow-hidden'>
        <Image
          src={`/events/${event.slug}/opengraph-image`}
          alt={event.title}
          fill
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          placeholder='blur'
          blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMDAyYiIvPjwvc3ZnPg=='
        />
        {isUpcoming && (
          <span className='absolute top-3 left-3 inline-flex items-center rounded-full bg-green-500 px-2.5 py-1 text-xs font-medium text-white shadow-sm z-10'>
            {t('upcomingBadge')}
          </span>
        )}
      </div>
      <div className='flex flex-1 flex-col p-6'>
        <h3 className='text-lg font-semibold text-gray-900 group-hover:text-indigo-600'>
          {event.title}
        </h3>
        <div className='mt-3 flex flex-col gap-2 text-sm text-gray-600'>
          <div className='flex items-center gap-2'>
            <svg
              className='size-4 text-gray-400'
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
          <div className='flex items-center gap-2'>
            <svg
              className='size-4 text-gray-400'
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
            <span>
              {event.venue.name}, {event.venue.city}
            </span>
          </div>
        </div>
        <div className='mt-auto pt-4 border-t border-gray-100'>
          <p className='text-xs text-gray-500'>
            {t('talks', { count: event.talks.length })}
          </p>
        </div>
      </div>
    </Link>
  );
}
