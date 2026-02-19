import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = 'Running React Native apps on specific iOS simulators';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage(
    'Running React Native apps on specific iOS simulators',
    'running-react-native-on-ios-simulator',
  );
}
