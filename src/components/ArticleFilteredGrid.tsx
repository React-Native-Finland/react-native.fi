'use client';

import { useSearchParams } from 'next/navigation';

import { ArticleTag } from '@/lib/article-tags';
import { Article } from '@/lib/articles';

import { ArticleCard } from '@/app/components/article-card';

export function ArticleFilteredGrid({ articles }: { articles: Article[] }) {
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag') as ArticleTag | null;

  const filtered = activeTag
    ? articles.filter((a) => a.tags?.includes(activeTag))
    : articles;

  if (filtered.length === 0) {
    return (
      <p className='mt-12 text-center text-gray-500'>
        No articles found for this category.
      </p>
    );
  }

  return (
    <div className='mt-12 grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3'>
      {filtered.map((article) => (
        <ArticleCard key={article.slug} article={article} />
      ))}
    </div>
  );
}
