import {StrictMode} from 'react';
import {renderToString} from 'react-dom/server';
import App from './App';
import {montarHead} from './lib/seo';
import {ROTAS, ROTA_404, type Rota} from './rotas';

export {ROTAS, ROTA_404};
export {urlAbsoluta} from './lib/seo';

/** Usado por scripts/prerender.mjs para gerar o HTML de cada rota. */
export function renderizar(rota: Rota) {
  return {
    html: renderToString(
      <StrictMode>
        <App rota={rota} />
      </StrictMode>,
    ),
    head: montarHead(rota),
  };
}
