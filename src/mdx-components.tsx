import type { MDXComponents } from 'mdx/types';

import { ArticleJsonLd } from '@/components/ArticleJsonLd';
import { ArticleLayout } from '@/components/ArticleLayout';
import { Callout } from '@/components/Callout';
import { Keyboard } from '@/components/Keyboard';
import { YouTubeEmbed } from '@/components/YouTubeEmbed';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    ArticleLayout,
    ArticleJsonLd,
    Callout,
    Keyboard,
    YouTubeEmbed,
  };
}
