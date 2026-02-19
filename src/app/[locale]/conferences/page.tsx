import { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import {
  getAllConferences,
  getAllMeetups,
  getCfpTips,
} from '@/lib/conferences';

import { siteConfig } from '@/constant/config';
import { Locale } from '@/i18n/config';
import { Link } from '@/i18n/navigation';

type Props = {
  params: Promise<{ locale: Locale }>;
};

const currentYear = 2026;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;

  const title = `React Native & React Conferences ${currentYear} | Dates, CFPs & Complete Guide`;
  const description = `Every React Native and React conference in ${currentYear}: App.js Conf, React Summit, Chain React, React Universe Conf, React Native Connection, React Native London & more. Dates, locations, CFP deadlines, and tips for getting your talk accepted.`;

  return {
    title,
    description,
    keywords: [
      'React Native conferences',
      `React Native conferences ${currentYear}`,
      'React Native conference',
      'React conferences',
      `React conferences ${currentYear}`,
      'React conference',
      'ReactJS conferences',
      'App.js Conf',
      'App.js Conf CFP',
      'Chain React',
      'Chain React conference',
      'React Universe Conf',
      `React Universe Conf ${currentYear}`,
      'React Summit',
      `React Summit ${currentYear}`,
      'React Native Connection',
      'React Native London Conf',
      'React Native CFP',
      'React Native call for papers',
      'mobile development conferences',
      'Expo conferences',
      'speak at React Native conference',
    ],
    alternates: {
      canonical: `${siteConfig.url}/${locale}/conferences`,
      languages: {
        en: `${siteConfig.url}/en/conferences`,
        fi: `${siteConfig.url}/fi/conferences`,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${siteConfig.url}/${locale}/conferences`,
    },
  };
}

export default async function ConferencesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const conferences = getAllConferences();
  const meetups = getAllMeetups();
  const cfpTips = getCfpTips();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `React Native Conferences ${currentYear}`,
    description: `A curated list of React Native conferences and meetups for ${currentYear}`,
    itemListElement: conferences.map((conf, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: conf.name,
        description: conf.description,
        startDate: conf.dateDetail,
        location: {
          '@type': 'Place',
          name: conf.location,
        },
        url: conf.url,
        eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
        organizer: {
          '@type': 'Organization',
          name: conf.name,
          url: conf.url,
        },
      },
    })),
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What are the biggest React Native conferences?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The biggest React Native conferences are App.js Conf (Krakow, Poland), React Universe Conf (Wroclaw, Poland), Chain React (Portland, USA), React Native Connection (Paris, France), and React Native London Conf (London, UK). React Summit also features significant React Native content.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I speak at a React Native conference?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Most React Native conferences have a Call for Papers (CFP) process. Submit a talk proposal through their website, typically 3-6 months before the event. Focus on specific, practical topics with real-world examples. Include your background and any previous speaking experience.',
        },
      },
      {
        '@type': 'Question',
        name: `When are React Native conferences in ${currentYear}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `In ${currentYear}, major React Native conferences include: App.js Conf (May), React Summit (June), Chain React (July), React Universe Conf (September), React Native Connection (September), and React Native London Conf (November).`,
        },
      },
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className='bg-white'>
        {/* Hero Section */}
        <section className='relative overflow-hidden bg-[rgb(var(--navy-950))] py-24 sm:py-32'>
          {/* Background effects */}
          <div className='absolute inset-0'>
            <div
              className='absolute left-1/4 top-0 h-[600px] w-[600px] -translate-y-1/2 rounded-full opacity-20 blur-[100px]'
              style={{
                background:
                  'radial-gradient(circle, rgb(var(--finnish-blue)) 0%, transparent 70%)',
              }}
            />
            <div
              className='absolute right-0 bottom-0 h-[400px] w-[400px] translate-y-1/2 rounded-full opacity-15 blur-[80px]'
              style={{
                background:
                  'radial-gradient(circle, rgb(var(--accent-frost)) 0%, transparent 70%)',
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
            <div className='mx-auto max-w-3xl text-center'>
              <span className='mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-[rgb(var(--accent-frost))]'>
                {currentYear} Guide
              </span>
              <h1 className='text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl'>
                React Native Conferences
              </h1>
              <p className='mt-6 text-lg leading-8 text-white/70'>
                The complete guide to React Native conferences, CFPs, and
                meetups in {currentYear}. From App.js in Poland to Chain React
                in the USA — find your next event.
              </p>
              <div className='mt-8 flex flex-wrap justify-center gap-4'>
                <a
                  href='#conferences'
                  className='rounded-full bg-white px-6 py-3 font-mono text-sm font-semibold text-[rgb(var(--navy-950))] transition-all hover:shadow-lg'
                >
                  View Conferences
                </a>
                <a
                  href='#cfp'
                  className='rounded-full border border-white/20 bg-white/5 px-6 py-3 font-mono text-sm font-semibold text-white backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/10'
                >
                  CFP Guide
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Main Conferences */}
        <section id='conferences' className='py-24 sm:py-32'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl lg:mx-0'>
              <span className='eyebrow mb-3 block'>Major Events</span>
              <h2 className='text-3xl font-bold tracking-tight text-[rgb(var(--mono-900))] sm:text-4xl'>
                React Native Conferences in {currentYear}
              </h2>
              <p className='mt-4 text-lg text-[rgb(var(--mono-600))]'>
                The must-attend conferences for React Native developers. Great
                for learning, networking, and staying current with the
                ecosystem.
              </p>
            </div>

            <div className='mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
              {conferences.map((conf) => (
                <div
                  key={conf.name}
                  className='group relative overflow-hidden rounded-2xl border border-[rgb(var(--mono-200))] bg-white p-6 transition-all duration-300 hover:border-[rgb(var(--finnish-blue))/0.3] hover:shadow-xl'
                >
                  {/* Conference badge */}
                  <div className='mb-4 flex items-center justify-between'>
                    <span className='rounded-full bg-[rgb(var(--finnish-blue))/0.1] px-3 py-1 font-mono text-xs font-semibold text-[rgb(var(--finnish-blue))]'>
                      {conf.date}
                    </span>
                  </div>

                  <h3 className='text-xl font-bold text-[rgb(var(--mono-900))]'>
                    {conf.name}
                  </h3>

                  <div className='mt-2 flex items-center gap-2 text-sm text-[rgb(var(--mono-500))]'>
                    <svg
                      className='h-4 w-4'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z'
                      />
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M15 11a3 3 0 11-6 0 3 3 0 016 0z'
                      />
                    </svg>
                    {conf.location}
                  </div>

                  <p className='mt-4 text-sm leading-6 text-[rgb(var(--mono-600))]'>
                    {conf.description}
                  </p>

                  {/* CFP Status */}
                  <div className='mt-4 flex items-center gap-2 rounded-lg bg-[rgb(var(--mono-50))] px-3 py-2'>
                    <svg
                      className='h-4 w-4 text-[rgb(var(--mono-500))]'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z'
                      />
                    </svg>
                    <span className='text-xs font-medium text-[rgb(var(--mono-600))]'>
                      CFP: {conf.cfpStatus}
                    </span>
                  </div>

                  {/* Tags */}
                  <div className='mt-4 flex flex-wrap gap-2'>
                    {conf.tags.map((tag) => (
                      <span
                        key={tag}
                        className='rounded-full bg-[rgb(var(--mono-100))] px-2 py-0.5 text-xs font-medium text-[rgb(var(--mono-600))]'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className='mt-6 flex items-center gap-4 border-t border-[rgb(var(--mono-100))] pt-4'>
                    <a
                      href={conf.url}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-1 text-sm font-semibold text-[rgb(var(--finnish-blue))] hover:underline'
                    >
                      Website
                      <svg
                        className='h-3 w-3'
                        fill='none'
                        viewBox='0 0 24 24'
                        stroke='currentColor'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth={2}
                          d='M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14'
                        />
                      </svg>
                    </a>
                    {conf.cfpUrl && (
                      <a
                        href={conf.cfpUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='inline-flex items-center gap-1 text-sm font-semibold text-[rgb(var(--mono-600))] hover:text-[rgb(var(--finnish-blue))] hover:underline'
                      >
                        Submit Talk
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CFP Section */}
        <section id='cfp' className='bg-[rgb(var(--mono-50))] py-24 sm:py-32'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl lg:mx-0'>
              <span className='eyebrow mb-3 block'>Call for Papers</span>
              <h2 className='text-3xl font-bold tracking-tight text-[rgb(var(--mono-900))] sm:text-4xl'>
                How to Speak at React Native Conferences
              </h2>
              <p className='mt-4 text-lg text-[rgb(var(--mono-600))]'>
                Want to share your knowledge? Most conferences accept talk
                proposals through a CFP (Call for Papers) process. Here&apos;s
                how to get accepted.
              </p>
            </div>

            {/* CFP Timeline */}
            <div className='mt-12 overflow-hidden rounded-2xl border border-[rgb(var(--mono-200))] bg-white'>
              <div className='border-b border-[rgb(var(--mono-200))] bg-[rgb(var(--mono-50))] px-6 py-4'>
                <h3 className='font-mono text-sm font-semibold text-[rgb(var(--mono-900))]'>
                  {currentYear} CFP Timeline
                </h3>
              </div>
              <div className='divide-y divide-[rgb(var(--mono-100))]'>
                {conferences
                  .filter((c) => c.cfpUrl)
                  .map((conf) => (
                    <div
                      key={conf.name}
                      className='flex items-center justify-between px-6 py-4'
                    >
                      <div>
                        <div className='font-semibold text-[rgb(var(--mono-900))]'>
                          {conf.name}
                        </div>
                        <div className='text-sm text-[rgb(var(--mono-500))]'>
                          {conf.dateDetail}
                        </div>
                      </div>
                      <div className='text-right'>
                        <div className='text-sm font-medium text-[rgb(var(--mono-700))]'>
                          {conf.cfpStatus}
                        </div>
                        {conf.cfpUrl && (
                          <a
                            href={conf.cfpUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-xs text-[rgb(var(--finnish-blue))] hover:underline'
                          >
                            Submit proposal &rarr;
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* CFP Tips */}
            <div className='mt-16'>
              <h3 className='text-2xl font-bold text-[rgb(var(--mono-900))]'>
                Tips for Getting Your Talk Accepted
              </h3>
              <div className='mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
                {cfpTips.map((tip, index) => (
                  <div
                    key={tip.title}
                    className='rounded-xl border border-[rgb(var(--mono-200))] bg-white p-6'
                  >
                    <div className='mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-[rgb(var(--finnish-blue))] font-mono text-sm font-bold text-white'>
                      {index + 1}
                    </div>
                    <h4 className='text-lg font-semibold text-[rgb(var(--mono-900))]'>
                      {tip.title}
                    </h4>
                    <p className='mt-2 text-sm text-[rgb(var(--mono-600))]'>
                      {tip.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Talk Ideas */}
            <div className='mt-16 rounded-2xl bg-[rgb(var(--navy-950))] p-8 md:p-12'>
              <h3 className='text-2xl font-bold text-white'>
                Talk Ideas That Get Accepted
              </h3>
              <p className='mt-4 text-white/70'>
                Not sure what to talk about? Here are topics that conference
                organizers love:
              </p>
              <div className='mt-8 grid gap-4 md:grid-cols-2'>
                {[
                  'Performance optimization case studies',
                  'Migration stories (to RN, to Expo, etc.)',
                  'Building accessible mobile apps',
                  'Testing strategies that actually work',
                  'Animation deep-dives with Reanimated',
                  'Native module development',
                  'State management patterns',
                  'CI/CD and deployment pipelines',
                  'Debugging production issues',
                  'Monorepo setups for mobile',
                ].map((idea) => (
                  <div key={idea} className='flex items-center gap-3'>
                    <svg
                      className='h-5 w-5 flex-shrink-0 text-[rgb(var(--accent-frost))]'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                      />
                    </svg>
                    <span className='text-sm text-white/90'>{idea}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why Attend Section */}
        <section className='py-24 sm:py-32'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-[rgb(var(--mono-900))] sm:text-4xl'>
                Why Attend React Native Conferences?
              </h2>
              <p className='mt-4 text-lg text-[rgb(var(--mono-600))]'>
                Conferences are the best way to level up your skills, meet the
                community, and stay ahead of the curve.
              </p>
            </div>

            <div className='mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4'>
              {[
                {
                  title: 'Learn from Experts',
                  description:
                    'Hear directly from core team members, library authors, and engineers building apps at scale.',
                  icon: (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
                    />
                  ),
                },
                {
                  title: 'Network & Hire',
                  description:
                    'Meet developers from around the world. Many companies use conferences for recruiting.',
                  icon: (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                    />
                  ),
                },
                {
                  title: 'Hands-on Workshops',
                  description:
                    'Many conferences offer workshops where you build real projects with expert guidance.',
                  icon: (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4'
                    />
                  ),
                },
                {
                  title: 'Early Access',
                  description:
                    'Conferences often feature announcements of new features and tools before public release.',
                  icon: (
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M13 10V3L4 14h7v7l9-11h-7z'
                    />
                  ),
                },
              ].map((item) => (
                <div key={item.title} className='text-center'>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(var(--finnish-blue))] text-white'>
                    <svg
                      className='h-6 w-6'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      {item.icon}
                    </svg>
                  </div>
                  <h3 className='mt-4 text-lg font-semibold text-[rgb(var(--mono-900))]'>
                    {item.title}
                  </h3>
                  <p className='mt-2 text-sm text-[rgb(var(--mono-600))]'>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Meetups */}
        <section className='bg-[rgb(var(--mono-50))] py-24 sm:py-32'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl lg:mx-0'>
              <span className='eyebrow mb-3 block'>Local Communities</span>
              <h2 className='text-3xl font-bold tracking-tight text-[rgb(var(--mono-900))] sm:text-4xl'>
                React Native Meetups Worldwide
              </h2>
              <p className='mt-4 text-lg text-[rgb(var(--mono-600))]'>
                Can&apos;t make it to a conference? Join a local meetup to
                connect with developers in your area.
              </p>
            </div>

            <div className='mt-12 grid gap-6 md:grid-cols-2'>
              {meetups.map((meetup) => (
                <a
                  key={meetup.name}
                  href={meetup.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='group flex items-start gap-4 rounded-xl border border-[rgb(var(--mono-200))] bg-white p-6 transition-all hover:border-[rgb(var(--finnish-blue))/0.3] hover:shadow-lg'
                >
                  <div className='flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-[rgb(var(--mono-100))] transition-colors group-hover:bg-[rgb(var(--finnish-blue))]'>
                    <svg
                      className='h-6 w-6 text-[rgb(var(--mono-600))] transition-colors group-hover:text-white'
                      fill='none'
                      viewBox='0 0 24 24'
                      stroke='currentColor'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                      />
                    </svg>
                  </div>
                  <div className='flex-1'>
                    <div className='flex items-center justify-between'>
                      <h3 className='text-lg font-semibold text-[rgb(var(--mono-900))] group-hover:text-[rgb(var(--finnish-blue))]'>
                        {meetup.name}
                      </h3>
                      <span className='rounded-full bg-[rgb(var(--mono-100))] px-2 py-0.5 text-xs font-medium text-[rgb(var(--mono-600))]'>
                        {meetup.frequency}
                      </span>
                    </div>
                    <p className='mt-1 text-sm text-[rgb(var(--mono-500))]'>
                      {meetup.location}
                    </p>
                    <p className='mt-2 text-sm text-[rgb(var(--mono-600))]'>
                      {meetup.description}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section for SEO */}
        <section className='py-24 sm:py-32'>
          <div className='mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl'>
              <h2 className='text-3xl font-bold tracking-tight text-[rgb(var(--mono-900))] sm:text-4xl'>
                Frequently Asked Questions
              </h2>
              <dl className='mt-10 space-y-6 divide-y divide-[rgb(var(--mono-200))]'>
                <div className='pt-6'>
                  <dt className='text-lg font-semibold text-[rgb(var(--mono-900))]'>
                    What are the biggest React Native conferences?
                  </dt>
                  <dd className='mt-2 text-[rgb(var(--mono-600))]'>
                    The biggest React Native conferences are App.js Conf
                    (Krakow, Poland), React Universe Conf (Wroclaw, Poland),
                    Chain React (Portland, USA), React Native Connection (Paris,
                    France), and React Native London Conf (London, UK). React
                    Summit also features significant React Native content.
                  </dd>
                </div>
                <div className='pt-6'>
                  <dt className='text-lg font-semibold text-[rgb(var(--mono-900))]'>
                    How do I speak at a React Native conference?
                  </dt>
                  <dd className='mt-2 text-[rgb(var(--mono-600))]'>
                    Most React Native conferences have a Call for Papers (CFP)
                    process. Submit a talk proposal through their website,
                    typically 3-6 months before the event. Focus on specific,
                    practical topics with real-world examples. Include your
                    background and any previous speaking experience.
                  </dd>
                </div>
                <div className='pt-6'>
                  <dt className='text-lg font-semibold text-[rgb(var(--mono-900))]'>
                    When are React Native conferences in {currentYear}?
                  </dt>
                  <dd className='mt-2 text-[rgb(var(--mono-600))]'>
                    In {currentYear}, major React Native conferences include:
                    App.js Conf (May), React Summit (June), Chain React (July),
                    React Universe Conf (September), React Native Connection
                    (September), and React Native London Conf (November).
                  </dd>
                </div>
                <div className='pt-6'>
                  <dt className='text-lg font-semibold text-[rgb(var(--mono-900))]'>
                    Are there free React Native conferences or meetups?
                  </dt>
                  <dd className='mt-2 text-[rgb(var(--mono-600))]'>
                    While most conferences require tickets, many local meetups
                    are free. React Native Helsinki, React Native London, React
                    Native NYC, and React Native Berlin all host free monthly
                    events. Some conferences also offer diversity scholarships
                    or free community tickets.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className='relative overflow-hidden bg-[rgb(var(--navy-950))] py-24 sm:py-32'>
          <div className='absolute inset-0'>
            <div
              className='absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-20 blur-[100px]'
              style={{
                background:
                  'radial-gradient(circle, rgb(var(--finnish-blue)) 0%, transparent 70%)',
              }}
            />
          </div>

          <div className='relative mx-auto max-w-7xl px-6 lg:px-8'>
            <div className='mx-auto max-w-2xl text-center'>
              <h2 className='text-3xl font-bold tracking-tight text-white sm:text-4xl'>
                Join React Native Helsinki
              </h2>
              <p className='mt-6 text-lg leading-8 text-white/70'>
                Finland&apos;s React Native community meets monthly in Helsinki.
                Free events, great talks, and the best mobile developers in the
                Nordics.
              </p>
              <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
                <a
                  href='https://meetup.com/react-native-helsinki'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-mono text-sm font-bold text-[rgb(var(--navy-950))] transition-all hover:shadow-lg hover:shadow-white/20'
                >
                  Join on Meetup
                  <svg
                    className='h-4 w-4'
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
                  See Past Events
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
