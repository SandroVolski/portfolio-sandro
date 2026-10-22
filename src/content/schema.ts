import { z } from 'zod';

/**
 * Camada de conteúdo do portfólio.
 * Todo texto, link e dado do site nasce nestes schemas: o front-end só renderiza.
 * `npm run content:check` valida tudo antes de cada build.
 */

const url = z.string().url();
const imagePath = z.string().regex(/^\/images\/[\w.-]+\.(jpg|jpeg|png|webp|svg)$/i, 'use /images/arquivo.ext');

export const linkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
  kind: z.enum(['site', 'github', 'linkedin', 'email', 'whatsapp', 'case']).default('site'),
});

export const profileSchema = z.object({
  name: z.string(),
  displayName: z.string(),
  role: z.string(),
  tagline: z.string(),
  location: z.string(),
  photo: imagePath,
  intro: z.array(z.string()).min(1),
  availability: z.object({
    headline: z.string(),
    details: z.array(z.string()),
  }),
  contact: z.object({
    email: z.string().email(),
    phoneDisplay: z.string(),
    phoneE164: z.string().regex(/^\d{12,13}$/),
    linkedin: url,
    github: url,
  }),
  site: z.object({
    title: z.string(),
    description: z.string(),
    url: url,
    language: z.string(),
  }),
});

export const statSchema = z.object({
  value: z.number().int().nonnegative(),
  label: z.string(),
  detail: z.string(),
});

export const projectSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string(),
  kind: z.string(),
  period: z.string(),
  status: z.enum(['em produção', 'em operação real', 'em desenvolvimento', 'concluído', 'privado']),
  summary: z.string(),
  highlights: z.array(z.string()).min(1),
  stack: z.array(z.string()).min(1),
  images: z.array(z.object({ src: imagePath, alt: z.string() })),
  links: z.array(linkSchema),
  note: z.string().optional(),
});

export const experienceSchema = z.object({
  id: z.string(),
  role: z.string(),
  org: z.string(),
  place: z.string(),
  start: z.string(),
  end: z.string(),
  summary: z.string(),
  bullets: z.array(z.string()),
  logo: z.string().optional(),
  stack: z.array(z.string()).default([]),
});

export const educationSchema = z.object({
  id: z.string(),
  title: z.string(),
  org: z.string(),
  period: z.string(),
  logo: z.string().optional(),
  detail: z.string().optional(),
});

export const skillGroupSchema = z.object({
  group: z.string(),
  items: z.array(z.string()).min(1),
});

export const contentSchema = z.object({
  profile: profileSchema,
  stats: z.array(statSchema),
  projects: z.array(projectSchema).min(1),
  experience: z.array(experienceSchema).min(1),
  education: z.array(educationSchema).min(1),
  skills: z.array(skillGroupSchema).min(1),
  links: z.array(linkSchema),
});

export type Link = z.infer<typeof linkSchema>;
export type Profile = z.infer<typeof profileSchema>;
export type Stat = z.infer<typeof statSchema>;
export type Project = z.infer<typeof projectSchema>;
export type Experience = z.infer<typeof experienceSchema>;
export type Education = z.infer<typeof educationSchema>;
export type SkillGroup = z.infer<typeof skillGroupSchema>;
export type Content = z.infer<typeof contentSchema>;
