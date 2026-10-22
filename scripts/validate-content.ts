import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { content } from '../src/content/index';

// Valida o schema (o import já faz isso) e confere se cada imagem existe em /public.
const pub = join(process.cwd(), 'public');
const missing: string[] = [];

const check = (src: string) => {
  if (!existsSync(join(pub, src))) missing.push(src);
};

check(content.profile.photo);
content.projects.forEach((p) => p.images.forEach((i) => check(i.src)));

if (missing.length) {
  console.error('Imagens que não existem em /public:\n - ' + missing.join('\n - '));
  process.exit(1);
}

console.log(
  `Conteúdo válido: ${content.projects.length} projetos, ${content.experience.length} experiências, ` +
    `${content.education.length} formações, ${content.skills.length} grupos de skills.`,
);
