import {Check} from 'lucide-react';
import {AberturaPagina} from '../components/ui/AberturaPagina';
import {CabecalhoSecao, LinkSeta, Rotulo, Secao} from '../components/ui/base';
import {SecaoContato} from '../components/contato/SecaoContato';
import {Credencial} from '../components/ui/Credencial';
import {ETAPAS_ATENDIMENTO, GRUPOS_AVIACAO, PUBLICOS} from '../content/atuacao';
import {RESPONSAVEL} from '../config/site';

export const DireitoAeronautico = () => (
  <>
    {/* 1. Posicionamento e públicos */}
    <AberturaPagina rotulo="Direito Aeronáutico" titulo="Assessoria jurídica para operações com aeronaves" trilha="Direito Aeronáutico" comRota>
      <p>
        Contratos, transações, regulação e relações de trabalho para quem compra, vende, opera, administra ou presta serviços a
        aeronaves.
      </p>
    </AberturaPagina>
    <div className="border-b border-divisoria bg-superficie">
      <div className="mx-auto max-w-[1160px] px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="rotulo font-sans text-bronze">Quem atendemos</h2>
        <ul className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-4">
          {PUBLICOS.map((publico) => (
            <li key={publico} className="flex gap-3 text-[0.9375rem] leading-snug">
              <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dourado" />
              {publico}
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* 2. Operações e demandas atendidas */}
    <Secao rotuloId="demandas-titulo">
      <CabecalhoSecao rotulo="Operações e demandas" titulo="O que acompanhamos" id="demandas-titulo">
        <p>Organizado pelas situações que proprietários, operadores e empresas do setor enfrentam na prática.</p>
      </CabecalhoSecao>

      <div className="mt-12 space-y-14 lg:space-y-16">
        {GRUPOS_AVIACAO.map((grupo, indice) => (
          <section key={grupo.id} id={grupo.id} aria-labelledby={`${grupo.id}-titulo`} className="grid gap-6 lg:grid-cols-[minmax(0,15rem)_1fr] lg:gap-12">
            <div className="border-t border-verde/25 pt-4 lg:border-t-0 lg:pt-1">
              <span className="font-serif text-sm text-bronze" aria-hidden="true">
                {String(indice + 1).padStart(2, '0')}
              </span>
              <h3 id={`${grupo.id}-titulo`} className="mt-1 text-2xl text-verde-profundo">
                {grupo.titulo}
              </h3>
            </div>
            <div className="grid gap-5 md:grid-cols-2">
              {grupo.demandas.map((demanda) => (
                <article key={demanda.titulo} data-revelar className="rounded-cartao border border-divisoria bg-superficie p-6 sm:p-7">
                  <h4 className="font-serif text-xl font-medium text-verde-profundo">{demanda.titulo}</h4>
                  <p className="mt-2 text-texto-2">{demanda.texto}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-divisoria pt-5 text-[0.9375rem]">
                    {demanda.pontos.map((ponto) => (
                      <li key={ponto} className="flex gap-3">
                        <Check size={16} aria-hidden="true" className="mt-1 shrink-0 text-bronze" />
                        <span>{ponto}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Secao>

    {/* 3. Forma de atendimento */}
    <Secao tom="branco" rotuloId="atendimento-titulo">
      <CabecalhoSecao rotulo="Atendimento" titulo="Como conduzimos o trabalho" id="atendimento-titulo" />
      <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
        {ETAPAS_ATENDIMENTO.map((etapa, i) => (
          <li key={etapa.titulo} data-revelar className="border-t border-verde/25 pt-5">
            <span className="font-serif text-3xl text-dourado" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="mt-2 font-sans text-base font-semibold text-verde-profundo">{etapa.titulo}</h3>
            <p className="mt-2 text-[0.9375rem] text-texto-2">{etapa.texto}</p>
          </li>
        ))}
      </ol>
    </Secao>

    {/* 4. Profissional responsável */}
    <Secao rotuloId="profissional-titulo">
      <div className="grid items-center gap-8 rounded-cartao border border-divisoria bg-superficie p-6 sm:grid-cols-[9rem_1fr] sm:p-8 lg:grid-cols-[11rem_1fr_auto] lg:gap-10">
        <img
          src="/adv-480.webp"
          alt="Isabela Santos Moraes Luz"
          width={480}
          height={720}
          loading="lazy"
          decoding="async"
          className="aspect-square w-32 rounded-lg bg-divisoria object-cover object-[50%_45%] sm:w-full"
        />
        <div>
          <Rotulo>Profissional responsável</Rotulo>
          <h2 id="profissional-titulo" className="mt-2 text-2xl text-verde-profundo sm:text-3xl">
            {RESPONSAVEL.tratamento}
          </h2>
          <p className="mt-1 text-sm font-medium text-texto-2">
            {RESPONSAVEL.cargo} · {RESPONSAVEL.oab}
          </p>
          <Credencial className="mt-4" />
          <p className="mt-3 max-w-xl text-texto-2">
            Responsável pela atuação do escritório em Direito Aeronáutico, nas frentes contratual, regulatória e trabalhista.
          </p>
        </div>
        <LinkSeta href="/escritorio" className="sm:col-span-2 lg:col-span-1">
          Perfil e escritório
        </LinkSeta>
      </div>
    </Secao>

    {/* 5. Contato */}
    <SecaoContato
      origem="aviacao"
      mensagemWhatsapp="Olá! Vim pela página de Direito Aeronáutico do site e gostaria de falar com a equipe."
      assuntoEmail="Direito Aeronáutico: contato pelo site"
    />
  </>
);
