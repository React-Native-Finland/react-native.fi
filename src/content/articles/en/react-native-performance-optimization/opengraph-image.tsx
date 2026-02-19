import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'React Native Performance Optimization: A Practical Guide';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'React Native Performance Optimization',
    'react-native-performance-optimization',
  );
}
