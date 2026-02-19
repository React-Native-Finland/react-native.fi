import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'Build a clock face with SVG in React Native';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'Build a clock face with SVG in React Native',
    'creating-a-clock-face-in-react-native-with-svg',
  );
}
