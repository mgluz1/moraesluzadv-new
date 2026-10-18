import type {ComponentPropsWithoutRef, ReactNode} from 'react';
import {ArrowRight, ArrowUpRight} from 'lucide-react';

export const Container = ({children, className = ''}: {children: ReactNode; className?: string}) => (
  <div className={`mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

type Tom = 'papel' | 'branco' | 'verde' | 'profundo';

const FUNDOS: Record<Tom, string> = {
  papel: 'bg-papel text-texto',
  branco: 'bg-superficie text-texto',
  verde: 'superficie-escura bg-verde text-white',
  profundo: 'superficie-escura bg-verde-profundo text-white',
};

interface SecaoProps {
  children: ReactNode;
  tom?: Tom;
  id?: string;
  rotuloId?: string;
  className?: string;
}

/** Seção com espaçamento vertical padrão e fundo de uma das superfícies da marca. */
export const Secao = ({children, tom = 'papel', id, rotuloId, className = ''}: SecaoProps) => (
  <section id={id} aria-labelledby={rotuloId} className={`${FUNDOS[tom]} py-16 sm:py-20 lg:py-24 ${className}`}>
    <Container>{children}</Container>
  </section>
);

export const Rotulo = ({children, escuro = false, className = ''}: {children: ReactNode; escuro?: boolean; className?: string}) => (
  <p className={`rotulo ${escuro ? 'text-dourado' : 'text-bronze'} ${className}`}>{children}</p>
);

interface CabecalhoSecaoProps {
  rotulo: string;
  titulo: string;
  id: string;
  escuro?: boolean;
  children?: ReactNode;
}

export const CabecalhoSecao = ({rotulo, titulo, id, escuro = false, children}: CabecalhoSecaoProps) => (
  <div className="max-w-2xl">
    <Rotulo escuro={escuro}>{rotulo}</Rotulo>
    <h2 id={id} className={`titulo-secao mt-3 ${escuro ? 'text-white' : 'text-verde-profundo'}`}>
      {titulo}
    </h2>
    {children && <div className={`mt-4 ${escuro ? 'text-white/80' : 'text-texto-2'}`}>{children}</div>}
  </div>
);

type Variante = 'dourado' | 'verde' | 'contorno-claro' | 'contorno-escuro';

const VARIANTES: Record<Variante, string> = {
  // Texto verde profundo sobre dourado: contraste 6,4:1.
  dourado: 'bg-dourado text-verde-profundo hover:bg-dourado-claro',
  verde: 'bg-verde text-white hover:bg-verde-profundo',
  'contorno-claro': 'border border-white/35 text-white hover:border-white/70 hover:bg-white/5',
  'contorno-escuro': 'border border-verde/30 text-verde-profundo hover:border-verde hover:bg-verde/5',
};

type BotaoProps = ComponentPropsWithoutRef<'a'> & {
  href: string;
  variante?: Variante;
  externo?: boolean;
  icone?: ReactNode;
};

/** Link com aparência de botão. Elevação máxima de 2px no hover. */
export const Botao = ({variante = 'dourado', externo = false, icone, className = '', children, ...props}: BotaoProps) => (
  <a
    {...(externo ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
    {...props}
    className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-lg px-6 py-3 text-[0.9375rem] font-semibold transition-[background-color,border-color,transform,box-shadow] duration-300 ease-saida motion-safe:hover:-translate-y-0.5 ${VARIANTES[variante]} ${className}`}
  >
    {icone}
    {children}
  </a>
);

type LinkSetaProps = ComponentPropsWithoutRef<'a'> & {href: string; escuro?: boolean; externo?: boolean};

export const LinkSeta = ({escuro = false, externo = false, className = '', children, ...props}: LinkSetaProps) => {
  const Icone = externo ? ArrowUpRight : ArrowRight;
  return (
    <a
      {...(externo ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
      {...props}
      className={`group inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline ${
        escuro ? 'text-dourado' : 'text-verde'
      } ${className}`}
    >
      {children}
      <Icone size={18} aria-hidden="true" className="transition-transform duration-300 ease-saida motion-safe:group-hover:translate-x-0.5" />
      {externo && <span className="sr-only">(abre em nova aba)</span>}
    </a>
  );
};
