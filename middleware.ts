import createMiddleware from 'next-intl/middleware';

import { defaultLocale, localePrefix, locales } from './src/i18n/config';

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection: true,
});

export const config = {
  matcher: [
    // Match root path explicitly
    '/',
    // Match locale paths
    '/(en|fi)/:path*',
    // Match all pathnames except for
    // - API routes
    // - Static files
    // - Internal Next.js paths
    '/((?!api|_next|_vercel|.*\\..*).*)',
  ],
};
