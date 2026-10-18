import {Mail, MapPin, MessageCircle} from 'lucide-react';
import {Botao, Rotulo, Secao} from '../ui/base';
import {FormularioContato} from './FormularioContato';
import {CONTATO, FORMULARIO_ATIVO, mailto, whatsapp} from '../../config/site';
import {registrarCliqueContato} from '../../lib/analytics';

interface SecaoContatoProps {
  /** Identifica a página na mensagem do WhatsApp e na mensuração. */
  origem: string;
  mensagemWhatsapp?: string;
  assuntoEmail?: string;
}

/** Única seção de contato de cada página: canais diretos e, se ativo, formulário. */
export const SecaoContato = ({origem, mensagemWhatsapp, assuntoEmail}: SecaoContatoProps) => {
  const {endereco} = CONTATO;
  const posicao = `contato-${origem}`;

  return (
    <Secao tom="verde" id="contato" rotuloId="contato-titulo">
      <div className={`grid gap-12 ${FORMULARIO_ATIVO ? 'lg:grid-cols-[1fr_1.15fr]' : 'lg:grid-cols-[1.1fr_1fr]'} lg:gap-16`}>
        <div>
          <Rotulo escuro className="text-dourado-claro!">Contato</Rotulo>
          <h2 id="contato-titulo" className="titulo-secao mt-3 text-white">
            Fale com nossa equipe
          </h2>
          <p className="mt-4 max-w-xl text-white/80">
            Conte em poucas linhas qual é a operação ou a questão. Documentos e informações sigilosas podem ser tratados depois do
            primeiro contato, pelo canal combinado.
          </p>
          <div className="mt-8">
            <Botao
              href={whatsapp(mensagemWhatsapp)}
              externo
              onClick={() => registrarCliqueContato('whatsapp', posicao)}
              icone={<MessageCircle size={20} aria-hidden="true" />}
            >
              Conversar pelo WhatsApp
              <span className="sr-only">(abre em nova aba)</span>
            </Botao>
          </div>
        </div>

        <div className={FORMULARIO_ATIVO ? '' : 'lg:pt-9'}>
          {FORMULARIO_ATIVO && <FormularioContato />}
          <ul className={`grid gap-px overflow-hidden rounded-cartao border border-white/15 ${FORMULARIO_ATIVO ? 'mt-6 sm:grid-cols-2' : ''}`}>
            <li className="bg-white/[0.04]">
              <a
                href={mailto(assuntoEmail)}
                onClick={() => registrarCliqueContato('email', posicao)}
                className="flex min-h-full items-start gap-4 p-5 transition-colors duration-300 hover:bg-white/[0.06]"
              >
                <Mail size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-dourado" />
                <span>
                  <span className="block text-sm text-white/65">E-mail</span>
                  <span className="block [overflow-wrap:anywhere] font-medium text-white">{CONTATO.email}</span>
                </span>
              </a>
            </li>
            <li className="bg-white/[0.04]">
              <a
                href={CONTATO.mapa}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => registrarCliqueContato('mapa', posicao)}
                className="flex min-h-full items-start gap-4 p-5 transition-colors duration-300 hover:bg-white/[0.06]"
              >
                <MapPin size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-dourado" />
                <span>
                  <span className="block text-sm text-white/65">Escritório em Goiânia · ver no mapa<span className="sr-only"> (abre em nova aba)</span></span>
                  <span className="block font-medium text-white">
                    {endereco.logradouro}, {endereco.bairro}
                  </span>
                </span>
              </a>
            </li>
            {!FORMULARIO_ATIVO && (
              <li className="bg-white/[0.04]">
                <a
                  href={whatsapp(mensagemWhatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => registrarCliqueContato('whatsapp', `${posicao}-lista`)}
                  className="flex min-h-full items-start gap-4 p-5 transition-colors duration-300 hover:bg-white/[0.06]"
                >
                  <MessageCircle size={20} aria-hidden="true" className="mt-0.5 shrink-0 text-dourado" />
                  <span>
                    <span className="block text-sm text-white/65">WhatsApp<span className="sr-only"> (abre em nova aba)</span></span>
                    <span className="block font-medium text-white">{CONTATO.telefoneExibicao}</span>
                  </span>
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Secao>
  );
};
