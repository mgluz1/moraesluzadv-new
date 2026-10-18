import {useId} from 'react';

/**
 * Aviões dourados decorativos da seção de aviação da Home. Ficam nas margens
 * e nos espaços vazios, atrás do conteúdo, e não representam aeronaves ou
 * operações reais.
 *
 * Entrada única ao entrar na tela (useRevelar, [data-revelar-aviao]): a rota
 * tracejada se desenha e cada avião chega deslizando na direção do voo. Com
 * prefers-reduced-motion ou sem JavaScript, tudo aparece pronto.
 */

const SRCSET = '/aviao-160.webp 160w, /aviao-320.webp 320w';

const Aviao = ({className = '', sizes, atraso = 0}: {className?: string; sizes: string; atraso?: number}) => (
  <img
    src="/aviao-320.webp"
    srcSet={SRCSET}
    sizes={sizes}
    alt=""
    width={320}
    height={175}
    loading="lazy"
    decoding="async"
    style={atraso ? {['--atraso-aviao' as string]: `${atraso}ms`} : undefined}
    className={`aviao-voo h-auto drop-shadow-[0_6px_10px_rgb(128_97_46/0.22)] ${className}`}
  />
);

/** Rota tracejada que se desenha (máscara animada sobre o tracejado). */
const Rota = ({d, viewBox, className = ''}: {d: string; viewBox: string; className?: string}) => {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox={viewBox} fill="none" aria-hidden="true" focusable="false" className={`text-bronze ${className}`}>
      <mask id={`rota-${id}`} maskUnits="userSpaceOnUse">
        <path d={d} pathLength={1} stroke="white" strokeWidth="6" className="rota-voo" />
      </mask>
      <path d={d} stroke="currentColor" strokeOpacity="0.4" strokeWidth="1.25" strokeDasharray="3 7" strokeLinecap="round" mask={`url(#rota-${id})`} />
    </svg>
  );
};

export const AvioesDecorativos = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    {/* 1. Principal: canto superior direito, sobre o link para Direito Aeronáutico. */}
    <div
      data-revelar-aviao
      className="absolute top-3 right-4 h-[9rem] w-16 sm:right-6 lg:top-6 lg:right-[max(2rem,calc(50%-580px+2rem))] lg:w-[min(30rem,30vw)]"
    >
      <Rota
        viewBox="0 0 480 144"
        d="M8 136 C 120 132, 220 110, 300 80 S 390 40, 402 36"
        className="absolute inset-0 hidden h-full w-full lg:block"
      />
      <Aviao className="absolute top-0 right-0 w-16 -rotate-[10deg] lg:w-32" sizes="(min-width: 1024px) 128px, 64px" atraso={500} />
    </div>

    {/* 2. Margem esquerda, só em telas largas (fora da área de leitura). */}
    <div data-revelar-aviao className="absolute top-[56%] left-[calc(50%-580px-6.5rem)] hidden w-24 min-[1400px]:block">
      <Rota viewBox="0 0 96 60" d="M4 56 C 30 52, 50 40, 70 24" className="absolute -bottom-6 -left-8 h-14 w-24" />
      <Aviao className="relative w-14 -rotate-[22deg] opacity-80" sizes="56px" atraso={250} />
    </div>

    {/* 3. Abaixo da grade, à direita, com rastro curto. */}
    <div
      data-revelar-aviao
      className="absolute right-6 bottom-3 flex items-center sm:bottom-5 lg:right-[max(2rem,calc(50%-580px+1rem))] lg:bottom-7"
    >
      <Rota viewBox="0 0 140 24" d="M2 20 C 50 20, 90 14, 136 6" className="mr-1 hidden h-6 w-36 translate-y-2 sm:block" />
      <Aviao className="w-12 -rotate-[6deg] sm:w-16" sizes="64px" atraso={350} />
    </div>
  </div>
);
