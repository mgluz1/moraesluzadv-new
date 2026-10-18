import {useEffect, useRef, useState} from 'react';
import {Menu, MessageCircle, X} from 'lucide-react';
import {Container} from '../ui/base';
import {whatsapp} from '../../config/site';
import {registrarCliqueContato} from '../../lib/analytics';

export const NAVEGACAO = [
  {href: '/direito-aeronautico', rotulo: 'Aviação'},
  {href: '/atuacao', rotulo: 'Atuação'},
  {href: '/escritorio', rotulo: 'Escritório'},
  {href: '/#contato', rotulo: 'Contato'},
] as const;

const ID_MENU = 'menu-movel';

export const Marca = ({className = ''}: {className?: string}) => (
  <span className={`flex items-center gap-3 ${className}`}>
    <img src="/logo-marca.webp" alt="" width={112} height={112} className="h-11 w-11 shrink-0 sm:h-12 sm:w-12" />
    <span className="flex flex-col leading-none">
      <span className="font-serif text-base font-medium tracking-[0.08em] whitespace-nowrap text-white uppercase min-[360px]:text-lg sm:text-xl">Moraes Luz</span>{' '}
      <span className="mt-1 text-[0.6875rem] font-medium tracking-[0.14em] text-dourado uppercase">Advocacia</span>
    </span>
  </span>
);

export const Header = ({caminho}: {caminho: string}) => {
  const [aberto, setAberto] = useState(false);
  const botaoRef = useRef<HTMLButtonElement>(null);
  const painelRef = useRef<HTMLDivElement>(null);

  // Menu aberto: trava a rolagem, foca o primeiro link, Esc fecha e o Tab
  // circula entre o botão e os links do painel.
  useEffect(() => {
    if (!aberto) return;
    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    painelRef.current?.querySelector<HTMLElement>('a')?.focus();

    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setAberto(false);
        botaoRef.current?.focus();
        return;
      }
      if (e.key !== 'Tab' || !painelRef.current || !botaoRef.current) return;
      const focaveis = [botaoRef.current, ...painelRef.current.querySelectorAll<HTMLElement>('a')];
      const indice = focaveis.indexOf(document.activeElement as HTMLElement);
      const proximo = e.shiftKey ? indice - 1 : indice + 1;
      if (proximo < 0 || proximo >= focaveis.length) {
        e.preventDefault();
        focaveis[e.shiftKey ? focaveis.length - 1 : 0].focus();
      }
    };
    const aoRedimensionar = () => {
      if (window.matchMedia('(min-width: 768px)').matches) setAberto(false);
    };

    document.addEventListener('keydown', aoTeclar);
    window.addEventListener('resize', aoRedimensionar);
    return () => {
      document.body.style.overflow = overflowAnterior;
      document.removeEventListener('keydown', aoTeclar);
      window.removeEventListener('resize', aoRedimensionar);
    };
  }, [aberto]);

  const atual = (href: string) => (href === caminho ? ('page' as const) : undefined);

  return (
    <header className="superficie-escura sticky top-0 z-50 border-b border-white/10 bg-verde-profundo">
      <Container className="flex h-[4.5rem] items-center justify-between gap-4">
        <a href="/" className="rounded-md">
          <Marca />
          <span className="sr-only">, página inicial</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {NAVEGACAO.map(({href, rotulo}) => (
              <li key={href}>
                <a
                  href={href}
                  aria-current={atual(href)}
                  className={
                    href === '/#contato'
                      ? 'ml-3 inline-flex min-h-10 items-center rounded-lg border border-dourado/60 px-4 text-sm font-medium text-white transition-colors duration-300 hover:border-dourado hover:bg-dourado hover:text-verde-profundo'
                      : 'relative inline-flex min-h-10 items-center px-3 text-sm font-medium text-white/80 transition-colors duration-300 hover:text-white aria-[current=page]:text-white after:absolute after:inset-x-3 after:bottom-1.5 after:h-px after:origin-left after:scale-x-0 after:bg-dourado after:transition-transform after:duration-300 hover:after:scale-x-100 aria-[current=page]:after:scale-x-100'
                  }
                >
                  {rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1 md:hidden">
          <a
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => registrarCliqueContato('whatsapp', 'cabecalho')}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-dourado"
          >
            <MessageCircle size={22} aria-hidden="true" />
            <span className="sr-only">Conversar pelo WhatsApp (abre em nova aba)</span>
          </a>
          <button
            ref={botaoRef}
            type="button"
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-controls={ID_MENU}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg text-white"
          >
            {aberto ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            <span className="sr-only">{aberto ? 'Fechar menu' : 'Abrir menu'}</span>
          </button>
        </div>
      </Container>

      <div
        id={ID_MENU}
        ref={painelRef}
        hidden={!aberto}
        className="fixed inset-x-0 top-[4.5rem] bottom-0 overflow-y-auto border-t border-white/10 bg-verde-profundo md:hidden"
      >
        <nav aria-label="Principal (celular)">
          <Container>
            <ul className="flex flex-col py-4">
              {NAVEGACAO.map(({href, rotulo}) => (
                <li key={href} className="border-b border-white/10">
                  <a
                    href={href}
                    aria-current={atual(href)}
                    onClick={() => setAberto(false)}
                    className="flex min-h-14 items-center font-serif text-2xl text-white aria-[current=page]:text-dourado"
                  >
                    {rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      </div>
    </header>
  );
};
