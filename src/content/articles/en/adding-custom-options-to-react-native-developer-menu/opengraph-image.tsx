import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'Adding custom options to React Native developer menu';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'Adding custom options to React Native developer menu',
    'adding-custom-options-to-react-native-developer-menu',
  );
}
