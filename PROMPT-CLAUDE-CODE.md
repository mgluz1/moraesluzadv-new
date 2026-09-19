# Prompt para o Claude Code

Cole o texto abaixo no Claude Code, rodando na pasta do projeto (`cd ~/Desktop/Projetos/"moraesLuz Project" && claude`).

---

Você vai executar o plano de melhorias do site institucional **Moraes Luz Advocacia & Assessoria Jurídica** (React 19 + Vite 6 + Tailwind 4 + Motion + Lucide, hospedado no Netlify em https://moraesluzadvocacia.netlify.app).

## Contexto

- Leia primeiro `PLANO-DE-MELHORIAS.md` e `README.md`. O plano é a fonte da verdade.
- Escopo desta sessão: **Fases 0, 2, 3 e 4**.
- **Fora do escopo:** Fase 1 (conformidade OAB) e Fase 5 (evolução). Esses itens dependem de aprovação da cliente. **Não altere** textos de depoimentos, legendas, "Especialista(s)", diferenciais nem qualquer conteúdo jurídico/comercial em `src/constants/data.ts`, exceto os links (`LINKS`), que fazem parte da Fase 4.
- O projeto foi gerado no Google AI Studio; há sobras do template (Gemini, Express) que não são usadas.

## Regras

1. **Não mude a identidade visual.** Cores (`petroleum #1a4a45`, `nude #c9a96e`, `nude-dark #b08f55`), fontes (Playfair Display + Inter), layout e ordem das seções continuam iguais. Melhorias são técnicas, não de redesign.
2. **Um commit por etapa**, com mensagens em português no padrão Conventional Commits (lista no fim). Não faça `git push`; eu reviso e envio.
3. Depois de cada etapa, rode `npm run lint` e `npm run build`. Só avance se ambos passarem.
4. **Antes de apagar qualquer arquivo**, liste o que será removido e confirme comigo.
5. Nas imagens: guarde os originais em `design/originais/` (fora do `public/`, então não vão para o deploy) antes de converter.
6. Se algo no plano estiver ambíguo ou parecer errado ao ler o código, pergunte em vez de supor.
7. Ao final de cada fase, marque os itens concluídos com `[x]` no `PLANO-DE-MELHORIAS.md` e inclua essa mudança no commit.

## Etapas

### Fase 0 — Base
- Remover dependências não usadas: `@google/genai`, `express`, `dotenv`, `tsx`, `@types/express` (confira com `grep` antes que nada as importa).
- Remover o bloco `define` do `GEMINI_API_KEY` no `vite.config.ts` e o comentário sobre AI Studio/HMR.
- Remover `.env.example`, `metadata.json` e `public/assets/justica.jpg` (não usados). Confirme comigo antes.
- `package.json`: `"name": "moraes-luz-advocacia"`.
- Instalar `@types/react` e `@types/react-dom` como devDependencies e criar `src/vite-env.d.ts` com `/// <reference types="vite/client" />`. O `npm run lint` tem que passar sem erros.
- Criar `netlify.toml` com `command = "npm run build"` e `publish = "dist"`.
- Remover a pasta `dist/` do disco se estiver presente (já está no `.gitignore`).

### Fase 2 — Desempenho
- Converter imagens para **WebP** com `sharp` (instale como devDependency ou use um script em `scripts/otimizar-imagens.mjs`):
  - `logoTransparente.png` → ~400 px, meta < 40 KB
  - `blacklogo.png` → ~600 px de largura, meta < 40 KB
  - `adv.png`, `foto1.png`, `foto2.png` (são JPEGs com extensão .png) → ~800 px de largura, meta < 80 KB cada
- Atualizar todas as referências no código para os novos arquivos.
- Gerar `favicon.ico` (32×32) e `apple-touch-icon.png` (180×180) a partir do logo e atualizar o `index.html`.
- Adicionar `width` e `height` reais em todas as `<img>` (inclusive no componente `CustomLogo`, que precisa receber isso por props ou usar a proporção 1:1).
- Logo do Hero: `fetchpriority="high"` e sem `loading="lazy"`.
- Fontes: remover o `@import` do `src/index.css` e carregar via `<link>` com `preconnect` no `index.html`. Manter só os pesos usados (verifique as classes `font-*` no código; provavelmente Inter 400/500/700 e Playfair 400/700 + itálico 400).
- Informe o tamanho total das imagens antes e depois.

### Fase 3 — SEO e compartilhamento
- `index.html`: `lang="pt-BR"`.
- Open Graph completo: `og:url`, `og:image` (1200×630), `og:locale` = `pt_BR`, `og:site_name`, `twitter:card` = `summary_large_image`.
  - Gere `public/og-image.jpg` 1200×630 com fundo `#1a4a45`, logo centralizado e o texto "Moraes Luz — Advocacia & Assessoria Jurídica" em Playfair Display (pode ser via `sharp` + SVG).
- `<link rel="canonical" href="https://moraesluzadvocacia.netlify.app/">` (o domínio definitivo virá depois; deixe um comentário `<!-- TODO: trocar pelo domínio próprio -->`).
- JSON-LD `LegalService` no `index.html` com: nome, URL, logo, telefone `+55 62 98155-9648`, e-mail `moraesluzadvocacia@gmail.com`, endereço (Esquina com Rua J60, Av. Sucuri, St. Jaó, Goiânia – GO, 74674-260, BR), geo (-16.6394493, -49.2313609), `sameAs` com o Instagram. **Não** invente horário de funcionamento; deixe `TODO` comentado.
- **Não** altere a `meta description` nem as `keywords` (elas têm "Especialistas", que é da Fase 1).
- Criar `public/robots.txt` e `public/sitemap.xml` apontando para a URL do Netlify.

### Fase 4 — UX e acessibilidade
- **WhatsApp:** em `src/constants/data.ts`, criar um helper `whatsapp(texto)` com `encodeURIComponent` e usar:
  - `WHATSAPP` → "Olá! Vim pelo site e gostaria de uma orientação jurídica."
  - `AGENDA` → "Olá! Gostaria de agendar um horário com o escritório."
- **Mailto:** codificar assunto e corpo com `encodeURIComponent` e trocar "Moraes & Luz" por "Moraes Luz".
- **Links externos:** garantir `target="_blank" rel="noopener noreferrer"` em todos os links para fora (WhatsApp, Instagram, Maps), inclusive no `Footer`, no menu mobile do `Header` e no CTA "Falar com um Advogado" do `Contato`. Considere criar um componente `ExternalLink` para não repetir.
- **Header:** reduzir o logo do header (hoje `w-20 h-20 md:w-28 md:h-28`) para algo em torno de 56–64 px, mantendo o logo grande no rodapé (o `Logo` precisa aceitar tamanho por prop). Conferir que o Hero não fica coberto no mobile.
- `scroll-margin-top` nas seções com âncora (`#home`, `#sobre`, `#atuacao`, `#contato`) para compensar o header fixo.
- **Botão flutuante do WhatsApp:** remover `animate-bounce`; no lugar, só sombra e hover.
- **Menu mobile:** `aria-expanded`, `aria-controls` apontando para o id do menu, `aria-label` que alterna entre "Abrir menu" e "Fechar menu", travar o scroll do `body` quando aberto e fechar com `Esc`.
- **Reduced motion:** usar `useReducedMotion` do Motion para desativar as animações de entrada e o `whileHover`; prefixar com `motion-safe:` as transições e escalas do Tailwind (`group-hover:scale-*`, `animate-pulse`).
- **Contraste:** trocar `text-white/40` por no mínimo `text-white/60` nos textos pequenos (cards de contato e copyright).
- **Alt da foto** em `About.tsx`: `"Dra. Isabela Moraes Luz, advogada do escritório Moraes Luz Advocacia"`. (Não mexa na legenda "Especialista em Resultados"; é da Fase 1.)

## Commits esperados

1. `chore: remove dependências e arquivos do template AI Studio`
2. `chore: adiciona tipos do React, vite-env e netlify.toml`
3. `perf: converte imagens para WebP e adiciona favicon`
4. `perf: dimensões das imagens e carregamento das fontes`
5. `seo: lang pt-BR, Open Graph, canonical, JSON-LD, robots e sitemap`
6. `fix: mensagens do WhatsApp, mailto e links externos`
7. `a11y: header, menu mobile, reduced motion e contraste`

## Entrega final

Ao terminar, me mostre:
1. `git log --oneline` dos commits criados.
2. Uma tabela de antes/depois: tamanho das imagens, tamanho do `dist/` e número de dependências.
3. Resultado de `npm run lint` e `npm run build`.
4. Itens do plano que você **não** conseguiu fazer ou que precisam da minha decisão.
5. Um checklist de testes manuais para eu fazer no celular (menu, botões do WhatsApp, prévia do link no WhatsApp etc.).
