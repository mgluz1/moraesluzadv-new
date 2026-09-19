import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Logo } from '../ui/Logo';
import { NavItem } from '../ui/NavItem';
import { ExternalLink } from '../ui/ExternalLink';
import { LINKS } from '../../constants/data';

const ID_MENU_MOBILE = 'menu-mobile';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduzirMovimento = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Com o menu aberto, a página atrás não deve rolar, e Esc fecha.
  useEffect(() => {
    if (!isMenuOpen) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (evento: KeyboardEvent) => {
      if (evento.key === 'Escape') setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-petroleum/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Logo className="py-1" logoClassName="w-14 h-14 md:w-16 md:h-16" priority />

          <nav className="hidden md:flex items-center gap-8">
            <NavItem href="#home">Início</NavItem>
            <NavItem href="#sobre">Escritório</NavItem>
            <NavItem href="#atuacao">Atuação</NavItem>
            <NavItem href="#contato">Contato</NavItem>
            <ExternalLink
              href={LINKS.WHATSAPP}
              className="bg-nude hover:bg-nude-dark text-petroleum px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Falar com Advogado
            </ExternalLink>
          </nav>

          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={isMenuOpen}
            aria-controls={ID_MENU_MOBILE}
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id={ID_MENU_MOBILE}
            initial={reduzirMovimento ? false : { opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduzirMovimento ? 0 : -20 }}
            transition={{ duration: reduzirMovimento ? 0 : 0.2 }}
            className="fixed inset-0 z-40 bg-petroleum pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 items-center text-center">
              <NavItem href="#home" onClick={() => setIsMenuOpen(false)}>Início</NavItem>
              <NavItem href="#sobre" onClick={() => setIsMenuOpen(false)}>Escritório</NavItem>
              <NavItem href="#atuacao" onClick={() => setIsMenuOpen(false)}>Atuação</NavItem>
              <NavItem href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</NavItem>
              <ExternalLink
                href={LINKS.WHATSAPP}
                onClick={() => setIsMenuOpen(false)}
                className="w-full bg-nude text-petroleum py-4 rounded-xl font-bold uppercase tracking-widest mt-4 text-center"
              >
                WhatsApp
              </ExternalLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
