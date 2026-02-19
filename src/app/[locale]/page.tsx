import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { getAllArticles } from '@/lib/articles';
import { getAllDevelopers } from '@/lib/developers';
import { getAllEvents } from '@/lib/events';

import { FAQSection } from '@/components/FAQSection';

import { Hero } from '@/app/components/hero';
import { siteConfig } from '@/constant/config';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('homeTitle'),
    description: t('homeDescription'),
    alternates: {
      canonical: `${siteConfig.url}/${locale}`,
      languages: {
        en: `${siteConfig.url}/en`,
        fi: `${siteConfig.url}/fi`,
        'x-default': `${siteConfig.url}/en`,
      },
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const tImages = await getTranslations('images');

  const articles = await getAllArticles();
  const events = getAllEvents();
  const developers = getAllDevelopers();

  return (
    <div className='bg-white'>
      <Hero />

      {/* Intro Section */}
      <section className='relative overflow-hidden bg-white py-24 sm:py-32'>
        {/* Subtle background pattern */}
        <div className='absolute inset-0 bg-grid-nordic opacity-50' />

        <div className='relative mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-3xl text-center'>
            <span className='eyebrow mb-4 inline-block'>Community</span>
            <h2 className='text-balance text-4xl font-bold tracking-tight text-[rgb(var(--mono-900))] sm:text-5xl'>
              {t('introTitle')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-[rgb(var(--mono-600))]'>
              {t('introDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className='relative bg-[rgb(var(--mono-50))] py-24 sm:py-32'>
        <div className='mx-auto max-w-7xl px-6 lg:px-8'>
          {/* Section header */}
          <div className='mb-12 lg:mb-16'>
            <span className='eyebrow mb-3 block'>{t('exploreTitle')}</span>
            <h2 className='max-w-2xl text-3xl font-bold tracking-tight text-[rgb(var(--mono-900))] sm:text-4xl lg:text-5xl'>
              {t('exploreSubtitle')}
            </h2>
          </div>

          {/* Bento Grid */}
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2'>
            {/* Events - Featured large card */}
            <Link
              href='/events'
              className='group relative overflow-hidden rounded-3xl bg-[rgb(var(--navy-950))] p-8 md:col-span-2 lg:row-span-2 transition-all duration-500 hover:shadow-2xl hover:shadow-[rgb(var(--finnish-blue))/0.1]'
            >
              {/* Background image */}
              <div className='absolute inset-0'>
                <Image
                  alt={tImages('eventsAlt')}
                  src='/images/events.jpg'
                  fill
                  sizes='(max-width: 768px) 100vw, 66vw'
                  className='object-cover opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50'
                />
                <div className='absolute inset-0 bg-gradient-to-t from-[rgb(var(--navy-950))] via-[rgb(var(--navy-950))/80] to-transparent' />
              </div>

              {/* Content */}
              <div className='relative z-10 flex h-full min-h-[400px] flex-col justify-end lg:min-h-[500px]'>
                <span className='mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm'>
                  <span className='h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent-frost))]' />
                  {events.length} {t('events.title')}
                </span>
                <h3 className='mb-3 text-3xl font-bold text-white lg:text-4xl'>
                  {t('events.count', { count: events.length })}
                </h3>
                <p className='mb-6 max-w-md text-base text-white/70'>
                  {t('events.description')}
                </p>
                <div className='inline-flex items-center gap-2 font-mono text-sm font-semibold text-[rgb(var(--accent-frost))] transition-all group-hover:gap-3'>
                  {t('events.cta')}
                  <svg
                    className='h-4 w-4 transition-transform group-hover:translate-x-1'
                    fill='none'
                    viewBox='0 0 24 24'
                    stroke='currentColor'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 8l4 4m0 0l-4 4m4-4H3'
                    />
                  </svg>
                </div>
              </div>
            </Link>

            {/* Developers card */}
            <Link
              href='/developers'
              className='group relative overflow-hidden rounded-3xl border border-[rgb(var(--mono-200))] bg-white p-6 transition-all duration-300 hover:border-[rgb(var(--finnish-blue))/0.3] hover:shadow-xl'
            >
              <div className='relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl'>
                <Image
                  alt={tImages('developersAlt')}
                  src='/images/developers.jpg'
                  fill
                  sizes='(max-width: 768px) 100vw, 33vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <span className='mb-2 inline-block rounded-full bg-[rgb(var(--mono-100))] px-3 py-1 font-mono text-xs font-semibold text-[rgb(var(--mono-600))]'>
                {developers.length}+ Developers
              </span>
              <h3 className='mb-2 text-xl font-bold text-[rgb(var(--mono-900))]'>
                {t('developers.title')}
              </h3>
              <p className='mb-4 text-sm text-[rgb(var(--mono-600))]'>
                {t('developers.description')}
              </p>
              <span className='inline-flex items-center gap-2 font-mono text-sm font-semibold text-[rgb(var(--finnish-blue))] transition-all group-hover:gap-3'>
                {t('developers.cta')}
                <span className='transition-transform group-hover:translate-x-1'>
                  &rarr;
                </span>
              </span>
            </Link>

            {/* Articles card */}
            <Link
              href='/articles'
              className='group relative overflow-hidden rounded-3xl border border-[rgb(var(--mono-200))] bg-white p-6 transition-all duration-300 hover:border-[rgb(var(--finnish-blue))/0.3] hover:shadow-xl'
            >
              <div className='relative mb-4 aspect-[4/3] overflow-hidden rounded-2xl'>
                <Image
                  alt={tImages('articlesAlt')}
                  src='/images/articles.jpg'
                  fill
                  sizes='(max-width: 768px) 100vw, 33vw'
                  className='object-cover transition-transform duration-500 group-hover:scale-105'
                />
              </div>
              <span className='mb-2 inline-block rounded-full bg-[rgb(var(--finnish-blue))/0.1] px-3 py-1 font-mono text-xs font-semibold text-[rgb(var(--finnish-blue))]'>
                {articles.length}+ Articles
              </span>
              <h3 className='mb-2 text-xl font-bold text-[rgb(var(--mono-900))]'>
                {t('articles.title')}
              </h3>
              <p className='mb-4 text-sm text-[rgb(var(--mono-600))]'>
                {t('articles.description')}
              </p>
              <span className='inline-flex items-center gap-2 font-mono text-sm font-semibold text-[rgb(var(--finnish-blue))] transition-all group-hover:gap-3'>
                {t('articles.cta')}
                <span className='transition-transform group-hover:translate-x-1'>
                  &rarr;
                </span>
              </span>
            </Link>
          </div>

          {/* Learn section - Full width card */}
          <Link
            href='/articles'
            className='group mt-4 block overflow-hidden rounded-3xl bg-gradient-to-r from-[rgb(var(--finnish-blue))] to-[rgb(var(--finnish-blue-dark))] p-8 transition-all duration-500 hover:shadow-2xl hover:shadow-[rgb(var(--finnish-blue))/0.2] md:p-12'
          >
            <div className='flex flex-col items-start justify-between gap-8 md:flex-row md:items-center'>
              <div className='max-w-2xl'>
                <span className='mb-3 inline-block rounded-full bg-white/20 px-3 py-1 font-mono text-xs font-semibold text-white'>
                  Free Course
                </span>
                <h3 className='mb-3 text-2xl font-bold text-white md:text-3xl'>
                  {t('learn.subtitle')}
                </h3>
                <p className='text-base text-white/80'>
                  {t('learn.description')}
                </p>
              </div>
              <div className='flex items-center gap-3 rounded-full bg-white px-6 py-3 font-mono text-sm font-bold text-[rgb(var(--finnish-blue))] transition-all group-hover:shadow-lg'>
                {t('learn.cta')}
                <svg
                  className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Community CTA - Dark section */}
      <section className='relative overflow-hidden bg-[rgb(var(--navy-950))] py-24 sm:py-32'>
        {/* Background effects */}
        <div className='absolute inset-0'>
          <div
            className='absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]'
            style={{
              background:
                'radial-gradient(circle, rgb(var(--finnish-blue)) 0%, transparent 70%)',
            }}
          />
        </div>

        {/* Grid pattern */}
        <div
          className='absolute inset-0 opacity-[0.02]'
          style={{
            backgroundImage: `
              linear-gradient(rgb(255 255 255) 1px, transparent 1px),
              linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
          }}
        />

        <div className='relative mx-auto max-w-7xl px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl text-center'>
            <h2 className='text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl'>
              {t('community.title')}
            </h2>
            <p className='mt-6 text-lg leading-8 text-white/60'>
              {t('community.description')}
            </p>
            <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
              <a
                href='https://meetup.com/react-native-helsinki'
                target='_blank'
                rel='noopener noreferrer'
                className='group inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 font-mono text-sm font-bold text-[rgb(var(--navy-950))] transition-all hover:shadow-lg hover:shadow-white/20'
              >
                {t('community.ctaPrimary')}
                <svg
                  className='h-4 w-4 transition-transform group-hover:translate-x-1'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M17 8l4 4m0 0l-4 4m4-4H3'
                  />
                </svg>
              </a>
              <Link
                href='/events'
                className='inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-mono text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10'
              >
                {t('community.ctaSecondary')}
                <span>&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
