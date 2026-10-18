import {MapPin, Navigation} from 'lucide-react';
import {LOCALIZACAO, comoChegar, mapaEmbed} from '../../config/site';
import {registrarCliqueContato} from '../../lib/analytics';

/**
 * Bloco compacto de localização: endereço e rota à esquerda, mapa à direita
 * (empilhado no celular). O botão "Como chegar" fica fora do iframe e
 * funciona mesmo que o mapa não carregue; nesse caso, a camada por trás do
 * iframe continua visível com o endereço.
 */
export const Localizacao = () => (
  <div
    data-revelar
    className="mt-14 grid overflow-hidden rounded-cartao border border-divisoria bg-superficie md:grid-cols-[minmax(0,21rem)_1fr] lg:mt-16"
  >
    <div className="flex flex-col p-6 sm:p-8">
      <p className="rotulo text-bronze">Localização</p>
      <h3 className="mt-3 text-2xl text-verde-profundo">{LOCALIZACAO.nome}</h3>
      <address className="mt-4 flex gap-3 not-italic text-texto">
        <MapPin size={18} aria-hidden="true" className="mt-1 shrink-0 text-dourado" />
        <span>
          {LOCALIZACAO.endereco}
          <br />
          {LOCALIZACAO.cidade}, {LOCALIZACAO.cep}
        </span>
      </address>
      <div className="mt-6 md:mt-auto md:pt-6">
        <a
          href={comoChegar()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => registrarCliqueContato('mapa', 'escritorio-como-chegar')}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-verde-profundo px-6 py-3 text-[0.9375rem] font-semibold text-white transition-[background-color,transform] duration-300 ease-saida hover:bg-verde motion-safe:hover:-translate-y-0.5 sm:w-auto"
        >
          <Navigation size={18} aria-hidden="true" className="text-dourado" />
          Como chegar
          <span className="sr-only">(abre o Google Maps em nova aba)</span>
        </a>
      </div>
    </div>

    <div className="relative min-h-64 border-t border-divisoria bg-papel md:min-h-72 md:border-t-0 md:border-l">
      {/* Reserva: aparece enquanto o mapa carrega ou se ele não carregar. */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-6 text-center text-sm text-texto-2">
        <MapPin size={22} aria-hidden="true" className="text-bronze" />
        <p>
          Carregando o mapa.
          <br />
          Se ele não aparecer, use “Como chegar”.
        </p>
      </div>
      <iframe
        src={mapaEmbed()}
        title={`Mapa interativo com a localização do ${LOCALIZACAO.nome} em ${LOCALIZACAO.cidade}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    </div>
  </div>
);
