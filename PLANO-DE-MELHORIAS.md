# Plano de Melhorias — Site Moraes Luz Advocacia

> Base: análise do código em set/2026. Ordem pensada por **risco → impacto → esforço**.
> Marque os itens `[x]` conforme forem concluídos e commite o arquivo junto.

## Visão geral

| Fase | Tema                          | Esforço  | Depende da cliente? |
| ---- | ----------------------------- | -------- | ------------------- |
| 0    | Base do projeto               | ~1 h     | Não                 |
| 1    | Conformidade com a OAB        | ~1 h dev | **Sim**             |
| 2    | Desempenho                    | ~1–2 h   | Não                 |
| 3    | SEO e compartilhamento        | ~1 h     | Parcial             |
| 4    | UX e acessibilidade           | ~1–2 h   | Não                 |
| 5    | Evolução (medir e converter)  | variável | **Sim**             |

Total para as fases 0–4: **~5–7 h** de desenvolvimento.

---

## Fase 0 — Base do projeto

Objetivo: projeto limpo, versionado e com deploy automático.

- [x] Versionar com Git e publicar no GitHub (`mgluz1/moraesluzadv-project`)
- [x] Reescrever o `README.md`
- [ ] Definir visibilidade do repositório (recomendado: **privado**)
- [ ] Conectar o Netlify ao repositório (build `npm run build`, publish `dist`) — `netlify.toml` já está no repo; falta ligar o repositório no painel do Netlify — elimina deploy manual e a `dist/` desatualizada
- [x] Remover sobras do template AI Studio:
  - dependências `@google/genai`, `express`, `dotenv`, `tsx`, `@types/express`
  - bloco `define: { 'process.env.GEMINI_API_KEY' ... }` no `vite.config.ts`
  - `.env.example` e `metadata.json`
  - `public/assets/justica.jpg` (não é usado)
- [x] Renomear `"name": "react-example"` → `"moraes-luz-advocacia"` no `package.json`
- [x] Instalar `@types/react` e `@types/react-dom` para o `npm run lint` passar sem erros
- [x] Adicionar `vite-env.d.ts` (resolve o erro de import do `index.css`)

**Pronto quando:** `npm run lint` e `npm run build` rodam sem erro e um `git push` atualiza o site sozinho.

---

## Fase 1 — Conformidade com a OAB ⚠️

Objetivo: reduzir risco ético-disciplinar da publicidade. **Toda esta fase precisa ser validada pela Dra. Isabela** — as referências abaixo são pontos de atenção, não parecer jurídico.

| # | Problema atual | Proposta | Referência |
| - | -------------- | -------- | ---------- |
| 1.1 | Nenhuma inscrição na OAB no site | Rodapé: "Isabela Santos Moraes Luz — OAB/GO 54.986" (e demais advogados, se houver) | CED, art. 44 |
| 1.2 | Depoimentos com **nome de clientes** (Monna Digital, TNZ, CICOPAL) | Remover a seção ou trocar por conteúdo sem identificação de clientes | CED (arts. 39–47) e Provimento 205/2021 |
| 1.3 | "…saímos vitoriosos" | Remover qualquer menção a resultado obtido | idem — vedação a promessa/divulgação de resultado |
| 1.4 | "Especialista em Resultados" (legenda da foto) | Ex.: "Dra. Isabela Moraes Luz — Sócia fundadora" | idem |
| 1.5 | "Especialistas" (meta description, CTA) | Usar só se houver título de especialização; senão "atuação em…" | idem |
| 1.6 | "Pronto para defender seus direitos?" / tom de captação | Tom informativo: "Fale com o escritório" | idem |
| 1.7 | Diferencial "Sistema de Cadastro Avançado… em tempo real" (ainda não existe) | Remover até existir, **ou** tornar real (ver Fase 5.4) | veracidade da informação |

**Arquivos:** `src/constants/data.ts`, `src/components/sections/About.tsx`, `Contato.tsx`, `Footer.tsx`, `index.html`.

**Pronto quando:** a cliente aprovar os textos finais por escrito (e-mail/WhatsApp).

---

## Fase 2 — Desempenho

Objetivo: carregar rápido no 4G. Hoje as imagens somam ~2 MB só no logo.

