'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export type ArticleCardProps = {
  article: {
    slug?: string;
    href?: string;
    title: string;
    description: string;
    date: string;
    imageUrl?: string;
    locale?: string;
    category?: { title: string; href: string };
    author?:
      | string
      | {
          name: string;
          role: string;
          tagline?: string;
          href: string;
          imageUrl: string;
        };
  };
};

export const ArticleCard = ({ article }: ArticleCardProps) => {
  const params = useParams();
  const locale = (params?.locale as string) || article.locale || 'en';

  // Use either the provided href or construct one from the slug with locale
  const href = article.href || `/${locale}/articles/${article.slug}`;

  // Helper to handle both string and object authors
  const author =
    typeof article.author === 'string'
      ? { name: article.author, role: '', tagline: '', href: '#', imageUrl: '' }
      : article.author;

  // Generate OG image URL from slug - use locale-aware path
  const ogImageUrl = article.slug
    ? `/${locale}/articles/${article.slug}/opengraph-image`
    : null;

  // Use OG image if available, otherwise fall back to provided imageUrl
  const displayImage = ogImageUrl || article.imageUrl;

  return (
    <article className='flex flex-col items-start'>
      {displayImage && (
        <Link href={href} className='relative w-full block aspect-[1200/630]'>
          <Image
            src={displayImage}
            alt={article.title}
            fill
            sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
            className='rounded-2xl bg-gray-100 object-cover'
            placeholder='blur'
            blurDataURL='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MzAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzFhMDAyYiIvPjwvc3ZnPg=='
          />
          <div className='absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10' />
        </Link>
      )}
      <div className='mt-4 max-w-xl'>
        <div className='flex gap-x-4 text-xs'>
          {article.category && (
            <a
              href={article.category.href}
              className='relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100'
            >
              {article.category.title}
            </a>
          )}
        </div>
        <div className='group relative'>
          <h3 className='text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600'>
            {article.href ? (
              <a href={article.href}>
                <span className='absolute inset-0' />
                {article.title}
              </a>
            ) : (
              <Link href={href}>
                <span className='absolute inset-0' />
                {article.title}
              </Link>
            )}
          </h3>
          <time dateTime={article.date} className='text-sm text-gray-500 mt-2'>
            {new Date(article.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </time>
          <p className='mt-5 line-clamp-3 text-sm/6 text-gray-600'>
            {article.description}
          </p>
        </div>
        {author && (
          <div className='relative mt-8 flex items-center gap-x-4'>
            {author.imageUrl ? (
              <img
                src={author.imageUrl}
                alt=''
                className='size-10 rounded-full bg-gray-100 object-cover'
              />
            ) : (
              <div className='size-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold'>
                {author.name.charAt(0)}
              </div>
            )}
            <div className='text-sm/6'>
              <p className='font-semibold text-gray-900'>
                {author.href && author.href !== '#' ? (
                  <a href={author.href}>
                    <span className='absolute inset-0' />
                    {author.name}
                  </a>
                ) : (
                  <span>{author.name}</span>
                )}
              </p>
              {author.role && <p className='text-gray-600'>{author.role}</p>}
              {author.tagline && (
                <p className='text-gray-500 text-xs'>{author.tagline}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
};
