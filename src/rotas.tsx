import type {ComponentType} from 'react';
import {Home} from './pages/Home';
import {DireitoAeronautico} from './pages/DireitoAeronautico';
import {Atuacao} from './pages/Atuacao';
import {Escritorio} from './pages/Escritorio';
import {Privacidade} from './pages/Privacidade';
import {NaoEncontrada} from './pages/NaoEncontrada';

export interface Rota {
  caminho: string;
  /** Arquivo gerado em dist/ (sem barra final, como o Netlify serve). */
  arquivo: string;
  titulo: string;
  descricao: string;
  /** Nome curto na trilha de navegação / BreadcrumbList. Ausente na Home. */
  trilha?: string;
  indexavel: boolean;
  Pagina: ComponentType;
}

export const ROTAS: Rota[] = [
  {
    caminho: '/',
    arquivo: 'index.html',
    titulo: 'Moraes Luz Advocacia | Direito Aeronáutico e Empresarial',
    descricao:
      'Assessoria jurídica para proprietários de aeronaves, operadores e empresas da aviação: contratos, transações, questões regulatórias e relações de trabalho. Goiânia (GO).',
    indexavel: true,
    Pagina: Home,
  },
  {
    caminho: '/direito-aeronautico',
    arquivo: 'direito-aeronautico.html',
    titulo: 'Direito Aeronáutico: compra, importação, contratos e ANAC | Moraes Luz',
    descricao:
      'Compra e venda e importação de aeronaves, contratos de gerenciamento, questões perante a ANAC, relações trabalhistas na aviação e contencioso do setor.',
    trilha: 'Direito Aeronáutico',
    indexavel: true,
    Pagina: DireitoAeronautico,
  },
  {
    caminho: '/atuacao',
    arquivo: 'atuacao.html',
    titulo: 'Direito Empresarial e Trabalhista Empresarial | Moraes Luz Advocacia',
    descricao:
      'Contratos empresariais, consultoria preventiva, contencioso e assessoria trabalhista a empregadores, incluindo empresas que mantêm tripulantes e equipes da aviação.',
    trilha: 'Atuação',
    indexavel: true,
    Pagina: Atuacao,
  },
  {
    caminho: '/escritorio',
    arquivo: 'escritorio.html',
    titulo: 'Escritório e equipe | Moraes Luz Advocacia',
    descricao:
      'Moraes Luz Advocacia & Assessoria Jurídica, em Goiânia (GO). Conheça a sócia-fundadora, Dra. Isabela Santos Moraes Luz, e a atuação do escritório.',
    trilha: 'Escritório',
    indexavel: true,
    Pagina: Escritorio,
  },
  {
    caminho: '/privacidade',
    arquivo: 'privacidade.html',
    titulo: 'Política de privacidade | Moraes Luz Advocacia',
    descricao: 'Como o site do Moraes Luz Advocacia trata informações de visitantes e de quem entra em contato.',
    trilha: 'Privacidade',
    indexavel: true,
    Pagina: Privacidade,
  },
];

export const ROTA_404: Rota = {
  caminho: '/404',
  arquivo: '404.html',
  titulo: 'Página não encontrada | Moraes Luz Advocacia',
  descricao: 'O endereço solicitado não existe no site do Moraes Luz Advocacia.',
  indexavel: false,
  Pagina: NaoEncontrada,
};

/** Normaliza barra final e ignora "/index.html". */
export function encontrarRota(caminho: string): Rota {
  const limpo = caminho.replace(/\/index\.html$/, '/').replace(/(.)\/+$/, '$1') || '/';
  return ROTAS.find((r) => r.caminho === limpo) ?? ROTA_404;
}
