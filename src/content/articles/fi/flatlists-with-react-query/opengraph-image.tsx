import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'Best practices for React Query with FlatList';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'Best practices for React Query with FlatList',
    'flatlists-with-react-query',
  );
}
