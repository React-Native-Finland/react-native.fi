import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt =
  'React Native Animations: From Basics to Advanced Techniques';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'React Native Animations Guide',
    'react-native-animations-guide',
  );
}
