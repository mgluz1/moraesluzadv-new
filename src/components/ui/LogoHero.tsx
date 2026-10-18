/**
 * Cartão horizontal do logo no hero da Home: emblema à esquerda, nome e
 * descritor à direita (empilhados abaixo de 360px).
 *
 * Animação de entrada, uma única vez (CSS, sem JavaScript): o anel externo
 * se desenha, o emblema se revela do centro, o nome e o descritor entram em
 * sequência e um reflexo cruza o cartão. Com prefers-reduced-motion tudo
 * aparece estático; sem JavaScript também, porque nada depende de script.
 */
/** Também usados no preload da Home (src/lib/seo.ts). */
export const EMBLEMA_SRCSET = '/logo-emblema-320.webp 320w, /logo-emblema-480.webp 480w, /logo-emblema-640.webp 630w';
export const EMBLEMA_SIZES = '(min-width: 640px) 136px, 88px';

export const LogoHero = ({className = ''}: {className?: string}) => (
  <div
    role="img"
    aria-label="Moraes Luz Advocacia & Assessoria Jurídica"
    className={`logo-hero relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#1f433f_0%,#183a36_55%,#14322f_100%)] flex flex-col items-center justify-center gap-7 px-6 py-10 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] min-[360px]:flex-row min-[360px]:gap-4 sm:gap-7 sm:px-10 sm:py-12 lg:px-8 lg:min-h-[17rem] ${className}`}
  >
    {/* Plano de luz diagonal, como no material da marca. */}
    <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-[38%] origin-top-right skew-x-[-9deg] translate-x-[18%] bg-white/[0.035]" />
    {/* Reflexo que atravessa o cartão uma vez. */}
    <div aria-hidden="true" className="logo-hero-reflexo absolute inset-0 -z-10" />

    <div className="relative m-2.5 aspect-square w-[5.5rem] shrink-0 min-[360px]:w-[4.75rem] min-[420px]:w-[5.5rem] sm:m-4 sm:w-[8.5rem] lg:w-[7.5rem] xl:w-[8.5rem]">
      <div aria-hidden="true" className="logo-hero-brilho absolute inset-[-18%] -z-10 rounded-full bg-[radial-gradient(circle,rgb(201_169_110/0.22)_0%,rgb(201_169_110/0.08)_40%,transparent_68%)]" />
      <svg viewBox="0 0 100 100" aria-hidden="true" focusable="false" className="absolute inset-[-9%] h-[118%] w-[118%] text-dourado">
        <circle
          cx="50"
          cy="50"
          r="48.5"
          pathLength={1}
          transform="rotate(-90 50 50)"
          className="logo-hero-anel"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.4"
          strokeWidth="0.35"
        />
        <circle cx="50" cy="1.5" r="1" fill="currentColor" className="logo-hero-ponto" />
      </svg>
      <img
        src="/logo-emblema-640.webp"
        srcSet={EMBLEMA_SRCSET}
        sizes={EMBLEMA_SIZES}
        alt=""
        width={630}
        height={616}
        fetchPriority="high"
        decoding="async"
        className="logo-hero-emblema absolute inset-0 m-auto h-auto w-full drop-shadow-[0_0_18px_rgb(201_169_110/0.28)]"
      />
    </div>

    <div className="text-center min-[360px]:border-l min-[360px]:border-dourado/30 min-[360px]:pl-4 min-[360px]:text-left sm:pl-7">
      <p className="logo-hero-nome font-serif text-[1.625rem] leading-none font-semibold tracking-[0.06em] whitespace-nowrap text-white uppercase min-[360px]:text-[1.25rem] min-[420px]:text-[1.5rem] sm:text-[2.125rem] lg:text-[1.625rem] xl:text-[1.875rem]">
        Moraes Luz
      </p>
      <p className="logo-hero-descritor mt-3 text-[0.6875rem] leading-relaxed font-semibold tracking-[0.22em] text-dourado uppercase sm:mt-4 sm:text-[0.8125rem]">
        Advocacia &amp;
        <br />
        Assessoria Jurídica
      </p>
    </div>
  </div>
);
