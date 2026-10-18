import {Botao, Container, LinkSeta, Rotulo} from '../components/ui/base';
import {NAVEGACAO} from '../components/layout/Header';

export const NaoEncontrada = () => (
  <div className="superficie-escura bg-verde-profundo text-white">
    <Container className="py-20 sm:py-28">
      <Rotulo escuro>Erro 404</Rotulo>
      <h1 className="titulo-pagina mt-4 max-w-2xl">Página não encontrada</h1>
      <p className="texto-apoio mt-6 max-w-xl text-white/80">
        O endereço pode ter mudado ou não existir. Use um dos caminhos abaixo para continuar.
      </p>
      <div className="mt-9">
        <Botao href="/">Ir para a página inicial</Botao>
      </div>
      <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-4 border-t border-white/10 pt-8">
        {NAVEGACAO.map(({href, rotulo}) => (
          <li key={href}>
            <LinkSeta href={href} escuro>
              {rotulo}
            </LinkSeta>
          </li>
        ))}
      </ul>
    </Container>
  </div>
);
