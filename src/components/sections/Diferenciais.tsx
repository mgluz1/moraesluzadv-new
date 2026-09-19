import { DifferentialItem } from '../ui/DifferentialItem';
import { DIFERENCIAIS } from '../../constants/data';

export const Diferenciais = () => {
  return (
    <section className="py-24 bg-petroleum relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-nude via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
              Por que escolher <br />
              <span className="text-nude">Moraes Luz Advocacia?</span>
            </h2>
            <div className="space-y-8">
              {DIFERENCIAIS.map((item, idx) => (
                <DifferentialItem
                  key={idx}
                  icon={item.icon}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>

          <div className="relative mt-16 lg:mt-0 pb-12 lg:pb-0">
            {/* Staggered Grid Layout for 2 Images */}
            <div className="grid grid-cols-2 gap-4 md:gap-8 items-center">
              {/* Foto 1 - Deslocada para baixo */}
              <div className="relative z-10 transform translate-y-8 md:translate-y-16">
                <div className="rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl aspect-[4/5] relative group">
                  <div className="absolute inset-0 bg-petroleum/30 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src="/foto1.webp"
                    width={800}
                    height={1067}
                    alt="Estrutura do Escritório Moraes Luz"
                    className="w-full h-full object-cover motion-safe:group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>

              {/* Foto 2 - Deslocada para cima */}
              <div className="relative z-20 transform -translate-y-8 md:-translate-y-16">
                <div className="rounded-3xl overflow-hidden border-4 border-nude/40 shadow-2xl aspect-[4/5] relative group">
                  <div className="absolute inset-0 bg-nude/20 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                  <img
                    src="/foto2.webp"
                    width={800}
                    height={1067}
                    alt="Atendimento Moraes Luz"
                    className="w-full h-full object-cover motion-safe:group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            </div>

            {/* Elementos Decorativos de Fundo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] bg-nude/5 rounded-[3rem] -z-10 -rotate-3 border border-nude/10 hidden md:block" />
            <div className="absolute -bottom-10 -right-6 w-32 h-32 bg-nude rounded-3xl -z-20 hidden lg:block motion-safe:animate-pulse opacity-80" />
            <div className="absolute top-0 -left-6 w-24 h-24 border-2 border-nude/30 rounded-full -z-20 hidden md:block" />
          </div>
        </div>
      </div>
    </section>
  );
};
