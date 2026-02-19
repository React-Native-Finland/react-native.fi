import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'App Store release checklist';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'App Store release checklist',
    'checklist-for-releasing-apps',
  );
}
