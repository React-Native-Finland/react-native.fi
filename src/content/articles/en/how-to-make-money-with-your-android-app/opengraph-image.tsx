import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'How to make money with your Android app';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'How to make money with your Android app',
    'how-to-make-money-with-your-android-app',
  );
}
