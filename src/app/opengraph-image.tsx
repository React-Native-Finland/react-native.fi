import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt =
  'React Native Finland - Expert Mobile App Consultants & Developers';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage('React Native Finland');
}
