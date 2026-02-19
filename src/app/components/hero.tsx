'use client';

import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';

export const Hero = () => {
  const t = useTranslations('hero');

  return (
    <section className='relative min-h-[100svh] overflow-hidden bg-[rgb(var(--navy-950))]'>
      {/* Animated gradient background */}
      <div className='absolute inset-0'>
        {/* Primary gradient orb */}
        <div
          className='absolute -left-1/4 -top-1/4 h-[800px] w-[800px] rounded-full opacity-30 blur-[120px]'
          style={{
            background:
              'radial-gradient(circle, rgb(var(--finnish-blue)) 0%, transparent 70%)',
          }}
        />
        {/* Secondary gradient orb */}
        <div
          className='absolute -bottom-1/4 -right-1/4 h-[600px] w-[600px] rounded-full opacity-20 blur-[100px]'
          style={{
            background:
              'radial-gradient(circle, rgb(var(--accent-frost)) 0%, transparent 70%)',
          }}
        />
        {/* Accent orb */}
        <div
          className='absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-10 blur-[80px]'
          style={{
            background:
              'radial-gradient(circle, rgb(var(--accent-aurora)) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className='absolute inset-0 opacity-[0.03]'
        style={{
          backgroundImage: `
            linear-gradient(rgb(255 255 255) 1px, transparent 1px),
            linear-gradient(90deg, rgb(255 255 255) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Noise texture */}
      <div
        className='absolute inset-0 opacity-[0.02]'
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className='relative z-10 flex min-h-[100svh] flex-col items-center justify-center px-6 py-32'>
        <div className='mx-auto max-w-5xl text-center'>
          {/* Eyebrow badge */}
          <div className='mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm fade-in-down'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[rgb(var(--accent-frost))] opacity-75' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-[rgb(var(--accent-frost))]' />
            </span>
            <span className='text-sm font-medium text-white/80'>
              {t('badge')}
            </span>
            <Link
              href='/events'
              className='ml-1 text-sm font-semibold text-[rgb(var(--accent-frost))] transition-colors hover:text-white'
            >
              {t('seeEvents')} &rarr;
            </Link>
          </div>

          {/* Main headline */}
          <h1 className='mb-6 text-5xl font-bold leading-[0.9] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl fade-in-up'>
            <span className='block'>React Native</span>
            <span className='mt-2 block text-transparent bg-clip-text bg-gradient-to-r from-[rgb(var(--finnish-blue-light))] via-[rgb(var(--accent-frost))] to-[rgb(var(--accent-aurora))]'>
              Finland
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className='mx-auto max-w-2xl text-lg text-white/60 sm:text-xl md:text-2xl fade-in-up'
            style={{ animationDelay: '0.1s' }}
          >
            {t('description')}
          </p>

          {/* CTA buttons */}
          <div
            className='mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row fade-in-up'
            style={{ animationDelay: '0.2s' }}
          >
            <Link
              href='/events'
              className='group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-[rgb(var(--navy-950))] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgb(var(--finnish-blue)/0.4)]'
            >
              <span className='relative z-10'>{t('viewEvents')}</span>
              <svg
                className='relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1'
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
              {/* Shine effect */}
              <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[rgb(var(--finnish-blue)/0.1)] to-transparent transition-transform duration-700 group-hover:translate-x-full' />
            </Link>

            <Link
              href='/articles'
              className='group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10'
            >
              {t('learnMore')}
              <span className='transition-transform duration-300 group-hover:translate-x-1'>
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* Info bar */}
        <div
          className='absolute bottom-12 left-1/2 flex -translate-x-1/2 items-center gap-8 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 backdrop-blur-md sm:gap-12 fade-in-up'
          style={{ animationDelay: '0.3s' }}
        >
          <div className='text-center'>
            <div className='text-xs font-medium uppercase tracking-wider text-white/50'>
              Helsinki, Finland
            </div>
          </div>
          <div className='h-8 w-px bg-white/10' />
          <div className='text-center'>
            <div className='text-xs font-medium uppercase tracking-wider text-white/50'>
              Meetups & Conferences
            </div>
          </div>
          <div className='h-8 w-px bg-white/10' />
          <div className='text-center'>
            <div className='text-xs font-medium uppercase tracking-wider text-white/50'>
              Open Source
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade to white */}
      <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent' />

      {/* Decorative elements */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        {/* Floating code snippets (decorative) */}
        <div className='absolute left-[10%] top-[20%] rotate-[-8deg] rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs text-white/30 backdrop-blur-sm animate-float'>
          {'<App />'}
        </div>
        <div
          className='absolute right-[15%] top-[30%] rotate-[5deg] rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs text-white/30 backdrop-blur-sm animate-float'
          style={{ animationDelay: '1s' }}
        >
          {'npx expo start'}
        </div>
        <div
          className='absolute left-[8%] bottom-[35%] rotate-[3deg] rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs text-white/30 backdrop-blur-sm animate-float'
          style={{ animationDelay: '2s' }}
        >
          {'import React'}
        </div>
        <div
          className='absolute right-[10%] bottom-[40%] rotate-[-4deg] rounded-lg border border-white/5 bg-white/5 px-4 py-2 font-mono text-xs text-white/30 backdrop-blur-sm animate-float'
          style={{ animationDelay: '1.5s' }}
        >
          {'useNativeDriver: true'}
        </div>
      </div>
    </section>
  );
};
