import { MessageCircle, Mail, MapPin, ChevronRight, Instagram } from 'lucide-react';
import { motion } from 'motion/react';
import { LINKS } from '../../constants/data';

export const Contato = () => {
  return (
    <>
      <section id="contato" className="py-24 bg-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-petroleum mb-12">Canais de Atendimento</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={LINKS.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-slate-900 rounded-2xl group transition-all"
            >
              <div className="w-16 h-16 rounded-full border-2 border-nude flex items-center justify-center text-nude group-hover:bg-nude group-hover:text-slate-900 transition-all">
                <MessageCircle size={32} aria-hidden="true" />
              </div>
              <span className="font-bold text-white uppercase tracking-widest">Mensagem</span>
              <span className="text-white/40 text-xs">WhatsApp</span>
            </motion.a>

            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={LINKS.EMAIL}
              className="flex flex-col items-center gap-4 p-8 bg-slate-900 rounded-2xl group transition-all"
            >
              <div className="w-16 h-16 rounded-full border-2 border-nude flex items-center justify-center text-nude group-hover:bg-nude group-hover:text-slate-900 transition-all">
                <Mail size={32} aria-hidden="true" />
              </div>
              <span className="font-bold text-white uppercase tracking-widest">E-mail</span>
              <span className="text-white/40 text-xs">moraesluzadvocacia@gmail.com</span>
            </motion.a>

            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={LINKS.MAPS}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-slate-900 rounded-2xl group transition-all"
            >
              <div className="w-16 h-16 rounded-full border-2 border-nude flex items-center justify-center text-nude group-hover:bg-nude group-hover:text-slate-900 transition-all">
                <MapPin size={32} aria-hidden="true" />
              </div>
              <span className="font-bold text-white uppercase tracking-widest">Localização</span>
              <span className="text-white/40 text-xs">Ver no Mapa</span>
            </motion.a>

            <motion.a 
              whileHover={{ scale: 1.05 }}
              href={LINKS.INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-4 p-8 bg-slate-900 rounded-2xl group transition-all"
            >
              <div className="w-16 h-16 rounded-full border-2 border-nude flex items-center justify-center text-nude group-hover:bg-nude group-hover:text-slate-900 transition-all">
                <Instagram size={32} aria-hidden="true" />
              </div>
              <span className="font-bold text-white uppercase tracking-widest">Instagram</span>
              <span className="text-white/40 text-xs">@isabelamoraesluz</span>
            </motion.a>
          </div>
        </div>
      </section>

      <section className="py-20 bg-nude">
        <div className="container mx-auto px-6 text-center">
          <div className="flex justify-center mb-8">
            <img
              src="/blacklogo.webp"
              alt="Moraes Luz Advocacia"
              width={600}
              height={424}
              className="h-32 md:h-48 lg:h-56 w-auto object-contain drop-shadow-lg block"
              loading="lazy"
              decoding="async"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-petroleum mb-8 text-center">
            Pronto para defender seus direitos?
          </h2>
          <p className="text-petroleum/80 text-lg mb-10 max-w-2xl mx-auto">
            Entre em contato hoje mesmo e agende uma consulta com nossos especialistas. Estamos prontos para oferecer a melhor estratégia para o seu caso.
          </p>
          <a 
            href={LINKS.WHATSAPP}
            className="inline-flex items-center gap-3 bg-petroleum text-white px-10 py-5 rounded-full font-bold text-xl hover:bg-slate-900 transition-all shadow-xl hover:shadow-2xl"
          >
            Falar com um Advogado <ChevronRight aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
};
