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
  instagram: 'https://www.instagram.com/isabelamoraesluz/',
  instagramUsuario: '@isabelamoraesluz',
} as const;

const TELEFONE_E164 = '5562981559648';

export const CONTATO = {
  telefoneExibicao: '(62) 98155-9648',
  telefoneSchema: '+55-62-98155-9648',
  // Caixa existente em uso. Trocar por um endereço @moraesluzadv.com só
  // depois que a caixa estiver criada e testada.
  email: 'moraesluzadvocacia@gmail.com',
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
