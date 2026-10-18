/**
 * Servidor estático para conferir o build localmente com o mesmo
 * comportamento do Netlify: "/atuacao" serve atuacao.html e endereços
 * inexistentes recebem 404.html com status 404 (não a Home com 200).
 *
 * Uso: npm run build && npm run preview  →  http://localhost:4173
 *
 * Apenas para testes manuais do formulário: FORM_TESTE=ok ou FORM_TESTE=erro
 * faz o POST "/" responder 200 ou 500. Sem essa variável, o POST recebe 405,
 * como aconteceria sem o Netlify Forms configurado.
 */
import {createServer} from 'node:http';
import {readFile, stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {gzipSync} from 'node:zlib';

const DIST = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const PORTA = Number(process.env.PORT ?? 4173);
const TIPOS = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.svg': 'image/svg+xml',
};

async function arquivo(caminho) {
  try {
    const completo = path.join(DIST, caminho);
    if (!completo.startsWith(DIST)) return null;
    return (await stat(completo)).isFile() ? completo : null;
  } catch {
    return null;
  }
}

createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', 'http://localhost');
  let caminho = decodeURIComponent(url.pathname);

  if (req.method === 'POST' && caminho === '/') {
    const modo = process.env.FORM_TESTE;
    req.resume();
    res.writeHead(modo === 'ok' ? 200 : modo === 'erro' ? 500 : 405).end();
    console.log(`POST / → ${modo ?? 'sem serviço'}`);
    return;
  }

  // Barra final: redireciona para a forma canônica, sem barra.
  if (caminho.length > 1 && caminho.endsWith('/')) {
    res.writeHead(301, {Location: caminho.replace(/\/+$/, '') + url.search}).end();
    return;
  }

  const encontrado =
    (await arquivo(caminho === '/' ? 'index.html' : caminho)) ?? (await arquivo(`${caminho}.html`));
  const status = encontrado ? 200 : 404;
  const servido = encontrado ?? path.join(DIST, '404.html');
  const tipo = TIPOS[path.extname(servido)] ?? 'application/octet-stream';
  let corpo = await readFile(servido);
  const cabecalhos = {'Content-Type': tipo};
  // Compressão e cache como no Netlify, para medições locais comparáveis.
  if (/text|javascript|xml/.test(tipo) && /gzip/.test(req.headers['accept-encoding'] ?? '')) {
    corpo = gzipSync(corpo);
    cabecalhos['Content-Encoding'] = 'gzip';
  }
  if (caminho.startsWith('/assets/')) cabecalhos['Cache-Control'] = 'public, max-age=31536000, immutable';
  res.writeHead(status, cabecalhos).end(corpo);
  console.log(`${status} ${caminho}`);
}).listen(PORTA, () => console.log(`Homologação local em http://localhost:${PORTA}`));
