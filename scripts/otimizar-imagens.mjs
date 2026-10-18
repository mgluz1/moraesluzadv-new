/**
 * Gera as imagens publicadas em `public/` a partir dos originais de
 * `design/originais/` (que ficam fora do deploy).
 *
 * Uso: npm run imagens
 *
 * Para cada imagem o script procura a maior qualidade WebP que ainda cabe
 * na meta de tamanho definida em ALVOS, para não chutar um número fixo.
 */
import {Buffer} from 'node:buffer';
import {mkdir, readFile, stat, writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGINAIS = path.join(raiz, 'design/originais');
const PUBLIC = path.join(raiz, 'public');

/** Cor de fundo dos ícones (o logo é transparente e sumiria em aba clara). */
const PETROLEUM = {r: 0x1a, g: 0x4a, b: 0x45, alpha: 1};
/** Dourado sólido dos favicons pequenos (legível em aba clara e escura). */
const DOURADO_ICONE = {r: 0xb0, g: 0x8f, b: 0x55};

const ALVOS = [
  {origem: 'adv.jpg', saida: 'adv.webp', largura: 800, metaKB: 80},
  {origem: 'foto1.jpg', saida: 'foto1.webp', largura: 800, metaKB: 80},
  // Variantes menores: logo do cabeçalho (até 56 px em tela 2x) e srcset das fotos.
  {origem: 'logoTransparente.png', saida: 'logo-marca.webp', largura: 112, metaKB: 8},
  // Emblema do hero, recortado no limite do anel (trim) para centralizar.
  {origem: 'logoTransparente.png', saida: 'logo-emblema-320.webp', largura: 320, metaKB: 30, recortar: true},
  {origem: 'logoTransparente.png', saida: 'logo-emblema-480.webp', largura: 480, metaKB: 58, recortar: true},
  {origem: 'logoTransparente.png', saida: 'logo-emblema-640.webp', largura: 640, metaKB: 70, recortar: true},
  {origem: 'adv.jpg', saida: 'adv-480.webp', largura: 480, metaKB: 36},
  {origem: 'foto1.jpg', saida: 'foto1-480.webp', largura: 480, metaKB: 36},
  {origem: 'foto2.jpg', saida: 'foto2.webp', largura: 800, metaKB: 80},
  {origem: 'foto2.jpg', saida: 'foto2-480.webp', largura: 480, metaKB: 36},
  // Retrato usado no cabeçalho de Atuação.
  {origem: 'adv2.png', saida: 'adv2.webp', largura: 800, metaKB: 90},
  {origem: 'adv2.png', saida: 'adv2-480.webp', largura: 480, metaKB: 40},
  // Avião dourado decorativo da seção de aviação (recortado no contorno).
  {origem: 'aviao.png', saida: 'aviao-160.webp', largura: 160, metaKB: 8, recortar: true},
  {origem: 'aviao.png', saida: 'aviao-320.webp', largura: 320, metaKB: 18, recortar: true},
];

const kb = (bytes) => (bytes / 1024).toFixed(1).padStart(6) + ' KB';

/**
 * Empacota PNGs (um por tamanho) em um container .ico. Todo navegador atual
 * lê ICO com payload PNG, e é bem menor que o bitmap não comprimido.
 */
function pngsParaIco(imagens) {
  const cabecalho = Buffer.alloc(6);
  cabecalho.writeUInt16LE(0, 0); // reservado
  cabecalho.writeUInt16LE(1, 2); // tipo: ícone
  cabecalho.writeUInt16LE(imagens.length, 4); // quantidade de imagens

  let deslocamento = cabecalho.length + 16 * imagens.length;
  const entradas = imagens.map(({png, tamanho}) => {
    const entrada = Buffer.alloc(16);
    entrada.writeUInt8(tamanho === 256 ? 0 : tamanho, 0); // largura (0 = 256)
    entrada.writeUInt8(tamanho === 256 ? 0 : tamanho, 1); // altura
    entrada.writeUInt8(0, 2); // cores da paleta
    entrada.writeUInt8(0, 3); // reservado
    entrada.writeUInt16LE(1, 4); // planos
    entrada.writeUInt16LE(32, 6); // bits por pixel
    entrada.writeUInt32LE(png.length, 8);
    entrada.writeUInt32LE(deslocamento, 12);
    deslocamento += png.length;
    return entrada;
  });

  return Buffer.concat([cabecalho, ...entradas, ...imagens.map((i) => i.png)]);
}

/** Maior qualidade WebP que ainda cabe na meta; devolve o menor se nenhuma couber. */
async function melhorWebp(entrada, largura, metaBytes, recortar = false) {
  const origem = recortar ? await sharp(entrada).trim({threshold: 10}).toBuffer() : entrada;
  const base = sharp(origem).resize({width: largura, withoutEnlargement: true});
  let ultima = null;

  for (const quality of [88, 82, 76, 70, 64, 58, 50]) {
    const buf = await base.clone().webp({quality, effort: 6}).toBuffer();
    ultima = {buf, quality};
    if (buf.length <= metaBytes) return ultima;
  }
  return ultima;
}

async function tamanho(arquivo) {
  return (await stat(arquivo)).size;
}

async function main() {
  await mkdir(PUBLIC, {recursive: true});

  let antes = 0;
  let depois = 0;

  for (const alvo of ALVOS) {
    const entrada = path.join(ORIGINAIS, alvo.origem);
    const saida = path.join(PUBLIC, alvo.saida);
    const metaBytes = alvo.metaKB * 1024;

    const original = await tamanho(entrada);
    const {buf, quality} = await melhorWebp(entrada, alvo.largura, metaBytes, alvo.recortar);
    await writeFile(saida, buf);

    const {width, height} = await sharp(buf).metadata();
    antes += original;
    depois += buf.length;

    const status = buf.length <= metaBytes ? 'ok ' : 'ACIMA DA META';
    console.log(
      `${alvo.origem.padEnd(22)} ${kb(original)} → ${alvo.saida.padEnd(22)} ${kb(buf.length)}` +
        `  ${width}x${height}  q=${quality}  meta ${alvo.metaKB} KB ${status}`,
    );
  }

  // Favicon: só o emblema dourado, fundo transparente, recortado no anel
  // para ocupar o ícone inteiro. Nos tamanhos pequenos, o canal alfa é
  // reforçado e a imagem levemente nitidizada para o traço fino não sumir.
  const logo = await readFile(path.join(ORIGINAIS, 'logoTransparente.png'));
  const emblema = await sharp(logo).trim({threshold: 10}).toBuffer();
  const TRANSPARENTE = {r: 0, g: 0, b: 0, alpha: 0};

  const faviconPng = async (tamanho) => {
    const base = sharp(emblema).resize(tamanho, tamanho, {fit: 'contain', background: TRANSPARENTE, kernel: 'lanczos3'});
    if (tamanho > 48) return base.png({compressionLevel: 9, palette: true, quality: 95}).toBuffer();
    const {data, info} = await base.sharpen({sigma: 0.6}).ensureAlpha().raw().toBuffer({resolveWithObject: true});
    for (let i = 0; i < data.length; i += 4) {
      if (tamanho <= 32) {
        // Em 16 e 32 px o degradê vira borrão claro: dourado sólido da marca
        // e bordas do alfa mais firmes.
        data[i] = DOURADO_ICONE.r;
        data[i + 1] = DOURADO_ICONE.g;
        data[i + 2] = DOURADO_ICONE.b;
        // Em 16 px o traço cobre menos de meio pixel: curva mais forte.
        const [corte, ganho] = tamanho <= 16 ? [12, 3.2] : [28, 1.7];
        data[i + 3] = Math.max(0, Math.min(255, Math.round((data[i + 3] - corte) * ganho)));
      } else {
        data[i + 3] = Math.min(255, Math.round(data[i + 3] * 1.35));
      }
    }
    return sharp(data, {raw: info}).png({compressionLevel: 9}).toBuffer();
  };

  const tamanhosIco = [16, 32, 48];
  const ico = pngsParaIco(await Promise.all(tamanhosIco.map(async (tamanho) => ({tamanho, png: await faviconPng(tamanho)}))));
  await writeFile(path.join(PUBLIC, 'favicon.ico'), ico);
  const favicon32 = await faviconPng(32);
  await writeFile(path.join(PUBLIC, 'favicon-32.png'), favicon32);
  const favicon192 = await faviconPng(192);
  await writeFile(path.join(PUBLIC, 'favicon-192.png'), favicon192);

  // Apple touch icon continua com fundo verde: o iOS preenche transparência de preto.
  const appleTouch = await sharp(logo)
    .resize(180, 180, {fit: 'contain', background: TRANSPARENTE})
    .flatten({background: PETROLEUM})
    .png({compressionLevel: 9})
    .toBuffer();
  await writeFile(path.join(PUBLIC, 'apple-touch-icon.png'), appleTouch);
  depois += ico.length + favicon32.length + favicon192.length + appleTouch.length;

  console.log(`${'favicon.ico'.padEnd(22)} ${' '.repeat(9)}   ${''.padEnd(22)} ${kb(ico.length)}  ${tamanhosIco.join('/')}`);
  console.log(`${'favicon-32.png'.padEnd(22)} ${' '.repeat(9)}   ${''.padEnd(22)} ${kb(favicon32.length)}  32x32`);
  console.log(`${'favicon-192.png'.padEnd(22)} ${' '.repeat(9)}   ${''.padEnd(22)} ${kb(favicon192.length)}  192x192`);
  console.log(`${'apple-touch-icon.png'.padEnd(22)} ${' '.repeat(9)}   ${''.padEnd(22)} ${kb(appleTouch.length)}  180x180`);

  console.log(
    `\nTotal: ${kb(antes)} → ${kb(depois)} ` +
      `(-${(100 - (depois / antes) * 100).toFixed(1)}%, ícones incluídos)`,
  );
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
