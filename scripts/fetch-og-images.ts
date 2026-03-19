import fs from 'fs';
import path from 'path';

const CONFERENCES_PATH = path.join(process.cwd(), 'src/data/conferences.json');
const OUTPUT_DIR = path.join(process.cwd(), 'public/images/conferences');

interface Conference {
  name: string;
  url: string;
  ogImage?: string;
  [key: string]: unknown;
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function fetchOgImageUrl(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) return null;

    const html = await response.text();

    // Match og:image meta tag
    const ogMatch = html.match(
      /<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/i,
    );
    if (ogMatch?.[1]) return ogMatch[1];

    // Try reverse attribute order
    const ogMatch2 = html.match(
      /<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/i,
    );
    if (ogMatch2?.[1]) return ogMatch2[1];

    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to fetch ${url}:`, error);
    return null;
  }
}

async function downloadImage(
  imageUrl: string,
  outputPath: string,
): Promise<boolean> {
  try {
    const response = await fetch(imageUrl, {
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    });

    if (!response.ok) return false;

    const contentType = response.headers.get('content-type') || '';
    if (!contentType.startsWith('image/')) return false;

    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(outputPath, buffer);
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`Failed to download ${imageUrl}:`, error);
    return false;
  }
}

function getExtension(url: string, fallback = 'png'): string {
  try {
    const pathname = new URL(url).pathname;
    const ext = path.extname(pathname).replace('.', '').toLowerCase();
    if (['png', 'jpg', 'jpeg', 'webp', 'gif', 'svg'].includes(ext)) return ext;
  } catch {
    // ignore
  }
  return fallback;
}

async function main() {
  // eslint-disable-next-line no-console
  console.log('Fetching conference OG images...');

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const conferences: Conference[] = JSON.parse(
    fs.readFileSync(CONFERENCES_PATH, 'utf-8'),
  );

  let updated = false;

  for (const conf of conferences) {
    const slug = slugify(conf.name);

    // Check if we already have an image for this conference
    if (conf.ogImage) {
      const existingPath = path.join(process.cwd(), 'public', conf.ogImage);
      if (fs.existsSync(existingPath)) {
        // eslint-disable-next-line no-console
        console.log(`  ✓ ${conf.name} (cached)`);
        continue;
      }
    }

    // eslint-disable-next-line no-console
    console.log(`  Fetching OG image for ${conf.name}...`);

    const ogImageUrl = await fetchOgImageUrl(conf.url);
    if (!ogImageUrl) {
      // eslint-disable-next-line no-console
      console.log(`    No OG image found for ${conf.name}`);
      continue;
    }

    const ext = getExtension(ogImageUrl);
    const filename = `${slug}.${ext}`;
    const outputPath = path.join(OUTPUT_DIR, filename);

    const success = await downloadImage(ogImageUrl, outputPath);
    if (success) {
      conf.ogImage = `/images/conferences/${filename}`;
      updated = true;
      // eslint-disable-next-line no-console
      console.log(`    ✓ Saved ${filename}`);
    } else {
      // eslint-disable-next-line no-console
      console.log(`    ✗ Failed to download image for ${conf.name}`);
    }
  }

  if (updated) {
    fs.writeFileSync(
      CONFERENCES_PATH,
      JSON.stringify(conferences, null, 2) + '\n',
    );
    // eslint-disable-next-line no-console
    console.log('Updated conferences.json with OG image paths.');
  }

  // eslint-disable-next-line no-console
  console.log('Done fetching conference OG images.');
}

// eslint-disable-next-line no-console
main().catch(console.error);
