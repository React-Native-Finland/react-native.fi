'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArticleJsonLd } from '@/components/ArticleJsonLd';
import { BreadcrumbJsonLd } from '@/components/BreadcrumbJsonLd';

import { siteConfig } from '@/constant/config';

interface Article {
  title: string;
  date: string;
  description: string;
  author: string;
  authorTagline?: string;
  authorSlug?: string;
  canonical?: string;
}

interface ArticleLayoutProps {
  article: Article;
  children: React.ReactNode;
}

export function ArticleLayout({ article, children }: ArticleLayoutProps) {
  const pathname = usePathname();
  const formattedDate = new Date(article.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Generate OG image URL from current path
  const ogImageUrl = `${pathname}/opengraph-image`;
  const fullUrl = `${siteConfig.url}${pathname}`;
  const fullImageUrl = `${siteConfig.url}${ogImageUrl}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Articles', url: `${siteConfig.url}/articles` },
          { name: article.title, url: fullUrl },
        ]}
      />
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        datePublished={article.date}
        authorName={article.author}
        authorUrl={
          article.authorSlug === 'perttu-lahteenlahti'
            ? 'https://perttu.dev'
            : article.authorSlug
              ? `${siteConfig.url}/developers/${article.authorSlug}`
              : undefined
        }
        authorId={
          article.authorSlug === 'perttu-lahteenlahti'
            ? 'https://perttu.dev/#person'
            : undefined
        }
        url={fullUrl}
        imageUrl={fullImageUrl}
      />
      <article className='bg-white py-16 sm:py-24'>
        <div className='mx-auto max-w-3xl px-6 lg:px-8'>
          <header className='mb-12'>
            <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
              {article.title}
            </h1>
            <div className='mt-3 flex items-center gap-3'>
              <div className='flex flex-col'>
                <p className='text-sm text-gray-700'>
                  By{' '}
                  {article.authorSlug === 'perttu-lahteenlahti' ? (
                    <a
                      href='https://perttu.dev'
                      rel='author'
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      {article.author}
                    </a>
                  ) : article.authorSlug ? (
                    <Link
                      href={`/developers/${article.authorSlug}`}
                      className='font-medium text-indigo-600 hover:text-indigo-500'
                    >
                      {article.author}
                    </Link>
                  ) : (
                    <span className='font-medium'>{article.author}</span>
                  )}
                </p>
                {article.authorTagline && (
                  <p className='text-xs text-gray-500'>
                    {article.authorTagline}
                  </p>
                )}
              </div>
              <span className='text-sm text-gray-400'>•</span>
              <time dateTime={article.date} className='text-sm text-gray-500'>
                {formattedDate}
              </time>
            </div>
            <div className='relative mt-6 mb-8 aspect-[1200/630] overflow-hidden rounded-xl'>
              <Image
                src={ogImageUrl}
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
            {children}
          </div>
          {article.canonical && (
            <div className='mt-12 pt-8 border-t border-gray-200'>
              <p className='text-sm text-gray-600'>
                This article was originally published at{' '}
                <a
                  href={article.canonical}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='text-indigo-600 hover:text-indigo-500 underline'
                >
                  {new URL(article.canonical).hostname}
                </a>
              </p>
            </div>
          )}
        </div>
      </article>
    </>
  );
}
