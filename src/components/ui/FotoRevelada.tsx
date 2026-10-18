import type {ImgHTMLAttributes} from 'react';

type FotoReveladaProps = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Proporção da moldura, ex.: 'aspect-[4/5]'. */
  proporcao?: string;
  legenda?: string;
  /** Atraso do reveal em ms, para compor duas fotos em sequência. */
  atraso?: number;
  className?: string;
  imgClassName?: string;
};

/**
 * Foto em moldura arredondada. Ao entrar na tela pela primeira vez, a
 * moldura se abre de baixo para cima enquanto a imagem assenta de uma leve
 * ampliação (ver useRevelar e .foto-* em index.css). No hover, zoom lento
 * dentro da moldura. Sem JavaScript ou com movimento reduzido, a foto
 * aparece pronta.
 */
export const FotoRevelada = ({
  proporcao = 'aspect-[4/5]',
  legenda,
  atraso = 0,
  className = '',
  imgClassName = '',
  loading = 'lazy',
  ...img
}: FotoReveladaProps) => (
  <figure className={className}>
    <div
      data-revelar-imagem
      style={atraso ? {['--atraso-foto' as string]: `${atraso}ms`} : undefined}
      className={`foto-moldura relative overflow-hidden rounded-cartao bg-divisoria ${proporcao}`}
    >
      <img {...img} loading={loading} decoding="async" className={`foto-imagem h-full w-full object-cover ${imgClassName}`} />
    </div>
    {legenda && <figcaption className="mt-3 text-sm text-texto-2">{legenda}</figcaption>}
  </figure>
);
