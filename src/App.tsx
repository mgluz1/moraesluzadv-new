import {useEffect} from 'react';
import {Header} from './components/layout/Header';
import {Footer} from './components/layout/Footer';
import {useRevelar} from './hooks/useRevelar';
import type {Rota} from './rotas';

export default function App({rota}: {rota: Rota}) {
  const {Pagina} = rota;
  useRevelar();

  // No desenvolvimento não há pré-renderização; o título vem daqui.
  useEffect(() => {
    if (import.meta.env.DEV) document.title = rota.titulo;
  }, [rota]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-[60] rounded-lg bg-dourado px-4 py-3 font-semibold text-verde-profundo focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Pular para o conteúdo
      </a>
      <Header caminho={rota.caminho} />
      <main id="conteudo" tabIndex={-1} className="outline-none">
        <Pagina />
      </main>
      <Footer />
    </>
  );
}
