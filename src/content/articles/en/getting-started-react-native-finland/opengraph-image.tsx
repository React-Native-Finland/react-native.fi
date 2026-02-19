import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'Getting Started with React Native in Finland';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'Getting Started with React Native in Finland',
    'getting-started-react-native-finland',
  );
}
