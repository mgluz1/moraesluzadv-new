/**
 * Textos de atuação. Escopo conforme o briefing de reestruturação (2026).
 * Revisão jurídica pendente: ver docs/ENTREGA-REESTRUTURACAO.md.
 */

export const PUBLICOS = [
  'Proprietários e compradores de aeronaves',
  'Operadores e administradores de aeronaves',
  'Empresas de serviços aeronáuticos, manutenção e hangares',
  'Empresas e empregadores ligados à aviação',
] as const;

/** Quatro frentes resumidas na Home. */
export const FRENTES_AVIACAO = [
  {
    titulo: 'Transações e contratos com aeronaves',
    texto:
      'Compra e venda, importação e exportação, com análise documental e registral, negociação dos contratos e acompanhamento da transferência.',
    ancora: 'transacoes',
  },
  {
    titulo: 'Regulação e operações aeronáuticas',
    texto:
      'Processos e requerimentos perante a ANAC e demais órgãos do setor, incluindo autos de infração e enquadramento jurídico das operações.',
    ancora: 'operacao',
  },
  {
    titulo: 'Relações empresariais e trabalhistas',
    texto:
      'Contratos entre proprietários, operadores, hangares, oficinas e prestadores, e relações de trabalho com tripulantes e equipes de apoio.',
    ancora: 'empresas',
  },
  {
    titulo: 'Estruturação e controvérsias do setor',
    texto:
      'Organização jurídica da titularidade e da operação de aeronaves e atuação em disputas envolvendo aeronaves, contratos e serviços.',
    ancora: 'empresas',
  },
] as const;

export interface Demanda {
  titulo: string;
  texto: string;
  pontos: string[];
}

export interface GrupoDemandas {
  id: string;
  titulo: string;
  demandas: Demanda[];
}

/** Operações e demandas atendidas, na página de Direito Aeronáutico. */
export const GRUPOS_AVIACAO: GrupoDemandas[] = [
  {
    id: 'transacoes',
    titulo: 'Transações com aeronaves',
    demandas: [
      {
        titulo: 'Compra e venda de aeronaves',
        texto: 'Assessoria a compradores e vendedores da negociação à transferência da propriedade.',
        pontos: [
          'Análise documental da aeronave e da situação no Registro Aeronáutico Brasileiro (RAB)',
          'Verificação de ônus, gravames e pendências que afetem a transferência',
          'Cartas de intenção, contratos de compra e venda e instrumentos de garantia',
          'Acompanhamento do fechamento e dos registros necessários',
        ],
      },
      {
        titulo: 'Importação e exportação',
        texto: 'Suporte às etapas contratuais e documentais da entrada ou saída de aeronaves do país.',
        pontos: [
          'Revisão de contratos internacionais de compra e venda (Aircraft Purchase Agreement)',
          'Coordenação com despachantes, oficinas e demais prestadores envolvidos',
          'Acompanhamento das exigências registrais e regulatórias da operação',
        ],
      },
    ],
  },
  {
    id: 'operacao',
    titulo: 'Contratos, operação e regulação',
    demandas: [
      {
        titulo: 'Contratos aeronáuticos e gerenciamento',
        texto: 'Contratos que organizam o uso, a operação e a manutenção da aeronave.',
        pontos: [
          'Contratos de administração e gerenciamento de aeronaves',
          'Arrendamento, cessão de uso e compartilhamento',
          'Contratos com hangares, oficinas de manutenção e prestadores',
          'Distribuição de responsabilidades, custos e seguros entre as partes',
        ],
      },
      {
        titulo: 'Questões regulatórias',
        texto: 'Atuação perante a ANAC e os demais órgãos competentes do setor.',
        pontos: [
          'Defesa em autos de infração e processos administrativos sancionadores',
          'Enquadramento entre operação privada (RBAC 91) e táxi aéreo (RBAC 135)',
          'Consultas e requerimentos administrativos',
        ],
      },
    ],
  },
  {
    id: 'empresas',
    titulo: 'Empresas e relações do setor',
    demandas: [
      {
        titulo: 'Relações trabalhistas na aviação',
        texto: 'Orientação e defesa de empregadores que contratam tripulantes e equipes de apoio.',
        pontos: [
          'Contratação de aeronautas à luz da Lei nº 13.475/2017',
          'Jornada, escalas, sobreaviso e reserva de tripulantes',
          'Defesa em reclamações trabalhistas',
        ],
      },
      {
        titulo: 'Estruturação empresarial e contencioso',
        texto: 'Organização societária e contratual de operações aeronáuticas e atuação em disputas do setor.',
        pontos: [
          'Estruturação da titularidade e da operação de aeronaves',
          'Acordos entre sócios, coproprietários e operadores',
          'Contencioso envolvendo aeronaves, contratos e prestação de serviços',
        ],
      },
    ],
  },
];

/** Etapas do atendimento. Confirmar com o escritório antes da publicação. */
export const ETAPAS_ATENDIMENTO = [
  {titulo: 'Primeiro contato', texto: 'Por WhatsApp, e-mail ou formulário, com uma descrição breve da operação ou da questão.'},
  {titulo: 'Análise preliminar', texto: 'Avaliação das informações iniciais e indicação dos documentos necessários para examinar o caso.'},
  {titulo: 'Escopo e proposta', texto: 'Definição do trabalho, das etapas e dos honorários antes do início da atuação.'},
  {titulo: 'Acompanhamento', texto: 'Condução das etapas definidas, com comunicação direta com a advogada responsável.'},
] as const;

export const EMPRESARIAL = [
  {
    titulo: 'Contratos empresariais e estruturação negocial',
    texto:
      'Elaboração, revisão e negociação de contratos de fornecimento, prestação de serviços, parceria e compra e venda, e estruturação das relações entre sócios.',
  },
  {
    titulo: 'Consultoria preventiva e assessoria recorrente',
    texto:
      'Acompanhamento das decisões jurídicas do dia a dia da empresa, com revisão de documentos e orientação antes da assinatura de compromissos.',
  },
  {
    titulo: 'Contencioso empresarial',
    texto: 'Atuação em disputas contratuais e societárias, em negociações e na esfera judicial.',
  },
] as const;

export const TRABALHISTA = [
  {
    titulo: 'Prevenção',
    texto: 'Revisão de contratos de trabalho, políticas internas e rotinas que costumam gerar passivo trabalhista.',
  },
  {
    titulo: 'Orientação',
    texto: 'Suporte em admissões, desligamentos, controle de jornada e situações sensíveis da relação de trabalho.',
  },
  {
    titulo: 'Defesa',
    texto: 'Atuação em reclamações trabalhistas, audiências e negociações, sempre ao lado do empregador.',
  },
] as const;
