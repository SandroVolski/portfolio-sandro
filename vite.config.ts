import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { content } from './src/content/index.ts';

/** Preenche título, descrição, Open Graph e JSON-LD do index.html a partir da camada de conteúdo. */
function seoFromContent(): Plugin {
  const { profile, links } = content;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    url: profile.site.url,
    image: `${profile.site.url}${profile.photo}`,
    email: `mailto:${profile.contact.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Irati', addressRegion: 'PR', addressCountry: 'BR' },
    sameAs: links.filter((l) => l.kind === 'github' || l.kind === 'linkedin').map((l) => l.href),
    knowsAbout: content.skills.flatMap((s) => s.items),
  };
  return {
    name: 'seo-from-content',
    transformIndexHtml(html) {
      return html
        .replaceAll('%LANG%', profile.site.language)
        .replaceAll('%TITLE%', profile.site.title)
        .replaceAll('%DESCRIPTION%', profile.site.description)
        .replaceAll('%URL%', profile.site.url)
        .replace('%JSONLD%', JSON.stringify(jsonLd));
    },
  };
}

export default defineConfig({
  plugins: [react(), seoFromContent()],
  build: {
    target: 'es2022',
    chunkSizeWarningLimit: 700,
  },
});
