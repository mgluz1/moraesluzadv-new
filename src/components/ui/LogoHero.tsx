/**
 * Cartão do logo no hero da Home.
 *
 * Animação de entrada, uma única vez (CSS, sem JavaScript): o anel externo
 * se desenha, o emblema se revela do centro, o nome e o descritor entram em
 * sequência e um reflexo cruza o cartão. Com prefers-reduced-motion tudo
 * aparece estático; sem JavaScript também, porque nada depende de script.
 */
/** Também usados no preload da Home (src/lib/seo.ts). */
export const EMBLEMA_SRCSET = '/logo-emblema-320.webp 320w, /logo-emblema-480.webp 480w, /logo-emblema-640.webp 630w';
export const EMBLEMA_SIZES = '(min-width: 1024px) 288px, (min-width: 640px) 272px, 248px';

export const LogoHero = ({className = ''}: {className?: string}) => (
  <div
    role="img"
    aria-label="Moraes Luz Advocacia & Assessoria Jurídica"
    className={`logo-hero relative isolate overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(160deg,#1f433f_0%,#183a36_55%,#14322f_100%)] px-6 pt-12 pb-11 shadow-[0_30px_60px_-30px_rgb(0_0_0/0.6)] sm:px-10 sm:pt-16 sm:pb-14 ${className}`}
  >
    {/* Plano de luz diagonal, como no material da marca. */}
    <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-[38%] origin-top-right skew-x-[-9deg] translate-x-[18%] bg-white/[0.035]" />
    {/* Reflexo que atravessa o cartão uma vez. */}
    <div aria-hidden="true" className="logo-hero-reflexo absolute inset-0 -z-10" />

    <div className="relative mx-auto aspect-square w-[min(64vw,15.5rem)] sm:w-[17rem] lg:w-[min(19vw,18rem)]">
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

    <p className="logo-hero-nome mt-10 text-center font-serif text-[clamp(1.875rem,1.2rem+2.6vw,2.75rem)] leading-none font-semibold tracking-[0.06em] text-white uppercase sm:mt-12">
      Moraes Luz
    </p>
    <p className="logo-hero-descritor mt-4 text-center text-[0.8125rem] leading-relaxed font-semibold tracking-[0.28em] text-dourado uppercase sm:text-sm">
      Advocacia &amp;
      <br />
      Assessoria Jurídica
    </p>
  </div>
);
