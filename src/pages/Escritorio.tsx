import {AberturaPagina} from '../components/ui/AberturaPagina';
import {LinkSeta, Rotulo, Secao} from '../components/ui/base';
import {FotoRevelada} from '../components/ui/FotoRevelada';
import {SecaoContato} from '../components/contato/SecaoContato';
import {CONTATO, RESPONSAVEL} from '../config/site';

const AREAS = ['Direito Aeronáutico', 'Direito Empresarial', 'Trabalhista Empresarial'];

export const Escritorio = () => {
  const {endereco} = CONTATO;

  return (
    <>
      <AberturaPagina rotulo="Escritório" titulo="Moraes Luz Advocacia & Assessoria Jurídica" trilha="Escritório">
        <p>Escritório sediado em Goiânia (GO), com atuação empresarial e foco no Direito Aeronáutico.</p>
      </AberturaPagina>

      <Secao tom="branco" rotuloId="perfil-titulo">
        <article id="isabela-santos-moraes-luz" className="grid gap-10 md:grid-cols-[0.85fr_1fr] lg:gap-20">
          <FotoRevelada
            src="/adv.webp"
            srcSet="/adv-480.webp 480w, /adv.webp 800w"
            sizes="(min-width: 1160px) 440px, (min-width: 768px) 40vw, (min-width: 384px) 384px, 100vw"
            alt="Isabela Santos Moraes Luz em retrato profissional"
            width={800}
            height={1201}
            loading="eager"
            fetchPriority="high"
            className="mx-auto w-full max-w-sm md:max-w-none"
            imgClassName="object-[50%_42%]"
          />
          <div className="md:pt-4">
            <Rotulo>{RESPONSAVEL.cargo}</Rotulo>
            <h2 id="perfil-titulo" className="titulo-secao mt-3 text-verde-profundo">
              {RESPONSAVEL.tratamento}
            </h2>
            <p className="mt-2 text-sm font-medium text-texto-2">{RESPONSAVEL.oab}</p>
            <div className="mt-6 max-w-xl space-y-4 text-texto-2">
              <p>
                Fundou o Moraes Luz Advocacia e conduz a atuação do escritório. Acompanha transações com aeronaves, contratos
                aeronáuticos, questões regulatórias e relações de trabalho de empresas ligadas à aviação, além da assessoria
                empresarial e trabalhista a empregadores.
              </p>
            </div>
            <h3 className="rotulo mt-8 font-sans text-bronze">Áreas de atuação</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <li key={area} className="rounded-full border border-divisoria px-3.5 py-1.5 text-sm text-verde-profundo">
                  {area}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              <LinkSeta href="/direito-aeronautico">Direito Aeronáutico</LinkSeta>
              <LinkSeta href="/atuacao">Empresarial e Trabalhista</LinkSeta>
            </div>
          </div>
        </article>
      </Secao>

      <Secao rotuloId="sede-titulo">
        <div className="grid items-center gap-10 md:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="grid grid-cols-2 items-start gap-3 sm:gap-5 md:order-2">
            <FotoRevelada
              src="/foto1.webp"
              srcSet="/foto1-480.webp 480w, /foto1.webp 800w"
              sizes="(min-width: 1160px) 260px, (min-width: 768px) 24vw, 50vw"
              alt="Sala de reuniões do escritório, com mesa de vidro escuro e quadro de uma aeronave na parede"
              width={800}
              height={1067}
              proporcao="aspect-[3/4]"
            />
            <FotoRevelada
              src="/foto2.webp"
              srcSet="/foto2-480.webp 480w, /foto2.webp 800w"
              sizes="(min-width: 1160px) 260px, (min-width: 768px) 24vw, 50vw"
              alt="Mesa do escritório com xícara personalizada com o logo Moraes Luz"
              width={800}
              height={1067}
              proporcao="aspect-[3/4]"
              atraso={160}
              className="mt-10 sm:mt-16"
            />
          </div>
          <div>
            <Rotulo>Sede</Rotulo>
            <h2 id="sede-titulo" className="titulo-secao mt-3 text-verde-profundo">
              Goiânia, Goiás
            </h2>
            <p className="mt-5 max-w-lg text-texto-2">
              As reuniões no escritório são agendadas previamente pelo WhatsApp ou por e-mail.
            </p>
            <address className="mt-6 not-italic text-texto">
              {endereco.logradouro}
              <br />
              {endereco.bairro}, {endereco.cidade} – {endereco.uf}
              <br />
              CEP {endereco.cep}
            </address>
            <LinkSeta href={CONTATO.mapa} externo className="mt-6">
              Ver no mapa
            </LinkSeta>
          </div>
        </div>
      </Secao>

      <SecaoContato origem="escritorio" />
    </>
  );
};
