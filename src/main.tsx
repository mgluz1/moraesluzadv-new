import {StrictMode} from 'react';
import {createRoot, hydrateRoot} from 'react-dom/client';
import App from './App';
import {encontrarRota} from './rotas';
import './index.css';

const raiz = document.getElementById('root')!;
const app = (
  <StrictMode>
    <App rota={encontrarRota(window.location.pathname)} />
  </StrictMode>
);

// Em produção o HTML já vem pré-renderizado e só é hidratado.
if (raiz.firstElementChild) hydrateRoot(raiz, app);
else createRoot(raiz).render(app);
