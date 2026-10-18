import type {Rota} from '../rotas';
import {CONTATO, RESPONSAVEL, SITE} from '../config/site';
import {EMBLEMA_SIZES, EMBLEMA_SRCSET} from '../components/ui/LogoHero';

const escapar = (texto: string) =>
  texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON dentro de <script>: impede o fechamento acidental da tag. */
const jsonSeguro = (dado: unknown) => JSON.stringify(dado).replace(/</g, '\\u003c');

export const urlAbsoluta = (caminho: string) => (caminho === '/' ? `${SITE.url}/` : `${SITE.url}${caminho}`);

const ID_ESCRITORIO = `${SITE.url}/#escritorio`;
const ID_RESPONSAVEL = `${SITE.url}/escritorio#isabela-santos-moraes-luz`;

/** Dados estruturados coerentes com o conteúdo visível de cada página. */
function dadosEstruturados(rota: Rota): object[] {
  const {endereco} = CONTATO;
  const escritorio = {
    '@type': 'LegalService',
    '@id': ID_ESCRITORIO,
    name: SITE.nomeCompleto,
    url: `${SITE.url}/`,
    logo: `${SITE.url}/apple-touch-icon.png`,
    image: `${SITE.url}${SITE.imagemCompartilhamento}`,
    telephone: CONTATO.telefoneSchema,
    email: CONTATO.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: endereco.logradouro,
      addressLocality: endereco.cidade,
      addressRegion: endereco.uf,
      postalCode: endereco.cep,
      addressCountry: 'BR',
    },
    geo: {'@type': 'GeoCoordinates', ...CONTATO.geo},
    founder: {'@id': ID_RESPONSAVEL},
    knowsAbout: ['Direito Aeronáutico', 'Direito Empresarial', 'Direito do Trabalho'],
  };
  const responsavel = {
    '@type': 'Person',
    '@id': ID_RESPONSAVEL,
    name: RESPONSAVEL.nome,
    jobTitle: RESPONSAVEL.cargo,
    image: `${SITE.url}/adv.webp`,
    worksFor: {'@id': ID_ESCRITORIO},
    sameAs: [RESPONSAVEL.instagram],
  };

  const grafo: object[] = [];
  if (rota.caminho === '/') grafo.push(escritorio, responsavel);
  if (rota.caminho === '/escritorio') grafo.push(escritorio, responsavel);
  if (rota.trilha) {
    grafo.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Início', item: `${SITE.url}/`},
        {'@type': 'ListItem', position: 2, name: rota.trilha, item: urlAbsoluta(rota.caminho)},
      ],
    });
  }
  return grafo;
}

/** Tags do <head> específicas da rota, inseridas no HTML pré-renderizado. */
export function montarHead(rota: Rota): string {
  const url = urlAbsoluta(rota.caminho);
  const imagem = `${SITE.url}${SITE.imagemCompartilhamento}`;
  const tags = [
    `<title>${escapar(rota.titulo)}</title>`,
    `<meta name="description" content="${escapar(rota.descricao)}" />`,
  ];

  if (rota.indexavel) {
    tags.push(
      `<link rel="canonical" href="${url}" />`,
      `<meta property="og:type" content="website" />`,
      `<meta property="og:url" content="${url}" />`,
      `<meta property="og:title" content="${escapar(rota.titulo)}" />`,
      `<meta property="og:description" content="${escapar(rota.descricao)}" />`,
      `<meta property="og:site_name" content="${escapar(SITE.nome)}" />`,
      `<meta property="og:locale" content="pt_BR" />`,
      `<meta property="og:image" content="${imagem}" />`,
      `<meta property="og:image:width" content="1200" />`,
      `<meta property="og:image:height" content="630" />`,
      `<meta property="og:image:type" content="image/jpeg" />`,
      `<meta property="og:image:alt" content="Logotipo Moraes Luz Advocacia &amp; Assessoria Jurídica" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
    );
  } else {
    tags.push(`<meta name="robots" content="noindex" />`);
  }

  // O emblema do hero é o maior elemento acima da dobra da Home.
  if (rota.caminho === '/') {
    tags.push(
      `<link rel="preload" as="image" href="/logo-emblema-640.webp" imagesrcset="${EMBLEMA_SRCSET}" imagesizes="${EMBLEMA_SIZES}" fetchpriority="high" />`,
    );
  }

  const grafo = dadosEstruturados(rota);
  if (grafo.length > 0) {
    tags.push(
      `<script type="application/ld+json">${jsonSeguro({'@context': 'https://schema.org', '@graph': grafo})}</script>`,
    );
  }
  return tags.join('\n    ');
}
