/** Dimensões reais de public/logoTransparente.webp (quadrado). */
const LOGO_INTRINSECO = 512;

interface CustomLogoProps {
  className?: string;
  /** Acima da dobra: carrega com prioridade alta em vez de lazy. */
  priority?: boolean;
}

export const CustomLogo = ({ className = "w-16 h-16", priority = false }: CustomLogoProps) => (
  <img
    src="/logoTransparente.webp"
    alt="Moraes Luz Logo"
    width={LOGO_INTRINSECO}
    height={LOGO_INTRINSECO}
    fetchPriority={priority ? 'high' : 'auto'}
    loading={priority ? 'eager' : 'lazy'}
    decoding="async"
    className={`${className} object-contain`}
  />
);

interface LogoProps {
  className?: string;
  /** Classes de tamanho do símbolo — o header usa menor que o rodapé. */
  logoClassName?: string;
  priority?: boolean;
}

export const Logo = ({
  className = "",
  logoClassName = "w-20 h-20 md:w-28 md:h-28",
  priority = false,
}: LogoProps) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <CustomLogo className={logoClassName} priority={priority} />
    <div className="flex flex-col">
      <span className="font-serif text-xl md:text-2xl font-bold tracking-wider leading-tight text-white uppercase">
        Moraes Luz
      </span>
      <span className="text-[10px] md:text-xs tracking-[0.2em] text-nude uppercase font-medium">
        Advocacia & Assessoria
      </span>
    </div>
  </div>
);
