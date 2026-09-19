export const CustomLogo = ({ className = "w-16 h-16" }: { className?: string }) => (
  <img 
    src="/logoTransparente.webp" 
    alt="Moraes Luz Logo" 
    className={`${className} object-contain`}
  />
);

export const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <CustomLogo className="w-20 h-20 md:w-28 md:h-28" />
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
