import { ImageResponse } from 'next/og';

// Split title into lines for display
function splitTitle(title: string): string[] {
  const words = title.split(' ');
  if (words.length <= 3) {
    return [title];
  }
  if (words.length <= 5) {
    const mid = Math.ceil(words.length / 2);
    return [words.slice(0, mid).join(' '), words.slice(mid).join(' ')];
  }
  // For longer titles, split into 3 lines
  const third = Math.ceil(words.length / 3);
  return [
    words.slice(0, third).join(' '),
    words.slice(third, third * 2).join(' '),
    words.slice(third * 2).join(' '),
  ];
}

interface EventInfo {
  date: string;
  venue: string;
  city: string;
}

export async function generateBlueprintOgImage(
  title: string,
  _slug?: string,
  category?: string,
  author?: { name: string; title: string; image?: string },
  event?: EventInfo,
) {
  const lines = splitTitle(title);
  const label = category || 'ARTICLE';

  // Load Inter fonts from jsdelivr CDN (TTF format required for @vercel/og)
  const interBold = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf',
  ).then((res) => res.arrayBuffer());

  const interSemiBold = await fetch(
    'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-600-normal.ttf',
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
        background: 'linear-gradient(135deg, #120021 0%, #2b0c46 100%)',
      }}
    >
      {/* Grid pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Content container */}
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
        {/* Top row: Label and Branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Label */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <div
              style={{
                width: 28,
                height: 28,
                backgroundColor: 'rgba(255,255,255,0.3)',
                borderRadius: 4,
              }}
            />
            <span
              style={{
                fontSize: 18,
                fontWeight: 600,
                color: '#cccccc',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </span>
          </div>

          {/* Branding */}
          <span
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: 'white',
              fontFamily: 'monospace',
            }}
          >
            react-native.fi
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            maxWidth: '95%',
          }}
        >
          {/* Headline */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0px',
            }}
          >
            {lines.map((line, i) => (
              <span
                key={i}
                style={{
                  fontSize: 72,
                  fontWeight: 700,
                  color: 'white',
                  lineHeight: 1.1,
                  letterSpacing: '-2px',
                }}
              >
                {line}
              </span>
            ))}
          </div>

          {/* Author section */}
          {author && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                marginTop: '12px',
              }}
            >
              {/* Author image placeholder */}
              <div
                style={{
                  width: 72,
                  height: 72,
                  backgroundColor: 'white',
                  borderRadius: 10,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {author.image && (
                  <img
                    src={author.image}
                    width={72}
                    height={72}
                    style={{ objectFit: 'cover' }}
                  />
                )}
              </div>
              {/* Author info */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <span
                  style={{
                    fontSize: 24,
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  {author.name}
                </span>
                <span
                  style={{
                    fontSize: 20,
                    fontWeight: 400,
                    color: 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {author.title}
                </span>
              </div>
            </div>
          )}

          {/* Event section */}
          {event && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                marginTop: '12px',
              }}
            >
              {/* Calendar icon */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <svg
                  width='28'
                  height='28'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='rgba(255,255,255,0.7)'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect x='3' y='4' width='18' height='18' rx='2' ry='2'></rect>
                  <line x1='16' y1='2' x2='16' y2='6'></line>
                  <line x1='8' y1='2' x2='8' y2='6'></line>
                  <line x1='3' y1='10' x2='21' y2='10'></line>
                </svg>
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: 'white',
                  }}
                >
                  {event.date}
                </span>
              </div>
              {/* Location */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                }}
              >
                <svg
                  width='28'
                  height='28'
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
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {event.venue}, {event.city}
                </span>
              </div>
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
          data: interSemiBold,
          style: 'normal',
          weight: 600,
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
