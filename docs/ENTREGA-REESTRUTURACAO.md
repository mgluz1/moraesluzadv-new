# Entrega: reestruturação do site Moraes Luz (homologação)

> Data: 18/10/2026 · Branch: `reestruturacao-2026` · Versão anterior: tag `v1-landing-page`
> Status: versão funcional para homologação local. Não publicada, sem alteração de DNS e sem envios reais a terceiros.

## 1. O que foi implementado

**Arquitetura (todas com HTML pré-renderizado, title, description e canonical próprios)**

| Rota | Conteúdo |
| --- | --- |
| `/` | Hero com logo animado e "Quem atendemos" · Operações aeronáuticas (4 frentes) · Escritório e liderança · Suporte empresarial (Empresarial e Trabalhista) · Conhecimento do setor (oculto enquanto não houver material) · Contato |
| `/direito-aeronautico` | Posicionamento e públicos · Operações e demandas (3 grupos, 6 frentes do briefing) · Forma de atendimento · Profissional responsável · Contato |
| `/atuacao` | `#empresarial` e `#trabalhista`, com bloco de relações de trabalho na aviação |
| `/escritorio` | Perfil da Dra. Isabela Santos Moraes Luz e sede em Goiânia, com duas fotos do escritório e bloco de localização (mapa do Google Maps + "Como chegar") |
| `/privacidade` | Política coerente com os recursos efetivamente usados (sem cookies nem Analytics nesta versão) |
| qualquer outra | `404.html` com status 404 e `noindex` |

Menu: Aviação · Atuação · Escritório · Contato (`/#contato`).

**Adaptações do briefing (decisões registradas)**

- Empresarial e Trabalhista consolidados em `/atuacao`, com âncoras próprias, em vez de duas páginas, para não criar páginas rasas na primeira versão.
- Sem subpáginas por tema de aviação (compra e venda, importação etc.): os temas estão agrupados em `/direito-aeronautico` com âncoras (`#transacoes`, `#operacao`, `#empresas`). Criar subpáginas quando houver texto próprio suficiente.
- **Logo no hero (cartão vertical e largo):** o prompt de reestruturação pedia para não repetir o logo grande do cabeçalho. Por decisão do Miguel durante a execução, o hero da Home tem um cartão vertical (emblema em cima; nome, filete dourado e "Advocacia & Assessoria Jurídica" embaixo) que ocupa a metade direita do hero no desktop (528×451 px), com animação de entrada. "Quem atendemos" virou uma faixa na base do hero para continuar visível de imediato.
- Insights: estrutura em `src/content/conhecimento.ts` (lista vazia). O bloco da Home só aparece com material real e só mostra até dois itens. Não há rota `/insights` nem artigos fictícios.
- Atendimento a passageiros: não criado (sem confirmação de que existe). Se existir, fazer um fluxo separado, fora do menu principal.
- `foto2` (mesa com a xícara Moraes Luz e a estátua da Justiça): o prompt pedia evitar imagem jurídica genérica, mas, por decisão do Miguel, a foto foi mantida em `/escritorio` por ser foto própria do escritório. `blacklogo` deixou de ser publicado (logo redundante); o original continua em `design/originais/`.
- **Presidência da Comissão Especial de Direito Aeronáutico da OAB-GO** (confirmada pelo Miguel em 18/10/2026): aparece como linha discreta no hero, no bloco de liderança da Home, no perfil em `/escritorio`, no bloco "Profissional responsável" em `/direito-aeronautico`, na description de `/escritorio` e no JSON-LD (`Person.memberOf`). Texto central em `RESPONSAVEL.credencial` (`src/config/site.ts`), componente `src/components/ui/Credencial.tsx`.
- **Localização** (`src/components/ui/Localizacao.tsx`, dados em `LOCALIZACAO` em `src/config/site.ts`): bloco na seção Sede de `/escritorio`, com endereço exatamente como no Google Maps ("Esquina com Rua J60, Av. Sucuri – St. Jao, Goiânia – GO, 74674-260") e pin nas coordenadas do link (-16.6394493, -49.2313609; o `@…,-49.2325518` do link é só o centro da vista). O mapa usa embed sem chave de API, com `loading="lazy"` e `title` acessível. "Como chegar" abre a rota do Google Maps em nova aba e fica fora do iframe, então funciona mesmo sem o mapa. Entrada pelo reveal existente (respeita movimento reduzido). O endereço e o link "Ver no mapa" que estavam no texto da Sede foram substituídos pelo bloco. A política de privacidade passou a citar o mapa do Google.
- **Favicon** (pedido do Miguel): só o emblema dourado, fundo transparente, recortado no anel. `favicon.ico` com 16/32/48 px, mais `favicon-32.png` e `favicon-192.png`. Em 16 e 32 px usa dourado sólido `#B08F55` e alfa reforçado para manter nitidez; a partir de 48 px, o degradê original. O `apple-touch-icon` continua com fundo verde, porque o iOS preenche transparência de preto. Gerados por `npm run imagens`.
- **Aviões decorativos** (pedido do Miguel): o avião dourado (`design/originais/aviao.png`, enviado pelo Miguel; publicado como `aviao-160.webp`/`aviao-320.webp`, 7–17 KB em vez de 658 KB) decora a seção "Operações que acompanhamos" da Home em três pontos: canto superior direito com rota tracejada (rota só a partir de 1024 px), margem esquerda (só a partir de 1400 px) e abaixo da grade. Decorativos (`aria-hidden`), sem cobrir texto (medido de 320 a 1920 px), com entrada única (rota que se desenha e avião que desliza) desligada com movimento reduzido. Componente `src/components/ui/AvioesDecorativos.tsx`.
- **Animação das fotos** (pedido do Miguel): ao entrar na tela pela primeira vez, a moldura se abre de baixo para cima (`clip-path`) e a imagem assenta de 1,08 para 1, com a segunda foto da sede 160 ms depois. No hover há zoom lento de 1,03 dentro da moldura. Componente `src/components/ui/FotoRevelada.tsx`; desligado com movimento reduzido e para fotos já visíveis no carregamento.

