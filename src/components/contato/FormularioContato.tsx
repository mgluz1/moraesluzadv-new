import {useId, useRef, useState, type FormEvent} from 'react';
import {CONTATO, whatsapp} from '../../config/site';
import {registrarEnvioFormulario} from '../../lib/analytics';

/**
 * Formulário curto enviado ao Netlify Forms (o HTML pré-renderizado contém o
 * <form data-netlify>, necessário para a detecção no deploy).
 *
 * Controle de abuso: campo-isca (honeypot), filtro de spam do Netlify e
 * bloqueio de envio duplicado. Sucesso só é exibido após resposta 2xx.
 */

export const NOME_FORMULARIO = 'contato';

export const ASSUNTOS = [
  'Aviação: compra, venda ou importação de aeronave',
  'Aviação: contratos e gerenciamento',
  'Aviação: questão regulatória',
  'Trabalhista empresarial',
  'Empresarial',
  'Outro assunto',
] as const;

const LIMITE_MENSAGEM = 800;

type Estado = 'ocioso' | 'enviando' | 'sucesso' | 'erro';
type Erros = Partial<Record<'nome' | 'retorno' | 'assunto' | 'mensagem', string>>;

const somenteDigitos = (v: string) => v.replace(/\D/g, '');
const pareceEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const pareceTelefone = (v: string) => /^[\d\s()+-]+$/.test(v) && somenteDigitos(v).length >= 10 && somenteDigitos(v).length <= 13;

function validar(dados: FormData): Erros {
  const erros: Erros = {};
  const nome = String(dados.get('nome') ?? '').trim();
  const retorno = String(dados.get('retorno') ?? '').trim();
  const assunto = String(dados.get('assunto') ?? '');
  const mensagem = String(dados.get('mensagem') ?? '').trim();

  if (nome.length < 2) erros.nome = 'Informe seu nome.';
  if (!retorno) erros.retorno = 'Informe um e-mail ou telefone para retorno.';
  else if (!pareceEmail(retorno) && !pareceTelefone(retorno))
    erros.retorno = 'Use um e-mail válido ou um telefone com DDD.';
  if (!ASSUNTOS.includes(assunto as (typeof ASSUNTOS)[number])) erros.assunto = 'Selecione um assunto.';
  if (mensagem.length < 10) erros.mensagem = 'Descreva o assunto em poucas linhas.';
  else if (mensagem.length > LIMITE_MENSAGEM) erros.mensagem = `Use no máximo ${LIMITE_MENSAGEM} caracteres.`;
  return erros;
}

const CAMPO =
  'mt-1.5 block w-full rounded-lg border border-divisoria bg-superficie px-3.5 py-3 text-texto transition-colors duration-200 placeholder:text-texto-2/70 hover:border-texto-2/50 focus:border-verde focus:outline-2 focus:outline-offset-0 focus:outline-verde/30 aria-[invalid=true]:border-[#a3352b]';

