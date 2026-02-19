const { glob } = require('glob');
const path = require('path');

// Get all article slugs from the filesystem
function getArticleSlugs() {
  const articlesDir = path.join(__dirname, 'src/app/articles');
  const articles = glob.sync('*/page.mdx', { cwd: articlesDir });
  return articles.map((file) => file.split('/')[0]);
}

/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  siteUrl: 'https://react-native.fi',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
  // Exclude internal routes and opengraph images
  exclude: [
    '/components',
    '/components/*',
    '*/opengraph-image',
    '*/opengraph-image/*',
    '/api/*',
  ],
  // Change frequency and priority settings
  changefreq: 'weekly',
  priority: 0.7,
  // Add article pages that are dynamically rendered
  additionalPaths: async () => {
    const articleSlugs = getArticleSlugs();
    return articleSlugs.map((slug) => ({
      loc: `/articles/${slug}`,
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));
  },
  // Transform to set custom priorities
  transform: async (config, path) => {
    // Homepage gets highest priority
    if (path === '/') {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 1.0,
        lastmod: new Date().toISOString(),
      };
    }
    // Main section pages
    if (['/articles', '/developers', '/events'].includes(path)) {
      return {
        loc: path,
        changefreq: 'daily',
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }
    // Individual content pages
    if (
      path.startsWith('/articles/') ||
      path.startsWith('/developers/') ||
      path.startsWith('/events/')
    ) {
      return {
        loc: path,
        changefreq: 'weekly',
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    // Default
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: new Date().toISOString(),
    };
  },
};
