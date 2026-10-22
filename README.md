# Portfólio de Sandro Volski

Site de portfólio em React + TypeScript, com animações em GSAP (ScrollTrigger e pinning), rolagem suave com Lenis e componentes do [React Bits](https://reactbits.dev).

## Como rodar

```bash
npm install
npm run dev          # desenvolvimento em http://localhost:5173
npm run build        # valida o conteúdo, checa os tipos e gera /dist
npm run preview      # serve o /dist localmente
```

## Onde mudar o conteúdo

Todo texto, link, imagem e número do site vem de `src/content/`. O front-end só renderiza.

| Arquivo | O que tem |
| --- | --- |
| `profile.ts` | Nome, cargo, apresentação, disponibilidade, contatos (e-mail, telefone, LinkedIn, GitHub), dados de SEO e números do "Sobre" |
| `projects.ts` | Projetos: resumo, destaques, tecnologias, telas e links |
| `career.ts` | Experiência, formação, tecnologias e links |
| `schema.ts` | Regras (zod) que todo o conteúdo precisa cumprir |

`npm run content:check` valida o conteúdo e confere se cada imagem citada existe em `public/images`. Ele roda sozinho antes de todo `npm run build`, então um erro de digitação não chega ao ar.

Para adicionar um projeto: copie um item de `projects.ts`, coloque os prints em `public/images/` e preencha os campos. Não precisa mexer em componente.

## Antes de publicar

1. Em `src/content/profile.ts`, troque `site.url` pelo endereço real do site. Ele vai para o título, o Open Graph e o JSON-LD.
2. Faça o mesmo em `public/robots.txt` e `public/sitemap.xml`.
3. Se não quiser o telefone público, remova `phoneDisplay`/`phoneE164` e o botão de WhatsApp em `src/sections/Contact.tsx`.

## Estrutura

```
src/
  content/        dados e schema (a "camada de back-end" do site)
  sections/       Preloader, Header, Hero, About, Projects, Journey, Stack, Contact
  components/reactbits/   componentes copiados do React Bits
  lib/motion.ts   GSAP + ScrollTrigger + Lenis (um só lugar)
scripts/          validação de conteúdo
public/           imagens, favicon, robots, sitemap
```

## Movimento e acessibilidade

- O nome do hero usa os eixos de largura e peso da fonte Anybody e reage ao ponteiro (React Bits, Variable Proximity).
- A seção de projetos prende a tela e arrasta na horizontal (ScrollTrigger com pin). Em telas estreitas ou com "reduzir movimento" ligado, vira uma lista vertical comum.
- Com `prefers-reduced-motion`, não há preloader, rolagem suave, cursor nem faixas em movimento.
- Há link "Pular para o conteúdo", foco visível e textos alternativos nas imagens.
- O cursor customizado só aparece com mouse (hover e ponteiro fino).

## Publicação

O resultado do build é estático (`dist/`). Qualquer um serve:

- **Vercel / Netlify / Cloudflare Pages:** conecte o repositório, comando `npm run build`, pasta `dist`.
- **GitHub Pages:** publique o conteúdo de `dist` (se usar um subcaminho, defina `base` em `vite.config.ts`).

## Fontes

Anybody (variável, eixos `wght` e `wdth`) e Hanken Grotesk, servidas pelo pacote `@fontsource-variable`, sem depender de CDN.
