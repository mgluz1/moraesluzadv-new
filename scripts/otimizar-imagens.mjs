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

const ALVOS = [
  {origem: 'logoTransparente.png', saida: 'logoTransparente.webp', largura: 512, metaKB: 40},
  {origem: 'blacklogo.png', saida: 'blacklogo.webp', largura: 600, metaKB: 40},
  {origem: 'adv.jpg', saida: 'adv.webp', largura: 800, metaKB: 80},
  {origem: 'foto1.jpg', saida: 'foto1.webp', largura: 800, metaKB: 80},
  {origem: 'foto2.jpg', saida: 'foto2.webp', largura: 800, metaKB: 80},
];

const kb = (bytes) => (bytes / 1024).toFixed(1).padStart(6) + ' KB';

/**
 * Empacota um PNG em um container .ico. Todo navegador atual lê ICO com
 * payload PNG, e é bem menor que o bitmap não comprimido.
 */
function pngParaIco(png, tamanho) {
  const cabecalho = Buffer.alloc(6);
  cabecalho.writeUInt16LE(0, 0); // reservado
  cabecalho.writeUInt16LE(1, 2); // tipo: ícone
  cabecalho.writeUInt16LE(1, 4); // quantidade de imagens

  const entrada = Buffer.alloc(16);
  entrada.writeUInt8(tamanho === 256 ? 0 : tamanho, 0); // largura (0 = 256)
  entrada.writeUInt8(tamanho === 256 ? 0 : tamanho, 1); // altura
  entrada.writeUInt8(0, 2); // cores da paleta
  entrada.writeUInt8(0, 3); // reservado
  entrada.writeUInt16LE(1, 4); // planos
  entrada.writeUInt16LE(32, 6); // bits por pixel
  entrada.writeUInt32LE(png.length, 8);
  entrada.writeUInt32LE(cabecalho.length + entrada.length, 12);

  return Buffer.concat([cabecalho, entrada, png]);
}

/** Maior qualidade WebP que ainda cabe na meta; devolve o menor se nenhuma couber. */
async function melhorWebp(entrada, largura, metaBytes) {
  const base = sharp(entrada).resize({width: largura, withoutEnlargement: true});
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
    const {buf, quality} = await melhorWebp(entrada, alvo.largura, metaBytes);
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

  // Ícones: o logo é transparente, então vai achatado sobre o petróleo.
  const logo = await readFile(path.join(ORIGINAIS, 'logoTransparente.png'));

  const iconePng = (tamanho) =>
    sharp(logo)
      .resize(tamanho, tamanho, {fit: 'contain', background: {r: 0, g: 0, b: 0, alpha: 0}})
      .flatten({background: PETROLEUM})
      .png({compressionLevel: 9})
      .toBuffer();

  const favicon32 = await iconePng(32);
  const ico = pngParaIco(favicon32, 32);
  await writeFile(path.join(PUBLIC, 'favicon.ico'), ico);

  const appleTouch = await iconePng(180);
  await writeFile(path.join(PUBLIC, 'apple-touch-icon.png'), appleTouch);
  depois += ico.length + appleTouch.length;

  console.log(`${'favicon.ico'.padEnd(22)} ${' '.repeat(9)}   ${''.padEnd(22)} ${kb(ico.length)}  32x32`);
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