## 2. Decisões técnicas

| Decisão | Motivo | Alternativa descartada |
| --- | --- | --- |
| Manter Vite + React + Tailwind e adicionar **pré-renderização própria** (`scripts/prerender.mjs`, `renderToString` + `hydrateRoot`) | Atende "HTML inicial com conteúdo e metadados por rota" sem migrar de framework e sem novas dependências | Astro (recomendado no estudo de set/2026): migração maior do que esta etapa exigia; continua viável para quando houver CMS e artigos |
| Navegação por links comuns (MPA), sem roteador no cliente | Cada página é um HTML real; menos JavaScript e menos estado | React Router com SSG |
| Arquivos `pagina.html` e URLs sem barra final | O Netlify serve `/atuacao` a partir de `atuacao.html` com 200; canonical sem barra | `pagina/index.html` (o Netlify redireciona para a forma com barra) |
| Remover `/* → /index.html 200` do `netlify.toml` | Era a causa do "soft 404" (URL inexistente devolvia a Home com 200) | — |
| Fraunces + Inter **autohospedadas** (`@fontsource-variable`) | Sem requisição ao Google Fonts (privacidade/LGPD e desempenho); pré-carregamento só do subconjunto latino | Google Fonts com preconnect |
| Remover `motion` | Animações em CSS + IntersectionObserver; menos JS | Manter Framer Motion |
| Formulário via **Netlify Forms**, **desligado por padrão** | Serviço compatível com a hospedagem atual, sem segredos no frontend. Fica desligado até a notificação por e-mail ser configurada e testada, para não simular envio | Função própria + serviço transacional (ver pendências) |

