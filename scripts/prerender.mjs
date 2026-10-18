/**
 * Pré-renderização: gera um HTML estático por rota a partir do build do
 * cliente (dist/) e do build SSR (dist-ssr/), com título, descrição,
 * canonical, Open Graph e JSON-LD próprios. Também gera sitemap.xml,
 * robots.txt e 404.html.
 *
 * Executado por `npm run build`. Falha se encontrar problemas que não devem
 * chegar à produção (H1 ausente ou duplicado, títulos repetidos, domínio
 * antigo ou marcadores de pendência no HTML).
 */
import {readFile, readdir, rm, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath, pathToFileURL} from 'node:url';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(raiz, 'dist');
const SSR = path.join(raiz, 'dist-ssr');

const {renderizar, ROTAS, ROTA_404, urlAbsoluta} = await import(pathToFileURL(path.join(SSR, 'entry-server.js')).href);
const modelo = await readFile(path.join(DIST, 'index.html'), 'utf8');

// Pré-carrega só as fontes do subconjunto latino usadas acima da dobra.
const assets = await readdir(path.join(DIST, 'assets'));
const fontes = assets.filter((f) => /^(fraunces|inter)-latin-wght-normal-.*\.woff2$/.test(f));
const preload = fontes
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`)
  .join('\n    ');

const problemas = [];
const titulos = new Set();

for (const rota of [...ROTAS, ROTA_404]) {
  const {html, head} = renderizar(rota);
  const pagina = modelo
    .replace('<!--app-preload-->', preload)
    .replace('<!--app-head-->', head)
    .replace('<!--app-html-->', html);

  const h1s = (pagina.match(/<h1[\s>]/g) ?? []).length;
  if (h1s !== 1) problemas.push(`${rota.caminho}: ${h1s} elementos <h1>`);
  if (titulos.has(rota.titulo)) problemas.push(`${rota.caminho}: título repetido`);
  titulos.add(rota.titulo);
  if (/netlify\.app/.test(pagina)) problemas.push(`${rota.caminho}: referência ao domínio antigo`);
  if (/\bTODO\b|lorem ipsum/i.test(pagina)) problemas.push(`${rota.caminho}: marcador de pendência no HTML`);

  await writeFile(path.join(DIST, rota.arquivo), pagina);
  console.log(`  ${rota.arquivo.padEnd(28)} ${(Buffer.byteLength(pagina) / 1024).toFixed(1)} KB`);
}

const indexaveis = ROTAS.filter((r) => r.indexavel);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexaveis.map((r) => `  <url><loc>${urlAbsoluta(r.caminho)}</loc></url>`).join('\n')}
</urlset>
`;
await writeFile(path.join(DIST, 'sitemap.xml'), sitemap);
await writeFile(
  path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${urlAbsoluta('/sitemap.xml')}\n`,
);
await rm(SSR, {recursive: true, force: true});

console.log(`  sitemap.xml (${indexaveis.length} URLs), robots.txt`);
if (problemas.length) {
  console.error('\nPré-renderização encontrou problemas:\n- ' + problemas.join('\n- '));
  process.exit(1);
}
