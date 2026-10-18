/**
 * Avião dourado decorativo para as seções de aviação, atuação e escritório.
 *
 * Fica num canto da seção, na faixa de respiro acima ou abaixo do conteúdo
 * (nunca sobre texto), e pode ter uma rota tracejada que sai dele. Usa a
 * mesma entrada única da Home (useRevelar, [data-revelar-aviao]) e fica
 * estático com prefers-reduced-motion. A seção que o contém deve ser
 * `relative overflow-hidden`.
 */

type Canto = 'topo-direita' | 'topo-esquerda' | 'base-direita' | 'base-esquerda';

const CANTOS: Record<Canto, string> = {
  'topo-direita': 'top-5 right-4 sm:right-6 lg:top-7',
  'topo-esquerda': 'top-5 left-4 sm:left-6 lg:top-7',
  'base-direita': 'bottom-5 right-4 sm:right-6 lg:bottom-7',
  'base-esquerda': 'bottom-5 left-4 sm:left-6 lg:bottom-7',
};

const TAMANHOS = {
  sm: 'w-12 sm:w-16',
  md: 'w-16 sm:w-24 lg:w-28',
} as const;

const SRCSET = '/aviao-160.webp 160w, /aviao-320.webp 320w';

interface DecorAviacaoProps {
  canto: Canto;
  tamanho?: keyof typeof TAMANHOS;
  /** Rota tracejada à esquerda do avião (só a partir de 640 px). */
  rota?: boolean;
  /** Inclinação do avião em graus, para variar entre seções. */
  inclinacao?: number;
  atraso?: number;
}

export const DecorAviacao = ({canto, tamanho = 'md', rota = false, inclinacao = -8, atraso = 0}: DecorAviacaoProps) => (
  <div
    aria-hidden="true"
    data-revelar-aviao
    className={`pointer-events-none absolute flex items-center ${CANTOS[canto]}`}
  >
    {rota && (
      <svg viewBox="0 0 140 24" fill="none" focusable="false" className="mr-1 hidden h-6 w-36 text-bronze opacity-60 sm:block lg:w-44">
        <path d="M2 20 C 50 20, 90 14, 136 6" stroke="currentColor" strokeWidth="1.25" strokeDasharray="3 7" strokeLinecap="round" />
      </svg>
    )}
    <img
      src="/aviao-320.webp"
      srcSet={SRCSET}
      sizes="(min-width: 1024px) 112px, (min-width: 640px) 96px, 64px"
      alt=""
      width={320}
      height={175}
      loading="lazy"
      decoding="async"
      style={{transform: `rotate(${inclinacao}deg)`, ...(atraso ? {['--atraso-aviao' as string]: `${atraso}ms`} : {})}}
      className={`aviao-voo h-auto drop-shadow-[0_6px_10px_rgb(128_97_46/0.22)] ${TAMANHOS[tamanho]}`}
    />
  </div>
);
