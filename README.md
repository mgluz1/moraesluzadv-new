# Moraes Luz Advocacia — site institucional

Site do escritório **Moraes Luz Advocacia & Assessoria Jurídica** (Goiânia, GO), com foco em Direito Aeronáutico e Empresarial.

🔗 Domínio principal: [moraesluzadv.com](https://moraesluzadv.com)

A entrega da reestruturação de 2026 (decisões, verificações e pendências) está em [`docs/ENTREGA-REESTRUTURACAO.md`](docs/ENTREGA-REESTRUTURACAO.md).

## Stack

- React 19 + TypeScript, Vite 6, Tailwind CSS 4
- Pré-renderização própria: um HTML estático por rota, hidratado no navegador
- Fontes Fraunces e Inter autohospedadas (`@fontsource-variable`); ícones Lucide
- Hospedagem: Netlify

## Como rodar

Pré-requisito: Node.js 20.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # build de produção + pré-renderização em dist/
npm run preview    # serve dist/ como o Netlify (404 real) em http://localhost:4173
npm run lint       # checagem de tipos
npm run imagens    # gera as imagens de public/ a partir de design/originais/
```

`npm run dev` não pré-renderiza. Para conferir títulos, canonical, sitemap e 404, use `build` + `preview`.

## Estrutura

```
├── index.html                 # Modelo do HTML (o head de cada rota é inserido no build)
├── netlify.toml               # Build, redirecionamentos do domínio antigo e headers
├── design/originais/          # Imagens originais (fora do deploy)
├── public/                    # Imagens otimizadas, favicon, imagem de compartilhamento
├── scripts/
│   ├── prerender.mjs          # HTML por rota, sitemap.xml, robots.txt, 404.html e checagens
│   ├── servidor-homologacao.mjs
│   └── otimizar-imagens.mjs
└── src/
    ├── rotas.tsx              # Rotas, títulos e descrições
    ├── config/site.ts         # ✏️ Contatos, endereço, domínio e responsável
    ├── content/
    │   ├── atuacao.ts         # ✏️ Textos de atuação (aviação, empresarial, trabalhista)
    │   └── conhecimento.ts    # ✏️ Publicações reais (bloco oculto enquanto vazio)
    ├── lib/                   # SEO (head e JSON-LD) e mensuração
    ├── hooks/useRevelar.ts    # Animações de entrada ao rolar
    ├── components/            # Layout, contato e componentes de interface
    └── pages/                 # Home, Direito Aeronáutico, Atuação, Escritório, Privacidade, 404
```

## Editando

- **Contatos e dados do escritório:** `src/config/site.ts`
- **Textos de atuação:** `src/content/atuacao.ts`
- **Publicações e participações:** `src/content/conhecimento.ts` (só material publicado e revisado)
- **Nova página:** criar em `src/pages/`, registrar em `src/rotas.tsx` (título, descrição, arquivo) e, se for o caso, no menu (`src/components/layout/Header.tsx`). O sitemap é gerado automaticamente.
- **Formulário de contato:** desligado por padrão; ver a seção 4 de `docs/ENTREGA-REESTRUTURACAO.md`.

Cores da marca (`src/index.css`): verde `#1A4A45`, verde profundo `#102F2D`, papel `#F5F4F0`, dourado `#C9A96E`, bronze `#80612E`.

## Autoria

Desenvolvido por **Miguel Luz** ([@mgluz1](https://github.com/mgluz1)).
Conteúdo e marca © Moraes Luz Advocacia & Assessoria Jurídica.
