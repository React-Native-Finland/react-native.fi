# Contributing to React Native Finland

Thanks for your interest in contributing! This site is built by the community, and we welcome pull requests.

## What you can contribute

### 1. Add yourself to the developer directory

Add your profile to `src/data/developers.json`:

```json
{
  "slug": "your-name",
  "name": "Your Name",
  "role": "Your Role at Company",
  "location": "City, Finland",
  "imageUrl": "/images/your-name.jpg",
  "bio": "A short bio about yourself and your experience with React Native.",
  "xUrl": "https://twitter.com/...",
  "linkedinUrl": "https://linkedin.com/in/...",
  "githubUrl": "https://github.com/...",
  "websiteUrl": "https://...",
  "expertise": ["React Native", "TypeScript", "Expo"],
  "availability": "Available for hire"
}
```

Also add your photo to `public/images/` (square, at least 400x400px, JPEG or PNG).

### 2. Add a conference

Add to `src/data/conferences.json`:

```json
{
  "name": "Conference Name",
  "location": "City, Country",
  "date": "Month YYYY",
  "dateDetail": "Month DD-DD, YYYY",
  "description": "A short, factual description of the conference.",
  "url": "https://conference-website.com",
  "tags": ["React Native", "Region"],
  "recurring": "Annual (Month)",
  "cfpStatus": "Open / Closes Date / TBA",
  "cfpUrl": "https://conference-website.com/cfp"
}
```

Keep descriptions factual. Don't include unverified attendance numbers or superlatives.

### 3. Add a meetup

Add to `src/data/meetups.json`:

```json
{
  "name": "React Native City",
  "location": "City, Country",
  "description": "Short description of the meetup.",
  "url": "https://meetup.com/react-native-city",
  "frequency": "Monthly"
}
```

### 4. Add a Helsinki meetup event

Add to `src/data/events.json`:

```json
{
  "slug": "meetup-number-month-year",
  "title": "React Native Helsinki #N",
  "date": "YYYY-MM-DD",
  "startTime": "18:00",
  "endTime": "21:00",
  "timezone": "Europe/Helsinki",
  "venue": {
    "name": "Venue Name",
    "address": "Street Address",
    "city": "Helsinki"
  },
  "host": "Host Company",
  "description": "Short description of the event.",
  "talks": [
    {
      "title": "Talk Title",
      "speaker": {
        "name": "Speaker Name",
        "title": "Role at Company",
        "imageUrl": "/images/speaker.jpg"
      },
      "description": "What the talk is about."
    }
  ]
}
```

Don't include an `isPast` field — it's computed automatically from the date and end time.

### 5. Write an article

Articles are MDX files in `src/content/articles/{locale}/`. Create a new directory for your article:

```
src/content/articles/en/your-article-slug/
  page.mdx
  (optional images)
```

Use this template for `page.mdx`:

```mdx
import { ArticleLayout } from '@/components/ArticleLayout';
import { ArticleJsonLd } from '@/components/ArticleJsonLd';

export const article = {
  author: 'Your Name',
  date: 'YYYY-MM-DD',
  title: 'Your Article Title',
  description: 'A short description for SEO and previews.',
};

export const metadata = {
  title: article.title,
  description: article.description,
  openGraph: {
    publishedTime: article.date,
    modifiedTime: article.updated || article.date,
    authors: [article.author],
    title: article.title,
    description: article.description,
    siteName: 'React Native Finland',
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: article.title,
    description: article.description,
  },
  authors: [{ name: article.author }],
};

export default (props) => (
  <>
    <ArticleJsonLd article={article} />
    <ArticleLayout article={article} {...props} />
  </>
);

Your article content here in Markdown...
```

Finnish translations go in `src/content/articles/fi/your-article-slug/page.mdx`.

### 6. Add CFP tips

Add to `src/data/cfp-tips.json`:

```json
{
  "title": "Tip Title",
  "description": "Actionable advice for submitting conference talks."
}
```

## Development setup

```bash
bun install
bun dev
```

## Before submitting a PR

Make sure all checks pass:

```bash
bun run lint:strict   # ESLint with zero warnings
bun run typecheck     # TypeScript
bun run format:check  # Prettier
bun test              # Jest
```

Or run Prettier auto-fix:

```bash
bun run format        # Auto-fix formatting
```

## Commit messages

Use [conventional commits](https://www.conventionalcommits.org/):

- `feat: add developer profile for Jane Doe`
- `feat: add React Native Berlin Conference 2026`
- `fix: correct App.js Conf date`
- `docs: add article about state management`

## Guidelines

- Keep content factual. No unverified stats, attendance numbers, or superlatives.
- Only add real people, real events, and real meetups.
- Articles should be original content or properly attributed.
- Photos should be your own or properly licensed.
- Be respectful and inclusive.
