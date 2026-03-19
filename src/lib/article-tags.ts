export type ArticleTag =
  | 'getting-started'
  | 'performance'
  | 'animations'
  | 'monetization'
  | 'tooling'
  | 'guides'
  | 'community';

export const articleTagLabels: Record<ArticleTag, { en: string; fi: string }> =
  {
    'getting-started': { en: 'Getting Started', fi: 'Aloitus' },
    performance: { en: 'Performance', fi: 'Suorituskyky' },
    animations: { en: 'Animations', fi: 'Animaatiot' },
    monetization: { en: 'Monetization', fi: 'Monetisointi' },
    tooling: { en: 'Tooling', fi: 'Työkalut' },
    guides: { en: 'Guides', fi: 'Oppaat' },
    community: { en: 'Community', fi: 'Yhteisö' },
  };
