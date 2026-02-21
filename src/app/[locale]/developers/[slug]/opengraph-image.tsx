import { ImageResponse } from 'next/og';

import { getDeveloperBySlug } from '@/lib/developers';

import { Locale } from '@/i18n/config';

export const alt = 'Developer';
export const contentType = 'image/png';

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;
  const developer = getDeveloperBySlug(slug);

  const name = developer
    ? developer.name
    : slug
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

  const role = developer?.role || '';
  const expertise = developer?.expertise || [];

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
        background:
          'linear-gradient(135deg, #001E47 0%, #002F6C 50%, #1A5FAA 100%)',
      }}
    >
      {/* Grid overlay */}
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
              Developer
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

        {/* Name + role */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            maxWidth: '80%',
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
            {name}
          </span>

          {role && (
            <span
              style={{
                fontSize: 26,
                fontWeight: 400,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              {role}
            </span>
          )}

          {/* Expertise tags */}
          {expertise.length > 0 && (
            <div
              style={{
                display: 'flex',
                gap: '10px',
                marginTop: '8px',
                flexWrap: 'wrap',
              }}
            >
              {expertise.slice(0, 4).map((skill) => (
                <span
                  key={skill}
                  style={{
                    fontSize: 16,
                    fontWeight: 400,
                    color: 'rgba(255,255,255,0.9)',
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    padding: '6px 14px',
                    borderRadius: '20px',
                  }}
                >
                  {skill}
                </span>
              ))}
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
