import { siteConfig } from '@/constant/config';
import { Link } from '@/i18n/navigation';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  homeLabel?: string;
}

export function Breadcrumbs({ items, homeLabel = 'Home' }: BreadcrumbsProps) {
  // Build full URLs for JSON-LD
  const jsonLdItems = items
    .filter((item) => item.href)
    .map((item) => ({
      name: item.name,
      url: item.href?.startsWith('http')
        ? item.href
        : `${siteConfig.url}${item.href}`,
    }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeLabel,
        item: siteConfig.url,
      },
      ...jsonLdItems.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.name,
        item: item.url,
      })),
      // Add current page (last item without href)
      ...(items.length > 0 && !items[items.length - 1].href
        ? [
            {
              '@type': 'ListItem',
              position: jsonLdItems.length + 2,
              name: items[items.length - 1].name,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label='Breadcrumb' className='mb-4'>
        <ol className='flex items-center space-x-2 text-sm text-gray-500'>
          <li>
            <Link href='/' className='hover:text-gray-700'>
              {homeLabel}
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className='flex items-center'>
              <svg
                className='mx-2 h-4 w-4 flex-shrink-0 text-gray-400'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z'
                  clipRule='evenodd'
                />
              </svg>
              {item.href ? (
                <Link
                  href={item.href as '/events' | '/articles' | '/developers'}
                  className='hover:text-gray-700'
                >
                  {item.name}
                </Link>
              ) : (
                <span className='text-gray-900 font-medium'>{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
