interface PersonJsonLdProps {
  name: string;
  jobTitle: string;
  description: string;
  url: string;
  imageUrl?: string;
  sameAs?: string[];
  location?: string;
  knowsAbout?: string[];
}

export function PersonJsonLd({
  name,
  jobTitle,
  description,
  url,
  imageUrl,
  sameAs,
  location,
  knowsAbout,
}: PersonJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    jobTitle: jobTitle,
    description: description,
    url: url,
    ...(imageUrl && { image: imageUrl }),
    ...(sameAs && sameAs.length > 0 && { sameAs: sameAs }),
    ...(location && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: location.split(',')[0]?.trim(),
        addressCountry: 'FI',
      },
    }),
    ...(knowsAbout && knowsAbout.length > 0 && { knowsAbout: knowsAbout }),
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
