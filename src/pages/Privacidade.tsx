import type {ReactNode} from 'react';
import {AberturaPagina} from '../components/ui/AberturaPagina';
import {Container} from '../components/ui/base';
import {CONTATO, FORMULARIO_ATIVO, SITE} from '../config/site';

/** Data da última revisão do texto (atualizar ao alterar recursos do site). */
const ATUALIZADO_EM = '18 de outubro de 2026';

const Bloco = ({titulo, children}: {titulo: string; children: ReactNode}) => (
  <section className="border-t border-divisoria pt-8">
    <h2 className="text-2xl text-verde-profundo">{titulo}</h2>
    <div className="mt-4 space-y-4 text-texto-2">{children}</div>
  </section>
);

/**
 * Descreve apenas os recursos que o site usa nesta versão. Se Analytics,
 * cookies ou outro serviço forem adicionados, este texto precisa mudar antes.
 */
export const Privacidade = () => (
  <>
    <AberturaPagina rotulo="Privacidade" titulo="Política de privacidade" trilha="Privacidade">
      <p>Como este site trata informações de quem o visita ou entra em contato.</p>
    </AberturaPagina>
    <div className="bg-superficie py-14 sm:py-20">
      <Container>
        <div className="max-w-3xl space-y-10">
          <p className="text-sm text-texto-2">Última atualização: {ATUALIZADO_EM}.</p>

          <Bloco titulo="Quem é o responsável">
            <p>
              Este site é mantido por {SITE.nomeCompleto}, com sede em {CONTATO.endereco.cidade} ({CONTATO.endereco.uf}). Dúvidas
              ou pedidos sobre dados pessoais podem ser enviados para{' '}
              <a href={`mailto:${CONTATO.email}`} className="text-verde underline underline-offset-2">
                {CONTATO.email}
              </a>
              .
            </p>
          </Bloco>

          <Bloco titulo="Navegação no site">
            <p>
              O site não usa cookies próprios, ferramentas de análise de audiência ou publicidade. As fontes e as imagens são
              servidas pelo próprio site.
            </p>
            <p>
              A página Escritório exibe um mapa do Google Maps, carregado quando você chega a essa parte da página. Ao carregar, o
              Google pode receber dados técnicos de acesso e usar cookies, conforme a política de privacidade do Google.
            </p>
            <p>
              Como em qualquer site, o provedor de hospedagem registra dados técnicos de acesso, como endereço IP, data, horário e
              página solicitada, para fins de segurança e funcionamento.
            </p>
          </Bloco>

          {FORMULARIO_ATIVO && (
            <Bloco titulo="Formulário de contato">
              <p>
                Quando você usa o formulário, coletamos nome, um canal de retorno (e-mail ou telefone), empresa (opcional), assunto
                e a mensagem enviada. Essas informações são usadas apenas para responder ao seu contato e avaliar a possibilidade
                de atendimento.
              </p>
              <p>
                O envio é processado pelo serviço de formulários do provedor de hospedagem do site, que entrega a mensagem ao
                escritório. Não envie documentos ou informações sigilosas pelo formulário.
              </p>
            </Bloco>
          )}

          <Bloco titulo="Contato por WhatsApp e e-mail">
            <p>
              Os botões de WhatsApp, e-mail e mapa abrem serviços externos (WhatsApp, seu aplicativo de e-mail e Google Maps), que
              têm políticas de privacidade próprias. As informações que você enviar por esses canais são usadas para responder ao
              contato e, se houver contratação, para a prestação do serviço jurídico, sob sigilo profissional.
            </p>
          </Bloco>

          <Bloco titulo="Seus direitos">
            <p>
              Nos termos da Lei Geral de Proteção de Dados (Lei nº 13.709/2018), você pode pedir confirmação do tratamento, acesso,
              correção ou eliminação de dados pessoais, entre outros direitos, pelo e-mail indicado acima.
            </p>
          </Bloco>
        </div>
      </Container>
    </div>
  </>
);
