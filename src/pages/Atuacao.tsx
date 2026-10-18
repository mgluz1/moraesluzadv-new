import {Plane} from 'lucide-react';
import {AberturaPagina} from '../components/ui/AberturaPagina';
import {CabecalhoSecao, LinkSeta, Secao} from '../components/ui/base';
import {SecaoContato} from '../components/contato/SecaoContato';
import {DecorAviacao} from '../components/ui/DecorAviacao';
import {EMPRESARIAL, TRABALHISTA} from '../content/atuacao';

const ListaAtuacao = ({itens}: {itens: readonly {titulo: string; texto: string}[]}) => (
  <dl data-revelar className="mt-10 grid gap-px overflow-hidden rounded-cartao border border-divisoria bg-divisoria md:grid-cols-3">
    {itens.map((item) => (
      <div key={item.titulo} className="bg-superficie p-6 sm:p-7">
        <dt className="font-serif text-xl font-medium text-verde-profundo">{item.titulo}</dt>
        <dd className="mt-3 text-texto-2">{item.texto}</dd>
      </div>
    ))}
  </dl>
);

export const Atuacao = () => (
  <>
    <AberturaPagina rotulo="Atuação" titulo="Empresarial e Trabalhista Empresarial" trilha="Atuação">
      <p>
        Suporte jurídico às empresas da aviação e de outros setores, nos contratos, na estrutura do negócio e nas relações de
        trabalho.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-base">
        <li>
          <a href="#empresarial" className="text-dourado underline-offset-4 hover:underline">
            Empresarial
          </a>
        </li>
        <li>
          <a href="#trabalhista" className="text-dourado underline-offset-4 hover:underline">
            Trabalhista Empresarial
          </a>
        </li>
      </ul>
    </AberturaPagina>

    <Secao id="empresarial" rotuloId="empresarial-titulo" className="relative overflow-hidden">
      <DecorAviacao canto="topo-direita" tamanho="sm" rota inclinacao={-8} />
      <CabecalhoSecao rotulo="Empresarial" titulo="Contratos, estrutura e disputas" id="empresarial-titulo">
        <p>
          Assessoria a empresas nas decisões que envolvem contratos, sócios e litígios, com conhecimento das relações comerciais
          próprias de quem opera ou presta serviços na aviação.
        </p>
      </CabecalhoSecao>
      <ListaAtuacao itens={EMPRESARIAL} />
    </Secao>

    <Secao id="trabalhista" tom="branco" rotuloId="trabalhista-titulo" className="relative overflow-hidden">
      <DecorAviacao canto="base-direita" tamanho="sm" inclinacao={-12} atraso={250} />
      <CabecalhoSecao rotulo="Trabalhista Empresarial" titulo="Assessoria e defesa de empregadores" id="trabalhista-titulo">
        <p>Atuação preventiva, consultiva e contenciosa ao lado da empresa empregadora.</p>
      </CabecalhoSecao>
      <ListaAtuacao itens={TRABALHISTA} />

      <aside
        aria-labelledby="trabalhista-aviacao"
        data-revelar
        className="mt-6 grid gap-5 rounded-cartao bg-papel p-6 sm:grid-cols-[auto_1fr] sm:p-8"
      >
        <Plane size={24} aria-hidden="true" className="text-bronze" />
        <div>
          <h3 id="trabalhista-aviacao" className="text-xl text-verde-profundo">
            Relações de trabalho na aviação
          </h3>
          <p className="mt-2 max-w-3xl text-texto-2">
            A contratação de tripulantes segue regras próprias, como a Lei do Aeronauta (Lei nº 13.475/2017), e o tipo de operação
            influencia jornada, escalas e obrigações do empregador. Proprietários, operadores e empresas de serviços aeronáuticos
            recebem orientação considerando essas particularidades.
          </p>
          <LinkSeta href="/direito-aeronautico#empresas" className="mt-4">
            Direito Aeronáutico
          </LinkSeta>
        </div>
      </aside>
    </Secao>

    <SecaoContato
      origem="atuacao"
      mensagemWhatsapp="Olá! Vim pela página de Atuação do site e gostaria de falar com a equipe."
      assuntoEmail="Empresarial / Trabalhista: contato pelo site"
    />
  </>
);
