import {Container} from '../ui/base';
import {Marca, NAVEGACAO} from './Header';
import {CONTATO, RESPONSAVEL, SITE, mailto, whatsapp} from '../../config/site';
import {registrarCliqueContato} from '../../lib/analytics';

const {endereco} = CONTATO;

export const Footer = () => (
  <footer className="superficie-escura bg-verde-profundo text-white/75">
    <Container className="grid gap-10 py-14 text-[0.9375rem] md:grid-cols-[1.4fr_1fr_1fr]">
      <div>
        <a href="/" className="inline-block rounded-md">
          <Marca />
          <span className="sr-only">, página inicial</span>
        </a>
        <p className="mt-5 max-w-xs">
          {RESPONSAVEL.nome}
          <br />
          {RESPONSAVEL.oab}
        </p>
      </div>

      <div>
        <h2 className="rotulo font-sans text-dourado">Contato</h2>
        <ul className="mt-4 space-y-2">
          <li>
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => registrarCliqueContato('whatsapp', 'rodape')}
              className="hover:text-white hover:underline underline-offset-4"
            >
              WhatsApp {CONTATO.telefoneExibicao}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </li>
          <li>
            <a
              href={mailto()}
              onClick={() => registrarCliqueContato('email', 'rodape')}
              className="[overflow-wrap:anywhere] hover:text-white hover:underline underline-offset-4"
            >
              {CONTATO.email}
            </a>
          </li>
          <li>
            <a
              href={RESPONSAVEL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => registrarCliqueContato('instagram', 'rodape')}
              className="hover:text-white hover:underline underline-offset-4"
            >
              Instagram {RESPONSAVEL.instagramUsuario}
              <span className="sr-only"> (abre em nova aba)</span>
            </a>
          </li>
        </ul>
        <address className="mt-4 not-italic">
          {endereco.logradouro}
          <br />
          {endereco.bairro}, {endereco.cidade} – {endereco.uf}, {endereco.cep}
        </address>
      </div>

      <nav aria-label="Rodapé">
        <h2 className="rotulo font-sans text-dourado">Páginas</h2>
        <ul className="mt-4 space-y-2">
          {NAVEGACAO.map(({href, rotulo}) => (
            <li key={href}>
              <a href={href} className="hover:text-white hover:underline underline-offset-4">
                {rotulo}
              </a>
            </li>
          ))}
          <li>
            <a href="/privacidade" className="hover:text-white hover:underline underline-offset-4">
              Privacidade
            </a>
          </li>
        </ul>
      </nav>
    </Container>
    <div className="border-t border-white/10">
      <Container className="py-5 text-sm text-white/60">
        © {__ANO_BUILD__} {SITE.nomeCompleto}. Conteúdo de caráter informativo.
      </Container>
    </div>
  </footer>
);
