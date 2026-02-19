import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'Article';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'Article',
    'react-native-virtualizedlists-nested-inside-scrollview',
  );
}
