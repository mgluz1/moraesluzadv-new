import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Logo } from '../ui/Logo';
import { NavItem } from '../ui/NavItem';
import { LINKS } from '../../constants/data';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-petroleum/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <Logo className="py-1" priority />
          
          <nav className="hidden md:flex items-center gap-8">
            <NavItem href="#home">Início</NavItem>
            <NavItem href="#sobre">Escritório</NavItem>
            <NavItem href="#atuacao">Atuação</NavItem>
            <NavItem href="#contato">Contato</NavItem>
            <a 
              href={LINKS.WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nude hover:bg-nude-dark text-petroleum px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Falar com Advogado
            </a>
          </nav>

          <button 
            className="md:hidden text-white p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menu de navegação"
          >
            {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-petroleum pt-24 px-6 md:hidden"
          >
            <nav className="flex flex-col gap-6 items-center text-center">
              <NavItem href="#home" onClick={() => setIsMenuOpen(false)}>Início</NavItem>
              <NavItem href="#sobre" onClick={() => setIsMenuOpen(false)}>Escritório</NavItem>
              <NavItem href="#atuacao" onClick={() => setIsMenuOpen(false)}>Atuação</NavItem>
              <NavItem href="#contato" onClick={() => setIsMenuOpen(false)}>Contato</NavItem>
              <a 
                href={LINKS.WHATSAPP}
                className="w-full bg-nude text-petroleum py-4 rounded-xl font-bold uppercase tracking-widest mt-4"
              >
                WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
