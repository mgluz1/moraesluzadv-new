import {useEffect} from 'react';
import {ArrowUpRight} from 'lucide-react';
import {Botao, CabecalhoSecao, Container, LinkSeta, Rotulo, Secao} from '../components/ui/base';
import {LogoHero} from '../components/ui/LogoHero';
import {FotoRevelada} from '../components/ui/FotoRevelada';
import {SecaoContato} from '../components/contato/SecaoContato';
import {FRENTES_AVIACAO, PUBLICOS} from '../content/atuacao';
import {destaquesConhecimento} from '../content/conhecimento';
import {RESPONSAVEL} from '../config/site';

/** Âncoras da landing page anterior que agora têm página própria. */
const ANCORAS_ANTIGAS: Record<string, string> = {
  '#sobre': '/escritorio',
  '#atuacao': '/atuacao',
};

const formatarData = (iso: string) =>
  new Intl.DateTimeFormat('pt-BR', {month: 'long', year: 'numeric', timeZone: 'UTC'}).format(new Date(iso));

export const Home = () => {
  useEffect(() => {
    const redirecionar = () => {
      const destino = ANCORAS_ANTIGAS[window.location.hash];
      if (destino) window.location.replace(destino);
    };
    redirecionar();
    window.addEventListener('hashchange', redirecionar);
    return () => window.removeEventListener('hashchange', redirecionar);
  }, []);

  const conhecimento = destaquesConhecimento();

  return (
    <>
      {/* 1. Hero */}
      <section aria-labelledby="hero-titulo" className="superficie-escura relative overflow-hidden bg-verde-profundo text-white">
        <Container className="relative grid items-center gap-12 pt-12 pb-14 sm:pt-16 sm:pb-16 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-20">
          <div className="lg:col-span-7">
            <Rotulo escuro>Direito Aeronáutico e Empresarial</Rotulo>
            <h1 id="hero-titulo" className="titulo-pagina mt-5">
              Direito empresarial para quem faz a aviação acontecer.
            </h1>
            <p className="texto-apoio mt-6 max-w-[38rem] text-white/80">
              Assessoria jurídica para proprietários de aeronaves, operadores e empresas da aviação, com atuação em contratos,
              operações, questões regulatórias e relações de trabalho.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Botao href="#contato">Fale com nossa equipe</Botao>
              <Botao href="/direito-aeronautico" variante="contorno-claro">
                Conheça nossa atuação
              </Botao>
            </div>
          </div>
          <LogoHero className="mx-auto w-full max-w-md lg:col-span-5 lg:max-w-none" />
        </Container>

        <div className="border-t border-white/10">
          <Container className="grid gap-4 py-7 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-10">
            <h2 className="rotulo font-sans text-dourado">Quem atendemos</h2>
            <ul className="grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-4">
              {PUBLICOS.map((publico) => (
                <li key={publico} className="flex gap-3 text-[0.9375rem] leading-snug text-white/85">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-dourado" />
                  {publico}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* 2. Operações aeronáuticas */}
      <Secao rotuloId="operacoes-titulo">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <CabecalhoSecao rotulo="Aviação" titulo="Operações que acompanhamos" id="operacoes-titulo">
            <p>Da aquisição da aeronave às relações de trabalho de quem opera, com atenção aos contratos e às exigências do setor.</p>
          </CabecalhoSecao>
          <LinkSeta href="/direito-aeronautico" className="shrink-0">
            Direito Aeronáutico
          </LinkSeta>
        </div>
        <ol data-revelar className="mt-12 grid gap-px overflow-hidden rounded-cartao border border-divisoria bg-divisoria sm:grid-cols-2">
          {FRENTES_AVIACAO.map((frente, i) => (
            <li key={frente.titulo} className="bg-superficie">
              <a
                href={`/direito-aeronautico#${frente.ancora}`}
                className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-[#fbfaf7] sm:p-8"
              >
                <span className="font-serif text-sm text-bronze" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 text-xl text-verde-profundo sm:text-[1.375rem]">{frente.titulo}</h3>
                <p className="mt-3 text-texto-2">{frente.texto}</p>
              </a>
            </li>
          ))}
        </ol>
      </Secao>

      {/* 3. Escritório e liderança */}
      <Secao tom="branco" rotuloId="lideranca-titulo">
        <div className="grid items-center gap-10 md:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
          <FotoRevelada
            src="/adv.webp"
            srcSet="/adv-480.webp 480w, /adv.webp 800w"
            sizes="(min-width: 768px) 352px, (min-width: 384px) 384px, 100vw"
            alt="Isabela Santos Moraes Luz em retrato profissional"
            width={800}
            height={1201}
            className="mx-auto w-full max-w-sm md:max-w-none"
            imgClassName="object-[50%_42%]"
          />
          <div>
            <Rotulo>Escritório</Rotulo>
            <h2 id="lideranca-titulo" className="titulo-secao mt-3 text-verde-profundo">
              {RESPONSAVEL.tratamento}
            </h2>
            <p className="mt-2 text-sm font-medium text-texto-2">
              {RESPONSAVEL.cargo} · {RESPONSAVEL.oab}
            </p>
            <p className="mt-6 max-w-xl text-texto-2">
              Conduz a atuação do Moraes Luz Advocacia em Direito Aeronáutico, Empresarial e Trabalhista Empresarial, acompanhando
              transações com aeronaves, contratos do setor, questões regulatórias e relações de trabalho de empresas ligadas à
              aviação.
            </p>
            <LinkSeta href="/escritorio" className="mt-8">
              Conheça o escritório
            </LinkSeta>
          </div>
        </div>
      </Secao>

      {/* 4. Suporte empresarial */}
      <Secao rotuloId="suporte-titulo">
        <CabecalhoSecao rotulo="Atuação" titulo="Suporte empresarial e trabalhista" id="suporte-titulo">
          <p>Para empresas da aviação e para quem se relaciona com elas: contratos, estrutura e pessoas.</p>
        </CabecalhoSecao>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            {
              href: '/atuacao#empresarial',
              titulo: 'Empresarial',
              texto:
                'Contratos empresariais, estruturação negocial, consultoria preventiva e contencioso, com conhecimento das relações comerciais próprias do setor aeronáutico.',
            },
            {
              href: '/atuacao#trabalhista',
              titulo: 'Trabalhista Empresarial',
              texto:
                'Prevenção, orientação e defesa de empregadores, incluindo empresas que mantêm tripulantes, mecânicos e equipes de solo.',
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              data-revelar
              className="group flex flex-col rounded-cartao border border-divisoria bg-superficie p-6 transition-[transform,box-shadow,border-color] duration-300 ease-saida hover:border-verde/25 hover:shadow-[0_8px_24px_-12px_rgb(16_47_45/0.18)] motion-safe:hover:-translate-y-0.5 sm:p-8"
            >
              <h3 className="text-2xl text-verde-profundo">{item.titulo}</h3>
              <p className="mt-3 flex-1 text-texto-2">{item.texto}</p>
              <span className="mt-6 inline-flex items-center gap-2 font-semibold text-verde">
                Ver atuação
                <span aria-hidden="true" className="transition-transform duration-300 ease-saida motion-safe:group-hover:translate-x-0.5">
                  →
                </span>
              </span>
            </a>
          ))}
        </div>
      </Secao>

      {/* 5. Conhecimento do setor: só aparece com material real e aprovado. */}
      {conhecimento.length > 0 && (
        <Secao tom="branco" rotuloId="conhecimento-titulo">
          <CabecalhoSecao rotulo="Conhecimento do setor" titulo="Publicações e participações" id="conhecimento-titulo" />
          <ul className="mt-10 grid gap-5 md:grid-cols-2">
            {conhecimento.map((item) => (
              <li key={item.url} data-revelar>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col rounded-cartao border border-divisoria p-6 transition-colors duration-300 hover:border-verde/30 sm:p-8"
                >
                  <span className="rotulo text-bronze">
                    {item.tipo} · {formatarData(item.data)}
                  </span>
                  <h3 className="mt-3 text-xl text-verde-profundo">{item.titulo}</h3>
                  <p className="mt-3 flex-1 text-texto-2">{item.resumo}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-verde">
                    {item.veiculo}
                    <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only">(abre em nova aba)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Secao>
      )}

      {/* 6. Contato */}
      <SecaoContato origem="home" />
    </>
  );
};
