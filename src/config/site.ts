/**
 * Dados institucionais e canais de contato. Tudo o que aparece para o
 * visitante e nos metadados sai daqui, para não haver duas versões do
 * mesmo telefone, e-mail ou domínio.
 *
 * Pendências de confirmação ficam em docs/ENTREGA-REESTRUTURACAO.md.
 */

export const SITE = {
  url: 'https://moraesluzadv.com',
  nome: 'Moraes Luz Advocacia',
  nomeCompleto: 'Moraes Luz Advocacia & Assessoria Jurídica',
  descricaoCurta: 'Direito Aeronáutico e Empresarial',
  imagemCompartilhamento: '/og-image.jpg',
} as const;

export const RESPONSAVEL = {
  nome: 'Isabela Santos Moraes Luz',
  tratamento: 'Dra. Isabela Santos Moraes Luz',
  cargo: 'Sócia-fundadora',
  // Inscrição informada na documentação do projeto; confirmar no CNA antes da publicação.
  oab: 'OAB/GO 54.986',
  // Confirmado pelo Miguel em 18/10/2026. Mandato e ato de nomeação não
  // informados: revisar este texto ao fim do mandato.
  credencial: {
    cargo: 'Presidente da Comissão Especial de Direito Aeronáutico da OAB-GO',
    comissao: 'Comissão Especial de Direito Aeronáutico',
    entidade: 'Ordem dos Advogados do Brasil – Seção Goiás',
  },
  instagram: 'https://www.instagram.com/isabelamoraesluz/',
  instagramUsuario: '@isabelamoraesluz',
} as const;

const TELEFONE_E164 = '5562981559648';

export const CONTATO = {
  telefoneExibicao: '(62) 98155-9648',
  telefoneSchema: '+55-62-98155-9648',
  // Endereço profissional definido pelo Miguel em 18/10/2026 (antes:
  // moraesluzadvocacia@gmail.com). Testar envio e recebimento antes de publicar.
  email: 'escritorio@moraesluzadv.com',
  endereco: {
    logradouro: 'Av. Sucuri, esquina com Rua J60',
    bairro: 'Setor Jaó',
    cidade: 'Goiânia',
    uf: 'GO',
    cep: '74674-260',
  },
  geo: {latitude: -16.6394493, longitude: -49.2313609},
  mapa:
    'https://www.google.com/maps/place/Moraes+Luz+Advocacia/@-16.6394493,-49.2325518,19z/data=!4m10!1m2!2m1!1sEsquina+com+Rua+J60,+Av.+Sucuri+-+St.+Jao,+Goi%C3%A2nia-GO,+74674-260!3m6!1s0x935ef3f2994d01f3:0x9eea480cce786fac!8m2!3d-16.6394493!4d-49.2313609!15sCkFFc3F1aW5hIGNvbSBSdWEgSjYwLCBBdi4gU3VjdXJpIC0gU3QuIEphbywgR29pw6JuaWEtR08sIDc0Njc0LTI2MJIBDmxlZ2FsX3NlcnZpY2Vz4AEA!16s%2Fg%2F11s1rngv0t',
} as const;

/**
 * Bloco de localização (/escritorio). Para mudar o local, atualize só aqui:
 * endereço exatamente como no Google Maps, coordenadas do pin (os valores
 * depois de !3d e !4d no link do local, não o "@" do centro da vista) e o
 * link do local.
 */
export const LOCALIZACAO = {
  nome: 'Moraes Luz Advocacia',
  // Texto do próprio Google Maps; "St. Jao" não foi expandido por falta de confirmação.
  endereco: 'Esquina com Rua J60, Av. Sucuri – St. Jao',
  cidade: 'Goiânia – GO',
  cep: '74674-260',
  latitude: -16.6394493,
  longitude: -49.2313609,
  linkLocal: CONTATO.mapa,
} as const;

const coordenadas = `${LOCALIZACAO.latitude},${LOCALIZACAO.longitude}`;

/** Mapa interativo (embed do Google Maps sem chave de API, pin nas coordenadas). */
export const mapaEmbed = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(coordenadas)}&z=17&hl=pt-BR&output=embed`;

/** Rota até o escritório no Google Maps (abre o modo "Como chegar"). */
export const comoChegar = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(coordenadas)}`;

/** Link do WhatsApp com a mensagem já preenchida. */
export const whatsapp = (texto = 'Olá! Vim pelo site do Moraes Luz Advocacia e gostaria de falar com a equipe.') =>
  `https://wa.me/${TELEFONE_E164}?text=${encodeURIComponent(texto)}`;

export const mailto = (assunto = 'Contato pelo site') =>
  `mailto:${CONTATO.email}?subject=${encodeURIComponent(assunto)}`;

/**
 * O formulário só aparece quando o envio estiver configurado de verdade
 * (Netlify Forms ativo e notificação por e-mail testada). Sem isso, a seção
 * de contato mostra apenas os canais diretos, que funcionam.
 */
export const FORMULARIO_ATIVO = import.meta.env.VITE_FORMULARIO_CONTATO === 'netlify';