**Validações automáticas no build** (`npm run build` falha se houver): página sem exatamente um `<h1>`, títulos repetidos, referência a `netlify.app`, ou `TODO`/lorem ipsum no HTML.

## 3. SEO técnico

- Domínio principal `https://moraesluzadv.com` em canonical, `og:url`, JSON-LD, robots e sitemap. Todas as referências a `moraesluzadvocacia.netlify.app` foram removidas (eram confirmadas no ar em 18/10/2026).
- `sitemap.xml` com as 5 rotas indexáveis (o 404 fica de fora). Sem `lastmod`, para não informar datas imprecisas.
- `robots.txt` apontando para `https://moraesluzadv.com/sitemap.xml`.
- Open Graph com URL absoluta e `og-image.jpg` (1200×630, existente).
- JSON-LD: `LegalService` + `Person` (Home e Escritório), `BreadcrumbList` nas páginas internas. Removidos `areaServed` (abrangência não confirmada) e o Instagram pessoal como `sameAs` do escritório; ele ficou no `Person`.
- Redirecionamentos (`netlify.toml`): `moraesluzadvocacia.netlify.app/*` → `moraesluzadv.com/:splat` (301, preserva o caminho; caminho inexistente cai no 404 do domínio novo). HTTP → HTTPS e www → sem www continuam na configuração de domínio do Netlify (conferidos no ar: 301).
- Âncoras da landing anterior: `/#sobre` → `/escritorio` e `/#atuacao` → `/atuacao` (redirecionamento no cliente, porque o hash não chega ao servidor). `/#contato` continua válido.

## 4. Contato e mensuração

- Canais preservados: WhatsApp (62) 98155-9648, e-mail `escritorio@moraesluzadv.com` (trocado do Gmail a pedido do Miguel em 18/10/2026), endereço/mapa, Instagram @isabelamoraesluz (rodapé).
- Uma única seção de contato por página; mensagem do WhatsApp e assunto do e-mail identificam a página de origem.
- **Formulário** (`src/components/contato/FormularioContato.tsx`): nome, e-mail **ou** telefone, empresa opcional, assunto (lista), mensagem com até 800 caracteres e aviso para não enviar documentos sigilosos. Tem validação com foco no primeiro erro, campo-isca, bloqueio de envio duplicado, estados reais de envio, sucesso e erro, e alternativa por WhatsApp/e-mail quando falha.
  - Ativação: definir `VITE_FORMULARIO_CONTATO=netlify` no ambiente de build do Netlify, habilitar *Forms* no painel, configurar a notificação por e-mail e testar um envio real. Ao ativar, a política de privacidade passa a exibir automaticamente a seção do formulário.
- **Mensuração** (`src/lib/analytics.ts`): eventos `contato_clique` (canal + posição + página) e `formulario_enviado` (assunto + página, só após resposta 2xx). Só são enviados se existir `window.dataLayer`. **Nenhum GTM/GA4 está instalado.** Nunca envia nome, contato ou texto da mensagem. Clique em WhatsApp é intenção de contato, não conversão de contratação.

## 5. Verificações executadas (com evidência)

Ambiente: macOS, Node 20.20.2, Chrome 155, servidor local `npm run preview` (imita o Netlify, com gzip e cache dos assets).

