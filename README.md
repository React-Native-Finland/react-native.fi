# React Native Finland

The community site for React Native developers in Finland. Built with Next.js, TypeScript, and Tailwind CSS.

**[react-native.fi](https://react-native.fi)**

## Contribute

This is a community-driven site. You can contribute by adding yourself to the developer directory, submitting conferences or meetups, writing articles, or improving the site itself.

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed instructions.

### Quick start: Add yourself to the developer directory

1. Fork this repo
2. Add your entry to `src/data/developers.json`
3. Add your photo to `public/images/` (square, at least 400x400px)
4. Open a pull request

### Quick start: Add a conference or meetup

1. Fork this repo
2. Add the conference to `src/data/conferences.json` or meetup to `src/data/meetups.json`
3. Open a pull request

## Data files

All community data lives in `src/data/` as JSON:

| File               | What it contains                           |
| ------------------ | ------------------------------------------ |
| `developers.json`  | Developer directory profiles               |
| `conferences.json` | React Native conferences                   |
| `meetups.json`     | React Native meetups worldwide             |
| `events.json`      | React Native Helsinki meetup events        |
| `cfp-tips.json`    | Tips for getting conference talks accepted |

Articles live as MDX files in `src/content/articles/{locale}/`.

## Development

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000).

### Commands

```bash
bun dev              # Start dev server
bun build            # Production build
bun run lint:strict  # ESLint
bun run typecheck    # TypeScript check
bun run format:check # Prettier check
bun test             # Jest tests
```

### Tech stack

- **Next.js 16** with App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 3**
- **next-intl** for i18n (English + Finnish)
- **MDX** for articles

### Commit convention

This repo uses [conventional commits](https://www.conventionalcommits.org/). Husky + commitlint enforce this on every commit.

```
feat: add new conference
fix: correct event date
docs: update contributing guide
```

## License

MIT
