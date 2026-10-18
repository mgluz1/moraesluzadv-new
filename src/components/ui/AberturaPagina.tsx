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
}

/** Abertura das páginas internas: trilha, rótulo, H1 e texto de apoio. */
export const AberturaPagina = ({rotulo, titulo, trilha, children, comRota = false}: AberturaPaginaProps) => (
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
      <h1 className="titulo-pagina mt-4 max-w-3xl">{titulo}</h1>
      {children && <div className="texto-apoio mt-6 max-w-2xl text-white/80">{children}</div>}
    </Container>
  </div>
);