| Verificação | Resultado |
| --- | --- |
| `npm run lint` (tsc) e `npm run build` | Sem erros; pré-renderização sem problemas |
| Status HTTP local | 200 nas 5 rotas; `/nao-existe` → **404**; `/atuacao/` → 301 para `/atuacao` |
| Metadados | title, description e canonical próprios por rota; 404 com `noindex` |
| Larguras 320, 375, 768 e 1440 px (iframes de mesma origem) | Sem rolagem horizontal; exatamente 1 `<h1>` em todas as páginas |
| Links internos e âncoras (157 no build) | Nenhum quebrado |
| Menu móvel | `aria-expanded` e `aria-controls`; foco no primeiro link; Esc fecha e devolve o foco; trava e destrava a rolagem; fecha ao passar para desktop |
| Teclado | "Pular para o conteúdo" no primeiro Tab; foco visível independente do hover |
| Console | Sem erros nem avisos de hidratação em Home, Aviação, Atuação e 404 |
| Formulário (build de teste com a flag ligada) | Erros por campo; foco no primeiro inválido; servidor sem serviço (405) → estado de erro; servidor de teste (200) → sucesso com foco; 3 tentativas rápidas → **1 POST**; evento sem dados pessoais |
| Bloco de localização | Mapa carregado com pin na esquina da Av. Sucuri com a R. J-60; embed final (`/maps/embed`) responde 200 sem `X-Frame-Options`; sem overflow em 320/375/768/1440 |
| Cartão do hero (vertical e largo) | 528×451 px no desktop, emblema de 171 px; nome cabe no cartão em 320, 375, 430, 768, 1024 e 1440 px; sem overflow |
| Redirecionamento das âncoras antigas | `/#sobre` → `/escritorio`, `/#atuacao` → `/atuacao` |
| Animação das fotos (`clip-path` medido durante a transição) | Abre 80% → 28% → 5% → 0 em 60/200/450/1200 ms; segunda foto atrasada (100% → 86% → 15% → 0); escala 1,04 → 1; classes removidas no fim |
| Contraste (WCAG) | Texto 13,5:1; secundário 5,5:1; bronze 5,2:1; botão dourado 6,4:1; rótulo do contato corrigido para 5,6:1 |
| Lighthouse 12.8.2, mobile, *simulated throttling*, local | Home 97/100/100/100 · Aviação 99/100/100/100 · Atuação 99/100/100/100 · Escritório 97/100/100/100 (Performance/Acessibilidade/Boas práticas/SEO). LCP 2,0–2,6 s, CLS 0, TBT 0 ms. Home e Escritório medidas de novo depois do logo e das fotos |

Os números do Lighthouse são **de laboratório, em servidor local**, não dados de campo. Repetir no endereço de homologação do Netlify e no PageSpeed Insights depois da publicação.

**Não verificado nesta execução:** emulação de `prefers-reduced-motion` no navegador (a janela automatizada não permite trocar a preferência do sistema). A conformidade foi conferida no código: toda animação CSS está em `@media (prefers-reduced-motion: no-preference)`, há uma regra global de redução, e o reveal em JS não roda com a preferência ativa. Também não foram verificados zoom de 200% em navegador real nem leitores de tela. Conferir esses três itens manualmente na homologação.

## 6. Pendências

**Conteúdo e confirmação (antes de publicar)**

- [ ] **Inscrição OAB/GO 54.986**: tirada da documentação do projeto. Confirmar no Cadastro Nacional dos Advogados antes da publicação.
- [ ] **Presidência da Comissão Especial de Direito Aeronáutico da OAB-GO**: publicada após confirmação do Miguel. Faltam ato de nomeação e mandato, para revisar o texto ao fim do mandato (`RESPONSAVEL.credencial`).
- [ ] Formação, pós-graduações e experiência da Dra. Isabela (o perfil hoje descreve só a atuação).
- [ ] Outros advogados ou integrantes da equipe que devam aparecer.
- [ ] **Forma de atendimento** (`ETAPAS_ATENDIMENTO` em `src/content/atuacao.ts`): texto conservador, a confirmar com o escritório.
- [ ] "Reuniões agendadas previamente": confirmar.
- [ ] Endereço: o bloco de localização usa o texto literal do Google Maps ("St. Jao"). Rodapé, contato e JSON-LD ainda usam "Setor Jaó", uma expansão não confirmada (`CONTATO.endereco`). Confirmar o nome do bairro e unificar.
- [ ] Escopo de Administrativo e Tributário (o site antigo listava Tributário; não foi incluído).
- [ ] Artigos, publicações ou participações verificáveis para o bloco "Conhecimento do setor".
- [ ] Fotografia própria em contexto de aviação (hangar ou aeronave, com autorização). Hoje há a sala de reuniões (`foto1`) e a mesa (`foto2`).
- [ ] Se houver atendimento a passageiros, decidir o canal e o fluxo separado.

