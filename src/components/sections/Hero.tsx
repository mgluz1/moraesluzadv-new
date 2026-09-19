import { MessageCircle, Calendar, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { CustomLogo } from '../ui/Logo';
import { ExternalLink } from '../ui/ExternalLink';
import { LINKS } from '../../constants/data';

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-petroleum">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-nude/5 skew-x-12 transform translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-nude/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nude/10 border border-nude/20 text-nude text-xs font-bold uppercase tracking-widest mb-6">
              <Shield size={14} aria-hidden="true" /> Advocacia de Excelência
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1]">
              Soluções Jurídicas <br />
              <span className="text-nude italic font-normal">Estratégicas e Éticas</span>
            </h1>
            <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed">
              Defendemos seus direitos com seriedade, transparência e o compromisso técnico que sua causa exige. Atendimento personalizado para resultados sólidos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <ExternalLink
                href={LINKS.WHATSAPP}
                className="flex items-center justify-center gap-3 bg-nude hover:bg-nude-dark text-petroleum px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 group"
              >
                <MessageCircle className="group-hover:scale-110 transition-transform" aria-hidden="true" />
                Consultar Agora
              </ExternalLink>
              <ExternalLink
                href={LINKS.AGENDA}
                className="flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <Calendar size={20} aria-hidden="true" />
                Agendar Horário
              </ExternalLink>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden md:block"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden border-8 border-white/5 shadow-2xl bg-black/20 h-[600px] flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-nude/10 via-transparent to-transparent" />
              
              <div className="relative z-10 flex flex-col items-center">
                <CustomLogo
                  priority
                  className="w-80 h-80 md:w-96 md:h-96 drop-shadow-[0_0_15px_rgba(197,168,128,0.3)]"
                />
                <h2 className="font-serif text-4xl font-bold tracking-widest text-white uppercase mb-3 text-center -mt-16">
                  Moraes Luz
                </h2>
                <p className="text-sm tracking-[0.3em] text-nude uppercase font-medium text-center">
                  Advocacia &<br />Assessoria Jurídica
                </p>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-petroleum/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
