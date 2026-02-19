import developersData from '@/data/developers.json';
import { Developer } from '@/data/types';

export type { Developer };

export function getAllDevelopers(): Developer[] {
  return (developersData as Developer[]).sort((a, b) =>
    a.name.localeCompare(b.name),
  );
}

export function getDeveloperBySlug(slug: string): Developer | undefined {
  return (developersData as Developer[]).find((dev) => dev.slug === slug);
}

export function getDeveloperByName(name: string): Developer | undefined {
  return (developersData as Developer[]).find((dev) => dev.name === name);
}