**Revisão jurídica (publicidade da advocacia e precisão técnica)**

- [ ] Todos os textos de `src/content/atuacao.ts` e das páginas, em especial as menções a RAB, RBAC 91/135, Lei nº 13.475/2017 (Lei do Aeronauta), sobreaviso e reserva.
- [ ] Política de privacidade: faltam razão social/CNPJ, eventual encarregado (DPO) e revisão do texto. Revisar de novo se Analytics, cookies ou o formulário forem ativados.
- [ ] Depoimentos com nome de cliente e "saímos vitoriosos" e a alegação de "relatórios em tempo real" foram **removidos**. Não reintroduzir sem validação ética.

**Acesso e integração**

- [ ] Netlify: publicar a branch como *deploy preview* para homologação. Conferir no ar o 404 real, o redirecionamento `netlify.app` → domínio e os headers. **Atenção:** a regra de redirecionamento afeta o subdomínio `moraesluzadvocacia.netlify.app`; usar *deploy previews* (outro subdomínio) para homologar.
- [ ] Formulário: habilitar Netlify Forms, notificação por e-mail e, se o briefing exigir envio "por mecanismo autenticado", trocar por função própria + serviço transacional autenticado no domínio (SPF/DKIM).
- [ ] GA4/GTM: criar contas em nome do escritório; instalar o GTM com banner de consentimento (Consent Mode). Atualizar a política antes.
- [ ] Search Console: verificar o domínio e enviar o sitemap após a publicação.
- [ ] E-mail: MX e SPF da Hostinger e DMARC `p=none` **existem** (conferidos via DNS em 18/10/2026). Falta validar DKIM, alinhamento e entregabilidade. **Nenhum registro DNS foi alterado.** O site já publica `escritorio@moraesluzadv.com`: antes de ir ao ar, confirmar que a caixa existe na Hostinger e testar envio e recebimento (Gmail e Outlook).

## 7. Como executar e conferir

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000 (sem pré-renderização)
npm run build      # build + pré-renderização + sitemap/robots/404 em dist/
npm run preview    # homologação local em http://localhost:4173 (404 real, gzip)
npm run lint       # checagem de tipos
npm run imagens    # regenera as imagens de public/ a partir de design/originais/
```

Teste manual do formulário (apenas local):

```bash
VITE_FORMULARIO_CONTATO=netlify npm run build
FORM_TESTE=ok npm run preview     # ou FORM_TESTE=erro; sem a variável, o POST recebe 405
npm run build                     # volta ao build padrão, sem formulário
```

Roteiro de conferência: as cinco rotas e uma inexistente; menu no celular; Tab desde o topo; `curl -I http://localhost:4173/nao-existe` (404); `dist/sitemap.xml` e `dist/robots.txt`; código-fonte de cada página (title, canonical, JSON-LD).

## 8. Limitações conhecidas

- O bundle de JavaScript (~75 KB gzip, quase todo React) hidrata a página inteira, embora a interatividade seja pequena (menu, formulário, reveal). É aceitável nos números atuais. Se for preciso reduzir, o caminho é a migração para Astro com ilhas.
- `npm run dev` não pré-renderiza: o título muda via JavaScript e não há 404 real. Conferir SEO e 404 sempre com `build` + `preview`.
- O redirecionamento das âncoras antigas depende de JavaScript.
- Sem CMS: novos itens de conhecimento são editados em `src/content/conhecimento.ts` e exigem novo deploy.
- `scripts/gerar-og-image.mjs` foi mantido como estava; a imagem OG atual é o logo sobre verde, sem o novo posicionamento.
