import { ImageResponse } from 'next/og';

import { getEventBySlug } from '@/lib/events';

import { Locale, locales } from '@/i18n/config';

export const runtime = 'edge';
export const alt = 'Event';
export const contentType = 'image/png';

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

// Deterministic hash from a string to generate consistent colors per event
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// Generate mesh gradient colors from an event date string
function getMeshColors(dateStr: string) {
  const h = hashString(dateStr);

  // Base hue derived from the date — each event gets a different region of the color wheel
  const baseHue = h % 360;

  // Four gradient stops with hue variation for a rich mesh effect
  const hues = [
    baseHue,
    (baseHue + 40) % 360,
    (baseHue + 160) % 360,
    (baseHue + 220) % 360,
  ];

  return hues.map(
    (hue, i) =>
      `hsl(${hue}, ${65 + i * 5}%, ${i < 2 ? 45 + i * 10 : 30 + i * 5}%)`,
  );
}

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  const title = event
    ? event.title
    : slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

  const dateStr = event?.date || slug;
  const colors = getMeshColors(dateStr);

  const formattedDate = event
    ? new Date(event.date).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  const venue = event ? `${event.venue.name}, ${event.venue.city}` : '';

  // Load Inter font
  const interBold = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf',
  ).then((res) => res.arrayBuffer());

  const interRegular = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: 'Inter',
        position: 'relative',
        overflow: 'hidden',
        background: '#0a0a1a',
      }}
    >
      {/* Mesh gradient orbs */}
      <div
        style={{
          position: 'absolute',
          top: '-20%',
          left: '-10%',
          width: '70%',
          height: '80%',
          borderRadius: '50%',
          background: colors[0],
          filter: 'blur(80px)',
          opacity: 0.6,
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '-15%',
          width: '60%',
          height: '70%',
          borderRadius: '50%',
          background: colors[1],
          filter: 'blur(90px)',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-25%',
          left: '20%',
          width: '65%',
          height: '75%',
          borderRadius: '50%',
          background: colors[2],
          filter: 'blur(100px)',
          opacity: 0.5,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '45%',
          height: '55%',
          borderRadius: '50%',
          background: colors[3],
          filter: 'blur(70px)',
          opacity: 0.4,
        }}
      />

      {/* Subtle noise/grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%',
          padding: '50px 60px',
          position: 'relative',
        }}
      >
        {/* Top: label + branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: 28,
                height: 28,
                backgroundColor: 'rgba(255,255,255,0.25)',
                borderRadius: 4,
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 700,
                color: 'rgba(255,255,255,0.7)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              Event
            </span>
          </div>
          <span
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.8)',
              fontFamily: 'monospace',
            }}
          >
            react-native.fi
          </span>
        </div>

        {/* Title */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '90%',
          }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 700,
              color: 'white',
              lineHeight: 1.1,
              letterSpacing: '-2px',
            }}
          >
            {title}
          </span>

          {/* Date + venue row */}
          {(formattedDate || venue) && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginTop: '8px',
              }}
            >
              {formattedDate && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='rgba(255,255,255,0.7)'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <rect
                      x='3'
                      y='4'
                      width='18'
                      height='18'
                      rx='2'
                      ry='2'
                    ></rect>
                    <line x1='16' y1='2' x2='16' y2='6'></line>
                    <line x1='8' y1='2' x2='8' y2='6'></line>
                    <line x1='3' y1='10' x2='21' y2='10'></line>
                  </svg>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.8)',
                    }}
                  >
                    {formattedDate}
                  </span>
                </div>
              )}
              {venue && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <svg
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='rgba(255,255,255,0.7)'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'></path>
                    <circle cx='12' cy='10' r='3'></circle>
                  </svg>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 400,
                      color: 'rgba(255,255,255,0.6)',
                    }}
                  >
                    {venue}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom spacer */}
        <div style={{ display: 'flex', height: 20 }} />
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'Inter',
          data: interBold,
          style: 'normal',
          weight: 700,
        },
        {
          name: 'Inter',
          data: interRegular,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}
