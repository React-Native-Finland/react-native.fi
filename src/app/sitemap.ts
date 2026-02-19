import { MetadataRoute } from 'next';

import { getAllArticles } from '@/lib/articles';
import { getAllDevelopers } from '@/lib/developers';
import { getAllEvents } from '@/lib/events';

import { siteConfig } from '@/constant/config';
import { locales } from '@/i18n/config';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getAllArticles();
  const events = getAllEvents();
  const developers = getAllDevelopers();

  // Generate URLs for both locales
  const localeUrls = locales.flatMap((locale) => [
    {
      url: `${siteConfig.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en`,
          fi: `${siteConfig.url}/fi`,
        },
      },
    },
    {
      url: `${siteConfig.url}/${locale}/articles`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/articles`,
          fi: `${siteConfig.url}/fi/articles`,
        },
      },
    },
    {
      url: `${siteConfig.url}/${locale}/events`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/events`,
          fi: `${siteConfig.url}/fi/events`,
        },
      },
    },
    {
      url: `${siteConfig.url}/${locale}/developers`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/developers`,
          fi: `${siteConfig.url}/fi/developers`,
        },
      },
    },
    {
      url: `${siteConfig.url}/${locale}/conferences`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/conferences`,
          fi: `${siteConfig.url}/fi/conferences`,
        },
      },
    },
    {
      url: `${siteConfig.url}/${locale}/consulting`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/consulting`,
          fi: `${siteConfig.url}/fi/consulting`,
        },
      },
    },
    {
      url: `${siteConfig.url}/${locale}/sponsors`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/sponsors`,
          fi: `${siteConfig.url}/fi/sponsors`,
        },
      },
    },
    {
      url: `${siteConfig.url}/${locale}/jobs`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/jobs`,
          fi: `${siteConfig.url}/fi/jobs`,
        },
      },
    },
  ]);

  // Event URLs for both locales
  const eventUrls = locales.flatMap((locale) =>
    events.map((event) => ({
      url: `${siteConfig.url}/${locale}/events/${event.slug}`,
      lastModified: new Date(event.date),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/events/${event.slug}`,
          fi: `${siteConfig.url}/fi/events/${event.slug}`,
        },
      },
    })),
  );

  // Developer URLs for both locales
  const developerUrls = locales.flatMap((locale) =>
    developers.map((developer) => ({
      url: `${siteConfig.url}/${locale}/developers/${developer.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/developers/${developer.slug}`,
          fi: `${siteConfig.url}/fi/developers/${developer.slug}`,
        },
      },
    })),
  );

  // Article URLs for both locales
  const articleUrls = locales.flatMap((locale) =>
    articles.map((article) => ({
      url: `${siteConfig.url}/${locale}/articles/${article.slug}`,
      lastModified: new Date(article.date),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          en: `${siteConfig.url}/en/articles/${article.slug}`,
          fi: `${siteConfig.url}/fi/articles/${article.slug}`,
        },
      },
    })),
  );

  return [...localeUrls, ...eventUrls, ...developerUrls, ...articleUrls];
}
