/**
 * Linha de rota abstrata, puramente decorativa: não representa trajeto,
 * aeronave ou operação real. É desenhada uma vez ao carregar (CSS) e fica
 * estática para quem pediu menos movimento.
 */
export const LinhaRota = ({className = ''}: {className?: string}) => (
  <svg
    viewBox="0 0 600 320"
    fill="none"
    aria-hidden="true"
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    className={`pointer-events-none ${className}`}
  >
    <path
      d="M24 290 C 150 286, 210 170, 320 132 S 520 70, 576 30"
      pathLength={1}
      className="rota-traco"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
    <path d="M24 300 H 576" stroke="currentColor" strokeOpacity="0.25" strokeDasharray="2 8" />
    <circle cx="24" cy="290" r="4" fill="currentColor" className="rota-ponto" />
    <circle cx="576" cy="30" r="4" fill="none" stroke="currentColor" strokeWidth="1.25" className="rota-ponto" />
  </svg>
);
