import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'Successful rapid prototyping with React Native';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'Successful rapid prototyping with React Native',
    'successful-rapid-prototyping-with-react-native',
  );
}
