import { generateBlueprintOgImage } from '@/lib/og-helper';

import { Locale } from '@/i18n/config';

export const runtime = 'edge';
export const alt = 'Article';
export const contentType = 'image/png';

type Props = {
  params: Promise<{ slug: string; locale: Locale }>;
};

export default async function Image({ params }: Props) {
  const { slug } = await params;

  // Convert slug to readable title (e.g., "my-article-slug" -> "My Article Slug")
  const title = slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return generateBlueprintOgImage(title, slug);
}
