import createMDX from '@next/mdx';
import createNextIntlPlugin from 'next-intl/plugin';
import remarkGfm from 'remark-gfm';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  reactStrictMode: true,

  async redirects() {
    return [
      // Redirect old non-localized article URLs to English versions
      {
        source: '/articles/:slug',
        destination: '/en/articles/:slug',
        permanent: true,
      },
      {
        source: '/articles',
        destination: '/en/articles',
        permanent: true,
      },
      // Redirect old non-localized event URLs to English versions
      {
        source: '/events/:slug',
        destination: '/en/events/:slug',
        permanent: true,
      },
      {
        source: '/events',
        destination: '/en/events',
        permanent: true,
      },
      // Redirect old non-localized developer URLs to English versions
      {
        source: '/developers/:slug',
        destination: '/en/developers/:slug',
        permanent: true,
      },
      {
        source: '/developers',
        destination: '/en/developers',
        permanent: true,
      },
      // Redirect conferences to English
      {
        source: '/conferences',
        destination: '/en/conferences',
        permanent: true,
      },
      // Redirect consulting to English
      {
        source: '/consulting',
        destination: '/en/consulting',
        permanent: true,
      },
      // Redirect old personal site pages to perttu.dev
      {
        source: '/speaking',
        destination: 'https://perttu.dev/speaking',
        permanent: true,
      },
      {
        source: '/uses',
        destination: 'https://perttu.dev/uses',
        permanent: true,
      },
      {
        source: '/about',
        destination: 'https://perttu.dev/about',
        permanent: true,
      },
      {
        source: '/projects',
        destination: 'https://perttu.dev/projects',
        permanent: true,
      },
      // Redirect removed article to articles page
      {
        source: '/articles/using-environment-variables-in-netlify',
        destination: '/en/articles',
        permanent: true,
      },
      {
        source: '/:locale(en|fi)/articles/using-environment-variables-in-netlify',
        destination: '/:locale/articles',
        permanent: true,
      },
      // Redirect old personal blog articles to perttu.dev
      {
        source: '/articles/what-i-read-in-2018',
        destination: 'https://perttu.dev/articles/what-i-read-in-2018',
        permanent: true,
      },
      {
        source: '/articles/20-things-about-2020',
        destination: 'https://perttu.dev/articles/20-things-about-2020',
        permanent: true,
      },
      {
        source: '/articles/hackathon-diaries-kuohu-creative-hackathon',
        destination: 'https://perttu.dev/articles/hackathon-diaries-kuohu-creative-hackathon',
        permanent: true,
      },
      {
        source: '/articles/designing-a-winning-hackathon-concept',
        destination: 'https://perttu.dev/articles/designing-a-winning-hackathon-concept',
        permanent: true,
      },
      {
        source: '/articles/apps.shipaton.com',
        destination: 'https://perttu.dev/articles/apps.shipaton.com',
        permanent: true,
      },
      {
        source: '/articles/the-role-of-designers-subjective-interpretations-in-human-centered-design',
        destination: 'https://perttu.dev/articles/the-role-of-designers-subjective-interpretations-in-human-centered-design',
        permanent: true,
      },
      {
        source: '/articles/screenwriting-vs-novel-writing-and-the-se7en-novelization',
        destination: 'https://perttu.dev/articles/screenwriting-vs-novel-writing-and-the-se7en-novelization',
        permanent: true,
      },
      {
        source: '/articles/how-to-get-the-old-slack-ui-back',
        destination: 'https://perttu.dev/articles/how-to-get-the-old-slack-ui-back',
        permanent: true,
      },
      {
        source: '/articles/throttling-and-memoing-app-store-scraping',
        destination: 'https://perttu.dev/articles/throttling-and-memoing-app-store-scraping',
        permanent: true,
      },
    ];
  },

  async headers() {
    return [
      {
        // Block indexing of opengraph images and static assets
        source: '/:path*/opengraph-image',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
      {
        source: '/opengraph-image',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg'),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: { not: /\.(css|scss|sass)$/ },
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        loader: '@svgr/webpack',
        options: {
          dimensions: false,
          titleProp: true,
        },
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withNextIntl(withMDX(nextConfig));
