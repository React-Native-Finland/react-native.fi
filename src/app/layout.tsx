import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import * as React from 'react';

import '@/styles/globals.css';

import { siteConfig } from '@/constant/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  manifest: `/favicon/site.webmanifest`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning>
      <head>
        <link rel='alternate' hrefLang='en' href={`${siteConfig.url}/en`} />
        <link rel='alternate' hrefLang='fi' href={`${siteConfig.url}/fi`} />
        <link
          rel='alternate'
          hrefLang='x-default'
          href={`${siteConfig.url}/en`}
        />
      </head>
      <body>{children}</body>
      <Analytics />
    </html>
  );
}
