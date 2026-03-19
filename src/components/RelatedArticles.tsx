import { Article } from '@/lib/articles';

import { ArticleCard } from '@/app/components/article-card';

interface RelatedArticlesProps {
  articles: Article[];
  locale: string;
}

export function RelatedArticles({ articles, locale }: RelatedArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section className='mt-16 pt-8 border-t border-gray-200'>
      <h2 className='text-xl font-semibold text-gray-900 mb-8'>
        {locale === 'fi'
          ? 'Aiheeseen liittyvät artikkelit'
          : 'Related Articles'}
      </h2>
      <div className='grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3'>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </section>
  );
}
