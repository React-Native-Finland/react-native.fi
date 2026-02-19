import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'App.js 2025 recap';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage('App.js 2025 recap', 'appjs-2025-recap');
}
