import { ArticleCard } from '@/app/components/article-card';

const posts = [
  {
    title: 'Making Money with Your React Native App',
    href: 'https://perttu.dev/articles/in-app-purchases-rn',
    description:
      'Learn about app monetization and in-app purchases in React Native. This comprehensive guide covers what you need to know about in-app purchases, how to set them up, and insights from psychology and service design.',
    imageUrl: '/images/cover.webp',
    date: '2024-12-31',
    category: { title: 'Development', href: '#' },
    author: {
      name: 'Perttu Lähteenlahti',
      role: 'React Native Developer',
      href: 'https://perttu.dev',
      imageUrl: '/images/perttu.jpeg',
    },
  },
  {
    title: 'Adding Custom Options to React Native Developer Menu',
    href: 'https://perttu.dev/articles/adding-custom-options-to-react-native-developer-menu',
    description:
      'Learn how to customize the Developer Menu in React Native with your custom actions. A practical guide to enhancing your development workflow with custom menu options.',
    imageUrl: '/images/developer-menu.jpg',
    date: '2023-12-02',
    category: { title: 'Development', href: '#' },
    author: {
      name: 'Perttu Lähteenlahti',
      role: 'React Native Developer',
      href: 'https://perttu.dev',
      imageUrl: '/images/perttu.jpeg',
    },
  },
  {
    title: 'Fixing VirtualizedLists Nesting Warning in React Native',
    href: 'https://perttu.dev/articles/fixing-virtualizedlists-should-never-be-nested-inside-plain-scrollviews',
    description:
      'A practical solution to the common warning "VirtualizedLists should never be nested inside plain ScrollViews" in React Native development, with explanations and code examples.',
    imageUrl: '/images/virtualized-lists.webp',
    date: '2025-01-19',
    category: { title: 'Development', href: '#' },
    author: {
      name: 'Perttu Lähteenlahti',
      role: 'React Native Developer',
      href: 'https://perttu.dev',
      imageUrl: '/images/perttu.jpeg',
    },
  },
];

export const BlogPostOverview = () => {
  return (
    <div className='bg-white py-24 sm:py-32'>
      <div className='mx-auto max-w-7xl px-6 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <h2 className='text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl'>
            React Native Insights
          </h2>
          <p className='mt-2 text-lg/8 text-gray-600'>
            Expert articles on React Native development, from in-app purchases
            to performance optimization.
          </p>
        </div>
        <div className='mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3'>
          {posts.map((post) => (
            <ArticleCard key={post.title} article={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
