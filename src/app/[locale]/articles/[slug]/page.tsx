import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrism from 'rehype-prism-plus';

import {
  getAllArticleSlugs,
  getArticleBySlug,
  getArticleContent,
  hasTranslation,
} from '@/lib/articles';

import { ArticleJsonLd } from '@/components/ArticleJsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Callout } from '@/components/Callout';
import { Keyboard } from '@/components/Keyboard';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';

import { siteConfig } from '@/constant/config';
import { defaultLocale, Locale, locales } from '@/i18n/config';

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
};

// Custom Image component that provides default dimensions
const ArticleImage = (
  props: React.ComponentProps<typeof Image> & { src: string; alt?: string },
) => {
  const { width, height, ...rest } = props;
  return (
    <Image
      {...rest}
      width={width || 800}
      height={height || 450}
      className={props.className || 'rounded-xl'}
      alt={props.alt || ''}
    />
  );
};

// Custom MDX components
const components = {
  Image: ArticleImage,
  Callout,
  Keyboard,
  YouTubeEmbed,
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      {...(props as React.ComponentProps<typeof Image>)}
      width={800}
      height={450}
      className='rounded-xl'
      alt={props.alt || ''}
    />
  ),
};

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return locales.flatMap((locale) =>
    slugs.map((slug) => ({
      locale,
      slug,
    })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, locale } = await params;
  const article = await getArticleBySlug(slug, locale);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  // If this locale has no translation, canonical should point to the default locale
  const isUntranslated =
    locale !== defaultLocale && !hasTranslation(slug, locale);
  const canonicalUrl = isUntranslated
    ? `${siteConfig.url}/${defaultLocale}/articles/${slug}`
    : `${siteConfig.url}/${locale}/articles/${slug}`;
  const articleUrl = `${siteConfig.url}/${locale}/articles/${slug}`;

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: `${siteConfig.url}/en/articles/${slug}`,
        fi: `${siteConfig.url}/fi/articles/${slug}`,
      },
    },
    openGraph: {
      title: article.title,
      description: article.description,
      url: articleUrl,
      type: 'article',
      publishedTime: article.date,
      authors: [
        typeof article.author === 'string'
          ? article.author
          : article.author.name,
      ],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug, locale } = await params;
  setRequestLocale(locale);

  const article = await getArticleBySlug(slug, locale);
  const content = getArticleContent(slug, locale);

  if (!article || !content) {
    notFound();
  }

  // Check if viewing a fallback (English content on Finnish page)
  const isShowingFallback =
    locale !== defaultLocale && !hasTranslation(slug, locale);

  // Compile MDX content
  const { content: mdxContent } = await compileMDX({
    source: content,
    components,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        rehypePlugins: [rehypePrism],
      },
    },
  });

  const formattedDate = new Date(article.date).toLocaleDateString(
    locale === 'fi' ? 'fi-FI' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    },
  );

  const authorName =
    typeof article.author === 'string' ? article.author : article.author.name;
  const articleUrl = `${siteConfig.url}/${locale}/articles/${slug}`;
  const ogImageUrl = `${siteConfig.url}/${locale}/articles/${slug}/opengraph-image`;

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        datePublished={article.date}
        authorName={authorName}
        url={articleUrl}
        imageUrl={ogImageUrl}
      />
      <article className='bg-white py-16 sm:py-24'>
        <div className='mx-auto max-w-3xl px-6 lg:px-8'>
          {/* Breadcrumbs */}
          <Breadcrumbs
            homeLabel={locale === 'fi' ? 'Etusivu' : 'Home'}
            items={[
              {
                name: locale === 'fi' ? 'Artikkelit' : 'Articles',
                href: '/articles',
              },
              { name: article.title },
            ]}
          />

          {/* Fallback notice */}
          {isShowingFallback && (
            <div className='mb-8 rounded-lg bg-amber-50 border border-amber-200 p-4'>
              <p className='text-sm text-amber-800'>
                {locale === 'fi'
                  ? 'Tätä artikkelia ei ole vielä käännetty suomeksi. Näytetään englanninkielinen versio.'
                  : 'This article is not yet translated. Showing the English version.'}
              </p>
            </div>
          )}

          <header className='mb-12'>
            <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {article.title}
            </h1>
            <div className='mt-3 flex items-center gap-3'>
              <p className='text-sm text-gray-700'>
                {locale === 'fi' ? 'Kirjoittanut' : 'By'}{' '}
                <span className='font-medium'>{authorName}</span>
              </p>
              <span className='text-sm text-gray-400'>•</span>
              <time dateTime={article.date} className='text-sm text-gray-500'>
                {formattedDate}
              </time>
            </div>
            <div className='relative mt-6 mb-8 aspect-[1200/630] overflow-hidden rounded-xl'>
              <Image
                src={`/${locale}/articles/${slug}/opengraph-image`}
                alt={article.title}
                fill
                sizes='(max-width: 768px) 100vw, 768px'
                className='object-cover'
                placeholder='blur'
                blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMDAyYiIvPjwvc3ZnPg=='
                priority
              />
            </div>
          </header>
          <div className='prose prose-lg prose-gray max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:bg-gray-900'>
            {mdxContent}
          </div>

          {/* Back to articles */}
          <div className='mt-12 pt-8 border-t border-gray-200'>
            <Link
              href={`/${locale}/articles`}
              className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
            >
              ←{' '}
              {locale === 'fi' ? 'Takaisin artikkeleihin' : 'Back to articles'}
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
