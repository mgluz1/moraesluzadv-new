import { CheckCircle2 } from 'lucide-react';
import { VALORES } from '../../constants/data';

export const About = () => {
  return (
    <section id="sobre" className="py-24 bg-[#f5f4f0] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-24">
          
          {/* Seção de Imagem (Esquerda) */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative z-10">
              <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-[4/5] md:aspect-[3/4] lg:aspect-[4/5] border-[8px] border-white group">
                <img 
                  src="/adv.webp" 
                  alt="Dra. responsável - Moraes Luz Advocacia" 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Gradiente Elegante e Legenda */}
                <div className="absolute inset-0 bg-gradient-to-t from-petroleum/90 via-petroleum/20 to-transparent opacity-90 transition-opacity duration-300" />
                <div className="absolute bottom-6 left-6 right-6 md:bottom-8 md:left-8 md:right-8 text-white">
                  <div className="w-12 h-1 bg-nude mb-4" />
                  <h3 className="font-serif text-2xl md:text-3xl font-bold mb-2">Especialista em Resultados</h3>
                  <p className="text-nude/90 text-xs md:text-sm uppercase tracking-[0.2em] font-medium">Liderança e Excelência Técnica</p>
                </div>
              </div>
            </div>
            
            {/* Elementos Decorativos Geométricos */}
            <div className="absolute -bottom-8 -left-8 md:-bottom-10 md:-left-10 w-40 h-40 bg-nude rounded-3xl -z-10" />
            <div className="absolute -top-8 -right-8 md:-top-12 md:-right-12 w-48 h-48 border-[3px] border-petroleum/10 rounded-full -z-10" />
            <div className="absolute top-1/2 -right-16 w-32 h-32 bg-nude/10 rounded-[2rem] -z-10 rotate-12" />
          </div>

          {/* Seção de Texto (Direita) */}
          <div className="order-1 lg:order-2">
            <span className="text-nude font-bold uppercase tracking-[0.3em] text-xs mb-4 block">Sobre o Escritório</span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-petroleum mb-6 leading-[1.1]">
              Nossa História
            </h2>
            <div className="w-20 h-1 bg-nude mb-8" />
            
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl">
              Localizado estrategicamente em Goiânia - GO, nosso escritório de advocacia é um centro de excelência que abrange diversas áreas do Direito, primordialmente orientado pela construção de relacionamentos sólidos e transparentes com nossos clientes.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mt-6 max-w-xl">
              Nossa atuação não se limita a apagar incêndios jurídicos, mas ativamente construir a blindagem e segurança das partes, garantindo que cada caso seja tratado de forma única, inovadora e estratégica para que seus interesses prevaleçam sempre.
            </p>
          </div>
        </div>

        {/* Nossa Essência */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-petroleum text-center mb-12">Nossa Essência</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {VALORES.map((valor, idx) => (
              <div key={idx} className="bg-white px-6 py-4 rounded-full shadow-sm hover:shadow-lg transition-all duration-300 border border-nude/20 text-petroleum font-bold uppercase tracking-wider text-sm flex items-center gap-3 hover:-translate-y-1">
                <CheckCircle2 className="text-nude w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {valor}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
