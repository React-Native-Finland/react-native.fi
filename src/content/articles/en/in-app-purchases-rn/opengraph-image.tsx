import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'Making money with your React Native app';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'Making money with your React Native app',
    'in-app-purchases-rn',
  );
}
