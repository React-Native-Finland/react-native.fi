'use client';

import { useParams, useRouter, useSearchParams } from 'next/navigation';

import { ArticleTag, articleTagLabels } from '@/lib/article-tags';

export function ArticleTagFilter({
  availableTags,
}: {
  availableTags: ArticleTag[];
}) {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'en';
  const activeTag = searchParams.get('tag') as ArticleTag | null;

  const handleTagClick = (tag: ArticleTag | null) => {
    const url = new URL(window.location.href);
    if (tag) {
      url.searchParams.set('tag', tag);
    } else {
      url.searchParams.delete('tag');
    }
    router.push(url.pathname + url.search, { scroll: false });
  };

  return (
    <div className='flex flex-wrap gap-2'>
      <button
        onClick={() => handleTagClick(null)}
        className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
          !activeTag
            ? 'bg-indigo-600 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        {locale === 'fi' ? 'Kaikki' : 'All'}
      </button>
      {availableTags.map((tag) => (
        <button
          key={tag}
          onClick={() => handleTagClick(tag)}
          className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
            activeTag === tag
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {articleTagLabels[tag][locale === 'fi' ? 'fi' : 'en']}
        </button>
      ))}
    </div>
  );
}
