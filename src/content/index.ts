import { contentSchema, type Content } from './schema.ts';
import { profile, stats } from './profile.ts';
import { projects } from './projects.ts';
import { experience, education, skills, links } from './career.ts';

/** Fonte única de conteúdo. Validada em tempo de build e de execução. */
export const content: Content = contentSchema.parse({
  profile,
  stats,
  projects,
  experience,
  education,
  skills,
  links,
});

export * from './schema.ts';
