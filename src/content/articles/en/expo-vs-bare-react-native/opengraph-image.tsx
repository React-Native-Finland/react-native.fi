import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'Expo vs Bare React Native: Which Should You Choose?';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'Expo vs Bare React Native',
    'expo-vs-bare-react-native',
  );
}
