import { siteConfig } from '@/constant/config';

interface EventJsonLdProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
    city: string;
  };
  url: string;
  imageUrl?: string;
  organizer?: string;
}

export function EventJsonLd({
  name,
  description,
  startDate,
  endDate,
  location,
  url,
  imageUrl,
  organizer,
}: EventJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: name,
    description: description,
    startDate: startDate,
    ...(endDate && { endDate: endDate }),
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: location.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: location.address,
        addressLocality: location.city,
        addressCountry: 'FI',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: organizer || 'React Native Helsinki',
      url: siteConfig.url,
    },
    ...(imageUrl && {
      image: imageUrl,
    }),
    url: url,
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
