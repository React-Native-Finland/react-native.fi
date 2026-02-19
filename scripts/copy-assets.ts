import fs from 'fs';
import { glob } from 'glob';
import path from 'path';

// Copy article images from content directory to public for serving
async function copyContentImages() {
  // eslint-disable-next-line no-console
  console.log('Copying article images to public...');
  const contentDir = path.join(process.cwd(), 'src/content/articles');
  const publicDir = path.join(process.cwd(), 'public/content/articles');

  // Find all image files in content/articles
  const imageFiles = await glob('**/*.{webp,png,jpg,jpeg,gif,svg}', {
    cwd: contentDir,
  });

  for (const imagePath of imageFiles) {
    const srcPath = path.join(contentDir, imagePath);
    const destPath = path.join(publicDir, imagePath);
    const destDir = path.dirname(destPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // Copy file if it doesn't exist or is different
    if (!fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
      // eslint-disable-next-line no-console
      console.log(`Copied ${imagePath}`);
    }
  }
}

async function generateOpengraphImages() {
  // eslint-disable-next-line no-console
  console.log('Generating opengraph-image.tsx for articles...');
  const articlesDirectory = path.join(process.cwd(), 'src/app/articles');

  // Find all page.mdx files
  const articlePages = await glob('**/page.mdx', { cwd: articlesDirectory });

  for (const pagePath of articlePages) {
    const dir = path.dirname(pagePath);
    const fullDir = path.join(articlesDirectory, dir);
    const ogPath = path.join(fullDir, 'opengraph-image.tsx');
    const pageContent = fs.readFileSync(
      path.join(fullDir, 'page.mdx'),
      'utf-8',
    );

    // Extract title
    const match = pageContent.match(/title:\s*'([^']*)'/);
    let title = 'Article';
    if (match && match[1]) {
      title = match[1];
    } else {
      // Try parsing the export const article object
      const objMatch = pageContent.match(/export const article = ({[\s\S]*?})/);
      if (objMatch && objMatch[1]) {
        try {
          // Very basic parsing
          const titleLine = objMatch[1]
            .split('\n')
            .find((l) => l.includes('title:'));
          if (titleLine) {
            const titleMatch = titleLine.match(/title:\s*['"](.+)['"]/);
            if (titleMatch) title = titleMatch[1];
          }
        } catch {
          // eslint-disable-next-line no-console
          console.error(`Failed to parse title for ${dir}`);
        }
      }
    }

    // Escape single quotes for the generated file content
    const safeTitle = title.replace(/'/g, "\\'");
    // Use the directory name as the slug for color generation
    const slug = dir;

    const content = `import { generateBlueprintOgImage } from '@/lib/og-helper';

export const runtime = 'edge';
export const alt = '${safeTitle}';
export const contentType = 'image/png';

export default async function Image() {
  return generateBlueprintOgImage('${safeTitle}', '${slug}');
}
`;

    if (!fs.existsSync(ogPath)) {
      fs.writeFileSync(ogPath, content);
      // eslint-disable-next-line no-console
      console.log(`Generated OG image for ${dir}`);
    } else {
      // Check if content is different (optional, but good for updates)
      const currentContent = fs.readFileSync(ogPath, 'utf-8');
      if (currentContent !== content) {
        fs.writeFileSync(ogPath, content);
        // eslint-disable-next-line no-console
        console.log(`Updated OG image for ${dir}`);
      }
    }
  }
}

async function main() {
  await copyContentImages();
  await generateOpengraphImages();
}

// eslint-disable-next-line no-console
main().catch(console.error);