export const FormularioContato = () => {
  const [estado, setEstado] = useState<Estado>('ocioso');
  const [erros, setErros] = useState<Erros>({});
  const [tamanho, setTamanho] = useState(0);
  const enviandoRef = useRef(false);
  const statusRef = useRef<HTMLDivElement>(null);
  const id = useId();

  async function aoEnviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (enviandoRef.current) return;

    const form = e.currentTarget;
    const dados = new FormData(form);
    const encontrados = validar(dados);
    setErros(encontrados);
    const primeiroErro = Object.keys(encontrados)[0];
    if (primeiroErro) {
      (form.elements.namedItem(primeiroErro) as HTMLElement | null)?.focus();
      return;
    }

    enviandoRef.current = true;
    setEstado('enviando');
    try {
      const resposta = await fetch('/', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams(dados as unknown as Record<string, string>).toString(),
      });
      if (!resposta.ok) throw new Error(String(resposta.status));
      setEstado('sucesso');
      registrarEnvioFormulario(String(dados.get('assunto')));
      form.reset();
      setTamanho(0);
    } catch {
      setEstado('erro');
    } finally {
      enviandoRef.current = false;
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }

  if (estado === 'sucesso') {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="rounded-cartao bg-superficie p-6 text-texto sm:p-8">
        <h3 className="text-2xl text-verde-profundo">Mensagem enviada</h3>
        <p className="mt-3 text-texto-2">
          Recebemos seu contato e responderemos pelo canal informado. Se o assunto tiver prazo próximo, avise também pelo WhatsApp.
        </p>
      </div>
    );
  }

  const ajuda = (campo: keyof Erros) =>
    erros[campo] ? (
      <p id={`${id}-${campo}-erro`} className="mt-1.5 text-sm font-medium text-[#a3352b]">
        {erros[campo]}
      </p>
    ) : null;
  const descrito = (campo: keyof Erros, extra?: string) =>
    [erros[campo] ? `${id}-${campo}-erro` : '', extra ?? ''].join(' ').trim() || undefined;

  return (
    <form
      name={NOME_FORMULARIO}
      method="POST"
      data-netlify="true"
      netlify-honeypot="campo-extra"
      noValidate
      onSubmit={aoEnviar}
      className="rounded-cartao bg-superficie p-6 text-texto shadow-[0_1px_2px_rgb(16_47_45/0.06)] sm:p-8"
    >
      <input type="hidden" name="form-name" value={NOME_FORMULARIO} />
      <p className="hidden" aria-hidden="true">
        <label>
          Não preencha este campo: <input name="campo-extra" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-nome`} className="text-sm font-medium">
            Nome
          </label>
          <input
            id={`${id}-nome`}
            name="nome"
            autoComplete="name"
            maxLength={120}
            aria-invalid={!!erros.nome}
            aria-describedby={descrito('nome')}
            className={CAMPO}
          />
          {ajuda('nome')}
        </div>
        <div>
          <label htmlFor={`${id}-empresa`} className="text-sm font-medium">
            Empresa <span className="font-normal text-texto-2">(opcional)</span>
          </label>
          <input id={`${id}-empresa`} name="empresa" autoComplete="organization" maxLength={120} className={CAMPO} />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-retorno`} className="text-sm font-medium">
            E-mail ou telefone para retorno
          </label>
          <input
            id={`${id}-retorno`}
            name="retorno"
            maxLength={120}
            autoComplete="email"
            aria-invalid={!!erros.retorno}
            aria-describedby={descrito('retorno')}
            className={CAMPO}
          />
          {ajuda('retorno')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-assunto`} className="text-sm font-medium">
            Assunto
          </label>
          <select
            id={`${id}-assunto`}
            name="assunto"
            defaultValue=""
            aria-invalid={!!erros.assunto}
            aria-describedby={descrito('assunto')}
            className={CAMPO}
          >
            <option value="" disabled>
              Selecione
            </option>
            {ASSUNTOS.map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          {ajuda('assunto')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={`${id}-mensagem`} className="text-sm font-medium">
            Mensagem breve
          </label>
          <textarea
            id={`${id}-mensagem`}
            name="mensagem"
            rows={4}
            maxLength={LIMITE_MENSAGEM}
            onChange={(e) => setTamanho(e.target.value.length)}
            aria-invalid={!!erros.mensagem}
            aria-describedby={descrito('mensagem', `${id}-mensagem-dica`)}
            className={`${CAMPO} resize-y`}
          />
          <p id={`${id}-mensagem-dica`} className="mt-1.5 flex justify-between gap-4 text-sm text-texto-2">
            <span>Não envie documentos ou informações sigilosas nesta etapa.</span>
            <span aria-hidden="true">
              {tamanho}/{LIMITE_MENSAGEM}
            </span>
          </p>
          {ajuda('mensagem')}
        </div>
      </div>

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="mt-5 empty:hidden">
        {estado === 'erro' && (
          <p role="alert" className="rounded-lg border border-[#a3352b]/30 bg-[#a3352b]/5 p-4 text-sm text-[#7d271f]">
            Não foi possível enviar agora. Tente novamente em instantes ou fale conosco pelo{' '}
            <a href={whatsapp()} target="_blank" rel="noopener noreferrer" className="font-semibold underline">
              WhatsApp
            </a>{' '}
            ou pelo e-mail{' '}
            <a href={`mailto:${CONTATO.email}`} className="font-semibold underline">
              {CONTATO.email}
            </a>
            .
          </p>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-texto-2">
          Dados usados apenas para responder ao contato. <a href="/privacidade" className="underline underline-offset-2 hover:text-verde">Privacidade</a>
        </p>
        <button
          type="submit"
          disabled={estado === 'enviando'}
          className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg bg-verde px-6 font-semibold text-white transition-[background-color,transform] duration-300 ease-saida hover:bg-verde-profundo disabled:cursor-wait disabled:opacity-70 motion-safe:hover:-translate-y-0.5"
        >
          {estado === 'enviando' ? 'Enviando…' : 'Enviar mensagem'}
        </button>
      </div>
    </form>
  );
};
