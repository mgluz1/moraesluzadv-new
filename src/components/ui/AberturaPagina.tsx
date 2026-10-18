import type {ReactNode} from 'react';
import {Container, Rotulo} from './base';
import {LinhaRota} from './LinhaRota';

interface AberturaPaginaProps {
  rotulo: string;
  titulo: string;
  /** Nome da página na trilha de navegação (igual ao BreadcrumbList). */
  trilha: string;
  children?: ReactNode;
  comRota?: boolean;
  /** Emblema dourado ao lado do título (desktop) e acima dele (celular). */
  logo?: boolean;
}

/** Abertura das páginas internas: trilha, rótulo, H1 e texto de apoio. */
export const AberturaPagina = ({rotulo, titulo, trilha, children, comRota = false, logo = false}: AberturaPaginaProps) => (
  <div className="superficie-escura relative overflow-hidden bg-verde-profundo text-white">
    {comRota && (
      <LinhaRota className="absolute -right-24 bottom-0 hidden w-[620px] text-dourado/45 lg:block" />
    )}
    <Container className="relative pt-10 pb-16 sm:pt-12 sm:pb-20">
      <nav aria-label="Trilha de navegação">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-white/60">
          <li>
            <a href="/" className="hover:text-white hover:underline underline-offset-4">
              Início
            </a>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-white/85">
            {trilha}
          </li>
        </ol>
      </nav>
      <Rotulo escuro className="mt-10">
        {rotulo}
      </Rotulo>
      <div className={`mt-4 ${logo ? 'grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_auto] lg:gap-16' : ''}`}>
        <div>
          <h1 className="titulo-pagina max-w-3xl">{titulo}</h1>
          {children && <div className="texto-apoio mt-6 max-w-2xl text-white/80">{children}</div>}
        </div>
        {logo && (
          <img
            src="/logo-emblema-320.webp"
            srcSet="/logo-emblema-320.webp 320w, /logo-emblema-480.webp 480w"
            sizes="(min-width: 768px) 176px, 128px"
            alt=""
            width={320}
            height={313}
            decoding="async"
            data-revelar
            className="relative z-10 mx-auto h-auto w-32 drop-shadow-[0_0_22px_rgb(201_169_110/0.22)] sm:w-40 md:mx-0 md:w-44 lg:w-48"
          />
        )}
      </div>
    </Container>
  </div>
);
