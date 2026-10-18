<p align="center">
  <img src="public/og-image.jpg" alt="Moraes Luz Advocacia & Assessoria Jurídica, com o emblema dourado sobre fundo verde" width="100%" />
</p>

# Moraes Luz Advocacia

Site institucional do **Moraes Luz Advocacia & Assessoria Jurídica** (Goiânia, GO), com atuação empresarial e foco em Direito Aeronáutico.

- **Domínio principal:** [moraesluzadv.com](https://moraesluzadv.com)
- **Status:** reestruturação em homologação (ainda não publicada)
- **Histórico de decisões e pendências:** [`docs/ENTREGA-REESTRUTURACAO.md`](docs/ENTREGA-REESTRUTURACAO.md)

## Páginas

| Rota | Conteúdo |
| --- | --- |
| `/` | Início: posicionamento, operações aeronáuticas, liderança, suporte empresarial e contato |
| `/direito-aeronautico` | Públicos atendidos, demandas do setor, forma de atendimento e contato |
| `/atuacao` | Direito Empresarial e Trabalhista Empresarial |
| `/escritorio` | Perfil da sócia-fundadora, sede em Goiânia e localização |
| `/privacidade` | Política de privacidade |
| qualquer outra | Página 404 real, com status 404 |

## Tecnologias

- React 19 e TypeScript
- Vite 6 e Tailwind CSS 4
- Pré-renderização própria: um HTML estático por rota, com título, descrição, canonical, Open Graph e dados estruturados
- Fontes Fraunces e Inter, autohospedadas
- Hospedagem: Netlify

## Como rodar

Pré-requisito: Node.js 20 ou superior.

```bash
npm install
npm run dev        # desenvolvimento em http://localhost:3000
npm run build      # build de produção, com pré-renderização e sitemap em dist/
npm run preview    # serve dist/ como o Netlify (404 real) em http://localhost:4173
npm run lint       # checagem de tipos
npm run imagens    # gera as imagens de public/ a partir de design/originais/
```

`npm run dev` não pré-renderiza. Para conferir títulos, canonical, sitemap e 404, use `npm run build` seguido de `npm run preview`.

## Estrutura

```
├── index.html               # Modelo do HTML (o head de cada rota é inserido no build)
├── netlify.toml             # Build, redirecionamentos do domínio antigo e headers
├── design/originais/        # Imagens originais (não vão ao ar)
├── public/                  # Imagens otimizadas, favicon e imagem de compartilhamento
├── scripts/
│   ├── prerender.mjs        # HTML por rota, sitemap.xml, robots.txt, 404.html e checagens
│   ├── otimizar-imagens.mjs # Gera WebP e favicons a partir de design/originais/
│   └── servidor-homologacao.mjs
└── src/
    ├── rotas.tsx            # Rotas, títulos e descrições
    ├── config/site.ts       # Contatos, endereço, mapa e dados da responsável
    ├── content/             # Textos de atuação e publicações
    ├── lib/                 # SEO (head e JSON-LD) e mensuração
    ├── hooks/useRevelar.ts  # Animações de entrada ao rolar
    ├── components/          # Layout, contato e componentes de interface
    └── pages/               # Uma página por rota
```

## Editando o conteúdo

- **Contatos, endereço e localização:** `src/config/site.ts`
- **Textos de atuação:** `src/content/atuacao.ts`
- **Publicações e participações:** `src/content/conhecimento.ts` (só material publicado e revisado; o bloco fica oculto enquanto a lista estiver vazia)
- **Nova página:** crie em `src/pages/`, registre em `src/rotas.tsx` (título, descrição e arquivo) e, se necessário, adicione ao menu em `src/components/layout/Header.tsx`. O sitemap é gerado no build.
- **Formulário de contato:** desligado por padrão. Para ativar, defina `VITE_FORMULARIO_CONTATO=netlify` no build, depois de configurar o Netlify Forms e testar o envio.

## Identidade visual

| Cor | Hex | Uso |
| --- | --- | --- |
| Verde institucional | `#1A4A45` | Botões e destaques |
| Verde profundo | `#102F2D` | Fundo de seções escuras |
| Dourado | `#C9A96E` | Detalhes e emblema |
| Bronze | `#80612E` | Rótulos em fundo claro |
| Papel | `#F5F4F0` | Fundo claro |

## Deploy

O build gera a pasta `dist/`, que o Netlify publica. Configuração em `netlify.toml`:

- **Comando de build:** `npm run build`
- **Diretório de publicação:** `dist`
- **Versão do Node:** 20

## Autoria

Desenvolvido por **Miguel Luz** ([@mgluz1](https://github.com/mgluz1)).
Conteúdo e marca © Moraes Luz Advocacia & Assessoria Jurídica. Todos os direitos reservados.
