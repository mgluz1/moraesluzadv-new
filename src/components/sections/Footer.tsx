import { Instagram, MessageCircle } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { ExternalLink } from '../ui/ExternalLink';
import { LINKS } from '../../constants/data';

export const Footer = () => {
  return (
    <footer className="bg-petroleum text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Logo className="mb-6" />
            <p className="text-white/60 max-w-sm leading-relaxed">
              Escritório especializado em oferecer soluções jurídicas estratégicas com foco na ética, transparência e resultados sólidos para nossos clientes.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6 text-nude">Links Rápidos</h4>
            <ul className="space-y-4 text-white/60">
              <li><a href="#home" className="hover:text-nude transition-colors">Início</a></li>
              <li><a href="#sobre" className="hover:text-nude transition-colors">Sobre Nós</a></li>
              <li><a href="#atuacao" className="hover:text-nude transition-colors">Áreas de Atuação</a></li>
              <li><a href="#contato" className="hover:text-nude transition-colors">Contato</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-nude">Redes Sociais</h4>
            <div className="flex gap-4">
              <ExternalLink href={LINKS.INSTAGRAM} aria-label="Acessar Instagram" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-nude hover:text-petroleum hover:border-nude transition-all">
                <Instagram size={20} aria-hidden="true" />
              </ExternalLink>
              <ExternalLink href={LINKS.WHATSAPP} aria-label="Acessar WhatsApp" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-nude hover:text-petroleum hover:border-nude transition-all">
                <MessageCircle size={20} aria-hidden="true" />
              </ExternalLink>
            </div>
            <div className="mt-8">
              <h4 className="font-bold text-sm mb-2 text-nude uppercase tracking-widest">Endereço</h4>
              <p className="text-white/60 text-sm">Esquina com Rua J60, Av. Sucuri<br />St. Jao, Goiânia - GO, 74674-260</p>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center text-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Moraes Luz Advocacia & Assessoria Jurídica. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};