- [x] `logoTransparente.png` (1,5 MB, 1024×1024) → WebP ~400 px (**meta: < 40 KB**)
- [x] `blacklogo.png` (3508×2481) → WebP ~600 px de largura (**meta: < 40 KB**)
- [x] `adv.png`, `foto1.png`, `foto2.png` são JPEGs com extensão errada → converter para WebP ~800 px (**meta: < 80 KB cada**)
- [x] Favicon próprio pequeno (`favicon.ico` 32×32 + `apple-touch-icon.png` 180×180) em vez do logo de 1,5 MB
- [x] Adicionar `width` e `height` em todas as `<img>` (evita o layout "pular")
- [x] Hero: logo com `fetchpriority="high"` (é o maior elemento acima da dobra)
- [x] Fontes: tirar o `@import` do `index.css` e usar no `index.html`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
  ```
  (e remover pesos não usados, ex.: Inter 300 e 600)

**Pronto quando:** PageSpeed Insights (mobile) ≥ 90 em Performance e página total < 700 KB.

---

## Fase 3 — SEO e compartilhamento

- [x] `<html lang="en">` → `lang="pt-BR"`
- [x] `og:image` (1200×630, com logo e nome) + `og:url` + `twitter:card` — hoje o link no WhatsApp sai sem imagem
- [x] `<link rel="canonical">` com o domínio definitivo
- [x] Dados estruturados `LegalService` (JSON-LD) com nome, endereço, telefone, horário e coordenadas — ajuda no Google local
- [ ] Revisar `meta description` alinhada à Fase 1 (sem "especialistas")
- [x] `robots.txt` e `sitemap.xml` em `public/`
- [ ] **Domínio próprio** (ex.: `moraesluzadvocacia.com.br`, ~R$ 40/ano no Registro.br) — decisão da cliente
- [ ] Vincular ao **Perfil da Empresa no Google** (link do site no perfil e vice-versa)

**Pronto quando:** prévia correta ao colar o link no WhatsApp e o teste de "Resultados aprimorados" do Google validar o JSON-LD.

---

## Fase 4 — UX e acessibilidade

**Links e botões**
- [x] "Agendar Horário" aponta para o mesmo WhatsApp de "Consultar Agora" → mensagens pré-preenchidas diferentes:
  - Consultar: `https://wa.me/5562981559648?text=Olá! Vim pelo site e gostaria de uma orientação jurídica.`
  - Agendar: `https://wa.me/5562981559648?text=Olá! Gostaria de agendar um horário com o escritório.`
  (URL-encode no código com `encodeURIComponent`)
- [x] Adicionar `target="_blank" rel="noopener noreferrer"` nos links externos que faltam: Instagram e WhatsApp do `Footer`, WhatsApp do menu mobile, CTA "Falar com um Advogado"
- [x] Mailto: codificar assunto/corpo e padronizar o nome ("Moraes Luz", não "Moraes & Luz")

**Layout**
- [ ] Conferir no celular se o header (logo de até 112 px + `py-6`) cobre o topo do Hero; reduzir logo do header para ~56–64 px ou aumentar o `pt` do Hero
- [ ] Links internos com `scroll-margin-top` para o header fixo não cobrir o título da seção
- [ ] Botão flutuante do WhatsApp: trocar `animate-bounce` por algo discreto (ou nenhum efeito)

**Acessibilidade**
- [ ] Menu mobile: `aria-expanded`, `aria-controls`, travar scroll do `body` quando aberto e fechar com `Esc`
- [ ] Respeitar `prefers-reduced-motion` (Motion: `useReducedMotion`; Tailwind: `motion-safe:`)
- [ ] Contraste: textos `text-white/40` pequenos no card de contato → subir para `/60` ou mais
- [ ] `alt` da foto com o nome real da advogada

**Pronto quando:** Lighthouse Acessibilidade ≥ 95 e todos os botões testados no celular.

---

## Fase 5 — Evolução (medir e converter)

Itens que dependem de decisão da cliente. Bons candidatos a proposta comercial separada.

- [ ] **5.1 Medição:** Plausible, Umami ou GA4 com eventos de clique em WhatsApp / e-mail / mapa → saber de onde vêm os contatos. Se usar GA4/cookies, incluir aviso LGPD e página de Política de Privacidade.
- [ ] **5.2 Seção "Equipe":** advogados com foto, nome, OAB e áreas — reforça confiança e já atende o item 1.1.
- [ ] **5.3 Páginas por área** (ex.: Direito Aeronáutico, que é um nicho forte): conteúdo informativo, permitido pelo Provimento 205/2021, e muito bom para SEO.
- [ ] **5.4 Área do cliente / painel processual:** transformar o diferencial "Sistema de Cadastro Avançado" em realidade, integrando ao projeto de monitoramento de publicações (PJe/DJEN).
- [ ] **5.5 Formulário de contato** (Netlify Forms, sem backend) como alternativa ao WhatsApp — com consentimento LGPD.

---

## Ordem sugerida de commits

1. `chore: remove dependências e arquivos do template AI Studio`
2. `chore: adiciona tipos do React e corrige lint`
3. `perf: otimiza imagens e favicon`
4. `perf: carrega fontes via link com preconnect`
5. `seo: lang pt-BR, Open Graph, canonical e JSON-LD`
6. `fix: links externos, mensagens do WhatsApp e mailto`
7. `a11y: menu mobile, reduced motion e contraste`
8. `content: ajustes de conformidade OAB` ← só após aprovação da cliente
