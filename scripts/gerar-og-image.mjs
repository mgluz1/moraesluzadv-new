/**
 * Gera public/og-image.jpg (1200x630), a prévia que aparece ao colar o
 * link do site no WhatsApp, LinkedIn, etc.
 *
 * Uso: npm run og
 *
 * O letreiro vem de design/originais/blacklogo.png, que já traz "MORAES
 * LUZ / Advocacia & Assessoria Jurídica" na tipografia da marca. A arte é
 * preta, então aqui ela é tingida de nude pelo canal alfa — assim não
 * dependemos de ter a Playfair Display instalada no sistema para
 * rasterizar texto em SVG.
 */
import {writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import sharp from 'sharp';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ORIGEM = path.join(raiz, 'design/originais/blacklogo.png');
const SAIDA = path.join(raiz, 'public/og-image.jpg');

const LARGURA = 1200;
const ALTURA = 630;
const PETROLEUM = {r: 0x1a, g: 0x4a, b: 0x45};
const NUDE = {r: 0xc9, g: 0xa9, b: 0x6e};

/**
 * Repinta a arte com uma cor sólida, preservando o canal alfa (e o
 * antialias). O `trim` tira a margem transparente do original, senão o
 * selo fica pequeno no meio da prévia.
 */
async function tingir(entrada, cor, caixa) {
  const {data, info} = await sharp(entrada)
    .trim()
    .resize({...caixa, fit: 'inside', withoutEnlargement: true})
    .ensureAlpha()
    .raw()
    .toBuffer({resolveWithObject: true});

  for (let i = 0; i < data.length; i += 4) {
    data[i] = cor.r;
    data[i + 1] = cor.g;
    data[i + 2] = cor.b;
  }

  return sharp(data, {raw: {width: info.width, height: info.height, channels: 4}})
    .png()
    .toBuffer();
}

async function main() {
  const letreiro = await tingir(ORIGEM, NUDE, {width: 860, height: 430});
  const {width: larguraLetreiro, height: alturaLetreiro} = await sharp(letreiro).metadata();

  // Filete fino nas bordas, só para a prévia não ficar um retângulo chapado.
  const moldura = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGURA}" height="${ALTURA}">
      <rect x="40" y="40" width="${LARGURA - 80}" height="${ALTURA - 80}"
            fill="none" stroke="rgb(201,169,110)" stroke-opacity="0.35" stroke-width="2"/>
    </svg>`,
  );

  const imagem = await sharp({
    create: {width: LARGURA, height: ALTURA, channels: 4, background: {...PETROLEUM, alpha: 1}},
  })
    .composite([
      {input: moldura, top: 0, left: 0},
      {
        input: letreiro,
        top: Math.round((ALTURA - alturaLetreiro) / 2),
        left: Math.round((LARGURA - larguraLetreiro) / 2),
      },
    ])
    .jpeg({quality: 88, chromaSubsampling: '4:4:4'})
    .toBuffer();

  await writeFile(SAIDA, imagem);

  const {width, height} = await sharp(imagem).metadata();
  console.log(`og-image.jpg  ${width}x${height}  ${(imagem.length / 1024).toFixed(1)} KB`);
}

main().catch((erro) => {
  console.error(erro);
  process.exit(1);
});
